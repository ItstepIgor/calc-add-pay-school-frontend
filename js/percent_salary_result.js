let id

const fillingTablePercentSalaryResult = async () => {
    let PercentSalaryResults = await getJSON(`${apiUrl}/percentsalaryresult/get`)
    // console.log(addPayResults)
    PercentSalaryResults.forEach(PercentSalaryResult => {
            // console.log(addPayResult)
            let div = document.createElement('div')
            let divFio = document.createElement('div')
            let divPosition = document.createElement('div')
            let divCalcDate = document.createElement('div')
            // let divAddPayCode = document.createElement('div')
            let divPercent = document.createElement('div')
            let divSumma = document.createElement('div')
            let {divUpdate, imgUpdate, divDelete, imgDelete} = createUpdateAndDeleteElement();

            div.className = 'div-table-row'
            divFio.className = 'div-table-cell'
            divPosition.className = 'div-table-cell'
            divCalcDate.className = 'div-table-cell div-align-center'
            // divAddPayCode.className = 'div-table-cell div-align-center'
            divPercent.className = 'div-table-cell div-align-center'
            divSumma.className = 'div-table-cell div-align-center'


            divFio.innerHTML = PercentSalaryResult.peopleSurAndFirstName
            divPosition.innerHTML = PercentSalaryResult.positionName
            divCalcDate.innerHTML = PercentSalaryResult.calcDate
            divPercent.innerHTML = PercentSalaryResult.percent
            divSumma.innerHTML = PercentSalaryResult.sum
            imgUpdate.id = PercentSalaryResult.id
            // imgUpdate.onclick = async () => {
            //     let addPayR = await getJSON(`${apiUrl}/addpayresult/getbyid?id=${imgUpdate.id}`).then()
            //
            //     id = addPayR.id
            //     document.getElementById('staffListId').value = addPayR.staffListId
            //     document.getElementById('addPayId').value = addPayR.addPayId
            //     document.querySelector('.percent').value = addPayR.percent
            // }
            imgDelete.id = PercentSalaryResult.id
            // imgDelete.onclick = async () => {
            //     let responseDelete = await fetch(`${apiUrl}/addpayresult/delete?id=${imgDelete.id}`)
            //     location.reload()
            // }
            div.appendChild(divFio)
            div.appendChild(divPosition)
            div.appendChild(divCalcDate)
            // div.appendChild(divAddPayCode)
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
fillingTablePercentSalaryResult().then()