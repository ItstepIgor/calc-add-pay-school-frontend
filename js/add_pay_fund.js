const apiUrl = "http://localhost:8080/api"
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
    let maxDate = await getJSON(`${apiUrl}/calcsetting/getmaxdate`)
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

            divAddPayTypeName.innerHTML = addpayfund.addPayTypeName
            divNumberOrder.innerHTML = addpayfund.numberOrder
            divCalcDate.innerHTML = addpayfund.calcDate
            divAddPayFund.innerHTML = addpayfund.addPayFunds
            imgUpdate.id = addpayfund.id
            imgUpdate.onclick = async () => {
                let addPF = await getJSON(`${apiUrl}/addpayfund/getbyid?id=${imgUpdate.id}`).then()
                console.log(addPF)
                id = addPF.id
                document.getElementById('selectAddPayTypeId').value = addPF.addPayTypeId
                document.querySelector('.number-order').value = addPF.numberOrder
                document.querySelector('.add-pay-funds').value = addPF.addPayFunds
            }
            imgDelete.id = addpayfund.id
            imgDelete.onclick = async () => {
                let responseDelete = await fetch(`${apiUrl}/addpayfund/delete?id=${imgDelete.id}`)
                location.reload()
            }
            div.appendChild(divAddPayTypeName)
            div.appendChild(divNumberOrder)
            div.appendChild(divCalcDate)
            div.appendChild(divAddPayFund)

            if (maxDate.calcDate === addpayfund.calcDate) {
                divUpdate.appendChild(imgUpdate)
                divDelete.appendChild(imgDelete)
            }
            div.appendChild(divUpdate)
            div.appendChild(divDelete)
            document.querySelector('.div-table-body').appendChild(div)
        }
    )
}

document.forms.createAddPayFund.onsubmit = async (event) => {
    let elements = event.target.elements
    let addPayFund = JSON.stringify({
        id: id,
        addPayTypeId: document.getElementById('selectAddPayTypeId').value,
        addPayFunds: elements.addPayFunds.value,
        numberOrder: elements.numberOrder.value
    })
    console.log(addPayFund)
    const response = await fetch(`${apiUrl}/addpayfund/create`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: addPayFund
    });
    console.log(response)
}

fillingSelectAddPayType().then()
fillingTableAddPayFund().then()