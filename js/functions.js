const apiUrl = "http://localhost:8080/api"
const getJSON = async (url) => {
    let jsonResponse
    await fetch(url, {
        method: 'GET',
        headers: {"Authorization": getAuthCookie()}
    }).then(CheckError)
        .then((response) => {
            jsonResponse = response
        }).catch((error) => {
            console.log(error);
        })
    return jsonResponse
}


async function createOrUpdateEntity(query, jsonBody, method) {
    await fetch(`${apiUrl}/${query}`, {
        method: method,
        headers: {"Content-Type": "application/json", "Authorization": getAuthCookie()},
        body: jsonBody
    }).then(CheckError)
        .then((jsonResponse) => {
        }).catch((error) => {
        });
}

async function deleteEntity(query, id) {
    await fetch(`${apiUrl}/${query}${id}`, {
            method: 'DELETE',
            headers: {"Authorization": getAuthCookie()}
        }
    ).then(CheckError)
        .then((jsonResponse) => {
            location.reload()
        }).catch((error) => {
        });
    location.reload()
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

async function CheckError(response) {
    if (response.status >= 200 && response.status <= 299) {
        return await response.json();
    } else if (response.status === 400) {
        let jsonResponse = await response.json()
        alert(jsonResponse.message)
    } else if (response.status === 401 || response.status === 403) {
        alert("Необходимо ввести логин и пароль")
        window.location = '../index.html'
    } else {
        throw Error(response.statusText);
    }
}

async function fillingSelect(query, id, text, classSelect) {
    let entities = await getJSON(`${apiUrl}/${query}/get`)
    let jsonsForSelect = []
    let jsonForSelect
    entities.forEach(entity => {
        jsonForSelect = {
            id: eval(id),
            text: eval(text)
        }
        jsonsForSelect.push(jsonForSelect)
    })
    $(`.${classSelect}`).select2({
        data: jsonsForSelect
    });
}

function getAuthCookie() {
    var cn = "Authorization=";
    var idx = document.cookie.indexOf(cn)

    if (idx != -1) {
        var end = document.cookie.indexOf(";", idx + 1);
        if (end == -1) end = document.cookie.length;
        return unescape(document.cookie.substring(idx + cn.length, end));
    } else {
        return "";
    }
}

function deleteCookie(name) {
    document.cookie = name + "=" +
        (";path=/calc-add-pay-school-frontend") +
        ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
}

async function hiddenAll() {
    let role = await getJSON(`${apiUrl}/role/get`)
    if (role === 'SECRETARY') {
        let addClassHr = document.querySelectorAll('.hr')
        addClassHr.forEach(addClasHr => {
                addClasHr.remove()
            }
        )
    }
    if (role === 'HR' || role === 'SECRETARY') {
        let addClass = document.querySelectorAll('.admin')
        addClass.forEach(addClas => {
                addClas.remove()
            }
        )
    }
}
