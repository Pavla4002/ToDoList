// ToDo List

let buttonAdd = document.querySelector('#buttonSubmit');
let inputTitleTask = document.querySelector('#title');
let inputDataTask = document.querySelector('#data');
let listToDo = document.querySelector('.list-to-do');
let buttonDel = document.querySelector('.delete');


let arrObj= [];

// Если в LocalStorage есть информация то он нам ее дает для отрисовки
if(localStorage.getItem('toDoList')){
    arrObj= JSON.parse(localStorage.getItem('toDoList'));
    displayMessages(); // выводит данные из хранилища li
}

// Функция для добавления объектов в массив
buttonAdd.addEventListener('click',function (){
    function idDetermine (){
        if(arrObj.length === 0) {
            return arrObj.length;
        }
        else {
            let idLastElement = arrObj[arrObj.length -1];
            return idLastElement.id +1
        }
    }

    let obj = {
        id:idDetermine(), // Было просто arrObj.length idDetermine()
        name:inputTitleTask.value,
        data: inputDataTask.value,
        status:false
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
     <li class="list ${ item.status === true ? 'greenTask' : '' }" id="${i}">
            <span class="titleTaskLi">${item.name}</span>
             <span>${item.data}</span>
            <div class="buttons-list">
                <button type="button" class="edit">Редактировать</button>
                <button type="button" class="delete">Удалить</button>
            </div>
        </li> `;
        listToDo.innerHTML = message; //для добавления li  в ul
    })
}

// Функция для выделения выполненных задач зеленым цветом
listToDo.addEventListener('click',function (e){
    //Add greenTask class
    let liEvent = e.target; // элемент, который поймал клик
    if (liEvent && liEvent.classList.contains('titleTaskLi')) {
        let parent = liEvent.closest('.list')
        parent.classList.toggle('greenTask');
    }
    //Assign the value true or false
    let elementLi =liEvent.closest('.list');
    let idLi = elementLi.getAttribute('id');
    if(elementLi.classList.contains('greenTask')){
        arrObj[idLi].status= true;   //Найти какой айди у li  с таким id  и эта цифра будет айди объекта
    }else {
        arrObj[idLi].status= false;
    }

    // Удалени элемнта
    if (liEvent && liEvent.classList.contains('delete')) {
        let rezConfirm = confirm('Вы точно хотите удалить запись?');
        if(rezConfirm){
            let delElement = liEvent.closest('.list');
            let idDelElem = delElement.getAttribute('id');
            delElement.remove();
            arrObj.splice(idDelElem,1);
            localStorage.setItem('toDoList', JSON.stringify(arrObj));
            if(arrObj.length === 0){
                localStorage.clear();
                console.log(listToDo);
            }
            else{
                localStorage.setItem('toDoList', JSON.stringify(arrObj));
                console.log(listToDo)
            }
        }
        }

    // Editing an entry

        localStorage.setItem('toDoList', JSON.stringify(arrObj));
        displayMessages();
})


