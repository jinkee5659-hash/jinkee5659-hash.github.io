const phraseBank = [
  "I would like a cup of coffee without sugar.",
  "Could you tell me where the nearest subway station is?",
  "I need to practice speaking clearly every single day.",
  "The weather is getting warmer, but the wind is still strong.",
  "Please send me the meeting notes before tomorrow morning.",
  "I am trying to improve my pronunciation and confidence.",
  "This project helps me notice the gap between my intention and my voice.",
  "Would you mind repeating that a little more slowly?",
  "I have been learning English for a long time.",
  "The restaurant is on the corner across from the library."
];

const els = {
  targetText: document.querySelector("#targetText"),
  randomBtn: document.querySelector("#randomBtn"),
  playBtn: document.querySelector("#playBtn"),
  recordBtn: document.querySelector("#recordBtn"),
  recordLabel: document.querySelector("#recordLabel"),
  heardText: document.querySelector("#heardText"),
  diffView: document.querySelector("#diffView"),
  scoreValue: document.querySelector("#scoreValue"),
  confidenceText: document.querySelector("#confidenceText"),
  wordCount: document.querySelector("#wordCount"),
  focusList: document.querySelector("#focusList"),
  historyList: document.querySelector("#historyList"),
  sessionCount: document.querySelector("#sessionCount"),
  avgScore: document.querySelector("#avgScore"),
  bestScore: document.querySelector("#bestScore"),
  streakDays: document.querySelector("#streakDays"),
  storageState: document.querySelector("#storageState"),
  supportNotice: document.querySelector("#supportNotice"),
  accentSelect: document.querySelector("#accentSelect"),
  rateInput: document.querySelector("#rateInput"),
  rateValue: document.querySelector("#rateValue"),
  clearBtn: document.querySelector("#clearBtn")
};

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const storageKey = "echofit-history-v1";
const settingsKey = "echofit-settings-v1";

let recognition = null;
let isRecording = false;
let history = loadJson(storageKey, []);
let settings = loadJson(settingsKey, { accent: "en-US", rate: 0.85 });

function loadJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function normalizeWords(text) {
  return text
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/-/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function compareWords(targetText, heardText) {
  const target = normalizeWords(targetText);
  const heard = normalizeWords(heardText);
  const rows = target.length + 1;
  const cols = heard.length + 1;
  const dp = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      dp[i][j] =
        target[i - 1] === heard[j - 1]
          ? dp[i - 1][j - 1] + 1
          : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  const tokens = [];
  let i = target.length;
  let j = heard.length;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && target[i - 1] === heard[j - 1]) {
      tokens.unshift({ word: target[i - 1], type: "correct" });
      i -= 1;
      j -= 1;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      tokens.unshift({ word: heard[j - 1], type: "extra" });
      j -= 1;
    } else if (i > 0) {
      tokens.unshift({ word: target[i - 1], type: "missing" });
      i -= 1;
    }
  }

  const correct = tokens.filter((token) => token.type === "correct").length;
  const missing = tokens.filter((token) => token.type === "missing").length;
  const extra = tokens.filter((token) => token.type === "extra").length;
  const denominator = Math.max(target.length + extra * 0.55, 1);
  const score = Math.max(0, Math.round((correct / denominator) * 100 - missing * 2));

  return { tokens, score, target, heard };
}

function renderDiff(tokens) {
  els.diffView.replaceChildren();
  if (!tokens.length) {
    const empty = document.createElement("span");
    empty.className = "token";
    empty.textContent = "等待结果";
    els.diffView.append(empty);
    return;
  }

  for (const token of tokens) {
    const node = document.createElement("span");
    node.className = `token ${token.type}`;
    node.textContent = token.type === "extra" ? `+ ${token.word}` : token.word;
    els.diffView.append(node);
  }
}

function renderFocus(lastComparison) {
  const counts = new Map();
  history.forEach((item) => {
    item.missed.forEach((word) => counts.set(word, (counts.get(word) || 0) + 1));
  });

  if (lastComparison) {
    lastComparison.tokens
      .filter((token) => token.type === "missing")
      .forEach((token) => counts.set(token.word, (counts.get(token.word) || 0) + 1));
  }

  const items = [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 5);

  els.focusList.replaceChildren();
  if (!items.length) {
    const li = document.createElement("li");
    li.textContent = "完成一次录音后生成";
    els.focusList.append(li);
    return;
  }

  for (const [word, count] of items) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${word}</strong> <span>${count}x</span>`;
    els.focusList.append(li);
  }
}

function renderHistory() {
  const recent = history.slice(0, 6);
  els.historyList.replaceChildren();

  if (!recent.length) {
    const empty = document.createElement("article");
    empty.className = "history-item";
    empty.innerHTML = "<strong>还没有记录</strong><p>第一条会自动保存在这里。</p>";
    els.historyList.append(empty);
  }

  for (const item of recent) {
    const article = document.createElement("article");
    article.className = "history-item";
    article.innerHTML = `
      <span class="history-score">${item.score}</span>
      <strong>${escapeHtml(item.target)}</strong>
      <p>${escapeHtml(item.heard || "No transcript")}</p>
    `;
    els.historyList.append(article);
  }

  const scores = history.map((item) => item.score);
  const avg = scores.length ? Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length) : "--";
  const best = scores.length ? Math.max(...scores) : "--";

  els.sessionCount.textContent = String(history.length);
  els.avgScore.textContent = String(avg);
  els.bestScore.textContent = String(best);
  els.streakDays.textContent = String(calculateStreak(history));
}

function calculateStreak(items) {
  const dates = new Set(items.map((item) => new Date(item.createdAt).toDateString()));
  let streak = 0;
  const cursor = new Date();

  while (dates.has(cursor.toDateString())) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (char) => {
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return map[char];
  });
}

function saveAttempt(target, heard, confidence, comparison) {
  const missed = comparison.tokens
    .filter((token) => token.type === "missing")
    .map((token) => token.word);

  history.unshift({
    target,
    heard,
    confidence,
    score: comparison.score,
    missed,
    createdAt: new Date().toISOString()
  });

  history = history.slice(0, 80);
  saveJson(storageKey, history);
  renderHistory();
  renderFocus(comparison);
}

function updateComparison(heard, confidence = null) {
  const target = els.targetText.value.trim();
  const comparison = compareWords(target, heard);
  const confidencePercent = confidence == null ? "--" : `${Math.round(confidence * 100)}%`;

  els.heardText.textContent = heard || "没有识别到内容";
  els.scoreValue.textContent = String(comparison.score);
  els.confidenceText.textContent = confidencePercent;
  els.wordCount.textContent = `${comparison.target.length} words`;
  renderDiff(comparison.tokens);
  saveAttempt(target, heard, confidence, comparison);
}

function setupRecognition() {
  if (!SpeechRecognition) {
    els.supportNotice.hidden = false;
    els.supportNotice.textContent = "当前浏览器不支持语音识别，请换 Chrome、Edge 或 Safari。";
    els.recordBtn.disabled = true;
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = settings.accent;
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    isRecording = true;
    els.recordBtn.classList.add("is-recording");
    els.recordLabel.textContent = "正在听";
  };

  recognition.onend = () => {
    isRecording = false;
    els.recordBtn.classList.remove("is-recording");
    els.recordLabel.textContent = "开始说";
  };

  recognition.onerror = (event) => {
    els.supportNotice.hidden = false;
    els.supportNotice.textContent =
      event.error === "not-allowed" ? "麦克风权限被拒绝。" : `识别中断：${event.error}`;
  };

  recognition.onresult = (event) => {
    let transcript = "";
    let confidence = null;

    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      transcript += event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        confidence = event.results[i][0].confidence;
      }
    }

    els.heardText.textContent = transcript.trim() || "正在听";

    const lastResult = event.results[event.results.length - 1];
    if (lastResult?.isFinal) {
      updateComparison(transcript.trim(), confidence);
    }
  };
}

function speakTarget() {
  const text = els.targetText.value.trim();
  if (!text || !window.speechSynthesis) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = settings.accent;
  utterance.rate = Number(settings.rate);
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function pickRandomPhrase() {
  const current = els.targetText.value.trim();
  const candidates = phraseBank.filter((phrase) => phrase !== current);
  const next = candidates[Math.floor(Math.random() * candidates.length)] || phraseBank[0];
  els.targetText.value = next;
  renderDiff([]);
  els.heardText.textContent = "等待第一次录音";
  els.scoreValue.textContent = "--";
  els.wordCount.textContent = `${normalizeWords(next).length} words`;
}

function bindEvents() {
  els.recordBtn.addEventListener("click", () => {
    if (!recognition) return;
    els.supportNotice.hidden = true;

    if (isRecording) {
      recognition.stop();
      return;
    }

    recognition.lang = settings.accent;
    recognition.start();
  });

  els.playBtn.addEventListener("click", speakTarget);
  els.randomBtn.addEventListener("click", pickRandomPhrase);
  els.targetText.addEventListener("input", () => {
    els.wordCount.textContent = `${normalizeWords(els.targetText.value).length} words`;
  });

  els.accentSelect.addEventListener("change", () => {
    settings.accent = els.accentSelect.value;
    saveJson(settingsKey, settings);
    if (recognition) recognition.lang = settings.accent;
  });

  els.rateInput.addEventListener("input", () => {
    settings.rate = Number(els.rateInput.value);
    els.rateValue.textContent = settings.rate.toFixed(2);
    saveJson(settingsKey, settings);
  });

  els.clearBtn.addEventListener("click", () => {
    history = [];
    saveJson(storageKey, history);
    renderHistory();
    renderFocus();
  });
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").catch(() => {
      els.storageState.textContent = "online";
    });
  }
}

function init() {
  els.targetText.value = phraseBank[0];
  els.accentSelect.value = settings.accent;
  els.rateInput.value = settings.rate;
  els.rateValue.textContent = Number(settings.rate).toFixed(2);
  els.wordCount.textContent = `${normalizeWords(els.targetText.value).length} words`;

  renderDiff([]);
  renderHistory();
  renderFocus();
  setupRecognition();
  bindEvents();
  registerServiceWorker();
}

init();
