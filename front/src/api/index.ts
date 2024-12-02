import axios from 'axios';
import { IProduct, TCreateProduct } from '../interfaces';

class API {
    static async getProducts() {
        try {
            const { data } = await axios.get<IProduct>(
                import.meta.env.VITE_API_URI,
                {
                    headers: {
                        Accept: 'application/json',
                        'ngrok-skip-browser-warning': 'true',
                    },
                },
            );
            return {
                products: data,
                error: null
            }
        } catch (error: any) {
            return {
                products: null,
                error: error.message,
            }
        }
    }

    static async createProduct(newProduct: TCreateProduct) {
        try {
            const { data } = await axios.post<TCreateProduct>(
                import.meta.env.VITE_API_URI,
                newProduct
            );
            return {
                newProduct: data,
                error: null,
                type: "create"
            };
        } catch (error: any) {
            return {
                newProduct: null,
                error: error.message,
            }
        }
    }

    static async updateProduct(productId: string, updatedProduct: TCreateProduct) {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_URI}/${productId}`,
                updatedProduct
            );
            return {
                success: true,
                error: null,
                type: "update"
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.message,
            };
        }
    }

    static async deleteProduct(productId: string) {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_API_URI}/${productId}`
            );
            return {
                success: true,
                error: null,
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.message,
            };
        }
    }

}

export default API;