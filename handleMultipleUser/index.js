
function handleFormSubmit(e) {
    e.preventDefault();

    let username = e.target.username.value;
    let email = e.target.email.value;
    let phone = e.target.phone.value;

    let user = {
        username: username,
        email: email,
        phone: phone
    }

    localStorage.setItem(email, JSON.stringify(user));

    let ulList = document.querySelector('ul');
    
    let li = document.createElement('li');
    li.textContent = `Username: ${username}, Email: ${email}, Phone: ${phone}`;

    ulList.append(li);
}

function getUsersFromLocalStorage() {

    for (let i = 0; i < localStorage.length; i++) {

        let email = localStorage.key(i);

        let user = JSON.parse(localStorage.getItem(email));

        let ul = document.querySelector('ul');
        let li = document.createElement('li');
        li.textContent = `Username: ${user.username}, Email: ${user.email}, Phone: ${user.phone}`;

        ul.append(li);
    }
}

module.exports = handleFormSubmit;