const Product = require('../models/product');

const productController = {
    // @desc    Get products with pagination, search, and date filters
    // @route   GET /products
    getProducts: async (req, res) => {
        try {
            const { page = 1, limit = 20, search, expiresIn } = req.query;
            const query = { userId: req.user._id };

            if (search) {
                query.$or = [
                    { title: { $regex: search, $options: 'i' } },
                    { upcCode: { $regex: search, $options: 'i' } }
                ];
            }

            if (expiresIn) {
                const months = parseInt(expiresIn, 10);
                const futureDate = new Date();
                futureDate.setMonth(futureDate.getMonth() + months);
                query.expiryDate = { $lte: futureDate, $gte: new Date() };
            }

            const products = await Product.find(query)
                .sort({ expiryDate: 1 })
                .limit(parseInt(limit, 10))
                .skip((parseInt(page, 10) - 1) * parseInt(limit, 10));

            const total = await Product.countDocuments(query);

            res.status(200).json({
                data: products,
                pagination: {
                    total,
                    page: parseInt(page, 10),
                    pages: Math.ceil(total / parseInt(limit, 10))
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products', error: error.message });
        }
    },

    // @desc    Create a product
    // @route   POST /products
    createProduct: async (req, res) => {
        try {
            const { title, upcCode, amount, expiryDate } = req.body;
            
            const product = await Product.create({
                userId: req.user._id,
                title,
                upcCode,
                amount,
                expiryDate
            });

            res.status(201).json(product);
        } catch (error) {
            res.status(400).json({ message: 'Failed to create product', error: error.message });
        }
    },

    // @desc    Update a product
    // @route   PUT /products/:id
    updateProduct: async (req, res) => {
        try {
            let product = await Product.findById(req.params.id);

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            if (product.userId.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(product);
        } catch (error) {
            res.status(400).json({ message: 'Failed to update product', error: error.message });
        }
    },

    // @desc    Delete a product
    // @route   DELETE /products/:id
    deleteProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            if (product.userId.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            await product.deleteOne();
            res.status(200).json({ message: 'Product deleted' });
        } catch (error) {
            res.status(400).json({ message: 'Failed to delete product', error: error.message });
        }
    }
};

module.exports = productController;
