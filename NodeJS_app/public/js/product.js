
const name = document.getElementById('productName');
const price = document.getElementById('productPrice'); 
const submitBtn = document.getElementById('submitBtn');

const API_URL = 'http://localhost:3000';
const endpoint = '/api/products';

async function handleSubmit(e) {
    e.preventDefault();

    const productData = {
        name: name.value.trim(),
        price: parseFloat(price.value)
    };

    try {
        submitBtn.disabled = true;

        const resp = await axios.post(`${API_URL}${endpoint}`, productData);

        console.log(resp.data);
        e.target.reset();

    } catch (error) {
        console.error('Error creating product:', error);
    } finally {
        submitBtn.disabled = false;
    }
}