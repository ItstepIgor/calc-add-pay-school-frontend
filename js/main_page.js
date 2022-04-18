const fillingMainPage = async () => {
    let role = await getJSON(`${apiUrl}/role/get`)
    if (role !== 'SECRETARY') {
        let maxDate = await getJSON(`${apiUrl}/hr/calcsetting/getmaxdate`)
        let staffLists = await getJSON(`${apiUrl}/hr/stafflist/getwhoworked`)
        let calcDate = document.querySelector('.calc-date')
        let countStaff = document.querySelector('.count-staff')
        calcDate.style.color = 'black'
        calcDate.innerHTML = 'Дата расчета: ' + maxDate.calcDate
        countStaff.style.color = 'black'
        countStaff.innerHTML = 'Количество активных позиций ШР: ' + staffLists.length
    }
}

fillingMainPage().then()