import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from "./product.model";

@Module({
    imports:[MongooseModule.forFeature([{name:'Product',schema:productSchema}])],
    controllers:[ProductsController],
    providers:[ProductsService]
})

export class ProductsModule{ }