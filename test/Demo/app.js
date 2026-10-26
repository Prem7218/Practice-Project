
const web_name = document.getElementById('website-name');
const web_link = document.getElementById('website-link');
const save = document.getElementById('save-bookmark');
const ul = document.getElementById('output');

const API_URL = `https://crudcrud.com/api`;
const code = `70cc1ec6ddc24709ac246d9437d31b18`;
const end_point = `website-mark`;
const url = `${API_URL}/${code}/${end_point}`;
let id = null;


function createList() {
    const li = document.createElement('li');
    li.classList.add('bookmark-list');

    return li;
}

function addBtn(check) {
    const btn = document.createElement('button');
    btn.classList.add(check);
    btn.textContent = check === 'delete-bookmark' ? 'DELETE' : 'EDIT';

    return btn;
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const check = document.getElementsByClassName('edit-bookmark')[0]?.disabled === true;

    console.log(check);

    const website = {
        name: web_name.value,
        site: web_link.value
    }

    if(check) {
        await axios.put(`${url}/${id}`, website);
        id = null;

        const edit_bookmark = document.getElementsByClassName('edit-bookmark');
        
        for(let list of edit_bookmark) {
            list.disabled = false;
        }

        save.textContent = '+ Save bookmark';
        web_name.value = '';
        web_link.value = '';
    }
    else {
        await axios.post(url, website);
    }
}

window.addEventListener('DOMContentLoaded', async (event) => {
    let resp = await axios.get(url);

    for(let mark of resp.data) {

        const { name, site, _id } = mark;

        const li = createList();
        li.innerHTML = `<p id=${_id}>
            <span class=${name}>${name}</span>: 
            <a href="${site}" class="${site}" target="_blank" rel="noopener noreferrer">${site}</a>
        </p>
        `

        li.append(addBtn('delete-bookmark'));
        li.append(addBtn('edit-bookmark'));
        ul.append(li);
    }
});

ul.addEventListener("click",async (e) => {

    if(e.target.classList.contains('delete-bookmark')) {
        const parentId = e.target.parentElement.querySelector('p').id;
        await axios.delete(`${url}/${parentId}`);
    }

    if(e.target.classList.contains('edit-bookmark')) {
        const parentId = e.target.parentElement.querySelector('p').id;
        const edit_bookmark = document.getElementsByClassName('edit-bookmark');
        const resp = await axios.get(`${url}/${parentId}`);

        const { name, site } = resp.data;

        web_name.value = name;
        web_link.value = site;

        for(let list of edit_bookmark) {
            list.disabled = true;
        }

        save.textContent = 'Update';
        id = parentId;
    }
});