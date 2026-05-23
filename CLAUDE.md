# AI Era Dev Tools Design — CLAUDE.md

> 此文件由 Claude Code 每次会话自动加载，取代旧的 context.md + process.log（两者已废弃）。
> 新会话直接从这里读取上下文，无需再手动 `Read context.md`。

---

## 项目概述

一份以 **snap-scroll HTML 演示文稿**形式呈现的 AI 时代开发者工具设计方案。

| 项 | 值 |
|---|---|
| 主文件 | `/Users/hsin/Documents/Coding/CLI/ai-dev-tools-design.html` |
| 当前行数 | 约 3500 行 |
| 受众 | 设计/产品评审，需视觉冲击力 |
| 语言 | 中文界面，英文技术术语混用 |

### 第二份材料（CANN 昇腾算子开发场景）

| 项 | 值 |
|---|---|
| 文件 | `/Users/hsin/Documents/Coding/CLI/hai-operator-design.html` |
| 当前大小 | ~208,955 字符（持续增长） |
| 场景 | CANN 昇腾算子开发（TBE DSL、EZ9999错误、910B/310P适配） |
| 技术栈 | `tik.Tensor`、`tik.data_move`、msprof profiler、FRACTAL_NZ格式 |
| 状态 | 主体完成，s-m3a 已删除 |

---

## 每次修改完成后必须做的两件事

1. **`git push`** — 推送到远程仓库
2. **更新 CLAUDE.md** — 将本次对话中的重要进展、决策、新约定写入本文件

不要等到会话结束才统一处理，每完成一个用户请求就执行。

---

## 会话启动协议

1. 读本文件（已在读）
2. 如用户指向某个具体 section，用 `grep -n "s-mXX\|section-id"` 定位行号
3. 先确认用户意图，再动手——用户可能在一条消息里说多个需求

---

## 技术架构

### 布局
- `scroll-snap-type: y mandatory`，每个 `.sec` 固定 `100vh`
- 每屏结构：`.slabel`（标题栏）+ `.inner`（内容区）+ `.snav`（导航点）

### 字体
| 用途 | 字体 |
|---|---|
| 标题 | Syne |
| 代码 / 数据 / 终端 | DM Mono |
| 正文 | Space Grotesk |
| 中文 | Noto Sans SC |

### CSS 自定义变量（完整）
```css
:root {
  --acc:#834DF0; --acc2:#6B38D4; --acc-l:#A87FF5;
  --acc-dim:rgba(131,77,240,.08); --acc-b:rgba(131,77,240,.22);
  --bg:#F7F7FA; --bg2:#EEEEF3; --sur:#FFFFFF;
  --tx:#1A1A2E; --tx2:#4A4A6A; --tx3:#8888A0;
  --bdr:rgba(0,0,0,.07); --bdr2:rgba(0,0,0,.13);
  --g:#059669; --r:#DC2626; --y:#D97706; --bl:#2563EB; --tl:#0D9488;
  --tb:#0C0C11; --tbar:#15151C; --tbdr:#242430;
  --tw:#CECEE0; --td:#4E4E5E;
  --tg:#34D399; --tb2:#60A5FA; --tp:#A78BFA; --ty:#FBBF24; --tr:#F87171; --tc:#2DD4BF;
}
```

### 动画 keyframes（已定义，勿重复添加）
- `bl`：光标闪烁
- `fadeIn` / `slideIn`：入场
- `pulse`：圆点脉冲
- `spin`：旋转（用于 ✽ 图标）
- `glow`：发光（用于高亮步骤圆圈）
- `ck-ring`：按钮脉冲环（`.clicky-tbtn.ck-hl` 专用）
- `ck-wave`：语音波形柱（`.cwb` 专用）

---

## Section 索引

| 顺序 | ID | 标题 | 近似行号 |
|---|---|---|---|
| 1 | `s-cover` | 封面 | ~304 |
| 2 | `s-bg` | 背景：信号扫描 | ~339 |
| 3 | `s-bg2` | 背景：范式演进时间轴 | ~431 |
| 3.3 | `s-bg-signal` | 行业验证 — 4个竞品印证设计判断（新增） | ~496 |
| 3.5 | `s-bg3` | 代码是过程，结果才是产出物 | ~627 |
| 4 | `s-j-overview` | 用户旅程全景地图（7阶段×6维度） | ~640 |
| 5 | `s-m4a` | 记忆启动 — 跨会话上下文 | ~1046 |
| 6 | `s-m2c` | 语音×光标 — 指着说话 | ~818 |
| 7 | `s-m2b` | 手势 Prompt — Flow 不中断 | ~748 |
| 8 | `s-m2a` | 光标即上下文 — 停顿触发 AI | ~681 |
| 9 | `s-m3b` | Goal 命令 — 开发者定义完成 | ~967 |
| 10 | `s-m1a` | Agent View — 多会话统一管理 | ~539 |
| 11 | `s-m1b` | 并行看板 — 所有 Agent 一屏总览 | ~628 |
| 11.5 | `s-m1c` | 实体状态灯 — AI Agent 进度跃出屏幕 | 动态定位 |
| 12 | `s-m5a` | 结果审核 — 多维可视化 | 动态定位 |
| 14 | `s-m5b` | 意图对齐 — AI 决策透明化 | ~1240 |
| 15 | `s-m4b` | 团队记忆库 — 隐性知识共享 | ~1104 |
| 16 | `s-m6a` | 光标伴侣 — 贴身 AI 操作引导 | ~1343 |
| 17 | `s-sum` | 总结 | ~1496 |

> 行号会随编辑漂移，用 `grep -n 'id="s-mXX"'` 实时定位。

---

## 组件设计规范

### 标准 Section 布局
```html
<div class="sec" id="s-xxx" style="background:var(--sur);">
  <div class="slabel">
    <span class="sub">模块名 · Stage XX · 设计点 N/M</span>
    <span class="main">标题 — 副标题</span>
  </div>
  <div class="inner">
    <div class="dp-layout">
      <div class="dp-left"><!-- 说明 + Before/After --></div>
      <div class="dp-right"><!-- 动态 Mockup --></div>
    </div>
  </div>
  <div class="snav" id="nav-xxx"></div>
</div>
```

### Before/After 对比面板（每个设计 section 必须有）
```html
<div class="ba-grid">
  <div class="ba-before">
    <div class="ba-label"><span>✕</span> 过去的做法</div>
    <!-- 视觉 Mockup，不能只放文字 -->
  </div>
  <div class="ba-after">
    <div class="ba-label"><span>◆</span> 新的设计</div>
    <div class="ba-text">简短文字说明</div>
  </div>
</div>
```

### CSS 类命名约定
| 模块 | 前缀 |
|---|---|
| Agent View | `.agv-*` |
| 光标伴侣 | `.clicky-*` / `#ck-*` |
| Before/After | `.ba-*` |
| 设计点布局 | `.dp-*` |
| 旅程地图 | `.jmap-*` |

### Mockup 视觉语言
| 场景 | 样式 |
|---|---|
| 终端 / 代码 | `background:#0f0f16; font-family:'DM Mono'; font-size:7.5px; border:.5px solid #252530` |
| 对话气泡（错误示意） | `background:rgba(220,38,38,.07); border-radius:4px` |
| 知识孤岛 | flex-wrap chip 布局 |
| 浅色 App 界面 | `background:#F6F6FA; border:1px solid var(--bdr2); border-radius:10px` |

### JS 模块化规范
- 所有复杂 mockup 逻辑封装为 **IIFE**，避免全局变量污染
- 命名格式：`(function initXxx() { ... })();`
- 用 `IntersectionObserver` 控制动画启停（离开 viewport 停止 RAF，节省性能）

---

## 设计约定（已锁定，不再改动）

| 约定 | 说明 |
|---|---|
| 紫色主题 | `--acc:#834DF0`，不接受其他主色方案 |
| slabel 双行 | `flex-direction:column`，sub 在上，main 在下，禁止同行 |
| Before 必须是 Mockup | 红色面板里不能只放文字，必须有视觉 mockup |
| After 保持文字 | 紫色面板只需简短文字（真实 mockup 已在 dp-right 展示） |
| Agent View CSS 前缀 | 全部用 `.agv-*`，旧 `.av-*` 已清除，不要再用 |
| s-m6a 独立存在 | 光标伴侣是独立设计点，不合并进 Module 2 |
| s-m2c 不动 | "语音×光标"保留原样，光标伴侣是新增而非替换 |

---

## 用户工作偏好

- **语言**：中文沟通，接受英文技术术语
- **风格**：视觉 mockup 优先于纯文字；紫色系；质量对标甚至超越产品官方实现
- **节奏**：会在一条消息里说多个需求，要全部记住并依次处理
- **推翻**：说"算了"时直接执行新方向，不需要解释
- **回复**：不要在末尾加总结段落；简洁直接

---

## 操作规范

### 大块 HTML/JS 替换（首选方案）
```python
# 1. 写新内容到 /tmp/
# 2. Python splice
with open('ai-dev-tools-design.html', 'r', encoding='utf-8') as f:
    content = f.read()

p1 = content.index('<!-- 起始唯一注释 -->')
p2 = content.index('<!-- 结束唯一注释 -->')
content = content[:p1] + new_content + content[p2:]

with open('ai-dev-tools-design.html', 'w', encoding='utf-8') as f:
    f.write(content)
```
优势：不依赖行号（行号随编辑漂移），不受特殊字符影响。

### CSS 批量颜色替换
```bash
sed -i '' 's/旧值/新值/g' file.html
grep -c '旧值' file.html  # 验证归零
```
注意：按依赖顺序替换，避免 A→B 后又 B→C 的链式错误。

### 验证技巧
```bash
grep -n "目标字符串" file.html          # 定位行号
grep -c "目标字符串" file.html          # 统计出现次数
grep -n "id=\"s-m" file.html | head    # 快速列出所有 section
```

---

## 已知坑

| 坑 | 说明 |
|---|---|
| Edit 工具对大块失败 | 超过约 50 行或含特殊字符时，`old_string` 匹配概率低；改用 Python splice |
| `.clicky-app` 有 `overflow:hidden` | SVG overlay 在 app 内是安全的，但元素超出 app 边界会被 clip |
| `--acc-l` 正确值 | `#A87FF5`，不是 `#A78BFA`（后者是 `--tp`） |
| sed 链式替换 | 先替换具体值，再替换通用值；每步验证 |
| 行号漂移 | 每次编辑后行号都可能变，不要在注释或变量里硬编码行号 |
| IntersectionObserver 时机 | IIFE 在 DOM 解析时同步执行，若 section 此时不可见则动画不会启动——这是预期行为 |

---

## 关键元素 ID 速查

### Agent View（s-m1a）
| ID | 用途 |
|---|---|
| `#agv-root` | 整个 Agent View 容器 |
| `#agv-list` | 会话列表（JS 注入） |
| `#agv-peek` | 速览面板（JS 注入） |
| `#agv-sc` | 状态计数文字 |
| `#agv-dinput` | Dispatch 输入框 |

### 光标伴侣（s-m6a）
| ID | 用途 |
|---|---|
| `#ck-companion-svg` | SVG overlay（pointer-events:none） |
| `#ck-companion-g` | 三角指针 `<g>` 组（JS 控制 transform） |
| `#ck-ring-el` | 脉冲扩散圆（SVG circle） |
| `#ck-speech` | 语音气泡 div |
| `#ck-highlight` | 目标元素高亮框 div |
| `#ck-export-btn` | 工具栏导出按钮 |
| `#ck-settings-btn` | 侧栏设置项 |
| `#clicky-waveform` | 语音波形容器（JS 注入 `.cwb` bars） |

### 旅程地图（s-j-overview）
| 函数 | 用途 |
|---|---|
| `buildJourneyOverview()` | 动态生成 7×6 矩阵 + SVG 情绪曲线 |

---

## Step 步骤指示条系统（2026-05-20 新增）

### 组件概览
所有设计幻灯片（s-m1a / s-m1b / s-m2a / s-m2b / s-m2c / s-m3b / s-m4a / s-m4b / s-m5a / s-m5b / s-m6a，共11个，s-m3a 已删除）的 dp-right 区域 mockup-label 下方均有步骤指示条。

### HTML 结构
```html
<div class="stp-strip" id="stp-mXX">
  <div class="stp-bar"><div class="stp-fill"></div></div>
  <div class="stp-steps">
    <div class="stp-step"><div class="stp-num">1</div><span class="stp-lbl">…</span></div>
    <!-- × 3 steps -->
  </div>
</div>
```

### CSS 类
| 类 | 用途 |
|---|---|
| `.stp-strip` | 整体容器（flex column） |
| `.stp-bar` / `.stp-fill` | 进度条 + 紫色填充（CSS transition） |
| `.stp-step` | 单个步骤（编号圆 + 文字） |
| `.stp-step.stp-active` | 当前步骤（紫色） |
| `.stp-step.stp-done` | 已完成步骤（绿色 `--tg`） |

### 快捷键 badge（.key-badge）

`setupSlideSteps` 在检测到任意步骤含 `key` 属性时，自动向 `.dp-right` 注入 `<div class="key-badge">` 元素（之前只有CSS，没有HTML元素，导致永不显示）。

CSS 样式：绝对定位 `bottom:18px;left:50%`，深色键帽风格（`background:var(--tx)`，底部投影 `box-shadow:0 3px 0 rgba(0,0,0,.55)`，IKB蓝光晕）。

各 section 的 `key` 分配：
- s-m4a 步骤1: `↵`，s-m2c 步骤2: `Space`
- s-m2b 步骤2: `⌘ K`，步骤3: `↵`
- s-m3b 步骤1: `/`，步骤2: `↵`
- s-m1b 步骤3: `⌘ K`
- s-m6a 步骤1: `/`

### JS：`initStepper(secId, stripId, ms, onStep)`
- `ms`：每步停留时长（最后一步停留 `ms × 2.5`）
- `onStep`：目前全部传 `null`（视觉与动画独立推进）
- IntersectionObserver `threshold:0.4` 控制自动启停
- 12 幻灯片中 s-m6a 用 `3400ms`（与 initClicky 飞行节奏对齐），其余 `2300ms`

---

## 已完成（本轮会话）

### hai-operator-design.html 专项工作

| commit | 内容 |
|---|---|
| `1eab472` | 新增 `hai-operator-design.html`：HAI × CANN 昇腾算子开发场景全新演示文稿（18个section） |
| `f7ce851` | 更新 CLAUDE.md，记录第二份材料信息 |
| `c99fe2f` | 移植 guizang 瑞士国际主义风格（IKB克莱因蓝）+ 右上角固定导航栏 |
| `8cca3b6` | 修复多个JS/HTML bug + 将光标伴侣(s-m6a)提前至 Stage 02·2/4 |
| `519bfa4` | s-m2c 语音mockup完整重建 + BEFORE/AFTER tags + s-j-overview重建 + 封面HCI→HAI + 4个mockup ID修复 + 旅程行标题方向修复 + 渐变top-border阶段区分 + tooltip向上 + 光标伴侣三角 |
| `747adbb` | 所有step-driven mockup连接act回调 + 修复JS语法错误 + 光标伴侣渐变光晕光标 + s-bg重新排版（大数字统计+更丰富内容）|
| `9e0b402` | 快捷键badge修复（CSS keycap样式+JS自动注入）+ 光标伴侣改为斜向三角形 |
| `81f3b18` | 新增 s-m1c：USB 实体状态灯硬件联动设计点（黄/红黄闪/绿三态） |
| `c76a14d` | s-m1c mockup重设计：desk scene笔记本+USB线+交通灯硬件 |
| `b3810e3` | s-m1c 笔记本比例修复：flex:1宽度填满，144px屏高，状态芯片 |
| `f079246` | s-m1c macOS风格笔记本：铝色边框+壁纸+菜单栏+Terminal窗口+Dock |
| `b244e37` | 删除 s-m3a（出错恢复）：在AI agent循环中自动处理，场景不独特，且与s-m5a结果审核重叠 |
| `188957e` | 新增 s-bg-signal：行业验证页（4卡：Claude Desktop Buddy / OpenAI×Ive / Devin / Copilot Voice） |

### ai-dev-tools-design.html 专项工作（更早）

| commit | 内容 |
|---|---|
| `d26df5a` | 修复 Stage 02（Space badge、手势结果Q4行、s-m6a鼠标光标跟随三角形） |
| `c1e12e9` | 修复 s-m1b 看板：phase-based（正常→异常高亮→注入指令） |

---

## hai-operator-design.html 关键设计说明

### 视觉风格（guizang 瑞士国际主义 Style B · IKB）
| 变量 | 值 | 说明 |
|---|---|---|
| `--acc` | `#002FA7` | IKB 克莱因蓝（原紫色#834DF0） |
| `--bg` | `#fafaf8` | 瑞士纸白 |
| `--tx` | `#0a0a0a` | 近黑 |
| `--grey-2` | `#d4d4d2` | hairline 分割线 |
- 字体：Inter weight-200（大标题）+ DM Mono（代码/meta）
- 边框：直角，hairline `.5px solid var(--grey-2)`，无左侧描边，无圆角无阴影
- slabel：顶部 2.5px IKB 边框
- **禁忌**：不使用「浅色底色 + 左侧彩色描边」样式（用户明确拒绝，"太像AI了"）

### Section 顺序（当前）
```
s-cover → s-bg → s-bg2 → s-bg-signal（行业验证）→ s-bg3 → s-j-overview
→ s-m4a（记忆启动）
→ s-m2c（语音×光标）
→ s-m6a（光标伴侣）
→ s-m2b（手势调参）
→ s-m2a（光标上下文）
→ s-m3b（Goal命令）→ s-m1a → s-m1b → s-m1c（实体状态灯）
→ s-m5a → s-m5b → s-m4b → s-sum
```
> s-m3a（出错恢复）已于 2026-05-23 删除。理由：AI agent 循环会自动重试编译错误，无需人工介入；且"结果驱动"概念已被 s-m5a 覆盖。

### JS Bug 修复记录（fix_hai_bugs.py）
- `setupSlideSteps`：`.stp-dot` → `.stp-step`，class名 `active/done` → `stp-active/stp-done`
- `initJourney`：`journey-grid` → `journey-root`
- `initSessionMemory`：`mem-cards` → `mem-sessions`
- 终端代码区加 `color:var(--tw)` 防黑字继承
- `voiceSetPhase`：ID 对齐实际 HTML（`voice-ai-output`、`.ms-bar-fill`）
- `gestureSetPhase`：ID 对齐（`tbe-ai-bar`、`tile-m-val`）
- `initCursorDemo`：popup `display:none` → `display:block`，坐标系改为相对 `cursor-demo-tbe`
- `goalShowPanel`：`display:none` → opacity 过渡动画

### s-m2c 语音Mockup动画流程（fix_m2c.py）
1. 步骤1：白色光标滑到 CUBE 行（`left:52% top:30%`），行背景高亮蓝色
2. 步骤2：`Space` badge，IKB 蓝波形条出现，文字逐字打出「这里为什么这么低？」
3. 步骤3：波形消失，AI 回答逐字出现（CUBE 21%过低分析），进度条动画更新

### s-m6a 光标伴侣（已完成 2026-05-23）
- `initCompanion()` 使用 `setAttribute('transform','translate(x,y)')` 移动 `<g>` 组，非 `style.left/top`
- 3步骤：AI Core总览气泡 → CUBE 21% 瓶颈分析 → tile_m 64→128 优化建议
- 光标形状：**斜向锐角等腰三角形** `points="0,0 15,5 5,15"`（用户要求：不像 Cursor 图标）
- IKB 蓝填充 + IKB 蓝外晕 glow filter（ck-tri-glow, feGaussianBlur stdDeviation=4）
- IKB ring stroke 从 #834DF0 改为 `rgba(0,47,167,.6)`

### 关键 JS 修复记录（2026-05-23）
- **致命 Bug**：`voiceSetPhase` 函数内单引号字符串含字面换行符 → `SyntaxError: Invalid or unexpected token` → 所有 JS 失效（含 `initTopNav` → 导航点消失）
- 修复：将字面换行改为 `\n` 转义。验证方法：`node /tmp/check.js` 确认无语法错误

### top-nav 玻璃拟态（当前样式，2026-05-23）
```css
background:rgba(250,250,248,.72);
border:1px solid rgba(255,255,255,.6);
backdrop-filter:blur(28px) saturate(200%) brightness(1.04);
box-shadow:0 2px 20px rgba(0,47,167,.10),0 1px 0 rgba(255,255,255,.8) inset,0 0 0 .5px rgba(0,47,167,.08);
```
- 导航点颜色：`rgba(0,47,167,.22)`（非灰色），hover → `rgba(0,47,167,.55)`
- 注意：不要用纯白 `rgba(255,255,255,.65)` 背景 + 纯白边框，白页上会完全消失

### s-bg2 范式演进（已完成）
- 布局：4张浮动卡片，gap:16px，高度拉伸齐平
- Cards 01-03：`background:var(--sur)` 白底，`.5px solid var(--grey-2)`
- Card 04 HAI：`background:var(--acc)` IKB 蓝，白色文字，flex:1.4

### s-sum 设计总结（已完成）
- 上方4卡：SVG 线性图标，去掉数字序号 badge
- 右下卡：`background:var(--acc2)` 深蓝，文字 `rgba(255,255,255,.75)`

### Before/After 面板规范（已完成）
```html
<div class="ba-label" style="gap:6px;">
  <span style="font-family:'DM Mono',monospace;font-size:7px;letter-spacing:.1em;background:var(--grey-2);color:var(--tx2);padding:1px 6px;">BEFORE</span>过去的做法
</div>
<div class="ba-label" style="gap:6px;">
  <span style="...;background:var(--acc);color:white;padding:1px 6px;">AFTER</span>新的设计
</div>
```

### s-j-overview 用户旅程（已完成）
- 5阶段：01-04 深色 `var(--tx)` 背景，05 IKB 蓝 `var(--acc)` 背景
- 情绪曲线 SVG：IKB 蓝折线从左下→右上
- 每阶段含 mini terminal mockup

### s-m1c 实体状态灯（已完成 2026-05-23）

灵感：Cursor × Luxafor USB 硬件联动。

**桌面场景 Mockup 结构（3个flex兄弟）：**
1. **MacBook 笔记本**（`flex:1`）
   - 铝色边框（`#b0b0b0` 渐变，模拟铝合金）
   - 屏幕：`aspect-ratio:16/10`，深蓝壁纸渐变 + 双径向光斑
   - 菜单栏（`height:14px`，半透明模糊）
   - 浮动 Terminal 窗口（带 macOS 红黄绿标题栏点 + tl-s1..7 终端内容）
   - Dock（半透明，Finder/HAI/Terminal/VSCode/Chrome/Slack/Trash）
   - 键盘底座（铝色，两排按键暗示）+ 触控板
2. **SVG USB 线**（`width:24px`，bezier 曲线从笔记本右侧弯向交通灯USB口）
3. **交通灯硬件设备**（`flex-shrink:0, width:36px`）
   - 圆角顶盖/底盖，渐变侧面（3D感），左侧高光条
   - 三个凹陷灯槽（inner shadow）+ 内部灯圈
   - USB 颈部 + USB 插头 + HAI LINK 标签

**三个状态：**
- Phase 1：黄灯常亮，终端显示 s2-s3（运行日志），statusChip=RUNNING
- Phase 2：红黄交替闪烁（setInterval 550ms），终端显示 s2-s5（警告），statusChip=CONFIRM
- Phase 3：绿灯常亮，终端显示 s2-s3+s6-s7（完成），statusChip=DONE

**JS IDs：** `tl-red/yellow/green`（灯圈）、`tl-s1..7`（终端行）、`tl-status-chip`、`tl-state-bar/dot/title/desc`

### s-bg-signal 行业验证（已完成 2026-05-23）

2×2 卡片网格，每张卡包含 CSS 绘制的产品示意图 + 文字 + 「→ 印证设计点」标注。

| 卡片 | 产品 | 印证 |
|---|---|---|
| ① | Claude Desktop Buddy（Anthropic 开源，$30 ESP32-S3，BLE）| s-m1c 实体状态灯 |
| ② | OpenAI × Jony Ive 设备（$6.5B，无屏幕，H2 2026）| AI 走向实体趋势 |
| ③ | Devin 2.0（Cognition AI，多 Agent 并行看板）| s-m1b 并行 Agent 看板 |
| ④ | GitHub Copilot Voice（"Hey GitHub"，VS Code）| s-m2c 语音×光标 |

卡片②用 `background:var(--acc)` IKB 蓝底（白字），其余白底。

> **待改进（用户反馈 2026-05-23）**：用户希望换成实机截图而非 CSS 绘制的插图。需要从官网/YouTube 找截图，写明日期。

---

## 待办（按优先级）

### 高优先级
- [ ] **s-bg-signal 换实机截图** — 用户要求从官网/YouTube 找真实截图替换 CSS 插图，并注明日期。4个产品：Claude Desktop Buddy、OpenAI×Ive device、Devin、Copilot Voice。

### 低优先级
- [ ] s-m2a cursor demo 最终验证
- [ ] 旅程地图页内容验证
- [ ] s-m3b Goal demo emoji清理（🧪✓⚡不符合IKB风格）
- [ ] s-m4b 卡片 border-radius:6px 清理为直角

---

## 全局 window 函数速查（hai-operator-design.html）

| 函数 | 所在 Section | 作用 |
|---|---|---|
| `window.voiceSetPhase(1/2/3)` | s-m2c | 光标移动/语音波形/AI回答 |
| `window.gestureSetPhase(1/2/3)` | s-m2b | 高亮tile行/更新参数值/验证结果 |
| `window.goalShowPanel(1/2/3)` | s-m3b | Goal面板显示/+进度/+日志 |
| `window.dashSetPhase(1/2/3)` | s-m1b | 看板正常/异常高亮/注入指令 |
| `window.reasonSetPhase(1/2)` | s-m5b | 推理框/决策badge |
| `window.memSetPhase(1/2/3)` | s-m4a | hai start命令/会话列表淡入/高亮当前 |
| `window.cursorSetPhase(0/1/2)` | s-m2a | 光标移动到targets[index] |
| `window.agvSetPhase(1/2/3)` | s-m1a | tbe-gen运行/shape-infer报警/全部完成 |
| `window.reviewSetPhase(1/2/3)` | s-m5a | 切换tab: perf/prec/cstr |
| `window.libSetPhase(1/2/3)` | s-m4b | 高亮算子库列/高亮调试库列/高亮推荐条 |
| `window.trafficSetPhase(1/2/3)` | s-m1c | 黄灯（思考）/红黄闪（确认）/绿灯（完成）|
