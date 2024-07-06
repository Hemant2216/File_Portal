import mongoose from "mongoose";


const DBconnection = async()=>{
    const DB_URL = "mongodb+srv://root:root@filesharing.6eowfye.mongodb.net/?retryWrites=true&w=majority&appName=Filesharing"
    try{
        await mongoose.connect(process.env.MONGO_URL || DB_URL,{useNewUrlParser:true});
        console.log('Database connected');
    }catch(error){
        console.error('Error while connecting',error.message)
    }
}

export default DBconnection;