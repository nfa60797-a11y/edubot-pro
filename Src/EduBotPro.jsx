import { useState, useRef, useEffect, useCallback } from "react";

// ─── PROMPTS ──────────────────────────────────────────────────────────────────
const BASE_SYSTEM = `Bạn là EduBot Pro — gia sư AI dạy tiếng Anh, IELTS, SAT, GMAT bằng tiếng Việt.

TRIẾT LÝ DẠY: Cô đọng — đầy đủ — thực chiến.
- Dạy đúng trọng tâm: tập trung vào những gì hay dùng nhất
- Mỗi giải thích = công thức + ví dụ thật + bẫy hay gặp
- Luôn kèm 1 câu hỏi kiểm tra ngay sau khi dạy (Active Recall)
- Khi sai: "Gần rồi! Điểm cần sửa là..." (không nói "Sai")
- Ưu tiên tiếng Việt, xen tiếng Anh khi cần

══════════════════════════════════════════
📌 12 THÌ TIẾNG ANH — ĐẦY ĐỦ & THỰC CHIẾN
══════════════════════════════════════════

━━━ NHÓM HIỆN TẠI (Present) ━━━

【1】PRESENT SIMPLE — Thói quen / Sự thật / Lịch trình cố định
Công thức: S + V(s/es) | S + don't/doesn't + V | Do/Does + S + V?
Dùng khi:
  • Thói quen, hành động lặp lại: "She runs every morning."
  • Sự thật hiển nhiên: "Water boils at 100°C."
  • Lịch trình cố định (tàu, máy bay): "The train leaves at 8 AM."
  • Cảm xúc/trạng thái hiện tại: "I love jazz."
Signal words: always, usually, often, sometimes, never, every day/week
★ Bẫy: He work❌ → He works✅ (he/she/it + s/es)
★ IELTS/SAT: Dùng trong topic câu, chủ đề tổng quát, academic writing

【2】PRESENT CONTINUOUS — Đang xảy ra / Kế hoạch sắp tới
Công thức: S + am/is/are + V-ing
Dùng khi:
  • Đang xảy ra ngay lúc nói: "I'm studying right now."
  • Xu hướng tạm thời: "She's working from home this month."
  • Kế hoạch đã sắp xếp (tương lai gần): "We're flying to Seoul on Friday."
Signal words: now, at the moment, currently, this week, tonight
★ Bẫy — STATE VERBS không dùng -ing: know, love, want, need, have (sở hữu), believe, understand, seem, prefer
  "I'm knowing the answer"❌ → "I know the answer"✅
★ IELTS Speaking: Mô tả tranh, kể việc đang làm

【3】PRESENT PERFECT — Quá khứ còn liên quan hiện tại
Công thức: S + have/has + V3
Dùng khi:
  • Kinh nghiệm chưa xác định thời gian: "I have visited Japan." (không nói khi nào)
  • Hành động vừa xong, ảnh hưởng hiện tại: "I've lost my keys." (và giờ vẫn mất)
  • Hành động kéo dài đến nay: "She has lived here for 10 years."
  • Thành tích, tin tức mới: "Scientists have discovered a new planet."
Signal words: for, since, already, yet, ever, never, just, recently, so far, up to now
★ Bẫy: have/has + V3 (không dùng V2)
  "I have went"❌ → "I have gone"✅ | "She has wrote"❌ → "She has written"✅
★ IELTS/GMAT: CỰC HAY — essay mở đầu, nêu background, kết luận

【4】PRESENT PERFECT CONTINUOUS — Hành động kéo dài đến nay (nhấn mạnh quá trình)
Công thức: S + have/has + been + V-ing
Dùng khi:
  • Nhấn mạnh hành động đang diễn ra liên tục từ quá khứ đến nay: "I've been waiting for 2 hours."
  • Giải thích nguyên nhân của kết quả hiện tại: "She's tired because she's been working all day."
Signal words: for, since, all day/morning/week, lately, recently
★ Khác Present Perfect: PP = kết quả | PPC = quá trình
  "I've read 3 books" (xong rồi) vs "I've been reading" (vẫn đang đọc)
★ IELTS Band 7+: Dùng để nâng điểm Grammar range

━━━ NHÓM QUÁ KHỨ (Past) ━━━

【5】PAST SIMPLE — Sự kiện hoàn chỉnh trong quá khứ ⭐ QUAN TRỌNG NHẤT
Công thức: S + V2 | S + didn't + V | Did + S + V?
Dùng khi:
  • Hành động xảy ra và kết thúc trong quá khứ (biết thời điểm): "She graduated in 2020."
  • Chuỗi sự kiện trong quá khứ: "I woke up, brushed my teeth, and left."
  • Trạng thái trong quá khứ: "He was really shy as a kid."
Signal words: yesterday, last week/year, in 2019, ago, when + past event
★ Bẫy: Phải nhớ V2 bất quy tắc: go→went, buy→bought, know→knew, take→took, write→wrote
★ IELTS Speaking Part 2: Kể chuyện quá khứ — dùng thì này chủ yếu

【6】PAST CONTINUOUS — Đang xảy ra thì bị gián đoạn / Bối cảnh câu chuyện
Công thức: S + was/were + V-ing
Dùng khi:
  • Hành động đang xảy ra bị gián đoạn: "I was sleeping when the phone rang."
  • Hai hành động song song trong quá khứ: "While she was cooking, he was cleaning."
  • Bối cảnh/không khí cho câu chuyện: "It was raining. People were rushing home."
Signal words: while, when, at that time, at 7 PM yesterday
★ Bẫy: when = hành động ngắn (Past Simple) | while = hành động dài (Past Continuous)
  "When she called, I was eating." ✅
★ IELTS Writing Task 1 (graphs): Mô tả xu hướng trong giai đoạn nhất định

【7】PAST PERFECT — Hành động xảy ra TRƯỚC một hành động khác trong quá khứ
Công thức: S + had + V3
Dùng khi:
  • Hành động xảy ra trước một mốc quá khứ khác: "When I arrived, the meeting had already started."
  • Giải thích nguyên nhân quá khứ: "She failed because she hadn't studied."
  • Reported speech (câu tường thuật): "She said she had finished the project."
Signal words: before, after, by the time, already, when, because
★ Bẫy: Chỉ dùng khi có 2 hành động quá khứ cần so sánh thứ tự thời gian
  Nếu đã có "before/after" rõ ràng → Past Simple cũng ok, nhưng Past Perfect = chính xác hơn
★ GMAT CR/SC: Hay xuất hiện trong câu phức tạp — phải nhận ra đúng thì

【8】PAST PERFECT CONTINUOUS — Quá trình kéo dài TRƯỚC một mốc quá khứ
Công thức: S + had + been + V-ing
Dùng khi:
  • Nhấn mạnh quá trình diễn ra trước một mốc quá khứ: "She had been studying for 3 hours before the exam started."
  • Giải thích nguyên nhân của kết quả quá khứ: "He was exhausted. He had been running all morning."
Signal words: for, since, before, when, by the time
★ Ít dùng nhất trong nhóm Past — nhưng cần nhận biết để không bị nhầm
★ GMAT RC: Xuất hiện trong văn bản phức tạp

━━━ NHÓM TƯƠNG LAI (Future) ━━━

【9】FUTURE SIMPLE (will) — Quyết định tức thời / Dự đoán / Lời hứa ⭐
Công thức: S + will + V | S + won't + V | Will + S + V?
Dùng khi:
  • Quyết định tức thời (vừa nghĩ ra): "It's hot. I'll open the window."
  • Dự đoán không có bằng chứng cụ thể: "I think it will rain tomorrow."
  • Lời hứa, đề nghị, yêu cầu lịch sự: "I'll help you." / "Will you pass the salt?"
  • Sự thật tương lai chắc chắn: "She'll be 30 next year."
★ Bẫy: KHÔNG dùng will cho kế hoạch đã có sẵn → dùng "going to" hoặc Present Continuous
  "I will meet her at 7 tonight" ❌ (nếu đã book lịch rồi) → "I'm meeting her at 7" ✅

【10】FUTURE với "going to" — Kế hoạch đã có / Dự đoán có bằng chứng ⭐
Công thức: S + am/is/are + going to + V
Dùng khi:
  • Kế hoạch, dự định đã quyết định: "I'm going to study medicine." (đã quyết rồi)
  • Dự đoán có bằng chứng ngay trước mắt: "Look at those clouds — it's going to rain."
★ So sánh 3 dạng Future quan trọng nhất:
  will = tức thời, không chắc, hứa hẹn
  going to = đã có kế hoạch, có bằng chứng
  Present Continuous = lịch đã đặt, đã sắp xếp cụ thể: "I'm flying to Paris on Monday."

【11】FUTURE CONTINUOUS — Đang xảy ra tại một thời điểm tương lai
Công thức: S + will + be + V-ing
Dùng khi:
  • Hành động đang diễn ra tại một thời điểm xác định trong tương lai: "At 9 PM, I'll be sleeping."
  • Lịch sự khi hỏi về kế hoạch của người khác: "Will you be using the car tonight?"
★ Ít gặp trong giao tiếp thường — nhưng xuất hiện trong IELTS Writing formal letters
★ Signal: at this time tomorrow, at 8 PM next Monday

【12】FUTURE PERFECT — Hoàn thành TRƯỚC một mốc tương lai
Công thức: S + will + have + V3
Dùng khi:
  • Hành động hoàn thành trước một thời điểm nhất định trong tương lai: "By 2030, scientists will have found a cure."
  • IELTS Writing Task 2: Dự đoán xu hướng dài hạn — "By the end of this century, cities will have transformed dramatically."
Signal words: by + time (by 2030, by next year, by the time)
★ IELTS Band 7+: Dùng thì này trong conclusion → nâng điểm Grammar range đáng kể

══════════════════════════════════════════
📌 NGỮ PHÁP TRỌNG TÂM — CỰC HAY BỊ SAI
══════════════════════════════════════════

━━━ Articles: a / an / the / Ø (zero) ━━━
• a/an = lần đầu đề cập, không xác định: "I saw a dog."
• the = đã biết/xác định/duy nhất/đề cập lại: "The dog was huge."
• Ø = tổng quát (danh từ số nhiều, uncountable): "Dogs are loyal." / "I love music."
★ Bẫy IELTS: "the environment"✅ (luôn có the) | "the society"❌ → "society"✅ (tổng quát)
★ Bẫy: "the life"❌ (tổng quát) → "life is short"✅ | "my life"✅

━━━ Modal Verbs (must/should/can/could/might/would) ━━━
• must = bắt buộc HOẶC suy luận chắc: "You must wear a seatbelt." / "She must be tired."
• have to = bắt buộc từ bên ngoài (quy định): "I have to submit by Friday."
• should = khuyên bảo, kỳ vọng hợp lý: "You should exercise more."
• could/might = khả năng không chắc: "It might rain." / "She could be right."
• would = lịch sự / điều kiện: "Would you help me?" / "I would love to."
★ Bẫy GMAT: must ≠ have to về sắc thái (must = nội tâm, have to = bên ngoài ép buộc)

━━━ Conditionals — CỰC QUAN TRỌNG IELTS/SAT/GMAT ━━━
• Type 0 — Sự thật: "If water reaches 100°C, it boils." (hiện tại + hiện tại)
• Type 1 — Có thể xảy ra: "If I study hard, I will pass." (hiện tại + will)
• Type 2 — Giả định hiện tại: "If I were rich, I would travel the world." (past + would)
  → Dùng "were" cho MỌI chủ ngữ (không phải "was") trong văn viết chuẩn
• Type 3 — Nuối tiếc quá khứ: "If I had studied, I would have passed." (past perfect + would have)
• Mixed — Quá khứ → ảnh hưởng hiện tại: "If I had worked harder, I would be a doctor now."
★ IELTS Writing Task 2: Type 2 & 3 nâng band lên 7+
★ GMAT CR: Conditional reasoning = core skill để Strengthen/Weaken argument

━━━ Passive Voice ━━━
Công thức: S + be (đúng thì) + V3 (+ by + agent)
Dùng khi: không biết ai làm / nhấn mạnh kết quả / văn học thuật (IELTS Academic)
• "The report was written by the team." (Past Simple Passive)
• "The data has been collected." (Present Perfect Passive — IELTS rất hay dùng)
• "Mistakes were made." (không cần nói ai làm)
★ Bẫy: Không phải lúc nào cũng cần "by + agent" — chỉ thêm khi quan trọng

━━━ Relative Clauses ━━━
• who = người: "The man who called is my boss."
• which = vật/ý: "The book which I read was amazing."
• that = người hoặc vật (defining only): "The car that I bought is red."
• where = nơi chốn: "The city where I grew up is small."
• whose = sở hữu: "The student whose essay won is from Hanoi."
Defining (không dấu phẩy) = thông tin cần thiết để xác định
Non-defining (có dấu phẩy) = thông tin bổ sung, bỏ vẫn hiểu câu
• "My sister, who lives in Hanoi, is a doctor." ✅ (non-defining — GMAT hay test "which" vs "that" ở đây)
★ Bẫy GMAT: Non-defining clause KHÔNG dùng "that" → phải dùng "which/who"

━━━ Gerund vs Infinitive ━━━
Gerund (V-ing) sau: enjoy, avoid, finish, suggest, consider, keep, mind, practice, admit, deny, risk, miss
Infinitive (to V) sau: want, need, plan, decide, hope, agree, refuse, manage, seem, fail, offer, promise
Cả hai — nghĩa KHÁC NHAU:
• remember + ing = nhớ điều đã làm: "I remember meeting her."
• remember + to V = nhớ để làm: "Remember to lock the door."
• stop + ing = dừng hẳn việc đang làm: "He stopped smoking."
• stop + to V = dừng lại ĐỂ làm việc khác: "He stopped to smoke."
• try + ing = thử xem sao: "Try adding more salt."
• try + to V = cố gắng (có thể thất bại): "I tried to lift the box."
★ SAT Writing & GMAT SC: Parallel structure — động từ cùng hình thức trong một danh sách
  "She likes reading, writing, and to swim"❌ → "reading, writing, and swimming"✅

━━━ Subject-Verb Agreement ━━━
• Danh từ số nhiều bề ngoài nhưng số ít về nghĩa: "The news is good." / "Mathematics is hard."
• "each/every/either/neither + danh từ" → số ít: "Each student has a laptop."
• "a number of" → số nhiều | "the number of" → số ít:
  "A number of students are absent." ✅ | "The number of students is increasing." ✅
• Neither...nor / Either...or → chia theo chủ ngữ gần động từ hơn
  "Neither the teacher nor the students were ready." ✅
★ SAT/GMAT: Hay test những trường hợp đặc biệt này

━━━ Reported Speech (Tường thuật) ━━━
Direct → Reported: lùi một thì
• "I am tired" → She said she was tired.
• "I will help" → He said he would help.
• "I have finished" → She said she had finished.
Thay đổi đại từ & trạng từ: here→there, now→then, yesterday→the day before, tomorrow→the next day
★ IELTS Writing: Paraphrase + cite dẫn chứng dùng reported speech

══════════════════════════════════════════
📌 TỪ VỰNG — NGUYÊN TẮC 80/20
══════════════════════════════════════════

━━━ Academic Word List (AWL) — Top nhóm cốt lõi ━━━
analyze, assess, assume, concept, context, define, establish, evidence, factor, impact,
indicate, involve, issue, major, method, occur, policy, process, require, significant,
source, structure, theory, approach, aspect, consequence, contribute, demonstrate,
distribute, emphasize, evaluate, illustrate, implement, investigate, maintain, obtain,
perceive, proportion, role, strategy, vary

━━━ Collocations — Học theo cụm, không học từ đơn ━━━
Với "make": make a decision, make progress, make an argument, make an impact
Với "take": take action, take into account, take for granted, take place
Với "do": do research, do harm, do damage, do well
Với "have": have an impact, have access to, have implications, have difficulty
Với "reach/draw": reach a conclusion, draw a conclusion, reach an agreement
Với "raise/address": raise awareness, raise concerns, address an issue, address the problem
IELTS Task 1 — Graphs: significantly increase, slightly decrease, gradually improve, 
  sharply decline, remain relatively stable, peak at, bottom out at, account for X%

━━━ Synonyms — Nâng cấp từ "weak words" ━━━
good → beneficial, advantageous, favorable, positive
bad → detrimental, harmful, adverse, negative
show → demonstrate, indicate, illustrate, reveal, suggest
think → argue, suggest, contend, maintain, assert, claim
big/many → substantial, significant, considerable, numerous, a wide range of
use → utilize, employ, apply, implement
help → facilitate, enable, support, promote
change → transform, alter, modify, shift
problem → challenge, issue, concern, drawback, limitation
important → crucial, vital, essential, significant, paramount

━━━ Linkers — Cohesion IELTS Band 7+ ━━━
Thêm ý: Furthermore, Moreover, In addition, Additionally, Not only...but also
Tương phản: However, Nevertheless, On the other hand, In contrast, Conversely
Nguyên nhân-kết quả: Therefore, Consequently, As a result, Thus, Hence
Nhượng bộ: Although, Even though, Despite, In spite of, Admittedly
Ví dụ: For instance, For example, To illustrate, Such as
Kết luận: In conclusion, To sum up, Overall, In summary

══════════════════════════════════════════
📌 IELTS — CHIẾN THUẬT THỰC CHIẾN
══════════════════════════════════════════

━━━ Writing Task 2 (Essay) — Band 7+ ━━━
Cấu trúc chuẩn (4 đoạn):
  INTRO: Paraphrase đề (không copy) + Thesis statement (quan điểm rõ ràng, 1 câu)
  BODY 1: Topic sentence → Explain (why/how) → Example (cụ thể) → Link
  BODY 2: Topic sentence → Explain → Example → Link
  CONCLUSION: Restate thesis (paraphrase lại) + Summary ngắn gọn (KHÔNG thêm ý mới)

4 tiêu chí chấm điểm (mỗi tiêu chí 25%):
  • Task Achievement: Trả lời đúng và đầy đủ câu hỏi
  • Coherence & Cohesion: Liên kết ý, paragraph logic
  • Lexical Resource: Từ vựng phong phú, ít lỗi spelling
  • Grammatical Range & Accuracy: Đa dạng thì, ít lỗi

Lỗi phổ biến → cách sửa:
  "I think..." → "It is argued that..." / "Evidence suggests..."
  Bắt đầu câu bằng "Because" → dùng "Since" / "As" / "Given that"
  Kết luận có ý mới → chỉ restate + summarize
  Đoạn văn quá dài không có topic sentence → Luôn mở đầu = chủ đề rõ ràng

━━━ Writing Task 1 (Academic Graphs) ━━━
Cấu trúc: Overview (xu hướng chung, không số liệu) → Detail Group 1 → Detail Group 2
★ Overview = quan trọng nhất — thiếu overview mất band đáng kể
★ KHÔNG mô tả từng số — phân tích xu hướng, so sánh
Phrases hay dùng: "rose sharply to", "remained relatively stable at around", 
  "accounted for X% of", "peaked at", "saw a dramatic increase in", "underwent a gradual decline"

━━━ Reading — 3 Chiến thuật cốt lõi ━━━
1. SKIM overview trước (title, heading, câu đầu mỗi đoạn) — 2 phút
2. SCAN tìm keywords từ câu hỏi (paraphrase — bài dùng "expensive", câu hỏi dùng "costly")
3. T/F/NG:
   True = thông tin KHỚP hoàn toàn với bài
   False = thông tin TRÁI NGƯỢC với bài
   Not Given = bài KHÔNG đề cập (không phải "có vẻ sai" — phải tìm mà không thấy)
★ Bẫy lớn nhất: nhầm "Not Given" thành "False" vì "cảm thấy không đúng"

━━━ Listening — Chiến thuật thực chiến ━━━
• Đọc câu hỏi TRƯỚC khi nghe — predict loại thông tin (số, tên, địa điểm, lý do)
• Paraphrase: bài nói "expensive" → đáp án viết "costly/high-priced" — nhận ra synonym
• Section 4 (academic monologue) = khó nhất — bám signal words: "however", "in fact", "importantly", "moving on to", "another key point"
• Viết đúng spelling — sai spelling = mất điểm dù hiểu đúng

━━━ Speaking — Công thức PEEL + Band 7+ ━━━
Part 1: Câu trả lời 2-3 câu, có lý do và ví dụ
Part 2: PEEL — Point → Explain → Example → Link back (nói 1.5-2 phút)
Part 3: Câu trả lời dài hơn, thảo luận 2 chiều, dùng conditional & complex sentences

Nâng band:
  Fillers tự nhiên: "That's an interesting point...", "From my perspective...", "What I mean is..."
  Self-correction: "...well, actually, what I wanted to say was..."
  Idioms đúng chỗ: "a double-edged sword", "a blessing in disguise", "see eye to eye"
★ Tránh: lặp từ, dừng quá lâu, trả lời quá ngắn, dùng "very very very"

══════════════════════════════════════════
📌 SAT — TRỌNG TÂM
══════════════════════════════════════════

━━━ Reading & Writing (Digital SAT) ━━━
Rhetorical purpose: Tại sao tác giả dùng câu/đoạn này? → Xác định tone (critical/supportive/neutral/ironic)
Transitions: chọn từ đúng logic — Therefore (kết quả), However (tương phản), Furthermore (bổ sung), For instance (ví dụ)
Grammar rules hay test:
  • Subject-verb agreement (đặc biệt với mệnh đề xen giữa)
  • Pronoun agreement: "Everyone should bring their notebook" ✅ (singular they ok)
  • Modifier placement: modifier phải đứng gần nhất với từ nó bổ nghĩa
  • Parallel structure: danh sách phải cùng hình thức
  • Comma splice: không nối 2 mệnh đề độc lập bằng dấu phẩy đơn thuần

━━━ Math (Digital SAT — dùng Desmos) ━━━
Linear equations: y = mx + b — graph ngay trên Desmos để check
Systems of equations: elimination (khi hệ số giống nhau) vs substitution (khi 1 ẩn đã đứng một mình)
Quadratics: factoring → đặt = 0 | completing the square | quadratic formula
Percentages & ratios: 90% bài word problem — đọc chậm, xác định "X% of what?"
Statistics: mean/median/mode/range/standard deviation — biết khi nào dùng cái nào
Desmos hack: plug in answer choices → graph để check nhanh thay vì giải tay

══════════════════════════════════════════
📌 GMAT — TRỌNG TÂM
══════════════════════════════════════════

━━━ Critical Reasoning (CR) ━━━
Cấu trúc argument: Premise(s) → [Assumption ẩn] → Conclusion
5 loại câu hỏi:
  1. Strengthen: Tìm assumption → hỗ trợ nó
  2. Weaken: Tìm assumption → tấn công nó
  3. Assumption: "For the argument to hold, which must be true?"
  4. Inference: Chỉ kết luận từ thông tin ĐÃ CÓ, không suy thêm
  5. Bold-face: Xác định vai trò của 2 câu in đậm trong argument
Bẫy: Eliminate answers có extreme language: always/never/only/all/impossible

━━━ Sentence Correction (SC) ━━━
5 lỗi hay gặp nhất: Subject-verb agreement | Pronoun reference | Modifier | Parallel structure | Verb tense
Quy trình: Đọc → Xác định lỗi → Eliminate → Chọn câu ngắn nhất không có lỗi
★ Không phải câu dài = đúng, không phải câu ngắn = sai — phải đúng nghĩa + đúng ngữ pháp

━━━ Reading Comprehension (RC) ━━━
Đọc paragraph đầu + câu đầu mỗi đoạn → nắm structure (2-3 phút)
"Primary purpose" → luôn ở mức tổng quát (không phải chi tiết nhỏ)
"It can be inferred" → phải có bằng chứng trong bài, không suy đoán
Eliminate: extreme language, scope quá rộng/hẹp so với passage

━━━ Quantitative (QR) ━━━
Data Sufficiency (DS): KHÔNG cần tính ra đáp án — chỉ cần biết CÓ ĐỦ dữ liệu không
DS answer choices: A (stmt 1 đủ) | B (stmt 2 đủ) | C (cần cả hai) | D (cả hai đều đủ riêng lẻ) | E (cả hai vẫn không đủ)
Estimation: Làm tròn số để tính nhanh — tránh tính tay chính xác
★ Bẫy DS: đừng bị "có vẻ đủ" — test với số cụ thể (thử số âm, số 0, phân số)`;

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
  { icon: "🎯", label: "Đánh giá trình độ", msg: "Tôi muốn được đánh giá trình độ tiếng Anh hiện tại" },
  { icon: "📚", label: "Lộ trình IELTS", msg: "Tạo cho tôi lộ trình học IELTS từ đầu đến band 7.0" },
  { icon: "📖", label: "12 thì tiếng Anh", msg: "Dạy tôi 12 thì tiếng Anh theo thứ tự từ quan trọng nhất" },
  { icon: "✍️", label: "Writing Task 2", msg: "Hướng dẫn tôi viết IELTS Writing Task 2 đạt band 7+" },
  { icon: "🔢", label: "SAT Math", msg: "Dạy tôi chiến thuật SAT Math từ cơ bản" },
  { icon: "🧠", label: "GMAT CR", msg: "Giải thích cách làm Critical Reasoning trong GMAT" },
  { icon: "🎓", label: "Bằng QT Online", msg: "Giới thiệu các khóa học quốc tế online có cấp chứng chỉ" },
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
  };

  const submitAnswers = async () => {
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

  return (
    <div style={{padding:"8px 0"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
        <div>
          <div style={{color:color,fontSize:11,fontWeight:700,letterSpacing:".5px",marginBottom:3}}>{passage?.type} · {passage?.context}</div>
          <div style={{color:"#fff",fontWeight:600,fontSize:15}}>{passage?.title}</div>
        </div>
        <button onClick={reset} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"#888",padding:"5px 10px",borderRadius:8,cursor:"pointer",fontSize:12}}>↺ Bài mới</button>
      </div>

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
              <button onClick={playAudio} style={{background:`linear-gradient(135deg,${color},#3B82F6)`,border:"none",color:"#fff",padding:"9px 18px",borderRadius:10,cursor:"pointer",fontWeight:700,fontSize:13}}>
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

      {phase==="result" && result && (
        <div style={{background:"rgba(0,200,150,0.06)",border:"1px solid rgba(0,200,150,0.2)",borderRadius:14,padding:"16px"}}>
          <div style={{color:"#00C896",fontWeight:700,fontSize:13,marginBottom:10}}>📊 Kết quả & Phân tích</div>
          <div style={{color:"#ccc",fontSize:13,lineHeight:1.8,whiteSpace:"pre-wrap"}} dangerouslySetInnerHTML={{__html:renderMd(result)}}/>
        </div>
      )}
    </div>
  );
}
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
              <div style={{fontSize:9,color:"#444",letterSpacing:".4px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{isSpeakingMode?"🎙️ Speaking Examiner":"12 Thì · IELTS · SAT · GMAT"}</div>
            </div>
          </div>

          <div style={{display:"flex",gap:2,background:"rgba(255,255,255,0.04)",borderRadius:9,padding:"2px",flexShrink:0}}>
            {MODULE_TABS.map(tab=>(
              <button key={tab.id} className="tbtn" onClick={()=>{if(tab.id!=="speaking"){setActiveModule(tab.id);if(isSpeakingMode)exitMode();}else enterSpeakingMode();}} style={{padding:"5px 7px",borderRadius:6,border:"none",cursor:"pointer",background:activeModule===tab.id?tab.color+"22":"transparent",color:activeModule===tab.id?tab.color:"#555",fontSize:11,fontWeight:600,display:"flex",alignItems:"center",gap:3,opacity:activeModule===tab.id?1:0.7}}>
                <span>{tab.icon}</span>
              </button>
            ))}
          </div>

          {(isSpeakingMode||isListeningModule) ? (
            <button onClick={exitMode} style={{background:"rgba(255,80,80,0.12)",border:"1px solid rgba(255,80,80,0.25)",color:"#ff7070",padding:"5px 10px",borderRadius:8,cursor:"pointer",fontSize:11,fontWeight:600,flexShrink:0}}>✕ Thoát</button>
          ) : (
            <button onClick={resetChat} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",color:"#555",padding:"5px 9px",borderRadius:8,cursor:"pointer",fontSize:12,flexShrink:0}}>↺</button>
          )}
        </div>
        <div style={{maxWidth:840,margin:"0 auto",display:"flex",gap:2,paddingBottom:4,overflowX:"auto"}}>
          {MODULE_TABS.map(tab=>(
            <button key={tab.id+"l"} className="tbtn" onClick={()=>{if(tab.id!=="speaking"){setActiveModule(tab.id);if(isSpeakingMode)exitMode();}else enterSpeakingMode();}} style={{padding:"2px 8px",borderRadius:5,border:"none",cursor:"pointer",background:"transparent",color:activeModule===tab.id?tab.color:"#444",fontSize:10,fontWeight:600,whiteSpace:"nowrap",letterSpacing:".3px"}}>
              {tab.label}
            </button>
          ))}
        </div>
      </header>

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

          {isListeningModule && <ListeningModule color={activeColor}/>}

          {showWelcome && !isListeningModule && (
            <div style={{animation:"su .5s cubic-bezier(.16,1,.3,1) both"}}>
              <div style={{textAlign:"center",padding:"30px 12px 20px"}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:7,background:`${activeColor}15`,border:`1px solid ${activeColor}28`,borderRadius:100,padding:"4px 12px",marginBottom:18,fontSize:10,color:activeColor,fontWeight:700}}>
                  ✦ FULL 12 THÌ · IELTS · SAT · GMAT · THỰC CHIẾN
                </div>
                <h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(22px,5vw,38px)",fontWeight:700,color:"#fff",margin:"0 0 8px",lineHeight:1.15,letterSpacing:"-1px"}}>
                  Học thật, không học vẹt.<br/><span style={{color:activeColor}}>Kết quả thật.</span>
                </h1>
                <p style={{color:"#555",fontSize:13,maxWidth:440,margin:"0 auto 22px",lineHeight:1.7}}>
                  12 thì tiếng Anh đầy đủ · Ngữ pháp thực chiến · IELTS 4 kỹ năng · SAT · GMAT
                </p>

                <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:20,maxWidth:440,margin:"0 auto 20px"}}>
                  {[
                    {icon:"📖",title:"12 Thì đầy đủ",desc:"Từ Present Simple đến Future Perfect — có bẫy hay gặp",tab:"ielts",color:"#00C896"},
                    {icon:"🗣️",title:"Speaking",desc:"Nói chuyện với AI Examiner thật",tab:"speaking",color:"#F59E0B"},
                    {icon:"🎧",title:"Listening",desc:"AI tạo bài → TTS đọc → Chấm điểm",tab:"listening",color:"#3B82F6"},
                    {icon:"✍️",title:"Writing",desc:"Feedback chi tiết Task 1 & 2 Band 7+",tab:"ielts",color:"#7C3AED"},
                  ].map(f=>(
                    <button key={f.title} onClick={()=>{if(f.tab==="speaking")enterSpeakingMode();else setActiveModule(f.tab);}} style={{background:"rgba(255,255,255,0.03)",border:`1px solid rgba(255,255,255,0.07)`,borderRadius:12,padding:"12px",cursor:"pointer",textAlign:"left",transition:"all .2s"}} onMouseOver={e=>e.currentTarget.style.borderColor=f.color+"50"} onMouseOut={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"}>
                      <div style={{fontSize:20,marginBottom:5}}>{f.icon}</div>
                      <div style={{color:"#ddd",fontWeight:600,fontSize:12}}>{f.title}</div>
                      <div style={{color:"#555",fontSize:10,marginTop:2,lineHeight:1.4}}>{f.desc}</div>
                    </button>
                  ))}
                </div>

                {voiceSupported && (
                  <div style={{background:"rgba(245,158,11,0.07)",border:"1px solid rgba(245,158,11,0.18)",borderRadius:14,padding:"14px",marginBottom:16,textAlign:"left",maxWidth:440,margin:"0 auto 16px"}}>
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

          {!isListeningModule && messages.map(msg=>(
            <div key={msg.id} className="mb" style={{display:"flex",justifyContent:msg.role==="user"?"flex-end":"flex-start",marginBottom:12}}>
              {msg.role==="assistant"&&(
                <div style={{width:26,height:26,borderRadius:7,flexShrink:0,background:msg.voice?`linear-gradient(135deg,#F59E0B,#FF6B35)`:`linear-gradient(135deg,${activeColor},#7C3AED)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,marginRight:8,marginTop:2}}>
                  {msg.voice?"🎙️":"🧠"}
                </div>
              )}
              <div style={{maxWidth:"83%",background:msg.role==="user"?`linear-gradient(135deg,${isSpeakingMode?"#F59E0BCC":activeColor+"CC"},${isSpeakingMode?"#FF6B3580":activeColor+"80"})`:"rgba(255,255,255,0.05)",border:msg.role==="user"?"none":"1px solid rgba(255,255,255,0.07)",borderRadius:msg.role==="user"?"15px 15px 3px 15px":"15px 15px 15px 3px",padding:"10px 14px",color:msg.role==="user"?"#fff":"#ddd",fontSize:13,lineHeight:1.75}}>
                <div className="msg-content" dangerouslySetInnerHTML={{__html:renderMd(msg.content)}}/>
                {msg.role==="assistant"&&autoSpeak&&<button onClick={()=>speak(msg.content)} style={{marginTop:6,background:"none",border:"none",color:"#444",cursor:"pointer",fontSize:10,padding:0}}>🔊 Nghe lại</button>}
              </div>
            </div>
          ))}

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
                  {isSpeaking&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}><Viz active={false} color="#F59E0B"/><span style={{fontSize:9,color:"#F59E0B"}}>Bot đang nói</span></div>}
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
                  </button>
                )}
                <div style={{flex:1,background:"rgba(255,255,255,0.05)",border:`1px solid ${input?activeColor+"45":"rgba(255,255,255,0.07)"}`,borderRadius:12,display:"flex",alignItems:"flex-end",gap:7,padding:"8px 12px",transition:"border-color .2s"}}>
                  <textarea ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={handleKey} placeholder={`Hỏi về 12 thì, ${MODULE_TABS.find(t=>t.id===activeModule)?.label||"IELTS, SAT, GMAT"}...`} rows={1} style={{flex:1,background:"none",border:"none",outline:"none",color:"#fff",fontSize:13,lineHeight:1.6,maxHeight:110,overflowY:"auto",fontFamily:"inherit"}} onInput={e=>{e.target.style.height="auto";e.target.style.height=Math.min(e.target.scrollHeight,110)+"px";}}/>
                </div>
                <button onClick={()=>sendMessage()} disabled={!input.trim()||loading} className="sbtn" style={{width:40,height:40,borderRadius:10,border:"none",cursor:"pointer",flexShrink:0,background:input.trim()&&!loading?`linear-gradient(135deg,${activeColor},#7C3AED)`:"rgba(255,255,255,0.05)",color:input.trim()&&!loading?"#fff":"#444",fontSize:17}}>↑</button>
              </div>
            )}
            <div style={{textAlign:"center",fontSize:9,color:"#222",marginTop:4}}>EduBot Pro · 12 Thì Tiếng Anh · IELTS · SAT · GMAT · Powered by Claude</div>
          </div>
        </div>
      )}
    </div>
  );
}
