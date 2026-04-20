/* nav.js — Global Navigation Logic, SVG icons */

const I = {
  map:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M9 3L3 6v15l6-3 6 3 6-3V3l-6 3-6-3z"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>`,
  framework: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
  banner:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><rect x="3" y="5" width="18" height="14" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="8" y1="5" x2="8" y2="9"/></svg>`,
  agents:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><circle cx="12" cy="12" r="3"/><circle cx="3" cy="6" r="2"/><circle cx="21" cy="6" r="2"/><circle cx="3" cy="18" r="2"/><circle cx="21" cy="18" r="2"/><line x1="5" y1="6" x2="9" y2="11"/><line x1="19" y1="6" x2="15" y2="11"/><line x1="5" y1="18" x2="9" y2="13"/><line x1="19" y1="18" x2="15" y2="13"/></svg>`,
  panel:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>`,
  input:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><rect x="3" y="7" width="18" height="10" rx="2"/><line x1="7" y1="12" x2="7" y2="12" stroke-width="2.5"/><line x1="9" y1="10" x2="9" y2="14"/></svg>`,
  edit:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  mode:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`,
  at:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/></svg>`,
  chips:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><rect x="2" y="8" width="8" height="8" rx="4"/><rect x="14" y="8" width="8" height="8" rx="4"/><line x1="10" y1="12" x2="14" y2="12"/></svg>`,
  model:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
  history:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><polyline points="12 7 12 12 15 15"/></svg>`,
  thinking:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  toolcall:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  progress:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>`,
  compact:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="10" y1="14" x2="21" y2="3"/><line x1="3" y1="21" x2="14" y2="10"/></svg>`,
  lock:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  diff:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>`,
  accept:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  review:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="14" y1="9" x2="19" y2="9"/><line x1="14" y1="13" x2="19" y2="13"/><line x1="14" y1="17" x2="19" y2="17"/></svg>`,
  token:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  fork:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>`,
  esc:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
  summary:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
};

window.NAV_CONFIG = {
  stages: [
    { id: 'overview', label: '概览', num: '00',
      tps: [
        { id: 'journey',   icon: I.map,       label: '用户旅程', file: 'index.html#journey' },
      ]
    },
    { id: 'startup', label: '启动', num: '01',
      tps: [
        { id: 'framework', icon: I.framework, label: '页面框架',         file: 'index.html#framework' },
        { id: 'tp-banner',  icon: I.banner,  label: 'Banner 启动信息', file: 'tp-startup.html#tp-banner' },
        { id: 'tp-ma-arch', icon: I.agents,  label: '多智能体架构',    file: 'tp-multiagent.html#tp-ma-arch' },
        { id: 'tp-ma-ui',   icon: I.panel,   label: 'Agent 管理面板',  file: 'tp-multiagent.html#tp-ma-ui' },
      ]
    },
    { id: 'intent', label: '表达意图', num: '02',
      tps: [
        { id: 'tp-input-pos',  icon: I.input,   label: '输入框 位置形态', file: 'tp-intent.html#tp-input-pos' },
        { id: 'tp-input-edit', icon: I.edit,    label: '输入框 编辑能力', file: 'tp-intent.html#tp-input-edit' },
        { id: 'tp-mode',       icon: I.mode,    label: '模式指示符',      file: 'tp-intent.html#tp-mode' },
        { id: 'tp-at',         icon: I.at,      label: '@ 文件补全',      file: 'tp-intent.html#tp-at' },
        { id: 'tp-chips',      icon: I.chips,   label: 'Context Chips',   file: 'tp-intent.html#tp-chips' },
        { id: 'tp-model',      icon: I.model,   label: '模型选择器',      file: 'tp-intent.html#tp-model' },
        { id: 'tp-history',    icon: I.history, label: '历史记录',        file: 'tp-intent.html#tp-history' },
      ]
    },
    { id: 'execute', label: '等待执行', num: '03',
      tps: [
        { id: 'tp-thinking', icon: I.thinking, label: 'Thinking 折叠块',  file: 'tp-execute.html#tp-thinking' },
        { id: 'tp-toolcall', icon: I.toolcall, label: 'Tool Call 标签流', file: 'tp-execute.html#tp-toolcall' },
        { id: 'tp-progress', icon: I.progress, label: '进度条 Spinner',   file: 'tp-execute.html#tp-progress' },
        { id: 'tp-compact',  icon: I.compact,  label: '上下文压缩提示',   file: 'tp-execute.html#tp-compact' },
        { id: 'tp-perm',     icon: I.lock,     label: '权限确认弹窗',     file: 'tp-execute.html#tp-perm' },
      ]
    },
    { id: 'review', label: '审查确认', num: '04',
      tps: [
        { id: 'tp-diff',    icon: I.diff,    label: 'Diff 高亮',     file: 'tp-review.html#tp-diff' },
        { id: 'tp-accept',  icon: I.accept,  label: 'Accept/Reject', file: 'tp-review.html#tp-accept' },
        { id: 'tp-review',  icon: I.review,  label: 'Review Panel',  file: 'tp-review.html#tp-review' },
        { id: 'tp-token',   icon: I.token,   label: 'Token 费用',    file: 'tp-review.html#tp-token' },
        { id: 'tp-fork',    icon: I.fork,    label: '/fork & /clear', file: 'tp-review.html#tp-fork' },
        { id: 'tp-esc',     icon: I.esc,     label: 'Esc 中断',      file: 'tp-review.html#tp-esc' },
        { id: 'tp-summary', icon: I.summary, label: '会话摘要卡',    file: 'tp-review.html#tp-summary' },
      ]
    },
  ]
};

function buildNav(currentFile, activeStageId, activeTpId) {
  const cfg = window.NAV_CONFIG;
  const logoHTML = `<a class="nav-logo" href="index.html"><div class="nav-logo-dot"></div><span class="nav-logo-text">AI CLI 设计报告</span></a>`;
  const stagesHTML = cfg.stages.map(stage => {
    const isActive = stage.id === activeStageId;
    return `<button class="nav-stage-btn ${isActive ? 'active' : ''}" onclick="switchStage('${stage.id}')" data-stage="${stage.id}"><span class="snum">${stage.num}</span><span class="sname">${stage.label}</span></button>`;
  }).join('');
  const navEl = document.getElementById('global-nav');
  if (navEl) navEl.innerHTML = logoHTML + `<div class="nav-stages">${stagesHTML}</div>`;
  updateTpBar(activeStageId, activeTpId);
}

function updateTpBar(stageId, activeTpId) {
  const cfg = window.NAV_CONFIG;
  const stage = cfg.stages.find(s => s.id === stageId);
  const tpBar = document.getElementById('nav-tp-bar');
  if (!tpBar || !stage) return;
  tpBar.innerHTML = stage.tps.map(tp => {
    const isActive = tp.id === activeTpId;
    return `<a class="nav-tp-btn ${isActive ? 'active' : ''}" href="${tp.file}" data-tp="${tp.id}"><span class="tp-icon-svg">${tp.icon}</span>${tp.label}</a>`;
  }).join('');
}

function switchStage(stageId) {
  const cfg = window.NAV_CONFIG;
  const stage = cfg.stages.find(s => s.id === stageId);
  if (!stage || !stage.tps.length) return;
  document.querySelectorAll('.nav-stage-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.stage === stageId));
  updateTpBar(stageId, null);
  window.location.href = stage.tps[0].file;
}

function initSnapScroll(stageId) {
  const container = document.querySelector('.snap-container');
  if (!container) return;
  const sections = [...document.querySelectorAll('.section[id]')];
  const tpBar = document.getElementById('nav-tp-bar');

  // Build section→stage map from NAV_CONFIG
  const secStageMap = {};
  NAV_CONFIG.stages.forEach(stage => {
    stage.tps.forEach(tp => {
      secStageMap[tp.id] = stage.id;
    });
  });

  let lastStage = stageId;

  function onScroll() {
    const scrollTop = container.scrollTop;
    let activeId = null;
    sections.forEach(sec => { if (scrollTop >= sec.offsetTop - container.clientHeight * 0.4) activeId = sec.id; });
    if (activeId) {
      tpBar && tpBar.querySelectorAll('.nav-tp-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.tp === activeId));
      // Update stage highlight if changed
      const newStage = secStageMap[activeId] || stageId;
      if (newStage !== lastStage) {
        lastStage = newStage;
        document.querySelectorAll('.nav-stage-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.stage === newStage));
        updateTpBar(newStage, activeId);
      }
    }
  }
  container.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initKeyNav() {
  const container = document.querySelector('.snap-container');
  if (!container) return;
  document.addEventListener('keydown', e => {
    const sections = [...document.querySelectorAll('.section[id]')];
    let currentIdx = 0;
    sections.forEach((sec, i) => { if (container.scrollTop >= sec.offsetTop - 10) currentIdx = i; });
    if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); const next = sections[currentIdx + 1]; if (next) container.scrollTo({ top: next.offsetTop, behavior: 'smooth' }); }
    else if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); const prev = sections[Math.max(0, currentIdx - 1)]; if (prev) container.scrollTo({ top: prev.offsetTop, behavior: 'smooth' }); }
  });
}
