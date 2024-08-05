import mongoose from "mongoose";


let connectionStr = process.env.ATLAS_CONN_STR || "mongodb://127.0.0.1:27017";

connectionStr += "/cartesi";


export const configMongo = async () => {
    await mongoose.connect(connectionStr)
}

configMongo().catch((err) => console.log(err));
