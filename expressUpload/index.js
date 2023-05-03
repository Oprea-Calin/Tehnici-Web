const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const fileUpload = require('express-fileupload')
const path = require('path')
const app = express()
app.use(fileUpload())
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

//routes
app.get('/', (req, res) => res.render('upload'))
app.post('/uploads', function(req, res) {
    const file = req.files.upload
    const filePath = path.join(__dirname, 'public', 'images', `${file.name}`)
  
    file.mv(filePath, err => {
        if (err) return res.status(500).send(err)
        res.redirect('/')
    })
  })

app.listen(3000)