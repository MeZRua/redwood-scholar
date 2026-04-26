<div align="center">
  <img src="./logo.png" alt="Redwood Scholar Logo" height="100"/>
</div>

# Redwood Scholar

[English](README.md) · **中文** · [更新日志](CHANGELOG.md)

Redwood Scholar 是一个偏温暖、偏研究表达的学术个人主页模板，基于 Next.js、Tailwind CSS 和 TypeScript 构建。

它最初继承了 `PRISM` 的工程底座，但现在正在朝自己的模板方向演化，重点是：

- 偏红色系的视觉设计
- 配置驱动的学术内容组织
- 基于 BibTeX 的论文系统
- 支持公式的 Blog / Notes
- 首页可展开 / 收起的模块
- 访客地球仪 / 访客地图模块

![Redwood Scholar 预览](screenshot.png)

## 功能特点

- 使用 `content/` 下的 `TOML`、`Markdown`、`BibTeX` 管理内容
- 从 `content/publications.bib` 自动解析论文
- Blog 支持 Markdown 和公式渲染
- 首页支持简介、动态、精选论文、研究统计、最近写作等模块
- 支持可配置的访客地球仪模块
- 支持静态导出，可部署到 GitHub Pages / Netlify / Cloudflare Pages
- 通过 `content/` 和 `content_zh/` 支持双语结构

## 快速开始

```bash
git clone https://github.com/MeZRua/redwood-scholar.git
cd redwood-scholar
npm install
npm run dev
```

然后访问 [http://localhost:3000](http://localhost:3000)。

## 内容结构

```text
content/
├── config.toml          # 站点信息、导航、功能开关
├── about.toml           # 首页板块结构
├── bio.md               # 首页个人简介
├── news.toml            # 动态列表
├── publications.bib     # 论文列表
├── blog/                # 带 frontmatter 的博客文章
└── *.toml / *.md        # CV、奖项、服务、教学等页面
```

常用可改位置：

- `content/config.toml`：站点标题、作者、社交链接、访客地球仪、功能开关
- `content/about.toml`：首页布局和板块
- `content/publications.bib`：论文与精选论文
- `content/blog/*.md`：博客与公式笔记

## 支持的页面类型

- `text`
- `card`
- `publication`
- `blog`

## 部署

Redwood Scholar 使用静态导出：

```bash
npm run build
```

构建后会生成 `out/`，可以直接用于 Netlify 或其他静态托管平台。

Netlify 推荐配置：

- Build command: `npm run build`
- Publish directory: `out`
- Node version: `22`

## 当前状态

这个仓库现在还处于持续定制和清理阶段，部分文档和部署说明还在从继承的基础模板中逐步替换完善。

## 开源协议

MIT
