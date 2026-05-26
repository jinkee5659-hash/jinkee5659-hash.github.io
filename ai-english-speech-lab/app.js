const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const defaultTopic = "AI can help students learn English";

const state = {
  topic: defaultTopic,
  level: "beginner",
  length: "short",
  focus: "speech",
  speech: [],
  words: [],
  sentenceIndex: 0,
  promptSize: 1.65,
  timerId: null,
  timerStart: 0,
  voices: [],
  selectedVoiceURI: "auto",
  speechRate: 0.92,
  speechTimers: [],
  stageMode: "Study",
  stageScore: 0,
  isSpeaking: false,
};

const stage3d = {
  renderer: null,
  scene: null,
  camera: null,
  clock: null,
  group: null,
  screen: null,
  teleprompter: null,
  wordPanels: [],
  equalizer: [],
  presenter: null,
  pulseRing: null,
  spotlight: null,
  targetCamera: null,
  pointerX: 0,
  pointerY: 0,
  active: false,
  textures: [],
};

const naturalVoicePatterns = [
  /google us english/i,
  /natural/i,
  /neural/i,
  /premium/i,
  /enhanced/i,
  /siri/i,
  /microsoft.*(aria|jenny|guy|davis|sara)/i,
  /google.*english/i,
  /samantha/i,
  /daniel/i,
  /karen/i,
  /moira/i,
  /serena/i,
  /ava/i,
  /allison/i,
  /victoria/i,
  /nicky/i,
  /aaron/i,
];

const stopWords = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "but",
  "by",
  "can",
  "for",
  "from",
  "has",
  "have",
  "help",
  "how",
  "i",
  "in",
  "is",
  "it",
  "my",
  "of",
  "on",
  "or",
  "our",
  "students",
  "that",
  "the",
  "their",
  "this",
  "to",
  "we",
  "with",
  "you",
]);

const dictionary = {
  ai: {
    term: "AI",
    cn: "人工智能",
    role: "noun",
    example: "AI can give learners fast feedback.",
  },
  artificial: {
    term: "artificial intelligence",
    cn: "人工智能",
    role: "noun phrase",
    example: "Artificial intelligence is changing how we learn.",
  },
  intelligence: {
    term: "intelligence",
    cn: "智能",
    role: "noun",
    example: "Human intelligence and machine intelligence can work together.",
  },
  prompt: {
    term: "prompt",
    cn: "提示词；提问指令",
    role: "noun / verb",
    example: "A clear prompt gives a better answer.",
  },
  engineering: {
    term: "engineering",
    cn: "工程；设计方法",
    role: "noun",
    example: "Prompt engineering helps people ask better questions.",
  },
  machine: {
    term: "machine learning",
    cn: "机器学习",
    role: "noun phrase",
    example: "Machine learning finds patterns in data.",
  },
  learning: {
    term: "learning",
    cn: "学习",
    role: "noun",
    example: "Learning becomes easier with daily practice.",
  },
  data: {
    term: "data",
    cn: "数据",
    role: "noun",
    example: "Good data helps AI make useful suggestions.",
  },
  model: {
    term: "model",
    cn: "模型",
    role: "noun",
    example: "A language model can write examples for practice.",
  },
  responsible: {
    term: "responsible",
    cn: "负责任的",
    role: "adjective",
    example: "Responsible AI should be fair and safe.",
  },
  creativity: {
    term: "creativity",
    cn: "创造力",
    role: "noun",
    example: "AI can support creativity, but people choose the final idea.",
  },
  creative: {
    term: "creative",
    cn: "有创造力的",
    role: "adjective",
    example: "A creative speaker uses clear stories.",
  },
  future: {
    term: "future",
    cn: "未来",
    role: "noun",
    example: "In the future, English and AI skills will both matter.",
  },
  job: {
    term: "job",
    cn: "工作",
    role: "noun",
    example: "My future job may use AI tools every day.",
  },
  english: {
    term: "English",
    cn: "英语",
    role: "noun",
    example: "English is a useful language for global communication.",
  },
  speech: {
    term: "speech",
    cn: "演讲",
    role: "noun",
    example: "A good speech has a clear beginning and ending.",
  },
  human: {
    term: "human",
    cn: "人类的；人",
    role: "adjective / noun",
    example: "Human judgment is still very important.",
  },
  work: {
    term: "work",
    cn: "工作；运作",
    role: "noun / verb",
    example: "AI changes the way people work.",
  },
  daily: {
    term: "daily",
    cn: "日常的",
    role: "adjective",
    example: "Daily speaking practice builds confidence.",
  },
  life: {
    term: "life",
    cn: "生活",
    role: "noun",
    example: "AI is already part of daily life.",
  },
};

const methodTemplates = [
  {
    title: "1. Understand",
    text: "先抓主题、关键词、句型功能，保证能用中文说清楚大意。",
  },
  {
    title: "2. Listen",
    text: "听完整演讲，再听单句；注意停顿、重音和连接词。",
  },
  {
    title: "3. Shadow",
    text: "跟读每一句，先慢速，再正常速度，录音比对关键词。",
  },
  {
    title: "4. Speak",
    text: "看提词器完成一次演讲，再逐步减少看稿次数。",
  },
];

const phraseNotes = [
  "开场：说明你今天要讲什么。",
  "观点：用 because 解释为什么重要。",
  "例子：用 for example 给听众具体画面。",
  "个人连接：说出它和自己的关系。",
  "未来展望：表达希望、计划或判断。",
  "结尾：礼貌收束，让演讲完整。",
];

function init() {
  bindEvents();
  initVoices();
  initStageScene();
  generateLearningPage();
  refreshIcons();
}

function bindEvents() {
  $("#generateBtn").addEventListener("click", generateLearningPage);
  $("#resetBtn").addEventListener("click", resetApp);
  $("#exportBtn").addEventListener("click", exportMarkdown);
  $("#listenSpeechBtn").addEventListener("click", () =>
    speak(state.speech.map((item) => item.text).join(" "), state.speechRate)
  );
  $("#listenSentenceBtn").addEventListener("click", () => speak(currentSentence().text, state.speechRate));
  $("#slowSentenceBtn").addEventListener("click", () =>
    speak(currentSentence().text, Math.max(0.62, state.speechRate - 0.18))
  );
  $("#nextSentenceBtn").addEventListener("click", nextSentence);
  $("#shuffleWordsBtn").addEventListener("click", shuffleWords);
  $("#checkQuizBtn").addEventListener("click", checkQuiz);
  $("#recordBtn").addEventListener("click", recordSpeech);
  $("#fontDownBtn").addEventListener("click", () => changePromptSize(-0.12));
  $("#fontUpBtn").addEventListener("click", () => changePromptSize(0.12));
  $("#startTimerBtn").addEventListener("click", startTimer);
  $("#stopSpeakBtn").addEventListener("click", stopSpeakingTools);
  $("#voiceSelect").addEventListener("change", (event) => {
    state.selectedVoiceURI = event.target.value;
  });
  $("#rateRange").addEventListener("input", (event) => {
    state.speechRate = Number(event.target.value) / 100;
    $("#rateValue").textContent = `${event.target.value}%`;
  });

  $$(".preset").forEach((button) => {
    button.addEventListener("click", () => {
      $("#topicInput").value = button.textContent.trim();
      generateLearningPage();
    });
  });

  $$(".segment").forEach((button) => {
    button.addEventListener("click", () => {
      $$(".segment").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      state.focus = button.dataset.focus;
      generateLearningPage();
    });
  });

  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => setTab(tab.dataset.tab));
  });
}

function initVoices() {
  if (!("speechSynthesis" in window)) return;

  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

function loadVoices() {
  state.voices = window.speechSynthesis
    .getVoices()
    .filter((voice) => /^en(-|_)?/i.test(voice.lang) || /english/i.test(voice.name))
    .sort((a, b) => voiceScore(b) - voiceScore(a));
  renderVoiceSelect();
}

function voiceScore(voice) {
  const name = `${voice.name} ${voice.lang}`;
  let score = 0;
  if (/^google us english$/i.test(voice.name) && /^en-US$/i.test(voice.lang)) score += 1000;
  if (/en-US/i.test(voice.lang)) score += 14;
  if (/en-GB/i.test(voice.lang)) score += 10;
  if (/en-AU|en-CA|en-IE|en-NZ|en-ZA/i.test(voice.lang)) score += 6;
  if (voice.localService) score += 3;
  naturalVoicePatterns.forEach((pattern, index) => {
    if (pattern.test(name)) score += Math.max(4, 22 - index);
  });
  return score;
}

function renderVoiceSelect() {
  const select = $("#voiceSelect");
  if (!select) return;

  const bestVoice = state.voices[0];
  const currentValue = select.value || state.selectedVoiceURI;
  const autoLabel = bestVoice ? `Auto · ${bestVoice.name}` : "Auto natural voice";
  select.innerHTML = `<option value="auto">${escapeHtml(autoLabel)}</option>`;

  state.voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.voiceURI;
    option.textContent = `${voice.name} · ${voice.lang}`;
    select.appendChild(option);
  });

  if (state.voices.some((voice) => voice.voiceURI === currentValue)) {
    select.value = currentValue;
    state.selectedVoiceURI = currentValue;
  } else {
    select.value = "auto";
    state.selectedVoiceURI = "auto";
  }
}

function initStageScene() {
  const canvas = $("#stageCanvas");
  const shell = $("#stageScene");
  if (!canvas || !shell) return;

  if (!window.THREE) {
    shell.classList.add("stage-fallback");
    return;
  }

  const THREE = window.THREE;
  stage3d.scene = new THREE.Scene();
  stage3d.scene.background = new THREE.Color(0x10191d);
  stage3d.scene.fog = new THREE.Fog(0x10191d, 10, 26);
  stage3d.camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
  stage3d.camera.position.set(0, 3.5, 10.5);
  stage3d.targetCamera = new THREE.Vector3(0, 3.5, 10.5);
  stage3d.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  stage3d.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  stage3d.renderer.outputEncoding = THREE.sRGBEncoding;
  stage3d.renderer.shadowMap.enabled = true;
  stage3d.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  stage3d.clock = new THREE.Clock();
  stage3d.group = new THREE.Group();
  stage3d.scene.add(stage3d.group);

  buildStageRoom();
  resizeStageScene();
  window.addEventListener("resize", resizeStageScene);
  shell.addEventListener("pointermove", (event) => {
    const rect = shell.getBoundingClientRect();
    stage3d.pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    stage3d.pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
  });
  stage3d.active = true;
  animateStageScene();
}

function buildStageRoom() {
  const THREE = window.THREE;
  const group = stage3d.group;
  const mat = (color, roughness = 0.74, metalness = 0.06) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness });

  const ambient = new THREE.HemisphereLight(0xd8fff6, 0x0b1114, 1.7);
  stage3d.scene.add(ambient);

  const key = new THREE.SpotLight(0xffffff, 2.6, 28, 0.42, 0.55, 1);
  key.position.set(0, 7.4, 5.8);
  key.target.position.set(0, 0.2, -1.4);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  stage3d.scene.add(key, key.target);
  stage3d.spotlight = key;

  const sideA = new THREE.PointLight(0x63d6c2, 1.8, 16);
  sideA.position.set(-5.8, 2.6, 0.3);
  const sideB = new THREE.PointLight(0xffc36d, 1.35, 14);
  sideB.position.set(5.2, 2.2, 1.2);
  stage3d.scene.add(sideA, sideB);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 15),
    new THREE.MeshStandardMaterial({ color: 0x17252a, roughness: 0.86, metalness: 0.08 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, -1.22, 0.4);
  floor.receiveShadow = true;
  group.add(floor);

  const grid = new THREE.GridHelper(18, 28, 0x2a4e4c, 0x203337);
  grid.position.y = -1.205;
  grid.material.transparent = true;
  grid.material.opacity = 0.35;
  group.add(grid);

  const backWall = new THREE.Mesh(new THREE.BoxGeometry(18, 7.2, 0.24), mat(0x122025, 0.82, 0.04));
  backWall.position.set(0, 2.2, -6.2);
  backWall.receiveShadow = true;
  group.add(backWall);

  const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.22, 6.8, 12), mat(0x101b20, 0.84, 0.03));
  leftWall.position.set(-8.9, 2.0, -0.3);
  leftWall.receiveShadow = true;
  group.add(leftWall);

  const rightWall = leftWall.clone();
  rightWall.position.x = 8.9;
  group.add(rightWall);

  const platform = new THREE.Mesh(new THREE.BoxGeometry(9.5, 0.42, 4.2), mat(0x22343a, 0.66, 0.12));
  platform.position.set(0, -0.98, -2.1);
  platform.castShadow = true;
  platform.receiveShadow = true;
  group.add(platform);

  const frame = new THREE.Mesh(new THREE.BoxGeometry(7.7, 3.95, 0.18), mat(0x0b1215, 0.5, 0.38));
  frame.position.set(0, 2.45, -5.92);
  group.add(frame);

  stage3d.screen = new THREE.Mesh(
    new THREE.PlaneGeometry(7.2, 3.4),
    new THREE.MeshBasicMaterial({ map: createStageTexture("AI English Speech Lab", "Immersive speech room", "STUDY") })
  );
  stage3d.screen.position.set(0, 2.45, -5.79);
  group.add(stage3d.screen);

  stage3d.teleprompter = new THREE.Mesh(
    new THREE.PlaneGeometry(3.4, 1.15),
    new THREE.MeshBasicMaterial({
      map: createPanelTexture("Ready", "Your current sentence appears here", "#112024", "#9ee0d2"),
      transparent: true,
    })
  );
  stage3d.teleprompter.position.set(0, 0.55, 0.3);
  stage3d.teleprompter.rotation.x = -0.28;
  group.add(stage3d.teleprompter);

  const podium = new THREE.Group();
  const podiumTop = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.25, 0.72), mat(0x31534e, 0.58, 0.22));
  podiumTop.position.y = 0.05;
  const podiumStem = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.48, 1.0, 28), mat(0x233d3d, 0.62, 0.18));
  podiumStem.position.y = -0.55;
  podium.add(podiumTop, podiumStem);
  podium.position.set(0, -0.1, -1.05);
  podium.traverse((item) => {
    if (item.isMesh) item.castShadow = true;
  });
  group.add(podium);

  stage3d.presenter = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.28, 0.9, 28), mat(0x4fa391, 0.42, 0.12));
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 20), mat(0xf0caa3, 0.5, 0.02));
  body.position.y = 0.08;
  head.position.y = 0.7;
  stage3d.presenter.add(body, head);
  stage3d.presenter.position.set(0, -0.55, -0.8);
  stage3d.presenter.traverse((item) => {
    if (item.isMesh) item.castShadow = true;
  });
  group.add(stage3d.presenter);

  const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x80f0d8, transparent: true, opacity: 0.34 });
  stage3d.pulseRing = new THREE.Mesh(new THREE.TorusGeometry(1.25, 0.012, 12, 96), ringMaterial);
  stage3d.pulseRing.rotation.x = Math.PI / 2;
  stage3d.pulseRing.position.set(0, -0.74, -0.95);
  group.add(stage3d.pulseRing);

  for (let i = 0; i < 18; i += 1) {
    const row = Math.floor(i / 6);
    const col = i % 6;
    const seat = new THREE.Mesh(new THREE.SphereGeometry(0.13, 18, 12), mat(0x263d42, 0.7, 0.05));
    seat.position.set((col - 2.5) * 1.05, -0.72, 2.1 + row * 0.82);
    seat.scale.y = 0.82;
    group.add(seat);
  }

  const panelPositions = [
    [-5.25, 1.65, -3.9, 0.24],
    [5.25, 1.65, -3.9, -0.24],
    [-5.65, 0.25, -1.35, 0.48],
    [5.65, 0.25, -1.35, -0.48],
  ];
  stage3d.wordPanels = panelPositions.map(([x, y, z, ry]) => {
    const panel = new THREE.Mesh(
      new THREE.PlaneGeometry(2.15, 0.9),
      new THREE.MeshBasicMaterial({ map: createPanelTexture("Keyword", "Practice", "#fff8eb", "#1f7a68") })
    );
    panel.position.set(x, y, z);
    panel.rotation.y = ry;
    group.add(panel);
    return panel;
  });

  for (let i = 0; i < 9; i += 1) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.45, 0.09), mat(0x72d8c3, 0.42, 0.22));
    bar.position.set((i - 4) * 0.14, -0.38, -0.38);
    bar.castShadow = true;
    stage3d.equalizer.push(bar);
    group.add(bar);
  }
}

function createStageTexture(title, line, mode) {
  const canvas = document.createElement("canvas");
  canvas.width = 1400;
  canvas.height = 660;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#11322f");
  gradient.addColorStop(0.55, "#16242b");
  gradient.addColorStop(1, "#32281b");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawCanvasGrid(ctx, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(153, 214, 200, 0.16)";
  ctx.fillRect(58, 58, canvas.width - 116, canvas.height - 116);
  ctx.strokeStyle = "rgba(255, 253, 248, 0.18)";
  ctx.lineWidth = 4;
  ctx.strokeRect(58, 58, canvas.width - 116, canvas.height - 116);
  ctx.fillStyle = "#99d6c8";
  ctx.font = "700 46px Inter, Arial, sans-serif";
  ctx.fillText(mode.toUpperCase(), 92, 128);
  ctx.fillStyle = "#fffdf8";
  ctx.font = "900 84px Inter, Arial, sans-serif";
  wrapCanvasText(ctx, title, 92, 245, 1180, 98, 2);
  ctx.fillStyle = "rgba(255, 253, 248, 0.74)";
  ctx.font = "500 38px Inter, Arial, sans-serif";
  wrapCanvasText(ctx, line, 92, 480, 1160, 48, 2);
  return makeCanvasTexture(canvas);
}

function createPanelTexture(title, line, bg = "#fff8eb", accent = "#1f7a68") {
  const canvas = document.createElement("canvas");
  canvas.width = 760;
  canvas.height = 320;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = accent;
  ctx.fillRect(0, 0, 18, canvas.height);
  ctx.fillStyle = "#172026";
  ctx.font = "900 54px Inter, Arial, sans-serif";
  wrapCanvasText(ctx, title, 54, 105, 640, 62, 2);
  ctx.fillStyle = "#66727a";
  ctx.font = "600 34px Inter, Arial, sans-serif";
  wrapCanvasText(ctx, line, 54, 230, 630, 42, 2);
  return makeCanvasTexture(canvas);
}

function makeCanvasTexture(canvas) {
  const THREE = window.THREE;
  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = Math.min(8, stage3d.renderer?.capabilities?.getMaxAnisotropy?.() || 1);
  texture.needsUpdate = true;
  stage3d.textures.push(texture);
  return texture;
}

function drawCanvasGrid(ctx, width, height) {
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.045)";
  ctx.lineWidth = 2;
  for (let x = 0; x < width; x += 80) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 80) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  ctx.restore();
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 3) {
  const words = String(text).split(/\s+/);
  let line = "";
  let lines = 0;
  for (let index = 0; index < words.length; index += 1) {
    const word = words[index];
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      if (lines >= maxLines - 1) {
        ctx.fillText(`${line}...`, x, y + lines * lineHeight);
        return;
      }
      ctx.fillText(line, x, y + lines * lineHeight);
      line = word;
      lines += 1;
      continue;
    }
    line = testLine;
    if (index === words.length - 1 && lines < maxLines) {
      ctx.fillText(line, x, y + lines * lineHeight);
      lines += 1;
    }
  }
}

function resizeStageScene() {
  if (!stage3d.renderer || !stage3d.camera) return;
  const canvas = $("#stageCanvas");
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(1, Math.floor(rect.width));
  const height = Math.max(1, Math.floor(rect.height));
  stage3d.renderer.setSize(width, height, false);
  stage3d.camera.aspect = width / height;
  stage3d.camera.updateProjectionMatrix();
}

function animateStageScene() {
  if (!stage3d.active || !stage3d.renderer || !stage3d.scene || !stage3d.camera) return;
  requestAnimationFrame(animateStageScene);
  resizeStageScene();
  const t = stage3d.clock.getElapsedTime();
  const target = stage3d.targetCamera || new window.THREE.Vector3(0, 3.5, 10.5);
  stage3d.camera.position.lerp(target, 0.04);
  stage3d.camera.position.x += (stage3d.pointerX * 0.16 - stage3d.camera.position.x * 0.002) * 0.04;
  stage3d.camera.lookAt(0, 1.0, -2.2);
  stage3d.group.rotation.y = stage3d.pointerX * 0.025;
  if (stage3d.presenter) stage3d.presenter.position.y = -0.55 + Math.sin(t * 2.2) * 0.025;
  if (stage3d.pulseRing) {
    const speakingBoost = state.isSpeaking ? 0.38 : 0.12;
    const scale = 1 + Math.sin(t * 3.4) * speakingBoost;
    stage3d.pulseRing.scale.setScalar(scale);
    stage3d.pulseRing.material.opacity = state.isSpeaking ? 0.42 : 0.2;
  }
  stage3d.equalizer.forEach((bar, index) => {
    const wave = state.isSpeaking ? Math.abs(Math.sin(t * 5 + index * 0.75)) : Math.abs(Math.sin(t * 1.4 + index)) * 0.2;
    bar.scale.y = 0.5 + wave * 2.6;
  });
  if (stage3d.spotlight) stage3d.spotlight.intensity = state.isSpeaking ? 3.4 : 2.45;
  stage3d.renderer.render(stage3d.scene, stage3d.camera);
}

function updateStageScene() {
  const sentence = currentSentence();
  $("#stageTopic").textContent = state.topic;
  $("#stageLine").textContent = sentence.text || "";
  $("#stageMode").textContent = state.stageMode;
  $("#stageProgress").textContent = `${Math.min(state.sentenceIndex + 1, state.speech.length || 1)} / ${state.speech.length || 1}`;
  $("#stageScore").textContent = `${state.stageScore}%`;

  if (!stage3d.renderer || !stage3d.screen) return;
  swapMeshTexture(stage3d.screen, createStageTexture(state.topic, sentence.text || "Ready to practice.", state.stageMode));
  swapMeshTexture(
    stage3d.teleprompter,
    createPanelTexture(`Line ${state.sentenceIndex + 1}`, sentence.text || "Ready", "#102024", "#99d6c8")
  );
  stage3d.wordPanels.forEach((panel, index) => {
    const word = state.words[index] || { term: "Practice", cn: "Speak aloud" };
    swapMeshTexture(panel, createPanelTexture(word.term, word.cn, "#fff8eb", index % 2 ? "#cf5b45" : "#1f7a68"));
  });
  setStageCameraForMode();
}

function swapMeshTexture(mesh, texture) {
  if (!mesh?.material) return;
  const previous = mesh.material.map;
  mesh.material.map = texture;
  mesh.material.needsUpdate = true;
  if (previous?.dispose) previous.dispose();
}

function setStageCameraForMode() {
  if (!window.THREE || !stage3d.targetCamera) return;
  const targets = {
    Study: [0, 3.45, 10.4],
    Practice: [1.1, 3.1, 8.7],
    Speak: [0, 2.65, 7.1],
    Listen: [-0.65, 3.0, 8.2],
  };
  const target = targets[state.stageMode] || targets.Study;
  stage3d.targetCamera.set(target[0], target[1], target[2]);
}

function generateLearningPage() {
  state.topic = cleanTopic($("#topicInput").value || defaultTopic);
  state.level = $("#levelSelect").value;
  state.length = $("#speechLength").value;
  state.words = buildWords(state.topic);
  state.speech = buildSpeech(state.topic, state.level, state.length, state.focus);
  state.sentenceIndex = 0;

  renderStudy();
  renderPractice();
  renderSpeak();
  updateStageScene();
  refreshIcons();
}

function cleanTopic(value) {
  const trimmed = value.replace(/\s+/g, " ").trim();
  return trimmed || defaultTopic;
}

function buildWords(topic) {
  const tokens = tokenize(topic);
  const found = [];
  const seenTerms = new Set();

  tokens.forEach((token) => {
    const key = token.toLowerCase();
    const entry = dictionary[key];
    if (entry && !seenTerms.has(entry.term.toLowerCase())) {
      found.push(entry);
      seenTerms.add(entry.term.toLowerCase());
    }
  });

  if (isAiTopic(topic) && !seenTerms.has("AI".toLowerCase())) {
    found.unshift(dictionary.ai);
    seenTerms.add("ai");
  }

  tokens
    .filter((token) => token.length > 3 && !stopWords.has(token.toLowerCase()))
    .slice(0, 5)
    .forEach((token) => {
      if (!seenTerms.has(token.toLowerCase())) {
        found.push({
          term: titleWord(token),
          cn: "主题关键词",
          role: "keyword",
          example: `${titleWord(token)} is useful in this topic.`,
        });
        seenTerms.add(token.toLowerCase());
      }
    });

  const supportWords = [
    {
      term: "confidence",
      cn: "自信",
      role: "noun",
      example: "Practice gives me confidence.",
    },
    {
      term: "improve",
      cn: "提升",
      role: "verb",
      example: "I can improve my English step by step.",
    },
    {
      term: "feedback",
      cn: "反馈",
      role: "noun",
      example: "Feedback helps me notice mistakes.",
    },
  ];

  supportWords.forEach((entry) => {
    if (found.length < 8 && !seenTerms.has(entry.term)) {
      found.push(entry);
      seenTerms.add(entry.term);
    }
  });

  return found.slice(0, 8);
}

function buildSpeech(topic, level, length, focus) {
  const topicPhrase = sentenceCase(topic);
  const ai = isAiTopic(topic);
  const coreBenefit = ai
    ? "it gives us examples, feedback, and new ways to practice"
    : "it connects with our study, work, and daily life";
  const personalLine =
    focus === "qa"
      ? "This topic also teaches me to ask better questions and answer with clearer logic."
      : focus === "vocab"
        ? "I want to remember the key words and use them in simple, natural sentences."
        : "I want to speak about this topic clearly, slowly, and with confidence.";

  const beginner = [
    makeLine(`Hello everyone. Today I want to talk about ${topicPhrase}.`, phraseNotes[0]),
    makeLine(`I think this topic is important because ${coreBenefit}.`, phraseNotes[1]),
    makeLine(
      ai
        ? "For example, an AI tool can explain a word, make a sentence, and correct my speaking."
        : "For example, one small idea can become a useful habit when we practice it every day.",
      phraseNotes[2]
    ),
    makeLine(personalLine, phraseNotes[3]),
    makeLine(
      "In the future, I hope to learn with smart tools, but I also want to keep my own thinking.",
      phraseNotes[4]
    ),
    makeLine("Thank you for listening.", phraseNotes[5]),
  ];

  const intermediate = [
    makeLine(`Good morning everyone. My topic today is ${topicPhrase}.`, phraseNotes[0]),
    makeLine(
      `This topic matters because it is not only a technology issue, but also a learning issue.`,
      phraseNotes[1]
    ),
    makeLine(
      ai
        ? "When learners use AI well, they can get instant examples, compare different answers, and notice their own weak points."
        : "When people practice it consistently, they can turn a big goal into small actions.",
      phraseNotes[2]
    ),
    makeLine(
      "However, we should not copy answers blindly. We need to ask clear questions, check the result, and speak in our own voice.",
      "转折：用 however 让观点更成熟。"
    ),
    makeLine(personalLine, phraseNotes[3]),
    makeLine(
      "My conclusion is simple: good tools can help us learn faster, but real progress still comes from active practice.",
      phraseNotes[5]
    ),
  ];

  const confident = [
    makeLine(`Imagine a classroom where every learner has a patient coach. That is why I want to discuss ${topicPhrase}.`, phraseNotes[0]),
    makeLine(
      ai
        ? "AI is powerful because it can personalize examples, give quick feedback, and help us practice without waiting."
        : "This idea is powerful because it changes how we build habits and solve problems.",
      phraseNotes[1]
    ),
    makeLine(
      "But power is not the same as wisdom. A useful tool still needs a responsible user.",
      "对比：power 和 wisdom 形成更有力量的表达。"
    ),
    makeLine(
      "For English learners like me, the best strategy is to use the tool for input, then turn that input into my own spoken output.",
      phraseNotes[3]
    ),
    makeLine(
      "If we keep curiosity, judgment, and daily practice together, technology can become a bridge instead of a shortcut.",
      phraseNotes[4]
    ),
    makeLine("That is my view. Thank you.", phraseNotes[5]),
  ];

  const selected = { beginner, intermediate, confident }[level] || beginner;

  if (length === "short") return selected.slice(0, level === "beginner" ? 5 : 4).concat(selected.slice(-1));
  if (length === "medium") return selected;

  return selected
    .slice(0, -1)
    .concat([
      makeLine(
        "A practical learning routine can be very simple: read one short paragraph, listen to it, repeat it aloud, and then make one new sentence.",
        "方法：把学习拆成可重复的小步骤。"
      ),
      makeLine(
        "This routine is small enough to do every day, but strong enough to build long-term confidence.",
        "升华：说明小练习为什么有价值。"
      ),
    ])
    .concat(selected.slice(-1));
}

function makeLine(text, note) {
  return { text, note };
}

function renderStudy() {
  $("#topicTitle").textContent = state.topic;
  $("#levelBadge").textContent = levelLabel(state.level);
  $("#methodStrip").innerHTML = methodTemplates
    .map((item) => `<div class="method-item"><strong>${item.title}</strong><span>${item.text}</span></div>`)
    .join("");
  $("#speechText").innerHTML = state.speech.map((item) => `<p>${highlightPhrases(item.text)}</p>`).join("");
  renderWords(state.words);
}

function renderWords(words) {
  $("#wordList").innerHTML = words
    .map(
      (word) => `
        <div class="word-card">
          <div>
            <strong>${escapeHtml(word.term)}</strong>
            <span>${escapeHtml(word.cn)} · ${escapeHtml(word.example)}</span>
          </div>
          <span class="tag">${escapeHtml(word.role)}</span>
        </div>
      `
    )
    .join("");
}

function renderPractice() {
  renderCurrentSentence();
  renderQuiz();
}

function renderCurrentSentence() {
  const sentence = currentSentence();
  $("#sentenceIndex").textContent = `${state.sentenceIndex + 1} / ${state.speech.length}`;
  $("#currentSentence").textContent = sentence.text;
  $("#sentenceNote").textContent = sentence.note;
  updateStageScene();
}

function renderQuiz() {
  const firstWord = state.words[0] || { term: "AI", cn: "人工智能" };
  const sentence = state.speech.find((item) =>
    item.text.toLowerCase().includes(firstWord.term.toLowerCase().split(" ")[0])
  ) || state.speech[0];
  const blanked = sentence.text.replace(new RegExp(firstWord.term.split(" ")[0], "i"), "_____");

  $("#quizBox").innerHTML = `
    <label class="quiz-question">
      <p>${escapeHtml(blanked)}</p>
      <input data-answer="${escapeHtml(firstWord.term.split(" ")[0])}" placeholder="word" />
    </label>
    <label class="quiz-question">
      <p>${escapeHtml(firstWord.cn)} 对应哪个关键词？</p>
      <input data-answer="${escapeHtml(firstWord.term)}" placeholder="keyword" />
    </label>
    <label class="quiz-question">
      <p>Write one opinion sentence about this topic.</p>
      <input data-answer="free" placeholder="I think..." />
    </label>
  `;
  $("#quizFeedback").textContent = "";
}

function renderSpeak() {
  $("#promptScreen").innerHTML = state.speech.map((item) => `<p>${escapeHtml(item.text)}</p>`).join("");
  $("#promptScreen").style.setProperty("--prompt-size", `${state.promptSize}rem`);
  $("#meterFill").style.width = "0%";
  $("#scoreText").textContent = "0%";
  $("#recognizedText").textContent = speechRecognitionSupportText();
}

function setTab(tabName) {
  state.stageMode = titleWord(tabName);
  $$(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === tabName));
  $$(".tab-panel").forEach((panel) =>
    panel.classList.toggle("active", panel.id === `${tabName}Panel`)
  );
  updateStageScene();
}

function nextSentence() {
  state.sentenceIndex = (state.sentenceIndex + 1) % state.speech.length;
  renderCurrentSentence();
}

function currentSentence() {
  return state.speech[state.sentenceIndex] || makeLine("", "");
}

function shuffleWords() {
  state.words = [...state.words].sort(() => Math.random() - 0.5);
  renderWords(state.words);
}

function checkQuiz() {
  const inputs = $$("#quizBox input");
  let score = 0;

  inputs.forEach((input) => {
    const answer = input.dataset.answer.toLowerCase();
    const value = input.value.trim().toLowerCase();
    const correct =
      answer === "free" ? value.split(/\s+/).filter(Boolean).length >= 4 : value.includes(answer);
    input.style.borderColor = correct ? "#1f7a68" : "#cf5b45";
    input.style.background = correct ? "#f1faf5" : "#fff1ed";
    if (correct) score += 1;
  });

  state.stageScore = Math.round((score / inputs.length) * 100);
  $("#quizFeedback").textContent = `Score: ${score} / ${inputs.length}`;
  updateStageScene();
}

function speak(text, rate = state.speechRate) {
  if (!("speechSynthesis" in window)) {
    $("#recognizedText").textContent = "当前浏览器不支持朗读。";
    return;
  }
  clearSpeechTimers();
  window.speechSynthesis.cancel();
  state.isSpeaking = true;
  state.stageMode = "Listen";
  updateStageScene();
  const chunks = splitSpeechText(text);
  speakChunks(chunks, rate, 0);
}

function speakChunks(chunks, rate, index) {
  if (index >= chunks.length) {
    state.isSpeaking = false;
    updateStageScene();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(chunks[index]);
  const voice = selectedVoice();
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  } else {
    utterance.lang = "en-US";
  }
  utterance.rate = rate;
  utterance.pitch = 1.03;
  utterance.volume = 1;
  utterance.onend = () => {
    const pause = chunks[index].length < 44 ? 120 : 230;
    const timer = window.setTimeout(() => speakChunks(chunks, rate, index + 1), pause);
    state.speechTimers.push(timer);
  };
  window.speechSynthesis.speak(utterance);
}

function selectedVoice() {
  if (state.selectedVoiceURI !== "auto") {
    return state.voices.find((voice) => voice.voiceURI === state.selectedVoiceURI) || null;
  }
  return state.voices[0] || null;
}

function splitSpeechText(text) {
  const chunks = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
  return chunks.map((chunk) => chunk.trim()).filter(Boolean);
}

function clearSpeechTimers() {
  state.speechTimers.forEach((timer) => window.clearTimeout(timer));
  state.speechTimers = [];
}

function recordSpeech() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    $("#recognizedText").textContent = "当前浏览器不支持语音识别；可以先用 Timer 完成自评。";
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  $("#recognizedText").textContent = "Listening...";
  state.stageMode = "Speak";
  updateStageScene();
  recognition.start();

  recognition.onresult = (event) => {
    const spoken = event.results[0][0].transcript;
    const target = currentSentence().text;
    const score = similarityScore(target, spoken);
    $("#recognizedText").textContent = spoken;
    $("#scoreText").textContent = `${score}%`;
    $("#meterFill").style.width = `${score}%`;
    state.stageScore = score;
    updateStageScene();
  };

  recognition.onerror = () => {
    $("#recognizedText").textContent = "语音识别没有成功，可以换 Chrome 或 Edge 再试。";
  };
}

function similarityScore(target, spoken) {
  const targetWords = normalizeForCompare(target);
  const spokenWords = normalizeForCompare(spoken);
  if (!targetWords.length || !spokenWords.length) return 0;

  const spokenSet = new Set(spokenWords);
  const matched = targetWords.filter((word) => spokenSet.has(word)).length;
  return Math.min(100, Math.round((matched / targetWords.length) * 100));
}

function normalizeForCompare(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1);
}

function changePromptSize(delta) {
  state.promptSize = Math.max(1.1, Math.min(2.4, state.promptSize + delta));
  $("#promptScreen").style.setProperty("--prompt-size", `${state.promptSize}rem`);
}

function startTimer() {
  clearInterval(state.timerId);
  state.timerStart = Date.now();
  $("#timerText").textContent = "00:00";
  state.timerId = setInterval(() => {
    const totalSeconds = Math.floor((Date.now() - state.timerStart) / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    $("#timerText").textContent = `${minutes}:${seconds}`;
  }, 250);
}

function stopSpeakingTools() {
  clearInterval(state.timerId);
  clearSpeechTimers();
  state.isSpeaking = false;
  window.speechSynthesis?.cancel();
  updateStageScene();
}

function resetApp() {
  $("#topicInput").value = defaultTopic;
  $("#levelSelect").value = "beginner";
  $("#speechLength").value = "short";
  $("#rateRange").value = "92";
  $("#rateValue").textContent = "92%";
  state.speechRate = 0.92;
  state.selectedVoiceURI = "auto";
  state.stageScore = 0;
  state.isSpeaking = false;
  renderVoiceSelect();
  $$(".segment").forEach((button) => {
    button.classList.toggle("active", button.dataset.focus === "speech");
  });
  state.focus = "speech";
  state.promptSize = 1.65;
  generateLearningPage();
}

function exportMarkdown() {
  const content = [
    `# ${state.topic}`,
    "",
    "## Speech",
    ...state.speech.map((item) => `- ${item.text}`),
    "",
    "## Keywords",
    ...state.words.map((word) => `- ${word.term}: ${word.cn} (${word.example})`),
    "",
    "## Practice Method",
    ...methodTemplates.map((item) => `- ${item.title}: ${item.text}`),
  ].join("\n");

  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${slugify(state.topic)}-english-practice.md`;
  link.click();
  URL.revokeObjectURL(url);
}

function tokenize(text) {
  return text.match(/[A-Za-z][A-Za-z-]*/g) || [];
}

function isAiTopic(topic) {
  return /\b(ai|artificial intelligence|machine learning|prompt|model|data)\b/i.test(topic);
}

function sentenceCase(text) {
  const trimmed = cleanTopic(text);
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function titleWord(word) {
  if (word.toLowerCase() === "ai") return "AI";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function levelLabel(level) {
  return {
    beginner: "Beginner",
    intermediate: "Intermediate",
    confident: "Confident",
  }[level];
}

function highlightPhrases(text) {
  const phrases = [
    "Today I want to talk about",
    "I think",
    "For example",
    "In the future",
    "My conclusion is simple",
    "Thank you",
    "However",
  ];
  let safe = escapeHtml(text);
  phrases.forEach((phrase) => {
    safe = safe.replace(
      new RegExp(escapeRegExp(phrase), "g"),
      `<span class="phrase">${escapeHtml(phrase)}</span>`
    );
  });
  return safe;
}

function speechRecognitionSupportText() {
  const supported = window.SpeechRecognition || window.webkitSpeechRecognition;
  return supported ? "Ready" : "Speech recognition is unavailable in this browser.";
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60) || "english-practice";
}

document.addEventListener("DOMContentLoaded", init);
