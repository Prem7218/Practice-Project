
const unList = document.querySelector(".fruits");
const list = document.querySelectorAll(".fruits li");
const form = document.querySelector("form");

function addRemove() {
    let remove = document.createElement('button');

    remove.classList.add('delete-btn');
    remove.style.backgroundColor = 'lightred';
    remove.textContent = 'x';

    return remove;
}

function addEdit() {
    let edit = document.createElement('button');

    edit.classList.add('edit-btn');
    edit.style.backgroundColor = 'lightblue';
    edit.textContent = 'Edit';

    return edit;
}

for (let li = 0; li < list.length; li++) {
    list[li].append(addEdit());
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let input = document.querySelector('#fruit-to-add');

    let li = document.createElement('li');
    li.classList.add('fruit');

    li.textContent = input.value;
    
    li.append(addRemove());
    li.append(addEdit());
    
    unList.append(li);
});

unList.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.classList.contains('delete-btn')) {
        let fruit = e.target.parentElement;
        unList.removeChild(fruit);
    }
});