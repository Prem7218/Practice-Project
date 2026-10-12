
// Write your code below:

const ul = document.getElementById('output');
const username = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');

const API_URL = 'https://crudcrud.com/api';
const code = '01a50be0003547cc90b63f2a3d78b502';
const end_point = 'allUsers'

function createList() {

    const li = document.createElement('li');
    li.classList.add('user-list');

    return li;
}

function addBtn(check) {
    const btn = document.createElement('button');
    btn.classList.add(check);
    btn.textContent = check === 'delete-user' ? 'DELETE' : 'EDIT';

    return btn;
}

async function handleFormSubmit(event) {
    event.preventDefault();

    const user = {
        name: username.value,
        email: email.value,
        phone: phone.value
    }

    await axios.post(`${API_URL}/${code}/${end_point}`, user);

    const li = createList();
    li.innerHTML = `<p>
            <span ${user.name}>${user.name}  -</span>
            <span ${user.email}>${user.email} -</span>
            <span ${user.phone}>${user.phone}</span>
        </p>`

    li.append(addBtn('delete-user'));
    li.append(addBtn('edit-user'));

    ul.append(li);
}

window.addEventListener('DOMContentLoaded', async () => {

    let resp = await axios.get(`${API_URL}/${code}/${end_point}`);

    if(resp.data.length === 0) {
        return ;
    }

    console.log(resp.data);

    for(let item of resp.data) {
        
        let { email, name, phone, _id } = item;

        let li = createList();
        li.innerHTML = `<p id=${_id}>
            <span class=${name} >${name} -</span>
            <span class=${email} >${email} -</span>
            <span class=${phone} >${phone}</span>
        </p>`

        li.append(addBtn('delete-user'));
        li.append(addBtn('edit-user'));

        ul.append(li);
    }    
});

ul.addEventListener('click', async (e) => {

    const parentId = document.getElementsByClassName('user-list')[0].querySelector('p').id;

    if (e.target.classList.contains('delete-user')) {
        await axios.delete(`${API_URL}/${code}/allUsers/${parentId}`);
    }
});
