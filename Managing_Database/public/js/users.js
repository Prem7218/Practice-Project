
const userId = document.getElementById('userId');
const user = document.getElementById('userName');
const email = document.getElementById('email');

const next = document.getElementById('next');
const prev = document.getElementById('prev');
const submitBtn = document.getElementById('submitBtn');

const host = 'http://localhost:4000/users';

let count = 0;

function updateUI() {
    userId.hidden = (count === 0);
    user.hidden = (count === 2);
    email.hidden = (count === 2);

    console.log('count: ', count);

    switch(count) {
        case 0: 
            submitBtn.innerText = "Add User"
            break;
        
        case 1:
            submitBtn.innerText = "Update User"
            break;

        case 2: 
            submitBtn.innerText = "Delete User"
            break;
    }
}

next.addEventListener('click', (e) => {
    e.preventDefault();

    if(count < 2) {
        count++;
    }

    updateUI();
});

prev.addEventListener('click',async (e) => {
    e.preventDefault();

    if(count > 0) {
        count--;
    }

   updateUI();
});

submitBtn.addEventListener('click',async (e) => {
    e.preventDefault();

    try {
        switch(count) {
            case 0: 
                await axios.post(host, { 
                    name: user.value.trim(), 
                    email: email.value.trim() 
                });
                alert('User added successfully!');
                break;
            
            case 1: 
                await axios.put(`${host}/${userId.value}`, { 
                    userId: userId.value, 
                    name: user.value.trim(), 
                    email: email.value.trim() 
                });
                alert('User updated successfully!');
                break;

            default: 
                await axios.delete(`${host}/${userId.value}`);
                alert('User deleted successfully!');
                break;
        }
    } catch(error) {
        console.error(error);
    }
})

updateUI();