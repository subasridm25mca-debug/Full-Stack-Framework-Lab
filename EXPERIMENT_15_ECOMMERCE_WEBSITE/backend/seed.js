const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/product');

const products = [
  {
    name: 'Ergonomic Office Chair',
    category: 'Chair',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500'
  },
  {
    name: 'Modern Living Room Sofa',
    category: 'Sofa',
    price: 24999,
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=500'
  },
  {
    name: 'Comfort Fabric Sofa',
    category: 'Sofa',
    price: 18500,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500'
  },
  {
    name: 'Modern Coffee Table',
    category: 'Table',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=500'
  },
  {
    name: 'Round Dining Table',
    category: 'Table',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=500'
  },
  {
    name: 'Glass Coffee Table',
    category: 'Table',
    price: 9499,
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500'
  },
  {
    name: 'Minimal Study Desk',
    category: 'Desk',
    price: 7999,
    image: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=500'
  },
  {
    name: 'Classic Wooden Chair',
    category: 'Chair',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=500'
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {

    console.log('MongoDB connected');

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log('8 products added successfully');

    process.exit();
  })
  .catch(error => {
    console.error('Error:', error.message);
    process.exit(1);
  });