import mongoose from "mongoose";


const connectionStr = process.env.ATLAS_CONN_STRING;

async function configMongo() {
    await mongoose.connect(connectionStr)
}

configMongo().catch((err) => console.log(err));
