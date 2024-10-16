import mongoose from "mongoose";

const dbConnection = async (DBURL) => {
    try {
        await mongoose.connect(DBURL, {
            useNewUrlParser: true,  // Optional settings for MongoDB drivers
            useUnifiedTopology: true,
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error(`Failed to connect to the database: ${error.message}`);
        // Optionally, rethrow the error if needed
        throw error;
    }
};

export default dbConnection;