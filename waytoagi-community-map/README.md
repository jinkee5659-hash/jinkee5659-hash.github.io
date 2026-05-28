# WaytoAGI 城市社区地图

这是一个可直接部署到 GitHub Pages 的静态交互站点。页面由 `data/cities.js` 驱动，城市数据更新后，地图、列表、负责人和历史活动时间线会同步变化。

## 本地预览

```bash
cd community-map
python3 -m http.server 5173
```

打开 `http://localhost:5173`。

## 数据来源

- 入口知识库：<https://waytoagi.feishu.cn/wiki/QPe5w5g7UisbEkkow8XcDmOpn8e>
- 城市嘉宾页：<https://waytoagi.feishu.cn/wiki/ZYT9wAKXLiQUo3kaPCKcv00vnIc>
- 城市群页：<https://waytoagi.feishu.cn/wiki/Ta5lw7OrEi9Nvhk6TETcAz6AnPh>
- 城市组织人指南：<https://waytoagi.feishu.cn/wiki/IBgWwlrp2i3lljk2Wfhc7SN6nme>
- 历史活动页：第16期至第24期 AI切磋大会活动页（2025-08-31 到 2026-05-31）
- 成都 OPC 社区招募页：<https://waytoagi.feishu.cn/wiki/JHVywtgA6id620knO3dcovKOn7J>

电话、微信等字段只收录公开活动页中直接出现的信息，不编造私人联系方式。后续如果有公开负责人通讯录，可以在 `data/cities.js` 给对应城市补 `phone` / `wechat` 字段。

## GitHub Pages

把 `community-map/` 目录作为静态站根目录发布即可。若发布到现有 `*.github.io` 仓库的子目录，保持现在的相对路径即可正常加载资源。
