import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import api from "../api";
import { ICreateProductArgument, IProduct } from "../interfaces";

const initProduct = {
  name: '',
  category: '',
  price: '',
  stock: '',
};

export function CreateProduct({ onStateChange, productToEdit }: ICreateProductArgument & { productToEdit: IProduct | null }) {
  const [product, setProduct] = useState(initProduct);
  const [error, setError] = useState<string | null>(null);

  // Si se pasa un producto para editar, actualizar el estado
  useEffect(() => {
    if (productToEdit) {
      setProduct({
        name: productToEdit.name,
        category: productToEdit.category,
        price: String(productToEdit.price),
        stock: String(productToEdit.stock),
      });
    }
  }, [productToEdit]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const r = (Math.floor(Math.random() * (100 - 1 + 1)) + 1).toString();

    // Verificar campos vacíos
    if (!product.name || !product.category || !product.price || !product.stock) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    // Verificar valores numéricos para precio y cantidad
    if (isNaN(Number(product.price)) || isNaN(Number(product.stock))) {
      setError("El precio y la cantidad deben ser números válidos.");
      return;
    }

    try {
      let response;
      if (productToEdit) {
        response = await api.updateProduct(productToEdit._id, product);
      } else {
        response = await api.createProduct(product);
      }

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.type == "create") {
        setProduct(initProduct);  // Reiniciar el formulario
        setError(null);  // Limpiar el mensaje de error
        onStateChange(r);
      } else {
        // Si es una actualización, no hay `newProduct`, solo confirmamos éxito
        setProduct(initProduct);  // Reiniciar el formulario
        setError(null);  // Limpiar el mensaje de error
        onStateChange(r);  // Pasar el ID del producto editado
      }

    } catch (err) {
      setError("Error al guardar el producto. Inténtalo de nuevo.");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-5 rounded-md">
      <h1 className="text-2xl py-5">{productToEdit ? 'Editar producto' : 'Cargar producto'}</h1>

      <input
        type="text"
        name="name"
        value={product.name}
        placeholder="Descripcion"
        autoFocus
        onChange={handleChange}
        className="bg-neutral-200 px-3 py-2 w-full block rounded-md mb-3"
      />
      <input
        type="text"
        name="category"
        value={product.category}
        placeholder="Categoria"
        onChange={handleChange}
        className="bg-neutral-200 px-3 py-2 w-full block rounded-md mb-3"
      />
      <input
        type="number"
        name="price"
        value={product.price}
        placeholder="Precio"
        onChange={handleChange}
        className="bg-neutral-200 px-3 py-2 w-full block rounded-md mb-3"
      />
      <input
        type="number"
        name="stock"
        value={product.stock}
        placeholder="Cantidad"
        onChange={handleChange}
        className="bg-neutral-200 px-3 py-2 w-full block rounded-md mb-3"
      />
      <button className="bg-blue-500 px-3 py-2 rounded-md text-white">
        {productToEdit ? 'Actualizar' : 'Guardar'}
      </button>

      {error && <div className="text-red-500 mt-3">{error}</div>}
    </form>
  );
}
