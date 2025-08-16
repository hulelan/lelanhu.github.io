// Sidebar hover annotations system
class SidebarAnnotations {
  constructor() {
    this.sidebar = null;
    this.sidebarContent = null;
    this.currentTimeout = null;
    this.init();
  }

  init() {
    this.createSidebar();
    this.setupHoverListeners();
  }

  createSidebar() {
    // Create sidebar HTML
    this.sidebar = document.createElement('div');
    this.sidebar.className = 'sidebar';
    this.sidebar.innerHTML = `
      <div class="sidebar-content">
        <div class="sidebar-title">Hover Notes</div>
        <div class="sidebar-body">
          <p>Hover over highlighted text to see annotations appear here.</p>
        </div>
      </div>
    `;
    document.body.appendChild(this.sidebar);
    this.sidebarContent = this.sidebar.querySelector('.sidebar-body');
  }

  setupHoverListeners() {
    // Add hover listeners to elements with data-note attribute
    document.addEventListener('mouseover', (e) => {
      const hoverable = e.target.closest('[data-note]');
      if (hoverable) {
        this.showSidebar(hoverable.dataset.note);
        hoverable.classList.add('hoverable-text');
      }
    });

    document.addEventListener('mouseout', (e) => {
      const hoverable = e.target.closest('[data-note]');
      if (hoverable) {
        this.scheduleSidebarHide();
      }
    });

    // Keep sidebar open when hovering over it
    this.sidebar.addEventListener('mouseenter', () => {
      this.clearHideTimeout();
    });

    this.sidebar.addEventListener('mouseleave', () => {
      this.hideSidebar();
    });
  }

  showSidebar(content) {
    this.clearHideTimeout();
    this.sidebarContent.innerHTML = `<div class="sidebar-note">${content}</div>`;
    this.sidebar.classList.add('active');
    document.querySelector('.content-wrapper').classList.add('sidebar-open');
  }

  scheduleSidebarHide() {
    this.currentTimeout = setTimeout(() => {
      this.hideSidebar();
    }, 300); // Small delay to allow moving to sidebar
  }

  hideSidebar() {
    this.sidebar.classList.remove('active');
    document.querySelector('.content-wrapper').classList.remove('sidebar-open');
  }

  clearHideTimeout() {
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SidebarAnnotations();
});