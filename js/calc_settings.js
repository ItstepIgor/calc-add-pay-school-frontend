const apiUrl = "http://localhost:8080/api/calcsetting"
let id
const getCalcSettings = async (url) => {
    let response = await fetch(url)
    return response.ok ? response.json() : undefined
}

async function getMaxDate() {
    return await getCalcSettings(`${apiUrl}/getmaxdate`).then()
}

const fillingTableCalcSettings = async () => {
    let calcSettings = await getCalcSettings(`${apiUrl}/get`)
    let maxDate = await getCalcSettings(`${apiUrl}/getmaxdate`)
    console.log(maxDate)
    // console.log(calcSettings)
    calcSettings.forEach(calcSetting => {
        // console.log(calcSetting)
        let div = document.createElement('div')
        let divCalcDate = document.createElement('div')
        let divWorkingDays = document.createElement('div')
        let divUpdate = document.createElement('div')
        let imgUpdate = document.createElement('img')
        let divDelete = document.createElement('div')
        let imgDelete = document.createElement('img')
        div.className = 'divTableRow'
        divCalcDate.className = 'divTableCell'
        divWorkingDays.className = 'divTableCell'
        divUpdate.className = 'divTableCell'
        imgUpdate.src = '../images/update.png'
        divDelete.className = 'divTableCell'
        imgDelete.src = '../images/delete.png'

        divCalcDate.innerHTML = calcSetting.calcDate
        divWorkingDays.innerHTML = calcSetting.workingDays
        imgUpdate.id = calcSetting.id
        imgUpdate.onclick = async () => {
            let calc = await getCalcSettings(`${apiUrl}/getbyid?id=${imgUpdate.id}`).then()
            id = calc.id
            document.querySelector('.calcDate').value = calc.calcDate
            document.querySelector('.workingDays').value = calc.workingDays
        }
        imgDelete.id = calcSetting.id
        imgDelete.onclick = async () => {
            let responseDelete = await fetch(`${apiUrl}/delete?id=${imgDelete.id}`)
            // location.reload()
            console.log(responseDelete)
        }
        div.appendChild(divCalcDate)
        div.appendChild(divWorkingDays)
        console.log(calcSetting.calcDate)
        console.log(maxDate.calcDate)
        if (maxDate.calcDate === calcSetting.calcDate) {
            divUpdate.appendChild(imgUpdate)
            divDelete.appendChild(imgDelete)
        }
        div.appendChild(divUpdate)
        div.appendChild(divDelete)
        document.querySelector('.divTableBody').appendChild(div)
    })
}

document.forms.createCalcSettings.onsubmit = async (event) => {
    let elements = event.target.elements
    let calc = JSON.stringify({
        id: id,
        calcDate: elements.calcDate.value,
        workingDays: elements.workingDays.value,
    })
    // console.log(position)
    const response = await fetch(`${apiUrl}/create`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: calc
    });
    console.log(response)
}


fillingTableCalcSettings().then()