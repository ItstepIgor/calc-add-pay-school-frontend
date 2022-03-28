let id

const fillingTableBasicNorms = async () => {
    let basicNorms = await getJSON(`${apiUrl}/basicnorms/get`)
    let maxDate = await getJSON(`${apiUrl}/basicnorms/getmaxdate`)
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
            let basic = await getJSON(`${apiUrl}/basicnorms/getbyid?id=${imgUpdate.id}`).then()
            id = basic.id
            document.querySelector('.basic-norm-name').value = basic.basicNormName
            document.querySelector('.basic-norm-value').value = basic.basicNormValue
            document.querySelector('.basic-norm-date').value = basic.basicNormDate
        }
        imgDelete.id = basicNorm.id
        imgDelete.onclick = async () => {
            let responseDelete = await fetch(`${apiUrl}/basicnorms/delete?id=${imgDelete.id}`)
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
    let jsonBody = JSON.stringify({
        id: id,
        basicNormName: elements.basicNormName.value,
        basicNormValue: elements.basicNormValue.value,
        basicNormDate: elements.basicNormDate.value
    })
    // console.log(jsonBody)
    if (id > 0) {
        await createOrUpdateEntity('basicnorms/update', jsonBody, 'PUT');
    } else {
        await createOrUpdateEntity('basicnorms/create', jsonBody, 'POST');
    }
}

fillingTableBasicNorms().then()