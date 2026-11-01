
const products = [];

const allProducts = () => {
    return products;
}

const productById = (id) => {
    return products.find(product => product.id === Number(id));
}

const postProduct = (name) => {
    const product = {
        id: products.length + 1,
        name: name.trim()
    }

    products.push(product);
    return product;
}

module.exports = {
    allProducts,
    productById,
    postProduct
}