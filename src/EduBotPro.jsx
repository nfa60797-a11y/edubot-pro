                          import { useState, useRef, useEffect, useCallback } from "react";

// ─── PROMPTS ──────────────────────────────────────────────────────────────────
const BASE_SYSTEM = `Bạn là EduBot Pro — gia sư AI dạy tiếng Anh, IELTS, SAT, GMAT bằng tiếng Việt. Triết lý: 80/20 — chỉ dạy 20% kiến thức cover 80% tình huống thực tế. Không lan man, không dạy thứ ít dùng. Mỗi giải thích = ngắn gọn + ví dụ thật + áp dụng ngay.

══════════════════════════════════════════
📌 KNOWLEDGE BASE — TIẾNG ANH THỰC CHIẾN
══════════════════════════════════════════

## A. 7 THÌ CỐT LÕI (80/20 — bỏ qua thì hiếm gặp)

### 1. Present Simple — thói quen, sự thật
- Dùng: lịch trình, quy luật tự nhiên, cảm xúc hiện tại
- "She works at Google." / "I don't like coffee."
- Bẫy: He work❌ → He works✅ (he/she/it + s)

### 2. Present Continuous — đang xảy ra / kế hoạch gần
- "I'm studying now." / "We're meeting tomorrow."
- Bẫy: I'm knowing❌ — state verbs (know/love/want/have) KHÔNG dùng -ing

### 3. Present Perfect — quá khứ còn liên quan hiện tại
- "I have lived here for 5 years." / "Have you ever been to Tokyo?"
- Keywords: for, since, already, yet, ever, never, just
- IELTS/GMAT HAY dùng thì này — học kỹ
- Bẫy: I have went❌ → I have gone✅

### 4. Past Simple — sự kiện hoàn chỉnh trong quá khứ
- "She graduated in 2020." / "Did you finish the report?"
- Dùng khi có time marker: yesterday, last week, in 2019, ago

### 5. Past Continuous — đang xảy ra thì bị gián đoạn
- "I was sleeping when she called."
- Dùng nhiều trong storytelling, IELTS Writing Task 1 (graphs với trends)

### 6. Future: will vs going to vs Present Continuous
- will = quyết định tức thời, dự đoán không chắc: "I'll help you."
- going to = kế hoạch đã có / dự đoán có bằng chứng: "It's going to rain." / "I'm going to study abroad."
- Present Continuous = lịch đã sắp xếp: "I'm flying to London on Monday."

### 7. Conditionals — CỰC QUAN TRỌNG cho IELTS/SAT/GMAT
- Type 1 (có thể xảy ra): "If I study hard, I will pass."
- Type 2 (giả định): "If I were rich, I would travel." — NOTE: were (không phải was) cho mọi chủ ngữ
- Type 3 (nuối tiếc quá khứ): "If I had studied, I would have passed."
- Mixed: "If I had studied harder, I would be a doctor now."

---

## B. NGỮ PHÁP TRỌNG TÂM (hay bị sai nhất)

### Articles: a / an / the / zero
- a/an = lần đầu đề cập, không xác định: "I saw a dog."
- the = đã biết, duy nhất, đề cập lại: "The dog was huge."
- Zero = tổng quát: "Dogs are loyal." / "I love music."
- IELTS hay bẫy: the environment✅ / the society❌ (nói chung → society thôi)

### Modal verbs (must / should / can / could / might / would)
- must = bắt buộc hoặc suy luận chắc: "You must wear a seatbelt." / "She must be tired."
- should = khuyên bảo: "You should exercise more."
- could/might = có thể (không chắc): "It might rain."
- would = lịch sự / điều kiện: "Would you help me?"

### Passive Voice — IELTS Academic hay dùng
- Be + V3: "The report was written by the team."
- Dùng khi: không biết ai làm / muốn nhấn mạnh kết quả / văn phong học thuật

### Relative Clauses
- who (người), which (vật), that (cả hai), where (nơi), whose (sở hữu)
- Defining: "The book that I read was amazing." (không có dấu phẩy)
- Non-defining: "My sister, who lives in Hanoi, is a doctor." (có dấu phẩy — GMAT hay test)

### Gerund vs Infinitive — bẫy cổ điển
- Gerund (V-ing) sau: enjoy, avoid, finish, suggest, consider, keep, mind, practice
- Infinitive (to V) sau: want, need, plan, decide, hope, agree, refuse, manage, seem
- Cả hai (nghĩa khác): remember/forget/stop/try + ing vs to

---

## C. TỪ VỰNG — NGUYÊN TẮC 80/20

### Academic Word List (AWL) — 570 từ cover 10% văn bản học thuật
Top nhóm hay gặp nhất trong IELTS/SAT/GMAT:
- **Analyze, assess, assume, concept, context, define, establish, evidence, factor, impact, indicate, involve, issue, major, method, occur, policy, process, require, significant, source, structure, theory**

### Collocations quan trọng (học theo cụm, không học từ đơn)
- make a decision / take action / do research / have an impact
- reach a conclusion / raise awareness / address an issue / draw a conclusion
- significantly increase / slightly decrease / gradually improve / sharply decline (IELTS Writing Task 1)

### Synonyms thay thế "weak words" — IELTS Lexical Resource
- good → beneficial, advantageous, favorable
- bad → detrimental, harmful, adverse  
- show → demonstrate, indicate, illustrate, reveal
- think → argue, suggest, contend, maintain
- big → substantial, significant, considerable
- many → numerous, a significant number of, a wide range of

---

## D. IELTS — CHIẾN THUẬT THỰC CHIẾN

### Writing Task 2 (Essay) — cấu trúc chuẩn
**Intro**: Paraphrase đề + Thesis statement (1 câu nêu quan điểm)
**Body 1**: Topic sentence → Explain → Example → Link
**Body 2**: Topic sentence → Explain → Example → Link  
**Conclusion**: Restate thesis + Summary (KHÔNG đưa ý mới)
- Lỗi phổ biến: dùng "I think" → thay bằng "It is argued that..." / "Evidence suggests..."
- Band 7+ cần: cohesive devices (However, Furthermore, In contrast, Consequently)

### Writing Task 1 (Academic — Graphs)
Cấu trúc: Overview (xu hướng chung) → Detail group 1 → Detail group 2
- KHÔNG mô tả từng số một — phân tích xu hướng
- Phrases: "rose sharply to", "remained relatively stable", "accounted for X%", "peaked at"

### Reading — 3 chiến thuật cốt lõi
1. **Skim** overview trước (title, heading, first sentence mỗi đoạn) — 2 phút
2. **Scan** tìm keywords từ câu hỏi trong bài
3. **T/F/NG**: True = đúng y chang | False = sai | NG = bài không đề cập (hay nhầm False với NG)

### Listening — keyword prediction
- Đọc câu hỏi TRƯỚC khi nghe — predict loại thông tin cần (số, tên, địa điểm)
- Paraphrase: bài nói "expensive" → đáp án ghi "high cost"
- Section 4 = academic monologue, khó nhất — tập trung signal words: "however", "in fact", "moving on to"

### Speaking — công thức PEEL cho Part 2/3
Point → Explain → Example → Link back
- Filler tự nhiên: "That's an interesting question...", "From my perspective...", "What I mean is..."
- Tránh: "very very very", lặp từ, dừng quá lâu
- Band 7+ cần: idioms dùng đúng chỗ, complex sentences, self-correction tự nhiên

---

## E. SAT — TRỌNG TÂM

### Reading & Writing (Digital SAT)
- **Rhetorical purpose**: tại sao tác giả dùng câu/đoạn này? → xác định tone (critical/supportive/neutral)
- **Transitions**: Therefore/However/Furthermore/In contrast — chọn từ đúng logic
- **Grammar rules hay test**: Subject-verb agreement, pronoun agreement, modifier placement, parallel structure
- Parallel: "She likes reading, writing, and to swim"❌ → "reading, writing, and swimming"✅

### Math (Digital SAT — dùng Desmos)
- **Linear equations**: slope-intercept y=mx+b — graph ngay trên Desmos
- **Systems of equations**: elimination vs substitution — biết khi nào dùng cái nào
- **Quadratics**: factoring, completing the square, quadratic formula
- **Percentages & ratios**: 90% bài word problem — đọc chậm, identify what's being asked
- **Desmos hack**: plug in answer choices vào graph để check nhanh

---
## F. GMAT — TRỌNG TÂM

### Critical Reasoning (CR) — 5 loại câu hỏi
1. **Strengthen/Weaken**: tìm assumption ẩn → attack/support nó
2. **Assumption**: "For the argument to hold, which must be true?"
3. **Inference**: chỉ kết luận từ thông tin đã cho, không suy thêm
4. **Bold-face**: xác định role của 2 câu in đậm trong argument
5. **Evaluate**: tìm thông tin nào sẽ làm rõ argument đúng/sai

### Reading Comprehension (RC)
- Đọc paragraph đầu + câu đầu mỗi đoạn → nắm structure
- "Primary purpose" câu hỏi → luôn ở mức tổng quát (không phải chi tiết)
- Eliminate answers có "extreme language": always/never/only/all

### Quantitative (QR)
- Data Sufficiency (DS): KHÔNG cần tính ra đáp án — chỉ cần biết CÓ ĐỦ dữ liệu không
- DS answer choices luôn là A/B/C/D/E cố định — học thuộc
- Estimation: làm tròn số để tính nhanh, tránh tính tay chính xác

══════════════════════════════════════════
📌 PHONG CÁCH DẠY
══════════════════════════════════════════
- Trả lời ngắn gọn, dùng ví dụ thật ngay
- So sánh với tiếng Việt khi giải thích ngữ pháp
- Luôn kèm "bẫy hay gặp" khi dạy rule
- Sau mỗi giải thích: đặt 1 câu hỏi kiểm tra ngay (Active Recall)
- Khi sai: "Gần rồi! Điểm cần sửa là..." — không nói "Sai"
- Ưu tiên tiếng Việt, xen tiếng Anh khi cần thiết`;

const SPEAKING_SYSTEM = `You are EduBot Pro's IELTS Speaking Coach — a friendly, encouraging British examiner.
RULES: English only. Max 60 words per reply. After student speaks: [FEEDBACK: one tip] then [QUESTION: next question]. Natural examiner phrases. Progress Part 1→2→3 naturally.`;

const LISTENING_GEN_SYSTEM = `You are an IELTS Listening test creator. Generate a realistic IELTS Listening passage in JSON format only (no markdown, no extra text).

Format:
{
  "title": "short title",
  "type": "Section 1|Section 2|Section 3|Section 4",
  "context": "one-line context description",
  "script": "Full spoken script (200-350 words). Natural dialogue or monologue. Use CAPITALIZED KEYWORDS for key answers. Include pauses with [pause].",
  "questions": [
    {
      "id": 1,
      "type": "form_completion|multiple_choice|map_labelling|sentence_completion",
      "question": "question text",
      "options": ["A) ...", "B) ...", "C) ..."] or null,
      "answer": "correct answer",
      "tip": "brief strategy tip in Vietnamese"
    }
  ]
}

Make 5 questions. Difficulty: realistic IELTS band 5-7. Script must be natural spoken English.`;

const LISTENING_EVAL_SYSTEM = `You are an IELTS Listening answer evaluator. Given the script, questions, and student answers, evaluate and give feedback in Vietnamese.
For each question: say correct/incorrect, explain why, give the strategy insight.
End with: band score estimate, main weakness, one actionable tip.
Be encouraging. Format clearly.`;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const QUICK_STARTS = [
  { icon: "🎯", label: "Test trình độ ngay", msg: "Hãy kiểm tra trình độ tiếng Anh của tôi bằng 5 câu hỏi nhanh bao gồm ngữ pháp và từ vựng, sau đó nhận xét điểm mạnh yếu" },
  { icon: "⏰", label: "7 thì quan trọng nhất", msg: "Dạy tôi 7 thì tiếng Anh quan trọng nhất theo kiểu 80/20 — ngắn gọn, ví dụ thực tế, kèm bẫy hay gặp" },
  { icon: "✍️", label: "IELTS Writing Task 2", msg: "Dạy tôi cấu trúc IELTS Writing Task 2 chuẩn band 7, kèm ví dụ và lỗi hay gặp nhất" },
  { icon: "📖", label: "True/False/NG trick", msg: "Giải thích chiến thuật làm True/False/Not Given trong IELTS Reading kèm ví dụ thực hành ngay" },
  { icon: "🔢", label: "SAT Math + Desmos", msg: "Chỉ tôi cách dùng Desmos trong SAT Math để giải nhanh hơn, kèm các dạng bài hay gặp nhất" },
  { icon: "🧠", label: "GMAT Critical Reasoning", msg: "Dạy tôi 5 loại câu hỏi Critical Reasoning trong GMAT và cách approach từng loại ngắn gọn" },
];

const MODULE_TABS = [
  { id: "ielts",    label: "IELTS",    icon: "🇬🇧", color: "#00C896" },
  { id: "listening",label: "Listening",icon: "🎧", color: "#3B82F6" },
  { id: "speaking", label: "Speaking", icon: "🗣️",  color: "#F59E0B" },
  { id: "sat",      label: "SAT",      icon: "🇺🇸", color: "#FF6B35" },
  { id: "gmat",     label: "GMAT",     icon: "📊", color: "#7C3AED" },
];

const SPEAKING_TOPICS = [
  "Hometown & Family","Technology & Social Media","Education & Learning",
  "Environment & Climate","Travel & Culture","Work & Career","Health & Lifestyle",
];

const LISTENING_TYPES = [
  { id:"s1", label:"Section 1", desc:"Conversation — daily life", icon:"💬" },
  { id:"s2", label:"Section 2", desc:"Monologue — social context", icon:"🎤" },
  { id:"s3", label:"Section 3", desc:"Multi-speaker — academic", icon:"🏫" },
  { id:"s4", label:"Section 4", desc:"Academic lecture", icon:"🎓" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const stripMd = t => t.replace(/\*\*(.*?)\*\*/g,"$1").replace(/\*(.*?)\*/g,"$1").replace(/`(.*?)`/g,"$1").replace(/^#{1,3}\s+/gm,"").replace(/\[FEEDBACK:\s*/g,"").replace(/\]\s*\[QUESTION:\s*/g," ").replace(/\]/g,"").trim();

const renderMd = t => t
  .replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>")
  .replace(/\*(.*?)\*/g,"<em>$1</em>")
  .replace(/`(.*?)`/g,"<code>$1</code>")
  .replace(/^### (.*)/gm,"<h3>$1</h3>")
  .replace(/^## (.*)/gm,"<h2>$1</h2>")
  .replace(/^- (.*)/gm,"• $1")
  .replace(/\[FEEDBACK:(.*?)\]/gs,'<span style="color:#F59E0B">📝$1</span>')
  .replace(/\[QUESTION:(.*?)\]/gs,'<span style="color:#00C896">🎤$1</span>');

async function callClaude(system, messages, max_tokens=1000) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens, system, messages }),
  });
  const d = await res.json();
  return d.content?.map(b=>b.text||"").join("") || "";
}
VOICE VISUALIZER ─────────────────────────────────────────────────────────
function Viz({ active, color }) {
  const [heights, setHeights] = useState(Array(10).fill(4));
  useEffect(() => {
    if (!active) { setHeights(Array(10).fill(4)); return; }
    const id = setInterval(() => setHeights(Array(10).fill(0).map(()=>4+Math.random()*22)), 120);
    return () => clearInterval(id);
  }, [active]);
  return (
    <div style={{display:"flex",alignItems:"center",gap:2,height:28}}>
      {heights.map((h,i)=>(
        <div key={i} style={{width:3,borderRadius:2,background:color,height:h,transition:"height 0.1s",opacity:active?0.9:0.3}}/>
      ))}
    </div>
  );
}

// ─── LISTENING MODULE ─────────────────────────────────────────────────────────
function ListeningModule({ color }) {
  const [phase, setPhase] = useState("pick"); // pick | loading | ready | playing | answering | result
  const [sectionType, setSectionType] = useState("s1");
  const [passage, setPassage] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [evalLoading, setEvalLoading] = useState(false);
  const [showScript, setShowScript] = useState(false);
  const synthRef = useRef(window.speechSynthesis);
  const utterRef = useRef(null);
  const progRef = useRef(null);

  const sectionLabel = { s1:"Section 1", s2:"Section 2", s3:"Section 3", s4:"Section 4" };

  const generatePassage = async () => {
    setPhase("loading");
    try {
      const raw = await callClaude(LISTENING_GEN_SYSTEM, [{ role:"user", content:`Create an IELTS Listening ${sectionLabel[sectionType]} passage. Return JSON only.` }], 1000);
      const clean = raw.replace(/```json|```/g,"").trim();
      const data = JSON.parse(clean);
      setPassage(data);
      setAnswers({});
      setResult("");
      setProgress(0);
      setHasPlayed(false);
      setShowScript(false);
      setPhase("ready");
    } catch(e) {
      setPhase("pick");
      alert("Lỗi tạo bài. Thử lại nhé!");
    }
  };

  const playAudio = () => {
    if (!passage) return;
    synthRef.current.cancel();
    const text = passage.script.replace(/\[pause\]/g, "... ");
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-GB";
    utter.rate = 0.88;
    utter.pitch = 1.0;
    const voices = synthRef.current.getVoices();
    const v = voices.find(v=>v.lang==="en-GB"&&v.name.includes("Daniel"))
           || voices.find(v=>v.lang==="en-GB")
           || voices.find(v=>v.lang.startsWith("en"));
    if (v) utter.voice = v;

    const words = text.split(" ").length;
    const dur = (words / (150 * 0.88)) * 1000;
    const start = Date.now();
    progRef.current = setInterval(() => {
      const pct = Math.min(((Date.now()-start)/dur)*100, 99);
      setProgress(pct);
    }, 300);

    utter.onstart = () => { setIsPlaying(true); setIsPaused(false); setPhase("playing"); };
    utter.onend = () => {
      setIsPlaying(false); setProgress(100); setHasPlayed(true);
      clearInterval(progRef.current);
      setPhase("answering");
    };
    utter.onerror = () => { setIsPlaying(false); clearInterval(progRef.current); };
    utterRef.current = utter;
    synthRef.current.speak(utter);
  };

  const pauseResume = () => {
    if (isPaused) { synthRef.current.resume(); setIsPaused(false); setIsPlaying(true); }
    else { synthRef.current.pause(); setIsPaused(true); setIsPlaying(false); }
  };

  const stopAudio = () => {
    synthRef.current.cancel();
    clearInterval(progRef.current);
    setIsPlaying(false); setIsPaused(false);
    setHasPlayed(true); setPhase("answering");
  };const submitAnswers = async () => {
    setEvalLoading(true);
    const qa = passage.questions.map((q,i)=>
      `Q${i+1}: ${q.question}\nStudent answer: ${answers[i]||"(no answer)"}\nCorrect: ${q.answer}`
    ).join("\n\n");
    const prompt = `Script: ${passage.script}\n\nQuestions & Answers:\n${qa}\n\nEvaluate all answers in Vietnamese.`;
    const eval_result = await callClaude(LISTENING_EVAL_SYSTEM, [{role:"user",content:prompt}], 1000);
    setResult(eval_result);
    setPhase("result");
    setEvalLoading(false);
  };

  const reset = () => { synthRef.current.cancel(); clearInterval(progRef.current); setPhase("pick"); setPassage(null); setAnswers({}); setResult(""); setProgress(0); };

  // PICK PHASE
  if (phase === "pick") return (
    <div style={{padding:"20px 0"}}>
      <div style={{textAlign:"center",marginBottom:24}}>
        <div style={{fontSize:32,marginBottom:8}}>🎧</div>
        <h2 style={{fontFamily:"'Space Grotesk',sans-serif",color:"#fff",margin:"0 0 6px",fontSize:20}}>IELTS Listening Practice</h2>
        <p style={{color:"#666",fontSize:13,margin:0}}>AI tạo bài nghe thật → TTS đọc to → Hỏi câu hỏi → Chấm điểm & giải thích</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginBottom:20}}>
        {LISTENING_TYPES.map(t=>(
          <button key={t.id} onClick={()=>setSectionType(t.id)} style={{
            background: sectionType===t.id ? `${color}22` : "rgba(255,255,255,0.03)",
            border: `1px solid ${sectionType===t.id ? color : "rgba(255,255,255,0.08)"}`,
            borderRadius:12, padding:"14px 12px", cursor:"pointer", textAlign:"left", transition:"all .2s"
          }}>
            <div style={{fontSize:20,marginBottom:4}}>{t.icon}</div>
            <div style={{color: sectionType===t.id ? color : "#ccc", fontWeight:600, fontSize:13}}>{t.label}</div>
            <div style={{color:"#555",fontSize:11,marginTop:2}}>{t.desc}</div>
          </button>
        ))}
      </div>
      <button onClick={generatePassage} style={{width:"100%",background:`linear-gradient(135deg,${color},#3B82F6)`,border:"none",color:"#fff",padding:"13px",borderRadius:12,cursor:"pointer",fontWeight:700,fontSize:15}}>
        🎲 Tạo bài nghe ngẫu nhiên
      </button>
    </div>
  );

  if (phase === "loading") return (
    <div style={{textAlign:"center",padding:"60px 20px"}}>
      <div style={{fontSize:36,marginBottom:16}}>⚙️</div>
      <div style={{color:color,fontWeight:600,marginBottom:8}}>Đang tạo bài nghe...</div>
      <div style={{color:"#555",fontSize:13}}>AI đang viết script thực tế, 5 câu hỏi IELTS-style</div>
    </div>
  );

  if (evalLoading) return (
    <div style={{textAlign:"center",padding:"60px 20px"}}>
      <div style={{fontSize:36,marginBottom:16}}>📊</div>
      <div style={{color:color,fontWeight:600,marginBottom:8}}>Đang chấm bài...</div>
      <div style={{color:"#555",fontSize:13}}>AI đang phân tích câu trả lời của bạn</div>
    </div>
  );

  // READY / PLAYING / ANSWERING / RESULT
  return (
    <div style={{padding:"8px 0"}}>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
        <div>
          <div style={{color:color,fontSize:11,fontWeight:700,letterSpacing:".5px",marginBottom:3}}>{passage?.type} · {passage?.context}</div>
          <div style={{color:"#fff",fontWeight:600,fontSize:15}}>{passage?.title}</div>
        </div>
        <button onClick={reset} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"#888",padding:"5px 10px",borderRadius:8,cursor:"pointer",fontSize:12}}>↺ Bài mới</button>
      </div>

      {/* Player */}
      {(phase==="ready"||phase==="playing"||phase==="answering") && (
        <div style={{background:"rgba(59,130,246,0.08)",border:"1px solid rgba(59,130,246,0.2)",borderRadius:14,padding:"16px",marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
            <Viz active={isPlaying} color={color}/>
            <div style={{flex:1}}>
              <div style={{height:4,background:"rgba(255,255,255,0.08)",borderRadius:4,overflow:"hidden"}}>
                <div style={{height:"100%",background:`linear-gradient(90deg,${color},#3B82F6)`,width:`${progress}%`,transition:"width .3s",borderRadius:4}}/>
              </div>
            </div>
            <div style={{fontSize:11,color:"#555"}}>{Math.round(progress)}%</div>
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {!isPlaying && !isPaused && !hasPlayed && (
              <button onClick={playAudio} style={{background:`linear-gradient(135deg,${color},#3B82F6)`,border:"none",color:"#fff",padding:"9px 18px",borderRadius:10,cursor:"pointer",fontWeight:700,fontSize:13,display:"flex",alignItems:"center",gap:6}}>
                ▶ Nghe bài
              </button>
            )}
            {(isPlaying||isPaused) && (
              <>
                <button onClick={pauseResume} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.12)",color:"#ccc",padding:"9px 16px",borderRadius:10,cursor:"pointer",fontSize:13}}>
                  {isPaused?"▶ Tiếp tục":"⏸ Pause"}
                </button>
                <button onClick={stopAudio} style={{background:"rgba(255,80,80,0.15)",border:"1px solid rgba(255,80,80,0.25)",color:"#ff8888",padding:"9px 16px",borderRadius:10,cursor:"pointer",fontSize:13}}>
                  ⏹ Dừng & Trả lời
                </button>
              </>
            )}
            {hasPlayed && !isPlaying && (
              <button onClick={playAudio} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"#aaa",padding:"9px 16px",borderRadius:10,cursor:"pointer",fontSize:13}}>
                🔁 Nghe lại
              </button>
            )}
            <button onClick={()=>setShowScript(!showScript)} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",color:"#666",padding:"9px 16px",borderRadius:10,cursor:"pointer",fontSize:13}}>
              {showScript?"🙈 Ẩn script":"📄 Xem script"}
            </button>
          </div>
          {showScript && (
            <div style={{marginTop:12,background:"rgba(0,0,0,0.3)",borderRadius:10,padding:"12px",color:"#aaa",fontSize:12,lineHeight:1.8,maxHeight:180,overflowY:"auto"}}>
              {passage?.script}
            </div>
          )}
          {!hasPlayed && phase==="ready" && (
            <div style={{marginTop:10,fontSize:11,color:"#555"}}>💡 Nghe xong rồi mới trả lời — giống thi thật!</div>
          )}
        </div>
      )}
            {/* Questions */}
      {(phase==="answering"||phase==="result") && (
        <div style={{marginBottom:16}}>
          <div style={{color:"#fff",fontWeight:600,fontSize:14,marginBottom:12}}>📝 Câu hỏi ({passage?.questions?.length} câu)</div>
          {passage?.questions?.map((q,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:"13px",marginBottom:10}}>
              <div style={{color:"#ccc",fontSize:13,marginBottom:8,lineHeight:1.5}}>
                <span style={{color:color,fontWeight:700}}>Q{i+1}.</span> {q.question}
              </div>
              {q.type==="multiple_choice" && q.options ? (
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  {q.options.map((opt,j)=>(
                    <label key={j} style={{display:"flex",alignItems:"center",gap:8,cursor:phase==="answering"?"pointer":"default",fontSize:13,color: answers[i]===opt ? color : "#888"}}>
                      <input type="radio" name={`q${i}`} value={opt} checked={answers[i]===opt} disabled={phase==="result"} onChange={()=>setAnswers({...answers,[i]:opt})} style={{accentColor:color}}/>
                      {opt}
                    </label>
                  ))}
                </div>
              ) : (
                <input value={answers[i]||""} onChange={e=>setAnswers({...answers,[i]:e.target.value})} disabled={phase==="result"} placeholder="Nhập câu trả lời..." style={{width:"100%",background:"rgba(255,255,255,0.05)",border:`1px solid ${answers[i]?color+"40":"rgba(255,255,255,0.08)"}`,borderRadius:8,padding:"8px 10px",color:"#fff",fontSize:13,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
              )}
              {phase==="result" && (
                <div style={{marginTop:6,fontSize:11,color:"#F59E0B"}}>💡 {q.tip}</div>
              )}
            </div>
          ))}
          {phase==="answering" && (
            <button onClick={submitAnswers} style={{width:"100%",background:`linear-gradient(135deg,${color},#3B82F6)`,border:"none",color:"#fff",padding:"12px",borderRadius:12,cursor:"pointer",fontWeight:700,fontSize:14}}>
              ✅ Nộp bài & Chấm điểm
            </button>
          )}
        </div>
      )}

      {/* Result */}
      {phase==="result" && result && (
        <div style={{background:"rgba(0,200,150,0.06)",border:"1px solid rgba(0,200,150,0.2)",borderRadius:14,padding:"16px"}}>
          <div style={{color:"#00C896",fontWeight:700,fontSize:13,marginBottom:10}}>📊 Kết quả & Phân tích</div>
          <div style={{color:"#ccc",fontSize:13,lineHeight:1.8,whiteSpace:"pre-wrap"}} dangerouslySetInnerHTML={{__html:renderMd(result)}}/>
        </div>
      )}
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function EduBotPro() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeModule, setActiveModule] = useState("ielts");
  const [showWelcome, setShowWelcome] = useState(true);
  const [conversationHistory, setConversationHistory] = useState([]);

  // Speaking
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [voiceSupported] = useState(!!(window.SpeechRecognition||window.webkitSpeechRecognition)&&!!window.speechSynthesis);
  const [selectedTopic, setSelectedTopic] = useState(SPEAKING_TOPICS[0]);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [micError, setMicError] = useState("");

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  const isSpeakingMode = activeModule === "speaking";
  const isListeningModule = activeModule === "listening";
  const activeColor = MODULE_TABS.find(t=>t.id===activeModule)?.color || "#00C896";

  useEffect(() => { bottomRef.current?.scrollIntoView({behavior:"smooth"}); }, [messages, loading]);

  const speak = useCallback((text) => {
    if (!synthRef.current||!autoSpeak) return;
    synthRef.current.cancel();
    const utter = new SpeechSynthesisUtterance(stripMd(text));
    utter.lang = isSpeakingMode ? "en-GB" : "vi-VN";
    utter.rate = isSpeakingMode ? 0.92 : 0.95;
    const voices = synthRef.current.getVoices();
    if (isSpeakingMode) {
      const v = voices.find(v=>v.lang==="en-GB"&&v.name.includes("Daniel"))||voices.find(v=>v.lang==="en-GB")||voices.find(v=>v.lang.startsWith("en"));
      if (v) utter.voice = v;
    } else {
      const v = voices.find(v=>v.lang==="vi-VN"); if (v) utter.voice = v;
    }
    utter.onstart = ()=>setIsSpeaking(true);
    utter.onend = ()=>setIsSpeaking(false);
    utter.onerror = ()=>setIsSpeaking(false);
    synthRef.current.speak(utter);
  }, [autoSpeak, isSpeakingMode]);

  const stopSpeaking = () => { synthRef.current?.cancel(); setIsSpeaking(false); };

  const startListening = useCallback(() => {
    const SR = window.SpeechRecognition||window.webkitSpeechRecognition;
    if (!SR) return;
    setMicError(""); stopSpeaking();
    const r = new SR();
    r.lang = isSpeakingMode ? "en-US" : "vi-VN";
    r.continuous = false; r.interimResults = true;
    r.onstart = ()=>{setIsListening(true);setTranscript("");};
    r.onresult = e=>{let t="";for(let i=e.resultIndex;i<e.results.length;i++)t+=e.results[i][0].transcript;setTranscript(t);};
    r.onend = ()=>{setIsListening(false);setTranscript(prev=>{if(prev.trim())setTimeout(()=>sendMessage(prev.trim()),100);return "";});};
    r.onerror = e=>{setIsListening(false);if(e.error==="not-allowed")setMicError("❌ Cần cho phép microphone!");else if(e.error==="no-speech")setMicError("🔇 Không nghe thấy. Thử lại!");else setMicError(`Lỗi: ${e.error}`);setTimeout(()=>setMicError(""),3000);};
    recognitionRef.current = r; r.start();
  }, [isSpeakingMode]);

  const stopListening = () => { recognitionRef.current?.stop(); setIsListening(false); };

  const sendMessage = async (text) => {
    const userText = (typeof text==="string"?text:input).trim();
    if (!userText||loading) return;
    setInput(""); setShowWelcome(false); setTranscript("");
    const userMsg = {role:"user",content:userText,id:Date.now()};
    const newHistory = [...conversationHistory,{role:"user",content:userText}];
    setMessages(prev=>[...prev,userMsg]);
    setLoading(true);
    const sys = isSpeakingMode ? SPEAKING_SYSTEM : BASE_SYSTEM;
    try {
      const reply = await callClaude(sys, newHistory);
      const aMsg = {role:"assistant",content:reply,id:Date.now()+1,voice:isSpeakingMode};
      setMessages(prev=>[...prev,aMsg]);
      setConversationHistory([...newHistory,{role:"assistant",content:reply}]);
      if(autoSpeak) speak(reply);
    } catch {
      setMessages(prev=>[...prev,{role:"assistant",content:"⚠️ Lỗi kết nối!",id:Date.now()+1}]);
    } finally { setLoading(false); }
  };

  const enterSpeakingMode = () => {
    setActiveModule("speaking"); setShowWelcome(false);
    setMessages([]); setConversationHistory([]);
    const intro = {role:"assistant",content:`🎙️ **IELTS Speaking Practice — ${selectedTopic}**\n\nHello! I'm your IELTS examiner. Today's topic: **"${selectedTopic}"**.\n\nLet's start with **Part 1** — some general questions.\n\n**Can you tell me a little about where you grew up?**`,id:Date.now(),voice:true};
    setMessages([intro]); setConversationHistory([{role:"assistant",content:intro.content}]);
    if(autoSpeak) setTimeout(()=>speak(intro.content),300);
  };

  const exitMode = () => { stopSpeaking(); stopListening(); setActiveModule("ielts"); setMessages([]); setConversationHistory([]); setShowWelcome(true); };
  const resetChat = () => { stopSpeaking(); stopListening(); setMessages([]); setConversationHistory([]); setShowWelcome(true); setInput(""); };
  const handleKey = e => { if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMessage();} };
  return (
    <div style={{minHeight:"100vh",background:"#0A0A0F",fontFamily:"'DM Sans',sans-serif",display:"flex",flexDirection:"column",position:"relative",overflow:"hidden"}}>
      <div style={{position:"fixed",inset:0,zIndex:0,backgroundImage:`radial-gradient(circle at 20% 20%,${activeColor}18 0%,transparent 50%),radial-gradient(circle at 80% 80%,#7C3AED18 0%,transparent 50%),linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)`,backgroundSize:"100% 100%,100% 100%,40px 40px,40px 40px"}}/>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap');
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#2a2a2a;border-radius:4px}
        .mb{animation:su .3s cubic-bezier(.16,1,.3,1) both}
        @keyframes su{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        @keyframes dp{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.1)}}
        @keyframes mp{0%,100%{box-shadow:0 0 0 0 #FF6B3540}50%{box-shadow:0 0 0 10px #FF6B3500}}
        .dp span{width:6px;height:6px;border-radius:50%;background:currentColor;animation:dp 1.2s ease-in-out infinite;display:inline-block}
        .dp span:nth-child(2){animation-delay:.2s}.dp span:nth-child(3){animation-delay:.4s}
        .dp{display:flex;gap:4px;align-items:center}
        .qbtn:hover{transform:translateY(-2px);filter:brightness(1.1)}
        .qbtn,.tbtn,.sbtn{transition:all .18s cubic-bezier(.16,1,.3,1)}
        .mac{animation:mp 1.5s ease-in-out infinite}
        .msg-content p{margin:0 0 8px}.msg-content p:last-child{margin:0}
        .msg-content strong{font-weight:600}
        .msg-content code{background:rgba(255,255,255,.1);padding:1px 5px;border-radius:4px;font-size:.88em}
        .msg-content h3,.msg-content h2{font-family:'Space Grotesk',sans-serif;margin:10px 0 5px}
        textarea{resize:none}
        input:focus{outline:none}
      `}</style>

      {/* HEADER */}
      <header style={{position:"sticky",top:0,zIndex:50,background:"rgba(10,10,15,0.9)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,255,255,0.06)",padding:"0 14px"}}>
        <div style={{maxWidth:840,margin:"0 auto",display:"flex",alignItems:"center",gap:10,height:56}}>
          <div style={{display:"flex",alignItems:"center",gap:9,flex:1,minWidth:0}}>
            <div style={{width:32,height:32,borderRadius:8,background:`linear-gradient(135deg,${activeColor},#7C3AED)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0}}>🧠</div>
            <div style={{minWidth:0}}>
              <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:14,color:"#fff",whiteSpace:"nowrap"}}>EduBot <span style={{color:activeColor}}>Pro</span></div>
              <div style={{fontSize:9,color:"#444",letterSpacing:".4px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{isSpeakingMode?"🎙️ Speaking Examiner":`IELTS · SAT · GMAT · Bằng QT`}</div>
            </div>
          </div>

          {/* TABS */}
          <div style={{display:"flex",gap:2,background:"rgba(255,255,255,0.04)",borderRadius:9,padding:"2px",flexShrink:0}}>
            {MODULE_TABS.map(tab=>(
              <button key={tab.id} className="tbtn" onClick={()=>{if(tab.id!=="speaking"){setActiveModule(tab.id);if(isSpeakingMode)exitMode();}else enterSpeakingMode();}} style={{padding:"5px 7px",borderRadius:6,border:"none",cursor:"pointer",background:activeModule===tab.id?tab.color+"22":"transparent",color:activeModule===tab.id?tab.color:"#555",fontSize:11,fontWeight:600,display:"flex",alignItems:"center",gap:3,opacity:activeModule===tab.id?1:0.7}}>
                <span>{tab.icon}</span>
                <span style={{display:"none"}} className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          {(isSpeakingMode||isListeningModule) ? (
            <button onClick={exitMode} style={{background:"rgba(255,80,80,0.12)",border:"1px solid rgba(255,80,80,0.25)",color:"#ff7070",padding:"5px 10px",borderRadius:8,cursor:"pointer",fontSize:11,fontWeight:600,flexShrink:0}}>✕ Thoát</button>
          ) : (
            <button onClick={resetChat} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",color:"#555",padding:"5px 9px",borderRadius:8,cursor:"pointer",fontSize:12,flexShrink:0}}>↺</button>
          )}
        </div>
        {/* Tab labels row */}
        <div style={{maxWidth:840,margin:"0 auto",display:"flex",gap:2,paddingBottom:4,overflowX:"auto"}}>
          {MODULE_TABS.map(tab=>(
            <button key={tab.id+"l"} className="tbtn" onClick={()=>{if(tab.id!=="speaking"){setActiveModule(tab.id);if(isSpeakingMode)exitMode();}else enterSpeakingMode();}} style={{padding:"2px 8px",borderRadius:5,border:"none",cursor:"pointer",background:"transparent",color:activeModule===tab.id?tab.color:"#444",fontSize:10,fontWeight:600,whiteSpace:"nowrap",letterSpacing:".3px"}}>
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Speaking banner */}
      {isSpeakingMode && (
        <div style={{background:"linear-gradient(90deg,#F59E0B12,#FF6B3512)",borderBottom:"1px solid rgba(245,158,11,0.15)",padding:"6px 16px"}}>
          <div style={{maxWidth:840,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:6}}>
            <span style={{color:"#F59E0B",fontSize:11,fontWeight:600}}>🎤 Topic: {selectedTopic}</span>
            <label style={{display:"flex",alignItems:"center",gap:5,cursor:"pointer",fontSize:11,color:"#888"}}>
              <input type="checkbox" checked={autoSpeak} onChange={e=>setAutoSpeak(e.target.checked)} style={{accentColor:"#F59E0B"}}/>Bot tự nói
              {isSpeaking&&<button onClick={stopSpeaking} style={{background:"rgba(255,80,80,0.15)",border:"1px solid rgba(255,80,80,0.2)",color:"#ff8888",padding:"2px 7px",borderRadius:5,cursor:"pointer",fontSize:10,marginLeft:4}}>⏹</button>}
            </label>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div style={{flex:1,overflowY:"auto",position:"relative",zIndex:1}}>
        <div style={{maxWidth:840,margin:"0 auto",padding:"16px 14px 170px"}}>

          {/* Listening Module */}
          {isListeningModule && <ListeningModule color={activeColor}/>}

          {/* Welcome */}
          {showWelcome && !isListeningModule && (
            <div style={{animation:"su .5s cubic-bezier(.16,1,.3,1) both"}}>
              <div style={{textAlign:"center",padding:"30px 12px 20px"}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:7,background:`${activeColor}15`,border:`1px solid ${activeColor}28`,borderRadius:100,padding:"4px 12px",marginBottom:18,fontSize:10,color:activeColor,fontWeight:700}}>
                  ✦ AI TUTOR — PHƯƠNG PHÁP KHOA HỌC NÃO BỘ
                </div>
                <h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(22px,5vw,38px)",fontWeight:700,color:"#fff",margin:"0 0 8px",lineHeight:1.15,letterSpacing:"-1px"}}>
                  Học thật, không học vẹt.<br/><span style={{color:activeColor}}>Kết quả thật.</span>
                </h1>
                <p style={{color:"#555",fontSize:13,maxWidth:440,margin:"0 auto 22px",lineHeight:1.7}}>
                  Chatbot + Listening thật + Speaking với AI Examiner — đầy đủ 4 kỹ năng IELTS.
                </p>

                {/* Feature cards */}
                <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:20,maxWidth:440,margin:"0 auto 20px"}}>
                  {[
                    {icon:"🎧",title:"Listening",desc:"AI tạo bài → TTS đọc → Chấm điểm",tab:"listening",color:"#3B82F6"},
                    {icon:"🗣️",title:"Speaking",desc:"Nói chuyện với AI Examiner thật",tab:"speaking",color:"#F59E0B"},
                    {icon:"✍️",title:"Writing",desc:"Feedback chi tiết Task 1 & 2",tab:"ielts",color:"#00C896"},
                    {icon:"📖",title:"Reading",desc:"Chiến thuật skimming, T/F/NG",tab:"ielts",color:"#7C3AED"},
                  ].map(f=>(
                    <button key={f.title} onClick={()=>{if(f.tab==="speaking")enterSpeakingMode();else setActiveModule(f.tab);}} style={{background:"rgba(255,255,255,0.03)",border:`1px solid rgba(255,255,255,0.07)`,borderRadius:12,padding:"12px",cursor:"pointer",textAlign:"left",transition:"all .2s"}} onMouseOver={e=>e.currentTarget.style.borderColor=f.color+"50"} onMouseOut={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"}>
                      <div style={{fontSize:20,marginBottom:5}}>{f.icon}</div>
                      <div style={{color:"#ddd",fontWeight:600,fontSize:12}}>{f.title}</div>
                      <div style={{color:"#555",fontSize:10,marginTop:2,lineHeight:1.4}}>{f.desc}</div>
                    </button>
                  ))}
                </div>

                {/* Speaking topic picker */}
                {voiceSupported && (<div style={{background:"rgba(245,158,11,0.07)",border:"1px solid rgba(245,158,11,0.18)",borderRadius:14,padding:"14px",marginBottom:16,textAlign:"left",maxWidth:440,margin:"0 auto 16px"}}>
                    <div style={{fontSize:12,color:"#F59E0B",fontWeight:700,marginBottom:8}}>🗣️ Speaking — chọn chủ đề rồi bắt đầu ngay</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:10}}>
                      {SPEAKING_TOPICS.map(t=>(
                        <button key={t} onClick={()=>setSelectedTopic(t)} style={{padding:"4px 9px",borderRadius:16,border:`1px solid ${selectedTopic===t?"#F59E0B":"rgba(255,255,255,0.08)"}`,background:selectedTopic===t?"#F59E0B22":"transparent",color:selectedTopic===t?"#F59E0B":"#666",fontSize:10,cursor:"pointer",fontWeight:selectedTopic===t?700:400}}>
                          {t}
                        </button>
                      ))}
                    </div>
                    <button onClick={enterSpeakingMode} style={{background:"linear-gradient(135deg,#F59E0B,#FF6B35)",border:"none",color:"#000",padding:"9px 18px",borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:13}}>
                      🎙️ Bắt đầu Speaking
                    </button>
                  </div>
                )}

                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))",gap:7}}>
                  {QUICK_STARTS.map(q=>(
                    <button key={q.label} className="qbtn" onClick={()=>sendMessage(q.msg)} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:10,padding:"10px 12px",color:"#bbb",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:8}}>
                      <span style={{fontSize:16}}>{q.icon}</span>
                      <span style={{fontSize:11,fontWeight:500}}>{q.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          {!isListeningModule && messages.map((msg, idx)=>{
            const isLastAssistant = msg.role==="assistant" && idx===messages.length-1;
            const showReplay = msg.role==="assistant" && isLastAssistant && !!window.speechSynthesis && msg.content?.length > 0;
            return (
            <div key={msg.id} className="mb" style={{display:"flex",justifyContent:msg.role==="user"?"flex-end":"flex-start",marginBottom:12}}>
              {msg.role==="assistant"&&(
                <div style={{width:26,height:26,borderRadius:7,flexShrink:0,background:msg.voice?`linear-gradient(135deg,#F59E0B,#FF6B35)`:`linear-gradient(135deg,${activeColor},#7C3AED)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,marginRight:8,marginTop:2}}>
                  {msg.voice?"🎙️":"🧠"}
                </div>
              )}
              <div style={{maxWidth:"83%",background:msg.role==="user"?`linear-gradient(135deg,${isSpeakingMode?"#F59E0BCC":activeColor+"CC"},${isSpeakingMode?"#FF6B3580":activeColor+"80"})`:"rgba(255,255,255,0.05)",border:msg.role==="user"?"none":"1px solid rgba(255,255,255,0.07)",borderRadius:msg.role==="user"?"15px 15px 3px 15px":"15px 15px 15px 3px",padding:"10px 14px",color:msg.role==="user"?"#fff":"#ddd",fontSize:13,lineHeight:1.75}}>
                <div className="msg-content" dangerouslySetInnerHTML={{__html:renderMd(msg.content)}}/>
                {showReplay && (
                  <button onClick={()=>speak(msg.content)} style={{marginTop:7,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:6,color:"#666",cursor:"pointer",fontSize:10,padding:"3px 8px",display:"inline-flex",alignItems:"center",gap:4}}>
                    🔊 Nghe lại
                  </button>
                )}
              </div>
            </div>
          )})}

          {!isListeningModule && loading && (
            <div className="mb" style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
              <div style={{width:26,height:26,borderRadius:7,background:isSpeakingMode?`linear-gradient(135deg,#F59E0B,#FF6B35)`:`linear-gradient(135deg,${activeColor},#7C3AED)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>
                {isSpeakingMode?"🎙️":"🧠"}
              </div>
              <div style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"15px 15px 15px 3px",padding:"12px 16px",color:activeColor}}>
                <div className="dp"><span/><span/><span/></div>
              </div>
            </div>
          )}
          <div ref={bottomRef}/>
        </div>
      </div>

      {/* INPUT BAR */}
      {!isListeningModule && (
        <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:50,background:"rgba(10,10,15,0.94)",backdropFilter:"blur(24px)",borderTop:"1px solid rgba(255,255,255,0.05)",padding:"10px 14px 12px"}}>
          <div style={{maxWidth:840,margin:"0 auto"}}>
            {isListening&&transcript&&(
              <div style={{background:"rgba(0,200,150,0.07)",border:"1px solid rgba(0,200,150,0.18)",borderRadius:9,padding:"7px 11px",marginBottom:7,fontSize:12,color:"#00C896",display:"flex",alignItems:"center",gap:7}}>
                <Viz active={true} color="#00C896"/>
                <span style={{fontStyle:"italic"}}>{transcript}</span>
              </div>
            )}
            {micError&&<div style={{background:"rgba(255,80,80,0.08)",border:"1px solid rgba(255,80,80,0.18)",borderRadius:8,padding:"5px 10px",marginBottom:7,fontSize:11,color:"#ff8888"}}>{micError}</div>}

            {isSpeakingMode ? (
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:9}}>
                <div style={{display:"flex",alignItems:"center",gap:16}}>
                  {isSpeaking&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}><Viz active={false} color="#F59E0B" speaking={true}/><span style={{fontSize:9,color:"#F59E0B"}}>Bot đang nói</span></div>}
                  <button className={isListening?"mac":""} onMouseDown={startListening} onMouseUp={stopListening} onTouchStart={e=>{e.preventDefault();startListening();}} onTouchEnd={e=>{e.preventDefault();stopListening();}} style={{width:66,height:66,borderRadius:"50%",border:"none",cursor:"pointer",background:isListening?"linear-gradient(135deg,#FF6B35,#FF3535)":"linear-gradient(135deg,#F59E0B,#FF6B35)",fontSize:26,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:isListening?"none":"0 4px 18px rgba(245,158,11,0.3)"}}>
                    {isListening?"⏹":"🎙️"}
                  </button>
                  {isListening&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}><Viz active={true} color="#FF6B35"/><span style={{fontSize:9,color:"#FF6B35"}}>Đang nghe</span></div>}
                </div>
                <div style={{fontSize:10,color:"#444"}}>{isListening?"Đang nghe — thả để gửi":"Giữ để nói · Thả để gửi"}</div>
                <div style={{width:"100%",display:"flex",gap:7}}>
                  <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={handleKey} placeholder="Hoặc gõ..." style={{flex:1,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:9,padding:"7px 11px",color:"#fff",fontSize:12,fontFamily:"inherit"}}/>
                  <button onClick={()=>sendMessage()} disabled={!input.trim()||loading} style={{width:36,height:36,borderRadius:9,border:"none",cursor:"pointer",background:input.trim()&&!loading?"linear-gradient(135deg,#F59E0B,#FF6B35)":"rgba(255,255,255,0.05)",color:input.trim()&&!loading?"#000":"#444",fontSize:15}}>↑</button>
                </div>
              </div>
            ) : (
              <div style={{display:"flex",gap:7,alignItems:"flex-end"}}>
                {voiceSupported&&(
                  <button className={isListening?"mac":""} onMouseDown={startListening} onMouseUp={stopListening} onTouchStart={e=>{e.preventDefault();startListening();}} onTouchEnd={e=>{e.preventDefault();stopListening();}} style={{width:40,height:40,borderRadius:10,border:"none",cursor:"pointer",flexShrink:0,background:isListening?"linear-gradient(135deg,#FF6B35,#FF3535)":"rgba(255,255,255,0.05)",color:isListening?"#fff":"#777",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {isListening?"⏹":"🎙️"}
                  </button>)}
                <div style={{flex:1,background:"rgba(255,255,255,0.05)",border:`1px solid ${input?activeColor+"45":"rgba(255,255,255,0.07)"}`,borderRadius:12,display:"flex",alignItems:"flex-end",gap:7,padding:"8px 12px",transition:"border-color .2s"}}>
                  <textarea ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={handleKey} placeholder={`Hỏi về ${MODULE_TABS.find(t=>t.id===activeModule)?.label||"IELTS, SAT, GMAT"}...`} rows={1} style={{flex:1,background:"none",border:"none",outline:"none",color:"#fff",fontSize:13,lineHeight:1.6,maxHeight:110,overflowY:"auto",fontFamily:"inherit"}} onInput={e=>{e.target.style.height="auto";e.target.style.height=Math.min(e.target.scrollHeight,110)+"px";}}/>
                </div>
                <button onClick={()=>sendMessage()} disabled={!input.trim()||loading} className="sbtn" style={{width:40,height:40,borderRadius:10,border:"none",cursor:"pointer",flexShrink:0,background:input.trim()&&!loading?`linear-gradient(135deg,${activeColor},#7C3AED)`:"rgba(255,255,255,0.05)",color:input.trim()&&!loading?"#fff":"#444",fontSize:17}}>↑</button>
              </div>
            )}
            <div style={{textAlign:"center",fontSize:9,color:"#222",marginTop:4}}>EduBot Pro · IELTS Listening 🎧 Speaking 🗣️ Writing ✍️ · Powered by Claude</div>
          </div>
        </div>
      )}
    </div>
  );
  
