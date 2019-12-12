import { Controller, Post, Body, Get, Param, Put, Patch, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from "./product.model";
// import { Product } from "./product.model";

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) { }

    @Post()
    async addProduct(
        @Body('name') prodName: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number) {
        let generatedId = await this.productService.insertProduct(prodName, prodDesc, prodPrice);
        return { newProductId:generatedId };
    }

    @Get()
    async getAllProducts(){
        const products = await this.productService.getProducts();
        return products as Product[];
    }

    @Get(':name')
    async getProduct(@Param('name') prodName: string){
        return await this.productService.getProduct(prodName);
    }

    @Patch(':id') //Patch method is used to update existing product, use @Put to replace  
    async updateProduct(
        @Param('id') prodId:string,
        @Body('name') prodName:string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ) {
        return await this.productService.updateProduct(prodId, prodName, prodDesc, prodPrice);
    }

    @Delete(':id')
    async removeProduct(
        @Param('id') prodId:string
    ){
        return await this.productService.removeProduct(prodId);
    }
}