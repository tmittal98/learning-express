const express = require('express')
const app = express() //app is an object which supports many methods
const path = require('path')//path module in node.js is used to generate proper path

//process.env is a node.js function to check environment variables 
const PORT = process.env.PORT || 3000;

//Template engine
//to make site dynamic template engine is used express has very good apis to handle template engine

//we have to tell express that we will use ejs as view engine
app.set('view engine', 'ejs')

console.log(app.get('views'));


//all the static files slike css , static js files are in public folder
//it can be empty also there is no issue
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'My Home Page'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'My About Page'
    })
})

app.get('/download', (req, res) => {
    res.download(path.resolve(__dirname) + '/views/about.ejs')
})


app.listen(PORT, () => console.log('Listening on port ' + PORT))


