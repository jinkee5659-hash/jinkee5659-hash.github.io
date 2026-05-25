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
};

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
  generateLearningPage();
  refreshIcons();
}

function bindEvents() {
  $("#generateBtn").addEventListener("click", generateLearningPage);
  $("#resetBtn").addEventListener("click", resetApp);
  $("#exportBtn").addEventListener("click", exportMarkdown);
  $("#listenSpeechBtn").addEventListener("click", () =>
    speak(state.speech.map((item) => item.text).join(" "), 0.95)
  );
  $("#listenSentenceBtn").addEventListener("click", () => speak(currentSentence().text, 0.95));
  $("#slowSentenceBtn").addEventListener("click", () => speak(currentSentence().text, 0.72));
  $("#nextSentenceBtn").addEventListener("click", nextSentence);
  $("#shuffleWordsBtn").addEventListener("click", shuffleWords);
  $("#checkQuizBtn").addEventListener("click", checkQuiz);
  $("#recordBtn").addEventListener("click", recordSpeech);
  $("#fontDownBtn").addEventListener("click", () => changePromptSize(-0.12));
  $("#fontUpBtn").addEventListener("click", () => changePromptSize(0.12));
  $("#startTimerBtn").addEventListener("click", startTimer);
  $("#stopSpeakBtn").addEventListener("click", stopSpeakingTools);

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
  $$(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === tabName));
  $$(".tab-panel").forEach((panel) =>
    panel.classList.toggle("active", panel.id === `${tabName}Panel`)
  );
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

  $("#quizFeedback").textContent = `Score: ${score} / ${inputs.length}`;
}

function speak(text, rate = 1) {
  if (!("speechSynthesis" in window)) {
    $("#recognizedText").textContent = "当前浏览器不支持朗读。";
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = rate;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
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
  recognition.start();

  recognition.onresult = (event) => {
    const spoken = event.results[0][0].transcript;
    const target = currentSentence().text;
    const score = similarityScore(target, spoken);
    $("#recognizedText").textContent = spoken;
    $("#scoreText").textContent = `${score}%`;
    $("#meterFill").style.width = `${score}%`;
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
  window.speechSynthesis?.cancel();
}

function resetApp() {
  $("#topicInput").value = defaultTopic;
  $("#levelSelect").value = "beginner";
  $("#speechLength").value = "short";
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
