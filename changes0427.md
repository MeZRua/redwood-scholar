# 今日代码改动总结

## 1. 颜色主题去粉化（`src/app/globals.css`）

**目标**：原主题色偏粉红，改为纯正大红 + 白底 + 中性灰。

| 变量 | 改前 | 改后 |
|---|---|---|
| `--background` | `#fff8f7`（带粉底） | `#ffffff`（纯白） |
| `--accent` | `#c0312a` | `#cc1a10`（正红，色相约 5°） |
| `--primary` | `#7a1515` | `#8b1010`（深正红） |
| `--accent-light` | — | `#e52e24` |
| `--accent-dark` | — | `#961208` |
| `--neutral-*` | 带红粉底的 neutral（如 `#fff8f7` ~ `#201514`） | 标准 zinc 灰（`#fafafa` ~ `#18181b`），**完全去除粉色底** |
| `--gradient-primary` | — | `linear-gradient(135deg, #8b1010 0%, #b01818 100%)` |
| `--gradient-accent` | — | `linear-gradient(135deg, #cc1a10 0%, #961208 100%)` |

**关键判断**：neutral 色系带红粉底是"偏粉感"的主要来源，改为 zinc 灰体系后彻底消除粉感。

---

## 2. ProfileHero 背景渐变（`src/components/home/ProfileHero.tsx`）

**目标**：去掉粉橙渐变背景，改为近纯白渐变。

```diff
- background: linear-gradient(135deg, #fff0ee 0%, #fce4e4 60%, #f9d6d6 100%)
+ background: linear-gradient(135deg, #ffffff 0%, #fef2f2 60%, #fde8e8 100%)
```

---

## 3. About 去卡片感（`src/components/home/About.tsx`）

**目标**：移除 `CollapsibleSection` 包裹，内容直接平铺在页面上，增加底部分隔线。

```diff
- <CollapsibleSection title={`👋 ${resolvedTitle}`}>
-   <MarkdownProse content={content} />
- </CollapsibleSection>
+ <motion.section className="py-2">
+   <h2 className="mb-4 pb-3 border-b border-neutral-200 text-2xl font-serif font-bold text-primary">
+     👋 {resolvedTitle}
+   </h2>
+   <MarkdownProse content={content} />
+ </motion.section>
```

---

## 4. News 改为可折叠侧栏（`src/components/home/News.tsx`）

**目标**：原 News 是全宽卡片，改为轻量侧栏样式，顶部小标题 + 箭头，默认展开，可点击折叠。

- 移除大卡片容器，改为 `sticky top-24` 侧栏
- 顶部：小写大写字母标题 + `ChevronDownIcon` 折叠箭头（旋转动画）
- 内容：时间线样式（竖线 + 圆点），无卡片背景
- 动画：`framer-motion AnimatePresence`，展开/收起带高度动画

---

## 5. SelectedPublications 恢复卡片（`src/components/home/SelectedPublications.tsx`）

中间曾去掉卡片，但根据用户要求**恢复了 `CollapsibleSection`** 方框卡片样式：

```tsx
<CollapsibleSection title={`📚 ${resolvedTitle}`} eyebrow="Highlights">
  {/* 论文列表 */}
</CollapsibleSection>
```

---

## 6. 主页布局重构（`src/components/home/HomePageClient.tsx`）

**目标**：主内容（ProfileHero + About + SelectedPublications）保持居中不动，News 浮在右侧空白区域。

### 布局方案（最终版）

```
屏幕 (>1280px):
┌──────────────────────────────────────────────────────┐
│        max-w-[1600px] (outer wrapper, relative)       │
│  ┌─────────────────────────────────┐  ┌───────────┐  │
│  │   max-w-6xl  mx-auto (居中)     │  │   News    │  │
│  │  ProfileHero                    │  │  (absolute│  │
│  │  About                          │  │  right-2  │  │
│  │  SelectedPublications           │  │  top-30rem│  │
│  └─────────────────────────────────┘  └───────────┘  │
└──────────────────────────────────────────────────────┘
```

### 核心代码结构

```tsx
<div className="mx-auto max-w-[1600px] relative">
  {/* News 绝对定位浮在主内容右侧空白 */}
  {hasNews && (
    <aside className="hidden xl:block absolute right-2 2xl:right-4 top-[30rem] w-60 2xl:w-64">
      <News ... />
    </aside>
  )}

  {/* 主内容居中，完全不受 News 影响 */}
  <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
    <ProfileHero ... />
    <div className="mt-8 space-y-8">
      <About />
      <SelectedPublications />
      ...
    </div>
  </div>
</div>
```

### News 从 About 页 section 中提取

About 页的 `sections` 里 `type === 'list'` 的部分被提取为 News，渲染到右侧；其余 section 正常渲染在主内容流中，避免重复显示：

```tsx
// 提取 News 数据
const newsSections = [];
data.pagesToShow.forEach((page) => {
  if (page.type === 'about') {
    page.sections.forEach((s) => {
      if (s.type === 'list') newsSections.push(s);
    });
  }
});

// 主内容流中过滤掉 list 类型
page.sections.filter((s) => s.type !== 'list').map(...)
```

---

## 7. News 位置可调参数汇总

在 `HomePageClient.tsx` 的 `<aside>` 那一行：

```tsx
<aside className="hidden xl:block absolute right-2 2xl:right-4 top-[30rem] w-60 2xl:w-64">
```

| 参数 | 含义 | 调整方向 |
|---|---|---|
| `top-[30rem]` | 距顶距离（480px） | 越大越往下，越小越往上 |
| `right-2` | 右边距（8px） | 越小越靠右，越大越靠左 |
| `2xl:right-4` | ≥1536px 屏的右边距 | 同上 |
| `w-60` | 面板宽度（240px） | `w-48`~`w-72` 可选 |
| `2xl:w-64` | ≥1536px 屏的宽度 | 同上 |
| `hidden xl:block` | 显示断点（≥1280px） | 改 `hidden lg:block` 可降至 ≥1024px 显示 |
| 外层 `max-w-[1600px]` | News 定位基准容器宽度 | 越大 News 在超宽屏越往右飘 |
