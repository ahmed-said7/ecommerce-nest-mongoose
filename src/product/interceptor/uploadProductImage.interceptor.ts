import { FileInterceptor,FileFieldsInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import {BadRequestException} from "@nestjs/common"
export const uploadProductImageInterceptor=()=> FileFieldsInterceptor(
    [{name:"images",maxCount:8},{name:"coverImage",maxCount:1}]
    ,{
        storage:memoryStorage(),
        fileFilter:(req,file,cb)=>{
        if(file.mimetype.startsWith('image/')){
            return cb(null,true);
        }else {
            return cb(new BadRequestException('only files of type image'),false);
        }
    }
    })