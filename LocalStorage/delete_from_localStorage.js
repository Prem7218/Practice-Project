
function handleFormSubmit(e) {
    e.preventDefault();

    let username = e.target.username.value;
    let email = e.target.email.value;
    let phone = e.target.phone.value;

    localStorage.setItem(email, `${username}, ${phone}`);

    let ulList = document.querySelector('ul');
    let li = document.createElement('li');

    let btn = document.createElement('button');
    btn.classList.add('delete-btn');
    btn.textContent = 'Delete';

    li.style.listStyleType = 'disc';

    li.textContent = `${username}, ${email} , ${phone}`;
    li.dataset.email = email;

    li.append(btn);

    ulList.append(li);
}

document.addEventListener("click", (e) => {

    if (e.target.classList.contains('delete-btn')) {

        let li = e.target.parentElement;
        let email = li.dataset.email;

        localStorage.removeItem(email);

        li.remove();
    }
})

module.exports = handleFormSubmit;