// ToDo List

let inputTitleTask = document.querySelector('#title');
let inputDataTask = document.querySelector('#data');
let listToDo = document.querySelector('.list-to-do');
let buttonEditAdd = document.querySelector('.button-add-save');
let buttonSave = document.querySelector('.button-edit');

let arrObj= [];

// Если в LocalStorage есть информация то он нам ее дает для отрисовки
if(localStorage.getItem('toDoList')){
    arrObj= JSON.parse(localStorage.getItem('toDoList'));
    displayMessages(); // выводит данные из хранилища li
}

// Функция для добавления объектов в массив
buttonEditAdd.addEventListener('click',function (){
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
        id:idDetermine (), // Было просто arrObj.length idDetermine()
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
             <span class="dataTask">${item.data}</span>
            <div class="buttons-list">
                <button type="button" class="edit">Редактировать</button>
                <button type="button" class="delete">Удалить</button>
            </div>
        </li> `;
        listToDo.innerHTML = message; //для добавления li  в ul
    })
}

//Зеленые задачи, удаление, редактирование
listToDo.addEventListener('click',function (e){
    //Add greenTask class
    let liEvent = e.target; // элемент, который поймал клик
    if (liEvent && liEvent.classList.contains('titleTaskLi')) {
        let parent = liEvent.closest('.list')
        parent.classList.toggle('greenTask');
    }
    //Assign the value true or false
    function assignTrueFalse (){
        let elementLi =liEvent.closest('.list');
        let idLi = elementLi.getAttribute('id');
        if(elementLi.classList.contains('greenTask')){
            arrObj[idLi].status= true;   //Найти какой айди у li  с таким id  и эта цифра будет айди объекта
        }else {
            arrObj[idLi].status= false;
        }
    }
    assignTrueFalse();

    // Удалени элемнта
    function removeElement (rezConfirm){
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
            }
    }
    if (liEvent && liEvent.classList.contains('delete')) {
        let rezConfirm = confirm('Вы точно хотите удалить запись?');
        removeElement(rezConfirm);
    }

    // Editing an entry
    if (liEvent && liEvent.classList.contains('edit')) {
        buttonEditAdd.classList.add('none');
        buttonSave.classList.remove('none');

        let parent2 =  liEvent.closest('.list');
        // console.log(parent2.getAttribute('id'))
        let idLi = parent2.getAttribute('id');
        let valueTitleTask = parent2.querySelector('.titleTaskLi');
        let valueDataTask = parent2.querySelector('.dataTask');

        inputTitleTask.value = valueTitleTask.innerHTML; // Заголовок задачи в input
        inputDataTask.value = valueDataTask.innerHTML;

        buttonSave.addEventListener('click',function (e){
            valueTitleTask.innerHTML = inputTitleTask.value;
            arrObj[idLi].name = valueTitleTask.innerHTML;
            localStorage.setItem('toDoList', JSON.stringify(arrObj));
            displayMessages();
            console.log( arrObj[idLi].name)
            valueDataTask.innerHTML = inputDataTask.value;
            arrObj[idLi].data = valueDataTask.innerHTML;
            buttonEditAdd.classList.remove('none');
            buttonSave.classList.add('none');
        })

    }


    // сохранение в хранилище и перерисовка
        localStorage.setItem('toDoList', JSON.stringify(arrObj));
        displayMessages();
})


