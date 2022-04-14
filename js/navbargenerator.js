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
                // console.log(event.target.id)
                let reportId = event.target.id
                let downloadElement = document.createElement("a");
                document.body.appendChild(downloadElement);
                let file = `http://localhost:8080/api/s/report/bonus?id=${reportId}`;

                let headers = new Headers();
                headers.append('Authorization', getAuthCookie());

                fetch(file, {headers})
                    .then(response => response.blob())
                    .then(file => {
                        let objectUrl = window.URL.createObjectURL(file);

                        downloadElement.href = objectUrl;
                        downloadElement.download = 'bonus.pdf';
                        downloadElement.click();

                        window.URL.revokeObjectURL(objectUrl);
                    });
            }
        ))


    // const link = document.createElement('a')
    // link.href = `http://localhost:8080/api/s/report/bonus`
    // link.download = 'bonus.pdf'
    // document.body.appendChild(link)
    // link.click()
    // link.remove()


    // function downloadPDF(pdf) {
    //     const linkSource = `data:application/pdf;base64,${pdf}`;
    //     const downloadLink = document.createElement("a");
    //     const fileName = "vct_illustration.pdf";
    //
    //     downloadLink.href = linkSource;
    //     downloadLink.download = fileName;
    //     downloadLink.click();
    // }

    // document.querySelectorAll('.bonus-pdf').forEach(bon => bon.click())
    // {
    //
    //
    //
    //
    //
    //
    // }

    hiddenAll()
}

includeHTML()
