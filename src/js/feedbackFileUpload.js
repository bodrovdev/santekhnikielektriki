// ? --- Загрузка файлов в блоке обратной связи
let attach_input = document.getElementById('attach_input');
let attach_button = document.getElementById('attach_button');
let attach_list = document.getElementById('attach_list');

// ? - Функция проверки количества и размера файлов
function checkLengthAndSize(arr) {
  let array = (Array.from(arr));

  if (array.length > 10) {
    alert('Количество файлов не должно превышать 10');
    return;
  }
  else {
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
}

// ? - Функция для отрисовки результирующего массива
function renderList(arr, target) {
  let array = Array.from(arr);

  attach_list.innerHTML = '';

  array.forEach(item => {
    const reader = new FileReader();

    reader.onload = ev => {
      const src = ev.target.result;
      target.insertAdjacentHTML('beforeend', `

        <li class="feedback__form-attach-item">
          <button class="feedback__form-attach-cancel base-button" type="button" data-name="${item.name}"></button>
          <a class="base-link" href="${src}" data-fancybox>
            <img class="feedback__form-attach-img" src="${src}" width="40" height="40" alt="${item.name}">
          </a>
        </li>
        
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
      if (!checkLengthAndSize(event.target.files)) {
        return;
      }
      else {
        inputFiles = checkLengthAndSize(event.target.files);
        renderList(inputFiles, attach_list);
      }
    })();
  }
  else {
    (() => {
      if (!checkLengthAndSize(event.target.files) || inputFiles.length + checkLengthAndSize(event.target.files).length > 10) {
        alert('Количество файлов не должно превышать 10');
        return;
      }
      else {
        inputFiles = inputFiles.concat(checkLengthAndSize(event.target.files));
        renderList(inputFiles, attach_list);
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

  let block = attach_list.querySelector(`[data-name="${name}"]`).closest('.feedback__form-attach-item');
  block.remove();
}

attach_button.addEventListener('click', () => {
  attach_input.click();
})
attach_input.addEventListener('change', addItem);
attach_list.addEventListener('click', removeItem);