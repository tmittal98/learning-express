const router = require('express').Router()

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

module.exports = router