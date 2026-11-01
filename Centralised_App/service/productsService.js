
let products = [];

const getAllProducts = () => {
    return products;
}

const getProductById = (id) => {
    return products.find(product => product.id === id);
}

const postProduct = ({ name, price }) => {

    const newProduct = {
        id: products.length + 1,
        name,
        price
    }

    products.push(newProduct);
    return newProduct;
}

module.exports = {
    getAllProducts,
    getProductById,
    postProduct
}