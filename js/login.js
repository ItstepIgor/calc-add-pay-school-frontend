document.forms.loginForm.onsubmit = event => {
    let elements = event.target.elements
    console.log(elements)
    document.cookie = "Authorization=" + 'Basic ' + btoa(elements.username.value + ":" + elements.password.value);

    fetch(` http://localhost:8080/api/login`, {
        method: 'GET',
        headers: {"Authorization": getAuthCookie()}
    })
        .then((response) => {
            if (response.status === 200) {
                window.location = 'page/main_page.html'
            }
            return response.json()
        }).then(jsonResponse => {
        alert(jsonResponse.message)
    })

    // .then(response => response.json())
    // .then(json => console.log(json));
    event.preventDefault()
}