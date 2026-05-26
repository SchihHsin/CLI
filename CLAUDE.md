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
| 当前大小 | ~303,755 字符（持续增长） |
| 场景 | CANN 昇腾算子开发（TBE DSL、format 不兼容、UB 溢出、910B/310P适配） |
| 技术栈 | `tik.Tensor`、`tik.data_move`、msprof profiler、FRACTAL_NZ格式 |
| 状态 | 主体完成，s-m3a 已删除；全局终端 Chrome 已标准化（2026-05-25）；s-m2e 情感感知新增（2026-05-26） |

### 第三份材料（ORCA CLI 全流程设计体系）

| 项 | 值 |
|---|---|
| 文件 | `/Users/hsin/Documents/Coding/CLI/hai-cli-design.html` |
| 当前大小 | ~134,625 字符（WCAG 修复后，所有 #48485C 已替换） |
| 内容 | 12 个设计点：架构·Status Bar·输入区·输出流·五状态·权限确认·变更审查·多会话·上下文管理·错误处理·会话摘要 |
| 风格 | IKB 克莱因蓝 #002FA7 · Swiss International Style · macOS 终端 Chrome |
| 参考文档 | `cli-analysis-key-findings.md`（从 cli-analysis-report.html 提炼） |

> **⚠️ 禁止使用假错误码**：原文件中 EZ9999/EZ6523 均已于 2026-05-23 清除，替换为具体错误类型描述（format 不兼容、UB 溢出、shape 推导失败等）。今后不得再创造假编号。

---

## ORCA CLI 全流程架构（已锁定，2026-05-25）

### 全局 UI 结构

```
[RMSNorm ⟳] [FlashAttn ✓] [RopeEmb ⚠]  ~/workspace/RMSNorm-910B  Stage 04 · Agent 运行中
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
│ 终端内容区域（随状态切换）                                           │
│ ❯ _                                                                │
```

**Status bar（固定，不随滚动消失）：**
- 左侧：所有 session 标签（名称 + 状态图标：⟳运行中 / ✓完成 / ⚠需确认）
- 中间：当前 session 的工作路径
- 右侧：当前 Stage + 状态文字

**多任务切换：**`Alt+1/2/3` 在 session 间跳转，status bar 立刻更新，始终可知身处哪个 session。
需确认的 session 标签闪烁 ⚠，手机同时推送通知。

**语音：** 长按 `Space` 激活，光标位置自动作为上下文。

---

### 5 个状态定义

#### State 1 — Initial（初始）
```
[新会话]  ~/workspace  就绪
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ORCA  v0.9
  Operator Runtime
  CANN Assistant
  ──────────────
  昇腾算子开发助手  910B · 310P

  /help  /goal  Space↲

  ❯ _
```
- 欢迎态，ORCA wordmark + 产品名全称（Operator Runtime CANN Assistant）+ 版本 + 快捷键提示
- 外部标注：终端面板下方显示 "Operator Runtime / CANN Assistant"
- 若已有 workspace：输入任意指令自动加载记忆（→ 第8页 s-m4a 流程，无需显式命令）

#### State 2 — Working（执行中）
```
[RMSNorm ⟳]  ~/workspace/RMSNorm-910B  Stage 04 · Agent 运行中
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⟳  tbe-gen       tile_m 迭代…        （黄色，进行中）
  ✓  dtype-check   NZ 格式通过         （绿色，已完成）
  ✗  perf-bench    CUBE 21% 异常       （红色，失败）
  ·  compat        等待中…             （灰色，未开始）

  ❯ _   （Ctrl+C 中断 / Space 语音补充指令）
```
- 四态状态指示：⟳ 黄（进行中）/ ✓ 绿（完成）/ ✗ 红（失败）/ · 灰（等待）
- 每行 flex 布局：状态图标 + 任务名（min-width:52px）+ 状态描述
- AI 流式输出日志；用户可随时插话（Space 语音），AI 吸收后继续

#### State 3 — Confirmation（等待确认）
```
[RMSNorm ⚠]  ~/workspace/RMSNorm-910B  Stage 04 · 等待确认
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ◆ dtype-check 发现 format 不兼容
    310P 不支持 FRACTAL_NZ → 建议切换为 ND

  [Y] 切换 ND 继续   [N] 暂停   [Space] 语音说明
  ❯ _
```
- AI 主动暂停，等决策
- 手机同步推送通知
- 支持键盘 Y/N 或 Space 语音回复

#### State 4 — Preview（结果预览）
```
[RMSNorm ⟳]  ~/workspace/RMSNorm-910B  Stage 06 · Preview
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┌─ 执行日志 ─────────┬─ 运行结果 ──────────────┐
│ ▸ tile_m 128 收敛  │ AI Core ████████  72.4% │
│ ▸ 精度验证 ✓       │ CUBE    ███████░  71.2% │← 点击
│ ▸ 兼容 910B/310P ✓ │ VECTOR  █████████ 88.1% │
│                    │ 内存带宽 ██████░░  67.3% │
│                    │ [点击区域锚定反馈]        │
└────────────────────┴─────────────────────────┘
  ESC 收起预览     Space 语音反馈
```
- 终端内分屏（单 session，不开新窗口）
- 右侧显示**运行结果可视化**（性能图），不是代码 diff
- 点击任意指标区域 → 锚定反馈气泡 → 语音/文字说预期
- AI 收到「区域 + 内容」后定向重新优化

#### State 5 — Completion（完成）
```
[RMSNorm ✓]  ~/workspace/RMSNorm-910B  Stage 06 · 完成
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✓ cube_util: 72.4% > 70%
  ✓ max_error: 8.3e-6 < 1e-5
  ✓ compat: 910B ✓ / 310P ✓
  ◆ 最优版本 tile_m=128 已存入团队库

  已存入记忆 · 本次优化路径 + 最终参数

  ❯ _   （输入新目标 / orca new 开启新 session）
```
- 展示验收摘要
- 「已存入记忆」：有新内容时显示，已知内容不重复提示
- 可直接输入下一个目标，或 `hai new` 新 session

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
| 3.3 | `s-bg-signal` | 行业验证 · 1/2 — AI 走向实体，硬件联动 | ~495 |
| 3.4 | `s-bg-signal2` | 行业验证 · 2/2 — Agent 编排进化 | ~546 |
| 3.5 | `s-bg3` | 代码是过程，结果才是产出物 | ~597 |
| 3.6 | `s-bg-community` | 昇腾社区知识转化（预热/响应/积累 + Before/After） | ~670 |
| 4 | `s-j-overview` | 用户旅程全景地图（5阶段×7维度，含社区知识行） | ~802 |
| 5 | `s-m4a` | 记忆启动 — 跨会话上下文 | ~1046 |
| 6 | `s-m2c` | 语音×光标 — 指着说话（三模式+浮动编辑面板） | ~1081 |
| 6.5 | `s-m2d` | 语音模式路由 — 上下文决定落地方式 | ~1251 |
| 7 | `s-m2b` | 手势 Prompt — Flow 不中断 | ~1358 |
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
| **多窗口必须重叠** | Mockup 中出现两个或以上窗口时，必须用 `position:absolute` 形成遮盖重叠（一个在左上，一个在右下），禁止顺序排列。窗口都要有 `border-radius:8px` 圆角。 |

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

`setupSlideSteps` 在检测到任意步骤含 `key` 属性时，自动向 `.dp-right` 注入 `<div class="key-badge">` 元素。

**CSS 样式（2026-05-23 重设计）：玻璃拟态大字居中浮层**
- 位置：`position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)`（水平垂直居中于 `.dp-right`）
- 背景：`background:rgba(255,255,255,.13);backdrop-filter:blur(22px) saturate(180%)`
- 边框：`border:1px solid rgba(255,255,255,.28)`，`border-radius:20px`
- 字号：`font-size:44px`（**Silkscreen 400**，像素风），`color:rgba(255,255,255,.96)`
- 动画：弹出 `.28s cubic-bezier(.22,1,.36,1)` scale(.82→1)，消失 `.15s ease-in`
- 停留：1.2s 后自动调用 `badge.classList.remove('kb-show')`
- `.dp-right` 必须有 `position:relative`（绝对定位的锚点）
- **字体**：Silkscreen 已加入 Google Fonts import（`family=Silkscreen:wght@400`）

各 section 的 `key` 分配：
- s-m4a 步骤1: `↵`，s-m2c 步骤2: `Space`
- s-m2b 步骤2: `⌘ K`，步骤3: `↵`
- s-m3b 步骤1: `/`，步骤2: `↵`
- s-m1b 步骤3: `⌘ K`
- s-m6a 步骤1: `/`

### JS：`setupSlideSteps(secId, stripId, defs)`
- `defs[i].ms`：步骤停留时长（act 在 ms 后触发，下一步在 ms+400 后启动）
- `defs[i].act`：步骤激活后延迟 `ms` 触发的回调（驱动 mockup 动效）
- `defs[i].immediate`：步骤激活时**立即同步**执行的回调（用于循环回到第1步时清空上一轮状态）
- `defs[i].key`：快捷键 badge 文字（自动注入 `.key-badge`）
- IntersectionObserver `threshold:0.4` 控制自动启停
- s-m6a 用 `3400ms`，其余各 section 根据动效节奏自定

> **`immediate` 使用场景**：当 section 循环回到 step 0 时，act 要等 ms 延迟才执行，会导致上一轮的 DOM 状态（如终端窗口）在新一轮开始时仍然可见。用 `immediate` 在切步瞬间同步清空，避免状态残留。

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
| `ff4c36d` | 行业验证分2页（实机截图+彩色底色 object-fit:contain）+ s-bg三道墙代码块高度修复（移除flex:1，HAI设计目标栏恢复可见）|
| *(2026-05-23)* | s-j-overview 旅程图重构：情绪曲线改为 Option B（SVG路径+HTML点/标签）、阶段描边移至底部全谱色（黄→紫）、grid行比例调整、痛点/机会点3条bullet、行标题变大、整体93%高度上下居中 |
| *(2026-05-23)* | key-badge 重设计：玻璃拟态大字居中浮层 + 弹性动画 + 1.2s自动消隐；修复 `.dp-right` 缺 `position:relative` 导致 Space badge 定位失效 |
| *(2026-05-23)* | s-bg3：左侧加 visibility:hidden 占位对齐；HAI设计原则底色改为 `var(--acc)` IKB深蓝 |
| *(2026-05-23)* | 新增 s-bg-community + s-bg-community2：昇腾社区知识三层内化框架 + 5阶段渗透地图 |
| *(2026-05-23)* | 清除全部假错误码 EZ9999/EZ6523（12处），替换为具体错误类型描述（format不兼容/UB溢出/shape推导失败）|
| `c94854e` | 社区知识整合进旅程图第7行（预热/响应/积累三时态，黄/青/粉配色）；删 s-bg-community2；恢复 s-bg-community；key-badge 换 Silkscreen 400，圆角 20px |
| *(2026-05-23)* | 社区行内容更新：扩展至文档/下载/课程/学习路径/活动全生态 |
| *(2026-05-23)* | s-m2c：语音波形浮层重设计（深色低饱和胶囊+蓝紫渐变细条）；右上角 Space chip 加圆角渐变；左侧新增三种交互模式；步骤3改为浮动编辑面板 |
| *(2026-05-23)* | 新增 s-m2d（语音模式路由）：触发逻辑路由表 + 三种模式 mockup 对比 |
| *(2026-05-24)* | 语音波形浮层换 A2 方案：蓝紫渐变底色+白色条+白色 drop-shadow 光晕；修复 display:none/display:flex 重复导致初始可见 bug；padding 改为对称 5px 22px，transcript 用 margin-left:8px 避免空时占位 |
| *(2026-05-24)* | s-m2c mockup 重设计：msprof 窗口（左上 78%×72%，圆角8px）+ 终端窗口（右下 56%×52%，圆角8px，step3出现），两窗口重叠；step3改为"发送到终端"模式，终端显示 hai ask 命令+HAI分析结果 |
| *(2026-05-24)* | top-nav 新增 ↺ 重置按钮：点击重置当前页 stepper 动效+DOM 状态，图标旋转360°反馈 |
| *(2026-05-24)* | setupSlideSteps 加 generation 计数器（gen++取消旧 setTimeout 链）+ window._stepperRestarts[secId] 注册表；新增 window._sectionDOMResets[secId] 注册表供各 section 注册 DOM 清理函数 |
| *(2026-05-23)* | s-m2d 动效重设计：3步骤各自独立的流程动画（发送/写入/编辑面板），initRouterDemo IIFE 自驱循环；编辑面板步骤使用 msprof（左上74%×65%）+ 编辑面板（右下60%×56%）重叠双窗口；新增多窗口必须重叠设计约定 |
| *(2026-05-24)* | top-nav 导航标签改为 "01 · 封面" 页码格式；重置图标最终方案：单段270° CW弧 + L形拐角（`M6 0v2h2`，从圆外侧向下接端点再向右），stroke-width 1.5 |
| *(2026-05-24)* | s-m2d col2（写入模式）语音识别和终端输入均改为中文："调整 tile_m 参数，目标 cube 利用率 70%" |
| *(2026-05-24)* | s-m2d 布局：文字列与表格列各 flex:1（50/50），间距 48px；表格第一列去除 `<br>` 改用 `·` 分隔（单行），cell padding 3px，font-size 7.5px |
| *(2026-05-24)* | setupSlideSteps 新增 `immediate` 回调（步骤切换时同步触发）；s-m2c step1 用 `immediate` 即时清空终端窗口和语音条，修复循环回到第1步时终端先于语音条出现的 bug |
| *(2026-05-25)* | 第8页（s-m4a）记忆启动 dp-body 补充 CLAUDE.md + context compact 真实痛点；BEFORE 面板改为"静态文件维护滞后 + compact 后遗忘当轮决策"两条具体场景 |
| *(2026-05-25)* | 第8页（s-m4a）mockup 重设计：从不清晰的卡片堆叠改为结构化终端加载序列——`hai start` 后三块记忆（会话上下文/性能基线/硬件约束矩阵）逐段出现，step 标签同步更新 |
| *(2026-05-25)* | 新增第16页 s-remote（移动监控）：Stage 05 · 随时介入。手机 mockup 展示 4 个 Agent 实时状态，步骤2收到 dtype-check format 不兼容推送，步骤3语音批准继续；引用 Claude Code Remote Control 2026 官方验证 |
| *(2026-05-25)* | 第9页（s-m2c）光标定位修复：改用 `getBoundingClientRect()` 动态计算 CUBE 行坐标，消除硬编码 52%/30% 在不同屏幕尺寸下偏差 |
| *(2026-05-25)* | ai-dev-tools-design.html：修复 JS 字符串中 48 处 `font-family:'DM Mono'` 单引号破坏外层字符串的语法错误，恢复旅程图和所有 Mockup 渲染 |
| `c9cad4c` | 新增 hai-cli-design.html（HAI CLI 完整设计体系，12 个设计点，134KB）+ cli-analysis-key-findings.md（核心结论速查 Markdown） |
| `255949f` | **WCAG AA 对比度修复**：`--td` #48485C（2:1）→ #828296（5.27:1）；修复两个 HTML 文件中共 200+ 处暗色终端文字；新增 **colors.css** 共用色表，两个 HTML 均 `<link>` 引入，各自 `:root{}` 只保留文件级覆盖 |
| `266dcd1` | s-cli-arch（第8页）：5状态终端行 `flex:1` → `height:185px`，恢复正常终端宽高比；s-m6a（光标伴侣）：`.clicky-app` 从浅灰 #F6F6FA 改为暗色 var(--tb)，msprof 标签/tab/气泡全部适配暗色主题 |
| `91ab5d1` | 更新 CLAUDE.md：记录 WCAG 修复、colors.css 共用色表、两处 UI 修复 |
| *(2026-05-25)* | **终端主题/PPT主题严格分离**：新增 `--ta #A78BFA`（紫色，终端专用强调色，WCAG AAA 7.7:1），将两个 HTML 文件中终端区域的所有 `color:var(--acc)` 改为 `color:var(--ta)`（hai-operator-design.html 56处，hai-cli-design.html 49处HTML+8处JS），同步更新 colors.css 和 CLAUDE.md |
| `6a04eb6` | `.goal-term` 加 `border-radius:10px`，修复终端面板无圆角问题 |
| `3767d06` | 产品更名 HAI → **ORCA**（Operator Runtime CANN Assistant）；State 1 新增 ORCA 欢迎屏（wordmark+全称+版本+快捷键）；终端面板外部标注产品名释义；State 2 加四态状态指示 ⟳/✓/✗/·（hai-cli-design.html + hai-operator-design.html 两文件同步） |
| `247fd0e` | **s-cli-arch（第8页）独立窗口重设计**：5个状态从共享单窗口改为各自独立 macOS chrome + ORCA status bar + 内容区；Row1（S1→S2→S3）+ Row2（S4→S5，右对齐）双行排列；箭头列 28px 间隔；State 3 红色边框+RMSNorm ⚠ pulse 动画；State 5 绿色边框 |
| `d72b055` | s-m4a（第9页）记忆自动加载重设计：不需要显式 `orca start` 命令，任意任务指令触发自动恢复；终端输入改为自然任务 `继续优化 RMSNorm`；s-m3b（第12页）Goal 命令改为中文自然语言输入，条件标签全部汉化 |
| `75a841c` | 新增 s-m2e 情感感知：语音情绪识别（能量/语速/音调）→ 符号（⚡/‼/≈/·）→ AI 策略自适应；3步骤 Mockup；Stage 02 编号 1/3→1/4, 2/3→2/4, 3/3→4/4 |

### ai-dev-tools-design.html 专项工作（更早）

| commit | 内容 |
|---|---|
| `d26df5a` | 修复 Stage 02（Space badge、手势结果Q4行、s-m6a鼠标光标跟随三角形） |
| `c1e12e9` | 修复 s-m1b 看板：phase-based（正常→异常高亮→注入指令） |

---

## hai-operator-design.html 关键设计说明

### 共用色表（colors.css）— 2026-05-25 新增

所有颜色令牌集中在 `/Users/hsin/Documents/Coding/CLI/colors.css`，两个 HTML 文件均通过 `<link rel="stylesheet" href="colors.css">` 引入。

**修改颜色只改 colors.css 一处，所有文件自动生效。**

| 变量 | 值 | 用途 | WCAG（on --tb） |
|---|---|---|---|
| `--acc` | `#002FA7` | IKB 克莱因蓝主色（**PPT/浅色背景专用**） | 1.87:1 ❌ 禁止在终端文字中使用 |
| `--ta` | `#A78BFA` | **终端强调色**（terminal accent，深色背景专用，紫色） | **7.7:1 ✓ AAA** |
| `--td` | `#828296` | 终端次要文字 | **5.27:1 ✓ AA** |
| `--tw` | `#C8C8DC` | 终端主要文字 | 12.3:1 ✓ AAA |
| `--tb` | `#0C0C11` | 终端背景 | — |
| `--tbar` | `#181820` | 终端标题栏 | — |
| `--tbdr` | `#252530` | 终端边框 | — |

**⚠️ 两套主题严格分离（不可混用）：**
- **PPT 主题**：`--acc #002FA7` 用于幻灯片边框、标签、按钮填充——只在浅色背景（`--bg #fafaf8`）上使用
- **终端主题**：`--ta #A78BFA`（紫色）用于深色终端内所有强调色文字——只在 `--tb #0C0C11` 背景上使用
- `#002FA7` 在 `#0C0C11` 上对比度仅 **1.87:1**，基本不可见，**严禁**在终端内做文字颜色
- 凡终端区域内的 `color:var(--acc)` 均为错误，必须改为 `color:var(--ta)`

**文件级覆盖（各 HTML 自己的 `:root{}`）：**
- `hai-operator-design.html`：`--tp:#4A7FE8`（用 IKB 蓝替代终端紫色槽位）
- `hai-cli-design.html`：无覆盖，全部使用 colors.css 默认值

> ⚠️ `--td` 旧值 `#48485C` 对比度仅 2:1，禁止再使用。终端内暗色文字统一用 `color:var(--td)`，不得硬编码 `#48485C`。

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
s-cover → s-bg → s-bg2 → s-bg-signal（行业验证1/2）→ s-bg-signal2（行业验证2/2）→ s-bg3
→ s-bg-community（社区知识转化）
→ s-j-overview
→ s-m4a（记忆启动）
→ s-m2c（语音×光标）→ s-m2d（语音模式路由）
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

### s-m2c 语音Mockup动画流程（已更新）
1. 步骤1：白色光标滑到 CUBE 行（`left:52% top:30%`），行背景高亮蓝色
2. 步骤2：语音波形浮层出现（底部居中，深色低饱和胶囊，蓝紫渐变细条×18根），文字逐字转录
3. 步骤3：波形消失，弹出**浮动编辑面板**（深色卡片，标题栏+「导入终端」蓝紫渐变按钮，可编辑文字区）

**左侧设计点新增「松开后的三种模式」：**
- 写入：填入终端输入行，光标停末尾，按 Enter 确认
- 发送：识别完成直接执行，适合短指令
- 编辑（高亮）：浮动编辑面板，自由修改后导入终端——解决终端选字难问题

**语音波形浮层样式：**
- 位置：`bottom:8px;left:50%;transform:translateX(-50%)`，胶囊内 padding 均匀 `5px 20px`
- 背景：`rgba(18,18,26,.92)` 深色低饱和，不用蓝紫渐变背景
- 波形条：1px 宽，蓝→紫渐变 `linear-gradient(to top,#002FA7,#6B38D4)`，18根，gap 1.5px
- transcript 文字在波形右侧，`gap:10px` 分隔

**右上角 Space 提示 chip：**
- 蓝→紫渐变背景 `linear-gradient(135deg,#002FA7,#6B38D4)`，`border-radius:20px`

### s-m2d 语音模式路由（新增页）
- **布局**：上方文字列（设计说明）+ 路由表格各 flex:1（50/50），gap:48px；下方三列 mockup
- **路由表格**：4行，第一列单行显示（用 `·` 分隔条件），cell padding 3px，font-size 7.5px
- **col2（写入模式）**：语音识别和终端填入均为中文 `调整 tile_m 参数，目标 cube 利用率 70%`
- **右侧三列 mockup**：发送/写入/编辑面板并列，各自独立 IIFE 自驱动画循环
- 插入位置：s-m2c 之后，s-m6a 之前

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
- Card 04 ORCA：`background:var(--acc)` IKB 蓝，白色文字，flex:1.4

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

### s-j-overview 用户旅程（2026-05-23 重构）

**网格布局：**
```css
grid-template-columns: 46px repeat(5,1fr);
grid-template-rows: 1.5fr 1fr 1fr 1.3fr 1fr 1fr;
/* 6行：阶段标题 / 用户行为 / 触点 / 情绪曲线 / 痛点 / 机会点 */
```
整体高度：占容器 93%，`.inner` 设 `justify-content:center` 上下居中。

**阶段描边（border-bottom，在阶段标题行底部）：**
- 01: `4px solid #fbbf24`（黄），02: `4px solid #4ade80`（绿）
- 03: `4px solid #22d3ee`（青），04: `4px solid #60a5fa`（蓝），05: `4px solid #c084fc`（紫）

**阶段分隔线：** `border-right:.5px solid rgba(255,255,255,.2)` 列间隔（最后列不加）

**情绪曲线（Option B）：**
- SVG 只画路径和渐变（`preserveAspectRatio="none"`）
- Labels（积极/消极）和圆点（5个）用 HTML 绝对定位元素，不受 SVG 拉伸影响
- 折线从左下→右上（Stage01积极度低，逐渐升高）：`M90,42 L268,12 L450,13 L635,10 L820,8`
- 点坐标：left 10%/29.8%/50%/70.6%/91.1%，top 70%/20%/21.7%/16.7%/13.3%

**痛点/机会点行：** 每格 3 条 bullet，font-size 约 7px

**行标题（左侧 46px 列）：** font-size:9px，letter-spacing:.05em

### s-bg-community / s-bg-community2 社区知识转化（已完成 2026-05-23）

**命题：** 昇腾社区的经验知识在 ORCA 时代如何渗透进工具，而非消失。

**s-bg-community — 三层内化框架：**
- L1 训练层：社区帖子/issue/PR 作为训练数据 → ORCA 离线感知社区智慧
- L2 检索层：RAG 实时召回社区片段 → 回答时注入上下文
- L3 沉淀层：用户交互反馈形成个性化知识库 → 越用越懂算子习惯
- Before/After 对比：30min 手动社区搜索 vs. <10s ORCA 直接给出答案

**s-bg-community2 — 渗透地图：**
- 5阶段（算子开发5步）× 知识类型（格式规范/调试案例/性能技巧/芯片差异/优化经验）矩阵
- 每格有 terminal mockup 片段，展示 ORCA 如何在该阶段引用社区知识
- 底部：知识飞轮（Knowledge Flywheel）可视化

### s-m1c 实体状态灯（已完成 2026-05-23）

灵感：Cursor × Luxafor USB 硬件联动。

**桌面场景 Mockup 结构（3个flex兄弟）：**
1. **MacBook 笔记本**（`flex:1`）
   - 铝色边框（`#b0b0b0` 渐变，模拟铝合金）
   - 屏幕：`aspect-ratio:16/10`，深蓝壁纸渐变 + 双径向光斑
   - 菜单栏（`height:14px`，半透明模糊）
   - 浮动 Terminal 窗口（带 macOS 红黄绿标题栏点 + tl-s1..7 终端内容）
   - Dock（半透明，Finder/ORCA/Terminal/VSCode/Chrome/Slack/Trash）
   - 键盘底座（铝色，两排按键暗示）+ 触控板
2. **SVG USB 线**（`width:24px`，bezier 曲线从笔记本右侧弯向交通灯USB口）
3. **交通灯硬件设备**（`flex-shrink:0, width:36px`）
   - 圆角顶盖/底盖，渐变侧面（3D感），左侧高光条
   - 三个凹陷灯槽（inner shadow）+ 内部灯圈
   - USB 颈部 + USB 插头 + ORCA LINK 标签

**三个状态：**
- Phase 1：黄灯常亮，终端显示 s2-s3（运行日志），statusChip=RUNNING
- Phase 2：红黄交替闪烁（setInterval 550ms），终端显示 s2-s5（警告），statusChip=CONFIRM
- Phase 3：绿灯常亮，终端显示 s2-s3+s6-s7（完成），statusChip=DONE

**JS IDs：** `tl-red/yellow/green`（灯圈）、`tl-s1..7`（终端行）、`tl-status-chip`、`tl-state-bar/dot/title/desc`

### s-cli-arch 5状态独立终端窗口（2026-05-25 重设计）

**⚠️ 5个状态各自是独立的 macOS 终端窗口，不共享外层框架。**

布局：双行网格
- Row 1：S1（初始）→ 箭头 → S2（执行中）→ 箭头 → S3（等待确认）
- Row 2：S4（结果预览）→ 箭头 → S5（完成），右对齐
- 网格列：`grid-template-columns:1fr 28px 1fr 28px 1fr`

每个状态窗口结构：macOS chrome（6px 三点）+ ORCA status bar（tab + 路径 + 阶段标签）+ 内容区 + 输入提示

边框颜色区分：
- S3：`rgba(248,113,113,.35)` 红色 + RMSNorm ⚠ pulse 动画
- S4：`rgba(0,47,167,.4)` IKB 蓝
- S5：`rgba(52,211,153,.3)` 绿色

### s-m4a 记忆自动加载（2026-05-25 重设计）

**⚠️ 不需要显式 `orca start` 或"加载记忆"命令。**

设计原则：用户输入任意真实任务指令（如 `继续优化 RMSNorm，目标 cube 利用率 > 70%`），ORCA 自动检测 workspace 并恢复历史上下文。

- 终端输入：`❯ 继续优化 RMSNorm，目标 cube 利用率 > 70%`
- 自动加载提示：`正在恢复工作区记忆…`（灰色斜体，非醒目提示）
- Step 标签：step1 "输入任务指令" / step2 "自动加载上下文" / step3 "恢复完成，继续工作"

### s-m3b Goal 命令（2026-05-25 更新）

**Goal 命令输入使用中文自然语言，不用英文参数格式。**

- 输入：`❯ /goal cube 利用率 > 70%，精度误差 < 1e-5，兼容 910B 和 310P`
- 提示符：`❯`（不用 `$`）
- 条件面板标签全部汉化：`cube 利用率 > 70%` / `精度误差 < 1e-5` / `硬件兼容：910B · 310P`

### s-bg-signal / s-bg-signal2 行业验证（已完成 2026-05-23）

2页，每页 2×2 网格（普通卡 + wide卡 全列），图片左侧（54-58%）+ 文字右侧布局。
图片用 `object-fit:contain` + 彩色背景色（全图可见，无裁剪）。

**Page 1（行业验证 1/2 — AI 走向实体）：**
| 卡片 | 产品 | 背景色 | 印证 |
|---|---|---|---|
| ① | Claude Desktop Buddy（Anthropic 开源，ESP32-S3）| `#1a1a24` | s-m1c 实体状态灯 |
| ② | M5Stack Cardputer "Code w/ Claude" 现场活动 | `#eeecea` | AI 走向实体 |
| ③（wide）| Devin 2.0 多 Agent 并行看板 | `#0d0d14` | s-m1b 并行 Agent 看板 |

**Page 2（行业验证 2/2 — Agent 编排进化）：**
| 卡片 | 产品 | 背景色 | 印证 |
|---|---|---|---|
| ④ | Warp ADE 开源（Claude Code / Codex / Gemini CLI 共享上下文）| `#0d0d14` | 终端=Agent编排中心 |
| ⑤ | GitHub Copilot Agent Mode 跨文件自主编辑 | `#0d0d14` | s-m1a Agent 自主执行 |
| ⑥（wide）| Claude Code Agent View 多会话统一看板 | `#0a0a10` | s-m1a Agent View |

---

## 待办（按优先级）

### 高优先级
- [ ] **Cardputer 图换清晰图片** — 现有 Espressif WeChat 截图看不清楚设备，需换一张能清晰看到 M5Stack Cardputer 实机的图
- [ ] **Warp 卡片强调"开源"** — 用户说 Warp 的重点是"开源"这件事，卡片文字可更突出 open source 决定的意义

### 低优先级
- [ ] s-m2a cursor demo 最终验证
- [ ] 旅程地图页内容验证
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
| `window.memSetPhase(1/2/3)` | s-m4a | 任务指令触发/自动加载上下文/高亮当前会话 |
| `window.cursorSetPhase(0/1/2)` | s-m2a | 光标移动到targets[index] |
| `window.agvSetPhase(1/2/3)` | s-m1a | tbe-gen运行/shape-infer报警/全部完成 |
| `window.reviewSetPhase(1/2/3)` | s-m5a | 切换tab: perf/prec/cstr |
| `window.libSetPhase(1/2/3)` | s-m4b | 高亮算子库列/高亮调试库列/高亮推荐条 |
| `window.trafficSetPhase(1/2/3)` | s-m1c | 黄灯（思考）/红黄闪（确认）/绿灯（完成）|
| `window.moodSetPhase(1/2/3)` | s-m2e | 语音分析仪表盘/情绪徽章/AI 自适应响应 |
