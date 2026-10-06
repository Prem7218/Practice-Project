// Write the code as shown in the video below:

const fruits = document.querySelectorAll('ul')[0];
const header = document.querySelector('#header');
const main_heading = document.querySelector('#main-heading');
const basket_heading = document.querySelector("#basket-heading");

fruits.style.backgroundColor = 'lightgray';
fruits.style.padding = '15px';
fruits.style.borderRadius = '5px';

header.style.borderRadius = '10px 10px 0 0';

main_heading.style.textAlign = 'right'
main_heading.style.marginRight = '20px';

basket_heading.style.color = 'brown';

for (let fruit = 0; fruit < fruits.children.length; fruit++) {

    if(fruit%2 !== 0) {
        fruits.children[fruit].style.backgroundColor = 'brown';
        fruits.children[fruit].style.color = 'white';
    }
    else {
        fruits.children[fruit].style.backgroundColor = 'white';
    }

    fruits.children[fruit].style.listStyleType = 'none';
    fruits.children[fruit].style.padding = '5px';
    fruits.children[fruit].style.margin = '5px';
    fruits.children[fruit].style.borderRadius = '3px';
}

