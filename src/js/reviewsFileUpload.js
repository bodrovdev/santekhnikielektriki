// ? --- Загрузка файлов в в блоке с добавление отзыва
let reviews_attach_input = document.getElementById('reviews_attach_input');
let reviews_attach_button = document.getElementById('reviews_attach_button');
let reviews_attach_circle = document.querySelector('.reviews-modal__image-circle');

// ? - Функция проверки количества и размера файлов
function checkSize(arr) {
  let array = (Array.from(arr));

  let resultArray = [];
  let errorArray = [];

  array.map(item => {
    ((item.size / (1024 * 1024)).toFixed(2)) > 20 ?
      errorArray.push(item) :
      resultArray.push(item);
  })

  if (errorArray.length !== 0) {
    alert('Некоторые файлы не были прикреплены из-за слишком большого размера!');
  }

  return resultArray;
}

// ? - Функция для отрисовки результирующего массива
function renderList(arr, target) {
  let array = Array.from(arr);

  reviews_attach_circle.innerHTML = '';

  array.forEach(item => {
    const reader = new FileReader();

    reader.onload = ev => {
      const src = ev.target.result;
      target.insertAdjacentHTML('beforeend', `

        <a href="${src}" data-fancybox>
          <button class="reviews-modal__attach-cancel base-button" type="button" data-name="${item.name}"></button>
          <img class="reviews-modal__image-img" src="${src}" alt="${item.name}">
        </a>
        
      `);
    }
    reader.readAsDataURL(item);
  })
}

let inputFiles = [];

// ? - Функция для добавления элемента
function addItem(event) {

  if (inputFiles.length === 0) {
    (() => {
      if (!checkSize(event.target.files)) {
        return;
      }
      else {
        inputFiles = checkSize(event.target.files);
        renderList(inputFiles, reviews_attach_circle);
      }
    })();
  }
  else {
    (() => {
      if (!checkSize(event.target.files) || inputFiles.length + checkSize(event.target.files).length > 10) {
        alert('Количество файлов не должно превышать 10');
        return;
      }
      else {
        inputFiles = inputFiles.concat(checkSize(event.target.files));
        renderList(inputFiles, reviews_attach_circle);
      }
    })();
  }

}

// ? - Функция для удаления элемента
function removeItem(event) {
  if (!event.target.dataset.name) {
    return;
  }
  let name = event.target.dataset.name;
  inputFiles = inputFiles.filter(file => file.name !== name);

  let block = reviews_attach_circle.querySelector(`[data-name="${name}"]`).closest('.feedback__form-attach-item');
  block.remove();
}

reviews_attach_button.addEventListener('click', () => {
  reviews_attach_input.click();
})
reviews_attach_input.addEventListener('change', addItem);
reviews_attach_circle.addEventListener('click', removeItem);