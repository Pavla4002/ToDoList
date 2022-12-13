// ToDo List

let buttonAdd = document.querySelector('#buttonSubmit');
let inputTitleTask = document.querySelector('#title');
let inputDataTask = document.querySelector('#data');
let listToDo = document.querySelector('.list-to-do');
let titleTask =  document.querySelector('.titleTaskLi');
let colorLiTask =  document.querySelector('.list');

let arrObj= [];

// Если в LocalStorage есть информация то он нам ее дает для отрисовки
if(localStorage.getItem('toDoList')){
    arrObj.forEach(function (item,i){
        if(item.status === 'Выполнено'){
            listToDo.querySelector(`#${i}`).classList.add('greenTask')
        }
    })
    arrObj= JSON.parse(localStorage.getItem('toDoList'))

    displayMessages() // выводит данные из хранилища li
}

// Функция для добавления объектов в массив
buttonAdd.addEventListener('click',function (){
    let obj = {
        id:arrObj.length,
        name:inputTitleTask.value,
        data: inputDataTask.value,
        status:'Не выполнено'
    }
    arrObj.push(obj);
    displayMessages(); // Отображение данного объекта
    localStorage.setItem('toDoList', JSON.stringify(arrObj)) //перевод информациив JSON для сохранения в локальном хранилище
})

//Функция для вывода li с нужным заголовком и датой
function displayMessages(){
    let message = '';
    arrObj.forEach(function (item,i){
        // добавление новых li к уже существующим или в пустой список
        message += `   
     <li class="list" id="${i}">
            <span class="titleTaskLi">${item.name}</span>
             <span>${item.data}</span>
            <div class="buttons-list">
                <button type="button">Редактировать</button>
                <button type="button">Удалить</button>
            </div>
        </li> `;
        listToDo.innerHTML = message; //для добавления li  в ul
    })
}

// Функция для выделения выполненных задач зеленым цветом
listToDo.addEventListener('click',function (e){
    let liEvent = e.target; // элемент, который поймал клик
    if (liEvent && liEvent.nodeName === 'LI') {
        liEvent.classList.toggle('greenTask');
    }
    let idLi = liEvent.getAttribute('id'); // получение id элемента, который поймал click
    if(liEvent.classList.contains('greenTask')){
        arrObj[idLi].status='Выполнено'    //Найти какой айди у li  с таким id  и эта цифра будет айди объекта
    }else {
        arrObj[idLi].status='Не выполнено'
    }
    localStorage.setItem('toDoList', JSON.stringify(arrObj))
    console.log(JSON.stringify(arrObj))
})


console.log(arrObj)