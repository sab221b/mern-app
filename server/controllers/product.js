const mongoose = require('mongoose');
const { productSchema } = require('../validations/product');
const Product = mongoose.model('Product');

exports.getProducts = async (req, res, next) => {
    try {
        let products = await Product.find(req.query);
        res.status(200).send(products);
    } catch (error) {
        return res.status(400).send(error);
    }
}

exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        let { error } = productSchema.validate(req.body);
        if (error) {
            console.error(error);
            return res.status(400).json(error);
        }
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send(updatedProduct);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.createProduct = async (req, res, next) => {
    let { error } = productSchema.validate(req.body);
    if (error) {
        console.error(error);
        return res.status(400).json(error);
    }
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(200).send(savedProduct);
    } catch (error) {
        return res.send(error);
    }
}