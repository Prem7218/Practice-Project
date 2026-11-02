
const form = document.getElementById('form');

const studentName = document.getElementById('student-name');
const studentEmail= document.getElementById('student-email');
const studentId   = document.getElementById('student-id'); 

const submit = document.getElementById('add-student-button');
const update = document.getElementById('update-student-button');
const deleteBtn = document.getElementById('delete-student-button');

const API_URL = `http://localhost:3000`;
const end_point = '/students';

form.addEventListener('submit',async (e) => {
    e.preventDefault();

    try {
        submit.disabled = true;

        const resp = await axios.post(
            `${API_URL}${end_point}`, { 
                name: studentName.value.trim(), 
                email: studentEmail.value.trim() 
            }
        );

        console.log(resp.data);

        alert('Student added Successfully!');

        form.reset();
    }
    catch(error) {
        console.error(
            error.response?.data || error.message
        );
    } finally {
        submit.disabled = false;
    }
});

update.addEventListener('click', async () => {

    if(!studentId.value || !studentName.value.trim() || !studentEmail.value.trim()) {
        alert('Please fill all details correctly');
        return ;
    }

    if(!form.reportValidity()) return ;

    try {
        update.disabled = true;
        const resp = await axios.put(`${API_URL}${end_point}/${studentId.value}`, 
            { 
                name: studentName.value.trim(), 
                email: studentEmail.value.trim(), 
            }
        );

        console.log(resp.data);

        alert('Student updated Successfully!');

        form.reset();

    } catch(error) {
        console.error(error.response?.data || error.message);

        alert(error.response?.data?.message || 'Unable to update student');

    } finally {
        update.disabled = false;
    }
}); 

deleteBtn.addEventListener('click',async (e) => {

    if(!studentId.value || !Number.isInteger(Number(studentId.value)) || Number(studentId.value) <= 0) {
        alert('Please enter a valid student ID');
        return;
    }

    try {

        deleteBtn.disabled = true;

        const resp = await axios.delete(
            `${API_URL}${end_point}/${studentId.value}`
        );

        console.log(resp.data);

        alert('Student deleted Successfully!');

        form.reset();

        

    } catch(error) {
        console.error(error.response?.data || error.message);

        alert(error.response?.data?.message || 'Unable to delete student');

    } finally {
        deleteBtn.disabled = false;
    }
})