let id

const fillingTableAddPayType = async () => {
    let addPayTypes = await getJSON(`${apiUrl}/addpaytype/get`)
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
            let addPT = await getJSON(`${apiUrl}/addpaytype/getbyid?id=${imgUpdate.id}`).then()
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
    let jsonBody = JSON.stringify({
        id: id,
        addPayTypeName: elements.addPayTypeName.value
    })
    // console.log(jsonBody)
    if (id > 0) {
        await createOrUpdateEntity('addpaytype/update', jsonBody, 'PUT');
    } else {
        await createOrUpdateEntity('addpaytype/create', jsonBody, 'POST');
    }
}


fillingTableAddPayType().then()