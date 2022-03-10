const apiUrl = "http://localhost:8080/api/basicnorms"
let id

const fillingTableBasicNorms = async () => {
    let basicNorms = await getJSON(`${apiUrl}/get`)
    let maxDate = await getJSON(`${apiUrl}/getmaxdate`)
    basicNorms.forEach(basicNorm => {
        let div = document.createElement('div')
        let divBasicNormName = document.createElement('div')
        let divBasicNormValue = document.createElement('div')
        let divBasicNormDate = document.createElement('div')
        let {divUpdate, imgUpdate, divDelete, imgDelete} = createUpdateAndDeleteElement();

        div.className = 'div-table-row'
        divBasicNormName.className = 'div-table-cell'
        divBasicNormValue.className = 'div-table-cell div-align-center'
        divBasicNormDate.className = 'div-table-cell div-align-center'


        divBasicNormName.innerHTML = basicNorm.basicNormName
        divBasicNormValue.innerHTML = basicNorm.basicNormValue
        divBasicNormDate.innerHTML = basicNorm.basicNormDate

        imgUpdate.id = basicNorm.id
        imgUpdate.onclick = async () => {
            let basic = await getJSON(`${apiUrl}/getbyid?id=${imgUpdate.id}`).then()
            id = basic.id
            document.querySelector('.basic-norm-name').value = basic.basicNormName
            document.querySelector('.basic-norm-value').value = basic.basicNormValue
            document.querySelector('.basic-norm-date').value = basic.basicNormDate
        }
        imgDelete.id = basicNorm.id
        imgDelete.onclick = async () => {
            let responseDelete = await fetch(`${apiUrl}/delete?id=${imgDelete.id}`)
            location.reload()
            console.log(responseDelete)
        }

        div.appendChild(divBasicNormName)
        div.appendChild(divBasicNormValue)
        div.appendChild(divBasicNormDate)
        // console.log(calcSetting.calcDate)
        // console.log(maxDate.calcDate)
        if (maxDate.basicNormDate === basicNorm.basicNormDate) {
            divUpdate.appendChild(imgUpdate)
            divDelete.appendChild(imgDelete)
        }
        div.appendChild(divUpdate)
        div.appendChild(divDelete)
        document.querySelector('.div-table-body').appendChild(div)
    })
}

document.forms.createBasicNorm.onsubmit = async (event) => {
    let elements = event.target.elements
    let basic = JSON.stringify({
        id: id,
        basicNormName: elements.basicNormName.value,
        basicNormValue: elements.basicNormValue.value,
        basicNormDate: elements.basicNormDate.value
    })
    const response = await fetch(`${apiUrl}/create`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: basic
    });
    console.log(response)
}

fillingTableBasicNorms().then()