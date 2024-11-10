import { useEffect, useState } from "react";
import { ProductList } from "./ProductList";
import api from "../api";
import { IProduct } from "../interfaces";
import { CreateProduct } from "./createProduct"; // Asegúrate de importar correctamente

export function GetProducts() {
  const [productList, setProductList] = useState<any>([]);
  const [error, setError] = useState(null);
  const [productToEdit, setProductToEdit] = useState<IProduct | null>(null);
  const [newProductId, setNewProductId] = useState<string>('');

  const handleStateChange = (newProductId: string) => {
    setNewProductId(newProductId);
  };

  // Cargar productos al inicio o cuando se agregue un nuevo producto
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { products } = await api.getProducts();
        setProductList(products);
        setProductToEdit(null);
      } catch (err: any) {
        setError(err);
      }
    };
    fetchData();
  }, [newProductId]);

  const editProduct = async (product: IProduct) => {
    setProductToEdit(product); // Al seleccionar un producto para editar, lo pasamos a productToEdit
  };

  // Función para eliminar un producto
  const deleteProduct = async (productId: string) => {
    try {
      await api.deleteProduct(productId);
      setProductList((prevProducts: any) =>
        prevProducts.filter((product: any) => product._id !== productId)
      );
    } catch (err: any) {
      setError(err);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* Aquí renderizamos el formulario de CreateProduct */}
      <CreateProduct
        productToEdit={productToEdit}
        onStateChange={handleStateChange} // Actualiza la lista después de crear/editar
      />

      {/* Renderizamos la lista de productos */}
      <ProductList
        products={productList}
        editProduct={editProduct} // Pasamos el producto a editar
        deleteProduct={deleteProduct} // Pasamos la lógica para eliminar
      />
    </div>
  );
}
