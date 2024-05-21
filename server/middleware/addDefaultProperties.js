
// Define middleware to add default properties before saving any document
const addDefaultProperties = function (schema) {
    schema.add({
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        isDeleted: { type: Boolean, default: false },
    });

    // Pre-save middleware to update `updatedAt` before saving
    schema.pre('save', function (next) {
        this.updatedAt = new Date().toISOString();
        next();
    });
};

module.exports = { addDefaultProperties };