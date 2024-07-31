const mongoose = require('mongoose');
const { cartSchema } = require('../validations/cart');
const Cart = mongoose.model('Cart');

exports.getCartFromUser = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.session.user_id });
        console.log('cart-user', cart)
        res.status(200).send(cart);
    } catch (error) {
        return res.status(400).send(error);
    }
}

exports.getCartById = async (req, res, next) => {
    try {
        const cart = await Cart.findById(req.params.id);
        res.status(200).send(cart);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.updateCart = async (req, res, next) => {
    try {
        let { error } = cartSchema.validate(req.body);
        if (error) {
            console.error(error);
            return res.status(400).json(error);
        }
        await Cart.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({ message: "Added to Cart" });
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.createCart = async (req, res, next) => {
    let { error } = cartSchema.validate(req.body);
    if (error) {
        console.error(error);
        return res.status(400).json(error);
    }
    try {
        const cart = new Cart(req.body);
        await cart.save();
        res.status(200).send({ message: "Added to Cart" });
    } catch (error) {
        return res.send(error);
    }
}