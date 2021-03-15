const router = require('express').Router()
const apikey = require('../middlewares/apiKey')
const apiKeyMiddleware = require('../middlewares/apiKey')

//if we want to apply the middleware to all routes then we have to use a middleware which we 
//call router level middleware

// router.use(apiKeyMiddleware)

router.get('/', (req, res) => {
    res.render('index', {
        title: 'My Home Page'
    })
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'My About Page'
    })
})

router.get('/download', (req, res) => {
    res.download(path.resolve(__dirname) + '/views/about.ejs')
})

// router.get('/api/products', apiKeyMiddleware, (req, res) => {
//     res.json([
//         {
//             id: '123',
//             name: 'Chrome'
//         },
//         {
//             id: '124',
//             name: 'Firefox'
//         }
//     ])
// })
module.exports = router