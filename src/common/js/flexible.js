(function flexible (window, document) {
  const root = document.documentElement;
  const dpr = window.devicePixelRatio;

  const setFontSize = () => {
    let viewportWidth = root.getBoundingClientRect().width || 375;
    viewportWidth = viewportWidth > 650 ? 650 : viewportWidth;

    root.style.fontSize = `${viewportWidth / 10}px`;
    document.body.style.fontSize = `${12 * dpr}px`;
  };

  root.setAttribute('data-dpr', dpr);

  window.addEventListener('resize', setFontSize, false);

  if (document.readyState === 'complete') setFontSize();

  document.addEventListener('DOMContentLoaded', setFontSize, false);
})(window, document);
