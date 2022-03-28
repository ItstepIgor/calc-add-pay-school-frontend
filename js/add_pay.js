let id
const fillingSelectAddPayType = async () => {
    let addPayTypes = await getJSON(`${apiUrl}/addpaytype/get`)
    let select = document.getElementById('selectAddPayTypeId')
    addPayTypes.forEach(addPayType => {
        let option = document.createElement('option')
        option.value = addPayType.id
        option.innerHTML = addPayType.addPayTypeName
        select.appendChild(option)
    })
}

const fillingTableAddPay = async () => {
    let addpays = await getJSON(`${apiUrl}/addpay/get`)
    addpays.forEach(addpay => {
            let div = document.createElement('div')
            let divAddPayTypeName = document.createElement('div')
            let divAddPayCode = document.createElement('div')
            let divAddPayName = document.createElement('div')
            let divMaxPercent = document.createElement('div')
            let divDescription = document.createElement('div')
            let {divUpdate, imgUpdate, divDelete, imgDelete} = createUpdateAndDeleteElement();

            div.className = 'div-table-row'
            divAddPayTypeName.className = 'div-table-cell'
            divAddPayCode.className = 'div-table-cell div-align-center'
            divAddPayName.className = 'div-table-cell'
            divMaxPercent.className = 'div-table-cell div-align-center'
            divDescription.className = 'div-table-cell'

            divAddPayTypeName.innerHTML = addpay.addPayTypeName
            divAddPayCode.innerHTML = addpay.addPayCode
            divAddPayName.innerHTML = addpay.addPayName
            divMaxPercent.innerHTML = addpay.maxPercent
            divDescription.innerHTML = addpay.description
            imgUpdate.id = addpay.id
            imgUpdate.onclick = async () => {
                let addP = await getJSON(`${apiUrl}/addpay/getbyid?id=${imgUpdate.id}`).then()
                console.log(addP)
                id = addP.id
                document.getElementById('selectAddPayTypeId').value = addP.addPayTypeId
                document.querySelector('.add-pay-code').value = addP.addPayCode
                document.querySelector('.add-pay-name').value = addP.addPayName
                document.querySelector('.max-percent').value = addP.maxPercent
                document.querySelector('.description').value = addP.description
            }
            imgDelete.id = addpay.id
            imgDelete.onclick = async () => {
                let responseDelete = await fetch(`${apiUrl}/addpay/delete?id=${imgDelete.id}`)
                location.reload()
            }
            div.appendChild(divAddPayTypeName)
            div.appendChild(divAddPayCode)
            div.appendChild(divAddPayName)
            div.appendChild(divMaxPercent)
            div.appendChild(divDescription)

            divUpdate.appendChild(imgUpdate)
            divDelete.appendChild(imgDelete)
            div.appendChild(divUpdate)
            div.appendChild(divDelete)
            document.querySelector('.div-table-body').appendChild(div)
        }
    )
}

document.forms.createAddPay.onsubmit = async (event) => {
    let elements = event.target.elements
    let jsonBody = JSON.stringify({
        id: id,
        addPayTypeId: document.getElementById('selectAddPayTypeId').value,
        addPayCode: elements.addPayCode.value,
        addPayName: elements.addPayName.value,
        maxPercent: elements.maxPercent.value,
        description: elements.description.value
    })
    // console.log(jsonBody)
    if (id > 0) {
        await createOrUpdateEntity('addpay/update', jsonBody, 'PUT');
    } else {
        await createOrUpdateEntity('addpay/create', jsonBody, 'POST');
    }
}

fillingSelectAddPayType().then()
fillingTableAddPay().then()