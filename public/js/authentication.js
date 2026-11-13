
const form = document.getElementById('form');
const signupTab = document.getElementById('signup-tab');
const signinTab = document.getElementById('signin-tab');
const nameField = document.getElementById('name');
const email = document.getElementById('email');
const phoneField = document.getElementById('phone');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const title = document.getElementById('form-title');
const intro = document.getElementById('form-intro');
const submitButton = document.getElementById('submit-button');
const output = document.getElementById('output');

const host = 'http://localhost:5000/auth';

form.addEventListener('submit',async (e) => {
    e.preventDefault();

    submitButton.disabled = true;
    let resp = null;

    try {

        if(submitButton.textContent == 'Create account') {

            const user = {
                name: nameField.value.trim(),
                email: email.value.trim(),
                phone: phoneField.value.trim()
            }

            resp = await axios.post(host, user);
        }
        else {
            resp = await axios.get(host, {
                params: {
                    email: email.value.trim()
                }
            });
        }

        output.innerText = resp.data?.message;

    } catch(error) {
        console.log(error);
        output.innerText = error.message;
    }
    finally {
        submitButton.disabled = false;
        
        setTimeout(() => {
            output.textContent = '';
        }, 5000);
    }
});

function setMode(signingUp) {
    nameField.hidden = !signingUp;
    phoneField.hidden = !signingUp;
    nameInput.required = signingUp;
    phoneInput.required = signingUp;
    signupTab.setAttribute('aria-pressed', String(signingUp));
    signinTab.setAttribute('aria-pressed', String(!signingUp));
    title.textContent = signingUp ? 'Create your account' : 'Welcome back';
    intro.textContent = signingUp
        ? 'Enter your details to get started.'
        : 'Enter your email address to sign in.';
    submitButton.textContent = signingUp ? 'Create account' : 'Sign in';
}

signupTab.addEventListener('click', () => setMode(true));
signinTab.addEventListener('click', () => setMode(false));