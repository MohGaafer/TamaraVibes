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
    <article class="category-card category-card-${cat.id} reveal" data-category="${cat.id}">
      <div class="category-img-wrapper">
        <img src="${cat.image}" alt="${cat.name}" loading="lazy" width="300" height="200">
      </div>
      <div class="category-body">
        <h3 class="category-title">${cat.name}</h3>
        <p class="category-desc">${cat.description}</p>
        <button onclick="filterByCategory('${cat.id}')" class="category-link">
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
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '999999';
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
   13. QUICK VIEW PRODUCT MODAL (POPUP CARD)
   ========================================================================== */
function openQuickViewModal(productId) {
  const product = etsyProducts.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('quickViewModal');
  const content = document.getElementById('quickViewContent');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="quickview-img-column">
      <div class="quickview-img-wrapper">
        <img src="${product.image}" alt="${product.title}">
      </div>
    </div>

    <div class="quickview-details-column">
      <div class="quickview-header-tags">
        ${product.badge ? `<span class="product-badge" style="position: static;">${product.badge}</span>` : ''}
        <span class="product-platform-tag platform-etsy" style="position: static;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z"/></svg>
          Etsy Listing
        </span>
      </div>

      <span class="product-category" style="margin-top: 0.75rem; display: block;">${product.category}</span>
      <h2 class="quickview-title">${product.title}</h2>
      
      <div class="quickview-price-box">
        <span class="product-price ${product.originalPrice ? 'sale-price' : ''}">${product.price}</span>
        ${product.originalPrice ? `<span class="product-original-price">${product.originalPrice}</span>` : ''}
      </div>

      <p class="quickview-description">${product.description}</p>

      <div class="quickview-actions">
        <a href="${product.url}" target="_blank" rel="noopener noreferrer" class="btn btn-etsy quickview-buy-btn">
          Buy on Etsy 🛍️
        </a>
        <button onclick="closeQuickViewModal()" class="btn btn-secondary quickview-continue-btn">
          Continue Shopping
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeQuickViewModal() {
  const modal = document.getElementById('quickViewModal');
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function initQuickViewModal() {
  const modal = document.getElementById('quickViewModal');
  const closeBtn = document.getElementById('quickViewCloseBtn');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeQuickViewModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeQuickViewModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeQuickViewModal();
    }
  });
}
