const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router();

const Images = require('../models/Images')

router.get('/', async(req, res) => {
    const images = await Images.find()
    res.render('index', {images})
    
})

router.get('/about', (req, res)=>{
    res.send('sobre')
})

router.get('/upload', (req, res)=>{
    res.render('upload')
})
router.get('/profile/:id', async (req, res)=>{
    const  {id} = req.params
    const image = await Images.findById(id)
    console.log(image)
    res.render('profile', {image})
})

router.post('/update/:id', async(req, res)=>{
    const {id} = req.params
    const image = await Images.findByIdAndUpdate(id, req.body) 
    console.log(image)
    res.redirect('/')
})

router.get('/profile/delete/:id', async(req, res)=>{
         const {id} = req.params
         const image = await Images.findByIdAndDelete(id)
         const filePath = path.resolve('./src/public/' + image.path)
         fs.unlinkSync(filePath)    
         res.redirect('/')
})

router.post('/upload', async(req, res)=>{
    const image = new Images
    image.title = req.body.title,
    image.description = req.body.description,
    image.originalname = req.file.originalname, 
    image.path = '/upload/img/'+req.file.filename,
    image.destination = req.file.destination, 
    image.filename = req.file.filename,   
    await image.save()
    await res.redirect('/')
})

module.exports = router