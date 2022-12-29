function Gallery(gallery) {
  if (!gallery) {
    throw new Error('Gallery does not exist')
  }

  this.gallery = gallery;

  this.image = Array.from(gallery.querySelectorAll('img'));
  this.modal = document.querySelector('.rsg__modal');
  this.prevButton = this.modal.querySelector('[data-prev]');
  this.nextButton = this.modal.querySelector('[data-next]');

  this.showNextImage = this.showNextImage.bind(this);
  this.showPrevImage = this.showPrevImage.bind(this);
  this.handleKeyUp = this.handleKeyUp.bind(this);
  this.handleClickOutside = this.handleClickOutside.bind(this);


  this.image.forEach(image => {
    image.addEventListener('click', e => this.showImage(e.currentTarget));
    image.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
        this.showImage(e.currentTarget);
      }
    });
  });
  this.modal.addEventListener('click', this.handleClickOutside);
}

Gallery.prototype.openModal = function () {
  if (this.modal.matches('.-open')) return;

  this.modal.classList.add('-open');
  window.addEventListener('keyup', this.handleKeyUp);
  this.nextButton.addEventListener('click', this.showNextImage);
  this.prevButton.addEventListener('click', this.showPrevImage);
}

Gallery.prototype.closeModal = function () {
  this.modal.classList.remove('-open');
  window.removeEventListener('keyup', this.handleKeyUp);
  this.nextButton.removeEventListener('click', this.showNextImage);
  this.prevButton.removeEventListener('click', this.showPrevImage);
}

Gallery.prototype.handleClickOutside = function (e) {
  if (e.target === e.currentTarget) {
    this.closeModal();
  }
}

Gallery.prototype.handleKeyUp = function (e) {
  if (e.key === 'Escape') return this.closeModal();
  if (e.key === 'ArrowRight') return this.showNextImage();
  if (e.key === 'ArrowLeft') return this.showPrevImage();
}

Gallery.prototype.showNextImage = function () {
  console.log(this)
  const nextFigure = this.currentImage.parentElement.nextElementSibling


  if (nextFigure) {
    this.showImage(nextFigure.firstElementChild);
  } else {
    this.showImage(this.gallery.firstElementChild.firstElementChild);
  }
}

Gallery.prototype.showPrevImage = function () {
  const previousFigure = this.currentImage.parentElement.previousElementSibling

  if (previousFigure) {
    this.showImage(previousFigure.firstElementChild);
  } else {
    this.showImage(this.gallery.lastElementChild.firstElementChild);
  }
}

Gallery.prototype.showImage = function (el) {
  if (!el) return;

  this.modal.querySelector('[data-image]').src = el.src;
  this.modal.querySelector('[data-title]').textContent = el.title;
  this.modal.querySelector('[data-description]').textContent = el.dataset.description;
  this.currentImage = el;
  this.openModal();
}

const gallery1 = new Gallery(document.querySelector('#rsg-1'));
const gallery2 = new Gallery(document.querySelector('#rsg-2'));