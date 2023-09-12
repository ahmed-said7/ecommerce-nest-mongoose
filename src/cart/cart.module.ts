
import { Module } from "@nestjs/common";
import { CartController } from "./cart.controller";
import { CartRepo } from "./cart.repositroy";
import { CartService } from "./cart.service";
import { MongooseModule } from "@nestjs/mongoose";
import { cartSchema } from "./cart.entity";

@Module
    ({
    controllers:[CartController],
    providers:[CartRepo,CartService],
    imports:[MongooseModule.forFeature([{name:"Cart",schema:cartSchema}])]
    })

export class CartModule {};