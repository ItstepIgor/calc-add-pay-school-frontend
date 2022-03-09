const apiUrl = "http://localhost:8080/api/position"
let id
const getPosition = async (url) => {
    let response = await fetch(url)
    return response.ok ? response.json() : undefined
}

const fillingTablePosition = async () => {
    let positions = await getPosition(`${apiUrl}/get`)
    console.log(positions)
    positions.forEach(position => {
        console.log(position)
        let div = document.createElement('div')
        let divPositionName = document.createElement('div')
        let divSorting = document.createElement('div')
        let divUpdate = document.createElement('div')
        let imgUpdate = document.createElement('img')
        let divDelete = document.createElement('div')
        let imgDelete = document.createElement('img')
        div.className = 'div-table-row'
        divPositionName.className = 'div-table-cell'
        divSorting.className = 'div-table-cell'
        divUpdate.className = 'div-table-cell'
        imgUpdate.src = '../images/update.png'
        divDelete.className = 'div-table-cell'
        imgDelete.src = '../images/delete.png'

        divPositionName.innerHTML = position.positionName
        divSorting.innerHTML = position.sorting
        imgUpdate.id = position.id
        imgUpdate.onclick = async () => {
            let pos = await getPosition(`${apiUrl}/getbyid?id=${imgUpdate.id}`).then()
            id = pos.id
            document.querySelector('.position-name').value = pos.positionName
            document.querySelector('.sorting').value = pos.sorting
        }
        imgDelete.id = position.id
        imgDelete.onclick = async () => {
            let responseDelete = await fetch(`${apiUrl}/delete?id=${imgDelete.id}`)
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
    const response = await fetch(`${apiUrl}/create`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: position
    });
    console.log(response)
}


fillingTablePosition().then()