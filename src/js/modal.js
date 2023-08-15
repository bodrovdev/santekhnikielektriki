// import { lock, unlock } from 'tua-body-scroll-lock';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

// ? --- Модалки
// ? - Варианты закрытия модалки
function modalClosing(modal_class) {
  window.addEventListener('click', (e) => {
    if (e.target === document.querySelector(`${modal_class}__close`)) {
      closeFormModal(modal_class);
    }
    else if (e.target !== e.currentTarget) {
      closeFormModal(modal_class);
    }
  })
}

// ? - Закрытие модалки
function closeFormModal(modal_class) {
  document.querySelector(`.${modal_class}`).classList.remove(`${modal_class}--active`);
  enableBodyScroll(modal_class);
}

// ? --- Модалка с формой
window.addEventListener('load', () => {
  if (!(document.querySelector('#modal_with_form') === null)) {

    // let modal_with_form = document.getElementById('modal-with-form');
    // let modal_with_form_close = document.getElementById('modal-with-form-close');
    // let modal_with_form_buttons = document.querySelectorAll('.page-button');
    // let modal_with_form_formset = document.getElementById('modal_with_form_formset');

    // ? - Открытие модалки на нажатие кнопки
    // modal_with_form_buttons.forEach((button) => {
    //   button.addEventListener('click', () => {
    //     modal_with_form.classList.add('modal-form--active');
    //     lock(modal_with_form);
    //   })
    // })

    // ? - Подтверждение отправки модалки
    // modal_with_form_formset.addEventListener('submit', (e) => {
    //   e.preventDefault();
    //   document.querySelector('.modal-form__inner').classList.add('modal-form__inner--hidden');
    //   document.querySelector('.modal-form__success').classList.add('modal-form__success--active');
    // })
  }
})

// ? --- Модалка без формы
window.addEventListener('load', () => {
  if (!(document.querySelector('#modal_without_form') === null) &&
    !(document.querySelector('.modal-without-form__formset') === null)) {

    // let modal_without_form = document.getElementById('modal_without_form');
    // let modal_without_form_formset = document.querySelector('.modal-without-form__formset');

    // ? - Открытие модалки с подтверждением отправки формы
    // modal_without_form_formset.addEventListener('submit', (e) => {
    //   e.preventDefault();
    //   modal_without_form.classList.add('modal-without-form--active');
    //   disableBodyScroll(modal_without_form);

    //   modalClosing(`modal-without-form`);

    //   document.querySelector('.page-contacts__form-body-formset').querySelectorAll('input, textarea').forEach(item => {
    //     item.value = '';
    //   })
    // })
  }
});