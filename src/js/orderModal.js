import { lock, unlock } from 'tua-body-scroll-lock';
// import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

// ? --- Модалка с формой заявки
document.querySelector('.heading__input').addEventListener('input', () => {
  document.querySelector('.order-modal__inner-input--work').value = document.querySelector('.heading__input').value;
})

let order_modal = document.querySelector('.order-modal');
let order_modal_open = document.querySelector('.heading__input-submit');
let order_modal_close = document.querySelectorAll('.order-modal__close-button');
let order_modal_form = document.querySelector('.order-modal__form');

// ? - Открытие
order_modal_open.addEventListener('click', () => {
  order_modal.classList.add('order-modal--active');

  // disableBodyScroll(order_modal);
  lock(order_modal);
});

// ? - Закрытие
order_modal_close.forEach(button => {
  button.addEventListener('click', () => {
    order_modal.classList.remove('order-modal--active');
    order_modal.querySelector(`.order-modal__inner`).classList.remove(`order-modal__inner--hidden`);
    order_modal.querySelector(`.order-modal__success`).classList.remove(`order-modal__success--active`);

    order_modal_formset_one.classList.add('order-modal__inner-formset--active');
    order_modal_formset_two.classList.remove('order-modal__inner-formset--active');
    document.querySelector('.order-modal__inner-steps span').textContent = 1;

    // enableBodyScroll(order_modal);
    unlock(order_modal);
  })
})

document.addEventListener('click', (e) => {
  if (e.target === order_modal_open || document.querySelector('.fancybox__container') !== null) {
    return;
  }
  else if (!(document.querySelector('.order-modal__wrapper').contains(e.target))) {
    order_modal.classList.remove('order-modal--active');
    order_modal.querySelector(`.order-modal__inner`).classList.remove(`order-modal__inner--hidden`);
    order_modal.querySelector(`.order-modal__success`).classList.remove(`order-modal__success--active`);

    // enableBodyScroll(order_modal);
    unlock(order_modal);
  }
}, { capture: true, })

// ? - Подтверждение отправки формы
order_modal_form.addEventListener('submit', (e) => {
  e.preventDefault();
  document.querySelector('.order-modal__inner').classList.add('order-modal__inner--hidden');
  document.querySelector('.order-modal__success').classList.add('order-modal__success--active');
})

// ? - Проверка формы на валидность, переключение шагов формы
let order_modal_next = document.querySelector('.order-modal__next');
let order_modal_prev = document.querySelector('.order-modal__prev');
let order_modal_formset_one = document.querySelector('.order-modal__inner-formset--one');
let order_modal_formset_two = document.querySelector('.order-modal__inner-formset--two');

document.querySelector('.order-modal__inner-input--work').addEventListener('input', () => {
  document.querySelector('.order-modal__inner-input--work') !== '' ?
    (() => {
      order_modal_next.classList.remove('order-modal__next--disabled');
      order_modal_next.removeAttribute('disabled');
    })() :
    (() => {
      order_modal_next.classList.add('order-modal__next--disabled');
      order_modal_next.setAttribute('disabled', 'disabled');
    })();
})

order_modal_next.addEventListener('click', () => {
  order_modal_formset_one.classList.remove('order-modal__inner-formset--active');
  order_modal_formset_two.classList.add('order-modal__inner-formset--active');
  document.querySelector('.order-modal__inner-steps span').textContent = 2;
})

order_modal_prev.addEventListener('click', () => {
  order_modal_formset_one.classList.add('order-modal__inner-formset--active');
  order_modal_formset_two.classList.remove('order-modal__inner-formset--active');
  document.querySelector('.order-modal__inner-steps span').textContent = 1;
})

// ? - Селект в форме
const select = document.querySelector('.order-modal__inner-formset-select');
const select_shown = document.querySelector('.order-modal__select-shown');
const select_list = document.querySelector('.order-modal__select-list');
let select_items = select_list.querySelectorAll('.order-modal__select-list-item');
const select_input = document.querySelector('.order-modal__select-input');

function selectItem(element, element_value) {
  select_shown.textContent = element_value;
  select_input.value = element_value;
  select_items.forEach((item) => { item.classList.remove('order-modal__select-list-item--selected') })
  element.classList.add('order-modal__select-list-item--selected');
}

select.addEventListener('click', () => {
  document.querySelector('.order-modal__select-arrow').classList.toggle('order-modal__select-arrow--active');
  select_list.classList.toggle('order-modal__select-list--active');
})

select_list.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI' && e.target.dataset.value === 'Срочно') {
    selectItem(e.target, e.target.dataset.value);
    document.querySelector('.order-modal__inner-formset-date').classList.add('visually-hidden');
  }
  else if (e.target.tagName === 'LI' && e.target.dataset.value === 'Не срочно') {
    selectItem(e.target, e.target.dataset.value);
    document.querySelector('.order-modal__inner-formset-date').classList.remove('visually-hidden');
  }
})

document.addEventListener('click', (e) => {
  if (!select.contains(e.target)) {
    select_list.classList.remove('order-modal__select-list--active');
    document.querySelector('.order-modal__select-arrow').classList.remove('feedback__select-arrow--active');
  }
})