const apiUrl = "http://localhost:8080/api"
let id
const getStaffList = async (url) => {
    let response = await fetch(url)
    return response.ok ? response.json() : undefined
}

const fillingTableStaffList = async () => {
    let users = await getStaffList(`${apiUrl}/stafflist/get`)
    console.log(users)
    users.forEach(user => {
            console.log(user)
            let div = document.createElement('div')
            let divFio = document.createElement('div')
            let divPosition = document.createElement('div')
            let divSalary = document.createElement('div')
            let divYoungSpecial = document.createElement('div')
            let divDisabled = document.createElement('div')
            let divUpdate = document.createElement('div')
            let imgUpdate = document.createElement('img')
            let divDelete = document.createElement('div')
            let imgDelete = document.createElement('img')
            div.className = 'divTableRow'
            divFio.className = 'divTableCell'
            divPosition.className = 'divTableCell'
            divSalary.className = 'divTableCell'
            divYoungSpecial.className = 'divTableCell'
            divDisabled.className = 'divTableCell'
            divUpdate.className = 'divTableCell'
            imgUpdate.src = '../images/update.png'
            divDelete.className = 'divTableCell'
            imgDelete.src = '../images/delete.png'

            divFio.innerHTML = user.peopleSurAndFirstName
            divPosition.innerHTML = user.positionName
            divSalary.innerHTML = user.salary
            divYoungSpecial.innerHTML = user.youngSpecial
            divDisabled.innerHTML = user.disabled
            //     if (user.personnelNumber === undefined) {
            //         divPersonnelNumber.innerHTML = ''
            //     } else {
            //         divPersonnelNumber.innerHTML = user.personnelNumber
            //     }
            //     imgUpdate.id = user.id
            //     imgUpdate.onclick = async () => {
            //         let person = await getUsers(`${apiUrl}/getbyid?id=${imgUpdate.id}`).then()
            //         id = person.id
            //         document.querySelector('.surName').value = person.surName
            //         document.querySelector('.firstName').value = person.firstName
            //         document.querySelector('.patronymic').value = person.patronymic
            //         document.querySelector('.address').value = person.address
            //         document.querySelector('.phoneNumber').value = person.phoneNumber
            //         if (person.personnelNumber === undefined) {
            //             document.querySelector('.personnelNumber').value = ''
            //         } else {
            //             document.querySelector('.personnelNumber').value = person.personnelNumber
            //         }
            //     }
            imgDelete.id = user.id
            imgDelete.onclick = async () => {
                let responseDelete = await fetch(`${apiUrl}/stafflist/delete?id=${imgDelete.id}`)
                location.reload()
                //         console.log(responseDelete)
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
            document.querySelector('.divTableBody').appendChild(div)
        }
    )
}

const fillingSelectPosition = async () => {
    let positions = await getStaffList(`${apiUrl}/position/get`)
    let select = document.getElementById('selectPositionId');
    positions.forEach(position => {
        let option = document.createElement('option');
        option.value = position.id;
        option.innerHTML = position.positionName;
        select.appendChild(option);
    })
}

const fillingSelectPeople = async () => {
    let people = await getStaffList(`${apiUrl}/people/get`)
    let select = document.getElementById('selectPeopleId');
    people.forEach(person => {
        let option = document.createElement('option');
        option.value = person.id;
        option.innerHTML = person.surName + ' ' + person.firstName + ' ' + person.patronymic;
        select.appendChild(option);
    })
}

document.forms.createStaffList.onsubmit = async (event) => {
    let elements = event.target.elements
    let staff = JSON.stringify({
        id: id,
        peopleId: document.getElementById('selectPeopleId').value,
        positionId: document.getElementById('selectPositionId').value,
        salary: elements.salary.value,
        youngSpecial: elements.youngSpecial.checked,
        disabled: elements.disabled.checked
    })
    console.log(staff)
    const response = await fetch(`${apiUrl}/stafflist/create`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: staff
    });
    console.log(response)
}

fillingSelectPeople().then()
fillingSelectPosition().then()
fillingTableStaffList().then()