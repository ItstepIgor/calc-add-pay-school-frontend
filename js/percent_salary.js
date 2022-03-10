const apiUrl = "http://localhost:8080/api/percentsalary"
let id

const fillingTablePercentSalary = async () => {
    let percents = await getJSON(`${apiUrl}/get`)
    let maxDate = await getJSON(`${apiUrl}/getmaxdate`)
    percents.forEach(percent => {
        let div = document.createElement('div')
        let divPercentSalaryAll = document.createElement('div')
        let divPercentSalaryForYoungSpecial = document.createElement('div')
        let divPercentStartDate = document.createElement('div')
        let {divUpdate, imgUpdate, divDelete, imgDelete} = createUpdateAndDeleteElement();

        div.className = 'div-table-row'
        divPercentSalaryAll.className = 'div-table-cell div-align-center'
        divPercentSalaryForYoungSpecial.className = 'div-table-cell div-align-center'
        divPercentStartDate.className = 'div-table-cell div-align-center'

        divPercentSalaryAll.innerHTML = percent.percentSalaryAll
        divPercentSalaryForYoungSpecial.innerHTML = percent.percentSalaryForYoungSpecial
        divPercentStartDate.innerHTML = percent.percentStartDate

        imgUpdate.id = percent.id
        imgUpdate.onclick = async () => {
            let basic = await getJSON(`${apiUrl}/getbyid?id=${imgUpdate.id}`).then()
            id = basic.id
            document.querySelector('.percent-salary-all').value = basic.percentSalaryAll
            document.querySelector('.percent-salary-for-young-special').value = basic.percentSalaryForYoungSpecial
            document.querySelector('.percent-start-date').value = basic.percentStartDate
        }
        imgDelete.id = percent.id
        imgDelete.onclick = async () => {
            let responseDelete = await fetch(`${apiUrl}/delete?id=${imgDelete.id}`)
            location.reload()
            console.log(responseDelete)
        }

        div.appendChild(divPercentSalaryAll)
        div.appendChild(divPercentSalaryForYoungSpecial)
        div.appendChild(divPercentStartDate)
        // console.log(calcSetting.calcDate)
        // console.log(maxDate.calcDate)
        if (maxDate.percentStartDate === percent.percentStartDate) {
            divUpdate.appendChild(imgUpdate)
            divDelete.appendChild(imgDelete)
        }
        div.appendChild(divUpdate)
        div.appendChild(divDelete)
        document.querySelector('.div-table-body').appendChild(div)
    })
}

document.forms.createPercentSalary.onsubmit = async (event) => {
    let elements = event.target.elements
    let percent = JSON.stringify({
        id: id,
        percentSalaryAll: elements.percentSalaryAll.value,
        percentSalaryForYoungSpecial: elements.percentSalaryForYoungSpecial.value,
        percentStartDate: elements.percentStartDate.value
    })
    const response = await fetch(`${apiUrl}/create`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: percent
    });
    console.log(response)
}

fillingTablePercentSalary().then()