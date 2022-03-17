const apiUrl = "http://localhost:8080/api"
const getJSON = async (url) => {
    let response = await fetch(url)
    return response.ok ? response.json() : undefined
}

function createUpdateAndDeleteElement() {
    let divUpdate = document.createElement('div')
    let imgUpdate = document.createElement('img')
    let divDelete = document.createElement('div')
    let imgDelete = document.createElement('img')
    divUpdate.className = 'div-table-cell'
    imgUpdate.src = '../images/update.png'
    divDelete.className = 'div-table-cell'
    imgDelete.src = '../images/delete.png'
    return {divUpdate, imgUpdate, divDelete, imgDelete};
}


/*document.querySelector('.save-edit-day').onclick = () => {
    saveEditDay()
}*/

//кнопки на листе time_sheet
// document.querySelector('.select-all').onclick = event => {
//     fillingTableTimeSheet().then()
//     document.querySelector('.select-all').setAttribute('disabled', true)
// }
// document.querySelector('.div-edit-day').onclick = event => {
//     editWorkDate()
// }

// document.querySelector('.save-edit-day').onclick = () => {
//     console.log('Проверка')
// }