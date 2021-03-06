//как сделать по стрелке такое же действие как по tab
let id
let maxDate
const fillingSelectPeople = async () => {
    let id = 'entity.id'
    let text = 'entity.peopleSurAndFirstName + \' || \' + entity.positionName'
    let classSelect = 'time-sheet'
    fillingSelect('hr/stafflist/getwhoworked', id, text, classSelect)
}

const fillingTableTimeSheet = async (disable) => {
    let divClear = document.querySelector('.div-table-body')
    while (divClear.firstChild) {
        divClear.removeChild(divClear.firstChild);
    }
    let timeSheets

    if (disable === 0) {
        timeSheets = await getJSON(`${apiUrl}/hr/timesheet/getcurrenttimesheets`)
    } else if (disable === 1) {
        timeSheets = await getJSON(`${apiUrl}/hr/timesheet/get`)
    }
    maxDate = await getJSON(`${apiUrl}/hr/calcsetting/getmaxdate`)
    timeSheets.forEach(timeSheet => {

        let div = document.createElement('div')
        let divFio = document.createElement('div')
        let divPosition = document.createElement('div')
        let divCalcDate = document.createElement('div')
        let divActualDaysWorked = document.createElement('div')
        let {divUpdate, imgUpdate, divDelete, imgDelete} = createUpdateAndDeleteElement();

        div.className = 'div-table-row'
        divFio.className = 'div-table-cell'
        divPosition.className = 'div-table-cell'
        divCalcDate.className = 'div-table-cell div-align-center'
        if (maxDate.calcDate === timeSheet.calcDate) {
            divActualDaysWorked.className = 'div-table-cell div-align-center div-edit-day'
        } else {
            divActualDaysWorked.className = 'div-table-cell div-align-center'
        }

        imgUpdate.className = 'img-update'

        divFio.innerHTML = timeSheet.peopleSurAndFirstName
        divPosition.innerHTML = timeSheet.positionName
        divCalcDate.innerHTML = timeSheet.calcDate
        divActualDaysWorked.innerHTML = timeSheet.actualDaysWorked
        imgUpdate.id = timeSheet.id
        imgUpdate.onclick = async () => {
            let staff = await getJSON(`${apiUrl}/hr/timesheet/getbyid?id=${imgUpdate.id}`).then()
            id = staff.id
            $('#selectStaffListId').val(`${staff.peopleId}`).trigger('change')
            document.querySelector('.actual-days-worked').value = staff.actualDaysWorked
        }
        imgDelete.id = timeSheet.id
        imgDelete.onclick = async () => {
            await deleteEntity('hr/timesheet/delete?id=', imgDelete.id);
        }
        div.appendChild(divFio)
        div.appendChild(divPosition)
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

document.querySelector('.save-edit-day').onclick = async () => {

    let jsonDays = []
    let jsonDay
    document.querySelectorAll('.div-table-row').forEach(row => {
        let img = row.querySelector('.img-update');
        let size = row.querySelector('.div-edit-day');

        if (img != undefined && size != undefined) {
            jsonDay = {
                id: img.id,
                actualDaysWorked: size.innerHTML
            }
            jsonDays.push(jsonDay)
        }
    })
    jsonDays = JSON.stringify(jsonDays)
    await createOrUpdateEntity('hr/timesheet/updateday', jsonDays, 'POST');
}

document.forms.createTimeSheet.onsubmit = async (event) => {
    let elements = event.target.elements
    let jsonBody = JSON.stringify({
        id: id,
        peopleId: document.getElementById('selectStaffListId').value,
        actualDaysWorked: elements.actualDaysWorked.value,
    })
    if (id > 0) {
        await createOrUpdateEntity('hr/timesheet/update', jsonBody, 'PUT');
    } else {
        await createOrUpdateEntity('hr/timesheet/create', jsonBody, 'POST');
    }
}

document.querySelector('.add-new-time-sheets').onclick = async () => {
    await getJSON(`${apiUrl}/hr/timesheet/createalltimesheets`)
    location.reload()
    // document.querySelector('.calc-percent-salary').setAttribute('disabled', true)
}

document.querySelector('.select-all').onclick = async () => {
    fillingTableTimeSheet(1).then()
}

fillingSelectPeople().then()
fillingTableTimeSheet(0).then()