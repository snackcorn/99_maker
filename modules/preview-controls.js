/** Binds zoom and resizer controls while leaving preview rendering to the canvas coordinator. */
function bindPreviewControls({ getZoom, setZoom, refreshPreview }) {
  document.querySelector('#preview-zoom-in').addEventListener('click', () => {
    setZoom(Math.min(3, getZoom() + .25));
    refreshPreview();
  });
  document.querySelector('#preview-zoom-out').addEventListener('click', () => {
    setZoom(Math.max(.5, getZoom() - .25));
    refreshPreview();
  });
  document.querySelector('#preview-fit').addEventListener('click', () => {
    setZoom(1);
    refreshPreview();
  });

  const resizer = document.querySelector('#preview-resizer');
  resizer.addEventListener('pointerdown', event => {
    event.preventDefault();
    const panel = document.querySelector('.layers-panel');
    const startY = event.clientY;
    const startHeight = parseFloat(getComputedStyle(panel).getPropertyValue('--preview-height')) || 170;
    setZoom(1);
    const move = moveEvent => {
      panel.style.setProperty('--preview-height', `${Math.max(90, Math.min(440, startHeight + moveEvent.clientY - startY))}px`);
      refreshPreview();
    };
    const end = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', end);
      refreshPreview();
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', end);
  });
}

window.MakerPreviewControls = { bindPreviewControls };
