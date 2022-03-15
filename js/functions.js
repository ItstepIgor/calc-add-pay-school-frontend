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


document.querySelector('.calc-percent-salary').onclick = async event => {
    await fetch(`http://localhost:8080/api/stafflist/calcpercentsalary`)
    document.querySelector('.calc-percent-salary').setAttribute('disabled', true)
}


// window.onkeydown = e => {
//     if (e.keyCode === 38 && e.target.classList.contains('input-edit-day')) {
//         console.log(e.target.focusIndex)
//         document.querySelectorAll('.input-edit-day').forEach(ed => {
//             if (++ed.focusIndex == e.target.focusIndex) ed.focus()
//         })
//     }
//
//кнопки на листе time_sheet
// document.querySelector('.select-all').onclick = event => {
//     fillingTableTimeSheet().then()
//     document.querySelector('.select-all').setAttribute('disabled', true)
// }
// document.querySelector('.div-edit-day').onclick = event => {
//     editWorkDate()
// }