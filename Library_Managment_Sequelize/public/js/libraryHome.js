
const bookList = document.querySelector('.book-list');
const tableBody = document.getElementById('table-body');

const API_URL = `http://localhost:3000/library`;

let books = [];
let returnedBook = [];

// Create an HTML element with class and text
const createElement = (tag, className = '', text = '') => {
    const element = document.createElement(tag);

    if (className) {
        element.classList.add(className);
    }

    if (text) {
        element.textContent = text;
    }

    return element;
};

// Create a detail item (dt + dd)
const createDetail = (label, value) => {
    const div = createElement('div');

    const dt = createElement('dt', '', label);
    const dd = createElement('dd', '', value ?? 'N/A');

    div.append(dt, dd);

    return div;
};

const createBookCard = (book, i = 1) => {

    const article = createElement('article', 'book-card');

    // Book cover
    const cover = createElement('div', 'book-cover');
    let isclass = `cover-${i++}`;
    cover.classList.add(isclass);

    const coverText = createElement('p', 'author', book.name);
    coverText.classList.add('cover-title');
    cover.append(coverText);

    // Book information
    const info = createElement('div', 'book-info');

    const heading = createElement('h3', '', book.name);

    const author = createElement('p', 'author', book.author);

    info.append(heading, author);

    // Book details
    const details = createElement('dl', 'details');

    details.append(
        createDetail('Book Id', book.bookId),
        createDetail('Issued', book.issued),
        createDetail('Return by', book.returns),
        createDetail('Current fine', book.fine)
    );

    info.append(details);

    // Return button
    const button = createElement(
        'button',
        'return-button',
        'Return book'
    );

    button.type = 'button';
    button.id = book.bookId;

    article.append(cover, info, button);

    return article;
};

const createTableRow = (book) => {
    const tr = document.createElement('tr');

    const values = [
        book.name,
        book.author,
        `$${Number(book.fine).toFixed(2)}`,
        book.returns
    ];

    values.forEach(value => {
        const td = document.createElement('td');
        td.textContent = value;
        tr.append(td);
    });

    return tr;
};


async function loadLibrary() {

    try {
        bookList.innerHTML = '';
        tableBody.innerHTML = '';
        
        const booksList = await axios.get(API_URL);
        const returnList = await axios.get(`${API_URL}/return`);
        
        books = booksList.data.data;
        returnedBook = returnList.data.data;

        console.log(returnList);

        books.forEach((book, i) => {
            bookList.append(createBookCard(book, i + 1));
        });

        returnedBook.forEach((book) => {
            tableBody.append(createTableRow(book));
        });

    } catch(error) {
        console.log(error);
    }
}

window.addEventListener('DOMContentLoaded',async () => {
    try {

        await loadLibrary();

    } catch(error) {
        console.log(error);
    }
});

bookList.addEventListener('click',async (e) => {

    const button = e.target.closest('.return-button');
    
    if (!button) return;
    
    const bookId = Number(button.id);

    const book = books.find(
        book => book.bookId === bookId
    );

    if(!book) return ;

    try {
        const resp = await axios.post(
            `${API_URL}/return/${bookId}`
        );

        console.log('Book returned successfully!');
        console.log(resp.data);

        await loadLibrary();

    } catch(error) {
        console.log(error);
    }   
});