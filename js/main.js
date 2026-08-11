/**
 * ============================================================================
 * TAMARAVIBES - MAIN APPLICATION LOGIC & INTERACTION ENGINE
 * ============================================================================
 */

// Force browser to start at the top on refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', () => {
  // Ensure page always starts at the top on reload
  window.scrollTo(0, 0);

  // Initialize Application Components
  initNavbar();
  initThemeToggle();
  renderCategories();
  renderFilterTabs();
  renderProducts('all');
  renderAmazonBooks();
  renderCustomerReviews();
  renderSocialLinks();
  initSearch();
  initScrollObserver();
  initNewsletterForm();
  initMouseSparkles();
  initQuickViewModal();
});

/* ==========================================================================
   1. NAVBAR & NAVIGATION
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Navbar Glass Effect on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Drawer Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ==========================================================================
   2. CATEGORIES RENDERER
   ========================================================================== */
function renderCategories() {
  const grid = document.getElementById('categoryGrid');
  if (!grid || typeof categories === 'undefined') return;

  // Filter out 'all' category for the category cards grid
  const displayCategories = categories.filter(c => c.id !== 'all');

  grid.innerHTML = displayCategories.map(cat => `
    <article class="category-card category-card-${cat.id} reveal" data-category="${cat.id}" onclick="filterByCategory('${cat.id}')" style="cursor: pointer;">
      <div class="category-img-wrapper" title="Explore ${cat.name}">
        <img src="${cat.image}" alt="${cat.name}" loading="lazy" width="300" height="200">
      </div>
      <div class="category-body">
        <h3 class="category-title">${cat.name}</h3>
        <p class="category-desc">${cat.description}</p>
        <button class="category-link" aria-label="Explore ${cat.name}">
          Explore Collection 
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    </article>
  `).join('');
}

/* ==========================================================================
   3. FILTER TABS & SEARCH ENGINE
   ========================================================================== */
let activeCategory = 'all';
let searchQuery = '';

function renderFilterTabs() {
  const container = document.getElementById('filterTabs');
  if (!container || typeof categories === 'undefined') return;

  container.innerHTML = categories.map(cat => `
    <button 
      class="filter-btn ${cat.id === activeCategory ? 'active' : ''}" 
      onclick="filterByCategory('${cat.id}')"
    >
      ${cat.name}
    </button>
  `).join('');
}

function filterByCategory(categoryId) {
  activeCategory = categoryId;
  renderFilterTabs();
  renderProducts();

  // Smooth scroll to shop section if triggered from category card
  const shopSection = document.getElementById('shop');
  if (shopSection) {
    const yOffset = -90; 
    const y = shopSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

function initSearch() {
  const input = document.getElementById('searchInput');
  if (!input) return;

  input.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderProducts();
  });
}

/* ==========================================================================
   4. PRODUCTS RENDERER (ETSY & COMBINED)
   ========================================================================== */
function renderProducts() {
  const grid = document.getElementById('productGrid');
  if (!grid || typeof etsyProducts === 'undefined') return;

  // Filter products by category and search query
  let filtered = etsyProducts.filter(item => {
    const matchesCategory = (activeCategory === 'all') || (item.category === activeCategory);
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery) ||
      item.category.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results reveal">
        <h3>No matching items found</h3>
        <p style="color: var(--clr-text-muted); margin-top: 0.5rem;">Try adjusting your search terms or selecting another category.</p>
        <button onclick="filterByCategory('all')" class="btn btn-secondary" style="margin-top: 1.25rem;">View All Items</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(product => `
    <article class="product-card reveal">
      ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      
      <span class="product-platform-tag platform-etsy">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z"/></svg>
        Etsy
      </span>

      <div class="product-img-wrapper" onclick="openQuickViewModal('${product.id}')" title="Click to view details">
        <img src="${product.image}" alt="${product.title}" loading="lazy" width="300" height="300">
        <div class="product-img-overlay">
          <span class="quick-view-hint">🔍 Quick View</span>
        </div>
      </div>

      <div class="product-content">
        <span class="product-category">${product.category}</span>
        <h3 class="product-title" onclick="openQuickViewModal('${product.id}')" style="cursor: pointer;">${product.title}</h3>
        <p class="product-description">${product.description}</p>
        
        <div class="product-footer">
          <div class="product-price-box">
            <span class="product-price ${product.originalPrice ? 'sale-price' : ''}">${product.price}</span>
            ${product.originalPrice ? `<span class="product-original-price">${product.originalPrice}</span>` : ''}
          </div>
          <a href="${product.url}" target="_blank" rel="noopener noreferrer" class="btn btn-etsy" style="padding: 0.5rem 1rem; font-size: 0.85rem;">
            Buy on Etsy
          </a>
        </div>
      </div>
    </article>
  `).join('');

  // Trigger scroll observer for newly injected elements
  initScrollObserver();
}

/* ==========================================================================
   5. DEDICATED AMAZON BOOKS RENDERER
   ========================================================================== */
function renderAmazonBooks() {
  const container = document.getElementById('booksGrid');
  if (!container || typeof amazonBooks === 'undefined') return;

  container.innerHTML = amazonBooks.map(book => `
    <article class="book-card-3d reveal">
      <div class="book-cover-container">
        <img src="${book.cover}" alt="${book.title} cover by Tamara Vibes" class="book-cover-3d" loading="lazy" width="220" height="290">
      </div>

      <div class="book-info">
        <span class="book-age-badge">👶 ${book.ageRange}</span>
        <h3 class="book-title">${book.title}</h3>
        <h4 class="book-subtitle">${book.subtitle}</h4>
        <p class="book-description">${book.description}</p>

        <ul class="book-highlights">
          ${book.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>

        <div class="book-meta-footer">
          <a href="${book.url}" target="_blank" rel="noopener noreferrer" class="btn btn-amazon">
            <svg class="btn-icon" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            View on Amazon
          </a>
        </div>
      </div>
    </article>
  `).join('');
}

/* ==========================================================================
   6. CUSTOMER REVIEWS RENDERER
   ========================================================================== */
function renderCustomerReviews() {
  const container = document.getElementById('reviewsContainer');
  if (!container || typeof customerReviews === 'undefined') return;

  container.innerHTML = `
    <div class="reviews-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
      ${customerReviews.map(rev => `
        <div class="review-card reveal">
          <div class="review-stars">${'★'.repeat(rev.rating)}</div>
          <p class="review-comment">"${rev.comment}"</p>
          <div class="review-author">${rev.author}</div>
          <div class="review-meta">${rev.location} • ${rev.productName}</div>
        </div>
      `).join('')}
    </div>
  `;
}

/* ==========================================================================
   7. SOCIAL LINKS RENDERER
   ========================================================================== */
function renderSocialLinks() {
  const container = document.getElementById('socialLinks');
  if (!container || typeof socialLinks === 'undefined') return;

  container.innerHTML = `
    <a href="${socialLinks.facebook}" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Facebook">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    </a>
    <a href="${socialLinks.pinterest}" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Pinterest">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
    </a>
    <a href="${socialLinks.instagram}" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Instagram">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
    </a>
    <a href="${socialLinks.youtube}" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="YouTube">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
    </a>
    <a href="${socialLinks.whatsapp}" target="_blank" rel="noopener noreferrer" class="social-icon social-icon-whatsapp" aria-label="WhatsApp">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
    </a>
  `;
}

/* ==========================================================================
   8. SCROLL REVEAL OBSERVER
   ========================================================================== */
function initScrollObserver() {
  const reveals = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    reveals.forEach(el => el.classList.add('active'));
  }
}

/* ==========================================================================
   9. NEWSLETTER FORM HANDLER (ISOLATED BACKEND HOOK)
   ========================================================================== */
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  const input = document.getElementById('newsletterEmail');
  const msgContainer = document.getElementById('newsletterMessage');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = input.value.trim();

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      msgContainer.textContent = 'Please enter a valid email address.';
      msgContainer.className = 'newsletter-message error';
      return;
    }

    try {
      msgContainer.textContent = 'Subscribing...';
      msgContainer.className = 'newsletter-message';

      // Call isolated subscribe handler
      const success = await subscribeToNewsletter(email);
      
      if (success) {
        msgContainer.textContent = '✨ Thank you for subscribing! You are now in the creative loop.';
        msgContainer.className = 'newsletter-message success';
        input.value = '';
      } else {
        throw new Error('Subscription failed');
      }
    } catch (err) {
      msgContainer.textContent = 'Unable to subscribe at this moment. Please try again later.';
      msgContainer.className = 'newsletter-message error';
    }
  });
}

/**
 * ISOLATED SUBSCRIPTION API FUNCTION
 * Replace this function's logic when connecting to Mailchimp, ConvertKit, Brevo, or Zapier.
 */
async function subscribeToNewsletter(email) {
  console.log(`[TamaraVibes Newsletter Integration] Subscribing email: ${email}`);
  
  // Simulate network request latency
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return true for UI success demonstration
  return true;
}

/* ==========================================================================
   11. THEME TOGGLE (DARK / LIGHT MODE)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const brandLogoImg = document.getElementById('brandLogoImg');
  
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('tamaravibes_theme', theme);

    // Update mobile theme-color meta tag for seamless UI matching
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute('content', theme === 'dark' ? '#121019' : '#1E1926');
  }

  // Check saved theme from localStorage or system preference
  const savedTheme = localStorage.getItem('tamaravibes_theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }

  if (!themeToggleBtn) return;

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    applyTheme(newTheme);

    if (typeof showToast === 'function') {
      showToast(newTheme === 'dark' ? '🌙 Dark Mode Enabled' : '☀️ Light Mode Enabled');
    }
  });
}

/* ==========================================================================
   12. INTERACTIVE MOUSE SPARKLE TRAIL (LIGHT & DARK MODE RESPONSIVE)
   ========================================================================== */
function initMouseSparkles() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.id = 'mouseSparkleCanvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  canvas.style.background = 'transparent';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  let lastSpawn = 0;

  const lightPalette = ['#D97757', '#E8AC84', '#F1641E', '#FFB703', '#FFD166'];
  const darkPalette = ['#E8AC84', '#B892FF', '#70D6FF', '#FFD166', '#F5EEF8', '#C77DFF'];

  function createSparkle(x, y) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const palette = isDark ? darkPalette : lightPalette;
    const color = palette[Math.floor(Math.random() * palette.length)];
    
    const count = Math.random() < 0.6 ? 1 : 2;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5 - 0.5,
        size: Math.random() * 3.5 + 1.5,
        alpha: 1,
        decay: Math.random() * 0.025 + 0.02,
        color: color,
        rotation: Math.random() * Math.PI,
        rotationSpeed: (Math.random() - 0.5) * 0.1
      });
    }
  }

  window.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastSpawn > 25) {
      createSparkle(e.clientX, e.clientY);
      lastSpawn = now;
    }
  });

  function draw4PointStar(ctx, x, y, size, color, alpha, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;

    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      ctx.lineTo(Math.cos((i * Math.PI) / 2) * size, Math.sin((i * Math.PI) / 2) * size);
      ctx.lineTo((Math.cos((i * Math.PI) / 2 + Math.PI / 4) * size) / 3, (Math.sin((i * Math.PI) / 2 + Math.PI / 4) * size) / 3);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;
      p.size = Math.max(0, p.size - 0.03);
      p.rotation += p.rotationSpeed;

      if (p.alpha <= 0 || p.size <= 0) {
        particles.splice(i, 1);
      } else {
        draw4PointStar(ctx, p.x, p.y, p.size, p.color, p.alpha, p.rotation);
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   13. QUICK VIEW PRODUCT MODAL (POPUP CARD) - DYNAMIC DOM ALLOCATION
   ========================================================================== */
function openQuickViewModal(productId) {
  const product = etsyProducts.find(p => p.id === productId);
  if (!product) return;

  // Ensure no existing modal remains
  closeQuickViewModal();

  const modal = document.createElement('div');
  modal.className = 'modal-backdrop active';
  modal.id = 'quickViewModal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');

  modal.innerHTML = `
    <div class="modal-card" id="quickViewCard">
      <button class="modal-close-btn" onclick="closeQuickViewModal()" aria-label="Close product modal">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      <div class="modal-img-container">
        <img src="${product.image}" alt="${product.title}">
      </div>

      <div class="modal-body">
        <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem;">
          ${product.badge ? `<span class="product-badge" style="position: static;">${product.badge}</span>` : ''}
          <span class="product-platform-tag platform-etsy" style="position: static;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z"/></svg>
            Etsy Listing
          </span>
        </div>

        <span class="modal-tag">${product.category}</span>
        <h2 class="modal-title">${product.title}</h2>
        
        <div class="modal-price">
          <span class="product-price ${product.originalPrice ? 'sale-price' : ''}">${product.price}</span>
          ${product.originalPrice ? `<span class="product-original-price" style="margin-left: 0.5rem; font-size: 1rem; text-decoration: line-through; color: var(--clr-text-muted);">${product.originalPrice}</span>` : ''}
        </div>

        <p class="modal-desc">${product.description}</p>

        <div style="display: flex; gap: 1rem; align-items: center; margin-top: 1rem; flex-wrap: wrap;">
          <a href="${product.url}" target="_blank" rel="noopener noreferrer" class="btn btn-etsy" style="padding: 0.75rem 1.5rem; font-size: 0.95rem;">
            Buy on Etsy 🛍️
          </a>
          <button onclick="closeQuickViewModal()" class="btn btn-secondary" style="padding: 0.75rem 1.25rem; font-size: 0.95rem;">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  `;

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeQuickViewModal();
    }
  });

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
}

function closeQuickViewModal() {
  const modal = document.getElementById('quickViewModal');
  if (modal) {
    modal.remove();
  }
  document.body.style.overflow = '';
}

function initQuickViewModal() {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQuickViewModal();
    }
  });
}

/* ==========================================================================
   14. 3D MODEL SWITCHER (MUG & T-SHIRT)
   ========================================================================== */
function switchModel(modelType) {
  const viewer = document.getElementById('mainModelViewer');
  const btnMug = document.getElementById('modelBtnMug');
  const btnTshirt = document.getElementById('modelBtnTshirt');

  if (!viewer) return;

  if (modelType === 'mug') {
    viewer.src = 'models/mug.glb';
    if (btnMug) btnMug.classList.add('active');
    if (btnTshirt) btnTshirt.classList.remove('active');
  } else if (modelType === 'tshirt') {
    viewer.src = 'models/tshirt.glb';
    if (btnTshirt) btnTshirt.classList.add('active');
    if (btnMug) btnMug.classList.remove('active');
  }
}
