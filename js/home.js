/* ============================================
   AgroHub / CSA — Homepage Dynamic Content
   Uses shared data from data.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('app-header').innerHTML = renderHeader('home');
  document.getElementById('app-footer').innerHTML = renderFooter();
  initNotifications();

  // Icons
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
  const container = document.getElementById('categories-row');
  container.innerHTML = window.CATEGORIES.map((cat, i) => `
    <a href="marketplace.html" class="category-pill card-animated${i === 0 ? ' active' : ''}" data-tooltip="${cat.count} produtos">
      <div class="category-icon">${Icons[cat.icon](24)}</div>
      <span class="category-name">${cat.name}</span>
    </a>
  `).join('');
}

/* ── Products (top 8 from shared data) ── */
function renderProducts() {
  const products = window.PRODUCTS.slice(0, 8);
  const container = document.getElementById('products-grid');
  container.innerHTML = products.map((p, i) => renderProductCard(p, i)).join('');
  setTimeout(initScrollAnimations, 100);
}

/* ── Courses (top 5 from shared data) ── */
function renderCourses() {
  const courses = window.COURSES.slice(0, 5);
  const container = document.getElementById('courses-scroll');
  const gradientMap = { green:'#E8F5E4,#B8E6A8', yellow:'#FEF3C7,#FDE68A', brown:'#EFEBE9,#D7CCC8', orange:'#FFECB3,#FFB74D', blue:'#E3F2FD,#90CAF9' };

  container.innerHTML = courses.map(c => {
    const bg = gradientMap[c.gradient] || gradientMap.green;
    return `
    <div class="course-card card-animated">
      <a href="cursos.html">
        <div class="course-card-image" style="background:linear-gradient(135deg,${bg});">
          ${Icons[c.icon](48)}
          <span class="badge badge-green course-badge-top">${c.badge}</span>
        </div>
      </a>
      <div class="course-card-body">
        <h4>${c.title}</h4>
        <p style="font-size:var(--font-size-sm);color:var(--text-muted);margin-bottom:var(--space-3);line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${c.description}</p>
        <div class="course-meta">
          <span data-tooltip="Duração">${Icons.clock(14)} ${c.duration}</span>
          <span data-tooltip="Alunos matriculados">${Icons.users(14)} ${c.students.toLocaleString()}</span>
          <span data-tooltip="Avaliação">${Icons.star(14)} ${c.rating}</span>
        </div>
      </div>
    </div>`;
  }).join('');
}

/* ── Recipes (top 6 from shared data) ── */
function renderRecipes() {
  const recipes = window.RECIPES.slice(0, 6);
  const container = document.getElementById('recipes-grid');
  const gradientMap = { green:'#E8F5E4,#B8E6A8', orange:'#FFECB3,#FFB74D', cream:'#FFF8E1,#FFE0B2', red:'#FFEBEE,#EF9A9A', brown:'#EFEBE9,#D7CCC8', purple:'#F3E5F5,#CE93D8' };

  container.innerHTML = recipes.map((r, i) => {
    const bg = gradientMap[r.gradient] || '#FEF3C7,#FBBF24';
    return `
    <div class="recipe-card card-animated fade-in-up stagger-${(i % 6) + 1}">
      <a href="receitas.html">
        <div class="recipe-card-image" style="background:linear-gradient(135deg,${bg});">
          ${Icons[r.icon](48)}
        </div>
      </a>
      <div class="recipe-card-body">
        <h4>${r.title}</h4>
        <div class="recipe-meta">
          <span data-tooltip="Tempo de preparo">${Icons.clock(14)} ${r.time}</span>
          <span data-tooltip="Porções">${Icons.users(14)} ${r.serves} porções</span>
          <span data-tooltip="Dificuldade">${Icons.star(14)} ${r.difficulty}</span>
        </div>
      </div>
    </div>`;
  }).join('');
}
