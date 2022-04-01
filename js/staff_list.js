let id
const fillingSelectPosition = async () => {
    let id = 'entity.id'
    let text = 'entity.positionName'
    let classSelect = 'position'
    fillingSelect('position', id, text, classSelect)
}


const fillingSelectPeople = async () => {
    let id = 'entity.id'
    let text = 'entity.surName + \' \' + entity.firstName + \' \' + entity.patronymic'
    let classSelect = 'people'
    fillingSelect('people', id, text, classSelect)
}


const fillingTableStaffList = async (disable) => {

    let divClear = document.querySelector('.div-table-body')
    while (divClear.firstChild) {
        divClear.removeChild(divClear.firstChild);
    }
    let staffLists

    if (disable === 0) {
        staffLists = await getJSON(`${apiUrl}/stafflist/getwhoworked`)
    } else if (disable === 1) {
        staffLists = await getJSON(`${apiUrl}/stafflist/getwhodidnotwork`)
    }
    // console.log(staffLists)
    staffLists.forEach(staffList => {
            // console.log(staffList)
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
                let staff = await getJSON(`${apiUrl}/stafflist/getbyid?id=${imgUpdate.id}`).then()
                id = staff.id
                $('#selectPeopleId').val(`${staff.peopleId}`).trigger('change')
                $('#selectPositionId').val(`${staff.positionId}`).trigger('change')
                document.querySelector('.salary').value = staff.salary
                document.querySelector('.young-special').checked = staff.youngSpecial
                document.querySelector('.disabled').checked = staff.disabled
            }
            imgDelete.id = staffList.id
            imgDelete.onclick = async () => {
                await deleteEntity('stafflist/delete?id=', imgDelete.id);
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
    await fetch(`${apiUrl}/stafflist/calcpercentsalary`
    ).then((response) => {
        return response.json()
    }).then(jsonResponse => {
        alert(jsonResponse.message)
    });
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
    console.log(jsonBody)
    if (id > 0) {
        await createOrUpdateEntity('stafflist/update', jsonBody, 'PUT');
    } else {
        await createOrUpdateEntity('stafflist/create', jsonBody, 'POST');
    }
}

document.querySelector('.show-disabled').onclick = async () => {
    fillingTableStaffList(1).then()
}


fillingTableStaffList(0).then()
fillingSelectPeople().then()
fillingSelectPosition().then()
