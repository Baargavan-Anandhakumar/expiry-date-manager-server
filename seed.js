const mongoose = require('mongoose');
const User = require('./src/models/user');
const Product = require('./src/models/product');
require('dotenv').config();

async function seed() {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/expiry-date-manager');
    
    // Find ALL users and give them products
    const users = await User.find();
    if (users.length === 0) {
        console.log("No users found.");
        process.exit(1);
    }

    // Clear existing products to avoid duplicates during testing
    await Product.deleteMany({});

    const today = new Date();
    const productsToInsert = [];

    for (const user of users) {
        productsToInsert.push(
            {
                userId: user._id,
                title: "Premium Matcha Green Tea",
                upcCode: "012345678912",
                amount: { value: 24.99, currency: "USD" },
                expiryDate: new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000)
            },
            {
                userId: user._id,
                title: "Artisan Sourdough Bread",
                upcCode: "098765432109",
                amount: { value: 8.50, currency: "USD" },
                expiryDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)
            },
            {
                userId: user._id,
                title: "Organic Almond Milk",
                upcCode: "456123789012",
                amount: { value: 4.99, currency: "USD" },
                expiryDate: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000)
            },
            {
                userId: user._id,
                title: "Himalayan Pink Salt",
                upcCode: "789456123012",
                amount: { value: 12.00, currency: "USD" },
                expiryDate: new Date(today.getTime() + 180 * 24 * 60 * 60 * 1000)
            }
        );
    }

    await Product.insertMany(productsToInsert);
    console.log(`Successfully added 4 premium products for each of the ${users.length} users!`);
    process.exit(0);
}

seed().catch(console.error);
