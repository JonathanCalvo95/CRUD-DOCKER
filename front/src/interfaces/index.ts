export interface IProductList {
    product: {
        _id: string;
        name: string;
        category: string;
        price: number;
        stock: number;
    }
}

export interface IProduct {
    _id: string;
    name: string;
    category: string;
    price: number | string;
    stock: number | string;
}

export interface IProducts {
    products: IProduct[];
}

export interface INewProduct {
    newProduct: any,
    error: null,
}

export type TCreateProduct = Omit<IProduct, '_id'>;

export interface ICreateProductArgument {
    onStateChange: (newProductId: string) => void;
}