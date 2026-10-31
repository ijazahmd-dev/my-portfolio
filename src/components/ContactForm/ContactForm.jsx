import { useState } from "react";
import ShinyText from "../ShinyText/ShinyText";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState("idle"); // "idle" | "submitting" | "success" | "error"
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("submitting");
    setFeedbackMsg("");

    try {
      const response = await fetch("https://formsubmit.co/ajax/ijazahmed5432100@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `Portfolio Message from ${formData.name}`,
          message: formData.message,
          _captcha: "false",
          _template: "table"
        })
      });

      const data = await response.json();

      if (data.success === "true" || data.success === true) {
        setStatus("success");
        setFeedbackMsg("Your message was sent successfully! Ijaz will get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else if (data.message && data.message.toLowerCase().includes("activation")) {
        // FormSubmit first-time activation notification
        setStatus("success");
        setFeedbackMsg("Your message was submitted! A one-time activation confirmation was sent to Ijaz's email.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (err) {
      console.error("Contact Form Error:", err);
      setStatus("error");
      setFeedbackMsg("Could not send automatically. Please reach out directly at ijazahmed5432100@gmail.com.");
    }
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-700/80 p-4 sm:p-6 rounded-2xl shadow-xl backdrop-blur-md flex flex-col justify-between min-h-[500px] lg:h-[560px] w-full">
      <div className="flex items-center justify-between pb-4 mb-2 border-b border-zinc-700/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-violet-600/30 border border-violet-500/40 flex items-center justify-center text-xl">
            ✉️
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Send a Message
            </h3>
            <p className="text-xs text-zinc-400">Directly to ijazahmed5432100@gmail.com</p>
          </div>
        </div>
        <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-medium">
          Available
        </span>
      </div>

      {status === "success" ? (
        <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-6 text-center my-4 animate-in fade-in duration-300">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 text-2xl">
            ✓
          </div>
          <h4 className="text-lg font-bold text-emerald-300 mb-1">Message Delivered!</h4>
          <p className="text-sm text-zinc-300 mb-5">{feedbackMsg}</p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="px-5 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-sm font-semibold text-white border border-zinc-600 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} autoComplete="off" className="flex flex-col gap-5">
          {status === "error" && (
            <div className="bg-rose-950/40 border border-rose-500/40 rounded-xl p-4 text-sm text-rose-300 flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold">Notice</p>
                <p className="text-xs text-zinc-300 mt-0.5">{feedbackMsg}</p>
              </div>
              <a
                href="mailto:ijazahmed5432100@gmail.com"
                className="shrink-0 underline text-rose-400 font-semibold text-xs hover:text-white"
              >
                Open Mail App
              </a>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                Full Name <span className="text-violet-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="bg-zinc-900/80 border border-zinc-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 p-3 rounded-xl text-white placeholder-zinc-500 text-sm transition outline-none"
                required
                disabled={status === "submitting"}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                Email Address <span className="text-violet-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="bg-zinc-900/80 border border-zinc-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 p-3 rounded-xl text-white placeholder-zinc-500 text-sm transition outline-none"
                required
                disabled={status === "submitting"}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
              Subject <span className="text-zinc-500 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g. Freelance project, full-time role, or inquiry"
              className="bg-zinc-900/80 border border-zinc-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 p-3 rounded-xl text-white placeholder-zinc-500 text-sm transition outline-none"
              disabled={status === "submitting"}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
              Message <span className="text-violet-400">*</span>
            </label>
            <textarea
              name="message"
              id="message"
              rows="3"
              value={formData.message}
              onChange={handleChange}
              placeholder="Hi Ijaz, I'd like to talk about..."
              className="bg-zinc-900/80 border border-zinc-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 p-2.5 rounded-xl text-white placeholder-zinc-500 text-sm transition outline-none resize-none"
              required
              disabled={status === "submitting"}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-2 font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 p-3.5 px-6 rounded-full w-full cursor-pointer shadow-lg shadow-violet-500/25 border border-violet-400/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-white"
          >
            {status === "submitting" ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" strokeLinecap="round" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sending Message...</span>
              </>
            ) : (
              <ShinyText text="Send Message" disabled={false} speed={3} className="text-white font-semibold" />
            )}
          </button>
        </form>
      )}

      {/* Direct Contact Links */}
      <div className="mt-8 pt-5 border-t border-zinc-700/60 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <span>📬 Direct:</span>
          <a
            href="mailto:ijazahmed5432100@gmail.com"
            className="text-violet-400 hover:text-violet-300 underline font-medium transition"
          >
            ijazahmed5432100@gmail.com
          </a>
        </div>
        <div className="flex items-center gap-2">
          <span>🐙 GitHub:</span>
          <a
            href="https://github.com/ijazahmd-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-300 hover:text-white underline font-medium transition"
          >
            ijazahmd-dev
          </a>
        </div>
      </div>
    </div>
  );
}
