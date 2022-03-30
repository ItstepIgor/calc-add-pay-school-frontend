let id
let maxDate
const fillingSelectAddPay = async () => {
    let id = 'entity.id'
    let text = 'entity.addPayCode'
    let classSelect = 'add-pay'
    fillingSelect('addpay', id, text, classSelect)
}

const fillingSelectStaffList = async () => {
    let id = 'entity.id'
    let text = 'entity.peopleSurAndFirstName + \' || \' + entity.positionName'
    let classSelect = 'staff-list-people'
    fillingSelect('stafflist', id, text, classSelect)
}

const fillingDivBalance = async () => {
    maxDate = await getJSON(`${apiUrl}/calcsetting/getmaxdate`)
    let resultBonusSum = await getJSON(`${apiUrl}/percentsalaryresult/getallsum`)
    let addBonusSum = await getJSON(`${apiUrl}/addpayresult/getallsum`)
    let balance = await getJSON(`${apiUrl}/addpayfund/getcurrentfund?date=${maxDate.calcDate}`)
    // console.log(balance)
    balance.forEach(bal => {
        if (bal.addPayTypes.id === 1) {
            let bonus = document.querySelector('.bonus')
            bonus.innerHTML = 'Остаток ' + bal.addPayTypes.addPayTypeName + ': ' + (bal.addPayFunds - resultBonusSum - addBonusSum.bonusSum)
        } else if (bal.addPayTypes.id === 2) {
            let complication = document.querySelector('.complication')
            complication.innerHTML = 'Остаток ' + bal.addPayTypes.addPayTypeName + ': ' + (bal.addPayFunds - addBonusSum.complicationSum)
        } else if (bal.addPayTypes.id === 3) {
            let motivation = document.querySelector('.motivation')
            motivation.innerHTML = 'Остаток ' + bal.addPayTypes.addPayTypeName + ': ' + (bal.addPayFunds - addBonusSum.motivationSum)
        }
    })
}

const fillingTableAddPayResult = async (disable) => {
    let divClear = document.querySelector('.div-table-body')
    while (divClear.firstChild) {
        divClear.removeChild(divClear.firstChild);
    }
    let addPayResults

    if (disable === 0) {
        addPayResults = await getJSON(`${apiUrl}/addpayresult/getformonth`)
    } else if (disable === 1) {
        addPayResults = await getJSON(`${apiUrl}/addpayresult/get`)
    }

    // addPayResults = await getJSON(`${apiUrl}/addpayresult/get`)
    // console.log(maxDate)
    addPayResults.forEach(addPayResult => {
            // console.log(addPayResult)
            let div = document.createElement('div')
            let divFio = document.createElement('div')
            let divPosition = document.createElement('div')
            let divCalcDate = document.createElement('div')
            let divAddPayCode = document.createElement('div')
            let divPercent = document.createElement('div')
            let divSumma = document.createElement('div')
            let {divUpdate, imgUpdate, divDelete, imgDelete} = createUpdateAndDeleteElement();

            div.className = 'div-table-row'
            divFio.className = 'div-table-cell'
            divPosition.className = 'div-table-cell'
            divCalcDate.className = 'div-table-cell div-align-center'
            divAddPayCode.className = 'div-table-cell div-align-center'
            divPercent.className = 'div-table-cell div-align-center'
            divSumma.className = 'div-table-cell div-align-center'


            divFio.innerHTML = addPayResult.peopleSurAndFirstName
            divPosition.innerHTML = addPayResult.positionName
            divCalcDate.innerHTML = addPayResult.calcDate
            divAddPayCode.innerHTML = addPayResult.addPayCode
            divPercent.innerHTML = addPayResult.percent
            divSumma.innerHTML = addPayResult.sum
            imgUpdate.id = addPayResult.id
            imgUpdate.onclick = async () => {
                let addPayR = await getJSON(`${apiUrl}/addpayresult/getbyid?id=${imgUpdate.id}`).then()
                id = addPayR.id
                $('#staffListId').val(`${addPayR.staffListId}`).trigger('change')
                $('#addPayId').val(`${addPayR.addPayId}`).trigger('change')
                document.querySelector('.percent').value = addPayR.percent
            }
            imgDelete.id = addPayResult.id
            imgDelete.onclick = async () => {
                let responseDelete = await fetch(`${apiUrl}/addpayresult/delete?id=${imgDelete.id}`)
                location.reload()
            }
            div.appendChild(divFio)
            div.appendChild(divPosition)
            div.appendChild(divCalcDate)
            div.appendChild(divAddPayCode)
            div.appendChild(divPercent)
            div.appendChild(divSumma)
            if (maxDate.calcDate === addPayResult.calcDate) {
                divUpdate.appendChild(imgUpdate)
                divDelete.appendChild(imgDelete)
            }
            div.appendChild(divUpdate)
            div.appendChild(divDelete)
            document.querySelector('.div-table-body').appendChild(div)
        }
    )
}

async function createOrUpdateEntity1(query, jsonBody, method) {
    await fetch(`${apiUrl}/${query}`, {
        method: method,
        headers: {"Content-Type": "application/json"},
        body: jsonBody
    }).then((response) => {
        return response.json()
    }).then(jsonResponse => {
        alert(jsonResponse.message)
    });
}

document.forms.createAddPayResult.onsubmit = async (event) => {

    let elements = event.target.elements
    let jsonBody = JSON.stringify({
        id: id,
        staffListId: document.getElementById('staffListId').value,
        addPayId: document.getElementById('addPayId').value,
        percent: elements.percent.value
    })
    // console.log(jsonBody)
    if (id > 0) {
        await createOrUpdateEntity1('addpayresult/update', jsonBody, 'PUT');
    } else {
        await createOrUpdateEntity1('addpayresult/create', jsonBody, 'POST');
    }
}

document.querySelector('.select-all-add-pay-result').onclick = async () => {
    fillingTableAddPayResult(1).then()
}

fillingDivBalance().then()
fillingSelectStaffList().then()
fillingSelectAddPay().then()
fillingTableAddPayResult(0).then()