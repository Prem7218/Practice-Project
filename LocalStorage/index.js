
function handleFormSubmit(event) {
    event.preventDefault();

    let username = event.target.username.value;
    let email = event.target.email.value;
    let phone = event.target.phone.value;

    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
}

module.exports = handleFormSubmit;