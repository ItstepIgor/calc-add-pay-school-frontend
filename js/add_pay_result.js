let id

const fillingSelectAddPay = async () => {
    let addPays = await getJSON(`${apiUrl}/addpay/get`)
    let select = document.getElementById('addPayId')
    addPays.forEach(addPay => {
        let option = document.createElement('option')
        option.value = addPay.id
        option.innerHTML = addPay.addPayCode
        select.appendChild(option)
    })
}

const fillingSelectStaffList = async () => {
    let staffLists = await getJSON(`${apiUrl}/stafflist/get`)
    let select = document.getElementById('staffListId')
    staffLists.forEach(staffList => {
        let option = document.createElement('option')
        option.value = staffList.id
        option.innerHTML = staffList.peopleSurAndFirstName + ' ' + staffList.positionName
        select.appendChild(option)
    })
}


const fillingDivBalance = async () => {
    let maxDate = await getJSON(`${apiUrl}/calcsetting/getmaxdate`)
    let resultBonusSum = await getJSON(`${apiUrl}/percentsalaryresult/getallsum`)
    let addBonusSum = await getJSON(`${apiUrl}/addpayresult/getallsum`)
    let balance = await getJSON(`${apiUrl}/addpayfund/getcurrentfund?date=${maxDate.calcDate}`)
    console.log(balance)
    balance.forEach(bal => {
        if (bal.addPayTypeId === 1) {
            let bonus = document.querySelector('.bonus')
            bonus.innerHTML = 'Остаток ' + bal.addPayTypeName + ': ' + (bal.addPayFunds - resultBonusSum - addBonusSum.bonusSum)
        } else if (bal.addPayTypeId === 2) {
            let complication = document.querySelector('.complication')
            complication.innerHTML = 'Остаток ' + bal.addPayTypeName + ': ' + (bal.addPayFunds - addBonusSum.complicationSum)
        } else if (bal.addPayTypeId === 3) {
            let motivation = document.querySelector('.motivation')
            motivation.innerHTML = 'Остаток ' + bal.addPayTypeName + ': ' + (bal.addPayFunds - addBonusSum.motivationSum)
        }
    })
}

const fillingTableAddPayResult = async () => {
    let addPayResults = await getJSON(`${apiUrl}/addpayresult/get`)
    console.log(addPayResults)
    addPayResults.forEach(addPayResult => {
            console.log(addPayResult)
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
                document.getElementById('staffListId').value = addPayR.staffListId
                document.getElementById('addPayId').value = addPayR.addPayId
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

            div.appendChild(divUpdate)
            divUpdate.appendChild(imgUpdate)
            div.appendChild(divDelete)
            divDelete.appendChild(imgDelete)
            document.querySelector('.div-table-body').appendChild(div)
        }
    )
}


document.forms.createAddPayResult.onsubmit = async (event) => {
    let elements = event.target.elements
    let result = JSON.stringify({
        id: id,
        staffListId: document.getElementById('staffListId').value,
        addPayId: document.getElementById('addPayId').value,
        percent: elements.percent.value
    })
    console.log(result)
    const response = await fetch(`${apiUrl}/addpayresult/create`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: result
    });
    console.log(response)
}

fillingDivBalance().then()
fillingSelectStaffList().then()
fillingSelectAddPay().then()
fillingTableAddPayResult().then()