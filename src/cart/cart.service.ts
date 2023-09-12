import { BadRequestException, Injectable } from "@nestjs/common";
import { CartRepo } from "./cart.repositroy";
import { CartRouteDto } from "./DTO/cart.dto";
import { ProductService } from "src/product/services/product.service";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cart } from "./cart.entity";

@Injectable()
export class CartService {
    constructor(private CartRepo:CartRepo
        ,private ProductService:ProductService,
        @InjectModel("Cart") private Cart:Model<Cart>
        ){};
    async createCart(body:CartRouteDto,user:string){
        const prod=await this.ProductService.getOne(body.product);
        if(!prod){return new BadRequestException('product not found');}
        let [cart] = await this.CartRepo.findByQuery({user:user});
        if(!cart){
            this.CartRepo.createOne({user:user});
            cart.Items=
            [{productId:body.product,quantity:1,price:prod.price,color:body.color}];

        }else{
            const index=cart.Items.findIndex((item)=>{
                return item.productId==body.product && item.color==body.color;
            })
            if(index>-1){
                cart.Items[index].quantity += 1;
            }else{
                cart.Items.push(
                    {productId:body.product,quantity:1,
                    price:prod.price,color:body.color})
            }
        }
        cart.totalPrice=0;
        cart.Items.forEach((item)=>{cart.totalPrice+=item.price});
        await cart.save();
        return {cart,status:"success"};
    }

    async UpdateProductQuantity(body:{product:string,quantity:number},user:string){
        const prod=await this.ProductService.getOne(body.product);
        if(!prod){return new BadRequestException('product not found');}
        let [cart] = await this.CartRepo.findByQuery({user:user});
        const index=cart.Items.findIndex((item)=>{return item.productId==body.product});
        if(index == -1){
            return new BadRequestException('Product not found')
        }
        cart.Items[index].quantity=body.quantity;
        await cart.save();
        return {cart,status:"success"};
    }

    async deleteCart(id:string){
        return this.CartRepo.delteOne(id);
    }

    async deleteLoggedUserCart(user:string){
        return this.Cart.findOneAndDelete({user})
    }
};