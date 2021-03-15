const productsRouter = require('express').Router()
const ErrorHandler = require('../errors/ErrorHandler');
const apikeyMiddleware = require('../middlewares/apiKey');
let products = require('../productData')

//the /products route is fro display
productsRouter.get('/products', (req, res) => {
    res.render('products', {
        title: 'My Products Page'
    })
})

productsRouter.get('/api/products', (req, res) => {
    res.json(products);
})

productsRouter.post('/api/products', apikeyMiddleware, (req, res, next) => {
    //we can also get next in route not only in middleware

    // try {
    //     console.log(city);
    // }
    // catch (err) {
    //     next(ErrorHandler.serverError(err.message));
    // }

    //this is called destructuring it was introduced in es6 version
    const { name, price } = req.body;

    if (!name || !price) {
        //basic validation 
        //return res.status(422).json({ error: "All fields are required." });
        //throw new Error('All fields are required');
        next(ErrorHandler.validationError("both name and price fields required"));
    }
    const product = {
        name,
        price,
        id: new Date().getTime().toString()
    };

    products.push(product);
    res.json(product);

    // console.log(req.body);//this is coming undefined because from client we are sneding json data but express by default do not accept json data we will have to apply middleware then only we can recieve json data
    res.json();
});

//dynamic parameter after : 
//req.params is the dynamic parameter
productsRouter.delete('/api/products/:productId', (req, res) => {
    //we are overwriting the array
    //req.params is a object
    products = products.filter((product) => req.params.productId !== product.id);
    res.json({ status: 'OK' });
})
module.exports = productsRouter