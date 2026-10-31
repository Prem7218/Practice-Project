
const products = [];

const allProducts = (req, res) => {
    return res.status(200).json({
        message: `Fetching all products`,
        totalproducts: products.length,
        products
    });
}

const productById = (req, res) => {
    const productId = Number(req.params.id);

    const product = products.find(product => product.id === productId);

    if(!product) {
        return res.status(404).send({
            message: 'Product not found'
        })
    }

    return res.status(200).json({
        message: `Fetching product with ID: ${productId}`,
        product
    });
}

const postProduct = (req, res) => {
    const { name } = req.body;

    if(typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({
            message: 'Please fill name correctly!'
        });
    }

    const product = {
        id: products.length + 1,
        name: name.trim()
    }

    products.push(user);

    return res.status(201).json({
        message: 'Adding a new product',
        product
    });
}

module.exports = {
    allProducts,
    productById,
    postProduct
}