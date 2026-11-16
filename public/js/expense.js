
const host = 'http://localhost:5000';
const end_point = 'expense/data';
let id = null;

const form = document.getElementById('form');
const ul = document.getElementById('output');
const usersList = document.getElementById('users');

const expense = document.getElementById('expense');
const description = document.getElementById('description');
const category = document.getElementById('category');

const submit = document.getElementById('submitBtn');
const output = document.getElementById('message');

function createList() {
    const li = document.createElement('li');

    li.classList.add('web-link');

    return li;
}

function addBtn(check) {
    const btn = document.createElement('button');

    btn.classList.add(check);

    btn.type = 'button';

    btn.textContent = check === 'delete-bookmark'
        ? 'DELETE'
        : 'EDIT';

    return btn;
}

async function updateExpense() {
    await axios.put(`${host}/${end_point}`, {
        userId: sessionStorage.getItem('user')
    });
}

async function loadContent() {

    try {
        ul.innerHTML = '';
        usersList.innerHTML = '';

        const resp = await axios.get(`${host}/${end_point}`, {
            params: {
                userId: sessionStorage.getItem('user')
            }
        });

        const response = await axios.get(`${host}/auth/users`);
        const users = response.data?.data;

        for(let user of users) {

            const li = createList();
            li.classList.add('user-item');

            const {
                name, 
                totalExpense
            } = user;

            const avatar = document.createElement('div');
            avatar.classList.add('user-avatar');
            avatar.textContent = name.charAt(0).toUpperCase();

            const details = document.createElement('div');
            details.classList.add('user-details');

            const username = document.createElement('p');
            username.classList.add('user-name');
            username.textContent = name;

            const total = document.createElement('p');
            total.classList.add('user-total');
            total.textContent =
                `Total: ₹${Number(totalExpense).toLocaleString('en-IN')}`;

            details.append(name, total);

            li.append(avatar, details);
            usersList.append(li);
        }

        for(let item of resp.data?.data) {

            const { 
                category, 
                expense, 
                expenseId,
                expense_disc,
            } = item;

            const li = createList();

            const htmlTemplate = `<p id="${expenseId}"><span class="${category}">${category}</span> - <span class="${expense_disc}">${expense_disc}</span> - <span class="${expense}">${expense}</span></p>`;

            li.innerHTML = htmlTemplate;

            li.append(addBtn('delete-bookmark'));
            li.append(addBtn('edit-bookmark'));

            ul.append(li);

        }

    } catch(error) {
        console.log(error);
    }
}

window.addEventListener('DOMContentLoaded', loadContent);

form.addEventListener('submit',async (e) => {
    e.preventDefault();

    try {
        submit.disabled = true;
        output.innerText = '';
        let resp = null;

        const userId = sessionStorage.getItem('user');

        if(!userId) {
            output.innerText = 'Please login first!';
            alert('Please login first!');
            window.location.href = 'http://localhost:5000/';
        }

        const newExpense = {
            userId,
            expense: Number(expense.value),
            expense_disc: description.value.trim(),
            category: category.value.trim()
        }

        if (id) {

            resp = await axios.put(
                `${host}/expense/${id}`,
                newExpense
            );

        } else {

            resp = await axios.post(
                `${host}/${end_point}`,
                newExpense
            );
        }

        output.innerText = resp.data.message;

        id = null;

        form.reset();
        submit.textContent = 'Add Expense';

    } catch(error) {
        // Display backend error message
        output.innerText =
            error.response?.data?.message ||
            error.message ||
            'Something went wrong!';
    }
    finally {
        submit.disabled = false;
        submit.textContent= 'Add Expense';

        await loadContent();
        await updateExpense();

        setTimeout(() => {
            output.innerText = '';
        }, 5000);   
    }
});

ul.addEventListener('click', async (event) => {

    try {
        if(event.target.classList.contains('edit-bookmark')) {
            let parentId = event.target.parentElement.querySelector('p').id;

            const isEdit = document.getElementsByClassName('edit-bookmark');

            const resp = await axios.get(`${host}/expense/${parentId}`, {
                params: {
                    userId: sessionStorage.getItem('user')
                }
            });
            
            for(let edit of isEdit) {
                edit.disabled = true;
            }

            const { 
                category: categoree, 
                expense: expens, 
                expenseId, 
                expense_disc,
            } = resp.data.data;

            expense.value = expens;
            description.value = expense_disc;
            category.value = categoree;
            
            id = expenseId;

            submit.textContent= 'Update';

            await loadContent();
            await updateExpense();
        }

        if(event.target.classList.contains('delete-bookmark')) {
            let parentId = event.target.parentElement.querySelector('p').id;

            await axios.delete(`${host}/expense/${parentId}`, {
                params: {
                    userId: sessionStorage.getItem('user')
                }
            });

            await loadContent();
            await updateExpense();
        }

    } catch(error) {
        console.log('error comes: ');
    }
});