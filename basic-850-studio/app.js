const concepts = [
  {
    id: "atlas",
    number: "方案 01",
    title: "词汇星图",
    subtitle: "从一个词出发，扩展到搭配、近义替换、句型和场景。",
    summary:
      "适合把 850 词做成一张可探索的知识地图。学习者点一个词，就能看到中文义项、常见搭配、Basic English 风格例句、可替换表达和相关对话。",
    tag: "Atlas",
    fit: 94,
    bestFor: "系统梳理",
    modules: [
      ["01", "词类地图", "按 Operations、Things、Qualities 等分区浏览，并标出掌握度。"],
      ["02", "深度词卡", "每个词包含核心义、搭配、反义/相邻词、三层例句。"],
      ["03", "联想路径", "把 come into、come from、come with 这类结构词组合串起来。"],
      ["04", "复习队列", "根据错词、停留时长、造句失败次数自动排队。"]
    ],
    recommendation:
      "如果你想把 850 个词真正吃透，我会优先做这个方向作为底座，再把对话和造句训练挂上去。"
  },
  {
    id: "dialogue",
    number: "方案 02",
    title: "情景对话片场",
    subtitle: "用 850 词完成真实生活里的小对话。",
    summary:
      "适合口语训练。每一课都是一个短场景：问路、买咖啡、解释问题、表达意见。系统限制只能用 Basic 850 词，让学习者练出简单但自然的表达。",
    tag: "Dialogue",
    fit: 91,
    bestFor: "口语输出",
    modules: [
      ["01", "场景剧本", "每个场景给角色、目标、冲突和必须使用的词。"],
      ["02", "轮次对话", "用户每回合输入或录音，系统给下一句推进。"],
      ["03", "表达改写", "把复杂句改成 Basic 850 可表达的版本。"],
      ["04", "口语回放", "保存原句、识别文本和建议版本，方便二次跟读。"]
    ],
    recommendation:
      "如果你的目标是敢开口、能对话，这个方向最有成就感。它可以和浏览器语音识别做得很轻。"
  },
  {
    id: "gym",
    number: "方案 03",
    title: "造句健身房",
    subtitle: "把单词练成肌肉记忆：短句、扩句、改写、限词挑战。",
    summary:
      "适合深度造句。系统每天挑一组词，让你按句型骨架练习：主谓宾、原因、让步、对比、时间线，再逐步增加信息量。",
    tag: "Sentence Gym",
    fit: 96,
    bestFor: "造句能力",
    modules: [
      ["01", "句型器械", "按 I have、there is、because、if、though 等结构练。"],
      ["02", "三段扩句", "从 6 词短句扩到 12 词，再扩到 20 词。"],
      ["03", "限词挑战", "只能使用给定 Basic 850 词，训练简单表达复杂意思。"],
      ["04", "错因标签", "标记缺主语、词序、介词、时态、过度复杂等问题。"]
    ],
    recommendation:
      "如果你说的深度学习重点是“会用这些词造很多好句子”，我最推荐这个做第一版 MVP。"
  },
  {
    id: "mission",
    number: "方案 04",
    title: "30 天任务系统",
    subtitle: "每天一组词、一组句、一段对话、一张复盘卡。",
    summary:
      "适合长期坚持。它不像工具，更像训练计划：把 850 词切成 30 到 60 个主题包，每天自动安排输入、输出、听说和复盘。",
    tag: "Mission",
    fit: 88,
    bestFor: "持续学习",
    modules: [
      ["01", "每日任务", "10 个词、5 个句型、1 段对话、1 个输出题。"],
      ["02", "掌握曲线", "用颜色显示熟词、半熟词、危险词和休眠词。"],
      ["03", "主题包", "按生活、工作、旅行、观点表达等组织 850 词。"],
      ["04", "周复盘", "自动生成本周常错词、最好句子和下周建议。"]
    ],
    recommendation:
      "如果你担心坚持不下来，这个方案最好。它能把学习压力变成每天可完成的小闭环。"
  },
  {
    id: "coach",
    number: "方案 05",
    title: "AI 私教批改台",
    subtitle: "围绕一个输出目标，给词汇、句子、对话和发音反馈。",
    summary:
      "适合高反馈训练。用户写一句或说一段，系统从 850 词覆盖率、表达自然度、句子复杂度、口语清晰度四个维度给建议。",
    tag: "Coach",
    fit: 90,
    bestFor: "反馈纠错",
    modules: [
      ["01", "输出检测", "检查是否用了目标词，是否能用 Basic 850 改写。"],
      ["02", "替换建议", "把高级词换成 850 内更基础的表达。"],
      ["03", "对话教练", "根据你的回答继续追问，逼出更多输出。"],
      ["04", "成长档案", "记录常错结构、表达偏好和可复用好句。"]
    ],
    recommendation:
      "这个最像真正的老师，但开发上需要接 AI 接口。可以放到第二阶段，在本地原型稳定后接入。"
  }
];

const wordGroups = [
  {
    id: "operations",
    label: "动作结构",
    count: 100,
    words: [
      word("come", "来；出现；变成", ["come from", "come into", "come with"], [
        ["I come from a small city.", "我来自一个小城市。"],
        ["The answer will come with time.", "答案会随时间出现。"]
      ]),
      word("get", "得到；变得；到达", ["get a letter", "get better", "get to"], [
        ["I get better when I practise every day.", "我每天练习就会变得更好。"],
        ["Can you get to the station before six?", "你能六点前到车站吗？"]
      ]),
      word("give", "给；提供；表达", ["give help", "give a reason", "give it to"], [
        ["Please give me a clear reason.", "请给我一个清楚的理由。"],
        ["This lesson gives me more confidence.", "这节课给了我更多信心。"]
      ]),
      word("make", "做；制造；使得", ["make a plan", "make it clear", "make me feel"], [
        ["I will make a simple plan for today.", "我会为今天做一个简单计划。"],
        ["Your example makes the idea clear.", "你的例子让这个想法清楚了。"]
      ]),
      word("take", "拿；花费；接受", ["take time", "take a seat", "take care"], [
        ["Good English takes time and attention.", "好的英语需要时间和注意力。"],
        ["Please take a seat near the window.", "请坐在窗边。"]
      ]),
      word("put", "放；表达", ["put it on", "put into words", "put together"], [
        ["Try to put the idea into simple words.", "试着用简单词表达这个想法。"],
        ["Put these words together and make a sentence.", "把这些词放在一起造句。"]
      ]),
      word("seem", "似乎；看起来", ["seem ready", "seem important", "seem to be"], [
        ["This word seems simple, but it is useful.", "这个词看似简单，但很有用。"],
        ["You seem ready for a longer talk.", "你似乎准备好进行更长的对话了。"]
      ]),
      word("say", "说；表达", ["say yes", "say that", "say it again"], [
        ["Say it again, but more slowly.", "再说一遍，但慢一点。"],
        ["I want to say that I need more time.", "我想说我需要更多时间。"]
      ]),
      word("through", "穿过；通过；从头到尾", ["go through", "look through", "through the day"], [
        ["We went through the list together.", "我们一起过了一遍清单。"],
        ["I learned three new words through this talk.", "我通过这次谈话学了三个新词。"]
      ]),
      word("because", "因为", ["because of", "because I", "because there is"], [
        ["I stayed home because the weather was bad.", "我待在家，因为天气不好。"],
        ["Because of your help, the work is easier.", "因为你的帮助，工作更容易了。"]
      ]),
      word("though", "虽然；尽管", ["though I", "even though", "though it is"], [
        ["Though the sentence is short, it is strong.", "虽然句子短，但很有力。"],
        ["I can answer, though I need a little time.", "我能回答，虽然需要一点时间。"]
      ]),
      word("where", "哪里；在什么地方", ["where is", "where I live", "where to"], [
        ["Where is the nearest library?", "最近的图书馆在哪里？"],
        ["Tell me where to put the bag.", "告诉我把包放在哪里。"]
      ])
    ]
  },
  {
    id: "things",
    label: "普通名词",
    count: 400,
    words: [
      word("account", "账户；说明；叙述", ["give an account", "bank account", "account of"], [
        ["Give me a clear account of the event.", "请清楚说明这件事。"],
        ["I opened a new account yesterday.", "我昨天开了一个新账户。"]
      ]),
      word("attention", "注意；关注", ["pay attention", "close attention", "attention to"], [
        ["Pay attention to the sound of each word.", "注意每个词的声音。"],
        ["This problem needs your attention.", "这个问题需要你的关注。"]
      ]),
      word("business", "生意；事务；工作", ["small business", "business meeting", "do business"], [
        ["The business meeting starts at nine.", "商务会议九点开始。"],
        ["Learning English is part of my daily business.", "学英语是我日常事务的一部分。"]
      ]),
      word("change", "变化；改变；零钱", ["make a change", "big change", "change in"], [
        ["A small change can make the sentence better.", "一个小改变能让句子更好。"],
        ["There was a sudden change in the weather.", "天气突然变了。"]
      ]),
      word("condition", "条件；状况", ["living condition", "under one condition", "good condition"], [
        ["I will agree under one condition.", "我会同意，但有一个条件。"],
        ["The machine is still in good condition.", "机器仍然状况良好。"]
      ]),
      word("development", "发展；进展", ["personal development", "new development", "development of"], [
        ["Language development comes from daily use.", "语言进步来自日常使用。"],
        ["This is an important development in the project.", "这是项目中的重要进展。"]
      ]),
      word("education", "教育", ["school education", "public education", "education system"], [
        ["Good education gives people more choices.", "好的教育给人更多选择。"],
        ["This app is for English education.", "这个应用用于英语学习。"]
      ]),
      word("experience", "经验；经历", ["work experience", "learning experience", "from experience"], [
        ["Speaking gives me real experience.", "开口说给我真实经验。"],
        ["From experience, short practice is better every day.", "根据经验，每天短练更好。"]
      ]),
      word("friend", "朋友", ["old friend", "good friend", "friend of mine"], [
        ["A good friend can practise with you.", "好朋友可以和你一起练。"],
        ["She is a friend of mine from school.", "她是我学校里的朋友。"]
      ]),
      word("language", "语言", ["simple language", "body language", "language learning"], [
        ["Use simple language to explain the idea.", "用简单语言解释这个想法。"],
        ["Language learning needs time.", "语言学习需要时间。"]
      ]),
      word("meeting", "会议；见面", ["morning meeting", "meeting room", "have a meeting"], [
        ["The morning meeting was short but useful.", "早会很短但有用。"],
        ["We have a meeting after lunch.", "午饭后我们开会。"]
      ]),
      word("reason", "原因；理由", ["main reason", "reason for", "good reason"], [
        ["Tell me the main reason for your decision.", "告诉我你决定的主要原因。"],
        ["There is a good reason to practise today.", "今天练习有充分理由。"]
      ])
    ]
  },
  {
    id: "pictures",
    label: "图示名词",
    count: 200,
    words: [
      word("apple", "苹果", ["red apple", "apple on the table", "an apple a day"], [
        ["There is a red apple on the table.", "桌上有一个红苹果。"],
        ["The child gave an apple to his sister.", "孩子给了妹妹一个苹果。"]
      ]),
      word("book", "书", ["open book", "English book", "book on"], [
        ["Open the book and read the first line.", "打开书读第一行。"],
        ["This English book has simple words.", "这本英语书有简单词。"]
      ]),
      word("bridge", "桥", ["stone bridge", "bridge over", "cross the bridge"], [
        ["We crossed the bridge before dark.", "天黑前我们过了桥。"],
        ["The bridge over the river is old.", "河上的桥很旧。"]
      ]),
      word("camera", "相机", ["small camera", "camera bag", "with a camera"], [
        ["She took a picture with a small camera.", "她用小相机拍了一张照片。"],
        ["Put the camera in the bag.", "把相机放进包里。"]
      ]),
      word("garden", "花园", ["front garden", "garden wall", "in the garden"], [
        ["The children are playing in the garden.", "孩子们在花园里玩。"],
        ["There is a stone wall around the garden.", "花园周围有石墙。"]
      ]),
      word("house", "房子；家", ["small house", "house near", "go home"], [
        ["Their house is near the school.", "他们家在学校附近。"],
        ["A small house can still be warm.", "小房子也可以很温暖。"]
      ]),
      word("train", "火车；训练", ["train station", "take a train", "train every day"], [
        ["I will take a train to the city.", "我会坐火车去城里。"],
        ["We train every day for better speaking.", "我们每天训练以提升口语。"]
      ]),
      word("window", "窗户", ["open window", "window seat", "near the window"], [
        ["Please open the window a little.", "请把窗户打开一点。"],
        ["I like the seat near the window.", "我喜欢靠窗的座位。"]
      ])
    ]
  },
  {
    id: "qualities",
    label: "普通形容",
    count: 100,
    words: [
      word("able", "能够的；有能力的", ["be able to", "able person", "able student"], [
        ["I am able to answer in simple English.", "我能用简单英语回答。"],
        ["An able student asks clear questions.", "有能力的学生会问清楚的问题。"]
      ]),
      word("clear", "清楚的；晴朗的", ["clear idea", "clear voice", "make clear"], [
        ["Please speak in a clear voice.", "请用清楚的声音说。"],
        ["A clear idea is easier to remember.", "清楚的想法更容易记住。"]
      ]),
      word("common", "常见的；共同的", ["common word", "common problem", "common use"], [
        ["This is a common word in daily English.", "这是日常英语中的常见词。"],
        ["A common problem is speaking too fast.", "一个常见问题是说得太快。"]
      ]),
      word("important", "重要的", ["important point", "important for", "important change"], [
        ["It is important to use the word in a sentence.", "把词用进句子很重要。"],
        ["This point is important for your answer.", "这一点对你的回答很重要。"]
      ]),
      word("natural", "自然的；天然的", ["natural sound", "natural way", "natural world"], [
        ["Try to speak in a natural way.", "试着自然地说。"],
        ["The sentence sounds more natural now.", "这个句子现在听起来更自然。"]
      ]),
      word("possible", "可能的", ["possible answer", "if possible", "possible problem"], [
        ["Give me one possible answer.", "给我一个可能的答案。"],
        ["If possible, practise with a friend.", "如果可能，和朋友一起练。"]
      ]),
      word("quick", "快的；迅速的", ["quick answer", "quick look", "quick change"], [
        ["Give me a quick answer first.", "先给我一个快速回答。"],
        ["Take a quick look at the word list.", "快速看一下词表。"]
      ]),
      word("strong", "强的；有力的", ["strong reason", "strong voice", "strong wind"], [
        ["Use a strong voice when you speak.", "说话时用有力的声音。"],
        ["There is a strong reason for daily practice.", "每日练习有很强的理由。"]
      ])
    ]
  },
  {
    id: "opposites",
    label: "反义形容",
    count: 50,
    words: [
      word("awake", "醒着的", ["stay awake", "fully awake", "awake at night"], [
        ["I stayed awake to finish the lesson.", "我保持清醒完成课程。"],
        ["Are you fully awake now?", "你现在完全清醒了吗？"]
      ]),
      word("bitter", "苦的；痛苦的", ["bitter taste", "bitter wind", "bitter memory"], [
        ["The tea has a bitter taste.", "这茶有苦味。"],
        ["It was a bitter but useful experience.", "那是痛苦但有用的经历。"]
      ]),
      word("certain", "确定的；某个", ["be certain", "certain point", "certain reason"], [
        ["I am certain that practice helps.", "我确定练习有帮助。"],
        ["At a certain point, the word becomes easy.", "到某个时候，这个词会变容易。"]
      ]),
      word("false", "假的；错误的", ["false idea", "false answer", "false hope"], [
        ["That is a false answer.", "那是错误答案。"],
        ["A false idea can stop progress.", "错误想法会阻碍进步。"]
      ]),
      word("narrow", "窄的；狭窄的", ["narrow road", "narrow view", "narrow bridge"], [
        ["The road is narrow but safe.", "路很窄但安全。"],
        ["Do not keep a narrow view of the word.", "不要对这个词保持狭窄理解。"]
      ]),
      word("simple", "简单的", ["simple word", "simple sentence", "simple way"], [
        ["A simple sentence can still carry a big idea.", "简单句也能承载大想法。"],
        ["Use a simple way to say it.", "用简单方式说出来。"]
      ])
    ]
  },
  {
    id: "others",
    label: "其他",
    count: 49,
    words: [
      word("Monday", "星期一", ["on Monday", "Monday morning", "next Monday"], [
        ["We will start the plan on Monday.", "我们周一开始计划。"],
        ["Monday morning is good for review.", "周一早上适合复盘。"]
      ]),
      word("January", "一月", ["in January", "January first", "last January"], [
        ["I made a learning plan in January.", "我在一月做了学习计划。"],
        ["January is the first month of the year.", "一月是一年的第一个月。"]
      ]),
      word("three", "三", ["three words", "three days", "three examples"], [
        ["Make three examples with this word.", "用这个词造三个例句。"],
        ["I practised for three days.", "我练了三天。"]
      ]),
      word("twelve", "十二", ["twelve months", "twelve minutes", "twelve words"], [
        ["There are twelve months in a year.", "一年有十二个月。"],
        ["Study for twelve minutes first.", "先学习十二分钟。"]
      ]),
      word("hundred", "百", ["one hundred", "hundred words", "hundred times"], [
        ["There are one hundred operation words.", "有一百个动作结构词。"],
        ["Do not repeat a mistake a hundred times.", "不要把错误重复一百遍。"]
      ]),
      word("quarter", "四分之一；一刻钟", ["a quarter of", "quarter past", "quarter hour"], [
        ["Review for a quarter of an hour.", "复习一刻钟。"],
        ["A quarter of the list is already familiar.", "词表的四分之一已经熟悉了。"]
      ])
    ]
  }
];

const scenarios = [
  {
    title: "在图书馆问路",
    partner: "Where do you want to go?",
    required: ["where", "library", "near"],
    replies: [
      "I want to go to the library near the station.",
      "Where is the reading room?",
      "Is there a quiet place near here?"
    ]
  },
  {
    title: "解释会议变化",
    partner: "Why did the meeting change?",
    required: ["because", "meeting", "change"],
    replies: [
      "The meeting changed because the manager was late.",
      "There was a change in the meeting time.",
      "I will give you the new meeting note."
    ]
  },
  {
    title: "表达学习困难",
    partner: "What is difficult for you?",
    required: ["clear", "reason", "practice"],
    replies: [
      "I know the word, but I cannot make a clear sentence.",
      "The main reason is that I do not practise enough.",
      "I need a simple way to speak every day."
    ]
  }
];

const els = {
  conceptList: document.querySelector("#conceptList"),
  conceptKicker: document.querySelector("#conceptKicker"),
  conceptTitle: document.querySelector("#conceptTitle"),
  conceptSummary: document.querySelector("#conceptSummary"),
  conceptFitScore: document.querySelector("#conceptFitScore"),
  schemeTag: document.querySelector("#schemeTag"),
  moduleList: document.querySelector("#moduleList"),
  recommendationText: document.querySelector("#recommendationText"),
  categoryTabs: document.querySelector("#categoryTabs"),
  wordCloud: document.querySelector("#wordCloud"),
  wordCategory: document.querySelector("#wordCategory"),
  activeWord: document.querySelector("#activeWord"),
  wordIndex: document.querySelector("#wordIndex"),
  wordMeaning: document.querySelector("#wordMeaning"),
  patternOne: document.querySelector("#patternOne"),
  patternTwo: document.querySelector("#patternTwo"),
  patternThree: document.querySelector("#patternThree"),
  exampleList: document.querySelector("#exampleList"),
  speakWordBtn: document.querySelector("#speakWordBtn"),
  drillContent: document.querySelector("#drillContent"),
  sourcePreview: document.querySelector("#sourcePreview")
};

const state = {
  conceptId: concepts[0].id,
  groupId: wordGroups[0].id,
  wordText: wordGroups[0].words[0].text,
  mode: "sentence",
  scenarioIndex: 0
};

function word(text, meaning, patterns, examples) {
  return { text, meaning, patterns, examples };
}

function activeConcept() {
  return concepts.find((item) => item.id === state.conceptId) || concepts[0];
}

function activeGroup() {
  return wordGroups.find((item) => item.id === state.groupId) || wordGroups[0];
}

function activeWord() {
  const group = activeGroup();
  return group.words.find((item) => item.text === state.wordText) || group.words[0];
}

function allWords() {
  return wordGroups.flatMap((group) => group.words.map((item) => ({ ...item, group })));
}

function renderConcepts() {
  els.conceptList.replaceChildren();
  concepts.forEach((concept) => {
    const button = document.createElement("button");
    button.className = `concept-card${concept.id === state.conceptId ? " is-active" : ""}`;
    button.type = "button";
    button.innerHTML = `
      <span class="concept-meta"><span>${concept.number}</span><span>${concept.bestFor}</span></span>
      <strong>${concept.title}</strong>
      <p>${concept.subtitle}</p>
    `;
    button.addEventListener("click", () => {
      state.conceptId = concept.id;
      document.body.dataset.theme = concept.id;
      renderConcepts();
      renderScheme();
    });
    els.conceptList.append(button);
  });
}

function renderScheme() {
  const concept = activeConcept();
  els.conceptKicker.textContent = concept.number;
  els.conceptTitle.textContent = concept.title;
  els.conceptSummary.textContent = concept.summary;
  els.conceptFitScore.textContent = String(concept.fit);
  els.schemeTag.textContent = concept.tag;
  els.recommendationText.textContent = concept.recommendation;
  els.moduleList.replaceChildren();

  concept.modules.forEach(([index, title, body]) => {
    const item = document.createElement("div");
    item.className = "module-item";
    item.innerHTML = `<b>${index}</b><div><strong>${title}</strong><span>${body}</span></div>`;
    els.moduleList.append(item);
  });
}

function renderCategories() {
  els.categoryTabs.replaceChildren();
  wordGroups.forEach((group) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = group.id === state.groupId ? "is-active" : "";
    button.textContent = `${group.label} ${group.count}`;
    button.addEventListener("click", () => {
      state.groupId = group.id;
      state.wordText = group.words[0].text;
      renderCategories();
      renderWords();
      renderWordLab();
      renderDrill();
    });
    els.categoryTabs.append(button);
  });
}

function renderWords() {
  const group = activeGroup();
  els.wordCloud.replaceChildren();
  group.words.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `word-chip${item.text === state.wordText ? " is-active" : ""}`;
    button.textContent = item.text;
    button.addEventListener("click", () => {
      state.wordText = item.text;
      renderWords();
      renderWordLab();
      renderDrill();
    });
    els.wordCloud.append(button);
  });
}

function renderWordLab() {
  const group = activeGroup();
  const item = activeWord();
  const globalIndex = allWords().findIndex((entry) => entry.text === item.text && entry.group.id === group.id) + 1;

  els.wordCategory.textContent = `${group.label} · ${group.count} 词`;
  els.activeWord.textContent = item.text;
  els.wordMeaning.textContent = item.meaning;
  els.wordIndex.textContent = `样例 ${globalIndex}/850`;
  [els.patternOne, els.patternTwo, els.patternThree].forEach((node, index) => {
    node.textContent = item.patterns[index] || item.text;
  });

  els.exampleList.replaceChildren();
  item.examples.forEach(([en, zh]) => {
    const example = document.createElement("div");
    example.className = "example-item";
    example.innerHTML = `<strong>${en}</strong><span>${zh}</span>`;
    els.exampleList.append(example);
  });
}

function renderDrill() {
  const item = activeWord();
  const mode = state.mode;
  els.drillContent.replaceChildren();

  if (mode === "sentence") renderSentenceDrill(item);
  if (mode === "dialogue") renderDialogueDrill(item);
  if (mode === "shadow") renderShadowDrill(item);
  if (mode === "review") renderReviewDrill(item);
}

function renderSentenceDrill(item) {
  const prompt = document.createElement("p");
  prompt.className = "prompt-line";
  prompt.textContent = `用 "${item.text}" 写一个 8 到 16 个词的英文句子，并尽量加入 ${item.patterns[0]}。`;

  const textarea = document.createElement("textarea");
  textarea.className = "answer-box";
  textarea.placeholder = `Example: ${item.examples[0][0]}`;

  const feedback = document.createElement("div");
  feedback.className = "feedback";
  feedback.textContent = "写完后点击检测，会检查目标词、长度和表达清晰度。";

  const row = document.createElement("div");
  row.className = "action-row";
  row.innerHTML = `<button class="primary" type="button">检测句子</button><button type="button">换一个提示</button>`;
  row.children[0].addEventListener("click", () => {
    const text = textarea.value.trim();
    const words = text.split(/\s+/).filter(Boolean);
    const hasWord = new RegExp(`\\b${item.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(text);
    if (!text) {
      feedback.textContent = "先写一句。越简单越好，关键是让这个词真的进入你的表达。";
    } else if (!hasWord) {
      feedback.textContent = `这句还没有用到 "${item.text}"。先把目标词放进去，再调整句意。`;
    } else if (words.length < 8) {
      feedback.textContent = "目标词已经出现了。现在把句子扩到 8 个词以上，加一个原因、时间或地点。";
    } else if (words.length > 18) {
      feedback.textContent = "内容够了，但句子偏长。试着拆成两句，保持 Basic English 的清楚感。";
    } else {
      feedback.textContent = "不错。这句已经覆盖目标词，长度合适。下一步可以改写成疑问句或加入 because。";
    }
  });
  row.children[1].addEventListener("click", () => {
    const pattern = item.patterns[Math.floor(Math.random() * item.patterns.length)];
    prompt.textContent = `用 "${item.text}" 写一句包含 ${pattern} 的英文，再写一个中文意思。`;
    feedback.textContent = "新提示已生成。";
  });

  els.drillContent.append(prompt, textarea, row, feedback);
}

function renderDialogueDrill(item) {
  const scenario = scenarios[state.scenarioIndex % scenarios.length];
  const stack = document.createElement("div");
  stack.className = "dialogue-stack";
  stack.innerHTML = `
    <p class="prompt-line">${scenario.title} · 必用词：${[item.text, ...scenario.required].slice(0, 4).join(", ")}</p>
    <div class="bubble">${scenario.partner}</div>
    <div class="bubble user">${scenario.replies[state.scenarioIndex % scenario.replies.length]}</div>
  `;

  const row = document.createElement("div");
  row.className = "action-row";
  row.innerHTML = `<button class="primary" type="button">下一轮</button><button type="button">朗读对话</button>`;
  row.children[0].addEventListener("click", () => {
    state.scenarioIndex += 1;
    renderDrill();
  });
  row.children[1].addEventListener("click", () => {
    speak(`${scenario.partner}. ${scenario.replies[state.scenarioIndex % scenario.replies.length]}`);
  });

  els.drillContent.append(stack, row);
}

function renderShadowDrill(item) {
  const line = item.examples[0][0];
  const prompt = document.createElement("p");
  prompt.className = "prompt-line";
  prompt.textContent = line;

  const feedback = document.createElement("div");
  feedback.className = "feedback";
  feedback.textContent = "先听一遍，再跟读。正式版可加入浏览器语音识别，显示漏读词和相似度。";

  const row = document.createElement("div");
  row.className = "action-row";
  row.innerHTML = `<button class="primary" type="button">播放慢速</button><button type="button">播放自然速度</button>`;
  row.children[0].addEventListener("click", () => speak(line, 0.72));
  row.children[1].addEventListener("click", () => speak(line, 0.95));

  els.drillContent.append(prompt, row, feedback);
}

function renderReviewDrill(item) {
  const group = activeGroup();
  const prompt = document.createElement("p");
  prompt.className = "prompt-line";
  prompt.textContent = `今日复盘：${group.label} 里先掌握 ${item.text}，再串联 ${group.words
    .slice(0, 5)
    .map((entry) => entry.text)
    .join(", ")}。`;

  const feedback = document.createElement("div");
  feedback.className = "feedback";
  feedback.textContent =
    "正式版会记录每个词的造句次数、对话次数、发音分数和遗忘周期，并生成下一次复习顺序。";

  const row = document.createElement("div");
  row.className = "action-row";
  row.innerHTML = `<button class="primary" type="button">标记已掌握</button><button type="button">加入错词</button>`;
  row.children[0].addEventListener("click", () => {
    feedback.textContent = `"${item.text}" 已标记为熟词。下一轮会降低出现频率。`;
  });
  row.children[1].addEventListener("click", () => {
    feedback.textContent = `"${item.text}" 已加入错词队列。下一次会优先安排造句和对话。`;
  });

  els.drillContent.append(prompt, row, feedback);
}

function bindModeTabs() {
  document.querySelectorAll(".mode-tabs button").forEach((button) => {
    button.addEventListener("click", () => {
      state.mode = button.dataset.mode;
      document.querySelectorAll(".mode-tabs button").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      renderDrill();
    });
  });
}

function bindSources() {
  document.querySelectorAll(".source-thumb").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".source-thumb").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      els.sourcePreview.src = button.dataset.source;
    });
  });
}

function getPreferredEnglishVoice() {
  const voices = window.speechSynthesis?.getVoices?.() || [];
  return (
    voices.find((voice) => voice.name === "Google US English" && voice.lang === "en-US") ||
    voices.find((voice) => voice.name === "Google US English") ||
    voices.find((voice) => voice.lang === "en-US" && voice.name.includes("Google")) ||
    voices.find((voice) => voice.lang === "en-US") ||
    voices.find((voice) => voice.lang.startsWith("en")) ||
    null
  );
}

function speak(text, rate = 0.82) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const voice = getPreferredEnglishVoice();
  utterance.lang = "en-US";
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang || "en-US";
  }
  utterance.rate = rate;
  window.speechSynthesis.speak(utterance);
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  }
}

function init() {
  document.body.dataset.theme = state.conceptId;
  renderConcepts();
  renderScheme();
  renderCategories();
  renderWords();
  renderWordLab();
  renderDrill();
  bindModeTabs();
  bindSources();
  window.speechSynthesis?.getVoices?.();
  window.speechSynthesis?.addEventListener?.("voiceschanged", getPreferredEnglishVoice);
  els.speakWordBtn.addEventListener("click", () => speak(activeWord().text, 0.72));
  registerServiceWorker();
}

init();
