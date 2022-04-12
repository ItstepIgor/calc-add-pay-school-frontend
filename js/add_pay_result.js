let id
const fillingSelectAddPay = async () => {
    let id = 'entity.id'
    let text = 'entity.addPayCode + \' || \' + entity.addPayTypeName'
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
    let resultBonusSum = await getJSON(`${apiUrl}/percentsalaryresult/getallsum`)
    let addBonusSum = await getJSON(`${apiUrl}/addpayresult/getallsum`)

    let bonus = document.querySelector('.bonus')
    if (resultBonusSum === 0) {
        bonus.innerHTML = 'Премиальные не посчитаны'
        bonus.style.color = 'red'
    } else {
        if ((addBonusSum.bonusSum) < 0) {
            bonus.style.color = 'red'
        }
        bonus.innerHTML = 'Остаток ' + addBonusSum.bonusName + ': ' + addBonusSum.bonusSum
    }
    let complication = document.querySelector('.complication')
    if (addBonusSum.complicationSum < 0) {
        complication.style.color = 'red'
    }
    complication.innerHTML = 'Остаток ' + addBonusSum.complicationName + ': ' + addBonusSum.complicationSum
    let motivation = document.querySelector('.motivation')
    if (addBonusSum.motivationSum < 0) {
        motivation.style.color = 'red'
    }
    motivation.innerHTML = 'Остаток ' + addBonusSum.motivationName + ': ' + addBonusSum.motivationSum
}

const fillingTableAddPayResult = async (disable) => {
    let maxDate = await getJSON(`${apiUrl}/calcsetting/getmaxdate`)
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
                await deleteEntity('addpayresult/delete?id=', imgDelete.id);
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

document.forms.createAddPayResult.onsubmit = async (event) => {

    let elements = event.target.elements
    let percent
    let save
    if (elements.balance.checked === true) {
        percent = 0
        save = 'addpayresult/savebalance'
    } else {
        percent = elements.percent.value
        save = 'addpayresult/create'
    }
    let jsonBody = JSON.stringify({
        id: id,
        staffListId: document.getElementById('staffListId').value,
        addPayId: document.getElementById('addPayId').value,
        percent: percent
    })
    // console.log(jsonBody)
    if (id > 0) {
        await createOrUpdateEntity('addpayresult/update', jsonBody, 'PUT');
    } else {
        await createOrUpdateEntity(save, jsonBody, 'POST');
    }
}

document.querySelector('.select-all-add-pay-result').onclick = async () => {
    fillingTableAddPayResult(1).then()
}

document.querySelector('.get-bonus-pdf').onclick = async () => {
    await getJSON(`${apiUrl}/report/bonus`)
}

fillingDivBalance().then()
fillingSelectStaffList().then()
fillingSelectAddPay().then()
fillingTableAddPayResult(0).then()