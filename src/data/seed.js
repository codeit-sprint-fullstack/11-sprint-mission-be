import mongoose from 'mongoose';
import { seedProducts } from './mock.js';
import ProductDbProduct from '../models/product.Schema.js';
import { config } from '../config/config.js';

mongoose.connect(config.MONGO_URI);

await ProductDbProduct.deleteMany({});
await ProductDbProduct.insertMany(seedProducts);

mongoose.connection.close();
