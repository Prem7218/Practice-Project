const studentName = document.getElementById('student-name');
const studentEmail= document.getElementById('student-email');
const studentId   = document.getElementById('student-id'); 

const submit = document.getElementById('add-student-button');
const update = document.getElementById('update-student-button');

const API_URL = `http://localhost:3000`;
const end_point = '/students';

async function handleFormSubmit(e) {
    e.preventDefault();

    try {
        submit.disabled = true;
        update.disabled = true;

        const resp = await axios.post(`${API_URL}${end_point}`, { name: studentName.value.trim(), email: studentEmail.value.trim() });
        console.log(resp.data);

        alert('Student added Successfully!');
        e.target.reset();

    } catch(error) {
        console.error(
            error.response?.data || error.message
        );
    } finally {
        submit.disabled = false;
        update.disabled = false;
    }
}

update.addEventListener('click',async (e) => {
    e.preventDefault();

    try {
        submit.disabled = true;
        update.disabled = true;

        const resp = await axios.put(`${API_URL}${end_point}/${studentId.value}`, { name: studentName.value.trim(), studentId: studentId.value });
        console.log(resp.data);

        alert('Student updated Successfully!');
        e.target.reset();

    } catch(error) {
        console.error(
            error.response?.data || error.message
        );
    } finally {
        submit.disabled = false;
        update.disabled = false;
    }
});