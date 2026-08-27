/**
 * Sneaker Catalog — Vanilla JavaScript Architecture
 * Static GitHub Pages compatible (zero dependencies required)
 */

// Dataset containing all 10 curated footwear models with official assets
const SNEAKERS_DATA = [
  {
    id: 'adidas-handball-spezial-blue',
    brand: 'Adidas',
    brandFull: 'Adidas Originals',
    title: 'adidas Handball Spezial Sneakers - Blue',
    url: 'https://share.google/WhfyMM8HSXswVxeIw',
    imageUrl: './images/sneakers/adidas-handball-spezial-blue.webp',
    fallbackImageUrl: 'https://images.footlocker.com/is/image/EBFL2/IF7087_01?wid=800&hei=800&fmt=png-alpha',
    category: 'Handball Spezial / Blue Sneakers',
    colorway: 'Blue / White / Gum (IF7087)',
    badge: 'Popular',
  },
  {
    id: 'adidas-gazelle-indoor-blue',
    brand: 'Adidas',
    brandFull: 'Adidas Originals',
    title: 'adidas GAZELLE INDOOR SNEAKERS - Blue',
    url: 'https://share.google/kHjb0lpen5psg8gIl',
    imageUrl: './images/sneakers/adidas-gazelle-indoor-blue.jpg',
    fallbackImageUrl: 'https://images.stockx.com/images/adidas-Gazelle-Indoor-Night-Indigo-White-Gum.jpg',
    category: 'Gazelle Indoor / Classic Blue',
    colorway: 'Night Indigo / Core White / Gum (IH9650)',
    badge: 'Trending',
  },
  {
    id: 'adidas-training-spezial-blue',
    brand: 'Adidas',
    brandFull: 'Adidas Originals',
    title: 'adidas Training Spezial - Blue',
    url: 'https://share.google/vLpWRdPha83o02qwr',
    imageUrl: './images/sneakers/adidas-training-spezial-blue.jpg',
    fallbackImageUrl: 'https://cdn.runrepeat.com/storage/gallery/product_primary/40840/adidas-training-spezial-lab-test-and-review-24327481-1440.jpg',
    category: 'Training Spezial / Indigo Blue',
    colorway: 'Night Indigo / Off White (LA6308)',
    isSpecialBg: true,
  },
  {
    id: 'on-womens-cloud-6-waterproof-blue',
    brand: 'On Running',
    brandFull: 'On Running',
    title: "Women's Cloud 6 Waterproof | Blue",
    url: 'https://share.google/oLcYAcItd9Fr1LS8D',
    imageUrl: './images/sneakers/on-womens-cloud-6-waterproof-blue.webp',
    fallbackImageUrl: 'https://images.ctfassets.net/hnk2vsx53n6l/3Z5i5CdItWT7IFXV8uy2nV/38c60e96883992048b5426c7de7fb89e/04de6c15e21e3ab649116d4cbbb988ee34ceb491.png?w=1200&h=630&fit=pad&bg=rgb:ffffff&q=85&fm=webp',
    category: "Cloud 6 Waterproof / Women's Blue",
    colorway: 'Navy / Midnight (3WF10050147)',
    badge: 'Waterproof',
  },
  {
    id: 'on-womens-cloudtilt-moon-blue',
    brand: 'On Running',
    brandFull: 'On Running',
    title: "Women's Cloudtilt Moon | Blue",
    url: 'https://share.google/zgXhuB2dDPObZpNzL',
    imageUrl: './images/sneakers/on-womens-cloudtilt-moon-blue.webp',
    fallbackImageUrl: 'https://images.ctfassets.net/hnk2vsx53n6l/2q9B8yxy3USTDnlWbzZPhY/734a873b9db0a1ca948d7612ef831e27/0dfa66e56f26bcd6ecb902d0d32ae98094a145c7.png?w=1200&h=630&fit=pad&bg=rgb:ffffff&q=85&fm=webp',
    category: 'Cloudtilt Moon / Atmospheric Blue',
    colorway: 'Nimbus / Nimbus (3WF30423776)',
    badge: 'CloudTec Phase',
  },
  {
    id: 'nike-court-vision-low-suede-womens',
    brand: 'Nike',
    brandFull: 'Nike Sportswear',
    title: "Nike Court Vision Low Suede Women's Shoes",
    url: 'https://share.google/n6DV8OwF0mbc3pUn5',
    imageUrl: './images/sneakers/nike-court-vision-low-suede-womens.png',
    fallbackImageUrl: 'https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/58a286e6-74e3-4299-ba2e-f34c064d957f/W+NIKE+COURT+VISION+LO+SUEDE.png',
    category: 'Court Vision Low / Suede Edition',
    colorway: 'Suede Edition (IQ9757-400)',
  },
  {
    id: 'nike-court-vision-low-premium-womens',
    brand: 'Nike',
    brandFull: 'Nike Sportswear',
    title: "Nike Court Vision Low Premium Women's Shoes",
    url: 'https://share.google/2Zd7HNBImaLYMxdMa',
    imageUrl: './images/sneakers/nike-court-vision-low-premium-womens.png',
    fallbackImageUrl: 'https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/49d7362d-07b5-46b7-8e6d-5bf86b1649eb/W+NIKE+COURT+VISION+LO+PRM.png',
    category: 'Court Vision Low / Premium Series',
    colorway: 'Multi / Textured Premium (IR1387-400)',
    badge: 'Premium',
    isSpecialBg: true,
  },
  {
    id: 'nike-field-general-womens',
    brand: 'Nike',
    brandFull: 'Nike Athletics',
    title: "Nike Field General Women's Shoes",
    url: 'https://share.google/pyJFxMLWlMLFIIqeI',
    imageUrl: './images/sneakers/nike-field-general-womens.png',
    fallbackImageUrl: 'https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ce68c6ce-2cf4-4f93-ba9a-7562359a1272/WMNS+NIKE+FIELD+GENERAL.png',
    category: "Field General / Women's Classic",
    colorway: 'Classic Low (IH2487-400)',
  },
  {
    id: 'nike-astrograbber-leather-womens',
    brand: 'Nike',
    brandFull: 'Nike Heritage',
    title: "Nike Astrograbber Leather Women's Shoes",
    url: 'https://share.google/nLSZSGraSsTzFDvPN',
    imageUrl: './images/sneakers/nike-astrograbber-leather-womens.png',
    fallbackImageUrl: 'https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/f89ad740-de90-47a2-8bca-4614a405a191/W+NIKE+ASTROGRABBER+LTHR.png',
    category: 'Astrograbber / Leather Craft',
    colorway: 'Leather Core (II1259-400)',
    badge: 'Retro Vault',
  },
  {
    id: 'nike-sb-zoom-nyjah-4-skate',
    brand: 'Nike',
    brandFull: 'Nike SB',
    title: 'Nike SB Zoom Nyjah 4 Skate Shoes',
    url: 'https://share.google/Q3DOmrZgxz4ruMcUz',
    imageUrl: './images/sneakers/nike-sb-zoom-nyjah-4-skate.png',
    fallbackImageUrl: 'https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/279565a2-8ddd-41c3-bdf2-d6ee5247f665/NIKE+SB+ZOOM+NYJAH+4.png',
    category: 'Zoom Nyjah 4 / Elite Performance',
    colorway: 'Signature Nyjah Edition (FQ1273-400)',
    badge: 'Pro Model',
    isDarkTheme: true,
  },
];

// Inline SVG Icon Helpers
const ICONS = {
  search: '<svg class="icon-svg" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
  grid: '<svg class="icon-svg" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>',
  list: '<svg class="icon-svg" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>',
  externalLink: '<svg class="icon-svg" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>',
  copy: '<svg class="icon-svg" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',
  check: '<svg class="icon-svg" viewBox="0 0 24 24" style="stroke:#10b981"><polyline points="20 6 9 17 4 12"></polyline></svg>',
  maximize: '<svg class="icon-svg" viewBox="0 0 24 24"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>',
  close: '<svg class="icon-svg" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
  chevronLeft: '<svg class="icon-svg" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>',
  chevronRight: '<svg class="icon-svg" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>',
};

// Application State
const state = {
  activeBrand: 'all',
  searchQuery: '',
  viewMode: 'grid', // 'grid' | 'list'
  previewIndex: null, // index in filtered list
  filteredList: [...SNEAKERS_DATA],
};

// DOM References
const brandTabsContainer = document.getElementById('brand-tabs');
const searchInput = document.getElementById('search-input');
const viewGridBtn = document.getElementById('view-grid-btn');
const viewListBtn = document.getElementById('view-list-btn');
const itemCountDisplay = document.getElementById('item-count-display');
const catalogContainer = document.getElementById('catalog-container');

// Modal DOM References
const modalOverlay = document.getElementById('image-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalPrevBtn = document.getElementById('modal-prev-btn');
const modalNextBtn = document.getElementById('modal-next-btn');
const modalTitle = document.getElementById('modal-title');
const modalMeta = document.getElementById('modal-meta');
const modalImg = document.getElementById('modal-img');
const modalSpecs = document.getElementById('modal-specs');
const modalLink = document.getElementById('modal-link');
const modalShareBtn = document.getElementById('modal-share-btn');
const liveTimestamp = document.getElementById('live-timestamp');

/**
 * Initialize Application
 */
function init() {
  renderBrandTabs();
  setupEventListeners();
  updateLiveTimestamp();
  applyFilters();
}

/**
 * Render Brand Navigation Tabs with item counts
 */
function renderBrandTabs() {
  const brands = [
    { key: 'all', label: 'Overview', count: SNEAKERS_DATA.length },
    { key: 'Adidas', label: 'Adidas', count: SNEAKERS_DATA.filter(s => s.brand === 'Adidas').length },
    { key: 'On Running', label: 'On Running', count: SNEAKERS_DATA.filter(s => s.brand === 'On Running').length },
    { key: 'Nike', label: 'Nike', count: SNEAKERS_DATA.filter(s => s.brand === 'Nike').length },
  ];

  brandTabsContainer.innerHTML = brands
    .map(
      b => `
      <button class="brand-tab ${state.activeBrand === b.key ? 'active' : ''}" data-brand="${b.key}">
        <span>${b.label}</span>
        <span class="tab-count">${b.count}</span>
      </button>
    `
    )
    .join('');

  brandTabsContainer.querySelectorAll('.brand-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeBrand = btn.dataset.brand;
      renderBrandTabs();
      applyFilters();
    });
  });
}

/**
 * Filter dataset based on active brand and search query
 */
function applyFilters() {
  const query = state.searchQuery.trim().toLowerCase();

  state.filteredList = SNEAKERS_DATA.filter(sneaker => {
    const matchesBrand = state.activeBrand === 'all' || sneaker.brand === state.activeBrand;
    const matchesQuery =
      !query ||
      sneaker.title.toLowerCase().includes(query) ||
      sneaker.brand.toLowerCase().includes(query) ||
      sneaker.brandFull.toLowerCase().includes(query) ||
      sneaker.category.toLowerCase().includes(query) ||
      sneaker.colorway.toLowerCase().includes(query);

    return matchesBrand && matchesQuery;
  });

  // Update item count UI
  itemCountDisplay.textContent = `${state.filteredList.length} of ${SNEAKERS_DATA.length} models`;

  renderCatalog();
}

/**
 * Render catalog items in either Grid or List mode
 */
function renderCatalog() {
  if (state.filteredList.length === 0) {
    catalogContainer.innerHTML = `
      <div class="empty-state">
        <p class="empty-title">No matching footwear found</p>
        <p class="empty-subtitle">Try adjusting your search query or switching category filters</p>
        <button id="reset-filters-btn" class="btn-reset">Reset All Filters</button>
      </div>
    `;
    document.getElementById('reset-filters-btn')?.addEventListener('click', () => {
      state.searchQuery = '';
      state.activeBrand = 'all';
      searchInput.value = '';
      renderBrandTabs();
      applyFilters();
    });
    return;
  }

  if (state.viewMode === 'grid') {
    renderGridView();
  } else {
    renderListView();
  }
}

/**
 * Render Grid View
 */
function renderGridView() {
  const cardsHtml = state.filteredList
    .map((sneaker, idx) => {
      const isDark = sneaker.isDarkTheme;
      const isSpecialBg = sneaker.isSpecialBg;
      const cardClass = `sneaker-card ${isSpecialBg ? 'special-bg' : ''} ${isDark ? 'dark-theme' : ''}`;
      const indexNumber = String(idx + 1).padStart(2, '0');

      return `
        <article class="${cardClass}" id="card-${sneaker.id}">
          <div>
            <div class="card-top">
              <span class="card-index">${indexNumber} &mdash; ${sneaker.brand}</span>
              ${sneaker.badge ? `<span class="card-badge">${sneaker.badge}</span>` : ''}
            </div>

            <div class="card-img-container" data-preview-idx="${idx}" title="Click to view full photograph">
              <img 
                src="${sneaker.imageUrl}" 
                alt="${sneaker.title}"
                loading="lazy"
                onerror="this.onerror=null; this.src='${sneaker.fallbackImageUrl}';"
              />
              <div class="expand-hint">
                ${ICONS.maximize}
              </div>
            </div>

            <h3 class="card-title">${sneaker.title}</h3>
            <p class="card-spec">${sneaker.colorway}</p>
          </div>

          <div class="card-bottom">
            <a 
              href="${sneaker.url}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="link-catalog"
              title="Open direct listing"
            >
              <span>View Catalog</span>
              ${ICONS.externalLink}
            </a>

            <button 
              type="button" 
              class="btn-share copy-action-btn" 
              data-url="${sneaker.url}" 
              data-title="${sneaker.title}"
              title="Copy share link"
            >
              ${ICONS.copy}
              <span class="share-text">Share</span>
            </button>
          </div>
        </article>
      `;
    })
    .join('');

  catalogContainer.innerHTML = `<div class="sneakers-grid">${cardsHtml}</div>`;
  attachCatalogEventListeners();
}

/**
 * Render List View
 */
function renderListView() {
  const rowsHtml = state.filteredList
    .map((sneaker, idx) => {
      const isDark = sneaker.isDarkTheme;
      const isSpecialBg = sneaker.isSpecialBg;
      const rowClass = `sneaker-list-item ${isSpecialBg ? 'special-bg' : ''} ${isDark ? 'dark-theme' : ''}`;
      const indexNumber = String(idx + 1).padStart(2, '0');

      return `
        <div class="${rowClass}" id="row-${sneaker.id}">
          <div class="list-left">
            <div class="list-thumb-container" data-preview-idx="${idx}" title="Click to expand">
              <img 
                src="${sneaker.imageUrl}" 
                alt="${sneaker.title}"
                loading="lazy"
                onerror="this.onerror=null; this.src='${sneaker.fallbackImageUrl}';"
              />
            </div>

            <div class="list-info">
              <div class="list-meta">
                <span class="card-index">${indexNumber} &mdash; ${sneaker.brandFull}</span>
                ${sneaker.badge ? `<span class="card-badge">${sneaker.badge}</span>` : ''}
              </div>
              <h3 class="list-title">${sneaker.title}</h3>
              <div class="list-details">
                <span>${sneaker.colorway}</span>
                <span>&bull;</span>
                <span>${sneaker.category}</span>
              </div>
            </div>
          </div>

          <div class="list-actions">
            <button 
              type="button" 
              class="btn-share copy-action-btn" 
              data-url="${sneaker.url}" 
              data-title="${sneaker.title}"
              title="Copy share link"
            >
              ${ICONS.copy}
              <span class="share-text">Share</span>
            </button>

            <a 
              href="${sneaker.url}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="link-catalog"
            >
              <span>View</span>
              ${ICONS.externalLink}
            </a>
          </div>
        </div>
      `;
    })
    .join('');

  catalogContainer.innerHTML = `<div class="sneakers-list">${rowsHtml}</div>`;
  attachCatalogEventListeners();
}

/**
 * Attach listeners to dynamically generated card elements
 */
function attachCatalogEventListeners() {
  // Image preview triggers
  document.querySelectorAll('[data-preview-idx]').forEach(el => {
    el.addEventListener('click', () => {
      const idx = parseInt(el.dataset.previewIdx, 10);
      openImageModal(idx);
    });
  });

  // Copy share links
  document.querySelectorAll('.copy-action-btn').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.stopPropagation();
      const url = btn.dataset.url;
      const textSpan = btn.querySelector('.share-text');
      const originalSvg = btn.querySelector('svg')?.outerHTML || ICONS.copy;

      try {
        await navigator.clipboard.writeText(url);
        if (textSpan) textSpan.textContent = 'Copied!';
        btn.innerHTML = `${ICONS.check} <span class="share-text" style="color:#10b981">Copied!</span>`;

        setTimeout(() => {
          btn.innerHTML = `${originalSvg} <span class="share-text">Share</span>`;
        }, 2000);
      } catch (err) {
        console.warn('Clipboard write failed, fallback to manual prompt', err);
      }
    });
  });
}

/**
 * Open Image Lightbox Modal
 */
function openImageModal(index) {
  if (index < 0 || index >= state.filteredList.length) return;
  state.previewIndex = index;
  const sneaker = state.filteredList[index];

  modalTitle.textContent = sneaker.title;
  modalMeta.textContent = `${sneaker.brandFull} &mdash; ${sneaker.category}`.replace('&mdash;', '—');
  modalImg.src = sneaker.imageUrl;
  modalImg.alt = sneaker.title;
  modalImg.onerror = () => {
    modalImg.src = sneaker.fallbackImageUrl;
  };

  modalSpecs.innerHTML = `<strong>SPEC:</strong> ${sneaker.colorway}`;
  modalLink.href = sneaker.url;

  // Configure modal share button
  modalShareBtn.onclick = async () => {
    try {
      await navigator.clipboard.writeText(sneaker.url);
      modalShareBtn.innerHTML = `${ICONS.check} <span style="color:#10b981">Copied Link</span>`;
      setTimeout(() => {
        modalShareBtn.innerHTML = `${ICONS.copy} <span>Share Link</span>`;
      }, 2000);
    } catch (e) {
      console.warn(e);
    }
  };

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/**
 * Close Image Lightbox Modal
 */
function closeImageModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
  state.previewIndex = null;
}

/**
 * Set up global event listeners
 */
function setupEventListeners() {
  // Live search input
  searchInput.addEventListener('input', e => {
    state.searchQuery = e.target.value;
    applyFilters();
  });

  // View mode switcher
  viewGridBtn.addEventListener('click', () => {
    if (state.viewMode !== 'grid') {
      state.viewMode = 'grid';
      viewGridBtn.classList.add('active');
      viewListBtn.classList.remove('active');
      renderCatalog();
    }
  });

  viewListBtn.addEventListener('click', () => {
    if (state.viewMode !== 'list') {
      state.viewMode = 'list';
      viewListBtn.classList.add('active');
      viewGridBtn.classList.remove('active');
      renderCatalog();
    }
  });

  // Modal navigation controls
  modalCloseBtn.addEventListener('click', closeImageModal);
  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) {
      closeImageModal();
    }
  });

  modalPrevBtn.addEventListener('click', e => {
    e.stopPropagation();
    if (state.previewIndex !== null && state.previewIndex > 0) {
      openImageModal(state.previewIndex - 1);
    } else if (state.previewIndex === 0) {
      openImageModal(state.filteredList.length - 1);
    }
  });

  modalNextBtn.addEventListener('click', e => {
    e.stopPropagation();
    if (state.previewIndex !== null && state.previewIndex < state.filteredList.length - 1) {
      openImageModal(state.previewIndex + 1);
    } else if (state.previewIndex === state.filteredList.length - 1) {
      openImageModal(0);
    }
  });

  // Keyboard navigation
  window.addEventListener('keydown', e => {
    if (!modalOverlay.classList.contains('open')) return;

    if (e.key === 'Escape') {
      closeImageModal();
    } else if (e.key === 'ArrowLeft') {
      modalPrevBtn.click();
    } else if (e.key === 'ArrowRight') {
      modalNextBtn.click();
    }
  });
}

/**
 * Dynamic live timestamp updater for the archive footer
 */
function updateLiveTimestamp() {
  if (!liveTimestamp) return;
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  liveTimestamp.textContent = `${year}.${month}.${day} — ARCHIVE ACTIVE`;
}

// Start app on DOMContentLoaded
document.addEventListener('DOMContentLoaded', init);
