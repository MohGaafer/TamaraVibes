/**
 * ============================================================================
 * TAMARAVIBES - 3D MODEL VIEWER RESPONSIVE ENGINE
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  init3DViewer();
});

function init3DViewer() {
  const viewer = document.getElementById('mainModelViewer');
  if (!viewer) return;

  // Responsive camera framing optimization to eliminate clipping at all 360-degree rotation angles
  function updateResponsiveCamera() {
    const isLandscape = window.matchMedia('(max-width: 992px) and (orientation: landscape)').matches || 
                        (window.innerWidth <= 992 && window.innerHeight <= 500);
    const isMobilePortrait = window.innerWidth <= 768 && !isLandscape;

    if (isLandscape) {
      viewer.setAttribute('camera-orbit', '348.9deg 75deg 0.78m');
      viewer.setAttribute('field-of-view', '33deg');
    } else if (isMobilePortrait) {
      viewer.setAttribute('camera-orbit', '348.9deg 75deg 0.78m');
      viewer.setAttribute('field-of-view', '34deg');
    } else {
      // Desktop / Large Screens: Large prominent mug with full rotation safety
      viewer.setAttribute('camera-orbit', '348.9deg 75deg 0.76m');
      viewer.setAttribute('field-of-view', '32deg');
    }
  }

  updateResponsiveCamera();
  window.addEventListener('resize', debounce(updateResponsiveCamera, 150));
}

// Utility debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
