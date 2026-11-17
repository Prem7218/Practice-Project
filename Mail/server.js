require('dotenv').config();

const Sib = require('sib-api-v3-sdk');

const client = Sib.ApiClient.instance;

const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY;

const tranEmailApi = new Sib.TransactionalEmailsApi();

const sender = {
    email: 'premradheshyammahajan@gmail.com',
    name: 'CodeWheelr India'
}

const receivers = [
    {
        email: 'earthstitan@gmail.com',
        name: 'CodeWheelr India'
    }
]

tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: 'Subscribe to CodeWheelr India',
        textContent: `Welcome to CodeWheelr India`
    })
    .then((response) => {
    console.log('Email sent successfully:', response);
})
.catch((error) => {
    console.error('Email sending failed:', error.response?.body || error);
});