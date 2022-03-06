const getUsers = async () => {
    let response = await fetch('http://localhost:8080/api/people/get')
    return response.ok ? response.json() : undefined
}

const getPeople = async () => {
    let users = await getUsers()
    console.log(users)
    users.forEach(user => {
        let div = document.createElement('div')
        let divFio = document.createElement('div')
        let divAddress = document.createElement('div')
        let divPhone = document.createElement('div')
        let divPersonalNumber = document.createElement('div')
        div.className = 'divTableRow'
        divFio.className = 'divTableCell'
        divAddress.className = 'divTableCell'
        divPhone.className = 'divTableCell'
        divPersonalNumber.className = 'divTableCell'

        divFio.innerHTML = user.surName + ' ' + user.firstName + ' ' + user.patronymic
        divAddress.innerHTML = user.address
        divPhone.innerHTML = user.phoneNumber
        if (user.personalNumber === undefined) {
            divPersonalNumber.innerHTML = ''
        } else {
            divPersonalNumber.innerHTML = user.personalNumber
        }

        div.appendChild(divFio)
        div.appendChild(divAddress)
        div.appendChild(divPhone)
        div.appendChild(divPersonalNumber)
        document.querySelector('.divTableBody').appendChild(div)
    })
}

document.forms.createPerson.onsubmit = async (event) => {
    let elements = event.target.elements
    let person = JSON.stringify({
        surName: elements.surName.value,
        firstName: elements.firstName.value,
        patronymic: elements.patronymic.value,
        address: elements.address.value,
        phoneNumber: elements.phoneNumber.value,
        personnelNumber: elements.personnelNumber.value
    })
    const response = await fetch('http://localhost:8080/api/people/create', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: person
    });
    console.log(response)
}


getPeople().then()