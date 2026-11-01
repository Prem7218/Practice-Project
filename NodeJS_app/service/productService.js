
let products = [
    {
        id: 1,
        name: 'Product 1',
        price: 100
    },
    {
        id: 2,
        name: 'Product 2',
        price: 200
    }
];

const getAllProducts = () => {
    return products;
}

const postProducts = ({ name, price }) => {

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
    postProducts
}