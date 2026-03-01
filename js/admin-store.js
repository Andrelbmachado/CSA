/* ============================================
   AgroHub / CSA — Admin State & Data Management
   localStorage-backed CRUD for products & courses
   ============================================ */

(function() {
  'use strict';

  /* ── Auth State ── */
  const AUTH_KEY = 'csa_auth';

  function getAuth() {
    return JSON.parse(localStorage.getItem(AUTH_KEY) || 'null');
  }

  function setAuth(data) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(data));
  }

  function logout() {
    localStorage.removeItem(AUTH_KEY);
  }

  function isAdmin() {
    const auth = getAuth();
    return auth && auth.role === 'admin';
  }

  /* ── Products CRUD ── */
  const PRODUCTS_KEY = 'csa_admin_products';

  function getProducts() {
    const stored = localStorage.getItem(PRODUCTS_KEY);
    if (stored) return JSON.parse(stored);
    // Seed from default data
    const seeded = window.PRODUCTS.map(p => ({
      ...p,
      status: 'active',
      stock: Math.floor(Math.random() * 80) + 10,
      createdAt: '2025-01-01',
    }));
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(seeded));
    return seeded;
  }

  function saveProducts(products) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    // Also update global PRODUCTS for marketplace pages
    window.PRODUCTS = products.filter(p => p.status === 'active');
  }

  function addProduct(product) {
    const products = getProducts();
    product.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    product.createdAt = new Date().toISOString().split('T')[0];
    products.push(product);
    saveProducts(products);
    return product;
  }

  function updateProduct(id, data) {
    const products = getProducts();
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    products[idx] = { ...products[idx], ...data };
    saveProducts(products);
    return products[idx];
  }

  function deleteProduct(id) {
    let products = getProducts();
    products = products.filter(p => p.id !== id);
    saveProducts(products);
  }

  /* ── Courses CRUD ── */
  const COURSES_KEY = 'csa_admin_courses';

  function getCourses() {
    const stored = localStorage.getItem(COURSES_KEY);
    if (stored) return JSON.parse(stored);
    // Seed from default data with sections/lessons structure
    const seeded = window.COURSES.map(c => ({
      ...c,
      status: 'active',
      createdAt: '2025-01-01',
      sections: [
        {
          id: 1,
          title: 'Introdução',
          lessons: [
            { id: 1, title: 'Boas-vindas ao curso', type: 'video', duration: '5 min', videoUrl: '', transcription: '', notes: '' },
            { id: 2, title: 'Visão geral do conteúdo', type: 'text', content: 'Nesta aula veremos o que será abordado ao longo do curso...', notes: '' },
          ]
        },
        {
          id: 2,
          title: 'Fundamentos',
          lessons: [
            { id: 3, title: 'Conceitos básicos', type: 'video', duration: '15 min', videoUrl: '', transcription: '', notes: '' },
            { id: 4, title: 'Material de apoio', type: 'pdf', fileName: 'material-apoio.pdf', fileSize: '2.4 MB', notes: '' },
          ]
        }
      ],
    }));
    localStorage.setItem(COURSES_KEY, JSON.stringify(seeded));
    return seeded;
  }

  function saveCourses(courses) {
    localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
    window.COURSES = courses.filter(c => c.status === 'active');
  }

  function addCourse(course) {
    const courses = getCourses();
    course.id = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    course.createdAt = new Date().toISOString().split('T')[0];
    if (!course.sections) course.sections = [];
    courses.push(course);
    saveCourses(courses);
    return course;
  }

  function updateCourse(id, data) {
    const courses = getCourses();
    const idx = courses.findIndex(c => c.id === id);
    if (idx === -1) return null;
    courses[idx] = { ...courses[idx], ...data };
    saveCourses(courses);
    return courses[idx];
  }

  function deleteCourse(id) {
    let courses = getCourses();
    courses = courses.filter(c => c.id !== id);
    saveCourses(courses);
  }

  /* ── Section & Lesson helpers ── */
  function addSection(courseId, title) {
    const courses = getCourses();
    const course = courses.find(c => c.id === courseId);
    if (!course) return null;
    const newId = course.sections.length > 0
      ? Math.max(...course.sections.map(s => s.id)) + 1 : 1;
    const section = { id: newId, title: title || `Capítulo ${newId}`, lessons: [] };
    course.sections.push(section);
    saveCourses(courses);
    return section;
  }

  function updateSection(courseId, sectionId, data) {
    const courses = getCourses();
    const course = courses.find(c => c.id === courseId);
    if (!course) return null;
    const section = course.sections.find(s => s.id === sectionId);
    if (!section) return null;
    Object.assign(section, data);
    saveCourses(courses);
    return section;
  }

  function deleteSection(courseId, sectionId) {
    const courses = getCourses();
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    course.sections = course.sections.filter(s => s.id !== sectionId);
    saveCourses(courses);
  }

  function addLesson(courseId, sectionId, lesson) {
    const courses = getCourses();
    const course = courses.find(c => c.id === courseId);
    if (!course) return null;
    const section = course.sections.find(s => s.id === sectionId);
    if (!section) return null;
    const allLessonIds = course.sections.flatMap(s => s.lessons.map(l => l.id));
    lesson.id = allLessonIds.length > 0 ? Math.max(...allLessonIds) + 1 : 1;
    section.lessons.push(lesson);
    saveCourses(courses);
    return lesson;
  }

  function updateLesson(courseId, sectionId, lessonId, data) {
    const courses = getCourses();
    const course = courses.find(c => c.id === courseId);
    if (!course) return null;
    const section = course.sections.find(s => s.id === sectionId);
    if (!section) return null;
    const lesson = section.lessons.find(l => l.id === lessonId);
    if (!lesson) return null;
    Object.assign(lesson, data);
    saveCourses(courses);
    return lesson;
  }

  function deleteLesson(courseId, sectionId, lessonId) {
    const courses = getCourses();
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    const section = course.sections.find(s => s.id === sectionId);
    if (!section) return;
    section.lessons = section.lessons.filter(l => l.id !== lessonId);
    saveCourses(courses);
  }

  /* ── Expose globally ── */
  window.AdminStore = {
    getAuth, setAuth, logout, isAdmin,
    getProducts, saveProducts, addProduct, updateProduct, deleteProduct,
    getCourses, saveCourses, addCourse, updateCourse, deleteCourse,
    addSection, updateSection, deleteSection,
    addLesson, updateLesson, deleteLesson,
    getRecipes, saveRecipes, addRecipe, updateRecipe, deleteRecipe,
    getUsers, saveUsers, addUser, updateUser, deleteUser,
  };

  /* ── Recipes CRUD ── */
  const RECIPES_KEY = 'csa_admin_recipes';

  function getRecipes() {
    const stored = localStorage.getItem(RECIPES_KEY);
    if (stored) return JSON.parse(stored);
    const seeded = (window.RECIPES || []).map(r => ({
      ...r,
      status: 'active',
      createdAt: '2025-01-01',
    }));
    localStorage.setItem(RECIPES_KEY, JSON.stringify(seeded));
    return seeded;
  }

  function saveRecipes(recipes) {
    localStorage.setItem(RECIPES_KEY, JSON.stringify(recipes));
    window.RECIPES = recipes.filter(r => r.status === 'active');
  }

  function addRecipe(recipe) {
    const recipes = getRecipes();
    recipe.id = recipes.length > 0 ? Math.max(...recipes.map(r => r.id)) + 1 : 1;
    recipe.createdAt = new Date().toISOString().split('T')[0];
    recipes.push(recipe);
    saveRecipes(recipes);
    return recipe;
  }

  function updateRecipe(id, data) {
    const recipes = getRecipes();
    const idx = recipes.findIndex(r => r.id === id);
    if (idx === -1) return null;
    recipes[idx] = { ...recipes[idx], ...data };
    saveRecipes(recipes);
    return recipes[idx];
  }

  function deleteRecipe(id) {
    let recipes = getRecipes();
    recipes = recipes.filter(r => r.id !== id);
    saveRecipes(recipes);
  }

  /* ── Users CRUD ── */
  const USERS_KEY = 'csa_admin_users';

  function getUsers() {
    const stored = localStorage.getItem(USERS_KEY);
    if (stored) return JSON.parse(stored);
    const seeded = (window.MEMBERS || []).map(m => ({
      id: m.id,
      name: m.name,
      email: m.name.toLowerCase().replace(/\s+/g, '.').replace(/[^a-z.]/g, '') + '@csa.com',
      role: m.role,
      location: m.location,
      avatar: m.avatar,
      category: m.category,
      years: m.years,
      bio: m.bio,
      specialties: m.specialties || [],
      status: 'active',
      userRole: 'user',
      createdAt: '2025-01-01',
    }));
    // Add a sample admin user
    seeded.unshift({
      id: 100,
      name: 'Administrador CSA',
      email: 'admin@csa.com',
      role: 'Administrador',
      location: 'São Paulo-SP',
      avatar: 'AD',
      category: 'admin',
      years: 0,
      bio: 'Administrador geral da plataforma CSA.',
      specialties: ['Gestão', 'Administração'],
      status: 'active',
      userRole: 'admin',
      createdAt: '2025-01-01',
    });
    localStorage.setItem(USERS_KEY, JSON.stringify(seeded));
    return seeded;
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function addUser(user) {
    const users = getUsers();
    user.id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    user.createdAt = new Date().toISOString().split('T')[0];
    users.push(user);
    saveUsers(users);
    return user;
  }

  function updateUser(id, data) {
    const users = getUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    users[idx] = { ...users[idx], ...data };
    saveUsers(users);
    return users[idx];
  }

  function deleteUser(id) {
    let users = getUsers();
    users = users.filter(u => u.id !== id);
    saveUsers(users);
  }

})();
