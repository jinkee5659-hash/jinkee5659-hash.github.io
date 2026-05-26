# EchoFit English

EchoFit English is a static, mobile-first speaking practice app. It helps compare the English sentence you intended to say with the transcript produced by browser speech recognition.

## Features

- Target sentence practice with a built-in phrase bank
- Browser speech recognition for mobile and desktop
- Word-level comparison between target and transcript
- Score, confidence, missed-word focus list, and local history
- Speech synthesis for slow follow-along listening
- PWA manifest and service worker for installable access

## Run Locally

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## GitHub Pages

The app is static and can be published to GitHub Pages as-is. Speech recognition requires a secure context on phones, so use `https://` Pages URLs for real mobile testing.

## Browser Notes

Speech recognition support depends on the browser. Chrome, Edge, and Safari generally provide the best mobile experience. Browsers without `SpeechRecognition` or `webkitSpeechRecognition` will show a compatibility notice.
