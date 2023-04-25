import { connectToMongoDB } from './db/mongoose_connection';
import { app } from './app';

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectToMongoDB().then(() => console.log('Connected to DB...'));
    app.listen(port, () => {
      console.log(`listening to ${port}:  http://127.0.0.1:8000`);
    });
  } catch (error: any) {
    console.error(error.message);
  }
};

start();
