import { GetProducts } from "./getProducts";

export function Container() {
  return (
    <div className="max-w-2xl m-auto h-screen py-10">
      <h1 className="text-3xl font-bold text-center py-5">Productos</h1>
      <GetProducts />
    </div>
  );
}
