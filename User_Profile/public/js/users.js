
const form = document.querySelector(
    'form:not(.search-form)'
);

const searchForm = document.querySelector('.search-form');
const searchInput = document.getElementById('search');

const API_URL = 'http://localhost:3000';
const end_point = '/users';

async function loadData() {

    try {
        const resp = await axios.get(`${API_URL}${end_point}/play`);
        const data = resp.data.data;

        console.log(data);

    } catch(err) {
        console.log(err);
    }
}

window.addEventListener('DOMContentLoaded', loadData);

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = searchInput.value.trim();

    if (!name) {
        return;
    }

    try {
        const response = await axios.get(
            `${API_URL}${end_point}/${encodeURIComponent(name)}`
        );

        console.log(response.data);

    } catch (error) {
        console.log(
            error.response?.data || error.message
        );
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const player = {};

    form.querySelectorAll('input, textarea').forEach(input => {
        player[input.name] = input.value;
    }); 
    
    try {
        const resp = await axios.post(`${API_URL}${end_point}`, player);
        console.log(resp.data);
    }
    catch(error) {
        console.log(error);
    }
});

