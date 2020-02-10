import mongoose from 'mongoose';
const Schema = mongoose.Schema;


export const productSchema = Schema({
    _id: Schema.Types.ObjectId,
    type: String,
    title: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    image: String,
    price: {
        type: Number,
        trim: true
    },
    amount: {
        type: Number,
        trim: true
    },
    isFavorite: Boolean
});

export default mongoose.model('product', productSchema);