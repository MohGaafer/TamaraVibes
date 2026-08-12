/**
 * ============================================================================
 * TAMARAVIBES - 3D MODEL VIEWER RESPONSIVE ENGINE & BUBBLE CONTROLLER
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  init3DViewer();
});

function init3DViewer() {
  const viewer = document.getElementById('mainModelViewer');
  const bubble = document.getElementById('dragRotateBubble');
  if (!viewer) return;

  // Responsive camera framing optimization to eliminate clipping at all 360-degree rotation angles
  function updateResponsiveCamera() {
    const isLandscape = window.matchMedia('(max-width: 992px) and (orientation: landscape)').matches || 
                        (window.innerWidth <= 992 && window.innerHeight <= 500);
    const isMobilePortrait = window.innerWidth <= 768 && !isLandscape;
    const isTabletPortrait = window.innerWidth > 768 && window.innerWidth <= 992 && !isLandscape;

    if (isLandscape) {
      viewer.setAttribute('camera-orbit', '348.9deg 75deg 0.96m');
      viewer.setAttribute('field-of-view', '30deg');
    } else if (isMobilePortrait) {
      viewer.setAttribute('camera-orbit', '348.9deg 75deg 0.95m');
      viewer.setAttribute('field-of-view', '30deg');
    } else if (isTabletPortrait) {
      viewer.setAttribute('camera-orbit', '348.9deg 75deg 0.94m');
      viewer.setAttribute('field-of-view', '30deg');
    } else {
      // Desktop / Large Screens / TV: Prominent, fully unclipped 360° rotation safety
      viewer.setAttribute('camera-orbit', '348.9deg 75deg 0.92m');
      viewer.setAttribute('field-of-view', '30deg');
    }
  }

  updateResponsiveCamera();
  window.addEventListener('resize', debounce(updateResponsiveCamera, 150));

  // Interactive Drag & Rotate Guidance Bubble Behavior
  if (bubble) {
    let interactionTimer = null;

    const hideBubble = () => {
      bubble.classList.add('is-hidden');
    };

    const showBubble = () => {
      bubble.classList.remove('is-hidden');
    };

    const onInteractionStart = () => {
      hideBubble();
      if (interactionTimer) clearTimeout(interactionTimer);
    };

    const onInteractionEnd = () => {
      if (interactionTimer) clearTimeout(interactionTimer);
      interactionTimer = setTimeout(showBubble, 400);
    };

    // Pointer / Touch / Mouse Events
    viewer.addEventListener('pointerdown', onInteractionStart, { passive: true });
    viewer.addEventListener('touchstart', onInteractionStart, { passive: true });
    viewer.addEventListener('mousedown', onInteractionStart, { passive: true });

    viewer.addEventListener('pointerup', onInteractionEnd, { passive: true });
    viewer.addEventListener('touchend', onInteractionEnd, { passive: true });
    viewer.addEventListener('mouseup', onInteractionEnd, { passive: true });
    viewer.addEventListener('pointercancel', onInteractionEnd, { passive: true });

    // Model Viewer native events
    viewer.addEventListener('user-interaction', onInteractionStart, { passive: true });

    viewer.addEventListener('camera-change', (event) => {
      if (event.detail && event.detail.source === 'user-interaction') {
        onInteractionStart();
        if (interactionTimer) clearTimeout(interactionTimer);
        interactionTimer = setTimeout(showBubble, 600);
      }
    }, { passive: true });
  }
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
