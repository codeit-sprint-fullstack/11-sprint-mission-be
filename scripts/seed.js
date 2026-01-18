import mongoose from 'mongoose';
import itemDate from './mock.js';
import {Product} from '../src/models/product.js';
import { config } from '../src/config/config.js';

mongoose.connect(config.MONGO_URI);


await Product.insertMany(itemDate);

mongoose.connect.close();
