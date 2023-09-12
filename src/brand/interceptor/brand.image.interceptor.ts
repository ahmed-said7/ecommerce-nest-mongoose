import { BadRequestException } from "@nestjs/common";
import { memoryStorage } from "multer";
import {} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

export const uploadImageInterceptor=()=> FileInterceptor('image',{
    storage:memoryStorage(),
    fileFilter:(req,file,cb)=>{
        if(file.mimetype.startsWith('image/')){
            return cb(null,true);
        }else {
            return cb(new BadRequestException('only files of type image'),false);
        }
    }
})