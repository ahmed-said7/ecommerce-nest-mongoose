import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import * as sharp from 'sharp';
import * as uuid from "uuid";

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
    async transform(value: {images?:[Express.Multer.File],coverImage?:[Express.Multer.File]}, metadata: ArgumentMetadata) {
        let filename:string;
        let Obj:{images?:string[],coverImage?:string}={};
        if(value.images){
            let image:string[]=[];
            Promise.all(
                value.images.map(async(img)=>{
                    filename=`product-${Date.now()}-${uuid.v4()}.jpeg`;
                    image.push(filename);
                    await sharp(img.buffer).resize(600,600).toFormat('jpeg').
                    jpeg({quality:80}).toFile(`src/uploads/product/${filename}`);
                    
                })
            )
            Obj.images=image;
        }
        if(value.coverImage){
            filename=`product-${Date.now()}-${uuid.v4()}.jpeg`;
            await sharp(value.coverImage[0].buffer).resize(600,600).toFormat('jpeg').
            jpeg({quality:80}).toFile(`src/uploads/product/${filename}`);
            Obj.coverImage=filename;
        }
        return Obj;
    };
}