import mongoose from "mongoose";

type Connection = {
  isConnected?: number | undefined;
};

const connection: Connection = {};

const dbConnect = async () => {
  if (connection?.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGODB_URI || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  connection.isConnected = db.connections[0].readyState;
  console.log(connection.isConnected);
};

export default dbConnect;
