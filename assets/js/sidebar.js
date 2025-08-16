// Sidebar hover annotations system
class SidebarAnnotations {
  constructor() {
    this.sidebar = null;
    this.sidebarContent = null;
    this.currentTimeout = null;
    this.allAnnotations = [];
    this.currentHighlight = null;
    this.init();
  }

  init() {
    this.createSidebar();
    this.collectAllAnnotations();
    this.setupHoverListeners();
  }

  createSidebar() {
    // Create sidebar HTML
    this.sidebar = document.createElement('div');
    this.sidebar.className = 'sidebar';
    this.sidebar.innerHTML = `
      <div class="sidebar-content">
        <div class="sidebar-title">Annotations</div>
        <div class="sidebar-body">
          <p>Hover over highlighted text to see all annotations.</p>
        </div>
      </div>
    `;
    document.body.appendChild(this.sidebar);
    this.sidebarContent = this.sidebar.querySelector('.sidebar-body');
  }

  collectAllAnnotations() {
    // Collect all elements with data-note attributes
    const annotatedElements = document.querySelectorAll('[data-note]');
    this.allAnnotations = Array.from(annotatedElements).map((el, index) => ({
      id: index,
      element: el,
      text: el.textContent.trim(),
      note: el.dataset.note
    }));
  }

  setupHoverListeners() {
    // Add hover listeners to elements with data-note attribute
    document.addEventListener('mouseover', (e) => {
      const hoverable = e.target.closest('[data-note]');
      if (hoverable) {
        const annotation = this.allAnnotations.find(ann => ann.element === hoverable);
        this.showSidebar(annotation);
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

  showSidebar(currentAnnotation) {
    this.clearHideTimeout();
    this.currentHighlight = currentAnnotation ? currentAnnotation.id : null;
    
    let sidebarHTML = '';
    
    if (this.allAnnotations.length === 0) {
      sidebarHTML = '<p>No annotations found on this page.</p>';
    } else {
      this.allAnnotations.forEach(annotation => {
        const isHighlighted = annotation.id === this.currentHighlight;
        const highlightClass = isHighlighted ? ' highlighted' : '';
        
        sidebarHTML += `
          <div class="sidebar-annotation${highlightClass}">
            <div class="annotation-text">"${annotation.text}"</div>
            <div class="annotation-note">${annotation.note}</div>
          </div>
        `;
      });
    }
    
    this.sidebarContent.innerHTML = sidebarHTML;
    this.sidebar.classList.add('active');
  }

  scheduleSidebarHide() {
    this.currentTimeout = setTimeout(() => {
      this.hideSidebar();
    }, 300); // Small delay to allow moving to sidebar
  }

  hideSidebar() {
    this.sidebar.classList.remove('active');
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