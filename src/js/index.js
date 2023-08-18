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
// let heading_input = document.querySelector('.heading__input');
// let heading_submit = document.querySelector('.heading__input-submit');

// heading_input.addEventListener('input', () => {
//   heading_submit.classList.toggle('heading__input-submit--disabled', heading_input.value === '')
// })

// ? --- Открытие и закрытие элементов услуг
function removeStyle(item) {
  item.setAttribute('style', '');
}
let services_cards = document.querySelectorAll('.services__item');
services_cards.forEach(card => {
  card.querySelector('.services__item-card-button').addEventListener('click', () => {

    Array.from(services_cards).map(card_item => card_item !== card ?
      (() => {
        card_item.classList.remove('services__item--active');
        removeStyle(card_item);
      })() :
      card_item);

    card.classList.toggle('services__item--active');

    card.classList.contains('services__item--active') ?
      card.setAttribute('style', `padding: 0 0 ${card.querySelector('.services__item-pricing').offsetHeight}px 0`) :
      removeStyle(card);
  })
})

// ? --- Разметка блока с услугами
let services_cards_wrapper = document.querySelector('.services__wrapper');

function servicePricingLayout() {
  services_cards.forEach(card => {
    card.querySelector('.services__item-pricing').setAttribute('style', `left:${services_cards_wrapper.offsetLeft - card.offsetLeft}px!important; width:${services_cards_wrapper.offsetWidth}px!important;`)
  })
}
window.addEventListener('load', servicePricingLayout);
window.addEventListener('resize', servicePricingLayout);

// ? --- Загрузка файлов в блоке с обратной связью
import { fileUpload } from "./fileUpload";

let feedback_attach_input = document.getElementById('feedback_attach_input');
let feedback_attach_button = document.getElementById('feedback_attach_button');
let feedback_attach_block = document.getElementById('feedback_attach_list');
let feedback_attach_element = function (source, value) {
  return `
  <li class="feedback__form-attach-item">
    <button class="feedback__form-attach-cancel base-button" type="button" data-name="${value.name}"></button>
    <a class="base-link" href="${source}" data-fancybox>
      <img class="feedback__form-attach-img" src="${source}" width="40" height="40" alt="${value.name}">
    </a>
  </li>
  `
}
let feedback_attach_element_class = `feedback__form-attach-item`;

fileUpload(feedback_attach_input, feedback_attach_button, feedback_attach_block, feedback_attach_element, feedback_attach_element_class);

// ? --- Загрузка файла в блоке с добавлением отзыва
let reviews_attach_input = document.getElementById('reviews_attach_input');
let reviews_attach_button = document.getElementById('reviews_attach_button');
let reviews_attach_block = document.getElementById('reviews_attach_block');
let reviews_attach_element = function (source, value) {
  return `
  <div class="reviews-modal__image-item">
    <button class="reviews-modal__image-cancel base-button" type="button" data-name="${value.name}"></button>
    <a class="base-link" href="${source}" data-fancybox>
      <img class="reviews-modal__image-img" src="${source}" width="70" height="70" alt="${value.name}">
    </a>
  </div>
  `
}
let reviews_attach_element_class = `reviews-modal__image-item`;

fileUpload(reviews_attach_input, reviews_attach_button, reviews_attach_block, reviews_attach_element, reviews_attach_element_class);

// ? --- Рейтинг в блоке с добавлением отзыва
let rating_buttons = document.querySelectorAll('.reviews-modal__rating-button');
let current_active;

rating_buttons.forEach(button => {
  button.addEventListener('click', () => {

    document.querySelector('.reviews-modal__rating-input').value = button.dataset.rating;

    rating_buttons.forEach(button => {
      button.classList.remove('reviews-modal__rating-button--active');
    })
    current_active = Array.from(rating_buttons).indexOf(button);

    for (let i = 0; i <= Array.from(rating_buttons).indexOf(button); i++) {
      rating_buttons[i].classList.add('reviews-modal__rating-button--active');
    }
  })

  button.addEventListener('mouseover', () => {
    if (current_active) {
      rating_buttons.forEach(button => {
        button.classList.remove('reviews-modal__rating-button--active');
      })
    }
    for (let i = 0; i <= Array.from(rating_buttons).indexOf(button); i++) {
      rating_buttons[i].classList.add('reviews-modal__rating-button--hovered');
    }
  })

  button.addEventListener('mouseleave', () => {
    rating_buttons.forEach(button => {
      button.classList.remove('reviews-modal__rating-button--hovered');
    })
    if (current_active) {
      for (let i = 0; i <= current_active; i++) {
        rating_buttons[i].classList.add('reviews-modal__rating-button--active');
      }
    }
  })
})

// ? --- Загрузка файлов в блоке с оформлением заказа
let order_attach_input = document.getElementById('order_attach_input');
let order_attach_button = document.getElementById('order_attach_button');
let order_attach_block = document.getElementById('order_attach_list');
let order_attach_element = function (source, value) {
  return `
  <li class="feedback__form-attach-item">
    <button class="feedback__form-attach-cancel base-button" type="button" data-name="${value.name}"></button>
    <a class="base-link" href="${source}" data-fancybox>
      <img class="feedback__form-attach-img" src="${source}" width="40" height="40" alt="${value.name}">
    </a>
  </li>
  `
}
let order_attach_element_class = `feedback__form-attach-item`;

fileUpload(order_attach_input, order_attach_button, order_attach_block, order_attach_element, order_attach_element_class);

window.addEventListener('click', (e) => {
  console.log(e.target);
})