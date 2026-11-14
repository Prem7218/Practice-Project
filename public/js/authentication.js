
const host = 'http://localhost:5000/auth';
const form = document.getElementById('form');

const title = document.getElementById('form-title');
const intro = document.getElementById('form-intro');

const signupTab = document.getElementById('signup-tab');
const signinTab = document.getElementById('signin-tab');

const username = document.getElementById('name');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const password = document.getElementById('password');

const nameField = document.getElementById('name-field');
const phoneField = document.getElementById('phone-field');

const output = document.getElementById('output');
const submitButton = document.getElementById('submit-button');

form.addEventListener('submit',async (e) => {
    e.preventDefault();

    submitButton.disabled = true;
    let resp = null;

    try {

        if(submitButton.textContent == 'Create account') {

            const user = {
                name: username.value.trim(),
                email: email.value.trim(),
                phone: phone.value.trim(),
                password: password.value.trim()
            }

            resp = await axios.post(host, user);
        }
        else {
            resp = await axios.get(host, {
                params: {
                    email: email.value.trim(),
                    password: password.value.trim()
                }
            });
        }

        output.innerText = resp.data?.message;
        console.log('Resp: ', resp.data.data.userId);

    } catch(error) {
        console.log(error);
        output.innerText = error.message;
    }
    finally {
        submitButton.disabled = false;
        
        setTimeout(() => {
            output.textContent = '';
        }, 5000);

        if(
            resp.status === 200 ||
            resp.status === 201
        ) {
            sessionStorage.setItem("user", resp.data.data.userId);
            window.location.href = 'http://localhost:5000/expense';
        }
    }
});

function setMode(signingUp) {
    username.hidden = !signingUp;
    phone.hidden = !signingUp;

    username.required = signingUp;
    phone.required = signingUp;

    nameField.hidden = !signingUp;
    phoneField.hidden = !signingUp;

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

setMode(false);