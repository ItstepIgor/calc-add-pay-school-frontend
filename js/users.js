let id
const fillingSelectUsers = async () => {
    let roles = await getJSON(`${apiUrl}/users/getByEnumRole`)
    let select = document.getElementById('selectRoleId')
    roles.forEach(role => {
        let option = document.createElement('option')
        option.innerHTML = role.role
        select.appendChild(option)
    })
}

const fillingSelectPeople = async () => {
    let id = 'entity.id'
    let text = 'entity.surName + \' \' + entity.firstName + \' \' + entity.patronymic'
    let classSelect = 'people'
    fillingSelect('people', id, text, classSelect)
}

const fillingTableUsers = async () => {

    let users = await getJSON(`${apiUrl}/users/get`)
    users.forEach(user => {
            let div = document.createElement('div')
            let divFio = document.createElement('div')
            let divRole = document.createElement('div')
            let divLogin = document.createElement('div')
            let {divUpdate, imgUpdate, divDelete, imgDelete} = createUpdateAndDeleteElement();

            div.className = 'div-table-row'
            divFio.className = 'div-table-cell'
            divRole.className = 'div-table-cell div-align-center'
            divLogin.className = 'div-table-cell div-align-center'

            divFio.innerHTML = user.peopleSurAndFirstName
            divRole.innerHTML = user.role
            divLogin.innerHTML = user.login
            imgUpdate.id = user.id
            imgUpdate.onclick = async () => {
                let userUpdate = await getJSON(`${apiUrl}/users/getbyid?id=${imgUpdate.id}`).then()
                id = userUpdate.id
                $('#selectPeopleId').val(`${userUpdate.peopleId}`).trigger('change')
                document.getElementById('selectRoleId').value = userUpdate.role
                document.querySelector('.login').value = userUpdate.login
                document.querySelector('.password').value = userUpdate.password
            }
            imgDelete.id = user.id
            // imgDelete.onclick = async () => {
            //     await deleteEntity('stafflist/delete?id=', imgDelete.id);
            // }
            div.appendChild(divFio)
            div.appendChild(divRole)
            div.appendChild(divLogin)

            div.appendChild(divUpdate)
            divUpdate.appendChild(imgUpdate)
            div.appendChild(divDelete)
            divDelete.appendChild(imgDelete)
            document.querySelector('.div-table-body').appendChild(div)
        }
    )
}

document.forms.createUserList.onsubmit = async (event) => {
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
        await createOrUpdateEntity('stafflist/update', jsonBody, 'PUT');
    } else {
        await createOrUpdateEntity('stafflist/create', jsonBody, 'POST');
    }
}

fillingTableUsers().then()
fillingSelectPeople().then()
fillingSelectUsers().then()
