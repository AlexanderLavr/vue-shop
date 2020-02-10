import Product from '../../models/models.products';

export default class ProductController {
    async getAll(req, res) {
        try {
            const product = await Product.find();
            res.status(200).send({
                success: true,
                data: product
            });
        }catch(err) {
            res.status(500).send({
                success: false
            });
        }
    }

    async saveProduct(req, res) {
        const { type, title, description, image, price, amount, isFavorite } = req.body;
        const newProduct = new Product({
            _id: null,
            type,
            title,
            description,
            image,
            price,
            amount,
            isFavorite
        })

        try {
            let matchProduct = await Product.findOne({ title: title });
            if (!matchProduct) {
                await newProduct.save();
            }else return res.status(401).send({
                success: false,
                message: 'This product exists!'
            });
        
            res.status(201).send({
                success: true
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString(),
            });
        }
    }

    async update(req, res) {
        const id = req.params.id;
        try {
            let getProduct = await Product.findOne({ _id: id });
            await Product.findByIdAndUpdate( id,
                {
                  $set: { isFavorite: !getProduct.isFavorite}
                }, { new: true } 
            );
            res.status(200).send({
                success: true
            });
        } catch(err) {
            res.status(500).send({
                success: false,
                message: err.toString(),
            });
        }
    }
}