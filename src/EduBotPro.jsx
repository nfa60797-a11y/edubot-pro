import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `Bạn là EduBot Pro — gia sư AI chuyên sâu về IELTS, SAT, GMAT và các chứng chỉ quốc tế, được thiết kế để dạy từ mất gốc đến nâng cao bằng tiếng Việt.

## PHƯƠNG PHÁP GIẢNG DẠY TIÊN TIẾN:

### 1. COMPREHENSIBLE INPUT (Stephen Krashen)
- Cung cấp ngữ liệu ở mức i+1 (hơn trình độ hiện tại 1 bước)
- Không ép học ngữ pháp khô khan, tập trung vào ngữ nghĩa trong bối cảnh thực

### 2. SPACED REPETITION (SRS)
- Nhắc lại từ vựng/khái niệm theo chu kỳ tối ưu
- Ưu tiên điểm yếu của học sinh

### 3. ACTIVE RECALL & INTERLEAVING
- Đặt câu hỏi thay vì giải thích thụ động
- Xen kẽ nhiều chủ đề để tránh "illusion of mastery"

### 4. CHUNKING
- Dạy ngôn ngữ theo "cụm ý nghĩa" chứ không theo từng từ đơn lẻ
- Collocations, idioms, fixed expressions

### 5. METACOGNITION
- Dạy học sinh cách TỰ HỌC, không chỉ cung cấp đáp án

### 6. GAMIFICATION
- Tạo mini challenges, milestones, streaks
- Phản hồi tích cực có chọn lọc

## CÁC MODULE:
- IELTS (0 đến 9.0): Listening, Reading, Writing Task 1+2, Speaking
- SAT Digital 2024+: Reading & Writing, Math
- GMAT Focus Edition: Quantitative, Verbal, Data Insights
- Khóa học quốc tế: Coursera, edX, FutureLearn, MIT OCW

## PHONG CÁCH:
- Nói chuyện như người bạn thông minh, không phải giáo viên cứng nhắc
- Tiếng Việt + chèn English khi cần
- Emoji vừa phải
- Khi sai: "Gần đúng rồi! Thử nghĩ lại về..." thay vì "Sai rồi"
- Luôn giải thích WHY, không chỉ WHAT

Luôn trả lời bằng tiếng Việt trừ khi học sinh dùng tiếng Anh.`;

const QUICK_STARTS = [
  { icon: "🎯", label: "Đánh giá trình độ", msg: "Tôi muốn được đánh giá trình độ tiếng Anh hiện tại" },
  { icon: "📈", label: "Lộ trình IELTS", msg: "Tạo cho tôi lộ trình học IELTS từ đầu đến band 7.0" },
  { icon: "✍️", label: "Writing Task 2", msg: "Hướng dẫn tôi viết IELTS Writing Task 2" },
  { icon: "🗣️", label: "Speaking Practice", msg: "Luyện IELTS Speaking Part 2 chủ đề Technology" },
  { icon: "🔢", label: "SAT Math", msg: "Dạy tôi chiến thuật SAT Math từ cơ bản" },
  { icon: "🎓", label: "Bằng QT Online", msg: "Giới thiệu các khóa học quốc tế online có cấp chứng chỉ" },
];

const MODULES = [
  { id: "ielts", label: "IELTS", icon: "🇬🇧", accent: "#22D3A5" },
  { id: "sat", label: "SAT", icon: "🇺🇸", accent: "#F97316" },
  { id: "gmat", label: "GMAT", icon: "📊", accent: "#A78BFA" },
  { id: "courses", label: "Courses", icon: "🎓", accent: "#FBBF24" },
];

function formatText(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<code>$1</code>")
    .replace(/^### (.*)/gm, "<h4>$1</h4>")
    .replace(/^## (.*)/gm, "<h3>$1</h3>")
    .replace(/^- (.*)/gm, "• $1");
}

export default function EduBotPro() {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeModule, setActiveModule] = useState("ielts");
  const [showWelcome, setShowWelcome] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const activeColor = MODULES.find(m => m.id === activeModule)?.accent || "#22D3A5";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;
    setInput("");
    setShowWelcome(false);

    const newHistory = [...history, { role: "user", content: userText }];
    setMessages(prev => [...prev, { role: "user", content: userText, id: Date.now() }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: SYSTEM_PROMPT, messages: newHistory, max_tokens: 1000 }),
      });
      const data = await res.json();
      const reply = data.content?.map(b => b.text || "").join("") || "Xin lỗi, có lỗi xảy ra!";
      setMessages(prev => [...prev, { role: "assistant", content: reply, id: Date.now() + 1 }]);
      setHistory([...newHistory, { role: "assistant", content: reply }]);
    } catch {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "⚠️ Lỗi kết nối. Kiểm tra lại mạng và thử lại nhé!",
        id: Date.now() + 1,
      }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const reset = () => { setMessages([]); setHistory([]); setShowWelcome(true); setInput(""); };

  return (
    <div style={{
      minHeight: "100vh", background: "#070710",
      fontFamily: "'Sora', 'Nunito', sans-serif",
      display: "flex", flexDirection: "column", position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Nunito:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 4px; }
        textarea { resize: none; }
        .msg { animation: pop 0.35s cubic-bezier(.34,1.56,.64,1) both; }
        @keyframes pop { from { opacity:0; transform:translateY(10px) scale(0.97); } to { opacity:1; transform:none; } }
        .welcome { animation: fadeUp 0.6s cubic-bezier(.16,1,.3,1) both; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
        .quick:hover { background: rgba(255,255,255,0.07) !important; transform: translateY(-1px); }
        .quick { transition: all 0.18s ease; cursor: pointer; }
        .tab:hover { opacity: 0.9 !important; }
        .tab { transition: all 0.2s ease; }
        .pulse span { display:inline-block; width:7px; height:7px; border-radius:50%; background:currentColor; animation:blink 1.3s ease-in-out infinite; }
        .pulse span:nth-child(2) { animation-delay:.15s; }
        .pulse span:nth-child(3) { animation-delay:.3s; }
        @keyframes blink { 0%,100%{opacity:.2;transform:scale(.75);} 50%{opacity:1;transform:scale(1);} }
        .msg-content strong { font-weight:700; }
        .msg-content em { font-style:italic; opacity:0.85; }
        .msg-content code { background:rgba(255,255,255,0.1); padding:1px 6px; border-radius:5px; font-family:monospace; font-size:0.88em; }
        .msg-content h3 { font-size:1.05em; font-weight:700; margin:14px 0 6px; }
        .msg-content h4 { font-size:0.97em; font-weight:600; margin:10px 0 4px; opacity:0.9; }
        .send:hover:not(:disabled) { filter:brightness(1.1); transform:scale(1.06); }
        .send { transition: all 0.15s ease; }
        .glow { box-shadow: 0 0 40px -10px var(--accent); }
      `}</style>

      {/* Ambient bg */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 60% 50% at 10% 10%, ${activeColor}12 0%, transparent 60%),
          radial-gradient(ellipse 50% 60% at 90% 90%, #7C3AED10 0%, transparent 60%)
        `,
        transition: "background 0.6s ease",
      }} />

      {/* Noise overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      {/* Header */}
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(7,7,16,0.8)", backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{
          maxWidth: 780, margin: "0 auto", padding: "0 20px",
          display: "flex", alignItems: "center", height: 58, gap: 14,
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 9, flexShrink: 0,
              background: `linear-gradient(135deg, ${activeColor}, #7C3AED)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 17, transition: "background 0.5s",
            }}>🧠</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: "#fff", letterSpacing: "-0.4px", lineHeight: 1 }}>
                EduBot <span style={{ color: activeColor, transition: "color 0.4s" }}>Pro</span>
              </div>
              <div style={{ fontSize: 9, color: "#444", letterSpacing: "0.8px", textTransform: "uppercase", marginTop: 2 }}>
                AI Tutor · Claude
              </div>
            </div>
          </div>

          {/* Module tabs */}
          <div style={{
            display: "flex", gap: 2,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 10, padding: "3px",
          }}>
            {MODULES.map(m => (
              <button key={m.id} className="tab" onClick={() => setActiveModule(m.id)} style={{
                padding: "5px 11px", borderRadius: 7, border: "none", cursor: "pointer",
                background: activeModule === m.id ? m.accent + "20" : "transparent",
                color: activeModule === m.id ? m.accent : "#555",
                fontSize: 11, fontWeight: activeModule === m.id ? 700 : 500,
                display: "flex", alignItems: "center", gap: 5,
                transition: "all 0.2s",
              }}>
                <span style={{ fontSize: 13 }}>{m.icon}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>
 <button onClick={reset} title="Reset" style={{
            width: 32, height: 32, borderRadius: 8, border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.04)", color: "#555", cursor: "pointer",
            fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>↺</button>
        </div>
      </header>

      {/* Chat area */}
      <div style={{ flex: 1, overflowY: "auto", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "24px 20px 140px" }}>

          {/* Welcome */}
          {showWelcome && (
            <div className="welcome" style={{ textAlign: "center", paddingTop: 32 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: `${activeColor}18`, border: `1px solid ${activeColor}35`,
                borderRadius: 100, padding: "5px 14px", marginBottom: 22,
                fontSize: 11, color: activeColor, fontWeight: 700, letterSpacing: "1px",
                textTransform: "uppercase",
              }}>
                ✦ AI-Powered · Khoa học não bộ
              </div>

              <h1 style={{
                fontSize: "clamp(26px,5vw,42px)", fontWeight: 800,
                color: "#fff", lineHeight: 1.18, letterSpacing: "-1px", marginBottom: 14,
              }}>
                Học thật sự,<br />
                <span style={{ color: activeColor, transition: "color 0.4s" }}>không học vẹt.</span>
              </h1>

              <p style={{ color: "#555", fontSize: 14, maxWidth: 420, margin: "0 auto 30px", lineHeight: 1.75 }}>
                Spaced Repetition · Active Recall · Comprehensible Input<br />
                Từ band 0 đến 9.0 — có lộ trình, có phương pháp.
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 32 }}>
                {["IELTS 0→9.0", "SAT Digital", "GMAT Focus", "Bằng QT Online"].map(tag => (
                  <span key={tag} style={{
                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 8, padding: "6px 14px", fontSize: 12, color: "#888",
                  }}>{tag}</span>
                ))}
              </div>

              {/* Quick starts */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
                gap: 8, maxWidth: 640, margin: "0 auto",
              }}>
                {QUICK_STARTS.map(q => (
                  <button key={q.label} className="quick" onClick={() => sendMessage(q.msg)} style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 11, padding: "11px 14px",
                    color: "#bbb", textAlign: "left",
                    display: "flex", alignItems: "center", gap: 10,
                  }}>
                    <span style={{ fontSize: 17 }}>{q.icon}</span>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{q.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map(msg => (
            <div key={msg.id} className="msg" style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              marginBottom: 14, gap: 10, alignItems: "flex-end",
            }}>
              {msg.role === "assistant" && (
                <div style={{
                  width: 28, height: 28, borderRadius: 7, flexShrink: 0,
                  background: `linear-gradient(135deg, ${activeColor}, #7C3AED)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, marginBottom: 2, transition: "background 0.4s",
                }}>🧠</div>
              )}
              <div style={{
                maxWidth: "78%",
                background: msg.role === "user"
                  ? `linear-gradient(135deg, ${activeColor}DD, ${activeColor}99)`
                  : "rgba(255,255,255,0.045)",
                border: msg.role === "user" ? "none" : "1px solid rgba(255,255,255,0.07)",
                borderRadius: msg.role === "user" ? "16px 16px 3px 16px" : "16px 16px 16px 3px",
                padding: "11px 15px",
                color: msg.role === "user" ? "#fff" : "#d4d4d8",
                fontSize: 13.5, lineHeight: 1.75,
              }}>
                <div className="msg-content" style={{ whiteSpace: "pre-wrap" }}
                  dangerouslySetInnerHTML={{ __html: formatText(msg.content) }}
                />
              </div>
            </div>
          ))}

          {/* Loading */}
          {loading && (
            <div className="msg" style={{ display: "flex", alignItems: "flex-end", gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 7, flexShrink: 0,
                background: `linear-gradient(135deg, ${activeColor}, #7C3AED)`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13,
              }}>🧠</div>
              <div style={{
                background: "rgba(255,255,255,0.045)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px 16px 16px 3px", padding: "13px 18px",
                color: activeColor, display: "flex", gap: 5, alignItems: "center",
              }} className="pulse">
                <span /><span /><span />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input bar */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(7,7,16,0.88)", backdropFilter: "blur(28px)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "12px 20px 18px",
      }}>
        <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", gap: 10, alignItems: "flex-end" }}>
          <div style={{
            flex: 1,
            background: "rgba(255,255,255,0.04)",
            border: `1.5px solid ${input ? activeColor + "55" : "rgba(255,255,255,0.07)"}`,
            borderRadius: 13, padding: "10px 14px",
            transition: "border-color 0.25s",
            display: "flex", alignItems: "flex-end",
          }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
              }}
              placeholder="Hỏi bất cứ điều gì về IELTS, SAT, GMAT..."
              rows={1}
              style={{
                flex: 1, background: "none", border: "none", outline: "none",
                color: "#e4e4e7", fontSize: 14, lineHeight: 1.6, maxHeight: 110,
                overflowY: "auto", fontFamily: "inherit",
              }}
              onInput={e => {
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 110) + "px";
              }}
            />
          </div>
          <button
            className="send"
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            style={{
              width: 42, height: 42, borderRadius: 11, border: "none", cursor: "pointer",
              background: input.trim() && !loading
                ? `linear-gradient(135deg, ${activeColor}, #7C3AED)`
                : "rgba(255,255,255,0.05)",
              color: input.trim() && !loading ? "#fff" : "#444",
              fontSize: 17, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >↑</button>
        </div>
        <div style={{ maxWidth: 780, margin: "5px auto 0", textAlign: "center", fontSize: 10, color: "#2a2a35" }}>
          Enter gửi · Shift+Enter xuống dòng · EduBot Pro — Claude AI
        </div>
      </div>
    </div>
  );
}  