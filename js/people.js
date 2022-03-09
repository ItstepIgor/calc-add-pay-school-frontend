const apiUrl = "http://localhost:8080/api/people"
let id
const getPeople = async (url) => {
    let response = await fetch(url)
    return response.ok ? response.json() : undefined
}

const fillingTablePeople = async () => {
    let users = await getPeople(`${apiUrl}/get`)
    console.log(users)
    users.forEach(user => {
        console.log(user)
        let div = document.createElement('div')
        let divFio = document.createElement('div')
        let divAddress = document.createElement('div')
        let divPhone = document.createElement('div')
        let divPersonnelNumber = document.createElement('div')
        let divUpdate = document.createElement('div')
        let imgUpdate = document.createElement('img')
        let divDelete = document.createElement('div')
        let imgDelete = document.createElement('img')
        div.className = 'div-table-row'
        divFio.className = 'div-table-cell'
        divAddress.className = 'div-table-cell'
        divPhone.className = 'div-table-cell'
        divPersonnelNumber.className = 'div-table-cell'
        divUpdate.className = 'div-table-cell'
        imgUpdate.src = '../images/update.png'
        divDelete.className = 'div-table-cell'
        imgDelete.src = '../images/delete.png'


        divFio.innerHTML = user.surName + ' ' + user.firstName + ' ' + user.patronymic
        divAddress.innerHTML = user.address
        divPhone.innerHTML = user.phoneNumber
        if (user.personnelNumber === undefined) {
            divPersonnelNumber.innerHTML = ''
        } else {
            divPersonnelNumber.innerHTML = user.personnelNumber
        }
        imgUpdate.id = user.id
        imgUpdate.onclick = async () => {
            let person = await getPeople(`${apiUrl}/getbyid?id=${imgUpdate.id}`).then()
            id = person.id
            document.querySelector('.sur-name').value = person.surName
            document.querySelector('.first-name').value = person.firstName
            document.querySelector('.patronymic').value = person.patronymic
            document.querySelector('.address').value = person.address
            document.querySelector('.phone-number').value = person.phoneNumber
            if (person.personnelNumber === undefined) {
                document.querySelector('.personnel-number').value = ''
            } else {
                document.querySelector('.personnel-number').value = person.personnelNumber
            }
        }
        imgDelete.id = user.id
        imgDelete.onclick = async () => {
            let responseDelete = await fetch(`${apiUrl}/delete?id=${imgDelete.id}`)
            // location.reload()
            console.log(responseDelete)
        }
        div.appendChild(divFio)
        div.appendChild(divAddress)
        div.appendChild(divPhone)
        div.appendChild(divPersonnelNumber)

        div.appendChild(divUpdate)
        divUpdate.appendChild(imgUpdate)
        div.appendChild(divDelete)
        divDelete.appendChild(imgDelete)
        document.querySelector('.div-table-body').appendChild(div)
    })
}

document.forms.createPerson.onsubmit = async (event) => {
    let elements = event.target.elements
    let person = JSON.stringify({
        id: id,
        surName: elements.surName.value,
        firstName: elements.firstName.value,
        patronymic: elements.patronymic.value,
        address: elements.address.value,
        phoneNumber: elements.phoneNumber.value,
        personnelNumber: elements.personnelNumber.value
    })
    console.log(person)
    const response = await fetch(`${apiUrl}/create`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: person
    });
    console.log(response)
}


fillingTablePeople().then()