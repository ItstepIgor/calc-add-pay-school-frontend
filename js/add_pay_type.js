const apiUrl = "http://localhost:8080/api/addpaytype"
let id
const getAddPayType = async (url) => {
    let response = await fetch(url)
    return response.ok ? response.json() : undefined
}

const fillingTableAddPayType = async () => {
    let addPayTypes = await getAddPayType(`${apiUrl}/get`)
    addPayTypes.forEach(addPayType => {
        let div = document.createElement('div')
        let divAddPayTypeName = document.createElement('div')
        let divUpdate = document.createElement('div')
        let imgUpdate = document.createElement('img')
        div.className = 'div-table-row'
        divAddPayTypeName.className = 'div-table-cell'
        divUpdate.className = 'div-table-cell'
        imgUpdate.src = '../images/update.png'

        divAddPayTypeName.innerHTML = addPayType.addPayTypeName
        imgUpdate.id = addPayType.id
        imgUpdate.onclick = async () => {
            let addPT = await getAddPayType(`${apiUrl}/getbyid?id=${imgUpdate.id}`).then()
            id = addPT.id
            document.querySelector('.add-pay-type-name').value = addPT.addPayTypeName
        }
        div.appendChild(divAddPayTypeName)

        div.appendChild(divUpdate)
        divUpdate.appendChild(imgUpdate)
        document.querySelector('.div-table-body').appendChild(div)
    })
}

document.forms.createAddPayType.onsubmit = async (event) => {
    let elements = event.target.elements
    let addPayType = JSON.stringify({
        id: id,
        addPayTypeName: elements.addPayTypeName.value
    })
    const response = await fetch(`${apiUrl}/create`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: addPayType
    });
    console.log(response)
}


fillingTableAddPayType().then()