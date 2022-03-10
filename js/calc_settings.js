const apiUrl = "http://localhost:8080/api/calcsetting"
let id

const fillingTableCalcSettings = async () => {
    let calcSettings = await getJSON(`${apiUrl}/get`)
    let maxDate = await getJSON(`${apiUrl}/getmaxdate`)
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
            let calc = await getJSON(`${apiUrl}/getbyid?id=${imgUpdate.id}`).then()
            id = calc.id
            document.querySelector('.calc-date').value = calc.calcDate
            document.querySelector('.working-days').value = calc.workingDays
        }
        imgDelete.id = calcSetting.id
        imgDelete.onclick = async () => {
            let responseDelete = await fetch(`${apiUrl}/delete?id=${imgDelete.id}`)
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
    const response = await fetch(`${apiUrl}/create`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: calc
    });
    console.log(response)
}


fillingTableCalcSettings().then()