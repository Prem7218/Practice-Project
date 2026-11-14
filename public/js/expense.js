
const host = 'http://localhost:5000';
const end_point = 'expense/data';

const form = document.getElementById('form');
const expense = document.getElementById('expense');
const description = document.getElementById('description');
const category = document.getElementById('category');

const submit = document.getElementById('submitBtn');
const output = document.getElementById('message');

form.addEventListener('submit',async (e) => {
    e.preventDefault();

    try {
        submit.disabled = true;

        const userId = sessionStorage.getItem('user');

        console.log(userId);

        const newExpense = {
            userId,
            expense: expense.value,
            expense_disc: description.value.trim(),
            category: category.value.trim()
        }

        const resp = await axios.post(`${host}/${end_point}`, newExpense);

        output.innerText = resp.message || resp.data.message;

    } catch(error) {
        output.innerText = error.message;
    }
    finally {
        submit.disabled = false;
    }
});