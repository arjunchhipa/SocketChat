import mongoose, { Mongoose } from 'mongoose';

async function connectMongoAtlas(url: string): Promise<Mongoose> {
    return mongoose.connect(url)
        .then(() => {
            console.log(`Connected to mongoose successfully`);
            return mongoose;
        })
        .catch((error: Error) => {
            console.error('Error', error);
            throw error; 
        });
}


module.exports = connectMongoAtlas;