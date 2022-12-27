function Gallery(gallery) {
  if (!gallery) {
    throw new Error('Gallery does not exist')
  }

  const images = Array.from(gallery.querySelectorAll('img'));
  const modal = document.querySelector('.rsg__modal');
  const prevButton = modal.querySelector('[data-prev]');
  const nextButton = modal.querySelector('[data-next]');
  let currentImage;

  function openModal() {
    if (modal.matches('.-open')) return;

    modal.classList.add('-open');
    window.addEventListener('keyup', handleKeyUp);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
  }

  function closeModal() {
    modal.classList.remove('-open');
    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
  }

  function handleClickOutside(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }


  function handleKeyUp(e) {
    if (e.key === 'Escape') return closeModal();
    if (e.key === 'ArrowRight') return showNextImage();
    if (e.key === 'ArrowLeft') return showPrevImage();
  }

  function showNextImage() {
    const nextFigure = currentImage.parentElement.nextElementSibling

    if (nextFigure) {
      showImage(nextFigure.firstElementChild);
    } else {
      showImage(gallery.firstElementChild.firstElementChild);
    }
  }

  function showPrevImage() {
    const previousFigure = currentImage.parentElement.previousElementSibling

    if (previousFigure) {
      showImage(previousFigure.firstElementChild);
    } else {
      showImage(gallery.lastElementChild.firstElementChild);
    }
  }

  function showImage(el) {
    if (!el) return;

    modal.querySelector('[data-image]').src = el.src;
    modal.querySelector('[data-title]').textContent = el.title;
    modal.querySelector('[data-description]').textContent = el.dataset.description;

    currentImage = el;
    openModal();
  }

  images.forEach(image => {
    image.addEventListener('click', e => showImage(e.currentTarget));
    image.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
        showImage(e.currentTarget);
      }
    });
  });
  modal.addEventListener('click', handleClickOutside);
}

Gallery(document.querySelector('#rsg-1'));
Gallery(document.querySelector('#rsg-2'));