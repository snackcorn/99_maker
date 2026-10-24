/** Connects the shared file picker to either a sticker creator or the selected background. */
function bindImagePicker({ createSticker, getSelected, refreshPreview }) {
  const picker = document.querySelector('#image-picker');
  let target = 'sticker';

  const choose = nextTarget => {
    target = nextTarget;
    picker.value = '';
    picker.click();
  };

  document.querySelector('#add-sticker').addEventListener('click', () => choose('sticker'));
  document.querySelector('#background-image').addEventListener('click', () => choose('background'));
  picker.addEventListener('change', () => {
    const file = picker.files?.[0];
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) {
      alert('15MB 이하의 이미지를 선택해 주세요.');
      return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      if (target === 'sticker') {
        createSticker(reader.result, file.name.replace(/\.[^.]+$/, ''));
        return;
      }
      const background = getSelected();
      if (!background || background.dataset.isBackground !== 'true') return;
      background.dataset.image = reader.result;
      Object.assign(background.style, {
        backgroundImage: `url("${reader.result}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      });
      refreshPreview();
    });
    reader.readAsDataURL(file);
  });
}

window.MakerImagePicker = { bindImagePicker };
