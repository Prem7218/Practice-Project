
const form = document.getElementById('appointment-form');
const ul = document.getElementById('ul');
let id = null;

const username = document.getElementById('name');
const email = document.getElementById('email');
const number = document.getElementById('phone');

const submitBtn = document.getElementById('submitBtn');
const message = document.getElementById('form-message');

const API_URL = `http://localhost:3000`;
const end_point = '/appointment';

function addBtn(check) {
    const btn = document.createElement('button');
    btn.classList.add(check);
    btn.textContent = check === "delete-appointment" ? "DELETE" : "UPDATE"
    btn.style.backgroundColor = check === 'delete-appointment' ? 'red' : 'blue';
    btn.type = 'button';
    btn.style.marginBottom = '5px';
    btn.style.marginLeft = '5px';
    btn.style.marginRight = '5px';

    return btn;
}

function createList() {
    const li = document.createElement('li');
    li.classList.add('appointment-list');

    return li;
}

function justSomeTime() {
    setTimeout(() => {
        message.textContent = '';
    }, 5000);
}

async function loadAppointments() {
    try {
        ul.innerHTML = '';

        const result = await axios.get(`${API_URL}${end_point}/all`);
        console.log(result.data.data[0]);
            
        for(let item of result?.data?.data) {

            const { name, email, number, id } = item;

            const li = createList();
            li.innerHTML = `
                <p id=${id}>
                    <span class=${name}>${name} - </span>
                    <span class=${email}>${email} - </span>
                    <span class=${number}>${number} : </span>
                </p>
            `;

            li.append(addBtn("delete-appointment"));
            li.append(addBtn("edit-appointment"));

            ul.append(li);
        }
    } catch (error) {
        console.error('Unable to load appointments:', error);
    }
}

window.addEventListener('DOMContentLoaded',async () => {
    
    submitBtn.disabled = true;

    try {
        await loadAppointments();
    } catch(error) {
        console.log(error);
    } finally {
        submitBtn.disabled = false;
    }
});

form.addEventListener('click',async (e) => {
    e.preventDefault();

    if(e.target.id === 'submitBtn') {
        try {
            submitBtn.disabled = true;

            const appointmentData = { 
                name: username.value,
                email: email.value,
                number: number.value
            }

            if(!id) {
                await axios.post(`${API_URL}${end_point}`, appointmentData);
                message.textContent = 'Appointment created successfully!';
                justSomeTime();

                await loadAppointments();

            }
            else {
                await axios.put(`${API_URL}${end_point}/${id}`, appointmentData);
                
                message.textContent = 'Appointment updated successfully!';
                justSomeTime();

                id = null;
                submitBtn.classList.remove('idAdded');
                submitBtn.textContent = 'Submit appointment';

                ul.querySelectorAll('.edit-appointment').forEach(
                    edit => edit.disabled = false
                );

                ul.querySelectorAll('.delete-appointment').forEach(
                    del => del.disabled = false
                );

                await loadAppointments();
            }

        } catch(error) {
            console.log(error);
        } finally {
            submitBtn.disabled = false;
            form.reset();
        }
    }
});

ul.addEventListener('click',async (e) => {
    e.preventDefault();

    if(e.target.classList.contains('delete-appointment')) {

        try {
            const appointmentId = e.target.parentElement.querySelector('p').id;

            await axios.delete(`${API_URL}${end_point}/${appointmentId}`);

            message.textContent = `Appointment With ${appointmentId} deleting...`;

            justSomeTime();
            await loadAppointments();
            
        } catch (error) {
            console.error(error);
        }
    }

    if(e.target.classList.contains('edit-appointment')) {

        try {
            const appointmentId = e.target.parentElement.querySelector('p').id;
            
            const data = await axios.get(`${API_URL}${end_point}/${appointmentId}`);

            const {
                name: appointmentName,
                email: appointmentEmail,
                number: appointmentNumber
            } = data.data.data;

            // Populate input fields
            username.value = appointmentName;
            email.value = appointmentEmail;
            number.value = appointmentNumber;

            // Disable other Edit and Delete buttons
            const edits = ul.querySelectorAll('.edit-appointment');
            const deleted = ul.querySelectorAll('.delete-appointment');

            edits.forEach(edit => edit.disabled = true);
            deleted.forEach(del => del.disabled = true);

            id = appointmentId;
            
            submitBtn.classList.add('idAdded');
            submitBtn.textContent = 'Update Appointment';

        } catch (error) {
            console.error(error);
        }
    }
})