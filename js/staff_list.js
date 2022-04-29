let id
const fillingSelectPosition = async () => {
    let id = 'entity.id'
    let text = 'entity.positionName'
    let classSelect = 'position'
    fillingSelect('hr/position/get', id, text, classSelect)
}


const fillingSelectPeople = async () => {
    let id = 'entity.id'
    let text = 'entity.surName + \' \' + entity.firstName + \' \' + entity.patronymic'
    let classSelect = 'people'
    fillingSelect('hr/people/get', id, text, classSelect)
}


const fillingTableStaffList = async (disable) => {

    let divClear = document.querySelector('.div-table-body')
    while (divClear.firstChild) {
        divClear.removeChild(divClear.firstChild);
    }
    let staffLists

    if (disable === 0) {
        staffLists = await getJSON(`${apiUrl}/hr/stafflist/getwhoworked`)
    } else if (disable === 1) {
        staffLists = await getJSON(`${apiUrl}/hr/stafflist/getwhodidnotwork`)
    }
    staffLists.forEach(staffList => {
            let div = document.createElement('div')
            let divFio = document.createElement('div')
            let divPosition = document.createElement('div')
            let divSalary = document.createElement('div')
            let divYoungSpecial = document.createElement('div')
            let divDisabled = document.createElement('div')
            let {divUpdate, imgUpdate, divDelete, imgDelete} = createUpdateAndDeleteElement();

            div.className = 'div-table-row'
            divFio.className = 'div-table-cell'
            divPosition.className = 'div-table-cell'
            divSalary.className = 'div-table-cell div-align-center'
            divYoungSpecial.className = 'div-table-cell div-align-center'
            divDisabled.className = 'div-table-cell div-align-center'


            divFio.innerHTML = staffList.peopleSurAndFirstName
            divPosition.innerHTML = staffList.positionName
            divSalary.innerHTML = staffList.salary
            divYoungSpecial.innerHTML = (staffList.youngSpecial === true ? 'Да' : 'Нет')
            divDisabled.innerHTML = (staffList.disabled === true ? 'Да' : 'Нет')
            imgUpdate.id = staffList.id
            imgUpdate.onclick = async () => {
                let staff = await getJSON(`${apiUrl}/hr/stafflist/getbyid?id=${imgUpdate.id}`).then()
                id = staff.id
                $('#selectPeopleId').val(`${staff.peopleId}`).trigger('change')
                $('#selectPositionId').val(`${staff.positionId}`).trigger('change')
                document.querySelector('.salary').value = staff.salary
                document.querySelector('.young-special').checked = staff.youngSpecial
                document.querySelector('.disabled').checked = staff.disabled
            }
            imgDelete.id = staffList.id
            imgDelete.onclick = async () => {
                await deleteEntity('hr/stafflist/delete?id=', imgDelete.id);
            }
            div.appendChild(divFio)
            div.appendChild(divPosition)
            div.appendChild(divSalary)
            div.appendChild(divYoungSpecial)
            div.appendChild(divDisabled)

            div.appendChild(divUpdate)
            divUpdate.appendChild(imgUpdate)
            div.appendChild(divDelete)
            divDelete.appendChild(imgDelete)
            document.querySelector('.div-table-body').appendChild(div)
        }
    )
}


document.querySelector('.calc-percent-salary').onclick = async event => {
    await getJSON(`${apiUrl}/hr/stafflist/calcpercentsalary`)
    document.querySelector('.calc-percent-salary').setAttribute('disabled', true)
}


document.forms.createStaffList.onsubmit = async (event) => {
    let elements = event.target.elements
    let jsonBody = JSON.stringify({
        id: id,
        peopleId: document.getElementById('selectPeopleId').value,
        positionId: document.getElementById('selectPositionId').value,
        salary: elements.salary.value.replace(',', '.'),
        youngSpecial: elements.youngSpecial.checked,
        disabled: elements.disabled.checked
    })
    if (id > 0) {
        await createOrUpdateEntity('hr/stafflist/update', jsonBody, 'PUT');
    } else {
        await createOrUpdateEntity('hr/stafflist/create', jsonBody, 'POST');
    }
}

document.querySelector('.show-disabled').onclick = async () => {
    fillingTableStaffList(1).then()
}


fillingTableStaffList(0).then()
fillingSelectPeople().then()
fillingSelectPosition().then()
