/* ============================================
   AgroHub / CSA — Main Application JavaScript
   Navigation, mobile menu, animations,
   tooltips, notifications, toast, cart
   ============================================ */

/* ── Global State ── */
window.CSA = {
  cart: JSON.parse(localStorage.getItem('csa_cart') || '[]'),
  notifications: [
    { id: 1, icon: 'green', iconName: 'cart', text: 'Seu pedido #1042 foi <strong>enviado</strong>!', time: 'Há 5 min', unread: true },
    { id: 2, icon: 'blue', iconName: 'course', text: 'Novo curso disponível: <strong>Apicultura Sustentável</strong>', time: 'Há 30 min', unread: true },
    { id: 3, icon: 'orange', iconName: 'bell', text: 'Promoção: <strong>20% OFF</strong> em orgânicos até sexta!', time: 'Há 2h', unread: true },
    { id: 4, icon: 'green', iconName: 'check', text: 'Pagamento confirmado para o pedido #1041.', time: 'Há 1 dia', unread: false },
    { id: 5, icon: 'red', iconName: 'heart', text: 'O produto <strong>Mel Silvestre</strong> voltou ao estoque!', time: 'Há 2 dias', unread: false },
  ]
};

function saveCart() {
  localStorage.setItem('csa_cart', JSON.stringify(window.CSA.cart));
  updateCartBadge();
}

function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-count-badge');
  const count = window.CSA.cart.reduce((sum, item) => sum + item.qty, 0);
  badges.forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? 'flex' : 'none';
  });
}

function addToCart(product) {
  const existing = window.CSA.cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty++;
  } else {
    window.CSA.cart.push({ ...product, qty: 1 });
  }
  saveCart();
  showToast(`${product.name} adicionado ao carrinho!`, 'cart');
}

function removeFromCart(productId) {
  window.CSA.cart = window.CSA.cart.filter(i => i.id !== productId);
  saveCart();
}

function updateCartQty(productId, delta) {
  const item = window.CSA.cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
  } else {
    saveCart();
  }
}

function getCartTotal() {
  return window.CSA.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

/* ── Toast Notification ── */
function showToast(message, iconName = 'check') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="color:var(--green-primary);">${Icons[iconName] ? Icons[iconName](20) : Icons.check(20)}</span>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

document.addEventListener('DOMContentLoaded', () => {
  initPageTransition();
  initMobileMenu();
  initActiveNav();
  initSmoothScroll();
  setTimeout(initScrollAnimations, 100);
  updateCartBadge();
});

/* ── Page Transition ── */
function initPageTransition() {
  const main = document.querySelector('main');
  if (main) main.classList.add('page-transition');
}

/* ── Mobile Menu ── */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('header-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    nav.classList.toggle('open');
    const isOpen = nav.classList.contains('open');
    btn.innerHTML = isOpen ? Icons.close(24) : Icons.menu(24);
    btn.setAttribute('aria-expanded', isOpen);
  });

  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      btn.innerHTML = Icons.menu(24);
      btn.setAttribute('aria-expanded', 'false');
    });
  });

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
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ── Smooth Scroll ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ── Scroll Animations (Intersection Observer) ── */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.fade-in-up, .scale-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
  });
}

/* ── Notifications Dropdown ── */
function initNotifications() {
  const btn = document.getElementById('notif-btn');
  const dropdown = document.getElementById('notif-dropdown');
  if (!btn || !dropdown) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
    if (dropdown.classList.contains('open')) {
      btn.classList.add('bell-shake');
      setTimeout(() => btn.classList.remove('bell-shake'), 600);
    }
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });

  const list = dropdown.querySelector('.notif-list');
  if (list) {
    list.innerHTML = window.CSA.notifications.map(n => `
      <div class="notif-item ${n.unread ? 'unread' : ''}">
        <div class="notif-icon ${n.icon}">${Icons[n.iconName](18)}</div>
        <div class="notif-content">
          <p>${n.text}</p>
          <span>${n.time}</span>
        </div>
        ${n.unread ? '<div class="notif-dot"></div>' : ''}
      </div>
    `).join('');
  }
}

function markAllRead() {
  window.CSA.notifications.forEach(n => n.unread = false);
  const badge = document.querySelector('#notif-btn .cart-badge, #notif-btn .notif-count');
  if (badge) { badge.textContent = '0'; badge.style.display = 'none'; }
  document.querySelectorAll('.notif-item.unread').forEach(el => el.classList.remove('unread'));
  document.querySelectorAll('.notif-dot').forEach(el => el.remove());
  showToast('Notificações marcadas como lidas', 'check');
}

/* ── Format currency ── */
function formatBRL(value) {
  return 'R$ ' + value.toFixed(2).replace('.', ',');
}

/* ── Render stars ── */
function renderStars(rating) {
  return Array(5).fill(0).map((_, i) =>
    i < Math.floor(rating) ? Icons.star(14) : Icons.starOutline(14)
  ).join('');
}

/* ── Render Header ── */
function renderHeader(activePage) {
  const unreadCount = window.CSA.notifications.filter(n => n.unread).length;
  const cartCount = window.CSA.cart.reduce((s, i) => s + i.qty, 0);
  return `
  <header class="app-header">
    <div class="header-inner">
      <a href="index.html" class="header-logo" data-tooltip="Página Inicial">
        <div class="logo-circle">${Icons.leaf(24)}</div>
        <span class="logo-text">CSA</span>
      </a>

      <nav class="header-nav" id="header-nav">
        <a href="index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}" data-tooltip="Página Inicial" data-tooltip-pos="bottom">
          ${Icons.home(18)} Início
        </a>
        <a href="marketplace.html" class="nav-link ${activePage === 'marketplace' ? 'active' : ''}" data-tooltip="Loja de produtos" data-tooltip-pos="bottom">
          ${Icons.marketplace(18)} Marketplace
        </a>
        <a href="cursos.html" class="nav-link ${activePage === 'cursos' ? 'active' : ''}" data-tooltip="Cursos de capacitação" data-tooltip-pos="bottom">
          ${Icons.course(18)} Cursos
        </a>
        <a href="receitas.html" class="nav-link ${activePage === 'receitas' ? 'active' : ''}" data-tooltip="Receitas da comunidade" data-tooltip-pos="bottom">
          ${Icons.recipe(18)} Receitas
        </a>
        <a href="integrantes.html" class="nav-link ${activePage === 'integrantes' ? 'active' : ''}" data-tooltip="Produtores e membros" data-tooltip-pos="bottom">
          ${Icons.members(18)} Integrantes
        </a>
      </nav>

      <div class="header-actions">
        <div style="position:relative;">
          <button class="header-action-btn" id="notif-btn" data-tooltip="Notificações">
            ${Icons.bell(22)}
            <span class="cart-badge notif-count" style="background:var(--green-primary);${unreadCount === 0 ? 'display:none;' : ''}">${unreadCount}</span>
          </button>
          <div class="notifications-dropdown" id="notif-dropdown">
            <div class="notif-header">
              <h3>Notificações</h3>
              <button class="btn btn-ghost btn-sm" onclick="markAllRead()">Marcar lidas</button>
            </div>
            <div class="notif-list"></div>
            <div class="notif-footer">
              <a href="notificacoes.html">Ver todas as notificações</a>
            </div>
          </div>
        </div>
        <a href="carrinho.html" class="header-action-btn" data-tooltip="Carrinho de compras">
          ${Icons.cart(22)}
          <span class="cart-badge cart-count-badge" style="${cartCount === 0 ? 'display:none;' : ''}">${cartCount}</span>
        </a>
        <a href="perfil.html" class="header-action-btn" data-tooltip="Meu perfil">
          ${Icons.profile(22)}
        </a>
        <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Menu" aria-expanded="false">
          ${Icons.menu(24)}
        </button>
      </div>
    </div>
  </header>`;
}

/* ── Render Footer ── */
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
            <a href="#" data-tooltip="Facebook">${Icons.facebook(18)}</a>
            <a href="#" data-tooltip="Instagram">${Icons.instagram(18)}</a>
            <a href="#" data-tooltip="WhatsApp">${Icons.whatsapp(18)}</a>
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

/* ── Render Product Card (reusable) ── */
function renderProductCard(p, index) {
  return `
  <div class="product-card card-animated fade-in-up stagger-${(index % 8) + 1}">
    <a href="produto.html?id=${p.id}" class="product-card-image card-img-zoom img-placeholder ${p.gradient || 'green'}">
      <div class="card-img-inner">${Icons[p.icon](64)}</div>
      <span class="badge badge-green product-badge">${p.badge}</span>
      <button class="favorite-btn" data-tooltip="Adicionar aos favoritos" onclick="event.preventDefault();event.stopPropagation();showToast('Adicionado aos favoritos!','heart');">
        ${Icons.heart(16)}
      </button>
    </a>
    <div class="product-card-body">
      <div class="product-producer">
        <div class="product-producer-avatar">${Icons.profile(12)}</div>
        <span>${p.producer} · ${p.location}</span>
      </div>
      <a href="produto.html?id=${p.id}" class="product-name">${p.name}</a>
      <div class="product-rating">
        ${renderStars(p.rating)}
        <span>${p.rating} (${p.reviews})</span>
      </div>
      <div class="product-footer">
        <div class="product-price">${formatBRL(p.price)} <small>${p.unit}</small></div>
        <button class="add-cart-btn btn-pulse" data-tooltip="Adicionar ao carrinho" onclick="addToCart({id:${p.id},name:'${p.name.replace(/'/g,"\\'")}',price:${p.price},icon:'${p.icon}',gradient:'${p.gradient||'green'}'})">
          ${Icons.plus(18)}
        </button>
      </div>
    </div>
  </div>`;
}

// Make functions globally available
window.renderHeader = renderHeader;
window.renderFooter = renderFooter;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQty = updateCartQty;
window.getCartTotal = getCartTotal;
window.showToast = showToast;
window.initNotifications = initNotifications;
window.initScrollAnimations = initScrollAnimations;
window.markAllRead = markAllRead;
window.formatBRL = formatBRL;
window.renderStars = renderStars;
window.renderProductCard = renderProductCard;
