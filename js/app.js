/* ============================================
   AgroHub / CSA — Main Application JavaScript
   Navigation, mobile menu, interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initActiveNav();
  initSmoothScroll();
});

/* ── Mobile Menu ── */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('header-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    nav.classList.toggle('open');
    const isOpen = nav.classList.contains('open');
    btn.innerHTML = isOpen ? Icons.close(24) : Icons.menu(24);
    btn.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when clicking a link
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      btn.innerHTML = Icons.menu(24);
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('open');
      btn.innerHTML = Icons.menu(24);
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ── Active Navigation Link ── */
function initActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ── Smooth Scroll ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ── Render Header (shared across pages) ── */
function renderHeader(activePage) {
  return `
  <header class="app-header">
    <div class="header-inner">
      <a href="index.html" class="header-logo">
        <div class="logo-circle">${Icons.leaf(24)}</div>
        <span class="logo-text">CSA</span>
      </a>

      <nav class="header-nav" id="header-nav">
        <a href="index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}">
          ${Icons.home(18)} Início
        </a>
        <a href="marketplace.html" class="nav-link ${activePage === 'marketplace' ? 'active' : ''}">
          ${Icons.marketplace(18)} Marketplace
        </a>
        <a href="cursos.html" class="nav-link ${activePage === 'cursos' ? 'active' : ''}">
          ${Icons.course(18)} Cursos
        </a>
        <a href="receitas.html" class="nav-link ${activePage === 'receitas' ? 'active' : ''}">
          ${Icons.recipe(18)} Receitas
        </a>
        <a href="integrantes.html" class="nav-link ${activePage === 'integrantes' ? 'active' : ''}">
          ${Icons.members(18)} Integrantes
        </a>
      </nav>

      <div class="header-actions">
        <button class="header-action-btn" title="Notificações">
          ${Icons.bell(22)}
        </button>
        <a href="marketplace.html" class="header-action-btn" title="Carrinho">
          ${Icons.cart(22)}
          <span class="cart-badge">3</span>
        </a>
        <a href="perfil.html" class="header-action-btn" title="Perfil">
          ${Icons.profile(22)}
        </a>
        <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Menu" aria-expanded="false">
          ${Icons.menu(24)}
        </button>
      </div>
    </div>
  </header>`;
}

/* ── Render Footer (shared across pages) ── */
function renderFooter() {
  return `
  <footer class="app-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-brand-logo">
            <div class="logo-circle">${Icons.leaf(20)}</div>
            <span class="logo-text" style="font-size:1.25rem;font-weight:700;color:#fff;">CSA</span>
          </div>
          <p>Comunidade que Sustenta a Agricultura. Conectando produtores rurais e consumidores conscientes para uma alimentação saudável e sustentável.</p>
          <div class="footer-social">
            <a href="#" title="Facebook">${Icons.facebook(18)}</a>
            <a href="#" title="Instagram">${Icons.instagram(18)}</a>
            <a href="#" title="WhatsApp">${Icons.whatsapp(18)}</a>
          </div>
        </div>

        <div class="footer-col">
          <h4>Plataforma</h4>
          <ul>
            <li><a href="marketplace.html">Marketplace</a></li>
            <li><a href="cursos.html">Cursos</a></li>
            <li><a href="receitas.html">Receitas</a></li>
            <li><a href="integrantes.html">Integrantes</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Suporte</h4>
          <ul>
            <li><a href="#">Central de Ajuda</a></li>
            <li><a href="#">Contato</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Termos de Uso</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Recursos</h4>
          <ul>
            <li><a href="design-system.html">Design System</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Política de Privacidade</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <span>&copy; ${new Date().getFullYear()} CSA — Comunidade que Sustenta a Agricultura. Todos os direitos reservados.</span>
        <span>Feito com ${Icons.heart(14)} para o campo brasileiro</span>
      </div>
    </div>
  </footer>`;
}

// Make them globally available
window.renderHeader = renderHeader;
window.renderFooter = renderFooter;
