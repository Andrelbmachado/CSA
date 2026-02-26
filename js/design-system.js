/* ============================================
   AgroHub / CSA — Design System Page Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('app-header').innerHTML = renderHeader('design-system');
  document.getElementById('app-footer').innerHTML = renderFooter();
  initMobileMenu();

  renderSidebar();
  renderAllSections();
  initSidebarScroll();
  initIconSearch();
  initIconSizeToggle();
});

/* ── Sidebar Links ── */
const DS_SECTIONS = [
  { id: 'overview', label: 'Visão Geral', icon: 'eye' },
  { id: 'colors', label: 'Cores', icon: 'sun' },
  { id: 'typography', label: 'Tipografia', icon: 'edit' },
  { id: 'spacing', label: 'Espaçamento', icon: 'arrowRight' },
  { id: 'icons', label: 'Iconografia', icon: 'star' },
  { id: 'components', label: 'Componentes', icon: 'settings' },
  { id: 'rules', label: 'Regras de Programação', icon: 'lock' },
];

function renderSidebar() {
  const nav = document.getElementById('ds-sidebar-nav');
  nav.innerHTML = DS_SECTIONS.map((s, i) => `
    <a href="#${s.id}" class="ds-sidebar-link${i === 0 ? ' active' : ''}">
      ${Icons[s.icon](16)} ${s.label}
    </a>
  `).join('');
}

function initSidebarScroll() {
  const links = document.querySelectorAll('.ds-sidebar-link');
  const sections = DS_SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean);

  function updateActive() {
    let current = '';
    sections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if (top < 120) current = section.id;
    });
    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
}

/* ── Render All Sections ── */
function renderAllSections() {
  const main = document.getElementById('ds-main');
  main.innerHTML = [
    renderOverview(),
    renderColors(),
    renderTypography(),
    renderSpacing(),
    renderIcons(),
    renderComponentsSection(),
    renderRules(),
  ].join('');
}

/* ── Overview ── */
function renderOverview() {
  return `
  <section class="ds-section" id="overview">
    <h2 class="ds-section-title">Visão Geral</h2>
    <p class="ds-section-desc">
      O Design System da <strong>CSA — Comunidade que Sustenta a Agricultura</strong> 
      documenta todas as diretrizes visuais, tokens de design, componentes e regras de 
      programação utilizados na plataforma. Este sistema garante consistência visual e 
      facilita o desenvolvimento colaborativo.
    </p>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:var(--space-4);">
      <div class="card" style="padding:var(--space-6);text-align:center;">
        <div style="color:var(--green-primary);margin-bottom:var(--space-3);">${Icons.sun(32)}</div>
        <h4 style="font-size:var(--font-size-base);margin-bottom:var(--space-2);">Paleta de Cores</h4>
        <p style="font-size:var(--font-size-sm);color:var(--text-muted);">15+ tokens de cor para brand, neutrals e semânticos</p>
      </div>
      <div class="card" style="padding:var(--space-6);text-align:center;">
        <div style="color:var(--green-primary);margin-bottom:var(--space-3);">${Icons.edit(32)}</div>
        <h4 style="font-size:var(--font-size-base);margin-bottom:var(--space-2);">Tipografia</h4>
        <p style="font-size:var(--font-size-sm);color:var(--text-muted);">Noto Sans com escala de 9 tamanhos e 4 pesos</p>
      </div>
      <div class="card" style="padding:var(--space-6);text-align:center;">
        <div style="color:var(--green-primary);margin-bottom:var(--space-3);">${Icons.star(32)}</div>
        <h4 style="font-size:var(--font-size-base);margin-bottom:var(--space-2);">Ícones SVG</h4>
        <p style="font-size:var(--font-size-sm);color:var(--text-muted);">35+ ícones agrícolas e de UI customizados</p>
      </div>
      <div class="card" style="padding:var(--space-6);text-align:center;">
        <div style="color:var(--green-primary);margin-bottom:var(--space-3);">${Icons.settings(32)}</div>
        <h4 style="font-size:var(--font-size-base);margin-bottom:var(--space-2);">Componentes</h4>
        <p style="font-size:var(--font-size-sm);color:var(--text-muted);">Botões, cards, badges, inputs e mais</p>
      </div>
    </div>
  </section>`;
}

/* ── Colors ── */
function renderColors() {
  const groups = [
    {
      title: 'Green — Brand',
      colors: [
        { name: 'Green Primary', hex: '#4AE328', var: '--green-primary' },
        { name: 'Green Dark', hex: '#1D5C0C', var: '--green-dark' },
        { name: 'Green Medium', hex: '#2E8B1A', var: '--green-medium' },
        { name: 'Green Light', hex: '#E8F5E4', var: '--green-light' },
        { name: 'Green Accent', hex: '#3CC41E', var: '--green-accent' },
        { name: 'Green Hover', hex: '#42CC23', var: '--green-hover' },
      ]
    },
    {
      title: 'Neutrals',
      colors: [
        { name: 'Surface', hex: '#F8F9FA', var: '--surface' },
        { name: 'Muted Gray', hex: '#97A5AF', var: '--muted-gray' },
        { name: 'Border Light', hex: '#E2E5E9', var: '--border-light' },
        { name: 'Text Dark', hex: '#1A1F2B', var: '--text-dark' },
        { name: 'Text Muted', hex: '#667085', var: '--text-muted' },
        { name: 'White', hex: '#FFFFFF', var: '--white' },
      ]
    },
    {
      title: 'Semânticas',
      colors: [
        { name: 'Success', hex: '#22C55E', var: '--success' },
        { name: 'Warning', hex: '#F59E0B', var: '--warning' },
        { name: 'Error', hex: '#EF4444', var: '--error' },
        { name: 'Info', hex: '#3B82F6', var: '--info' },
      ]
    }
  ];

  return `
  <section class="ds-section" id="colors">
    <h2 class="ds-section-title">Cores</h2>
    <p class="ds-section-desc">Paleta de cores definida como CSS custom properties. Use sempre as variáveis — nunca hardcode hexadecimais.</p>
    ${groups.map(g => `
      <h3 style="font-size:var(--font-size-lg);margin:var(--space-6) 0 var(--space-4);color:var(--text-dark);">${g.title}</h3>
      <div class="ds-color-grid">
        ${g.colors.map(c => `
          <div class="ds-color-card">
            <div class="ds-color-swatch" style="background:${c.hex};${c.hex === '#FFFFFF' ? 'border-bottom:1px solid var(--border-light);' : ''}"></div>
            <div class="ds-color-info">
              <div class="ds-color-name">${c.name}</div>
              <div class="ds-color-hex">${c.hex}</div>
              <div class="ds-color-var">var(${c.var})</div>
            </div>
          </div>
        `).join('')}
      </div>
    `).join('')}
  </section>`;
}

/* ── Typography ── */
function renderTypography() {
  const scales = [
    { label: 'text-5xl / 48px', css: 'font-size:3rem;font-weight:700;', text: 'Heading Extra Large' },
    { label: 'text-4xl / 36px', css: 'font-size:2.25rem;font-weight:700;', text: 'Heading Large' },
    { label: 'text-3xl / 30px', css: 'font-size:1.875rem;font-weight:700;', text: 'Heading Medium' },
    { label: 'text-2xl / 24px', css: 'font-size:1.5rem;font-weight:600;', text: 'Section Title' },
    { label: 'text-xl / 20px', css: 'font-size:1.25rem;font-weight:600;', text: 'Subsection Title' },
    { label: 'text-lg / 18px', css: 'font-size:1.125rem;font-weight:600;', text: 'Card Title' },
    { label: 'text-base / 16px', css: 'font-size:1rem;font-weight:400;', text: 'Body text — the quick brown fox jumps over the lazy dog' },
    { label: 'text-sm / 14px', css: 'font-size:0.875rem;font-weight:400;', text: 'Small text, captions, labels and navigation' },
    { label: 'text-xs / 12px', css: 'font-size:0.75rem;font-weight:400;', text: 'Extra small — metadata, badges, tooltips' },
  ];

  return `
  <section class="ds-section" id="typography">
    <h2 class="ds-section-title">Tipografia</h2>
    <p class="ds-section-desc">
      Família: <strong>Noto Sans</strong> (Google Fonts). Pesos disponíveis: 400 (regular), 500 (medium), 600 (semibold), 700 (bold).
    </p>
    <div style="background:var(--white);border-radius:var(--radius-lg);border:1px solid var(--border-light);padding:var(--space-4);">
      ${scales.map(s => `
        <div class="ds-type-row">
          <div class="ds-type-label">${s.label}</div>
          <div class="ds-type-sample" style="${s.css}">${s.text}</div>
        </div>
      `).join('')}
    </div>
  </section>`;
}

/* ── Spacing ── */
function renderSpacing() {
  const spacings = [
    { name: '--space-1', value: '4px', px: 4 },
    { name: '--space-2', value: '8px', px: 8 },
    { name: '--space-3', value: '12px', px: 12 },
    { name: '--space-4', value: '16px', px: 16 },
    { name: '--space-5', value: '20px', px: 20 },
    { name: '--space-6', value: '24px', px: 24 },
    { name: '--space-8', value: '32px', px: 32 },
    { name: '--space-10', value: '40px', px: 40 },
    { name: '--space-12', value: '48px', px: 48 },
    { name: '--space-16', value: '64px', px: 64 },
    { name: '--space-20', value: '80px', px: 80 },
  ];

  return `
  <section class="ds-section" id="spacing">
    <h2 class="ds-section-title">Espaçamento</h2>
    <p class="ds-section-desc">Grade base de 4px. Use as variáveis CSS para manter consistência.</p>
    <div style="background:var(--white);border-radius:var(--radius-lg);border:1px solid var(--border-light);padding:var(--space-6);">
      ${spacings.map(s => `
        <div class="ds-spacing-row">
          <div class="ds-spacing-label">var(${s.name}) → ${s.value}</div>
          <div class="ds-spacing-bar" style="width:${s.px * 2.5}px;"></div>
        </div>
      `).join('')}
    </div>
  </section>`;
}

/* ── Icons ── */
function renderIcons() {
  const iconNames = Object.keys(Icons);
  return `
  <section class="ds-section" id="icons">
    <h2 class="ds-section-title">Iconografia</h2>
    <p class="ds-section-desc">${iconNames.length} ícones SVG inline customizados. Clique para copiar o nome. Use <code>Icons.nomeDaIcon(tamanho)</code> para renderizar.</p>
    
    <div class="ds-icons-toolbar">
      <div class="input-group ds-icons-search">
        <span class="input-icon">${Icons.search(18)}</span>
        <input type="text" id="icon-search-input" placeholder="Filtrar ícones...">
      </div>
      <div class="ds-icons-size-toggle">
        <button data-size="16">16px</button>
        <button data-size="24" class="active">24px</button>
        <button data-size="32">32px</button>
        <button data-size="48">48px</button>
      </div>
    </div>

    <div class="ds-icons-grid" id="icons-grid">
      ${iconNames.map(name => `
        <div class="ds-icon-card" data-icon-name="${name}" onclick="copyIconName('${name}', this)">
          <div class="icon-preview">${Icons[name](24)}</div>
          <span class="icon-name">${name}</span>
          <span class="copy-toast">Copiado!</span>
        </div>
      `).join('')}
    </div>
  </section>`;
}

function copyIconName(name, el) {
  navigator.clipboard.writeText(`Icons.${name}(24)`).then(() => {
    const toast = el.querySelector('.copy-toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1200);
  });
}

function initIconSearch() {
  const input = document.getElementById('icon-search-input');
  if (!input) return;
  input.addEventListener('input', () => {
    const query = input.value.toLowerCase();
    document.querySelectorAll('.ds-icon-card').forEach(card => {
      const name = card.getAttribute('data-icon-name').toLowerCase();
      card.style.display = name.includes(query) ? '' : 'none';
    });
  });
}

function initIconSizeToggle() {
  const buttons = document.querySelectorAll('.ds-icons-size-toggle button');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const size = parseInt(btn.dataset.size);
      document.querySelectorAll('.ds-icon-card').forEach(card => {
        const name = card.getAttribute('data-icon-name');
        card.querySelector('.icon-preview').innerHTML = Icons[name](size);
      });
    });
  });
}

/* ── Components ── */
function renderComponentsSection() {
  return `
  <section class="ds-section" id="components">
    <h2 class="ds-section-title">Componentes</h2>
    <p class="ds-section-desc">Biblioteca de componentes reutilizáveis com variantes de estilo.</p>

    <div class="ds-component-group">
      <h4>Botões</h4>
      <div class="ds-component-row">
        <button class="btn btn-primary">Primary</button>
        <button class="btn btn-dark">Dark</button>
        <button class="btn btn-outline">Outline</button>
        <button class="btn btn-ghost">Ghost</button>
        <button class="btn btn-primary btn-sm">Small</button>
        <button class="btn btn-primary btn-lg">Large</button>
        <button class="btn btn-primary" disabled>Disabled</button>
        <button class="btn btn-primary btn-icon">${Icons.plus(20)}</button>
      </div>
    </div>

    <div class="ds-component-group">
      <h4>Badges</h4>
      <div class="ds-component-row">
        <span class="badge badge-green">${Icons.check(12)} Orgânico</span>
        <span class="badge badge-green">Artesanal</span>
        <span class="badge badge-warning">Em Breve</span>
        <span class="badge badge-info">Novo</span>
      </div>
    </div>

    <div class="ds-component-group">
      <h4>Input com Ícone</h4>
      <div class="ds-component-row">
        <div class="input-group" style="max-width:350px;">
          <span class="input-icon">${Icons.search(18)}</span>
          <input type="text" placeholder="Buscar produtos...">
        </div>
        <div class="input-group" style="max-width:350px;">
          <span class="input-icon">${Icons.email(18)}</span>
          <input type="email" placeholder="Digite seu email">
        </div>
      </div>
    </div>

    <div class="ds-component-group">
      <h4>Cards</h4>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:var(--space-4);">
        <div class="card">
          <div style="height:120px;background:linear-gradient(135deg,var(--green-light),#C7EABC);display:flex;align-items:center;justify-content:center;">
            ${Icons.leaf(40)}
          </div>
          <div class="card-body">
            <h4 style="font-size:var(--font-size-base);font-weight:600;margin-bottom:var(--space-2);">Card com Imagem</h4>
            <p style="font-size:var(--font-size-sm);color:var(--text-muted);">Descrição do card com conteúdo dinâmico.</p>
          </div>
        </div>
        <div class="card" style="padding:var(--space-6);">
          <h4 style="font-size:var(--font-size-base);font-weight:600;margin-bottom:var(--space-2);">Card Simples</h4>
          <p style="font-size:var(--font-size-sm);color:var(--text-muted);margin-bottom:var(--space-4);">Card sem imagem, apenas texto e ação.</p>
          <button class="btn btn-primary btn-sm">Ação</button>
        </div>
      </div>
    </div>

    <div class="ds-component-group">
      <h4>Alertas</h4>
      <div style="display:flex;flex-direction:column;gap:var(--space-3);">
        <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-4);border-radius:var(--radius-md);background:#F0FDF4;border:1px solid #86EFAC;">
          ${Icons.check(18)} <span style="font-size:var(--font-size-sm);color:#166534;">Operação realizada com sucesso!</span>
        </div>
        <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-4);border-radius:var(--radius-md);background:#FFFBEB;border:1px solid #FDE68A;">
          ${Icons.bell(18)} <span style="font-size:var(--font-size-sm);color:#92400E;">Atenção: verifique os dados antes de confirmar.</span>
        </div>
        <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-4);border-radius:var(--radius-md);background:#FEF2F2;border:1px solid #FCA5A5;">
          ${Icons.close(18)} <span style="font-size:var(--font-size-sm);color:#991B1B;">Erro ao processar sua solicitação.</span>
        </div>
      </div>
    </div>
  </section>`;
}

/* ── Programming Rules ── */
function renderRules() {
  const rules = [
    {
      icon: 'sun',
      title: 'Uso de Variáveis CSS',
      content: `<p>Sempre use CSS custom properties definidas em <code>variables.css</code>. Nunca hardcode valores hexadecimais ou pixel direto no CSS.</p>
      <ul>
        <li><strong>Correto:</strong> <code>color: var(--green-primary);</code></li>
        <li><strong>Errado:</strong> <code>color: #4AE328;</code></li>
      </ul>`
    },
    {
      icon: 'edit',
      title: 'Gerenciamento de Estados',
      content: `<p>Defina estados visuais através de classes CSS com pseudo-classes:</p>
      <ul>
        <li><code>:hover</code> — mudança sutil de cor/sombra</li>
        <li><code>:focus-within</code> — highlight para inputs ativos</li>
        <li><code>:active</code> — feedback de clique</li>
        <li><code>:disabled / [disabled]</code> — opacity 0.5 + cursor not-allowed</li>
      </ul>`
    },
    {
      icon: 'eye',
      title: 'Responsividade',
      content: `<p>Breakpoints padrão do sistema:</p>
      <ul>
        <li><strong>Mobile:</strong> até 480px — layouts de 1 coluna</li>
        <li><strong>Tablet:</strong> 481px a 768px — 2 colunas</li>
        <li><strong>Desktop small:</strong> 769px a 1024px — 3 colunas</li>
        <li><strong>Desktop:</strong> 1025px+ — layout completo 4 colunas</li>
      </ul>
      <p>Use <code>container</code> com max-width de 1200px. Mobile-first quando possível.</p>`
    },
    {
      icon: 'lock',
      title: 'Nomenclatura de Tokens',
      content: `<p>Convenção para variáveis CSS:</p>
      <ul>
        <li><strong>Cores:</strong> <code>--{grupo}-{variante}</code> ex: <code>--green-primary</code></li>
        <li><strong>Espaçamento:</strong> <code>--space-{multiplicador}</code> ex: <code>--space-4</code> (16px)</li>
        <li><strong>Tipografia:</strong> <code>--font-size-{escala}</code> ex: <code>--font-size-lg</code></li>
        <li><strong>Sombras:</strong> <code>--shadow-{intensidade}</code> ex: <code>--shadow-md</code></li>
        <li><strong>Bordas:</strong> <code>--radius-{tamanho}</code> ex: <code>--radius-lg</code></li>
      </ul>`
    },
    {
      icon: 'settings',
      title: 'Ícones SVG',
      content: `<p>Todos os ícones estão em <code>js/icons.js</code> como funções inline SVG:</p>
      <ul>
        <li>Use <code>Icons.nomeDaIcon(tamanho)</code> para renderizar</li>
        <li>Tamanhos padrão: 16px (tiny), 18px (nav), 24px (default), 32px+</li>
        <li>Sempre <code>stroke="currentColor"</code> — herda a cor do parent</li>
        <li>stroke-width: 2 para traço consistente</li>
      </ul>`
    },
    {
      icon: 'members',
      title: 'Componentes Compartilhados',
      content: `<p>Header e Footer são renderizados via JavaScript para reutilização entre páginas:</p>
      <ul>
        <li><code>renderHeader('pageName')</code> — header com destaque na página ativa</li>
        <li><code>renderFooter()</code> — footer completo</li>
        <li>Chame <code>initMobileMenu()</code> após renderizar o header</li>
        <li>IDs: <code>#app-header</code> e <code>#app-footer</code> como containers</li>
      </ul>`
    },
  ];

  return `
  <section class="ds-section" id="rules">
    <h2 class="ds-section-title">Regras de Programação</h2>
    <p class="ds-section-desc">Diretrizes para manter consistência e qualidade no desenvolvimento.</p>
    ${rules.map(r => `
      <div class="ds-rule-card">
        <h4>${Icons[r.icon](20)} ${r.title}</h4>
        ${r.content}
      </div>
    `).join('')}
  </section>`;
}
