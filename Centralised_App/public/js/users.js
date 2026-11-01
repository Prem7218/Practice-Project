
const username = document.getElementById('username');
const submitBtn = document.getElementById('submitBtn');

const API_URL = 'http://localhost:3000';
const end_point = '/users'

async function handleFormSubmit(e) {
    e.preventDefault();

    const userData = { 
        name: username.value.trim() 
    }

    if(!userData.name) {
        alert('Please enter username');
        return ;
    }

    try {
        submitBtn.disabled = true;

        const resp = await axios.post(`${API_URL}${end_point}`, userData);
        console.log(resp.data);

        alert('User added successfully!');
        e.target.reset();

    } catch (error) {
        console.error(
            error.response?.data || error.message
        );

    } finally {
        submitBtn.disabled = false;
    }
}