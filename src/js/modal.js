// import { lock, unlock } from 'tua-body-scroll-lock';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

// ? --- Модалка с формой добавления отзыва
let reviews_modal = document.querySelector('.reviews-modal');
let reviews_modal_open = document.querySelector('.reviews-modal__open');
let reviews_modal_close = document.querySelector('.reviews-modal__close');
let reviews_modal_form = document.querySelector('.reviews-modal__form');

// ? - Открытие
reviews_modal_open.addEventListener('click', () => {
  reviews_modal.classList.add('reviews-modal--active');
  disableBodyScroll(reviews_modal);
});

// ? - Закрытие
reviews_modal_close.addEventListener('click', () => {
  reviews_modal.classList.remove('reviews-modal--active');
  reviews_modal.querySelector(`.reviews-modal__inner`).classList.remove(`reviews-modal__inner--hidden`);
  reviews_modal.querySelector(`.reviews-modal__success`).classList.remove(`reviews-modal__success--active`);
  enableBodyScroll(reviews_modal);
})

document.addEventListener('click', (e) => {
  if (e.target === reviews_modal_open) {
    return;
  }
  else if (!(document.querySelector('.reviews-modal__wrapper').contains(e.target))) {
    reviews_modal.classList.remove('reviews-modal--active');
    reviews_modal.querySelector(`.reviews-modal__inner`).classList.remove(`reviews-modal__inner--hidden`);
    reviews_modal.querySelector(`.reviews-modal__success`).classList.remove(`reviews-modal__success--active`);
    enableBodyScroll(reviews_modal);
  }
}, { capture: true, })

// ? - Подтверждение отправки модалки
reviews_modal_form.addEventListener('submit', (e) => {
  e.preventDefault();
  document.querySelector('.reviews-modal__inner').classList.add('reviews-modal__inner--hidden');
  document.querySelector('.reviews-modal__success').classList.add('reviews-modal__success--active');
})

// ? --- Модалка с формой заявки
document.querySelector('.heading__input').addEventListener('input', () => {
  document.querySelector('.order-modal__inner-input--work').value = document.querySelector('.heading__input').value;
})

let order_modal = document.querySelector('.order-modal');
let order_modal_open = document.querySelector('.heading__input-submit');
let order_modal_close = document.querySelector('.order-modal__close');
let order_modal_form = document.querySelector('.order-modal__form');

// ? - Открытие
order_modal_open.addEventListener('click', () => {
  order_modal.classList.add('order-modal--active');
  disableBodyScroll(order_modal);
});

// ? - Закрытие
order_modal_close.addEventListener('click', () => {
  order_modal.classList.remove('order-modal--active');
  order_modal.querySelector(`.order-modal__inner`).classList.remove(`reviews-modal__inner--hidden`);
  order_modal.querySelector(`.order-modal__success`).classList.remove(`reviews-modal__success--active`);
  enableBodyScroll(order_modal);
})

document.addEventListener('click', (e) => {
  if (e.target === order_modal_open) {
    return;
  }
  else if (!(document.querySelector('.order-modal__wrapper').contains(e.target))) {
    order_modal.classList.remove('order-modal--active');
    order_modal.querySelector(`.order-modal__inner`).classList.remove(`order-modal__inner--hidden`);
    order_modal.querySelector(`.order-modal__success`).classList.remove(`order-modal__success--active`);
    enableBodyScroll(order_modal);
  }
}, { capture: true, })

// ? - Подтверждение отправки модалки
order_modal_form.addEventListener('submit', (e) => {
  e.preventDefault();
  document.querySelector('.reviews-modal__inner').classList.add('order-modal__inner--hidden');
  document.querySelector('.reviews-modal__success').classList.add('order-modal__success--active');
})