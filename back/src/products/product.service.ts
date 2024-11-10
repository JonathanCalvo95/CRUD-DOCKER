import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) { }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async getProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto,): Promise<any> {
    try {
      return this.productModel.findByIdAndUpdate(id, updateProductDto);
    } catch (error) {
      return 'Error';
    }
  }

  async deleteProduct(id: string): Promise<string> {
    try {
      return this.productModel.findByIdAndRemove(id);
    } catch (error) {
      return 'Error';
    }
  }
}
