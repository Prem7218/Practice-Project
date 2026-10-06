
const headerDiv = document.getElementById('header');
const heading = document.getElementById('main-heading');
const basketHead = document.getElementById('basket-heading');
const thanksDiv = document.getElementById('thanks');
heading.textContent = 'Fruit World';
heading.style.color = 'orange';
headerDiv.style.backgroundColor = 'green';
headerDiv.style.borderBottom = '2px solid orange';
basketHead.style.color = 'green';

const paragraph = document.createElement('p');
paragraph.textContent = 'Please visit us again';

thanksDiv.append(paragraph);
