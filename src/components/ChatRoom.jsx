import { useState, useEffect, useRef } from "react";
import { auth, loginWithGoogle, logout, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

const INITIAL_HOST_MESSAGE = {
  id: "host-welcome",
  text: "Hello! Welcome to my portfolio chat. Feel free to leave a message, share feedback, or just say hi!",
  displayName: "Ijaz Ahmed",
  photoURL: "./assets/ijaz_portfolio_image.png",
  createdAt: { seconds: Math.floor(Date.now() / 1000) - 120 },
  isHost: true
};

const LOCAL_STORAGE_KEY = "portfolio_chat_local_messages";
const GUEST_STORAGE_KEY = "portfolio_chat_guest_user";

export default function ChatRoom() {
  const [user, setUser] = useState(null);
  const [guestUser, setGuestUser] = useState(null);
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [guestNameInput, setGuestNameInput] = useState("");
  const [message, setMessage] = useState("");
  const [remoteMessages, setRemoteMessages] = useState([]);
  const [localMessages, setLocalMessages] = useState([]);
  const [firestoreStatus, setFirestoreStatus] = useState("loading"); // "connected" | "permission-denied" | "error" | "loading"
  const [isSending, setIsSending] = useState(false);
  const [authError, setAuthError] = useState("");
  const messagesEndRef = useRef(null);
  const chatBoxRef = useRef(null);
  const isInitialLoad = useRef(true);

  // Load guest user from localStorage
  useEffect(() => {
    try {
      const savedGuest = localStorage.getItem(GUEST_STORAGE_KEY);
      if (savedGuest) {
        setGuestUser(JSON.parse(savedGuest));
      }
      const savedLocalMsgs = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedLocalMsgs) {
        setLocalMessages(JSON.parse(savedLocalMsgs));
      }
    } catch {
      // Ignore localStorage read errors
    }
  }, []);

  // Check Firebase Auth state
  useEffect(() => {
    try {
      const unsub = onAuthStateChanged(auth, (u) => {
        setUser(u);
        if (u) {
          setAuthError("");
        }
      });
      return () => unsub();
    } catch (err) {
      console.warn("Auth state listener note:", err);
    }
  }, []);

  // Real-time Firestore messages with graceful fallback
  useEffect(() => {
    try {
      const q = query(collection(db, "messages"), orderBy("createdAt"));
      const unsub = onSnapshot(
        q,
        (snapshot) => {
          const msgs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setRemoteMessages(msgs);
          setFirestoreStatus("connected");
        },
        (error) => {
          // Gracefully catch permission-denied without crashing
          if (error.code === "permission-denied") {
            setFirestoreStatus("permission-denied");
          } else {
            setFirestoreStatus("error");
          }
        }
      );
      return () => unsub();
    } catch {
      setFirestoreStatus("error");
    }
  }, []);

  // Auto-scroll inside chatbox container only (prevents scrolling entire webpage to bottom)
  useEffect(() => {
    if (!chatBoxRef.current) return;
    if (isInitialLoad.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      isInitialLoad.current = false;
    } else {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [remoteMessages, localMessages]);

  const activeUser = user
    ? {
        uid: user.uid,
        displayName: user.displayName || "Google User",
        photoURL:
          user.photoURL ||
          `https://api.dicebear.com/7.x/bottts/svg?seed=${user.uid}`
      }
    : guestUser;

  // Handle Google Login
  const handleGoogleLogin = async () => {
    setAuthError("");
    try {
      await loginWithGoogle();
    } catch (err) {
      if (
        err.code === "auth/popup-closed-by-user" ||
        err.code === "auth/cancelled-popup-request"
      ) {
        // User voluntarily closed the popup
        return;
      }
      console.warn("Google login notification:", err.message);
      setAuthError(
        "Google Sign-In popup could not complete. You can also chat right now using Guest Mode below!"
      );
    }
  };

  // Handle Guest Login
  const handleGuestSubmit = (e) => {
    e.preventDefault();
    const name = guestNameInput.trim() || "Guest Visitor";
    const newGuest = {
      uid: `guest_${Date.now()}`,
      displayName: name,
      photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
        name
      )}`,
      isGuest: true
    };
    setGuestUser(newGuest);
    setIsGuestMode(false);
    try {
      localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(newGuest));
    } catch {
      // Ignore
    }
  };

  const handleLogout = async () => {
    if (user) {
      try {
        await logout();
      } catch {
        // Ignore
      }
    }
    setGuestUser(null);
    try {
      localStorage.removeItem(GUEST_STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  // Send Message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !activeUser || isSending) return;

    const textToSend = message.trim();
    setMessage("");
    setIsSending(true);

    const newMsgObj = {
      id: `local_${Date.now()}`,
      text: textToSend,
      uid: activeUser.uid,
      displayName: activeUser.displayName,
      photoURL: activeUser.photoURL,
      createdAt: { seconds: Math.floor(Date.now() / 1000) }
    };

    // Attempt Firestore write if online
    let writtenToFirestore = false;
    if (firestoreStatus === "connected" || user) {
      try {
        await addDoc(collection(db, "messages"), {
          text: textToSend,
          uid: activeUser.uid,
          displayName: activeUser.displayName,
          photoURL: activeUser.photoURL,
          createdAt: serverTimestamp()
        });
        writtenToFirestore = true;
      } catch (err) {
        console.warn("Firestore send note, saving locally:", err.message);
      }
    }

    if (!writtenToFirestore) {
      // Save locally so the user never loses their message
      const updated = [...localMessages, newMsgObj];
      setLocalMessages(updated);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore
      }
    }

    setIsSending(false);
  };

  // Combine host welcome, remote messages, and local messages (avoiding duplicate IDs)
  const allMessages = (() => {
    const list = [INITIAL_HOST_MESSAGE];
    const seen = new Set([INITIAL_HOST_MESSAGE.id]);

    for (const m of remoteMessages) {
      if (!seen.has(m.id)) {
        seen.add(m.id);
        list.push(m);
      }
    }

    for (const m of localMessages) {
      if (!seen.has(m.id)) {
        seen.add(m.id);
        list.push(m);
      }
    }

    // Sort by createdAt timestamp
    return list.sort((a, b) => {
      const tA = a.createdAt?.seconds || a.createdAt?.toMillis?.() / 1000 || 0;
      const tB = b.createdAt?.seconds || b.createdAt?.toMillis?.() / 1000 || 0;
      return tA - tB;
    });
  })();

  const formatTime = (ts) => {
    if (!ts) return "";
    let date;
    if (ts.seconds) {
      date = new Date(ts.seconds * 1000);
    } else if (typeof ts === "number") {
      date = new Date(ts);
    } else {
      date = new Date();
    }
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-700/80 p-6 rounded-2xl shadow-xl backdrop-blur-md max-w-xl mx-auto flex flex-col h-[560px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-700/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-violet-600/30 border border-violet-500/40 flex items-center justify-center text-xl">
            💬
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Live Chat Room
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </h2>
            <p className="text-xs text-zinc-400">
              {firestoreStatus === "connected"
                ? "Connected to Live Cloud"
                : "Active • Real-time guest messaging"}
            </p>
          </div>
        </div>

        {activeUser && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="text-xs text-zinc-400 hover:text-rose-400 bg-zinc-800 hover:bg-zinc-700/60 border border-zinc-700 px-3 py-1.5 rounded-full transition"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>

      {/* Active User Bar */}
      {activeUser && (
        <div className="flex items-center justify-between bg-zinc-800/60 border border-zinc-700/50 px-3.5 py-2 rounded-xl mb-3 text-xs">
          <div className="flex items-center gap-2.5 truncate">
            <img
              src={activeUser.photoURL}
              alt="Avatar"
              className="w-6 h-6 rounded-full border border-violet-500/50 object-cover"
              onError={(e) => {
                e.target.src = "https://api.dicebear.com/7.x/bottts/svg?seed=user";
              }}
            />
            <span className="text-zinc-200 font-medium truncate">
              Posting as <strong className="text-violet-400">{activeUser.displayName}</strong>
            </span>
          </div>
          <span className="text-[10px] bg-violet-500/20 text-violet-300 border border-violet-500/30 px-2 py-0.5 rounded-full">
            {user ? "Google Verified" : "Guest"}
          </span>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div ref={chatBoxRef} className="flex-1 overflow-y-auto pr-1 space-y-3.5 rounded-xl mb-4 custom-scrollbar">
        {allMessages.map((msg) => {
          const isCurrentUser = activeUser && msg.uid === activeUser.uid;
          const isHost = msg.isHost;

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2.5 ${
                isCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              {!isCurrentUser && (
                <img
                  src={
                    msg.photoURL ||
                    `https://api.dicebear.com/7.x/bottts/svg?seed=${msg.uid || "guest"}`
                  }
                  alt={msg.displayName || "User"}
                  className="w-8 h-8 rounded-full border border-zinc-700 shrink-0 object-cover"
                  onError={(e) => {
                    e.target.src = "https://api.dicebear.com/7.x/bottts/svg?seed=guest";
                  }}
                />
              )}

              <div
                className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm shadow-md ${
                  isCurrentUser
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-br-xs"
                    : isHost
                    ? "bg-zinc-800 border border-violet-500/40 text-zinc-100 rounded-bl-xs"
                    : "bg-zinc-800/90 border border-zinc-700/70 text-zinc-200 rounded-bl-xs"
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-1 text-[11px] opacity-75">
                  <span className="font-semibold flex items-center gap-1.5">
                    {msg.displayName || "Visitor"}
                    {isHost && (
                      <span className="bg-violet-500/30 text-violet-300 border border-violet-500/40 px-1.5 py-0.2 rounded text-[9px] uppercase tracking-wider font-bold">
                        Author
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    {formatTime(msg.createdAt)}
                  </span>
                </div>
                <p className="break-words leading-relaxed text-zinc-100">{msg.text}</p>
              </div>

              {isCurrentUser && (
                <img
                  src={activeUser.photoURL}
                  alt="My avatar"
                  className="w-8 h-8 rounded-full border border-violet-500/60 shrink-0 object-cover"
                  onError={(e) => {
                    e.target.src = "https://api.dicebear.com/7.x/bottts/svg?seed=user";
                  }}
                />
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Auth or Input Area */}
      <div className="pt-2 border-t border-zinc-800">
        {activeUser ? (
          <form onSubmit={sendMessage} className="flex gap-2 w-full">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              maxLength={400}
              className="flex-1 min-w-0 px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition"
              disabled={isSending}
            />
            <button
              type="submit"
              disabled={!message.trim() || isSending}
              className="bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed px-5 py-2.5 rounded-xl text-white font-semibold text-sm transition shadow-lg shadow-violet-600/30 shrink-0"
            >
              {isSending ? "..." : "Send"}
            </button>
          </form>
        ) : isGuestMode ? (
          <form onSubmit={handleGuestSubmit} className="flex flex-col gap-2.5">
            <div className="flex gap-2">
              <input
                type="text"
                value={guestNameInput}
                onChange={(e) => setGuestNameInput(e.target.value)}
                placeholder="Enter your name or handle..."
                maxLength={30}
                autoFocus
                className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-violet-500"
              />
              <button
                type="submit"
                className="bg-violet-600 hover:bg-violet-500 px-5 py-2.5 rounded-xl text-white font-semibold text-sm transition"
              >
                Join
              </button>
            </div>
            <button
              type="button"
              onClick={() => setIsGuestMode(false)}
              className="text-xs text-zinc-400 hover:text-zinc-200 text-center"
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className="flex flex-col gap-2.5">
            {authError && (
              <p className="text-xs text-amber-400/90 text-center bg-amber-950/30 border border-amber-500/30 p-2 rounded-lg">
                {authError}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex-1 flex items-center justify-center gap-2.5 bg-white hover:bg-zinc-100 text-zinc-800 px-4 py-2.5 rounded-xl text-sm font-semibold transition shadow-md"
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  className="w-4 h-4"
                />
                <span>Sign In with Google</span>
              </button>

              <button
                type="button"
                onClick={() => setIsGuestMode(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700/80 border border-zinc-700 text-zinc-200 px-4 py-2.5 rounded-xl text-sm font-medium transition"
              >
                <span>👤</span>
                <span>Continue as Guest</span>
              </button>
            </div>

            <p className="text-[11px] text-zinc-500 text-center">
              Sign in or join as guest to send messages in the room
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
