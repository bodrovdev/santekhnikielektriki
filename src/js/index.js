// import { lock, unlock } from 'tua-body-scroll-lock';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

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
let heading_input = document.querySelector('.heading__input');
let heading_submit = document.querySelector('.heading__input-submit');

heading_input.addEventListener('input', () => {
  heading_submit.classList.toggle('heading__input-submit--disabled', heading_input.value === '')
})

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