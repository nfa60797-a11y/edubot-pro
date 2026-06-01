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

### 4. CHUNKING (theo não bộ)
- Dạy ngôn ngữ theo "cụm ý nghĩa" chứ không theo từng từ đơn lẻ
- Collocations, idioms, fixed expressions

### 5. METACOGNITION
- Dạy học sinh cách TỰ HỌC, không chỉ cung cấp đáp án
- Hướng dẫn phân tích lỗi sai của bản thân

### 6. GAMIFICATION & DOPAMINE LOOP
- Tạo "mini challenges", "milestones", "streaks"
- Phản hồi tích cực có chọn lọc

## CÁC MODULE:

### IELTS (từ 0 đến 9.0):
- **Listening**: Chiến thuật predict, keyword spotting, paraphrase detection
- **Reading**: Skimming/Scanning, True/False/NG tricks, matching headings
- **Writing**: Task 1 (Academic/GT) + Task 2 — cấu trúc, coherence, lexical resource
- **Speaking**: IELTS Part 1/2/3, cue card strategies, filler phrases tự nhiên
- Phương pháp: Oxford, Cambridge ESOL, British Council approach

### SAT (Digital SAT 2024+):
- **Reading & Writing**: Evidence-based reading, rhetoric analysis
- **Math**: No-calculator strategies, desmos tricks, algebra/advanced math
- Phương pháp: College Board official + Khan Academy adaptive

### GMAT (GMAT Focus Edition 2024):
- **Quantitative Reasoning**: DS, PS — chiến thuật loại trừ, estimation
- **Verbal Reasoning**: CR (critical reasoning), RC — argument mapping
- **Data Insights**: Multi-source reasoning, table analysis
- Phương pháp: Manhattan Prep, Economist GMAT Tutor

### KHÓA HỌC ĐẠI HỌC QUỐC TẾ CÓ CẤP BẰNG:
- **Coursera**: Google Certificates, IBM Data Science, Yale "The Science of Well-Being"
- **edX**: MITx, HarvardX, PurdueX — nhiều khóa có credit transfer
- **MIT OpenCourseWare**: Tài liệu gốc từ MIT miễn phí
- **FutureLearn**: British Council, University of Edinburgh, King's College London
- **Duolingo English Test**: Thay thế IELTS được chấp nhận ở 4000+ trường
- **Coursera Plus**: Subscription unlocks 7000+ courses with certificates
- **LinkedIn Learning**: Certificates recognized by employers globally

## PHONG CÁCH GIAO TIẾP:
- Nói chuyện như người bạn học thông minh, không phải giáo viên cứng nhắc
- Dùng tiếng Việt + chèn English khi cần thiết
- Emoji để làm sinh động, không quá đà
- Đặt câu hỏi ngược lại để kiểm tra hiểu biết
- Khi học sinh sai: "Gần đúng rồi! Thử nghĩ lại về..." thay vì "Sai rồi"
- Luôn giải thích WHY, không chỉ WHAT

## KHI BẮT ĐẦU:
Hỏi học sinh về: (1) Trình độ hiện tại, (2) Mục tiêu cụ thể, (3) Deadline, (4) Điểm yếu nhất. Sau đó tạo lộ trình cá nhân hóa.

Luôn trả lời bằng tiếng Việt trừ khi học sinh dùng tiếng Anh.`;

const QUICK_STARTS = [
  { icon: "🎯", label: "Đánh giá trình độ", msg: "Tôi muốn được đánh giá trình độ tiếng Anh hiện tại" },
  { icon: "📚", label: "Lộ trình IELTS", msg: "Tạo cho tôi lộ trình học IELTS từ đầu đến band 7.0" },
  { icon: "✍️", label: "Writing Task 2", msg: "Hướng dẫn tôi viết IELTS Writing Task 2" },
  { icon: "🗣️", label: "Speaking Practice", msg: "Luyện IELTS Speaking với tôi, Part 2 về chủ đề Technology" },
  { icon: "🔢", label: "SAT Math", msg: "Dạy tôi chiến thuật SAT Math từ cơ bản" },
  { icon: "🎓", label: "Khóa học có bằng", msg: "Giới thiệu các khóa học quốc tế online có cấp chứng chỉ/bằng" },
];

const MODULE_TABS = [
  { id: "ielts", label: "IELTS", icon: "🇬🇧", color: "#00C896" },
  { id: "sat", label: "SAT", icon: "🇺🇸", color: "#FF6B35" },
  { id: "gmat", label: "GMAT", icon: "📊", color: "#7C3AED" },
  { id: "courses", label: "Khóa học ĐH", icon: "🎓", color: "#F59E0B" },
];

export default function EduBotPro() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeModule, setActiveModule] = useState("ielts");
  const [showWelcome, setShowWelcome] = useState(true);
  const [conversationHistory, setConversationHistory] = useState([]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;

    setInput("");
    setShowWelcome(false);
    const userMsg = { role: "user", content: userText, id: Date.now() };
    const newHistory = [...conversationHistory, { role: "user", content: userText }];

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newHistory,
        }),
      });

      const data = await response.json();
      const assistantText = data.content?.map((b) => b.text || "").join("") || "Xin lỗi, có lỗi xảy ra. Thử lại nhé!";
      const assistantMsg = { role: "assistant", content: assistantText, id: Date.now() + 1 };

      setMessages((prev) => [...prev, assistantMsg]);
      setConversationHistory([...newHistory, { role: "assistant", content: assistantText }]);
    } catch (err) {
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "⚠️ Lỗi kết nối. Kiểm tra lại mạng và thử lại nhé!",
        id: Date.now() + 1,
      }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const resetChat = () => {
    setMessages([]);
    setConversationHistory([]);
    setShowWelcome(true);
    setInput("");
  };

  const activeColor = MODULE_TABS.find(t => t.id === activeModule)?.color || "#00C896";

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0A0F",
      fontFamily: "'DM Sans', 'Be Vietnam Pro', sans-serif",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background grid */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: `radial-gradient(circle at 20% 20%, ${activeColor}18 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, #7C3AED18 0%, transparent 50%),
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
        backgroundSize: "100% 100%, 100% 100%, 40px 40px, 40px 40px",
        transition: "background-image 0.5s ease",
      }} />
 <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap');
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        .msg-bubble { animation: slideUp 0.3s cubic-bezier(.16,1,.3,1) both; }
        @keyframes slideUp { from { opacity:0; transform: translateY(12px); } to { opacity:1; transform: none; } }
        .dot-pulse { display:flex; gap:4px; align-items:center; }
        .dot-pulse span { width:6px; height:6px; border-radius:50%; background: currentColor; animation: pulse 1.2s ease-in-out infinite; }
        .dot-pulse span:nth-child(2) { animation-delay:.2s; }
        .dot-pulse span:nth-child(3) { animation-delay:.4s; }
        @keyframes pulse { 0%,100%{opacity:.3;transform:scale(.8);} 50%{opacity:1;transform:scale(1.1);} }
        .quick-btn:hover { transform: translateY(-2px); filter: brightness(1.1); }
        .quick-btn { transition: all 0.2s cubic-bezier(.16,1,.3,1); }
        .tab-btn:hover { opacity: 1 !important; }
        .tab-btn { transition: all 0.2s; }
        .send-btn:hover { transform: scale(1.05); }
        .send-btn { transition: all 0.15s; }
        textarea { resize: none; }
        .msg-content p { margin: 0 0 10px; }
        .msg-content p:last-child { margin-bottom: 0; }
        .msg-content strong { font-weight: 600; }
        .msg-content ul, .msg-content ol { padding-left: 20px; margin: 8px 0; }
        .msg-content li { margin: 4px 0; line-height: 1.6; }
        .msg-content code { background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 0.9em; }
        .msg-content h3, .msg-content h2 { font-family: 'Space Grotesk', sans-serif; margin: 12px 0 6px; }
        .glow-border { box-shadow: 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,255,255,0.04); }
      `}</style>

      {/* Header */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(10,10,15,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "0 20px",
      }}>
        <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", alignItems: "center", gap: 16, height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: `linear-gradient(135deg, ${activeColor}, #7C3AED)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, transition: "background 0.5s",
            }}>🧠</div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", letterSpacing: "-0.3px" }}>
                EduBot <span style={{ color: activeColor }}>Pro</span>
              </div>
              <div style={{ fontSize: 10, color: "#666", letterSpacing: "0.5px" }}>IELTS · SAT · GMAT · Chứng chỉ QT</div>
            </div>
          </div>

          {/* Module Tabs */}
          <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 3 }}>
            {MODULE_TABS.map(tab => (
              <button key={tab.id} className="tab-btn" onClick={() => setActiveModule(tab.id)} style={{
                padding: "5px 10px", borderRadius: 7, border: "none", cursor: "pointer",
                background: activeModule === tab.id ? tab.color + "22" : "transparent",
                color: activeModule === tab.id ? tab.color : "#666",
                fontSize: 11, fontWeight: 600, letterSpacing: "0.3px",
                opacity: activeModule === tab.id ? 1 : 0.6,
                display: "flex", alignItems: "center", gap: 4,
              }}>
                <span>{tab.icon}</span>
                <span style={{ display: window.innerWidth > 500 ? "block" : "none" }}>{tab.label}</span>
              </button>
            ))}
          </div>

          <button onClick={resetChat} style={{
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
            color: "#888", padding: "6px 10px", borderRadius: 8, cursor: "pointer", fontSize: 12,
          }}>↺</button>
        </div>
      </header>

      {/* Chat Area */}
      <div style={{ flex: 1, overflowY: "auto", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "20px 20px 120px" }}>

          {/* Welcome Screen */}
          {showWelcome && (
            <div style={{ animation: "slideUp 0.5s cubic-bezier(.16,1,.3,1) both" }}>
              <div style={{ textAlign: "center", padding: "40px 20px 30px" }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: `${activeColor}15`, border: `1px solid ${activeColor}30`,
                  borderRadius: 100, padding: "6px 16px", marginBottom: 24,
                  fontSize: 12, color: activeColor, fontWeight: 600, letterSpacing: "0.5px",
                }}>
                  ✦ AI TUTOR — PHƯƠNG PHÁP KHOA HỌC NÃO BỘ
                </div>
                <h1 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 700,
                  color: "#fff", margin: "0 0 12px", lineHeight: 1.15,
                  letterSpacing: "-1px",
                }}>
                  Học thật, không học vẹt.<br />
                  <span style={{ color: activeColor }}>Kết quả thật.</span>
                </h1>
                <p style={{ color: "#666", fontSize: 15, maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.7 }}>
                  Gia sư AI tích hợp phương pháp Spaced Repetition, Active Recall, Comprehensible Input — không theo lối mòn truyền thống.
                </p>

                {/* Stats */}
                <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 36, flexWrap: "wrap" }}>
                  {[["IELTS 0→9.0", "📈"], ["SAT Digital", "🔢"], ["GMAT Focus", "📊"], ["Bằng QT Online", "🎓"]].map(([label, icon]) => (
                    <div key={label} style={{
                      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 10, padding: "10px 16px", fontSize: 13, color: "#ccc",
                      display: "flex", alignItems: "center", gap: 6,
                    }}>
                      <span>{icon}</span> {label}
                    </div>
                  ))}
                </div>

                {/* Quick starts */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
                  {QUICK_STARTS.map((q) => (
                    <button key={q.label} className="quick-btn" onClick={() => sendMessage(q.msg)} style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 12, padding: "12px 16px",
                      color: "#ccc", cursor: "pointer", textAlign: "left",
                      display: "flex", alignItems: "center", gap: 10,
                    }}>
                      <span style={{ fontSize: 18 }}>{q.icon}</span>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{q.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg) => (
            <div key={msg.id} className="msg-bubble" style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              marginBottom: 16,
            }}>
              {msg.role === "assistant" && (
                <div style={{
                  width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                  background: `linear-gradient(135deg, ${activeColor}, #7C3AED)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, marginRight: 10, marginTop: 2,
                }}>🧠</div>
              )}
              <div style={{
                maxWidth: "80%",
                background: msg.role === "user"
                  ? `linear-gradient(135deg, ${activeColor}CC, ${activeColor}99)`
                  : "rgba(255,255,255,0.05)",
                border: msg.role === "user" ? "none" : "1px solid rgba(255,255,255,0.07)",
                borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                padding: "12px 16px",
                color: msg.role === "user" ? "#fff" : "#ddd",
                fontSize: 14, lineHeight: 1.7,
              }}>
                <div className="msg-content" style={{ whiteSpace: "pre-wrap" }}
                  dangerouslySetInnerHTML={{
                    __html: msg.content
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/\*(.*?)\*/g, "<em>$1</em>")
                      .replace(/`(.*?)`/g, "<code>$1</code>")
                      .replace(/^### (.*)/gm, "<h3>$1</h3>")
                      .replace(/^## (.*)/gm, "<h2>$1</h2>")
                      .replace(/^- (.*)/gm, "• $1")
                  }}
                />
              </div>
            </div>
          ))}

          {/* Loading */}
          {loading && (
            <div className="msg-bubble" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                background: `linear-gradient(135deg, ${activeColor}, #7C3AED)`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
              }}>🧠</div>
              <div style={{
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "18px 18px 18px 4px", padding: "14px 18px",
                color: activeColor,
              }}>
                <div className="dot-pulse">
                  <span /><span /><span />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input Bar */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(10,10,15,0.92)", backdropFilter: "blur(24px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "12px 20px 16px",
      }}>
        <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", gap: 10, alignItems: "flex-end" }}>
          <div style={{
            flex: 1,
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${input ? activeColor + "50" : "rgba(255,255,255,0.08)"}`,
            borderRadius: 14, transition: "border-color 0.2s",
            display: "flex", alignItems: "flex-end", gap: 8, padding: "10px 14px",
          }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Hỏi bất cứ điều gì về IELTS, SAT, GMAT..."
              rows={1}
              style={{
                flex: 1, background: "none", border: "none", outline: "none",
                color: "#fff", fontSize: 14, lineHeight: 1.6, maxHeight: 120,
                overflowY: "auto", fontFamily: "inherit",
              }}
              onInput={e => { e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px"; }}
            />
          </div>
          <button
            className="send-btn"
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            style={{
              width: 44, height: 44, borderRadius: 12, border: "none", cursor: "pointer",
              background: input.trim() && !loading ? `linear-gradient(135deg, ${activeColor}, #7C3AED)` : "rgba(255,255,255,0.05)",
              color: input.trim() && !loading ? "#fff" : "#555",
              fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}
          >↑</button>
        </div>
        <div style={{ maxWidth: 820, margin: "6px auto 0", textAlign: "center", fontSize: 10, color: "#333" }}>
          Enter để gửi · Shift+Enter xuống dòng · EduBot Pro sử dụng Claude AI
        </div>
      </div>
    </div>
  );
}