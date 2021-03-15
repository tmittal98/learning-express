const express = require('express')
const app = express() //app is an object which supports many methods
const path = require('path');//path module in node.js is used to generate proper path
const ErrorHandler = require('./errors/ErrorHandler');
//process.env is a node.js function to check environment variables 
const PORT = process.env.PORT || 3000;
const mainRouter = require('./route/index');
const productsRouter = require('./route/products')

// const apiKeyMiddleware = require('./middlewares/apiKey')
//Template engine
//to make site dynamic template engine is used express has very good apis to handle template engine

//we have to tell express that we will use ejs as view engine
app.set('view engine', 'ejs')

// console.log(app.get('views'));


//all the static files slike css , static js files are in public folder
//it can be empty also there is no issue
app.use(express.static('public'))

//this middleware is used so that express can handle client's json request here the form is send using a ajax request and not normal conventional form request
app.use(express.json())

//this middleware is used when data is sent from the form in a classical way the action attribute is used and the page reloads when submit button is clicked 
// app.use(express.urlencoded({extended:false}));

app.use(productsRouter)
//if we use the middleware here it is called global middleware
// app.use(apiKeyMiddleware)
app.use(mainRouter)
//if we want to use prefix like localhost:3000/en/ or localhost:3000/en/about
//then we have to use
// app.use('/en',mainRouter)

//we can call it global middleware
app.use((req, res, next) => {
    return res.json({ message: 'page not found' })
});

//error handling middleware
app.use((err, req, res, next) => {

    if (err instanceof ErrorHandler) {
        res.status(err.status).json({
            error: {
                message: err.message,
                status: err.status
            }
        })
    }
    else {
        res.status(500).json({
            error: {
                message: err.message,
                status: err.status
            }
        })
    }
    console.log('error: ', err.message);
    // next();
})

app.listen(PORT, () => console.log('Listening on port ' + PORT))


