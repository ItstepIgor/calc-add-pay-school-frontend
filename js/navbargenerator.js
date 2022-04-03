function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("my-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("my-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}

includeHTML()






















// let generationNavBar = innerHtml => {
//     let navBar = document.createElement("nav")
//     navBar.className = "navbar navbar-light bg-light fixed-top"
//     let divBar = document.createElement("div")
//     divBar.className = "container-fluid"
//     let divForm = document.createElement("form")
//     divForm.className = "d-flex"
//     divForm.innerHTML = innerHtml
//     divBar.appendChild(divForm)
//     navBar.appendChild(divBar)
//
//     document.querySelector("body").prepend(navBar)
// }
//
// let createMenu = () => {
//     let ulList = document.createElement("ul")
//     let liList1 = document.createElement("li")
//     let ulList1 = document.createElement("ul")
//     let liList1_1 = document.createElement("li")
//     let liList1_2 = document.createElement("li")
//     let liList2 = document.createElement("li")
//     let ulList2 = document.createElement("ul")
//     let liList2_1 = document.createElement("li")
//     let liList2_2 = document.createElement("li")
//     let liList2_3 = document.createElement("li")
//     let liList3 = document.createElement("li")
//     let ulList3 = document.createElement("ul")
//     let liList3_1 = document.createElement("li")
//     let liList3_2 = document.createElement("li")
//     let liList3_3 = document.createElement("li")
//     let liList4 = document.createElement("li")
//     let ulList4 = document.createElement("ul")
//     let liList4_1 = document.createElement("li")
//     let liList4_2 = document.createElement("li")
//     let liList4_3 = document.createElement("li")
//     let liList4_4 = document.createElement("li")
//     let liList5 = document.createElement("li")
//     let ulList5 = document.createElement("ul")
//     let liList5_1 = document.createElement("li")
//     let liList5_2 = document.createElement("li")
//     let liList5_3 = document.createElement("li")
//
// }


//
//
// generationNavBar('<ul id="list">\n' +
//     '    <li><a href="#">Константы</a>\n' +
//     '        <ul>\n' +
//     '            <li><a href="/page/basic_norms_page.html">Базовые нормы</a></li>\n' +
//     '            <li><a href="/page/percent_salary_page.html">Процент премирования</a></li>\n' +
//     '        </ul>\n' +
//     '    </li>\n' +
//     '    <li><a href="#">Справочники</a>\n' +
//     '        <ul>\n' +
//     '            <li><a href="/page/position_page.html">Должности</a></li>\n' +
//     '            <li><a href="/page/add_pay_type_page.html">Типы доп. оплат</a></li>\n' +
//     '            <li><a href="/page/add_pay_page.html">Вознаграждения</a></li>\n' +
//     '        </ul>\n' +
//     '    </li>\n' +
//     '    <li><a href="#">Сотрудники</a>\n' +
//     '        <ul>\n' +
//     '            <li><a href="/page/people_page.html">Физлица</a></li>\n' +
//     '            <li><a href="/page/staff_list_page.html">Штатное расписание</a></li>\n' +
//     '            <li><a href="#">Пользователи системы</a></li>\n' +
//     '        </ul>\n' +
//     '    </li>\n' +
//     '    <li><a href="#">Ежемесячные настройки</a>\n' +
//     '        <ul>\n' +
//     '            <li><a href="/page/calc_settings_page.html">Дата расчета и рабочие дни</a></li>\n' +
//     '            <li><a href="/page/add_pay_fund_page.html">Ежемесячные фонды</a></li>\n' +
//     '            <li><a href="/page/time_sheet_page.html">Табель</a></li>\n' +
//     '            <li><a href="/page/add_pay_result_page.html">Назначение дополнительных оплат</a></li>\n' +
//     '        </ul>\n' +
//     '    </li>\n' +
//     '    <li><a href="#">Итоги</a>\n' +
//     '        <ul>\n' +
//     '            <li><a href="/page/percent_salary_result_page.html">Начисление премии</a></li>\n' +
//     '            <li><a href="#">Отчет №1</a></li>\n' +
//     '            <li><a href="#">Отчет №2</a></li>\n' +
//     '            <li><a href="#">Отчет №3</a></li>\n' +
//     '        </ul>\n' +
//     '    </li>\n' +
//     '</ul>')
