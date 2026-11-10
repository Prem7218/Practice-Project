
const http = require('http');
const express = require('express');
const db = require('./practiceDB');
const app = express();
const PORT = 4000;

app.use(express.static(__dirname));
app.use(express.json());

// const server = http.createServer((req, res) => {
//     console.log('Server is created');

//     res.setHeader('Content-Type', 'text/html');

//     if(req.url === '/') {
//         res.end('<h1>Welcome</h1>');
//     }
//     else if(req.url === '/home') {
//         res.end('<h1>Welcome home');
//     }
//     else if(req.url === '/about') {
//         res.end('<h1>Welcome to about us</h1>');
//     }
//     else if(req.url === '/node') {
//         res.end('<h1>Welcome to my node js project</h1>');
//     }
//     else {
//         res.end('<h1>Page not found!</h1>');
//     }
// });

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

// // 1. Custom Middleware Function
// const welcomeMiddleware = (req, res, next) => {
//     req.user = "Guest";
//     next();
// }

// // 2. Route Handler
// const welcomeHandler = (req, res) => {
//     res.writeHead(200, {
//         'Content-Type': 'text/html'
//     });

//     res.end(`<h1>Welcome, ${req.user}!</h1>`);
// }

// const server = http.createServer((req, res) => {

//     if(req.url === '/welcome' && req.method === 'GET') {
//         welcomeMiddleware(req, res, () => {
//             welcomeHandler(req, res);
//         });
//     }
//     else {
//         res.writeHead(404, {
//             'Content-Type': 'text/html'
//         });
//     }
// });

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

// let items = {
//     users: [
//         { id: 1, name: 'demo-user - 1'}
//     ],
//     orders: [
//         { id: 1, name: 'demo-order - 1'}
//     ],
// }

// app.use((req, res, next) => {
//     console.log("Authentication Middleware...");
//     next();
// });

// app.get('/orders', (req, res) => {

//     console.log('Here is the list of all orders.');

//     res.status(200).json({
//         status: true,
//         data: items.orders
//     });
// });

// app.post('/orders', (req, res) => {
//     console.log('A new order has been created.');

//     const value = items.orders.length + 1;

//     const newOrder = {
//         id: value,
//         name: `Order: ${value}`
//     };

//     items.orders.push(newOrder);

//     res.status(201).json({
//         status: true,
//         message: `New order created!`,
//         data: newOrder
//     });
// });

// app.get('/users', (req, res) => {

//     console.log('Here is the list of all users.');

//     res.status(200).json({
//         status: true,
//         data: items.users
//     });;
// });

// app.post('/users', (req, res) => {
//     console.log('A new user has been created.');

//     const value = items.users.length + 1;

//     const newUser = { 
//         id: value, 
//         name: `User: ${value}` 
//     }

//     items.users.push(newUser);

//     res.status(201).json({
//         status: true,
//         message: `New user created!`
//     });
// });

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

// let products = [];
// let categorie = [];

// app.use((req, res, next) => {
//     console.log('Authentication Middleware...');
//     next();
// });

// app.get('/products', (req, res) => {
//     res.status(200).json({
//         status: true,
//         message: 'Here are all products!',
//         data: products
//     })
// });

// app.post('/products', (req, res) => {

//     const value = products.length + 1;

//     const newProduct = {
//         id: value,
//         name: `Product - ${value}`
//     }

//     products.push(newProduct);

//     res.status(201).json({
//         status: true,
//         message: 'A new product created!',
//         data: newProduct
//     });
// });

// app.get('/categories', (req, res) => {
//     res.status(200).json({
//         status: true,
//         message: 'Here are all categories !',
//         data: categorie
//     })
// });

// app.post('/categories', (req, res) => {

//     const value = categorie.length + 1;

//     const newCategories  = {
//         id: value,
//         name: `Categories  - ${value}`
//     }

//     categorie.push(newCategories);

//     res.status(201).json({
//         status: true,
//         message: 'A new categorie created!',
//         data: newCategories 
//     });
// });

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

// app.use((req, res, next) => {
//     console.log("Authentication Middleware...");
//     next();
// });

// app.get("/welcome/:username", (req, res) => {
//     const { username } = req.params;
//     const { role } = req.query;
//     const { living } = req.body || {};

//     res.status(200).json({
//         status: true,
//         message: `Username: ${username}, role: ${role} - living: ${living}`
//     });
// });

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

// let products = [];
// let categorie = [];

// app.use((req, res, next) => {
//     console.log(`method: ${req.method}, url: ${req.url}`);
//     next();
// });

// app.get('/products', (req, res) => {
//     res.status(200).json({
//         status: true,
//         message: 'Here are all products!',
//         data: products
//     })
// });

// app.post('/products', (req, res) => {

//     const value = products.length + 1;

//     const newProduct = {
//         id: value,
//         name: `Product - ${value}`
//     }

//     products.push(newProduct);

//     res.status(201).json({
//         status: true,
//         message: 'A new product created!',
//         data: newProduct
//     });
// });

// app.get('/categories', (req, res) => {
//     res.status(200).json({
//         status: true,
//         message: 'Here are all categories !',
//         data: categorie
//     })
// });

// app.post('/categories', (req, res) => {

//     const value = categorie.length + 1;

//     const newCategories  = {
//         id: value,
//         name: `Categories  - ${value}`
//     }

//     categorie.push(newCategories);

//     res.status(201).json({
//         status: true,
//         message: 'A new categorie created!',
//         data: newCategories 
//     });
// });

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

// const routeRouter = require('./practiceRoute');

// app.use('/route', routeRouter);

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

// const booksRouter = require('./practiceRoute');

// app.use('/books', booksRouter);

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

// const itemsRouter = require('./practiceRoute');

// app.use('/', itemsRouter);

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

// const itemsRouter = require('./practiceRoute');

// app.use('/', itemsRouter);

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

// const productRouer = require('./practiceRoute');

// app.use('/', productRouer);

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

app.use((req, res) => {
    res.status(404).send('Page not found!');
});

app.listen(PORT, () => {
    console.log(`Server Host: http://localhost:${PORT}`);
});
