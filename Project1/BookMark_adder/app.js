
const webName = document.getElementById('web');
const webLink = document.getElementById('link');
const ul = document.getElementById('output');
const bk = document.getElementById('bkWeb');
let id = null;

const API_URL = 'https://crudcrud.com/api';
const code = '70cc1ec6ddc24709ac246d9437d31b18';
const end_point = 'bookmark';

function createList() {
    const li = document.createElement('li');
    li.classList.add('web-link');

    return li;
}

function addBtn(check) {
    const btn = document.createElement('button');
    btn.classList.add(check);
    btn.textContent = check === 'delete-bookmark' ? 'DELETE' : 'EDIT';

    return btn;
}

async function handleFormSubmit(event) {
    event.preventDefault();

    const isEdit = document.getElementsByClassName('edit-bookmark');
    let check = isEdit[0]?.disabled === true;
    console.log(check);

    const web = {
        site: webName.value,
        link: webLink.value
    }

    if(!check) {
        await axios.post(`${API_URL}/${code}/${end_point}`, web);
    }
    else {

        for(let edit of isEdit) {
            edit.disabled = false;
        }

        await axios.put(`${API_URL}/${code}/${end_point}/${id}`, web);
        id=null;
        bk.textContent= 'Bookmark Website';
    }
}

window.addEventListener('DOMContentLoaded', async (e) => {

    const resp = await axios.get(`${API_URL}/${code}/${end_point}`);

    if(resp.data.length === 0) return;

    for(let item of resp.data) {

        const { site, link, _id } = item;

        const li = createList();
        const htmlTemplate = `<p id="${_id}"><span class="${site}">${site}</span> - <a href="${link}" class="${link}" target="_blank" rel="noopener noreferrer">${link}</a></p>`;
        li.innerHTML = htmlTemplate;

        li.append(addBtn('delete-bookmark'));
        li.append(addBtn('edit-bookmark'));

        ul.append(li);
    }
});

ul.addEventListener('click', async (event) => {

    if(event.target.classList.contains('edit-bookmark')) {
        let parentId = event.target.parentElement.querySelector('p').id;
        const isEdit = document.getElementsByClassName('edit-bookmark');
        const resp = await axios.get(`${API_URL}/${code}/${end_point}/${parentId}`);
        
        for(let edit of isEdit) {
            edit.disabled = true;
        }

        webName.value = resp.data.site;
        webLink.value = resp.data.link;
        id=parentId;
        bk.textContent= 'Update';
    }

    if(event.target.classList.contains('delete-bookmark')) {
        let parentId = event.target.parentElement.querySelector('p').id;
        await axios.delete(`${API_URL}/${code}/${end_point}/${parentId}`);
    }
});