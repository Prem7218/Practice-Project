// Write your code below:

const ul_list = document.querySelector('.fruits');
const main_heading = document.querySelector('#main-heading');

const heading = document.createElement('h3');
heading.textContent = 'Buy high quality organic fruits online';

main_heading.after(heading);
heading.style.fontStyle = 'italic';

const paragraph = document.createElement('p');
paragraph.textContent = 'Total fruits: 4';
paragraph.id = 'fruits-total';

ul_list.before(paragraph);

