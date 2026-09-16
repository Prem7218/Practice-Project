document.addEventListener("DOMContentLoaded", initialize);


// Don't remove anything just complete the functions


// When the page get load display all users
 function initialize(){
    display();
 }


// add new users in usersList array
function handleFormSubmit(event) {  
    event.preventDefault();

    let username = event.target.username.value;
    let email = event.target.email.value;
    let phone = event.target.phone.value;

    let user = {
        id: Date.now(),
        username,
        email,
        phone,
    }

    let userList = JSON.parse(localStorage.getItem('usersList')) || [];

    userList.push(user);

    localStorage.setItem('usersList', JSON.stringify(userList));

    let ul = document.querySelector('ul');
    let li = document.createElement('li');

    li.textContent = `${username} ${email} ${phone}`;

    let btn = document.createElement('button');
    btn.classList = 'delete-btn';
    btn.textContent = 'Delete';

    btn.addEventListener("click", function () {
        deleteData(user.id, li);
    });

    li.append(btn);
    ul.append(li);
}


 // use this function to display user on screen
function display() {

    let userList = JSON.parse(localStorage.getItem('usersList')) || [];

    let ul = document.querySelector('ul');
    
    ul.innerHTML = '';

    for (let user of userList) {

        let li = document.createElement('li');
        li.textContent = `${user.username} ${user.email} ${user.phone}`;

        let btn = document.createElement('button');
        btn.classList = 'delete-btn';
        btn.textContent = 'Delete';

        btn.addEventListener("click", function () {
            deleteData(user.id, li);
        });

        li.append(btn);
        ul.append(li);
    }
}


 // use this function to delete the user details from local store and DOM (screen)
function deleteData(id, li) {

    let userList = JSON.parse(localStorage.getItem('usersList')) || [];

    let updatedUserList = [];

    for (let user of userList) {
        if (user.id !== id) {
            updatedUserList.push(user);
        }
    }

    localStorage.setItem('usersList', JSON.stringify(updatedUserList));

    li.remove();
}




 module.exports = handleFormSubmit
