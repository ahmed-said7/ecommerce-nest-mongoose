import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import * as sharp from 'sharp';
import * as uuid from "uuid";

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
    async transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
        console.log(value)
        const filename=`brand-${Date.now()}-${uuid.v4()}.jpeg`;
        await sharp(value.buffer).resize(600,600).toFormat('jpeg').
        jpeg({quality:90}).toFile(`src/uploads/brand/${filename}`);
        return filename;
    };
}