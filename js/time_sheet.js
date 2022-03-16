//Сделать выпадающий список с поиском и что бы можно было получить id  для сохранения содрудника в базу
//Доделать отправку измененных значений из таблицы в цикле в базу возможно есть updateAll метод
//как разделяют create(get) и update(put) методы для сохранения в базу. Я думаю через if если заполнен id
// то один метод если нет то create
//как сделать по стрелке такое же действие как по tab
const apiUrl = "http://localhost:8080/api"
let id

const fillingSelectPeople = async () => {
    let people = await getJSON(`${apiUrl}/people/get`)
    let select = document.getElementById('selectPeopleId')
    people.forEach(person => {
        let option = document.createElement('option')
        option.value = person.id
        option.innerHTML = person.surName + ' ' + person.firstName + ' ' + person.patronymic
        select.appendChild(option)
    })
}

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
    console.log(timeSheets)
    let editDayFocusIndex = 0;
    let editDayInputFocusIndex = 0;
    timeSheets.forEach(timeSheet => {

        console.log(timeSheet)
        let div = document.createElement('div')
        let divFio = document.createElement('div')
        let divCalcDate = document.createElement('div')
        let divActualDaysWorked = document.createElement('div')
        divActualDaysWorked.focusIndex = editDayFocusIndex++;
        let {divUpdate, imgUpdate, divDelete, imgDelete} = createUpdateAndDeleteElement();

        div.className = 'div-table-row'
        divFio.className = 'div-table-cell'
        divCalcDate.className = 'div-table-cell div-align-center'
        divActualDaysWorked.className = 'div-table-cell div-align-center div-edit-day'

        divFio.innerHTML = timeSheet.peopleSurAndFirstName
        divCalcDate.innerHTML = timeSheet.calcDate
        divActualDaysWorked.innerHTML = timeSheet.actualDaysWorked
        imgUpdate.id = timeSheet.id
        imgUpdate.onclick = async () => {
            let staff = await getJSON(`${apiUrl}/timesheet/getbyid?id=${imgUpdate.id}`).then()
            id = staff.id
            document.getElementById('selectPeopleId').value = staff.peopleId
            // document.getElementById('dataListPeopleId').value = staff.peopleId
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
            input.focusIndex = editDayInputFocusIndex++
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


document.forms.createTimeSheet.onsubmit = async (event) => {
    let elements = event.target.elements
    let sheet = JSON.stringify({
        id: id,
        peopleId: document.getElementById('selectPeopleId').value,
        // peopleId: document.getElementById('dataListPeopleId').getAttribute(id)
        actualDaysWorked: elements.actualDaysWorked.value,
    })
    console.log(elements)
    let input = document.getElementById('input-data-list')
    let dataList = document.getElementById(input.getAttribute('list'))
    console.log(dataList.options.namedItem(input.value))
    const response = await fetch(`${apiUrl}/timesheet/create`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: sheet
    });
    // console.log(response)
}


fillingSelectPeople().then()
fillingDataListPeople().then()
fillingTableTimeSheet().then()