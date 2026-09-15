let form = document.getElementsByTagName('form')[0];

let button = form.querySelector('button');

let input = document.createElement('input');
input.id = 'description';
input.type = 'text';
input.placeholder = 'Enter fruit discription';

button.before(input);

// add fruit to the cart
let fruititems = document.querySelector('.fruits');
let descriptionitems = document.querySelector('#description');

function addRemove() {
    let remove = document.createElement('button');

    remove.classList.add('delete-btn');
    remove.style.backgroundColor = 'lightred';
    remove.textContent = 'x';

    return remove;
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    let fruitName = document.querySelector('#fruit-to-add');
    let fruitDescription = descriptionitems.value;

    if (fruitDescription.trim() === '') {
        // alert('Please enter a description.');
        return;
    }
    
    const list = document.createElement('li');
    list.classList.add('fruit');

    const name = document.createElement('span');
    name.textContent = fruitName.value;

    const discription = document.createElement('p');
    discription.textContent = fruitDescription;
    discription.style.fontStyle = 'italic';

    list.append(name);
    list.append(discription);
    list.append(addRemove());

    fruititems.append(list);

    // Clear input fields
    document.getElementById('fruit-to-add').value = '';
    document.getElementById('description').value = '';
});


// delete functionality
fruititems.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-btn')) {
        let buttontodelete = event.target.parentElement;
        fruititems.removeChild(buttontodelete);
    }
});


let inputValue = document.querySelector('#filter');

inputValue.addEventListener("keyup", () => {

    let fruitItem = document.querySelectorAll('.fruits .fruit');

    let searchValue = inputValue.value.toLowerCase().trim();

    for (let fruit of fruitItem) {

        let name = fruit.querySelector('span');
        let discription = fruit.querySelector('p');

        let fruitName = name ?
            name.textContent.toLowerCase() :
            fruit.childNodes[0].textContent.toLowerCase();

        let fruitDescription = discription ?
            discription.textContent.toLowerCase() : ""; 

        if(fruitName.includes(searchValue) || fruitDescription.includes(searchValue)) {
            fruit.style.display = '';
        }
        else {
            fruit.style.display = 'none';
        }
    }
})