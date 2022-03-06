const getUsers = async () => {
    let response = await fetch('http://localhost:8080/api/people/get')
    return response.ok ? response.json() : undefined
}

// const getUser = async (id) => {
//     let response = await fetch('https://jsonplaceholder.typicode.com/users?id=' + id)
//     return response.ok ? response.json() : undefined
// }
//

const foo = async () => {
    let users = await getUsers()
    console.log(users)
    // users.forEach(user => {
    //     let div = document.createElement('div')
    //     div.innerText = `${user.surName}`
    //     div.classList.add('user')
    //     div.onclick = event => {
    //
    //         document.getElementById('name').innerHTML = user.name
    //         document.getElementById('userName').innerHTML = user.username
    //         document.getElementById('address').innerHTML = user.address
    //         document.getElementById('email').innerHTML = user.email
    //         document.getElementById('phone').innerHTML = user.phone
    //         document.getElementById('website').innerHTML = user.website
    //     }
    //
    //
    //     document.querySelector('.users').append(div)
    // })
    // Можем вывести всю информацию
    // console.log(json[0].name)
    // event.preventDefault();
}
foo()

