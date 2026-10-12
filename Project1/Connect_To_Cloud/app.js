
const exp = document.getElementById('expense');
const search  = document.getElementById('search');
const category= document.getElementById('categorySelect');
const error   = document.getElementById('error');
const dropdownMenu = document.getElementById('dropdownMenu');
const ulList  = document.getElementsByClassName('output')[0];
const addorupdate = document.querySelector('.see');
let id = null;

const API_URL= "https://crudcrud.com/api";
const code = 'b72ce64e8b7244ec9888beca274294dd';


dropdownMenu.addEventListener('click', (event) => {
    if(event.target.classList.contains('dropdown-item')) {
        search.value = event.target.textContent;
        const bsInst = bootstrap.Dropdown.getInstance(search);
        if(bsInst) {
            bsInst.hide();
        }
    }
});

window.addEventListener('DOMContentLoaded', async function getUserFromLocalStorage() {

    const obj = await axios.get(`${API_URL}/${code}/appointmentData`); 
    const expObj = obj.data;

    console.log(expObj);

    for(let expense of expObj) {

        let li = createList();
        li.innerHTML = `<p id=${expense._id} class="expense-list">
                    <span class=${expense.expense}>${expense.expense} -</span>
                    <span class=${expense.disciption}>${expense.disciption} -</span>
                    <span class=${expense.category}>${expense.category}</span>
                </p>`;

        btns(li);
        ulList.append(li);
    }
})

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

async function expense() {

    if(
        exp.value === null || 
        exp.value === '' ||
        search.value === null || 
        search.value === '' ||
        category.value === null ||
        category.value === ''
    ) {
        error.textContent = 'Fill each detail & then add expense';
        const message = await new Promise((res, rej) => { 
            setTimeout(() => {
                res('');
            }, 5000);
        });

        error.textContent = message;
        return ;
    }

    let checks = document.getElementsByClassName('edit-exp')[0]?.disabled === true;
    console.log(checks)

    const expObj = {
        expense: exp.value,
        disciption: search.value,
        category: category.value
    }

    try {
        if(!checks) {
            await axios.post(`${API_URL}/${code}/appointmentData`, expObj);
        
            let li = createList();

            li.innerHTML = `<p id='expense-list'>
                    <span class=${exp.value}>${exp.value} -</span>
                    <span class=${search.value}>${search.value} -</span>
                    <span class=${category.value}>${category.value}</span>
                </p>`;
        
            btns(li);
            ulList.append(li);
        }
        else {
            await axios.put(`${API_URL}/${code}/appointmentData/${id}`, expObj);
            const isEdit = document.getElementsByClassName('edit-exp');

            for(let edit of isEdit) {
                edit.disabled = false;
            }

            id = null;
            addorupdate.textContent = 'Add Expense'

            error.textContent = 'Data edited successfully...';
            setTimeout(() => {
                error.textContent = '';
            }, 5000);
        }
    }
    catch(error) {
        console.log(error);
    }
}

ulList.addEventListener('click',async (e) => {

    let parentId = document.getElementsByClassName('expense-list')[0]?.id;
    
    if(e.target.classList.contains('edit-exp')) {
        const data = await axios.get(`${API_URL}/${code}/appointmentData/${parentId}`);
        const isEdit = document.getElementsByClassName('edit-exp');

        for(let edit of isEdit) {
            edit.disabled = true;
        }

        id = parentId;
        
        exp.value = data.data.expense;
        search.value = data.data.disciption;
        category.value = data.data.category;
        addorupdate.textContent = 'Update';
    }
    else if(e.target.classList.contains('delete-exp')) {
        
        await axios.delete(`${API_URL}/${code}/appointmentData/${parentId}`);
        error.textContent = 'expense deleting...';

        setTimeout(() => {
            error.textContent = '';
        }, 3000);
    }
})