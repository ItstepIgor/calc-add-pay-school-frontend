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

const fillingTableAddPayFund = async () => {
    let addpayfunds = await getJSON(`${apiUrl}/addpayfund/get`)
    let maxDate = await getJSON(`${apiUrl}/hr/calcsetting/getmaxdate`)
    addpayfunds.forEach(addpayfund => {
            let div = document.createElement('div')
            let divAddPayTypeName = document.createElement('div')
            let divNumberOrder = document.createElement('div')
            let divCalcDate = document.createElement('div')
            let divAddPayFund = document.createElement('div')
            let {divUpdate, imgUpdate, divDelete, imgDelete} = createUpdateAndDeleteElement();

            div.className = 'div-table-row'
            divAddPayTypeName.className = 'div-table-cell'
            divNumberOrder.className = 'div-table-cell'
            divCalcDate.className = 'div-table-cell div-align-center'
            divAddPayFund.className = 'div-table-cell div-align-center'

            divAddPayTypeName.innerHTML = addpayfund.addPayTypes.addPayTypeName
            divNumberOrder.innerHTML = addpayfund.numberOrder
            divCalcDate.innerHTML = addpayfund.calcSettings.calcDate
            divAddPayFund.innerHTML = addpayfund.addPayFunds
            imgUpdate.id = addpayfund.id
            imgUpdate.onclick = async () => {
                let addPF = await getJSON(`${apiUrl}/addpayfund/getbyid?id=${imgUpdate.id}`).then()
                console.log(addPF)
                id = addPF.id
                document.getElementById('selectAddPayTypeId').value = addPF.addPayTypes.id
                document.querySelector('.number-order').value = addPF.numberOrder
                document.querySelector('.add-pay-funds').value = addPF.addPayFunds
            }
            imgDelete.id = addpayfund.id
            imgDelete.onclick = async () => {
                await deleteEntity('addpayfund/delete?id=', imgDelete.id);
            }
            div.appendChild(divAddPayTypeName)
            div.appendChild(divNumberOrder)
            div.appendChild(divCalcDate)
            div.appendChild(divAddPayFund)

            if (maxDate.calcDate === addpayfund.calcSettings.calcDate) {
                divUpdate.appendChild(imgUpdate)
                // divDelete.appendChild(imgDelete)
            }
            div.appendChild(divUpdate)
            div.appendChild(divDelete)
            document.querySelector('.div-table-body').appendChild(div)
        }
    )
}

document.forms.createAddPayFund.onsubmit = async (event) => {
    let elements = event.target.elements
    let jsonBody = JSON.stringify({
        id: id,
        addPayTypes: {id: document.getElementById('selectAddPayTypeId').value},
        addPayFunds: elements.addPayFunds.value,
        numberOrder: elements.numberOrder.value
    })
    // console.log(jsonBody)
    if (id > 0) {
        await createOrUpdateEntity('addpayfund/update', jsonBody, 'PUT');
    } else {
        await createOrUpdateEntity('addpayfund/create', jsonBody, 'POST');
    }
}

fillingSelectAddPayType().then()
fillingTableAddPayFund().then()