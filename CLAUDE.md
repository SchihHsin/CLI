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
| 3.5 | `s-bg3` | 代码是过程，结果才是产出物（新增） | ~527 |
| 4 | `s-j-overview` | 用户旅程全景地图（7阶段×6维度） | ~640 |
| 5 | `s-m4a` | 记忆启动 — 跨会话上下文 | ~1046 |
| 6 | `s-m2c` | 语音×光标 — 指着说话 | ~818 |
| 7 | `s-m2b` | 手势 Prompt — Flow 不中断 | ~748 |
| 8 | `s-m2a` | 光标即上下文 — 停顿触发 AI | ~681 |
| 9 | `s-m3b` | Goal 命令 — 开发者定义完成 | ~967 |
| 10 | `s-m1a` | Agent View — 多会话统一管理 | ~539 |
| 11 | `s-m1b` | 并行看板 — 所有 Agent 一屏总览 | ~628 |
| 12 | `s-m3a` | 智能 Fix — 一键上下文修复 | ~908 |
| 13 | `s-m5a` | 结果审核 — 多维可视化 | ~1184 |
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
所有 12 个设计幻灯片（s-m1a / s-m1b / s-m2a / s-m2b / s-m2c / s-m3a / s-m3b / s-m4a / s-m4b / s-m5a / s-m5b / s-m6a）的 dp-right 区域 mockup-label 下方，均新增了一条用户流程步骤指示条。

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

### JS：`initStepper(secId, stripId, ms, onStep)`
- `ms`：每步停留时长（最后一步停留 `ms × 2.5`）
- `onStep`：目前全部传 `null`（视觉与动画独立推进）
- IntersectionObserver `threshold:0.4` 控制自动启停
- 12 幻灯片中 s-m6a 用 `3400ms`（与 initClicky 飞行节奏对齐），其余 `2300ms`

---

## 已完成（本轮会话）

| commit | 内容 |
|---|---|
| `bd663c8` | 快捷键 badge 放大（font 8→12px，padding 增大） |
| `11b60df` | s-m2a / s-m2b / s-m5a ba-before 移除过程态代码，换成渲染结果 UI |
| `4ed0704` | 新增 s-bg3：代码是过程→结果是产出物，三步动画演示 |
| `a463d0b` | 修复：光标全白、导航遮挡、Agent View 分阶段、s-m6a 简化、Goal key 去掉 |
| `fcb7cdc` | 修复 Stage 01 (s-m4a)：记忆窗口数量 1→3 分阶段显示 |
| `818e7b7` | 修复 Stage 03 (s-m3b)：Goal 三个面板顺序出现（cmd→进度→log） |

---

## 待办（按优先级）

### 紧急 — 用户明确指出的 Bug
- [ ] **s-m1b 看板**：mockup 看不出设计价值，需要 phase-based 动画（正常→异常高亮→注入指令）
- [ ] **s-m2c (Stage 02 1/3)**：Space 唤醒语音的快捷键未显示
- [ ] **s-m2b (Stage 02 2/3)**：AI 修改建议后，结果未展示（表格数据应更新）
- [ ] **s-m2a (Stage 02 3/3)**：sim-cursor 点击位置错误
- [ ] **s-m6a 光标伴侣**：白色鼠标光标应跟随紫色三角形飞行，目前没有

### 低优先级 — 锦上添花
- [ ] 旅程地图情绪曲线缺 `ResizeObserver`（窗口 resize 后 SVG 宽度不更新）
- [ ] 总结页可考虑加设计系统全览对比图

---

## 全局 window 函数速查

| 函数 | 所在 Section | 作用 |
|---|---|---|
| `window.agvSetPhase(1/2/3)` | s-m1a | Agent View 显示 2/4/5 个会话 |
| `window.memSetPhase(1/2/3)` | s-m4a | 记忆窗口数量 1/3(暗)/3(亮) |
| `window.goalShowPanel(1/2/3)` | s-m3b | Goal 面板：仅命令/+进度框/+日志 |
| `window.dashSetPhase(1/2/3)` | s-m1b | 看板：正常/异常高亮/注入指令（待实现） |
