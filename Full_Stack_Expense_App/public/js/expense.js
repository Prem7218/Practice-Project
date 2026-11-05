
const exp = document.getElementById('expense');
const search  = document.getElementById('search');
const category= document.getElementById('categorySelect');
const error   = document.getElementById('error');
const dropdownMenu = document.getElementById('dropdownMenu');
const ulList  = document.getElementsByClassName('output')[0];
const addorupdate = document.querySelector('.see');
let id = null;

const API_URL = 'http://localhost:3400';
const end_point = '/expenses/all';

function addBtn(check) {

    const btn = document.createElement('button');
    btn.classList.add(check);
    btn.textContent = check === "delete-exp" ? 'DELETE' : 'EDIT';

    return btn;
}

function createList() {
    const li = document.createElement('li');
    li.classList.add('expense-add');

    return li;
}

function btns(li) {
    li.append(addBtn("delete-exp"));
    li.append(addBtn("edit-exp"));
}

dropdownMenu.addEventListener('click', (e) => {
    if(e.target.classList.contains('dropdown-item')) {
        console.log(search.value);
        console.log(e);
        search.value = e.target.firstChild.data;
        console.log(search.value);
        const bsInst = bootstrap.Dropdown.getInstance(search);
        if(bsInst) {
            bsInst.hide();
        }
    }
});

async function loadExpenses() {

    try {

        const response = await axios.get(
            `${API_URL}${end_point}`
        );

        console.log(response);

        const expenses = response.data.data;

        ulList.innerHTML = '';

        for (const expense of expenses) {

            const li = createList();

            const p = document.createElement('p');
            p.id = expense.id;
            p.classList.add('expense-list');

            const amount = document.createElement('span');
            amount.textContent = `${expense.amount} - `;

            const description = document.createElement('span');
            description.textContent = `${expense.search} - `;

            const categoryName = document.createElement('span');
            categoryName.textContent = expense.category;

            p.append(amount, description, categoryName);

            li.append(p);

            btns(li);

            ulList.append(li);
        }

    } catch (error) {
        console.error('Unable to fetch expenses:', error);
    }
}

window.addEventListener('DOMContentLoaded', loadExpenses);


async function expense() {

    if (
        !exp.value.trim() ||
        !search.value.trim() ||
        !category.value
    ) {
        error.textContent = 'Fill each detail!';
        return;
    }

    const expObj = {
        amount: Number(exp.value),
        search: search.value.trim(),
        category: category.value
    }

    try {
        if(id === null) {
            await axios.post(
                `${API_URL}${end_point}`
                , expObj
            );
        
            error.textContent = 'Expense added Successfully!';
        }
        else {
            await axios.put(
                `${API_URL}${end_point}/${id}`
                , expObj
            );

            error.textContent = 'Expense updated successfully!';

            id = null;
            addorupdate.textContent = 'Add Expense';
        }

        await loadExpenses();

        exp.value = '';
        search.value = '';
        category.value = '';

        setTimeout(() => {
            error.textContent = '';
        }, 3000);

    }
    catch(error) {
        console.log(error);
        error.textContent = 'Unable to save expense!';
    }
}

ulList.addEventListener('click',async (e) => {

    const li = e.target.closest('li');

    if(!li) return ;

    let parentId = document.querySelector('.expense-list')?.id;

    if(!parentId) return ;
    
    if(e.target.classList.contains('edit-exp')) {
        
        const resp = await axios.get(
            `${API_URL}${end_point}/${parentId}
            `);
        const data = resp.data.data;

        id = parentId;

        exp.value = data.amount;
        search.value = data.search;
        category.value = data.category;

        addorupdate.textContent = 'Update';

    }
    else if(e.target.classList.contains('delete-exp')) {
        
        await axios.delete(
            `${API_URL}${end_point}/${parentId}`
        );

        li.remove();
        error.textContent = 'expense deleting...';

        setTimeout(() => {
            error.textContent = '';
        }, 3000);
    }
})