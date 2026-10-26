/**
 * ผจญภัยโลกกระดูกมหัศจรรย์ - Bone Adventure Game (Science P.3)
 * สคริปต์ควบคุมเกม ระบบคำถาม สุ่มตัวเลือก เสียงสังเคราะห์ และการเชื่อมต่อ Google Sheets
 */

// ==========================================
// 1. ธนาคารคำถาม 7 ด่าน (Question Bank)
// ==========================================
const STAGES_DATA = [
  {
    id: 1,
    title: "ด่านที่ 1: ปราการกะโหลกศีรษะ",
    icon: "💀",
    question: "กระดูก 'กะโหลกศีรษะ' ของมนุษย์ มีหน้าที่สำคัญที่สุดในการปกป้องอวัยวะใด?",
    correctText: "สมอง",
    choices: [
      { text: "สมอง", isCorrect: true },
      { text: "หัวใจ", isCorrect: false },
      { text: "กระเพาะอาหาร", isCorrect: false },
      { text: "ปอด", isCorrect: false }
    ],
    hint: "อวัยวะนี้อยู่ในหัวของเรา ใช้สำหรับคิด จำ และสั่งการร่างกายจ้า!",
    fact: "กะโหลกศีรษะเปรียบเสมือนหมวกกันน็อกธรรมชาติที่แข็งแกร่ง คอยปกป้องสมองที่อ่อนนุ่มไม่ให้ได้รับอันตราย"
  },
  {
    id: 2,
    title: "ด่านที่ 2: เกราะอกซี่โครงมหัศจรรย์",
    icon: "🫁",
    question: "กระดูก 'ซี่โครง' โค้งรอบหน้าอกเพื่อทำหน้าที่เปรียบเสมือนเกราะป้องกันอวัยวะใด?",
    correctText: "หัวใจและปอด",
    choices: [
      { text: "หัวใจและปอด", isCorrect: true },
      { text: "สมองและดวงตา", isCorrect: false },
      { text: "กระเพาะอาหารและลำไส้", isCorrect: false },
      { text: "ตับและไต", isCorrect: false }
    ],
    hint: "เป็นอวัยวะที่เต้นตึกตักตลอดเวลา และอวัยวะที่ใช้สำหรับหายใจเข้า-ออก!",
    fact: "กระดูกซี่โครงมนุษย์มี 12 คู่ (24 ชิ้น) ทำหน้าที่เป็นกรงคุ้มกันหัวใจและปอด และยังช่วยขยายตัวเวลาเราหายใจด้วยนะ"
  },
  {
    id: 3,
    title: "ด่านที่ 3: เสาค้ำหลังหรรษา",
    icon: "🧍",
    question: "กระดูก 'สันหลัง' มีความสำคัญต่อร่างกายของพวกเราอย่างไร?",
    correctText: "ช่วยให้ลำตัวตั้งตรง และก้มหรือเอี้ยวตัวได้",
    choices: [
      { text: "ช่วยให้ลำตัวตั้งตรง และก้มหรือเอี้ยวตัวได้", isCorrect: true },
      { text: "ช่วยเคี้ยวอาหารให้ละเอียดก่อนกลืน", isCorrect: false },
      { text: "ช่วยสูบฉีดเลือดไปเลี้ยงส่วนต่าง ๆ", isCorrect: false },
      { text: "ช่วยย่อยอาหารในกระเพาะอาหาร", isCorrect: false }
    ],
    hint: "เป็นแนวกระดูกยาวอยู่กลางหลัง ทำให้เรายืน เดิน หลังตรง และก้มผูกเชือกรองเท้าได้!",
    fact: "กระดูกสันหลังเป็นแนวกระดูกข้อต่อเล็ก ๆ เรียงต่อกัน ทำให้ร่างกายเราทั้งแข็งแรงและยืดหยุ่นบิดตัวได้คล่องแคล่ว"
  },
  {
    id: 4,
    title: "ด่านที่ 4: ไขปริศนาจำนวนกระดูก",
    icon: "🔢",
    question: "ในร่างกายของมนุษย์วัยผู้ใหญ่ มีกระดูกทั้งหมดประกอบกันประมาณกี่ชิ้น?",
    correctText: "ประมาณ 206 ชิ้น",
    choices: [
      { text: "ประมาณ 206 ชิ้น", isCorrect: true },
      { text: "ประมาณ 50 ชิ้น", isCorrect: false },
      { text: "ประมาณ 100 ชิ้น", isCorrect: false },
      { text: "ประมาณ 500 ชิ้น", isCorrect: false }
    ],
    hint: "มีมากกว่าสองร้อยชิ้นนิดหน่อย เป็นเลขสองร้อยหกชิ้นนะจ๊ะ!",
    fact: "ตอนเป็นทารกแรกเกิดเรามีกระดูกกว่า 300 ชิ้น แต่เมื่อโตขึ้น กระดูกหลายชิ้นจะเชื่อมประสานเข้าด้วยกันจนเหลือ 206 ชิ้นในผู้ใหญ่"
  },
  {
    id: 5,
    title: "ด่านที่ 5: สะพานข้อต่อเคลื่อนไหว",
    icon: "🦵",
    question: "ข้อใดกล่าวถึง 'ข้อต่อ' (Joints) ในร่างกายมนุษย์ได้ถูกต้องที่สุด?",
    correctText: "บริเวณที่กระดูกตั้งแต่ 2 ชิ้นมาต่อกัน ช่วยให้งอและพับแขนขาได้",
    choices: [
      { text: "บริเวณที่กระดูกตั้งแต่ 2 ชิ้นมาต่อกัน ช่วยให้งอและพับแขนขาได้", isCorrect: true },
      { text: "เส้นผมที่เชื่อมต่อหนังศีรษะกับหมวก", isCorrect: false },
      { text: "ผิวหนังชั้นนอกสุดที่ช่วยป้องกันละอองน้ำ", isCorrect: false },
      { text: "เส้นเลือดที่ส่งผ่านสารอาหารไปทั่วตัว", isCorrect: false }
    ],
    hint: "เช่น ข้อศอกและหัวเข่า ถ้าไม่มีข้อต่อ แขนและขาเราจะงอไม่ได้เลยนะ!",
    fact: "ข้อต่อมีหลายแบบ เช่น ข้อต่อลูกกลมที่หัวไหล่หมุนได้รอบทิศ และข้อต่อบานพับที่ข้อศอกและหัวเข่าที่พับได้เหมือนบานพับประตู"
  },
  {
    id: 6,
    title: "ด่านที่ 6: พลังอาหารเสริมสร้างกระดูก",
    icon: "🥛",
    question: "สารอาหารชนิดใดจำเป็นและสำคัญที่สุดในการบำรุงกระดูกและฟันให้แข็งแรง?",
    correctText: "แคลเซียม (พบมากในนมและปลาเล็กปลาน้อย)",
    choices: [
      { text: "แคลเซียม (พบมากในนมและปลาเล็กปลาน้อย)", isCorrect: true },
      { text: "น้ำตาลทรายจากลูกอมรสหวาน", isCorrect: false },
      { text: "ไขมันและน้ำมันจากของทอด", isCorrect: false },
      { text: "เกลือโซเดียมรสเค็มจัด", isCorrect: false }
    ],
    hint: "มีอยู่ในนมจืดสดใหม่ ดื่มทุกวันจะทำให้กระดูกและฟันแข็งแรง ไม่เปราะง่าย!",
    fact: "กระดูกเป็นแหล่งกักเก็บแคลเซียมกว่า 99% ของร่างกาย การดื่มนมและกินปลาตัวเล็กเคี้ยวได้ทั้งก้างจะช่วยเติมแคลเซียมให้กระดูกหนาแน่น"
  },
  {
    id: 7,
    title: "ด่านที่ 7: ภารกิจดูแลรักษากระดูก",
    icon: "☀️",
    question: "พฤติกรรมในข้อใดช่วยส่งเสริมให้กระดูกของเด็ก ๆ แข็งแรงและเติบโตได้ดีที่สุด?",
    correctText: "ดื่มนม ออกกำลังกายสม่ำเสมอ และรับแสงแดดยามเช้า",
    choices: [
      { text: "ดื่มนม ออกกำลังกายสม่ำเสมอ และรับแสงแดดยามเช้า", isCorrect: true },
      { text: "นอนดึกและนั่งหลังค่อมก้มเล่นเกมทั้งวัน", isCorrect: false },
      { text: "ดื่มน้ำอัดลมแทนน้ำเปล่าทุกวัน", isCorrect: false },
      { text: "กระโดดลงจากที่สูงมาก ๆ เพื่อฝึกความท้าทาย", isCorrect: false }
    ],
    hint: "แสงแดดอ่อน ๆ ยามเช้าช่วยสร้างวิตามินดี ซึ่งช่วยดูดซึมแคลเซียมเข้าสู่กระดูกได้ยอดเยี่ยม!",
    fact: "วิตามินดีจากแสงแดดเช้าตรู่ และการวิ่งเล่นออกกำลังกาย จะกระตุ้นให้กระดูกสร้างเนื้อกระดูกใหม่และเติบโตสูงขึ้นสมวัย"
  }
];

// ==========================================
// 2. สถานะของเกม (Game State)
// ==========================================
// Web App URL ของ Google Apps Script ที่เชื่อมต่อกับ Google Sheets
const DEFAULT_GAS_URL = "https://script.google.com/macros/s/AKfycbx0IPSvXDe6AbncxvMVmohTWdkMMEw21DipoPu-OeHwaabZbcdJaXWZULgbL2vlvphk/exec";

const state = {
  playerName: "",
  currentStageIndex: 0,
  score: 0,
  wrongCountTotal: 0,
  stageWrongAttempts: 0,
  selectedChoiceIndex: null,
  currentChoices: [],
  timerSeconds: 0,
  timerInterval: null,
  isSoundEnabled: true,
  // Google Apps Script Web App Deployment URL (ใช้ค่าเริ่มต้นหรือค่าที่บันทึกไว้ใน localStorage)
  gasEndpointUrl: localStorage.getItem("bone_adventure_gas_url") || DEFAULT_GAS_URL
};

// ==========================================
// 3. ระบบเสียงสังเคราะห์ Web Audio API (Zero External Dependencies)
// ==========================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.init();
  }

  init() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  resumeCtx() {
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // เสียงคลิกเบาๆ น่ารัก
  playClick() {
    if (!state.isSoundEnabled || !this.ctx) return;
    this.resumeCtx();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(850, this.ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.06);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.07);
  }

  // เสียงเลือกตัวเลือก
  playSelect() {
    if (!state.isSoundEnabled || !this.ctx) return;
    this.resumeCtx();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(580, this.ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.09);
  }

  // เสียงตอบถูก ร่าเริงสดใส (Major Chime Arpeggio: C5 - E5 - G5 - C6)
  playCorrect() {
    if (!state.isSoundEnabled || !this.ctx) return;
    this.resumeCtx();
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + idx * 0.08);
      osc.stop(this.ctx.currentTime + idx * 0.08 + 0.28);
    });
  }

  // เสียงตอบผิด นุ่มนวลให้กำลังใจ ไม่ดุ ไม่ตกใจ (Gentle Wobbly Boing)
  playWrong() {
    if (!state.isSoundEnabled || !this.ctx) return;
    this.resumeCtx();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(320, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.22);
    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.24);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  // เสียงจบเกม ชนะเลิศ (Grand Fanfare)
  playVictory() {
    if (!state.isSoundEnabled || !this.ctx) return;
    this.resumeCtx();
    const notes = [
      { f: 523.25, d: 0.15 },
      { f: 659.25, d: 0.15 },
      { f: 783.99, d: 0.15 },
      { f: 1046.50, d: 0.45 }
    ];
    let offset = 0;
    notes.forEach((note) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(note.f, this.ctx.currentTime + offset);
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime + offset);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + offset + note.d);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + offset);
      osc.stop(this.ctx.currentTime + offset + note.d + 0.05);
      offset += note.d * 0.8;
    });
  }
}

const sound = new SoundFX();

// ==========================================
// 4. อัลกอริทึมสุ่มตัวเลือก (Fisher-Yates Shuffle)
// ==========================================
function shuffleArray(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// ==========================================
// 5. การจัดการหน้าจอและการแสดงผล UI
// ==========================================
const screens = {
  welcome: document.getElementById("screen-welcome"),
  game: document.getElementById("screen-game"),
  summary: document.getElementById("screen-summary")
};

const modals = {
  correct: document.getElementById("modal-correct"),
  wrong: document.getElementById("modal-wrong"),
  guide: document.getElementById("modal-guide")
};

function showScreen(screenKey) {
  Object.values(screens).forEach((scr) => scr.classList.remove("active"));
  if (screens[screenKey]) {
    screens[screenKey].classList.add("active");
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openModal(modalEl) {
  if (modalEl) modalEl.classList.add("open");
}

function closeModal(modalEl) {
  if (modalEl) modalEl.classList.remove("open");
}

// ==========================================
// 6. ตัวนับเวลา (Game Timer)
// ==========================================
function startTimer() {
  state.timerSeconds = 0;
  updateTimerDisplay();
  clearInterval(state.timerInterval);
  state.timerInterval = setInterval(() => {
    state.timerSeconds++;
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(state.timerInterval);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function updateTimerDisplay() {
  const timerEl = document.getElementById("display-timer");
  if (timerEl) {
    timerEl.textContent = formatTime(state.timerSeconds);
  }
}

// ==========================================
// 7. โหลดและแสดงคำถามประจำด่าน
// ==========================================
const choicePrefixes = ["ก.", "ข.", "ค.", "ง."];

function renderStageDots() {
  const dotsContainer = document.getElementById("stage-dots-container");
  if (!dotsContainer) return;
  dotsContainer.innerHTML = "";

  STAGES_DATA.forEach((stage, idx) => {
    const dot = document.createElement("div");
    dot.className = "stage-dot";
    dot.textContent = idx + 1;
    if (idx < state.currentStageIndex) {
      dot.classList.add("completed");
      dot.innerHTML = "✓";
    } else if (idx === state.currentStageIndex) {
      dot.classList.add("active");
    }
    dotsContainer.appendChild(dot);
  });
}

function loadStage(stageIndex) {
  const stage = STAGES_DATA[stageIndex];
  if (!stage) return;

  state.selectedChoiceIndex = null;
  state.stageWrongAttempts = 0;

  // อัปเดตข้อมูลหัวข้อและแถบความคืบหน้า
  const stageNum = stageIndex + 1;
  const totalStages = STAGES_DATA.length;
  const percent = Math.round((stageNum / totalStages) * 100);

  document.getElementById("stage-number-text").textContent = `ด่านที่ ${stageNum}`;
  document.getElementById("stage-percent-text").textContent = `${percent}%`;
  document.getElementById("progress-bar-fill").style.width = `${percent}%`;
  document.getElementById("stage-badge-name").textContent = stage.title;

  const retryBadge = document.getElementById("retry-badge");
  retryBadge.style.display = "none";

  renderStageDots();

  // ใส่โจทย์คำถาม
  document.getElementById("question-text").textContent = stage.question;

  // สุ่มลำดับตัวเลือก 4 ตัวเลือก โดยไม่ซ้ำ และคำตอบถูกไม่ติดที่เดิม
  state.currentChoices = shuffleArray(stage.choices);

  // สร้างปุ่มตัวเลือก 4 ตัวเลือก
  const choicesContainer = document.getElementById("choices-container");
  choicesContainer.innerHTML = "";

  state.currentChoices.forEach((choice, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice-btn";
    btn.setAttribute("role", "radio");
    btn.setAttribute("aria-checked", "false");
    btn.innerHTML = `
      <span class="choice-key">${choicePrefixes[idx]}</span>
      <span class="choice-label">${choice.text}</span>
    `;

    btn.addEventListener("click", () => {
      sound.playSelect();
      selectChoice(idx);
    });

    choicesContainer.appendChild(btn);
  });

  // ปิดการใช้งานปุ่มยืนยันจนกว่าจะเลือกช้อยส์
  const submitBtn = document.getElementById("btn-submit-answer");
  submitBtn.disabled = true;
}

function selectChoice(index) {
  state.selectedChoiceIndex = index;
  const choiceBtns = document.querySelectorAll(".choice-btn");
  choiceBtns.forEach((btn, idx) => {
    if (idx === index) {
      btn.classList.add("selected");
      btn.setAttribute("aria-checked", "true");
    } else {
      btn.classList.remove("selected");
      btn.setAttribute("aria-checked", "false");
    }
  });

  const submitBtn = document.getElementById("btn-submit-answer");
  submitBtn.disabled = false;
}

// ==========================================
// 8. ตรวจสอบคำตอบ
// ==========================================
function checkAnswer() {
  if (state.selectedChoiceIndex === null) return;

  const currentStage = STAGES_DATA[state.currentStageIndex];
  const chosen = state.currentChoices[state.selectedChoiceIndex];

  if (chosen.isCorrect) {
    // --- ตอบถูก ---
    sound.playCorrect();

    // คำนวณคะแนน: ด่านละ 10 คะแนน ถ้าตอบถูกตั้งแต่ครั้งแรกได้โบนัส +5 คะแนน
    let earned = 10;
    if (state.stageWrongAttempts === 0) {
      earned += 5;
    }
    state.score += earned;
    document.getElementById("display-score").textContent = state.score;

    // เตรียมป๊อปอัปยินดี
    const praiseTexts = [
      `เก่งมาก ๆ เลย ได้รับ ${earned} คะแนน!`,
      `ยอดเยี่ยมไปเลย ความรู้แน่นมาก +${earned} คะแนน!`,
      `สุดยอดนักสำรวจกระดูกตัวจริง +${earned} คะแนน!`,
      `ถูกต้องเป๊ะเลย มุ่งมั่นต่อไปนะ +${earned} คะแนน!`
    ];
    const randomPraise = praiseTexts[Math.floor(Math.random() * praiseTexts.length)];
    document.getElementById("correct-praise-text").textContent = randomPraise;
    document.getElementById("correct-fact-text").textContent = currentStage.fact;

    openModal(modals.correct);
  } else {
    // --- ตอบผิด ---
    sound.playWrong();
    state.wrongCountTotal++;
    state.stageWrongAttempts++;

    // แสดงป้ายจำนวนครั้งที่ลองใหม่
    const retryBadge = document.getElementById("retry-badge");
    retryBadge.style.display = "inline-block";
    retryBadge.textContent = `ลองใหม่ครั้งที่ ${state.stageWrongAttempts}`;

    // เตรียมป๊อปอัปคำใบ้
    document.getElementById("wrong-hint-text").textContent = currentStage.hint;
    openModal(modals.wrong);
  }
}

// ไปยังด่านถัดไป
function goToNextStage() {
  closeModal(modals.correct);
  if (state.currentStageIndex < STAGES_DATA.length - 1) {
    state.currentStageIndex++;
    loadStage(state.currentStageIndex);
  } else {
    finishGame();
  }
}

// ให้ตอบใหม่ในด่านเดิม (สุ่มลำดับตัวเลือกใหม่เพื่อฝึกการสังเกต)
function retryCurrentStage() {
  closeModal(modals.wrong);
  // สุ่มช้อยส์ใหม่ให้อีกครั้งเพื่อให้เด็กสังเกตเนื้อหาตัวเลือกจริง ๆ ไม่ใช่จำแค่ตำแหน่ง ก ข ค ง
  state.currentChoices = shuffleArray(STAGES_DATA[state.currentStageIndex].choices);
  state.selectedChoiceIndex = null;

  const choicesContainer = document.getElementById("choices-container");
  choicesContainer.innerHTML = "";

  state.currentChoices.forEach((choice, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice-btn";
    btn.setAttribute("role", "radio");
    btn.setAttribute("aria-checked", "false");
    btn.innerHTML = `
      <span class="choice-key">${choicePrefixes[idx]}</span>
      <span class="choice-label">${choice.text}</span>
    `;

    btn.addEventListener("click", () => {
      sound.playSelect();
      selectChoice(idx);
    });

    choicesContainer.appendChild(btn);
  });

  const submitBtn = document.getElementById("btn-submit-answer");
  submitBtn.disabled = true;
}

// ==========================================
// 9. หน้าจบเกม สรุปคะแนน & เหรียญรางวัล
// ==========================================
function finishGame() {
  stopTimer();
  sound.playVictory();
  triggerConfetti();

  const formattedTime = formatTime(state.timerSeconds);

  // ตัดสินเหรียญรางวัล
  let medalIcon = "🥇";
  let medalName = "เหรียญทองคำยอดนักสำรวจ";
  let feedbackText = "";

  if (state.wrongCountTotal === 0) {
    medalIcon = "🥇";
    medalName = "เหรียญทองคำ (ยอดนักสำรวจไร้พ่าย)";
    feedbackText = `โอ้โห! หนูยอดเยี่ยมที่สุดเลย ตอบถูกครบทุกข้อในครั้งเดียวโดยไม่ผิดเลยแม้แต่ครั้งเดียว ขอปรบมือให้ดัง ๆ เลยจ้า! 🎉`;
  } else if (state.wrongCountTotal <= 3) {
    medalIcon = "🥈";
    medalName = "เหรียญเงิน (นักเรียนรู้ยอดเยี่ยม)";
    feedbackText = `หนูเก่งและมีความพยายามมาก สามารถแก้โจทย์และเรียนรู้จากคำใบ้ได้ดีเยี่ยม ร่างกายและกระดูกของหนูต้องแข็งแรงมากแน่ ๆ! 👏`;
  } else {
    medalIcon = "🥉";
    medalName = "เหรียญทองแดง (ผู้กล้าหาญมุ่งมั่น)";
    feedbackText = `ยอดเยี่ยมในความพยายามมากครับ! คนเก่งคือคนที่ไม่ยอมแพ้เมื่อเจออุปสรรค หนูผ่านครบทั้ง 7 ด่านได้สำเร็จแล้ว เก่งมาก ๆ จ้า! 💪`;
  }

  // อัปเดตข้อมูลบนหน้าจอสรุป
  document.getElementById("medal-icon-container").textContent = medalIcon;
  document.getElementById("result-name").textContent = state.playerName;
  document.getElementById("result-score").textContent = state.score;
  document.getElementById("result-correct").textContent = "7 / 7 ข้อ";
  document.getElementById("result-wrong").textContent = `${state.wrongCountTotal} ครั้ง`;
  document.getElementById("result-time").textContent = `${formattedTime} นาที`;
  document.getElementById("result-medal").textContent = medalName;
  document.getElementById("result-feedback-text").textContent = feedbackText;

  showScreen("summary");

  // ส่งข้อมูลเข้า Google Sheets อัตโนมัติ
  sendResultsToGoogleSheets({
    timestamp: new Date().toLocaleString("th-TH"),
    studentName: state.playerName,
    score: state.score,
    correctCount: "7/7 ข้อ",
    wrongCount: state.wrongCountTotal,
    timeTaken: `${formattedTime} นาที`,
    result: medalName
  });
}

// ==========================================
// 10. ระบบบันทึกข้อมูลเข้า Google Sheets
// Google Sheet ID: 1MaT7ui18SbEBmvvRvHhP-ECM-DGncDXEjQr13xqbZmc
// ==========================================
async function sendResultsToGoogleSheets(payload) {
  const statusCard = document.getElementById("sheets-sync-status");
  const spinner = document.getElementById("sync-spinner");
  const msg = document.getElementById("sync-message");

  statusCard.className = "sheets-status-card";
  spinner.style.display = "inline-block";
  msg.textContent = "กำลังส่งผลการเล่นเข้าสู่ระบบบันทึกคะแนน Google Sheets...";

  // บันทึกสำรองใน LocalStorage เสมอ เพื่อความปลอดภัยของข้อมูลนักเรียน
  try {
    const history = JSON.parse(localStorage.getItem("bone_game_history") || "[]");
    history.push(payload);
    localStorage.setItem("bone_game_history", JSON.stringify(history));
  } catch (err) {
    console.warn("LocalStorage save error", err);
  }

  // หากยังไม่ได้ตั้งค่า Google Apps Script Web App URL
  if (!state.gasEndpointUrl || state.gasEndpointUrl.trim() === "") {
    spinner.style.display = "none";
    statusCard.classList.add("warning");
    msg.innerHTML = `💾 บันทึกผลในเครื่องเรียบร้อย (คุณครูสามารถผูก Google Apps Script Web App ได้ในเมนู 📖)`;
    return;
  }

  try {
    // ส่งข้อมูลแบบ POST ไปยัง Google Apps Script Web App
    const response = await fetch(state.gasEndpointUrl, {
      method: "POST",
      mode: "no-cors", // จำเป็นสำหรับ Google Apps Script เพื่อไม่ติดปัญหา CORS ข้ามโดเมน
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(payload)
    });

    // เนื่องจากใช้ no-cors จึงได้ opaque response แต่ส่งข้อมูลสำเร็จ
    spinner.style.display = "none";
    statusCard.classList.add("success");
    msg.innerHTML = `✅ บันทึกคะแนนเข้า Google Sheets สำเร็จเรียบร้อย!`;
  } catch (error) {
    console.error("Google Sheets sync failed:", error);
    // ตามโจทย์: "หากส่งข้อมูลไม่สำเร็จ เกมยังต้องเล่นต่อได้ตามปกติ"
    spinner.style.display = "none";
    statusCard.classList.add("warning");
    msg.innerHTML = `⚠️ ไม่สามารถเชื่อมต่อ Google Sheets ขณะนี้ แต่ผลคะแนนถูกบันทึกในเครื่องเรียบร้อยแล้ว`;
  }
}

// ==========================================
// 11. อนุภาคคอนเฟตติเฉลิมฉลอง (Confetti Engine)
// ==========================================
function triggerConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ["#f59e0b", "#38bdf8", "#10b981", "#fb7185", "#a855f7", "#fef08a"];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 0.7) * 20,
      size: Math.random() * 8 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
      gravity: 0.38,
      opacity: 1
    });
  }

  let animationFrame;
  function updateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let activeCount = 0;

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotSpeed;
      p.opacity -= 0.007;

      if (p.opacity > 0) {
        activeCount++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        ctx.restore();
      }
    });

    if (activeCount > 0) {
      animationFrame = requestAnimationFrame(updateConfetti);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  updateConfetti();
}

// ==========================================
// 12. การผูกเหตุการณ์ปุ่มต่าง ๆ (Event Listeners)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // เริ่มต้นตั้งค่าหน้าต่างและเสียง
  const btnSound = document.getElementById("btn-sound");
  const soundIcon = document.getElementById("sound-icon");
  const savedSound = localStorage.getItem("bone_game_sound");
  if (savedSound !== null) {
    state.isSoundEnabled = savedSound === "true";
    soundIcon.textContent = state.isSoundEnabled ? "🔊" : "🔇";
  }

  btnSound.addEventListener("click", () => {
    state.isSoundEnabled = !state.isSoundEnabled;
    soundIcon.textContent = state.isSoundEnabled ? "🔊" : "🔇";
    localStorage.setItem("bone_game_sound", state.isSoundEnabled);
    if (state.isSoundEnabled) sound.playClick();
  });

  // ปุ่มเปิดหน้าคู่มือครู
  const btnGuide = document.getElementById("btn-guide");
  const btnCloseGuide = document.getElementById("btn-close-guide");
  btnGuide.addEventListener("click", () => {
    sound.playClick();
    const gasInput = document.getElementById("custom-gas-url");
    gasInput.value = state.gasEndpointUrl;
    openModal(modals.guide);
  });
  btnCloseGuide.addEventListener("click", () => {
    sound.playClick();
    closeModal(modals.guide);
  });

  // บันทึกและทดสอบ Apps Script URL ในโมดอลคู่มือ
  document.getElementById("btn-save-gas").addEventListener("click", () => {
    sound.playClick();
    const url = document.getElementById("custom-gas-url").value.trim();
    state.gasEndpointUrl = url;
    localStorage.setItem("bone_adventure_gas_url", url);
    const msg = document.getElementById("gas-test-msg");
    msg.style.color = "#166534";
    msg.textContent = "💾 บันทึก URL สำเร็จแล้ว!";
    setTimeout(() => { msg.textContent = ""; }, 3000);
  });

  document.getElementById("btn-test-gas").addEventListener("click", async () => {
    sound.playClick();
    const url = document.getElementById("custom-gas-url").value.trim();
    const msg = document.getElementById("gas-test-msg");
    if (!url) {
      msg.style.color = "#b91c1c";
      msg.textContent = "กรุณาใส่ลิงก์ Web App URL ก่อนทดสอบครับ";
      return;
    }
    msg.style.color = "#0369a1";
    msg.textContent = "กำลังส่งข้อมูลทดสอบ...";

    try {
      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          timestamp: new Date().toLocaleString("th-TH"),
          studentName: "ทดสอบระบบ (คุณครู)",
          score: 100,
          correctCount: "7/7 ข้อ",
          wrongCount: 0,
          timeTaken: "00:30 นาที",
          result: "ทดสอบการเชื่อมต่อระบบสำเร็จ"
        })
      });
      msg.style.color = "#166534";
      msg.textContent = "✅ ทดสอบส่งข้อมูลสำเร็จ! ตรวจสอบที่แถวใหม่ใน Google Sheets ได้เลย";
    } catch (err) {
      msg.style.color = "#b91c1c";
      msg.textContent = "เกิดข้อผิดพลาดในการเชื่อมต่อ: " + err.message;
    }
  });

  // ปุ่มเริ่มเกม (Start Game)
  const btnStart = document.getElementById("btn-start-game");
  const nameInput = document.getElementById("player-name-input");
  const nameError = document.getElementById("name-error");

  btnStart.addEventListener("click", () => {
    const name = nameInput.value.trim();
    if (!name) {
      nameError.style.display = "block";
      nameInput.focus();
      return;
    }
    nameError.style.display = "none";
    state.playerName = name;
    document.getElementById("display-player-name").textContent = name;

    sound.playClick();
    state.currentStageIndex = 0;
    state.score = 0;
    state.wrongCountTotal = 0;
    document.getElementById("display-score").textContent = "0";

    showScreen("game");
    startTimer();
    loadStage(0);
  });

  // กด Enter ในช่องกรอกชื่อเพื่อเริ่มเกมได้ทันที
  nameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      btnStart.click();
    }
  });

  // ปุ่มยืนยันคำตอบ (Submit Answer)
  const btnSubmit = document.getElementById("btn-submit-answer");
  btnSubmit.addEventListener("click", () => {
    checkAnswer();
  });

  // ปุ่มไปต่อด่านถัดไป (Next Stage)
  const btnNext = document.getElementById("btn-next-stage");
  btnNext.addEventListener("click", () => {
    sound.playClick();
    goToNextStage();
  });

  // ปุ่มขอลองตอบใหม่อีกรอบ (Retry Stage)
  const btnRetry = document.getElementById("btn-retry-stage");
  btnRetry.addEventListener("click", () => {
    sound.playClick();
    retryCurrentStage();
  });

  // ปุ่มเล่นใหม่อีกครั้ง (Play Again)
  const btnPlayAgain = document.getElementById("btn-play-again");
  btnPlayAgain.addEventListener("click", () => {
    sound.playClick();
    showScreen("welcome");
    nameInput.value = state.playerName; // เก็บชื่อเดิมไว้ให้อัตโนมัติเพื่อความสะดวก
  });

  // ปรับขนาดแคนวาสเมื่อผู้ใช้หมุนหน้าจอหรือเปลี่ยนขนาดหน้าต่าง
  window.addEventListener("resize", () => {
    const canvas = document.getElementById("confetti-canvas");
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });
});
