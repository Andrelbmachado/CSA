/* ============================================
   AgroHub / CSA — Homepage Dynamic Content
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Render shared header + footer
  document.getElementById('app-header').innerHTML = renderHeader('home');
  document.getElementById('app-footer').innerHTML = renderFooter();
  initMobileMenu();

  // Render icons into placeholders
  document.getElementById('hero-badge-icon').innerHTML = Icons.leaf(16);
  document.getElementById('hero-search-icon').innerHTML = Icons.search(20);
  document.getElementById('see-all-icon-products').innerHTML = Icons.chevronRight(16);
  document.getElementById('see-all-icon-courses').innerHTML = Icons.chevronRight(16);
  document.getElementById('see-all-icon-recipes').innerHTML = Icons.chevronRight(16);

  renderCategories();
  renderProducts();
  renderCourses();
  renderRecipes();
});

/* ── Categories ── */
function renderCategories() {
  const categories = [
    { name: 'Hortifruti', icon: 'apple' },
    { name: 'Grãos', icon: 'wheat' },
    { name: 'Orgânicos', icon: 'leaf' },
    { name: 'Laticínios', icon: 'waterDrop' },
    { name: 'Mudas', icon: 'plant' },
    { name: 'Sementes', icon: 'seed' },
    { name: 'Equipamentos', icon: 'tractor' },
    { name: 'Artesanal', icon: 'recipe' },
  ];

  const container = document.getElementById('categories-row');
  container.innerHTML = categories.map((cat, i) => `
    <div class="category-pill${i === 0 ? ' active' : ''}" tabindex="0">
      <div class="category-icon">${Icons[cat.icon](24)}</div>
      <span class="category-name">${cat.name}</span>
    </div>
  `).join('');

  // Toggle active on click
  container.querySelectorAll('.category-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      container.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });
}

/* ── Products ── */
function renderProducts() {
  const products = [
    { name: 'Cesta de Orgânicos', producer: 'Sítio Boa Esperança', location: 'Minas Gerais', price: 'R$ 89,90', unit: '/cesta', rating: 4.8, reviews: 124, badge: 'Orgânico', icon: 'leaf' },
    { name: 'Mel Silvestre Puro', producer: 'Apiário Serra Verde', location: 'Paraná', price: 'R$ 45,00', unit: '/500g', rating: 4.9, reviews: 89, badge: 'Artesanal', icon: 'waterDrop' },
    { name: 'Café Especial Torrado', producer: 'Fazenda Alto Belo', location: 'São Paulo', price: 'R$ 38,50', unit: '/250g', rating: 4.7, reviews: 203, badge: 'Especial', icon: 'seed' },
    { name: 'Queijo Minas Artesanal', producer: 'Laticínios Serra', location: 'Minas Gerais', price: 'R$ 52,00', unit: '/peça', rating: 4.6, reviews: 67, badge: 'Artesanal', icon: 'farm' },
    { name: 'Azeite de Oliva Extra', producer: 'Oliveira do Sul', location: 'Rio Grande do Sul', price: 'R$ 68,00', unit: '/500ml', rating: 4.8, reviews: 156, badge: 'Premium', icon: 'plant' },
    { name: 'Frutas Vermelhas Mix', producer: 'Chácara Frutal', location: 'Santa Catarina', price: 'R$ 32,90', unit: '/bandeja', rating: 4.5, reviews: 42, badge: 'Fresco', icon: 'apple' },
    { name: 'Granola Artesanal', producer: 'Natural e Cia', location: 'Bahia', price: 'R$ 24,90', unit: '/300g', rating: 4.4, reviews: 78, badge: 'Natural', icon: 'wheat' },
    { name: 'Manteiga de Garrafa', producer: 'Fazenda Nordeste', location: 'Ceará', price: 'R$ 35,00', unit: '/350ml', rating: 4.7, reviews: 93, badge: 'Regional', icon: 'sun' },
  ];

  const container = document.getElementById('products-grid');
  container.innerHTML = products.map(p => {
    const stars = Array(5).fill(0).map((_, i) =>
      i < Math.floor(p.rating) ? Icons.star(14) : Icons.starOutline(14)
    ).join('');

    return `
    <div class="product-card">
      <div class="product-card-image">
        ${Icons[p.icon](64)}
        <span class="badge badge-green product-badge">${p.badge}</span>
        <button class="favorite-btn" title="Favoritar">${Icons.heart(16)}</button>
      </div>
      <div class="product-card-body">
        <div class="product-producer">
          <div class="product-producer-avatar">${Icons.profile(12)}</div>
          <span>${p.producer} · ${p.location}</span>
        </div>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-rating">
          ${stars}
          <span>${p.rating} (${p.reviews})</span>
        </div>
        <div class="product-footer">
          <div class="product-price">${p.price} <small>${p.unit}</small></div>
          <button class="add-cart-btn" title="Adicionar ao carrinho">${Icons.plus(18)}</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

/* ── Courses ── */
function renderCourses() {
  const courses = [
    { title: 'Agricultura Orgânica para Iniciantes', desc: 'Aprenda os fundamentos da produção orgânica e técnicas sustentáveis de cultivo.', duration: '12h', students: 340, badge: 'Popular' },
    { title: 'Manejo Integrado de Pragas', desc: 'Técnicas naturais e biológicas para controlar pragas sem agrotóxicos.', duration: '8h', students: 215, badge: 'Novo' },
    { title: 'Irrigação Eficiente', desc: 'Sistemas de irrigação modernos para economia de água e maior produtividade.', duration: '6h', students: 189, badge: 'Destaque' },
    { title: 'Compostagem e Adubação Verde', desc: 'Transforme resíduos orgânicos em adubo rico para suas plantações.', duration: '10h', students: 278, badge: 'Popular' },
    { title: 'Apicultura Sustentável', desc: 'Crie e mantenha apiários produtivos respeitando o meio ambiente.', duration: '15h', students: 156, badge: 'Novo' },
  ];

  const container = document.getElementById('courses-scroll');
  container.innerHTML = courses.map(c => `
    <div class="course-card">
      <div class="course-card-image">
        ${Icons.course(48)}
        <span class="badge badge-green course-badge-top">${c.badge}</span>
      </div>
      <div class="course-card-body">
        <h4>${c.title}</h4>
        <p>${c.desc}</p>
        <div class="course-meta">
          <span>${Icons.clock(14)} ${c.duration}</span>
          <span>${Icons.users(14)} ${c.students} alunos</span>
        </div>
      </div>
    </div>
  `).join('');
}

/* ── Recipes ── */
function renderRecipes() {
  const recipes = [
    { title: 'Salada Tropical com Mel e Limão', time: '15 min', servings: '2 porções' },
    { title: 'Bolo de Fubá com Goiabada', time: '45 min', servings: '8 porções' },
    { title: 'Suco Verde Detox', time: '5 min', servings: '1 porção' },
    { title: 'Pão Integral Caseiro', time: '2h', servings: '1 pão' },
    { title: 'Geleia de Morango Artesanal', time: '30 min', servings: '500ml' },
    { title: 'Risoto de Abóbora com Queijo', time: '40 min', servings: '4 porções' },
  ];

  const container = document.getElementById('recipes-grid');
  container.innerHTML = recipes.map(r => `
    <div class="recipe-card">
      <div class="recipe-card-image">
        ${Icons.recipe(48)}
      </div>
      <div class="recipe-card-body">
        <h4>${r.title}</h4>
        <div class="recipe-meta">
          <span>${Icons.clock(14)} ${r.time}</span>
          <span>${Icons.users(14)} ${r.servings}</span>
        </div>
      </div>
    </div>
  `).join('');
}
