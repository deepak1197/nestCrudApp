import * as mongoose from 'mongoose';

export const productSchema = new mongoose.Schema({
    name:{type:String, required:true}, //mongoose use JS not TS
    description:{type:String, required:true},
    price:{type:Number, required:true}
});


export interface Product extends mongoose.Document {
    id:string,
    name:string,
    description:string,
    price:number
}