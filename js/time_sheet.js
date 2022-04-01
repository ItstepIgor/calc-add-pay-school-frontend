//querySelectorAll сохраняется очередность или нет

//как сделать по стрелке такое же действие как по tab
//узнать как вывести одинаковую информацию на разных страницах (например меню)
//eval чем можно заменить
let id
let maxDate
const fillingSelectPeople = async () => {
    let id = 'entity.id'
    let text = 'entity.surName + \' \' + entity.firstName + \' \' + entity.patronymic'
    let classSelect = 'time-sheet'
    fillingSelect('people', id, text, classSelect)
}

const fillingTableTimeSheet = async (disable) => {
    let divClear = document.querySelector('.div-table-body')
    while (divClear.firstChild) {
        divClear.removeChild(divClear.firstChild);
    }
    let timeSheets

    if (disable === 0) {
        timeSheets = await getJSON(`${apiUrl}/timesheet/getcurrenttimesheets`)
    } else if (disable === 1) {
        timeSheets = await getJSON(`${apiUrl}/timesheet/get`)
    }
    // timeSheets = await getJSON(`${apiUrl}/timesheet/getcurrenttimesheets`)
    maxDate = await getJSON(`${apiUrl}/calcsetting/getmaxdate`)
    timeSheets.forEach(timeSheet => {

        // console.log(timeSheet)
        let div = document.createElement('div')
        let divFio = document.createElement('div')
        let divCalcDate = document.createElement('div')
        let divActualDaysWorked = document.createElement('div')
        let {divUpdate, imgUpdate, divDelete, imgDelete} = createUpdateAndDeleteElement();

        div.className = 'div-table-row'
        divFio.className = 'div-table-cell'
        divCalcDate.className = 'div-table-cell div-align-center'
        if (maxDate.calcDate === timeSheet.calcDate) {
            divActualDaysWorked.className = 'div-table-cell div-align-center div-edit-day'
        } else {
            divActualDaysWorked.className = 'div-table-cell div-align-center'
        }

        imgUpdate.className = 'img-update'

        divFio.innerHTML = timeSheet.peopleSurAndFirstName
        divCalcDate.innerHTML = timeSheet.calcDate
        divActualDaysWorked.innerHTML = timeSheet.actualDaysWorked
        imgUpdate.id = timeSheet.id
        imgUpdate.onclick = async () => {
            let staff = await getJSON(`${apiUrl}/timesheet/getbyid?id=${imgUpdate.id}`).then()
            id = staff.id
            $('#selectPeopleId').val(`${staff.peopleId}`).trigger('change')
            document.querySelector('.actual-days-worked').value = staff.actualDaysWorked
        }
        imgDelete.id = timeSheet.id
        imgDelete.onclick = async () => {
            await deleteEntity('timesheet/delete?id=', imgDelete.id);
        }
        div.appendChild(divFio)
        div.appendChild(divCalcDate)
        div.appendChild(divActualDaysWorked)
        if (maxDate.calcDate === timeSheet.calcDate) {
            divUpdate.appendChild(imgUpdate)
            divDelete.appendChild(imgDelete)
        }
        div.appendChild(divUpdate)
        div.appendChild(divDelete)
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

    document.querySelector('.select-edit-day').onclick = () => {
        let editDayClicks = document.querySelectorAll(".div-edit-day");
        editDayClicks.forEach(editDayClick => {
            editDayClick.click()
        })
    }
}

document.querySelector('.save-edit-day').onclick = async (event) => {
    let img = document.querySelectorAll('.img-update');
    let size = document.querySelectorAll('.div-edit-day');
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

document.forms.createTimeSheet.onsubmit = async (event) => {
    let elements = event.target.elements
    let jsonBody = JSON.stringify({
        id: id,
        peopleId: document.getElementById('selectPeopleId').value,
        actualDaysWorked: elements.actualDaysWorked.value,
    })
    // console.log(jsonBody)
    if (id > 0) {
        await createOrUpdateEntity('timesheet/update', jsonBody, 'PUT');
    } else {
        await createOrUpdateEntity('timesheet/create', jsonBody, 'POST');
    }
}

document.querySelector('.add-new-time-sheets').onclick = async () => {
    await fetch(`${apiUrl}/stafflist/createalltimesheets`
    ).then((response) => {
        return response.json()
    }).then(jsonResponse => {
        alert(jsonResponse.message)
    });

    // document.querySelector('.calc-percent-salary').setAttribute('disabled', true)
}

document.querySelector('.select-all').onclick = async () => {
    fillingTableTimeSheet(1).then()
}

fillingSelectPeople().then()
fillingTableTimeSheet(0).then()