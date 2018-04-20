import mongoose from 'mongoose';

const DATABASE_URL = process.env.DATABASE_URL || "mongodb://admin:admin@ds151809.mlab.com:51809/ocerimonialista-test";

export const connection = async () => {
    await mongoose.connect(DATABASE_URL);
}
