import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_DB_URL ?? '');

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB Connected');
});

connection.on('error', (err) => {
  console.error('MongoDB Connection Error', err);
});

export default mongoose;
