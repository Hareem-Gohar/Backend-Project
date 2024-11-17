const mongoose = require('mongoose');


const connectDb = async () => {
      try{ 
            await mongoose.connect(process.env.MONGODB_URI, {
                  useNewUrlParser: true,
                  useUnifiedTopology: true
            });
            console.log('Connected to MongoD');
      } catch (err) {
            console.error('MongoDB connection failed:', err);
            process.exit(1);
      }
};

module.exports = connectDb;