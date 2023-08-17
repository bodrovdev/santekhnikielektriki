// ? Загрузка файлов
function fileUpload(input, button, targetBlock, elementBlock, elementClass) {

  // ? Проверка количества и размера файлов
  function checkLengthAndSize(arr) {
    let array = (Array.from(arr));
    let resultArray = [];
    let errorArray = [];

    if (array.length > 10) {
      alert('Количество файлов не должно превышать 10');
      input.value = '';
      return;
    }
    else {
      array.map(item => {
        ((item.size / (1024 * 1024)).toFixed(2)) > 20 ?
          errorArray.push(item) :
          resultArray.push(item);
      })

      if (errorArray.length !== 0) {
        alert('Некоторые файлы не были прикреплены из-за слишком большого размера!');
      }
    }

    return resultArray;
  }

  // ? Отрисовка результирующего массива
  function renderList(arr) {
    let array = Array.from(arr);
    targetBlock.innerHTML = '';

    array.forEach(item => {
      const reader = new FileReader();

      reader.onload = ev => {
        const src = ev.target.result;
        targetBlock.insertAdjacentHTML('beforeend', elementBlock(src, item));
      }
      reader.readAsDataURL(item);
    })
  }

  // ? Обновление filelist внутри input
  function setFilesInsideInput(fileList, newFiles) {
    const dataTransfer = new DataTransfer()
    for (const file of newFiles)
      dataTransfer.items.add(file)
    fileList.files = dataTransfer.files;
  }

  // ? Включение и отключение кнопки добавления элементов
  function buttonStatus() {
    inputFiles.length === 10 ?
      (() => {
        button.setAttribute('disabled', 'disabled');
        button.classList.add(`${button.classList[0]}--disabled`);
      })() :
      (() => {
        button.removeAttribute('disabled');
        button.classList.remove(`${button.classList[0]}--disabled`);
      })()
  }

  let inputFiles = [];

  // ? Добавление элемента
  function addItem(event) {
    if (inputFiles.length === 0) {
      if (!checkLengthAndSize(event.target.files)) {
        return;
      }
      inputFiles = checkLengthAndSize(event.target.files);
      (() => {
        setFilesInsideInput(input, inputFiles);
        renderList(inputFiles);
        buttonStatus();
      })()
    }
    else {
      if (!checkLengthAndSize(event.target.files) || inputFiles.length + checkLengthAndSize(event.target.files).length > 10) {
        alert('Количество файлов не должно превышать 10');
        setFilesInsideInput(input, inputFiles);
        return;
      }
      inputFiles = inputFiles.concat(checkLengthAndSize(event.target.files));
      (() => {
        setFilesInsideInput(input, inputFiles);
        renderList(inputFiles, targetBlock);
        buttonStatus();
      })()
    }

    console.log(input.files);
  }

  // ? - Удаление элемента
  function removeItem(event) {
    if (!event.target.dataset.name) {
      return;
    }
    let name = event.target.dataset.name;
    inputFiles = inputFiles.filter(file => file.name !== name);

    let block = targetBlock.querySelector(`[data-name="${name}"]`).closest(`.${elementClass}`);
    block.remove();

    setFilesInsideInput(input, inputFiles);
    buttonStatus();

    console.log(input.files);
  }

  button.addEventListener('click', () => {
    input.click();
  })

  input.addEventListener('change', addItem);
  targetBlock.addEventListener('click', removeItem);
}

export { fileUpload }