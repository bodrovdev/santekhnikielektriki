import { lock, unlock } from 'tua-body-scroll-lock';
// import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

// ? --- Модалка с формой добавления отзыва
let reviews_modal = document.querySelector('.reviews-modal');
let reviews_modal_open = document.querySelector('.reviews-modal__open');
let reviews_modal_close = document.querySelector('.reviews-modal__close');
let reviews_modal_form = document.querySelector('.reviews-modal__form');

// ? - Открытие
reviews_modal_open.addEventListener('click', () => {
  reviews_modal.classList.add('reviews-modal--active');
  // disableBodyScroll(reviews_modal);
  lock(reviews_modal);
});

// ? - Закрытие
reviews_modal_close.addEventListener('click', () => {
  reviews_modal.classList.remove('reviews-modal--active');
  reviews_modal.querySelector(`.reviews-modal__inner`).classList.remove(`reviews-modal__inner--hidden`);
  reviews_modal.querySelector(`.reviews-modal__success`).classList.remove(`reviews-modal__success--active`);
  // enableBodyScroll(reviews_modal);
  unlock(reviews_modal);
})

document.addEventListener('click', (e) => {
  if (e.target === reviews_modal_open || document.querySelector('.fancybox__container') !== null) {
    return;
  }
  else if (!(document.querySelector('.reviews-modal__wrapper').contains(e.target))) {
    reviews_modal.classList.remove('reviews-modal--active');
    reviews_modal.querySelector(`.reviews-modal__inner`).classList.remove(`reviews-modal__inner--hidden`);
    reviews_modal.querySelector(`.reviews-modal__success`).classList.remove(`reviews-modal__success--active`);
    // enableBodyScroll(reviews_modal);
    unlock(reviews_modal);
  }
}, { capture: true, })

// ? - Подтверждение отправки формы
reviews_modal_form.addEventListener('submit', (e) => {
  e.preventDefault();
  document.querySelector('.reviews-modal__inner').classList.add('reviews-modal__inner--hidden');
  document.querySelector('.reviews-modal__success').classList.add('reviews-modal__success--active');
})