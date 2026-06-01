import { useState, useRef, useEffect, useCallback } from "react";

// ============================================================
// PROMPTS
// ============================================================
const BASE_SYSTEM = `Bạn là EduBot Pro — gia sư AI dạy tiếng Anh, IELTS, SAT, GMAT bằng tiếng Việt. Triết lý: 80/20. Ngắn gọn + ví dụ thật + áp dụng ngay. Khi sai: "Gần rồi! Điểm cần sửa là..." không nói "Sai". Luôn đặt 1 câu hỏi kiểm tra sau mỗi giải thích.

7 THÌ CỐT LÕI: Present Simple (thói quen/sự thật), Present Continuous (đang xảy ra/kế hoạch - state verbs không dùng -ing), Present Perfect (for/since/already/yet/ever), Past Simple (time markers: yesterday/ago/in 2019), Past Continuous (was+ing khi bị gián đoạn), Future (will=tức thời, going to=kế hoạch, Present Continuous=lịch đã đặt), Conditionals (Type1/2/3/Mixed).

NGỮ PHÁP TRỌNG TÂM: Articles (a/an/the/zero), Modals (must/should/could/might/would), Passive (be+V3), Relative clauses (who/which/that/where/whose - defining vs non-defining), Gerund vs Infinitive (enjoy/avoid/finish+ing | want/need/plan+to).

IELTS WRITING: Task2 = Intro(paraphrase+thesis) + Body1(TS+Explain+Example+Link) + Body2 + Conclusion. Task1 = Overview + Detail groups. Chấm theo TA/CC/LR/GRA. Tránh "I think" → dùng "It is argued that / Evidence suggests".

IELTS READING: Skim overview → Scan keywords → T=đúng y chang / F=sai / NG=không đề cập.
IELTS SPEAKING: PEEL (Point+Explain+Example+Link). Filler: "That's interesting...", "From my perspective...". Band 7+ cần idioms + complex sentences.
IELTS LISTENING: Đọc câu hỏi trước, predict loại info, paraphrase awareness.

SAT: Parallel structure, transitions (Therefore/However/Furthermore), Subject-verb agreement. Math: y=mx+b, quadratics, Desmos hack (plug answer choices vào graph).
GMAT: CR (Strengthen/Weaken/Assumption/Inference/Evaluate), RC (primary purpose = tổng quát, tránh extreme language), DS (chỉ cần biết đủ dữ liệu không, không cần tính).

Trả lời tiếng Việt trừ khi học sinh dùng tiếng Anh.`;

const SPEAKING_SYSTEM = `You are EduBot Pro IELTS Speaking Examiner — friendly, encouraging, British style.
English only. Max 60 words per reply. After student speaks: give ONE specific feedback tip (pronunciation/vocabulary/grammar), then ask next question naturally.
Format responses as plain conversational text. Progress naturally Part 1 → 2 → 3.`;

const WRITING_SYSTEM = `Bạn là giám khảo IELTS Writing chuyên nghiệp. Chấm bài theo đúng 4 tiêu chí IELTS:
- TA (Task Achievement/Response): Có trả lời đúng đề không? Có đủ ý không? (25%)
- CC (Coherence & Cohesion): Mạch văn, liên kết đoạn, cohesive devices (25%)
- LR (Lexical Resource): Từ vựng đa dạng, chính xác, collocation, tránh lặp (25%)
- GRA (Grammatical Range & Accuracy): Đa dạng cấu trúc, ít lỗi (25%)

Format phản hồi:
📊 BAND SCORE ƯỚC TÍNH: [X.0 - X.5]
━━━━━━━━━━━━━━━━━━━━
✅ TA: [X/9] — [nhận xét ngắn]
✅ CC: [X/9] — [nhận xét ngắn]
✅ LR: [X/9] — [nhận xét ngắn]
✅ GRA: [X/9] — [nhận xét ngắn]
━━━━━━━━━━━━━━━━━━━━
💡 ĐIỂM MẠNH: [2-3 điểm]
⚠️ CẦN SỬA NGAY: [2-3 lỗi cụ thể với ví dụ sửa]
🔼 ĐỂ LÊN BAND CAO HƠN: [1-2 gợi ý nâng band]

Hãy khuyến khích, không chỉ trích. Đưa ví dụ câu sửa cụ thể.`;

const GRAMMAR_SYSTEM = `Bạn là quiz master ngữ pháp tiếng Anh. Khi được yêu cầu tạo quiz:
- Tạo 1 câu hỏi trắc nghiệm (A/B/C/D) hoặc điền vào chỗ trống
- Sau khi user trả lời: giải thích ngắn gọn tại sao đúng/sai
- Kèm 1 "tip ghi nhớ" ngắn
- Hỏi xem có muốn câu tiếp không
Các chủ đề: thì động từ, articles, modals, conditionals, gerund/infinitive, passive, relative clauses. Xoay vòng chủ đề. Độ khó tăng dần.`;

// ============================================================
// VOCAB DATA
// ============================================================
const VOCAB_TOPICS = {
  "Environment": [
    {word:"climate change",meaning:"biến đổi khí hậu",example:"Climate change is causing extreme weather events worldwide.",collocations:["tackle climate change","climate change policy"]},
    {word:"sustainable",meaning:"bền vững",example:"We need sustainable energy sources to protect the planet.",collocations:["sustainable development","sustainable lifestyle"]},
    {word:"carbon emissions",meaning:"khí thải carbon",example:"Reducing carbon emissions is crucial to slow global warming.",collocations:["cut carbon emissions","carbon emissions target"]},
    {word:"biodiversity",meaning:"đa dạng sinh học",example:"Deforestation threatens biodiversity in tropical rainforests.",collocations:["protect biodiversity","loss of biodiversity"]},
    {word:"renewable energy",meaning:"năng lượng tái tạo",example:"Solar and wind are examples of renewable energy.",collocations:["invest in renewable energy","switch to renewable energy"]},
    {word:"deforestation",meaning:"nạn phá rừng",example:"Deforestation destroys habitats and increases CO2 levels.",collocations:["combat deforestation","deforestation rate"]},
  ],
  "Technology": [
    {word:"artificial intelligence",meaning:"trí tuệ nhân tạo",example:"Artificial intelligence is transforming the healthcare industry.",collocations:["AI-powered","advances in AI"]},
    {word:"automation",meaning:"tự động hóa",example:"Automation may replace many manual jobs in the future.",collocations:["factory automation","automation of tasks"]},
    {word:"digital divide",meaning:"khoảng cách số",example:"The digital divide leaves rural communities without internet access.",collocations:["bridge the digital divide","widening digital divide"]},
    {word:"cybersecurity",meaning:"an ninh mạng",example:"Cybersecurity threats are increasing as more data goes online.",collocations:["cybersecurity measures","cybersecurity breach"]},
    {word:"surveillance",meaning:"giám sát",example:"Mass surveillance raises serious privacy concerns.",collocations:["government surveillance","surveillance technology"]},
  ],
  "Education": [
    {word:"critical thinking",meaning:"tư duy phản biện",example:"Universities aim to develop critical thinking skills in students.",collocations:["develop critical thinking","critical thinking skills"]},
    {word:"curriculum",meaning:"chương trình học",example:"The national curriculum sets out what students must learn.",collocations:["school curriculum","curriculum reform"]},
    {word:"academic performance",meaning:"kết quả học tập",example:"Parental support greatly influences academic performance.",collocations:["improve academic performance","academic performance gap"]},
    {word:"vocational training",meaning:"đào tạo nghề",example:"Vocational training provides practical skills for employment.",collocations:["vocational training program","promote vocational training"]},
    {word:"lifelong learning",meaning:"học tập suốt đời",example:"The modern economy demands lifelong learning and adaptability.",collocations:["promote lifelong learning","culture of lifelong learning"]},
  ],
  "Health": [
    {word:"sedentary lifestyle",meaning:"lối sống ít vận động",example:"A sedentary lifestyle increases the risk of obesity and heart disease.",collocations:["combat sedentary lifestyle","increasingly sedentary"]},
    {word:"mental health",meaning:"sức khỏe tâm thần",example:"Workplace stress is a major threat to mental health.",collocations:["mental health awareness","mental health crisis"]},
    {word:"obesity",meaning:"béo phì",example:"Childhood obesity rates have doubled over the past two decades.",collocations:["tackle obesity","obesity epidemic","rising obesity rates"]},
    {word:"preventive medicine",meaning:"y học dự phòng",example:"Preventive medicine focuses on avoiding disease before it occurs.",collocations:["preventive healthcare","preventive measures"]},
    {word:"well-being",meaning:"phúc lợi, sự khỏe mạnh",example:"Governments should prioritize the well-being of all citizens.",collocations:["emotional well-being","promote well-being"]},
  ],
  "Society": [
    {word:"social inequality",meaning:"bất bình đẳng xã hội",example:"Social inequality is widening in many developed nations.",collocations:["address social inequality","social inequality gap"]},
    {word:"urbanization",meaning:"đô thị hóa",example:"Rapid urbanization is putting pressure on city infrastructure.",collocations:["rapid urbanization","effects of urbanization"]},
    {word:"aging population",meaning:"dân số già hóa",example:"An aging population creates challenges for pension systems.",collocations:["aging population problem","cope with aging population"]},
    {word:"gender equality",meaning:"bình đẳng giới",example:"Gender equality in the workplace remains a major challenge.",collocations:["promote gender equality","gender equality issues"]},
    {word:"social mobility",meaning:"dịch chuyển xã hội",example:"Education is considered a key driver of social mobility.",collocations:["upward social mobility","social mobility gap"]},
  ],
};

const GRAMMAR_TOPICS = [
  "Thì Present Perfect vs Past Simple",
  "Conditionals Type 1, 2, 3",
  "Articles: a / an / the / zero",
  "Gerund vs Infinitive",
  "Modal verbs: must / should / could / might",
  "Passive Voice",
  "Relative Clauses",
  "Subject-Verb Agreement",
  "Parallel Structure (SAT)",
  "Transition words logic",
];

// ============================================================
// HELPERS
// ============================================================
const stripMd = t => t.replace(/\*\*(.*?)\*\*/g,"$1").replace(/\*(.*?)\*/g,"$1").replace(/`(.*?)`/g,"$1").replace(/^#{1,3}\s+/gm,"").replace(/\[FEEDBACK:\s*/g,"").replace(/\]\s*\[QUESTION:\s*/g," ").replace(/\]/g,"").trim();

const renderMd = t => t
  .replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>")
  .replace(/\*(.*?)\*/g,"<em>$1</em>")
  .replace(/`(.*?)`/g,"<code>$1</code>")
  .replace(/^### (.*)/gm,"<h3 style='color:#fff;margin:10px 0 5px;font-family:Space Grotesk,sans-serif'>$1</h3>")
  .replace(/^## (.*)/gm,"<h2 style='color:#fff;margin:12px 0 6px;font-family:Space Grotesk,sans-serif'>$1</h2>")
  .replace(/^- (.*)/gm,"<div style='padding-left:12px;margin:3px 0'>• $1</div>")
  .replace(/\n/g,"<br/>");

async function callClaude(system, messages, max_tokens=1000) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens, system, messages }),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const d = await res.json();
  return d.content?.map(b=>b.text||"").join("") || "";
}

// ============================================================
// CONSTANTS
// ============================================================
const MODULE_TABS = [
  { id:"ielts",     label:"IELTS",      icon:"🇬🇧", color:"#00C896" },
  { id:"listening", label:"Listening",  icon:"🎧",  color:"#3B82F6" },
  { id:"speaking",  label:"Speaking",   icon:"🗣️",  color:"#F59E0B" },
  { id:"writing",   label:"Writing",    icon:"✍️",  color:"#EC4899" },
  { id:"vocab",     label:"Vocab",      icon:"📚",  color:"#8B5CF6" },
  { id:"grammar",   label:"Grammar",    icon:"⚡",   color:"#F97316" },
  { id:"sat",       label:"SAT",        icon:"🇺🇸", color:"#FF6B35" },
  { id:"gmat",      label:"GMAT",       icon:"📊",  color:"#7C3AED" },
];

const SPEAKING_TOPICS = ["Hometown & Family","Technology & Social Media","Education & Learning","Environment & Climate","Travel & Culture","Work & Career","Health & Lifestyle"];

const LISTENING_TYPES = [
  { id:"s1", label:"Section 1", desc:"Daily conversation", icon:"💬" },
  { id:"s2", label:"Section 2", desc:"Social monologue",   icon:"🎤" },
  { id:"s3", label:"Section 3", desc:"Academic discussion",icon:"🏫" },
  { id:"s4", label:"Section 4", desc:"Academic lecture",   icon:"🎓" },
];

const LISTENING_GEN_SYSTEM = `You are an IELTS Listening test creator. Generate a realistic IELTS Listening passage in JSON format only (no markdown, no extra text).
Format: {"title":"...","type":"Section 1|2|3|4","context":"one-line context","script":"200-350 words natural spoken English with [pause] markers and CAPITALIZED KEY ANSWERS","questions":[{"id":1,"type":"form_completion|multiple_choice|sentence_completion","question":"...","options":["A)...","B)...","C)..."] or null,"answer":"...","tip":"brief Vietnamese strategy tip"}]}
Make 5 questions. Realistic IELTS band 5-7.`;

const LISTENING_EVAL_SYSTEM = `Bạn là giám khảo IELTS Listening. Đánh giá câu trả lời của học sinh bằng tiếng Việt. Từng câu: đúng/sai + giải thích + strategy tip. Kết thúc: band estimate, điểm yếu chính, 1 tip cụ thể. Khuyến khích.`;

// ============================================================
// VOICE VISUALIZER
// ============================================================
function Viz({ active, color }) {
  const [h, setH] = useState(Array(9).fill(4));
  useEffect(() => {
    if (!active) { setH(Array(9).fill(4)); return; }
    const id = setInterval(() => setH(Array(9).fill(0).map(()=>4+Math.random()*20)), 110);
    return () => clearInterval(id);
  }, [active]);
  return (
    <div style={{display:"flex",alignItems:"center",gap:2,height:26}}>
      {h.map((v,i)=><div key={i} style={{width:3,borderRadius:2,background:color,height:v,transition:"height 0.1s",opacity:active?0.9:0.3}}/>)}
    </div>
  );
}

// ============================================================
// LISTENING MODULE
// ============================================================
function ListeningModule({ color }) {
  const [phase, setPhase] = useState("pick");
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
  const progRef = useRef(null);

  const sLabel = { s1:"Section 1",s2:"Section 2",s3:"Section 3",s4:"Section 4" };

  const generate = async () => {
    setPhase("loading");
    try {
      const raw = await callClaude(LISTENING_GEN_SYSTEM,[{role:"user",content:`Create IELTS Listening ${sLabel[sectionType]}. JSON only.`}],1000);
      const data = JSON.parse(raw.replace(/```json|```/g,"").trim());
      setPassage(data); setAnswers({}); setResult(""); setProgress(0); setHasPlayed(false); setShowScript(false);
      setPhase("ready");
    } catch { setPhase("pick"); alert("Lỗi tạo bài, thử lại!"); }
  };

  const playAudio = () => {
    if (!passage) return;
    synthRef.current.cancel();
    const text = passage.script.replace(/\[pause\]/g,"... ");
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang="en-US"; utter.rate=0.85; utter.pitch=1.0;
    const voices = synthRef.current.getVoices();
    const preferred = ["Google US English","Samantha","Alex","Karen","Google UK English Female"];
    let best = null;
    for (const name of preferred) { best = voices.find(v=>v.name.includes(name)); if(best) break; }
    if (!best) best = voices.find(v=>v.lang==="en-US")||voices.find(v=>v.lang.startsWith("en"));
    if (best) utter.voice = best;
    const dur = (text.split(" ").length / (150*0.85)) * 1000;
    const start = Date.now();
    progRef.current = setInterval(()=>{setProgress(Math.min(((Date.now()-start)/dur)*100,99));},300);
    utter.onstart=()=>{setIsPlaying(true);setIsPaused(false);setPhase("playing");};
    utter.onend=()=>{setIsPlaying(false);setProgress(100);setHasPlayed(true);clearInterval(progRef.current);setPhase("answering");};
    utter.onerror=()=>{setIsPlaying(false);clearInterval(progRef.current);};
    synthRef.current.speak(utter);
  };

  const pauseResume = () => {
    if (isPaused){synthRef.current.resume();setIsPaused(false);setIsPlaying(true);}
    else{synthRef.current.pause();setIsPaused(true);setIsPlaying(false);}
  };

  const submit = async () => {
    setEvalLoading(true);
    const qa = passage.questions.map((q,i)=>`Q${i+1}: ${q.question}\nStudent: ${answers[i]||"(no answer)"}\nCorrect: ${q.answer}`).join("\n\n");
    const r = await callClaude(LISTENING_EVAL_SYSTEM,[{role:"user",content:`Script: ${passage.script}\n\n${qa}`}],1000);
    setResult(r); setPhase("result"); setEvalLoading(false);
  };

  const reset = () => { synthRef.current.cancel(); clearInterval(progRef.current); setPhase("pick"); setPassage(null); setAnswers({}); setResult(""); setProgress(0); };

  if (phase==="loading"||evalLoading) return (
    <div style={{textAlign:"center",padding:"60px 20px"}}>
      <div style={{fontSize:32,marginBottom:12}}>{evalLoading?"📊":"⚙️"}</div>
      <div style={{color,fontWeight:600}}>{evalLoading?"Đang chấm bài...":"Đang tạo bài nghe..."}</div>
    </div>
  );
if (phase==="pick") return (
    <div style={{padding:"16px 0"}}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:28,marginBottom:6}}>🎧</div>
        <h2 style={{fontFamily:"Space Grotesk,sans-serif",color:"#fff",margin:"0 0 4px",fontSize:18}}>IELTS Listening Practice</h2>
        <p style={{color:"#555",fontSize:12,margin:0}}>AI tạo bài → TTS đọc → Trả lời → Chấm điểm band score</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:16}}>
        {LISTENING_TYPES.map(t=>(
          <button key={t.id} onClick={()=>setSectionType(t.id)} style={{background:sectionType===t.id?`${color}22`:"rgba(255,255,255,0.03)",border:`1px solid ${sectionType===t.id?color:"rgba(255,255,255,0.08)"}`,borderRadius:10,padding:"12px",cursor:"pointer",textAlign:"left",transition:"all .2s"}}>
            <div style={{fontSize:18,marginBottom:3}}>{t.icon}</div>
            <div style={{color:sectionType===t.id?color:"#ccc",fontWeight:600,fontSize:12}}>{t.label}</div>
            <div style={{color:"#555",fontSize:10,marginTop:2}}>{t.desc}</div>
          </button>
        ))}
      </div>
      <button onClick={generate} style={{width:"100%",background:`linear-gradient(135deg,${color},#3B82F6)`,border:"none",color:"#fff",padding:"12px",borderRadius:10,cursor:"pointer",fontWeight:700,fontSize:14}}>
        🎲 Tạo bài nghe ngẫu nhiên
      </button>
    </div>
  );

  return (
    <div style={{padding:"8px 0"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
        <div>
          <div style={{color,fontSize:10,fontWeight:700,letterSpacing:".5px"}}>{passage?.type} · {passage?.context}</div>
          <div style={{color:"#fff",fontWeight:600,fontSize:14}}>{passage?.title}</div>
        </div>
        <button onClick={reset} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"#888",padding:"4px 9px",borderRadius:7,cursor:"pointer",fontSize:11}}>↺ Bài mới</button>
      </div>
      {(phase==="ready"||phase==="playing"||phase==="answering") && (
        <div style={{background:"rgba(59,130,246,0.08)",border:"1px solid rgba(59,130,246,0.2)",borderRadius:12,padding:"14px",marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            <Viz active={isPlaying} color={color}/>
            <div style={{flex:1,height:4,background:"rgba(255,255,255,0.08)",borderRadius:4,overflow:"hidden"}}>
              <div style={{height:"100%",background:`linear-gradient(90deg,${color},#3B82F6)`,width:`${progress}%`,transition:"width .3s",borderRadius:4}}/>
            </div>
            <span style={{fontSize:10,color:"#555"}}>{Math.round(progress)}%</span>
          </div>
          <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
            {!isPlaying&&!isPaused&&!hasPlayed&&<button onClick={playAudio} style={{background:`linear-gradient(135deg,${color},#3B82F6)`,border:"none",color:"#fff",padding:"8px 16px",borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:12}}>▶ Nghe bài</button>}
            {(isPlaying||isPaused)&&<><button onClick={pauseResume} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.12)",color:"#ccc",padding:"8px 14px",borderRadius:9,cursor:"pointer",fontSize:12}}>{isPaused?"▶ Tiếp":"⏸ Pause"}</button><button onClick={()=>{synthRef.current.cancel();clearInterval(progRef.current);setIsPlaying(false);setHasPlayed(true);setPhase("answering");}} style={{background:"rgba(255,80,80,0.15)",border:"1px solid rgba(255,80,80,0.25)",color:"#ff8888",padding:"8px 14px",borderRadius:9,cursor:"pointer",fontSize:12}}>⏹ Dừng</button></>}
            {hasPlayed&&!isPlaying&&<button onClick={playAudio} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"#aaa",padding:"8px 14px",borderRadius:9,cursor:"pointer",fontSize:12}}>🔁 Nghe lại</button>}
            <button onClick={()=>setShowScript(!showScript)} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",color:"#666",padding:"8px 14px",borderRadius:9,cursor:"pointer",fontSize:12}}>{showScript?"🙈 Ẩn":"📄 Script"}</button>
          </div>
          {showScript&&<div style={{marginTop:10,background:"rgba(0,0,0,0.3)",borderRadius:8,padding:"10px",color:"#999",fontSize:11,lineHeight:1.7,maxHeight:160,overflowY:"auto"}}>{passage?.script}</div>}
        </div>
      )}
      {(phase==="answering"||phase==="result")&&(
        <div style={{marginBottom:14}}>
          <div style={{color:"#fff",fontWeight:600,fontSize:13,marginBottom:10}}>📝 Câu hỏi</div>
          {passage?.questions?.map((q,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:10,padding:"12px",marginBottom:8}}>
              <div style={{color:"#ccc",fontSize:12,marginBottom:7,lineHeight:1.5}}><span style={{color,fontWeight:700}}>Q{i+1}.</span> {q.question}</div>
              {q.type==="multiple_choice"&&q.options?(
                <div style={{display:"flex",flexDirection:"column",gap:5}}>
                  {q.options.map((opt,j)=>(
                    <label key={j} style={{display:"flex",alignItems:"center",gap:7,cursor:phase==="answering"?"pointer":"default",fontSize:12,color:answers[i]===opt?color:"#777"}}>
                      <input type="radio" name={`q${i}`} value={opt} checked={answers[i]===opt} disabled={phase==="result"} onChange={()=>setAnswers({...answers,[i]:opt})} style={{accentColor:color}}/>
                      {opt}
                    </label>
                  ))}
                </div>
              ):(
                <input value={answers[i]||""} onChange={e=>setAnswers({...answers,[i]:e.target.value})} disabled={phase==="result"} placeholder="Nhập câu trả lời..." style={{width:"100%",background:"rgba(255,255,255,0.05)",border:`1px solid ${answers[i]?color+"40":"rgba(255,255,255,0.08)"}`,borderRadius:7,padding:"7px 9px",color:"#fff",fontSize:12,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
              )}
              {phase==="result"&&<div style={{marginTop:5,fontSize:10,color:"#F59E0B"}}>💡 {q.tip}</div>}
            </div>
          ))}
          {phase==="answering"&&<button onClick={submit} style={{width:"100%",background:`linear-gradient(135deg,${color},#3B82F6)`,border:"none",color:"#fff",padding:"11px",borderRadius:10,cursor:"pointer",fontWeight:700,fontSize:13}}>✅ Nộp & Chấm điểm</button>}
        </div>
      )}
      {phase==="result"&&result&&(
        <div style={{background:"rgba(0,200,150,0.06)",border:"1px solid rgba(0,200,150,0.2)",borderRadius:12,padding:"14px"}}>
          <div style={{color:"#00C896",fontWeight:700,fontSize:12,marginBottom:8}}>📊 Kết quả</div>
          <div style={{color:"#ccc",fontSize:12,lineHeight:1.8}} dangerouslySetInnerHTML={{__html:renderMd(result)}}/>
        </div>
      )}
    </div>
  );
}

// ============================================================
// WRITING MODULE
// ============================================================
function WritingModule({ color }) {
  const [task, setTask] = useState("task2");
  const [essay, setEssay] = useState("");
  const [prompt, setPrompt] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const SAMPLE_PROMPTS = {
    task2: [
      "Some people think that the best way to reduce crime is to give longer prison sentences. Others, however, believe there are better alternative ways of reducing crime. Discuss both views and give your opinion.",
      "In many countries, the number of animals and plants is declining. Why is this happening? How can this issue be addressed?",
      "Some people believe that university education should be free for all students. To what extent do you agree or disagree?",
    ],
    task1: [
      "The chart below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011.",
      "The diagram below shows the process by which bricks are manufactured for the building industry.",
      "The table below gives information about the underground railway systems in six cities.",
    ],
  };

  const randomPrompt = () => {
    const arr = SAMPLE_PROMPTS[task];
    setPrompt(arr[Math.floor(Math.random()*arr.length)]);
  };

  const submitWriting = async () => {
    if (!essay.trim()) return;
    setLoading(true);
    const msg = `TASK: ${task.toUpperCase()}\nPROMPT: ${prompt||"(không có prompt)"}\nESSAY:\n${essay}`;
    const r = await callClaude(WRITING_SYSTEM,[{role:"user",content:msg}],1000);
    setFeedback(r); setLoading(false);
  };

  const wordCount = essay.trim().split(/\s+/).filter(Boolean).length;
  const minWords = task==="task2" ? 250 : 150;

  return (
    <div style={{padding:"8px 0"}}>
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        {["task1","task2"].map(t=>(
          <button key={t} onClick={()=>{setTask(t);setFeedback("");}} style={{flex:1,padding:"9px",borderRadius:9,border:`1px solid ${task===t?color:"rgba(255,255,255,0.08)"}`,background:task===t?`${color}22`:"rgba(255,255,255,0.03)",color:task===t?color:"#777",fontWeight:600,fontSize:12,cursor:"pointer"}}>
            {t==="task1"?"✍️ Task 1 (Graph/Process)":"📝 Task 2 (Essay)"}
          </button>
        ))}
      </div>
     <button onClick={submitWriting} disabled={!essay.trim()||loading} style={{width:"100%",background:essay.trim()&&!loading?`linear-gradient(135deg,${color},#EC4899)`:"rgba(255,255,255,0.06)",border:"none",color:essay.trim()&&!loading?"#fff":"#555",padding:"12px",borderRadius:10,cursor:essay.trim()&&!loading?"pointer":"default",fontWeight:700,fontSize:13,marginBottom:14}}>
        {loading?"⏳ Đang chấm bài...":"📊 Chấm bài theo tiêu chí IELTS"}
      </button>

      {feedback&&(
        <div style={{background:"rgba(236,72,153,0.06)",border:"1px solid rgba(236,72,153,0.2)",borderRadius:12,padding:"14px"}}>
          <div style={{color:"#EC4899",fontWeight:700,fontSize:12,marginBottom:10}}>📋 Nhận xét chi tiết</div>
          <div style={{color:"#ddd",fontSize:12,lineHeight:1.8,whiteSpace:"pre-line"}}>{feedback}</div>
          <button onClick={()=>setFeedback("")} style={{marginTop:12,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"#888",padding:"6px 14px",borderRadius:7,cursor:"pointer",fontSize:11}}>✏️ Viết lại</button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// VOCAB FLASHCARD MODULE
// ============================================================
function VocabModule({ color }) {
  const [topic, setTopic] = useState("Environment");
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState([]);
  const [unknown, setUnknown] = useState([]);

  const cards = VOCAB_TOPICS[topic] || [];
  const remaining = cards.filter((_,i)=>!known.includes(i)&&!unknown.includes(i));
  const current = remaining[0];
  const currentIdx = cards.indexOf(current);

  const handleKnow = (knows) => {
    if (knows) setKnown(p=>[...p,currentIdx]);
    else setUnknown(p=>[...p,currentIdx]);
    setFlipped(false);
  };

  const reset = () => { setKnown([]); setUnknown([]); setFlipped(false); };

  const changeTopic = (t) => { setTopic(t); setKnown([]); setUnknown([]); setFlipped(false); setCardIdx(0); };

  const allDone = remaining.length === 0;

  return (
    <div style={{padding:"8px 0"}}>
      <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:16}}>
        {Object.keys(VOCAB_TOPICS).map(t=>(
          <button key={t} onClick={()=>changeTopic(t)} style={{padding:"5px 10px",borderRadius:16,border:`1px solid ${topic===t?color:"rgba(255,255,255,0.08)"}`,background:topic===t?`${color}22`:"transparent",color:topic===t?color:"#666",fontSize:11,cursor:"pointer",fontWeight:topic===t?700:400}}>
            {t}
          </button>
        ))}
      </div>

      <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#555",marginBottom:12}}>
        <span>✅ Biết: <strong style={{color:"#00C896"}}>{known.length}</strong></span>
        <span>📚 Còn lại: <strong style={{color}}>{remaining.length}</strong></span>
        <span>❌ Chưa: <strong style={{color:"#EF4444"}}>{unknown.length}</strong></span>
      </div>

      {allDone ? (
        <div style={{textAlign:"center",padding:"40px 20px",background:"rgba(255,255,255,0.03)",borderRadius:14,border:"1px solid rgba(255,255,255,0.07)"}}>
          <div style={{fontSize:36,marginBottom:10}}>🎉</div>
          <div style={{color:"#fff",fontWeight:700,fontSize:16,marginBottom:6}}>Xong chủ đề {topic}!</div>
          <div style={{color:"#555",fontSize:12,marginBottom:16}}>Biết: {known.length} | Cần ôn: {unknown.length}</div>
          {unknown.length>0&&<div style={{color:"#F59E0B",fontSize:11,marginBottom:14}}>Ôn lại {unknown.length} từ chưa nhớ:</div>}
          {unknown.map(i=>(
            <div key={i} style={{background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.2)",borderRadius:8,padding:"8px 12px",marginBottom:6,textAlign:"left"}}>
              <span style={{color:"#EF4444",fontWeight:600,fontSize:12}}>{cards[i].word}</span>
              <span style={{color:"#777",fontSize:11}}> — {cards[i].meaning}</span>
            </div>
          ))}
          <button onClick={reset} style={{background:`linear-gradient(135deg,${color},#7C3AED)`,border:"none",color:"#fff",padding:"10px 20px",borderRadius:9,cursor:"pointer",fontWeight:700,fontSize:13,marginTop:8}}>🔄 Học lại từ đầu</button>
        </div>
      ) : current ? (
        <div>
          <div onClick={()=>setFlipped(!flipped)} style={{background:flipped?`${color}12`:"rgba(255,255,255,0.04)",border:`1px solid ${flipped?color+"40":"rgba(255,255,255,0.08)"}`,borderRadius:16,padding:"28px 20px",textAlign:"center",cursor:"pointer",transition:"all .25s",minHeight:200,display:"flex",flexDirection:"column",justifyContent:"center",marginBottom:14}}>
            {!flipped ? (
              <>
                <div style={{color:"#555",fontSize:10,marginBottom:12,letterSpacing:".5px",fontWeight:600}}>NHẤN ĐỂ XEM NGHĨA</div>
                <div style={{color:"#fff",fontSize:22,fontWeight:700,marginBottom:6}}>{current.word}</div>
                <div style={{color:"#555",fontSize:11}}>({current.collocations[0]})</div>
              </>
            ) : (
              <>
                <div style={{color:color,fontSize:11,fontWeight:700,marginBottom:8,letterSpacing:".5px"}}>NGHĨA</div>
                <div style={{color:"#fff",fontSize:18,fontWeight:700,marginBottom:12}}>{current.meaning}</div>
                <div style={{color:"#ccc",fontSize:12,lineHeight:1.6,fontStyle:"italic",marginBottom:10}}>"{current.example}"</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:5,justifyContent:"center"}}>
                  {current.collocations.map(c=>(
                    <span key={c} style={{background:`${color}20`,border:`1px solid ${color}40`,color,padding:"2px 8px",borderRadius:10,fontSize:10}}>{c}</span>
                  ))}
                </div>
              </>
            )}
          </div>
          {flipped&&(
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>handleKnow(false)} style={{flex:1,background:"rgba(239,68,68,0.15)",border:"1px solid rgba(239,68,68,0.3)",color:"#EF4444",padding:"11px",borderRadius:10,cursor:"pointer",fontWeight:700,fontSize:13}}>❌ Chưa nhớ</button>
              <button onClick={()=>handleKnow(true)} style={{flex:1,background:"rgba(0,200,150,0.15)",border:"1px solid rgba(0,200,150,0.3)",color:"#00C896",padding:"11px",borderRadius:10,cursor:"pointer",fontWeight:700,fontSize:13}}>✅ Đã nhớ</button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
// ============================================================
// GRAMMAR QUIZ MODULE
// ============================================================
function GrammarModule({ color }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState(GRAMMAR_TOPICS[0]);
  const [history, setHistory] = useState([]);
  const bottomRef = useRef(null);

  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"});},[messages,loading]);

  const startQuiz = async (t) => {
    setTopic(t); setMessages([]); setHistory([]);
    setLoading(true);
    const msg = `Bắt đầu quiz về chủ đề: "${t}". Tạo câu hỏi đầu tiên ngay.`;
    const h = [{role:"user",content:msg}];
    const r = await callClaude(GRAMMAR_SYSTEM, h, 500);
    setMessages([{role:"assistant",content:r,id:Date.now()}]);
    setHistory([...h,{role:"assistant",content:r}]);
    setLoading(false);
  };

  const send = async () => {
    if (!input.trim()||loading) return;
    const txt = input.trim(); setInput("");
    const userMsg = {role:"user",content:txt,id:Date.now()};
    const newH = [...history,{role:"user",content:txt}];
    setMessages(p=>[...p,userMsg]); setLoading(true);
    const r = await callClaude(GRAMMAR_SYSTEM, newH, 500);
    setMessages(p=>[...p,{role:"assistant",content:r,id:Date.now()+1}]);
    setHistory([...newH,{role:"assistant",content:r}]);
    setLoading(false);
  };

  return (
    <div style={{padding:"8px 0",display:"flex",flexDirection:"column",height:"100%"}}>
      <div style={{marginBottom:12}}>
        <div style={{color:"#888",fontSize:10,fontWeight:600,marginBottom:6,letterSpacing:".4px"}}>CHỌN CHỦ ĐỀ</div>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          {GRAMMAR_TOPICS.map(t=>(
            <button key={t} onClick={()=>startQuiz(t)} style={{padding:"4px 9px",borderRadius:14,border:`1px solid ${topic===t&&messages.length>0?color:"rgba(255,255,255,0.08)"}`,background:topic===t&&messages.length>0?`${color}22`:"rgba(255,255,255,0.03)",color:topic===t&&messages.length>0?color:"#666",fontSize:10,cursor:"pointer",fontWeight:topic===t&&messages.length>0?700:400,transition:"all .15s"}}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {messages.length===0&&!loading&&(
        <div style={{textAlign:"center",padding:"30px 20px",background:"rgba(255,255,255,0.02)",borderRadius:12,border:"1px solid rgba(255,255,255,0.06)"}}>
          <div style={{fontSize:28,marginBottom:8}}>⚡</div>
          <div style={{color:"#ccc",fontWeight:600,fontSize:14,marginBottom:4}}>Grammar Quiz</div>
          <div style={{color:"#555",fontSize:12}}>Chọn chủ đề bên trên để bắt đầu luyện tập!</div>
        </div>
      )}

      <div style={{flex:1,overflowY:"auto",marginBottom:10}}>
        {messages.map(msg=>(
          <div key={msg.id} style={{display:"flex",justifyContent:msg.role==="user"?"flex-end":"flex-start",marginBottom:10}}>
            {msg.role==="assistant"&&<div style={{width:24,height:24,borderRadius:7,background:`linear-gradient(135deg,${color},#7C3AED)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,marginRight:7,flexShrink:0,marginTop:2}}>⚡</div>}
            <div style={{maxWidth:"85%",background:msg.role==="user"?`linear-gradient(135deg,${color}CC,${color}88)`:"rgba(255,255,255,0.05)",border:msg.role==="user"?"none":"1px solid rgba(255,255,255,0.07)",borderRadius:msg.role==="user"?"14px 14px 3px 14px":"14px 14px 14px 3px",padding:"10px 13px",color:msg.role==="user"?"#fff":"#ddd",fontSize:13,lineHeight:1.7}}>
              <div dangerouslySetInnerHTML={{__html:renderMd(msg.content)}}/>
            </div>
          </div>
        ))}
        {loading&&<div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:24,height:24,borderRadius:7,background:`linear-gradient(135deg,${color},#7C3AED)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11}}>⚡</div><div style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"14px 14px 14px 3px",padding:"11px 15px",color}}><div className="dp"><span/><span/><span/></div></div></div>}
        <div ref={bottomRef}/>
      </div>

      {messages.length>0&&(
        <div style={{display:"flex",gap:7}}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")send();}} placeholder="Nhập câu trả lời (A/B/C/D hoặc điền từ)..." style={{flex:1,background:"rgba(255,255,255,0.05)",border:`1px solid ${input?color+"45":"rgba(255,255,255,0.07)"}`,borderRadius:10,padding:"9px 12px",color:"#fff",fontSize:13,outline:"none",fontFamily:"inherit",transition:"border-color .2s"}}/>
          <button onClick={send} disabled={!input.trim()||loading} style={{width:38,height:38,borderRadius:10,border:"none",cursor:"pointer",background:input.trim()&&!loading?`linear-gradient(135deg,${color},#7C3AED)`:"rgba(255,255,255,0.05)",color:input.trim()&&!loading?"#fff":"#444",fontSize:16}}>↑</button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function EduBotPro() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeModule, setActiveModule] = useState("ielts");
  const [showWelcome, setShowWelcome] = useState(true);
  const [conversationHistory, setConversationHistory] = useState([]);

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

  const isSpeakingMode = activeModule==="speaking";
  const isSpecialModule = ["listening","writing","vocab","grammar"].includes(activeModule);
  const activeColor = MODULE_TABS.find(t=>t.id===activeModule)?.color||"#00C896";

  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"});},[messages,loading]);

  const speak = useCallback((text)=>{
    if(!synthRef.current||!autoSpeak) return;
    synthRef.current.cancel();
    const clean = stripMd(text).slice(0,600);
    const utter = new SpeechSynthesisUtterance(clean);
    const voices = synthRef.current.getVoices();
    if(isSpeakingMode){
      utter.lang="en-US"; utter.rate=0.85; utter.pitch=1.0;
      const preferred=["Google US English","Samantha","Alex","Karen","Google UK English Female","Daniel"];
      let best=null; for(const n of preferred){best=voices.find(v=>v.name.includes(n));if(best)break;}
      if(!best) best=voices.find(v=>v.lang==="en-US")||voices.find(v=>v.lang.startsWith("en"));
      if(best) utter.voice=best;
    } else {
      utter.lang="vi-VN"; utter.rate=0.88; utter.pitch=1.0;
      const v=voices.find(v=>v.lang==="vi-VN")||voices.find(v=>v.lang.startsWith("vi"));
      if(v) utter.voice=v;
    }
 utter.onstart=()=>setIsSpeaking(true);
    utter.onerror=()=>setIsSpeaking(false);
    const t=setInterval(()=>{if(synthRef.current?.paused)synthRef.current.resume();},4000);
    utter.onend=()=>{setIsSpeaking(false);clearInterval(t);};
    synthRef.current.speak(utter);
  },[autoSpeak,isSpeakingMode]);

  const stopSpeaking=()=>{synthRef.current?.cancel();setIsSpeaking(false);};

  const startListening=useCallback(()=>{
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR) return;
    setMicError(""); stopSpeaking();
    const r=new SR();
    r.lang=isSpeakingMode?"en-US":"vi-VN";
    r.continuous=false; r.interimResults=true;
    r.onstart=()=>{setIsListening(true);setTranscript("");};
    r.onresult=e=>{let t="";for(let i=e.resultIndex;i<e.results.length;i++)t+=e.results[i][0].transcript;setTranscript(t);};
    r.onend=()=>{setIsListening(false);setTranscript(prev=>{if(prev.trim())setTimeout(()=>sendMessage(prev.trim()),100);return "";});};
    r.onerror=e=>{setIsListening(false);if(e.error==="not-allowed")setMicError("❌ Cần cho phép microphone!");else if(e.error==="no-speech")setMicError("🔇 Không nghe thấy. Thử lại!");else setMicError(`Lỗi: ${e.error}`);setTimeout(()=>setMicError(""),3000);};
    recognitionRef.current=r; r.start();
  },[isSpeakingMode]);

  const stopListening=()=>{recognitionRef.current?.stop();setIsListening(false);};

  const sendMessage=async(text)=>{
    const userText=(typeof text==="string"?text:input).trim();
    if(!userText||loading) return;
    setInput(""); setShowWelcome(false); setTranscript("");
    const userMsg={role:"user",content:userText,id:Date.now()};
    const newH=[...conversationHistory,{role:"user",content:userText}];
    setMessages(p=>[...p,userMsg]); setLoading(true);
    const sys=isSpeakingMode?SPEAKING_SYSTEM:BASE_SYSTEM;
    try {
      const reply=await callClaude(sys,newH);
      const aMsg={role:"assistant",content:reply,id:Date.now()+1,voice:isSpeakingMode};
      setMessages(p=>[...p,aMsg]);
      setConversationHistory([...newH,{role:"assistant",content:reply}]);
      if(autoSpeak) speak(reply);
    } catch {
      setMessages(p=>[...p,{role:"assistant",content:"⚠️ Lỗi kết nối!",id:Date.now()+1}]);
    } finally{setLoading(false);}
  };

  const switchModule=(id)=>{
    stopSpeaking(); stopListening();
    setActiveModule(id); setMessages([]); setConversationHistory([]); setShowWelcome(false);
    if(id==="speaking"){
      const intro={role:"assistant",content:`🎙️ **IELTS Speaking — ${selectedTopic}**\n\nHello! I'm your examiner today. Topic: **"${selectedTopic}"**.\n\nLet's begin Part 1.\n\n**Can you tell me a little about where you grew up?**`,id:Date.now(),voice:true};
      setMessages([intro]); setConversationHistory([{role:"assistant",content:intro.content}]);
      if(autoSpeak) setTimeout(()=>speak(intro.content),300);
      return;
    }
    if(!["listening","writing","vocab","grammar"].includes(id)){
      const welcomes={
        ielts:"Xin chào! Bạn muốn luyện kỹ năng IELTS nào?\n\n🎧 **Listening** | 🗣️ **Speaking** | 📖 **Reading** | ✍️ **Writing**\n\nHoặc hỏi thẳng bất cứ điều gì về IELTS!",
        sat:"Xin chào! Sẵn sàng chinh phục **Digital SAT**!\n\n📐 **Math** — Algebra, Quadratics, Desmos tricks\n📝 **Reading & Writing** — Rhetoric, Grammar, Transitions\n🎯 **Strategy** — Phân bổ thời gian, loại trừ đáp án\n\nBắt đầu từ đâu?",
        gmat:"Xin chào! Sẵn sàng chinh phục **GMAT Focus Edition**!\n\n🧠 **Critical Reasoning** — 5 loại câu hỏi CR\n📊 **Data Insights** — Table Analysis, Multi-source\n🔢 **Quantitative** — Data Sufficiency tricks\n📖 **Reading Comprehension** — Primary purpose strategy\n\nBắt đầu từ đâu?",
      };
      const initMsg={role:"assistant",content:welcomes[id]||"Hỏi tôi bất cứ điều gì!",id:Date.now(),voice:false};
      setMessages([initMsg]); setConversationHistory([{role:"assistant",content:initMsg.content}]);
    }
  };

  const exitToHome=()=>{stopSpeaking();stopListening();setActiveModule("ielts");setMessages([]);setConversationHistory([]);setShowWelcome(true);};
  const handleKey=e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMessage();}};

  const FEATURE_CARDS=[
    {icon:"🌱",title:"Mất gốc? Start đây",desc:"Lộ trình A0 từng bước, không nhảy cóc",color:"#10B981",msg:"Tôi mất gốc tiếng Anh hoàn toàn. Hãy bắt đầu từ con số 0 theo lộ trình khoa học nhất. Hỏi tôi biết gì rồi xây từ đó."},
    {icon:"🎯",title:"Test 4 kỹ năng",desc:"Ước tính band score từng kỹ năng",color:"#EF4444",msg:"Test trình độ 4 kỹ năng IELTS của tôi: bài test mini Listening (3 câu), Reading (đoạn ngắn+3 câu), Writing (nhận xét đoạn tôi viết) và Speaking (3 câu tôi tự trả lời). Ước tính band score từng kỹ năng."},
    {icon:"🎧",title:"Listening",desc:"AI tạo bài → TTS đọc → Chấm điểm",color:"#3B82F6",tab:"listening"},
    {icon:"🗣️",title:"Speaking",desc:"Nói chuyện với AI Examiner",color:"#F59E0B",tab:"speaking"},
    {icon:"✍️",title:"Writing Grader",desc:"Chấm bài theo TA/CC/LR/GRA",color:"#EC4899",tab:"writing"},
    {icon:"📚",title:"Vocab Flashcards",desc:"SRS flashcard theo chủ đề IELTS",color:"#8B5CF6",tab:"vocab"},
    {icon:"⚡",title:"Grammar Quiz",desc:"Active Recall — luyện ngữ pháp tương tác",color:"#F97316",tab:"grammar"},
    {icon:"🔢",title:"SAT / GMAT",desc:"Chiến thuật Digital SAT & GMAT Focus",color:"#FF6B35",tab:"sat"},
  ];

  return (
    <div style={{minHeight:"100vh",background:"#0A0A0F",fontFamily:"DM Sans,sans-serif",display:"flex",flexDirection:"column",position:"relative",overflow:"hidden"}}>
      <div style={{position:"fixed",inset:0,zIndex:0,backgroundImage:`radial-gradient(circle at 15% 15%,${activeColor}15 0%,transparent 50%),radial-gradient(circle at 85% 85%,#7C3AED12 0%,transparent 50%),linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)`,backgroundSize:"100% 100%,100% 100%,40px 40px,40px 40px",transition:"background-image .5s"}}/>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap');
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#2a2a2a;border-radius:4px}
        .mb{animation:su .3s cubic-bezier(.16,1,.3,1) both}
        @keyframes su{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        @keyframes dp{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.1)}}
        @keyframes mp{0%,100%{box-shadow:0 0 0 0 rgba(255,107,53,.4)}50%{box-shadow:0 0 0 10px rgba(255,107,53,0)}}
        .dp{display:flex;gap:4px;align-items:center}
        .dp span{width:6px;height:6px;border-radius:50%;background:currentColor;animation:dp 1.2s ease-in-out infinite;display:inline-block}
        .dp span:nth-child(2){animation-delay:.2s}.dp span:nth-child(3){animation-delay:.4s}
        .tbtn,.qbtn,.sbtn{transition:all .18s cubic-bezier(.16,1,.3,1)}
        .tbtn:hover,.qbtn:hover{opacity:1!important;filter:brightness(1.1)}
        .mac{animation:mp 1.5s ease-in-out infinite}
        .msg-content strong{font-weight:600}
        .msg-content code{background:rgba(255,255,255,.1);padding:1px 5px;border-radius:4px;font-size:.88em}
        textarea,input{font-family:inherit}
        textarea{resize:none}
        input:focus,textarea:focus{outline:none}
      `}</style>
  {/* HEADER */}
      <header style={{position:"sticky",top:0,zIndex:50,background:"rgba(10,10,15,0.92)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
        <div style={{maxWidth:860,margin:"0 auto",padding:"0 12px",display:"flex",alignItems:"center",gap:8,height:52}}>
          <button onClick={exitToHome} style={{display:"flex",alignItems:"center",gap:8,background:"none",border:"none",cursor:"pointer",padding:0}}>
            <div style={{width:30,height:30,borderRadius:8,background:`linear-gradient(135deg,${activeColor},#7C3AED)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,transition:"background .5s"}}>🧠</div>
            <div style={{display:"none"}}>
              <div style={{fontFamily:"Space Grotesk,sans-serif",fontWeight:700,fontSize:13,color:"#fff"}}>EduBot <span style={{color:activeColor}}>Pro</span></div>
            </div>
          </button>
          <span style={{fontFamily:"Space Grotesk,sans-serif",fontWeight:700,fontSize:14,color:"#fff"}}>EduBot <span style={{color:activeColor}}>Pro</span></span>

          {/* TABS - scrollable */}
          <div style={{flex:1,overflowX:"auto",display:"flex",gap:2,padding:"2px 0"}}>
            {MODULE_TABS.map(tab=>(
              <button key={tab.id} className="tbtn" onClick={()=>switchModule(tab.id)} style={{padding:"5px 8px",borderRadius:7,border:"none",cursor:"pointer",background:activeModule===tab.id?tab.color+"22":"transparent",color:activeModule===tab.id?tab.color:"#555",fontSize:11,fontWeight:600,whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:4,flexShrink:0,opacity:activeModule===tab.id?1:0.8}}>
                <span>{tab.icon}</span><span>{tab.label}</span>
              </button>
            ))}
          </div>

          <button onClick={exitToHome} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",color:"#555",padding:"5px 9px",borderRadius:8,cursor:"pointer",fontSize:11,flexShrink:0}}>⌂</button>
        </div>

        {/* Speaking banner */}
        {isSpeakingMode&&(
          <div style={{background:"linear-gradient(90deg,#F59E0B10,#FF6B3510)",borderTop:"1px solid rgba(245,158,11,0.12)",padding:"5px 14px"}}>
            <div style={{maxWidth:860,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:5}}>
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                {SPEAKING_TOPICS.map(t=><button key={t} onClick={()=>setSelectedTopic(t)} style={{padding:"3px 8px",borderRadius:12,border:`1px solid ${selectedTopic===t?"#F59E0B":"rgba(255,255,255,0.07)"}`,background:selectedTopic===t?"#F59E0B22":"transparent",color:selectedTopic===t?"#F59E0B":"#666",fontSize:9,cursor:"pointer"}}>{t}</button>)}
              </div>
              <label style={{display:"flex",alignItems:"center",gap:5,cursor:"pointer",fontSize:10,color:"#777"}}>
                <input type="checkbox" checked={autoSpeak} onChange={e=>setAutoSpeak(e.target.checked)} style={{accentColor:"#F59E0B"}}/>
                Bot tự nói
                {isSpeaking&&<button onClick={stopSpeaking} style={{background:"rgba(255,80,80,0.15)",border:"1px solid rgba(255,80,80,0.2)",color:"#ff8888",padding:"2px 6px",borderRadius:5,cursor:"pointer",fontSize:9,marginLeft:3}}>⏹</button>}
              </label>
            </div>
          </div>
        )}
      </header>

      {/* MAIN */}
      <div style={{flex:1,overflowY:"auto",position:"relative",zIndex:1}}>
        <div style={{maxWidth:860,margin:"0 auto",padding:"14px 12px 175px"}}>

          {/* Special modules */}
          {activeModule==="listening"&&<ListeningModule color={activeColor}/>}
          {activeModule==="writing"&&<WritingModule color={activeColor}/>}
          {activeModule==="vocab"&&<VocabModule color={activeColor}/>}
          {activeModule==="grammar"&&<GrammarModule color={activeColor}/>}

          {/* WELCOME */}
          {showWelcome&&!isSpecialModule&&(
            <div style={{animation:"su .5s cubic-bezier(.16,1,.3,1) both"}}>
              <div style={{textAlign:"center",padding:"28px 12px 20px"}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:7,background:`${activeColor}15`,border:`1px solid ${activeColor}28`,borderRadius:100,padding:"4px 12px",marginBottom:16,fontSize:10,color:activeColor,fontWeight:700}}>
                  ✦ 80/20 · SPACED REPETITION · ACTIVE RECALL
                </div>
                <h1 style={{fontFamily:"Space Grotesk,sans-serif",fontSize:"clamp(20px,5vw,36px)",fontWeight:700,color:"#fff",margin:"0 0 8px",lineHeight:1.15,letterSpacing:"-1px"}}>
                  Học thật, không học vẹt.<br/><span style={{color:activeColor}}>Kết quả thật.</span>
                </h1>
                <p style={{color:"#555",fontSize:12,maxWidth:420,margin:"0 auto 20px",lineHeight:1.7}}>
                  IELTS · SAT · GMAT · Writing Grader · Vocab SRS · Grammar Quiz · Speaking AI Examiner
                </p>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:8,maxWidth:540,margin:"0 auto 20px"}}>
                  {FEATURE_CARDS.map(f=>(
                    <button key={f.title} className="qbtn" onClick={()=>{
                      if(f.tab) switchModule(f.tab);
                      else if(f.msg) sendMessage(f.msg);
                    }} style={{background:"rgba(255,255,255,0.03)",border:`1px solid rgba(255,255,255,0.07)`,borderRadius:11,padding:"11px",cursor:"pointer",textAlign:"left"}}
                    onMouseOver={e=>e.currentTarget.style.borderColor=f.color+"55"}
                    onMouseOut={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"}>
                      <div style={{fontSize:18,marginBottom:5}}>{f.icon}</div>
                      <div style={{color:"#ddd",fontWeight:600,fontSize:11,marginBottom:2}}>{f.title}</div>
                      <div style={{color:"#555",fontSize:10,lineHeight:1.4}}>{f.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CHAT MESSAGES */}
          {!isSpecialModule&&messages.map((msg,idx)=>{
            const isLastBot=msg.role==="assistant"&&idx===messages.length-1;
            return (
              <div key={msg.id} className="mb" style={{display:"flex",justifyContent:msg.role==="user"?"flex-end":"flex-start",marginBottom:12}}>
                {msg.role==="assistant"&&(
                  <div style={{width:26,height:26,borderRadius:7,flexShrink:0,background:msg.voice?`linear-gradient(135deg,#F59E0B,#FF6B35)`:`linear-gradient(135deg,${activeColor},#7C3AED)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,marginRight:8,marginTop:2}}>
                    {msg.voice?"🎙️":"🧠"}
                  </div>
                )}
                <div style={{maxWidth:"83%",background:msg.role==="user"?`linear-gradient(135deg,${isSpeakingMode?"#F59E0BCC":activeColor+"CC"},${isSpeakingMode?"#FF6B3580":activeColor+"70"})`:"rgba(255,255,255,0.05)",border:msg.role==="user"?"none":"1px solid rgba(255,255,255,0.07)",borderRadius:msg.role==="user"?"15px 15px 3px 15px":"15px 15px 15px 3px",padding:"10px 14px",color:msg.role==="user"?"#fff":"#ddd",fontSize:13,lineHeight:1.75}}>
                  <div className="msg-content" dangerouslySetInnerHTML={{__html:renderMd(msg.content)}}/>
                  {isLastBot&&!!window.speechSynthesis&&(
                    <button onClick={()=>speak(msg.content)} style={{marginTop:7,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:6,color:"#555",cursor:"pointer",fontSize:10,padding:"3px 8px"}}>
                      🔊 Nghe lại
                    </button>
                  )}
                </div>
              </div>
            );
          })}
 {!isSpecialModule&&loading&&(
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
      {!isSpecialModule&&(
        <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:50,background:"rgba(10,10,15,0.94)",backdropFilter:"blur(24px)",borderTop:"1px solid rgba(255,255,255,0.05)",padding:"9px 12px 12px"}}>
          <div style={{maxWidth:860,margin:"0 auto"}}>
            {isListening&&transcript&&(
              <div style={{background:"rgba(0,200,150,0.07)",border:"1px solid rgba(0,200,150,0.18)",borderRadius:9,padding:"6px 10px",marginBottom:6,fontSize:12,color:"#00C896",display:"flex",alignItems:"center",gap:7}}>
                <Viz active={true} color="#00C896"/><span style={{fontStyle:"italic"}}>{transcript}</span>
              </div>
            )}
            {micError&&<div style={{background:"rgba(255,80,80,0.08)",border:"1px solid rgba(255,80,80,0.18)",borderRadius:8,padding:"5px 10px",marginBottom:6,fontSize:11,color:"#ff8888"}}>{micError}</div>}

            {isSpeakingMode?(
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
                <div style={{display:"flex",alignItems:"center",gap:14}}>
                  {isSpeaking&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}><Viz active={false} color="#F59E0B" speaking={true}/><span style={{fontSize:9,color:"#F59E0B"}}>Bot đang nói</span></div>}
                  <button className={isListening?"mac":""} onMouseDown={startListening} onMouseUp={stopListening} onTouchStart={e=>{e.preventDefault();startListening();}} onTouchEnd={e=>{e.preventDefault();stopListening();}} style={{width:62,height:62,borderRadius:"50%",border:"none",cursor:"pointer",background:isListening?"linear-gradient(135deg,#FF6B35,#FF3535)":"linear-gradient(135deg,#F59E0B,#FF6B35)",fontSize:24,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:isListening?"none":"0 4px 16px rgba(245,158,11,.3)"}}>
                    {isListening?"⏹":"🎙️"}
                  </button>
                  {isListening&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}><Viz active={true} color="#FF6B35"/><span style={{fontSize:9,color:"#FF6B35"}}>Đang nghe</span></div>}
                </div>
                <div style={{fontSize:10,color:"#444"}}>{isListening?"Thả để gửi":"Giữ để nói · Thả để gửi"}</div>
                <div style={{width:"100%",display:"flex",gap:7}}>
                  <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={handleKey} placeholder="Hoặc gõ câu trả lời..." style={{flex:1,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:9,padding:"8px 11px",color:"#fff",fontSize:12}}/>
                  <button onClick={()=>sendMessage()} disabled={!input.trim()||loading} style={{width:36,height:36,borderRadius:9,border:"none",cursor:"pointer",background:input.trim()&&!loading?"linear-gradient(135deg,#F59E0B,#FF6B35)":"rgba(255,255,255,0.05)",color:input.trim()&&!loading?"#000":"#444",fontSize:15}}>↑</button>
                </div>
              </div>
            ):(
              <div style={{display:"flex",gap:7,alignItems:"flex-end"}}>
                {voiceSupported&&(
                  <button className={isListening?"mac":""} onMouseDown={startListening} onMouseUp={stopListening} onTouchStart={e=>{e.preventDefault();startListening();}} onTouchEnd={e=>{e.preventDefault();stopListening();}} style={{width:40,height:40,borderRadius:10,border:"none",cursor:"pointer",flexShrink:0,background:isListening?"linear-gradient(135deg,#FF6B35,#FF3535)":"rgba(255,255,255,0.05)",color:isListening?"#fff":"#666",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {isListening?"⏹":"🎙️"}
                  </button>
                )}
                <div style={{flex:1,background:"rgba(255,255,255,0.05)",border:`1px solid ${input?activeColor+"45":"rgba(255,255,255,0.07)"}`,borderRadius:12,display:"flex",alignItems:"flex-end",gap:6,padding:"8px 12px",transition:"border-color .2s"}}>
                  <textarea ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={handleKey} placeholder={`Hỏi về ${MODULE_TABS.find(t=>t.id===activeModule)?.label||"IELTS, SAT, GMAT"}...`} rows={1} style={{flex:1,background:"none",border:"none",outline:"none",color:"#fff",fontSize:13,lineHeight:1.6,maxHeight:100,overflowY:"auto"}} onInput={e=>{e.target.style.height="auto";e.target.style.height=Math.min(e.target.scrollHeight,100)+"px";}}/>
                </div>
                <button onClick={()=>sendMessage()} disabled={!input.trim()||loading} style={{width:40,height:40,borderRadius:10,border:"none",cursor:"pointer",flexShrink:0,background:input.trim()&&!loading?`linear-gradient(135deg,${activeColor},#7C3AED)`:"rgba(255,255,255,0.05)",color:input.trim()&&!loading?"#fff":"#444",fontSize:17}}>↑</button>
              </div>
            )}
            <div style={{textAlign:"center",fontSize:9,color:"#1e1e1e",marginTop:4}}>EduBot Pro · Powered by Claude AI</div>
          </div>
        </div>
      )}
    </div>
  );
}