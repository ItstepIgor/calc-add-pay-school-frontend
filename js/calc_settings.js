let id

const fillingTableCalcSettings = async () => {
    let calcSettings = await getJSON(`${apiUrl}/calcsetting/get`)
    let maxDate = await getJSON(`${apiUrl}/calcsetting/getmaxdate`)
    calcSettings.forEach(calcSetting => {
        let div = document.createElement('div')
        let divCalcDate = document.createElement('div')
        let divWorkingDays = document.createElement('div')
        let {divUpdate, imgUpdate, divDelete, imgDelete} = createUpdateAndDeleteElement();

        div.className = 'div-table-row'
        divCalcDate.className = 'div-table-cell div-align-center'
        divWorkingDays.className = 'div-table-cell div-align-center'


        divCalcDate.innerHTML = calcSetting.calcDate
        divWorkingDays.innerHTML = calcSetting.workingDays
        imgUpdate.id = calcSetting.id
        imgUpdate.onclick = async () => {
            let calc = await getJSON(`${apiUrl}/calcsetting/getbyid?id=${imgUpdate.id}`).then()
            id = calc.id
            document.querySelector('.calc-date').value = calc.calcDate
            document.querySelector('.working-days').value = calc.workingDays
        }
        imgDelete.id = calcSetting.id
        imgDelete.onclick = async () => {
            let responseDelete = await fetch(`${apiUrl}/calcsetting/delete?id=${imgDelete.id}`)
            location.reload()
            console.log(responseDelete)
        }
        div.appendChild(divCalcDate)
        div.appendChild(divWorkingDays)
        // console.log(calcSetting.calcDate)
        // console.log(maxDate.calcDate)
        if (maxDate.calcDate === calcSetting.calcDate) {
            divUpdate.appendChild(imgUpdate)
            divDelete.appendChild(imgDelete)
        }
        div.appendChild(divUpdate)
        div.appendChild(divDelete)
        document.querySelector('.div-table-body').appendChild(div)
    })
}

document.forms.createCalcSettings.onsubmit = async (event) => {
    let elements = event.target.elements
    let calc = JSON.stringify({
        id: id,
        calcDate: elements.calcDate.value,
        workingDays: elements.workingDays.value,
    })
    const response = await fetch(`${apiUrl}/calcsetting/create`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: calc
    });
    console.log(response)
}


fillingTableCalcSettings().then()