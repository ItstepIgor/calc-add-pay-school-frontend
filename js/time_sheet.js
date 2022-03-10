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
        option.value = person.id
        option.innerHTML = person.surName + ' ' + person.firstName + ' ' + person.patronymic
        select.appendChild(option)
    })
}


const fillingTableTimeSheet = async () => {
    let timeSheets = await getJSON(`${apiUrl}/timesheet/get`)
    console.log(timeSheets)
    timeSheets.forEach(timeSheet => {
            console.log(timeSheet)
            let div = document.createElement('div')
            let divFio = document.createElement('div')
            let divCalcDate = document.createElement('div')
            let divActualDaysWorked = document.createElement('div')
            let {divUpdate, imgUpdate, divDelete, imgDelete} = createUpdateAndDeleteElement();

            div.className = 'div-table-row'
            divFio.className = 'div-table-cell'
            divCalcDate.className = 'div-table-cell div-align-center'
            divActualDaysWorked.className = 'div-table-cell div-align-center'

            divFio.innerHTML = timeSheet.peopleSurAndFirstName
            divCalcDate.innerHTML = timeSheet.calcDate
            divActualDaysWorked.innerHTML = timeSheet.actualDaysWorked
            imgUpdate.id = timeSheet.id
            imgUpdate.onclick = async () => {
                let staff = await getJSON(`${apiUrl}/timesheet/getbyid?id=${imgUpdate.id}`).then()
                id = staff.id
                document.getElementById('selectPeopleId').value = staff.peopleId
                document.getElementById('dataListPeopleId').value = staff.peopleId
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
        }
    )
}


document.forms.createTimeSheet.onsubmit = async (event) => {
    let elements = event.target.elements
    let sheet = JSON.stringify({
        id: id,
        peopleId: document.getElementById('selectPeopleId').value,
        actualDaysWorked: elements.actualDaysWorked.value,
    })
    console.log(sheet)
    const response = await fetch(`${apiUrl}/timesheet/create`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: sheet
    });
    console.log(response)
}

fillingSelectPeople().then()
fillingDataListPeople().then()
// fillingTableTimeSheet().then()