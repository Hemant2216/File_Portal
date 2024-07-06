
import { request } from "express";
import File from "../models/file.js"

export const uploadImage=async(req,res)=>{
    const fileObj={
        path:req.file.path,
        name:req.file.originalname
    }
    try{
        const file=await File.create(fileObj);
        res.status(200).json({path:`http://localhost:5555/file/${file._id}`})
    }catch(error){
        console.error(error.messagge)
        res.status(500).jason({error:error.message})
    }
} 

export const downloadImage=async(req,res)=>{
    try{
        const file=await File.findById(req.params.fileId);
        file.downlaodContent++;
        await file.save();

        res.download(file.path,file.name);
    }catch(error){
        console.error(error.message);
        return res.status(500).json({error:error.message})
    }
}