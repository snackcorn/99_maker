function exportCss() {
  try {
    return [...document.styleSheets].flatMap(sheet => [...sheet.cssRules].map(rule => rule.cssText)).join('\n');
  } catch {
    return '';
  }
}

function saveBlob(blob, name) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 500);
}

function bindExportMenu({ canvas, getOutputFrame }) {
  const options = document.querySelector('#export-options');
  document.querySelector('#export-toggle').addEventListener('click', () => {
    options.hidden = !options.hidden;
  });

  const makeSvg = () => {
    const frame = getOutputFrame();
    const clone = canvas.cloneNode(true);
    clone.querySelectorAll('.selected').forEach(node => node.classList.remove('selected'));
    clone.querySelectorAll('.resize-handle,.polygon-point,.selection-label').forEach(node => node.remove());
    clone.querySelectorAll('.canvas-item').forEach(node => {
      node.style.left = `${(parseFloat(node.style.left) || 0) - frame.left}px`;
      node.style.top = `${(parseFloat(node.style.top) || 0) - frame.top}px`;
    });
    clone.classList.remove('canvas');
    clone.style.cssText = 'position:relative;overflow:hidden;width:100%;height:100%;background:transparent;';
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${frame.width}" height="${frame.height}" viewBox="0 0 ${frame.width} ${frame.height}"><style>${exportCss()}</style><foreignObject width="100%" height="100%">${new XMLSerializer().serializeToString(clone)}</foreignObject></svg>`;
  };

  const rasterize = async type => {
    const svg = makeSvg();
    const image = new Image();
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
      image.src = url;
    });
    const frame = getOutputFrame();
    const output = document.createElement('canvas');
    output.width = frame.width * 2;
    output.height = frame.height * 2;
    const context = output.getContext('2d');
    context.scale(2, 2);
    context.drawImage(image, 0, 0);
    URL.revokeObjectURL(url);
    return new Promise((resolve, reject) => output.toBlob(blob => blob ? resolve(blob) : reject(new Error('image encoding failed')), type === 'jpg' ? 'image/jpeg' : 'image/png', .95));
  };

  document.querySelectorAll('[data-export]').forEach(button => button.addEventListener('click', async () => {
    options.hidden = true;
    const type = button.dataset.export;
    button.disabled = true;
    try {
      if (type === 'svg') {
        saveBlob(new Blob([makeSvg()], { type: 'image/svg+xml' }), 'maker-studio-photoshop.svg');
        return;
      }
      const blob = await rasterize(type === 'jpg' ? 'jpg' : 'png');
      if (type === 'clipboard') {
        if (!navigator.clipboard?.write) throw new Error('clipboard unavailable');
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        alert('PNG 이미지를 클립보드에 복사했습니다.');
      } else {
        saveBlob(blob, `maker-studio.${type}`);
      }
    } catch (error) {
      console.error('[Maker Studio] 내보내기 실패:', error);
      if (type !== 'clipboard') {
        saveBlob(new Blob([makeSvg()], { type: 'image/svg+xml' }), 'maker-studio-fallback.svg');
        alert('PNG/JPG 변환에 실패해 SVG 파일로 저장했습니다.');
      } else {
        alert('클립보드 복사가 허용되지 않았습니다. PNG로 저장해 주세요.');
      }
    } finally {
      button.disabled = false;
    }
  }));
}

window.MakerExportTools = { bindExportMenu };
