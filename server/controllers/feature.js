const mongoose = require('mongoose');
const { featureSchema } = require('../validations/feature');
const Feature = mongoose.model('Feature');

exports.getFeatures = async (req, res, next) => {
    try {
        let features = await Feature.find(req.query);
        res.status(200).send(features);
    } catch (error) {
        return res.status(400).send(error);
    }
}

exports.getFeatureById = async (req, res, next) => {
    try {
        const feature = await Feature.findById(req.params.id);
        res.status(200).send(feature);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.updateFeature = async (req, res, next) => {
    try {
        let { error } = featureSchema.validate(req.body);
        if (error) {
            console.error(error);
            return res.status(400).json(error);
        }
        updatedUser = await Feature.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.createFeature = async (req, res, next) => {
    let { error } = featureSchema.validate(req.body);
    if (error) {
        console.error(error);
        return res.status(400).json(error);
    }
    try {
        const feature = new Feature(req.body);
        const savedFeature = await feature.save();
        res.status(200).send(savedFeature);
    } catch (error) {
        return res.send(error);
    }

}