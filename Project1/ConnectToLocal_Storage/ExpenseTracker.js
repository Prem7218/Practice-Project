const searchInput = document.getElementById('search');
const input = document.getElementById('input');
const dropdown = document.getElementById('dropdownMenu');
const category = document.getElementById('categorySelect');
const ul= document.getElementsByClassName('output')[0];
const error = document.getElementById('error');

dropdown.addEventListener('click', function(event) {
    if(event.target.classList.contains('dropdown-item')) {
        searchInput.value = event.target.textContent;
    
        const bsDropdown = bootstrap.Dropdown.getInstance(searchInput);
        if(bsDropdown) {
            bsDropdown.hide();
        }
    }
});      

function addRemove() {
    let remove = document.createElement('button');

    remove.class = 'mx-2';
    remove.classList.add('delete-expence');
    remove.textContent = ' Delete Expence ';

    return remove;
}

function addEdit() {
    let edit = document.createElement('button');

    edit.class = 'mx-2';
    edit.classList.add('edit-expense');
    edit.textContent = ' Edit Expense ';

    return edit;
}

function expense() {

    let classIs = category.disabled ? false : true;

    console.log(classIs);

    if(
        input.value === null || 
        input.value === '' || 
        searchInput.value === null || 
        searchInput.value === '' || 
        category.value === null ||
        category.value === ''
    ) {
        error.textContent = 'Fill each detail & then add expense';

        setTimeout(() => {
            error.textContent = '';
        }, 5000);

        return ;
    }

    let obj = {
        expense: input.value,
        discription: searchInput.value,
        category: category.value,
    }

    localStorage.setItem(category.value, JSON.stringify(obj));

    let li = document.createElement('li');

    if(classIs) {

        li.classList.add('expense-add');
        li.innerHTML = `<p id="expense-list"> 
                        <span class=${input.value}> ${input.value} -</span> 
                        <span class=${searchInput.value}> ${searchInput.value} -</span>
                        <span class=${category.value}> ${category.value} </span>
                    </p>`;

        li.append(addRemove());
        li.append(addEdit());

        ul.append(li);
    }
    else {
        const addExpense = document.getElementsByClassName('edit')[0];
        let isId = addExpense.id;
        
        addExpense.textContent = 'Add Expense';
        category.disabled = false;

        let edisIs = document.querySelectorAll('.edit-expense');
        for(let i = 0; i < edisIs.length; i++) {
            edisIs[i].disabled = false;
        }

        addExpense.classList.remove('edit');
        addExpense.classList.add('see');

        input.value = '';
        searchInput.value = '';
        category.value = '';
    }
}

function getUsersFromLocalStorage() {
    for(let i = 0; i < localStorage.length; i++) {

        let category = localStorage.key(i);
        let obj  = JSON.parse(localStorage.getItem(category));
        let li = document.createElement('li');

        li.classList.add('expense-add');
        li.innerHTML = `<p id="expense-list"> 
                        <span class=${obj.expense}> ${obj.expense} -</span> 
                        <span class=${obj.discription}> ${obj.discription} -</span>
                        <span class=${obj.category}> ${obj.category} </span>
                    </p>`;

        li.append(addRemove());
        li.append(addEdit());

        ul.append(li);
    }
}

getUsersFromLocalStorage();

ul.addEventListener('click', (e) => {
    e.preventDefault();

    if(e.target.classList.contains('delete-expence')) {
        let expense = e.target.parentElement;

        let edisIs = document.querySelectorAll('.edit-expense');
        
        for(let i = 0; i < edisIs.length; i++) {
            edisIs[i].disabled = false;
        }

        ul.removeChild(expense);
        localStorage.removeItem(expense.children[0].children[2].classList[0]);
    }

    if(e.target.classList.contains('edit-expense')) {
        let expense = e.target.parentElement;
        let edisIs = document.querySelectorAll('.edit-expense');
        
        for(let i = 0; i < edisIs.length; i++) {
            edisIs[i].disabled = true;
        }

        const addExpense = document.querySelector('.see') || document.querySelector('.edit');
        category.disabled = true;

        addExpense.classList.remove('see');
        addExpense.classList.add('edit');

        addExpense.id = expense.children[0].children[2].classList[0];
        addExpense.textContent = 'Update It';

        let isId = document.getElementsByClassName('edit')[0].id;
        let obj = JSON.parse(localStorage.getItem(isId));

        input.value = obj.expense;
        searchInput.value = obj.discription;
        category.value = obj.category;
    }
});