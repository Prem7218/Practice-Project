// Write your code below:
const list = document.querySelectorAll('ul li');

for (let val of list) {

    val.textContent === 'Mango'
        && (val.style.color = 'red');

    val.style.fontStyle = 'italic';
}