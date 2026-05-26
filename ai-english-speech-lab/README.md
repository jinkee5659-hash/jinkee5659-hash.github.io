# AI English Speech Lab

一个面向英语演讲练习的本地网页应用。输入英文单词、句子或短主题后，页面会生成：

- 一篇适合当前水平的英文演讲稿
- 关键词卡片和例句
- 单句拆解、朗读和慢速跟读
- 简单小测验
- 演讲提词器
- 自动优先选择 `Google US English · en-US` 等更自然的英语朗读声音，并支持手动选择声音与语速
- 浏览器支持时的语音识别评分

## 使用方法

打开本目录的 `index.html`，或者在本目录启动一个本地服务器：

```bash
python3 -m http.server 5173
```

然后访问 `http://localhost:5173`。

## 部署到 GitHub Pages

1. 在 GitHub 创建一个新仓库，例如 `ai-english-speech-lab`。
2. 把本目录所有文件上传到仓库的 `main` 分支。
3. 打开仓库的 `Settings` -> `Pages`。
4. 在 `Build and deployment` 里选择 `GitHub Actions`。
5. 等待 Actions 跑完后，访问 GitHub Pages 给出的 HTTPS 地址。

如果仓库名是 `jinkee5659-hash.github.io`，网站地址通常是：

```text
https://jinkee5659-hash.github.io/
```

如果仓库名是 `ai-english-speech-lab`，网站地址通常是：

```text
https://jinkee5659-hash.github.io/ai-english-speech-lab/
```

## 学习方法

1. Understand: 先看主题、关键词和中文提示。
2. Listen: 听完整演讲，再听单句。
3. Shadow: 跟读每一句，先慢速，再正常速度。
4. Speak: 用演讲模式完成一次完整表达。

## 后续扩展

- 接入 OpenAI API，根据任意主题生成更自然的演讲稿和中文解释。
- 接入服务端 TTS，把 Listen 升级成更接近真人录音的 AI 声音。
- 增加错词本，把语音识别中反复漏掉的词保存下来。
- 加入每日练习记录和进步曲线。
- 支持更多演讲结构，比如观点型、故事型、面试型。
