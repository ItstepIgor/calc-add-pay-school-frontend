//querySelectorAll сохраняется очередность или нет
//Сделать выпадающий список с поиском и что бы можно было получить id  для сохранения содрудника в базу
//Доделать отправку измененных значений из таблицы в цикле в базу возможно есть updateAll метод
//как разделяют create(get) и update(put) методы для сохранения в базу. Я думаю через if если заполнен id
// то один метод если нет то create
//как сделать по стрелке такое же действие как по tab
//узнать как вывести одинаковую информацию на разных страницах (например меню)
let id
let idDataList

// const fillingSelectPeople = async () => {
//     let people = await getJSON(`${apiUrl}/people/get`)
//     let select = document.getElementById('selectPeopleId')
//     people.forEach(person => {
//         let option = document.createElement('option')
//         option.value = person.id
//         option.innerHTML = person.surName + ' ' + person.firstName + ' ' + person.patronymic
//         select.appendChild(option)
//     })
// }

const fillingDataListPeople = async () => {
    let people = await getJSON(`${apiUrl}/people/get`)
    let select = document.getElementById('dataListPeopleId')
    people.forEach(person => {
        let option = document.createElement('option')
        option.id = person.id
        console.log(option.id)
        option.value = person.surName + ' ' + person.firstName + ' ' + person.patronymic
        select.appendChild(option)
    })
}


const fillingTableTimeSheet = async () => {
    let timeSheets = await getJSON(`${apiUrl}/timesheet/get`)
    timeSheets.forEach(timeSheet => {

        // console.log(timeSheet)
        let div = document.createElement('div')
        let divFio = document.createElement('div')
        let divCalcDate = document.createElement('div')
        let divActualDaysWorked = document.createElement('div')
        // divActualDaysWorked.focusIndex = editDayFocusIndex++;
        let {divUpdate, imgUpdate, divDelete, imgDelete} = createUpdateAndDeleteElement();

        div.className = 'div-table-row'
        divFio.className = 'div-table-cell'
        divCalcDate.className = 'div-table-cell div-align-center'
        divActualDaysWorked.className = 'div-table-cell div-align-center div-edit-day'
        imgUpdate.className = 'img-update'

        divFio.innerHTML = timeSheet.peopleSurAndFirstName
        divCalcDate.innerHTML = timeSheet.calcDate
        divActualDaysWorked.innerHTML = timeSheet.actualDaysWorked
        imgUpdate.id = timeSheet.id
        imgUpdate.onclick = async () => {
            let staff = await getJSON(`${apiUrl}/timesheet/getbyid?id=${imgUpdate.id}`).then()
            id = staff.id
            // document.getElementById('selectPeopleId').value = staff.peopleId
            document.getElementById('dataListPeopleId').value = staff.peopleId
            idDataList = staff.peopleId
            document.querySelector('.input-data-list').value = staff.peopleSurAndFirstName
            document.querySelector('.actual-days-worked').value = staff.actualDaysWorked
        }
        imgDelete.id = timeSheet.id
        imgDelete.onclick = async () => {
            let responseDelete = await fetch(`${apiUrl}/timesheet/delete?id=${imgDelete.id}`)
            location.reload()
        }
        div.appendChild(divFio)
        div.appendChild(divCalcDate)
        div.appendChild(divActualDaysWorked)

        div.appendChild(divUpdate)
        divUpdate.appendChild(imgUpdate)
        div.appendChild(divDelete)
        divDelete.appendChild(imgDelete)
        document.querySelector('.div-table-body').appendChild(div)
    })

    //обработка события для редактирования div
    let editDay = document.querySelectorAll(".div-edit-day");
    for (let i = 0; i < editDay.length; i++) {
        editDay[i].addEventListener('click', function func() {
            let input = document.createElement('input')
            input.className = 'input-edit-day'
            // input.focusIndex = editDayInputFocusIndex++
            input.value = this.innerHTML
            input.focusIndex = i
            input.onkeydown = e => {
                let inputs = document.querySelectorAll('.input-edit-day');
                if (e.key === 'ArrowUp') {
                    inputs.forEach(el => {
                            if (el.focusIndex + 1 === e.target.focusIndex) {
                                el.focus()
                            }
                        }
                    )
                } else if (e.key === 'ArrowDown') {
                    inputs.forEach(el => {
                            if (el.focusIndex - 1 === e.target.focusIndex) {
                                el.focus()
                            }
                        }
                    )
                }
            }
            this.innerHTML = ''
            this.appendChild(input)
            let edit = this
            input.addEventListener('blur', function () {
                edit.innerHTML = this.value
                edit.addEventListener('click', func)
            })
            this.removeEventListener('click', func)
        })
    }
    //симмуляция клика мыши по div
    let editDayClicks = document.querySelectorAll(".div-edit-day");
    editDayClicks.forEach(editDayClick => {
        editDayClick.click()
    })
}

document.querySelector('.save-edit-day').onclick = async (event) => {
    let size = document.querySelectorAll('.div-edit-day');
    let img = document.querySelectorAll('.img-update');
    let jsonDays = []
    let jsonDay
    for (let i = 0; i < size.length; i++) {
        jsonDay = {
            id: img[i].id,
            actualDaysWorked: size[i].innerHTML
        }
        jsonDays.push(jsonDay)
    }
    jsonDays = JSON.stringify(jsonDays)
    const response = await fetch(`${apiUrl}/timesheet/updateday`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: jsonDays
    });
}

$(function () {
    $('input[name=chooseOption]').on('input', function () {
        var selectedOption = $('option[value="' + $(this).val() + '"]');
        idDataList = selectedOption.attr('id')
        // console.log(selectedOption.length ? selectedOption.attr('id') : 'This opiton is not in the list!');
    });
});

document.forms.createTimeSheet.onsubmit = async (event) => {
    let elements = event.target.elements
    let sheet = JSON.stringify({
        id: id,
        // peopleId: document.getElementById('selectPeopleId').value,
        peopleId: idDataList,
        actualDaysWorked: elements.actualDaysWorked.value,
    })
    const response = await fetch(`${apiUrl}/timesheet/create`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: sheet
    });
    // console.log(sheet)
}

// fillingSelectPeople().then()
fillingDataListPeople().then()
fillingTableTimeSheet().then()