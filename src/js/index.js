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

// ? --- Ховер для кнопки в хедере
window.addEventListener('load', () => {
  let heading_input = document.querySelector('.heading__input');
  let heading_submit = document.querySelector('.heading__input-submit');

  heading_input.addEventListener('input', () => {
    heading_submit.classList.toggle('heading__input-submit--disabled', heading_input.value === '')
  })
})

// ? Загрузка файлов в блоке обратной связи
let attach_input = document.getElementById('attach_input');
let attach_button = document.getElementById('attach_button');
let attach_list = document.getElementById('attach_list');

let inputFiles = [];

function addItem(event) {
  if (event.target.files.length > 10) {
    alert('Не более 10 изображений!');
    attach_input.value = '';
    attach_list.innerHTML = '';

    console.log(inputFiles);
    return;
  }
  else if (event.target.files.length + inputFiles.length > 10) {
    alert('Не более 10 изображений!');

    console.log(inputFiles);
    return;
  }
  else {
    !inputFiles.length ? inputFiles = Array.from(event.target.files) : inputFiles = inputFiles.concat(Array.from(event.target.files));
    attach_list.innerHTML = '';

    console.log(inputFiles);

    inputFiles.forEach(file => {
      if ((file.size / (1024 * 1024)).toFixed(2) > 20) {
        inputFiles.splice(inputFiles.indexOf(file), 1);
        alert(`Файл ${file.name} слишком большой`);
      }
      else {
        const reader = new FileReader();

        reader.onload = ev => {
          const src = ev.target.result;
          attach_list.insertAdjacentHTML('beforeend', `
  
            <li class="feedback__form-attach-item">
              <button class="feedback__form-attach-cancel base-button" type="button" data-name="${file.name}"></button>
              <a class="base-link" href="${src}" data-fancybox>
                <img class="feedback__form-attach-img" src="${src}" width="40" height="40" alt="${file.name}">
              <a>
            </li>
            
          `);
        }
        reader.readAsDataURL(file);
      }
    })
  }
}

function removeItem(event) {
  if (!event.target.dataset.name) {
    return;
  }
  let name = event.target.dataset.name;
  inputFiles = inputFiles.filter(file => file.name !== name);

  console.log(inputFiles);

  let block = attach_list.querySelector(`[data-name="${name}"]`).closest('.feedback__form-attach-item');
  block.remove();
}

attach_button.addEventListener('click', () => {
  attach_input.click();
})

attach_input.addEventListener('change', addItem);
attach_list.addEventListener('click', removeItem);