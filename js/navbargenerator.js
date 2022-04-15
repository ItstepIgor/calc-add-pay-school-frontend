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
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
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
    document.querySelector('.exit').onclick = () => {
        deleteCookie("Authorization")
        window.location = '../index.html'
    }


    const buttonItems = document.querySelectorAll('.bonus-pdf')

    buttonItems.forEach((buttonItem) =>
        buttonItem.addEventListener('click', (event) => {

                let addPayTypeId = event.target.id
                let fileName
                if (addPayTypeId == 1) {
                    fileName = 'Премия.pdf'
                } else if (addPayTypeId == 2) {
                    fileName = 'Характер труда.pdf'
                } else if (addPayTypeId == 3) {
                    fileName = 'Стимулирующая надбавка.pdf'
                }
                let downloadElement = document.createElement("a")
                document.body.appendChild(downloadElement);
                let url = `${apiUrl}/s/report/bonus?id=${addPayTypeId}`

                let headers = new Headers();
                headers.append('Authorization', getAuthCookie())

                fetch(url, {headers})
                    .then(response => {
                        return response.blob()
                    })
                    .then(fileResponse => {
                        let objectUrl = window.URL.createObjectURL(fileResponse)
                        downloadElement.href = objectUrl
                        downloadElement.download = fileName
                        downloadElement.click()
                        window.URL.revokeObjectURL(objectUrl)
                    })

            }
        ))

    hiddenAll()
}

includeHTML()
