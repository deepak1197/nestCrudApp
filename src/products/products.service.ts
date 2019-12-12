import { Injectable, NotFoundException } from "@nestjs/common";
// import { Product } from "./product.model";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'; //Model is a generic

import { Product } from "./product.model";

@Injectable()
export class ProductsService{
    constructor(@InjectModel('Product') private readonly productModel:Model<Product>){}

    //private products:Product[] = [];

    async insertProduct(name: string, description: string, price: number){
        const newProduct = new this.productModel({ name, description, price });
        console.log("Product model");
        console.log(newProduct);
        const result = await newProduct.save();
        console.log("Result"); //save method is added by mongoose & returns promise
        console.log(result);
        return result.id as string;
    }

    async getProducts() {
        const products = await this.productModel.find().exec();
        return products.map((prod)=>({
            id:prod.id,
            name:prod.name,
            description:prod.description,
            price:prod.price})
        )
    }

    async getProduct(name:string){        
        return await this.findProduct(name);
    }

    async updateProduct(id:string, name:string, description:string, price:number):Promise<Product> {
        let updatedProduct = await this.findProductById(id);
        if(name) updatedProduct.name = name;
        if(description) updatedProduct.description = description;
        if(price) updatedProduct.price = price;
        return updatedProduct.save();
        // return {...product};
    }

    async removeProduct(prodId:string){
        const result = await this.productModel.deleteOne({_id:prodId}).exec();
        console.log(result);
        if(result.n === 0) {
            throw new NotFoundException('Couldnot find any product');
        }
    }
    
    private async findProduct(name:string):Promise<Product>{
        const product = await this.productModel.findOne({name});
        if(!product){
            //if product not found, we may throw exception
            throw new NotFoundException('No product found!');
        }
        return product;
    }

    private async findProductById(id:string):Promise<Product>{
        let product;
        try{
            product = await this.productModel.findById(id); 
        }catch(e){
            throw new NotFoundException('No product for wrong id!');
        }
        if(!product){
            //if product not found, we may throw exception
            throw new NotFoundException('No product found!');
        }
        return product;
    }
}