const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        published: {
            type: Boolean,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        created_by: {
            type: ObjectId,
            ref: 'User',
        },
        updated_by: {
            type: ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

module.exports = mongoose.model('Products', ProductSchema);
