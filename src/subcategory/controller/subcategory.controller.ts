import { Controller,Get,Post,BadRequestException,NotFoundException,Patch,Delete,Param,UseGuards,Query,Body, ParseIntPipe } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { CreateSubategoryDto } from "../dto/create-subcategory.dto";
import { UpdateSubategoryDto } from "../dto/update-subcategory.dto";
// import { QuerySubategoryDto } from "../dto/query-subcategory.dto";
import { Subcategory } from "../models/subcategory.entity";
import { SubcategoryService } from "../services/subcategory.service";




@Controller('subcategory')
// @UseGuards(UseGuards)
// @UseGuards(AuthGuard('ma/nager','admin',"user"))

export class SubcategoryController {
    constructor(private SubcategoryService:SubcategoryService){}
    @Get()
    async getSubs(@Query() query:any)
    {
        const sub=await this.SubcategoryService.filter(query);
        if(sub.length ==0){return new NotFoundException("no subcategory found");}
        return sub;
    }

    @Get("/:id")
    async getSub(@Param("id") id:string){
        const sub=await this.SubcategoryService.findOne(id);
        if(!sub){return new NotFoundException("no subcategory found");}
        return sub;
    }

    @Patch("/:id")
    updateSub(@Param("id") id:string,@Body() body:UpdateSubategoryDto){
        const sub=this.SubcategoryService.updateOne(id,body);
        if(!sub){return new NotFoundException("no subcategory found");}
        return sub;
    }

    @Delete("/:id")
    async deleteSub(@Param("id") id:string){
        const sub=await this.SubcategoryService.deleteOne(id);
        if(!sub){return new NotFoundException("no subcategory found");}
        return sub;
    }

    @Post()
    createSub(@Body() body:CreateSubategoryDto){
        const sub= this.SubcategoryService.createOne(body);
        if(!sub){return new NotFoundException("no subcategory found");}
        return sub;
    }
}