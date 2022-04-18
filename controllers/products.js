const e = require('express');
const express = require('express');
const Product = require('../models/product');
const productSeed = require('../models/productSeed');
const productRouter = express.Router();
// const buyButton = document.querySelector('#buy-button')

// buyButton.addEventListener("click", ()=>{
// const oldQty = product.qty
// const newQty = oldQty - 1
// })

productRouter.get('/seed', (req, res) => {
    Product.deleteMany({}, (err, deletedProducts) => {
        Product.create(productSeed, (err, data) => {
            res.redirect('/products');
        });
    });
});


//INDEX (work on css)
productRouter.get('/',(req,res)=>{
    Product.find({},(err, products)=>{
        res.render('index.ejs',{products},)
    })
})


//NEW (work on css)
productRouter.get('/new',(req,res)=>{
    res.render('new.ejs')
})

//CREATE
productRouter.post('/',(req,res)=>{
    Product.create(req.body,(err,createdProduct)=>{
        if(err){
            console.log(err)
            res.send(err)
        }else{
            res.redirect('/products')
        }
    })
})

//SHOW
productRouter.get('/:id',(req,res)=>{
    Product.findById(req.params.id,(err,product)=>{
        res.render('show.ejs',{product})
    })
})

//EDIT
productRouter.get('/:id/edit',(req,res)=>{
    Product.findById(req.params.id,(err, editProduct)=>{
        res.render('edit.ejs',{editProduct})
    })
})


//UPDATE
productRouter.put('/:id',(req,res)=>{
    req.body.price = parseFloat(req.body.price)
    req.body.qty = parseInt(req.body.qty)
    Product.findByIdAndUpdate(req.params.id, req.body, (err,updateProduct)=>{
        if (err) {
            console.log(err)
            res.send(err)
    }else{
        res.redirect(`/products/${req.params.id}`)
    }
})
})

//UPDATE AFTER BUY 
productRouter.put('/:id/:qty',(req,res)=>{
    Product.findById(req.params.id,(err, editProduct)=>{
        editProduct.qty = editProduct.qty - req.params.qty
            Product.findByIdAndUpdate(req.params.id, editProduct, (err,updateProduct)=>{
        if (err) {
            console.log(err)
            res.send(err)
    }else{
        res.redirect(`/products/${req.params.id}`)
    }
})  
})
})

//DELETE
productRouter.delete('/:id',(req,res)=>{
    Product.findByIdAndDelete(req.params.id, (err, deleteProduct)=>{
        res.redirect('/products')
    })
})

module.exports = productRouter;