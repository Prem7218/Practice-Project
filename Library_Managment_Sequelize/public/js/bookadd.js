
const username = document.getElementById('book-name');
const author = document.getElementById('book-author');
const image1 = document.getElementById('book-image-file');
const image2 = document.getElementById('book-image-url');

const submit = document.getElementById('submitBtn');
const list = document.getElementById('book-list');

const host = 'http://localhost:3000/library/addbooks'; 

submit.addEventListener('click', async (e) => {
    e.preventDefault();

    if(
        !username.value.trim() || 
        !author.value.trim()
    ) {
        return ;
    }

    const book = {
        name: username.value.trim(),
        author: author.value.trim(),
    }

    try {
        await axios.post(host, book);

    } catch(error) {
        console.log(error);
    }
});