class RSGallery {
  constructor(gallery) {
    this.gallery = gallery;
    this.images = Array.from(this.gallery.querySelectorAll('img'));
    this.modal = document.querySelector('.rsg__modal');
    this.prevButton = this.modal.querySelector('[data-prev]');
    this.nextButton = this.modal.querySelector('[data-next]');

    this.images.forEach(image => {
      image.addEventListener('click', e => this.showImage(e.currentTarget));
      image.addEventListener('keyup', e => {
        if (e.key === 'Enter') {
          this.showImage(e.currentTarget);
        }
      });
    });
    this.modal.addEventListener('click', this.handleClickOutside);
  }

  openModal = () => {
    if (this.modal.matches('.-open')) return;

    this.modal.classList.add('-open');
    window.addEventListener('keyup', this.handleKeyUp);
    this.nextButton.addEventListener('click', this.showNextImage);
    this.prevButton.addEventListener('click', this.showPrevImage);
  }

  closeModal = () => {
    this.modal.classList.remove('-open');
    window.removeEventListener('keyup', this.handleKeyUp);
    this.nextButton.removeEventListener('click', this.showNextImage);
    this.prevButton.removeEventListener('click', this.showPrevImage);
  }

  handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      this.closeModal();
    }
  }

  handleKeyUp = (e) => {
    if (e.key === 'Escape') return this.closeModal();
    if (e.key === 'ArrowRight') return this.showNextImage();
    if (e.key === 'ArrowLeft') return this.showPrevImage();
  }

  showNextImage = () => {
    const nextFigure = this.currentImage.parentElement.nextElementSibling

    if (nextFigure) {
      this.showImage(nextFigure.firstElementChild);
    } else {
      this.showImage(this.gallery.firstElementChild.firstElementChild);
    }
  }

  showPrevImage = () => {
    const previousFigure = this.currentImage.parentElement.previousElementSibling

    if (previousFigure) {
      this.showImage(previousFigure.firstElementChild);
    } else {
      this.showImage(this.gallery.lastElementChild.firstElementChild);
    }
  }

  showImage = (el) => {
    if (!el) return;

    this.modal.querySelector('[data-image]').src = el.src;
    this.modal.querySelector('[data-title]').textContent = el.title;
    this.modal.querySelector('[data-description]').textContent = el.dataset.description;
    this.currentImage = el;
    this.openModal();
  }
}

export default RSGallery;
