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
  target:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
};

window.NAV_CONFIG = {
  stages: [
    { id: 'context', label: '背景洞察', num: 'BG',
      tps: [
        { id: 'tp-cli-trend',     icon: I.progress, label: 'CLI 崛起趋势',  file: 'tp-context.html#tp-cli-trend' },
        { id: 'tp-opencode-gaps', icon: I.summary,  label: 'OpenCode 不足', file: 'tp-context.html#tp-opencode-gaps' },
      ]
    },
    { id: 'overview', label: '概览', num: '00',
      tps: [
        { id: 'framework',    icon: I.framework, label: '页面框架',      file: 'index.html#framework' },
        { id: 'tp-ma-arch',   icon: I.agents,    label: '多智能体架构',  file: 'index.html#tp-ma-arch' },
        { id: 'tp-ma-ui',     icon: I.panel,     label: 'Agent 管理面板', file: 'index.html#tp-ma-ui' },
      ]
    },
    { id: 'startup', label: '启动', num: '01',
      tps: [
        { id: 'tp-banner',     icon: I.banner, label: 'Banner 启动信息',  file: 'tp-startup.html#tp-banner' },
        { id: 'tp-input-pos',  icon: I.input,  label: '输入框 位置形态',  file: 'tp-intent.html#tp-input-pos' },
        { id: 'tp-input-edit', icon: I.edit,   label: '输入框 编辑能力',  file: 'tp-intent.html#tp-input-edit' },
      ]
    },
    { id: 'intent', label: '表达意图', num: '02',
      tps: [
        { id: 'tp-mode',       icon: I.mode,    label: '模式指示符',   file: 'tp-intent.html#tp-mode' },
        { id: 'tp-at',         icon: I.at,      label: '添加上下文',   file: 'tp-intent.html#tp-at' },
        { id: 'tp-chips',      icon: I.chips,   label: 'Context Chips', file: 'tp-intent.html#tp-chips' },
        { id: 'tp-model',      icon: I.model,   label: '模型选择器',   file: 'tp-intent.html#tp-model' },
        { id: 'tp-history',    icon: I.history, label: '历史记录',     file: 'tp-intent.html#tp-history' },
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
      ]
    },
    { id: 'iterate', label: '迭代修正', num: '05',
      tps: [
        { id: 'tp-fork',    icon: I.fork,    label: '/fork & /clear', file: 'tp-review.html#tp-fork' },
        { id: 'tp-esc',     icon: I.esc,     label: 'Esc 中断',      file: 'tp-review.html#tp-esc' },
      ]
    },
    { id: 'wrapup', label: '收尾', num: '06',
      tps: [
        { id: 'tp-summary',     icon: I.summary, label: '会话摘要卡', file: 'tp-wrapup.html#tp-summary' },
        { id: 'design-summary', icon: I.target,  label: '设计总结',   file: 'tp-wrapup.html#design-summary' },
      ]
    },
  ]
};

function buildNav(currentFile, activeStageId, activeTpId) {
  const cfg = window.NAV_CONFIG;

  // Build secStageMap: section id → stage id
  const secStageMap = {};
  cfg.stages.forEach(stage => stage.tps.forEach(tp => { secStageMap[tp.id] = stage.id; }));

  // Inject a .section-nav into every .section[id] that has a known tp mapping
  document.querySelectorAll('.section[id]').forEach(section => {
    const secId = section.id;
    const baseId = secId.replace(/-rec$/, '');
    if (!secStageMap[secId] && !secStageMap[baseId]) return; // skip unmapped sections (e.g. cover)
    const stageId = secStageMap[secId] || secStageMap[baseId] || activeStageId;
    const tpId    = secStageMap[secId] ? secId : (secStageMap[baseId] ? baseId : null);
    const stageData = cfg.stages.find(s => s.id === stageId);

    const stagesHTML = cfg.stages.map(s => {
      const active = s.id === stageId;
      return `<button class="nav-stage-btn${active ? ' active' : ''}" onclick="switchStage('${s.id}')" data-stage="${s.id}"><span class="snum">${s.num}</span><span class="sname">${s.label}</span></button>`;
    }).join('');

    const tpHTML = stageData ? stageData.tps.map(tp => {
      const active = tp.id === tpId;
      return `<a class="nav-tp-btn${active ? ' active' : ''}" href="${tp.file}" data-tp="${tp.id}"><span class="tp-icon-svg">${tp.icon}</span>${tp.label}</a>`;
    }).join('') : '';

    const navEl = document.createElement('div');
    navEl.className = 'section-nav';
    navEl.innerHTML = `<div class="nav-stages">${stagesHTML}</div>${tpHTML ? `<div class="sn-tp-bar">${tpHTML}</div>` : ''}`;
    section.appendChild(navEl);
  });
}

function switchStage(stageId) {
  const stage = NAV_CONFIG.stages.find(s => s.id === stageId);
  if (stage && stage.tps.length) window.location.href = stage.tps[0].file;
}

function scrollToSection(container, idx, instant) {
  container.scrollTo({ top: idx * container.clientHeight, behavior: instant ? 'instant' : 'smooth' });
}

function scrollToHash(container, hash) {
  if (!hash) return;
  const sections = [...container.querySelectorAll('.section[id]')];
  const el = container.querySelector(hash);
  if (!el) return;
  const idx = sections.indexOf(el);
  if (idx >= 0) scrollToSection(container, idx, true); // instant to bypass scroll-snap-stop:always
}

function initSnapScroll(stageId) {
  const container = document.querySelector('.snap-container');
  if (!container) return;
  const hash = window.location.hash;
  if (hash) requestAnimationFrame(() => scrollToHash(container, hash));
  // Handle same-page hash changes (e.g. clicking a stage tab while already on this page)
  window.addEventListener('hashchange', () => scrollToHash(container, window.location.hash));
}

function initKeyNav() {
  const container = document.querySelector('.snap-container');
  if (!container) return;
  let busy = false;
  document.addEventListener('keydown', e => {
    if (busy) return;
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'PageDown' && e.key !== 'PageUp') return;
    e.preventDefault();
    const sections = [...container.querySelectorAll('.section[id]')];
    const cur = Math.round(container.scrollTop / container.clientHeight);
    const next = (e.key === 'ArrowDown' || e.key === 'PageDown')
      ? Math.min(cur + 1, sections.length - 1)
      : Math.max(cur - 1, 0);
    busy = true;
    scrollToSection(container, next);
    setTimeout(() => { busy = false; }, 600);
  });
}
