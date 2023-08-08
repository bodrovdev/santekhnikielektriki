// import { lock, unlock } from 'tua-body-scroll-lock';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

// ? Мобильное меню
const burger = document.getElementById('burger');
const mobile_menu = document.getElementById('mobile_menu');
const main_nav = document.querySelector('.main-nav');
const nav_nav_list = document.querySelector('.main-nav__mobile-menu-list');

function openMobileMenu() {
  burger.classList.add('main-nav__burger--active');
  mobile_menu.classList.add('main-nav__mobile-menu--active');
  document.body.classList.add('body-cover');

  disableBodyScroll(mobile_menu);
}
function closeMobileMenu() {
  burger.classList.remove('main-nav__burger--active');
  mobile_menu.classList.remove('main-nav__mobile-menu--active');
  document.body.classList.remove('body-cover');

  enableBodyScroll(mobile_menu);
}

// ? Открытие / закрытие меню по клику на бургер
burger.addEventListener('click', () => {
  burger.classList.contains('main-nav__burger--active') ? closeMobileMenu() : openMobileMenu();
})

// ? Варианты закрытия меню
document.addEventListener('click', (e) => {

  !(main_nav.contains(e.target)) || nav_nav_list.contains(e.target) && e.target.tagName === 'A' ?
    closeMobileMenu() :
    main_nav;

});

// ? --- Для модалок
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

// ? --- Отключение подсветки ошибок в инпутах
window.addEventListener('load', () => {
  if (!(document.querySelectorAll('input') === null)) {
    document.querySelectorAll('input').forEach((input) => {
      input.setAttribute('spellcheck', 'false');
    })
  }
})

// ? --- Показать страницу только после загрузки
window.addEventListener('load', () => {
  document.body.removeAttribute('style');
})