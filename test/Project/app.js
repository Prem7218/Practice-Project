
const webName = document.getElementById('web');
const webLink = document.getElementById('link');
const bookmark= document.getElementById('bookmark');
const ul = document.getElementById('ul');
let id = null;

const API_URL = `https://crudcrud.com/api`;
const code    = '';
const end_point = 'bookURL';

function addBtn(check) {
    const btn = document.createElement('button');
    btn.classList.add(check);
    btn.textContent = check === 'delete-bookmark' ? 'DELETE' : 'EDIT';

    return btn;
}

function createList() {
    const li = document.createElement('li');
    li.classList.add('bookmark-list');

    return li;
}

window.addEventListener('DOMContentLoaded', async () => {

    const resp = await axios.get(`${API_URL}/${code}/${end_point}`);
    for(let item of resp.data) {
        const { name, link, _id } = item;

        const li = createList();
        const htmlTemplate = `
            <p id=${_id}>
                <span class=${name}>${name}</span> - 
                <a herf="${link}" class="${link}" target="_blank" rel="noopener noreferrer">${link}</a> 
            </p>
        `;

        li.innerHTML = htmlTemplate;
        li.append(addBtn('delete-bookmark'));
        li.append(addBtn('edit-bookmark'));

        ul.append(li);
    }
});

async function handleFormSubmit(e) {
    e.preventDefault();

    const check = document.getElementsByClassName('edit-bookmark')[0]?.disabled === true;

    const website = {
        name: webName.value,
        link: webLink.value
    }

    if(!check) {
        await axios.post(`${API_URL}/${code}/${end_point}`, website);
    }
    else {
        const books = document.getElementsByClassName('edit-bookmark');
        id = null;

        await axios.put(`${API_URL}/${code}/${end_point}/${id}`, website);
        bookmark.textContent = '+ Save Bookmark';

        for(let mark of books) {
            mark.disabled = false;
        }

        webName.value = '';
        webLink.value = '';
    }
}

ul.addEventListener('click', async (event) => {

    if(event.target.classList.contains('delete-bookmark')) {
        const parentId = event.target.parentElement.querySelector('p').id;
        await axios.delete(`${API_URL}/${code}/${end_point}/${parentId}`);
    }
    
    if(event.target.classList.contains('edit-bookmark')) {
        const parentId = event.target.parentElement.querySelector('p').id;
        const resp = await axios.get(`${API_URL}/${code}/${end_point}/${parentId}`);
        const { name, link } = resp.data;
        id = parentId;

        webName.value = name;
        webLink.value = link;

        const books = document.getElementsByClassName('edit-bookmark');

        for(let mark of books) {
            mark.disabled = true;
        }

        bookmark.textContent = 'Update Bookmark';
    }
});