let id

const fillingTablePosition = async () => {
    let positions = await getJSON(`${apiUrl}/position/get`)
    console.log(positions)
    positions.forEach(position => {
        console.log(position)
        let div = document.createElement('div')
        let divPositionName = document.createElement('div')
        let divSorting = document.createElement('div')
        let {divUpdate, imgUpdate, divDelete, imgDelete} = createUpdateAndDeleteElement();

        div.className = 'div-table-row'
        divPositionName.className = 'div-table-cell'
        divSorting.className = 'div-table-cell div-align-center'


        divPositionName.innerHTML = position.positionName
        divSorting.innerHTML = position.sorting
        imgUpdate.id = position.id
        imgUpdate.onclick = async () => {
            let pos = await getJSON(`${apiUrl}/position/getbyid?id=${imgUpdate.id}`).then()
            id = pos.id
            document.querySelector('.position-name').value = pos.positionName
            document.querySelector('.sorting').value = pos.sorting
        }
        imgDelete.id = position.id
        imgDelete.onclick = async () => {
            let responseDelete = await fetch(`${apiUrl}/position/delete?id=${imgDelete.id}`)
            // location.reload()
            console.log(responseDelete)
        }
        div.appendChild(divPositionName)
        div.appendChild(divSorting)

        div.appendChild(divUpdate)
        divUpdate.appendChild(imgUpdate)
        div.appendChild(divDelete)
        divDelete.appendChild(imgDelete)
        document.querySelector('.div-table-body').appendChild(div)
    })
}

document.forms.createPosition.onsubmit = async (event) => {
    let elements = event.target.elements
    let position = JSON.stringify({
        id: id,
        positionName: elements.positionName.value,
        sorting: elements.sorting.value
    })
    // console.log(position)
    const response = await fetch(`${apiUrl}/position/create`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: position
    });
    console.log(response)
}


fillingTablePosition().then()