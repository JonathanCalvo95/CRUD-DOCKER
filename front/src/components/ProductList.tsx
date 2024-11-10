import { IProducts, IProduct } from "../interfaces";
import DataTable, { TableColumn } from "react-data-table-component";

export const ProductList = ({
  products,
  editProduct,
  deleteProduct,
}: IProducts & { editProduct: (product: IProduct) => void, deleteProduct: (id: string) => void }) => {

  const columns: TableColumn<IProduct>[] = [
    {
      name: "Nombre",
      selector: (row) => row.name,
    },
    {
      name: "Categoria",
      selector: (row) => row.category,
    },
    {
      name: "Precio",
      selector: (row) => row.price,
    },
    {
      name: "Cantidad",
      selector: (row) => row.stock,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div>
          <button
            onClick={() => editProduct(row)}
            className="bg-yellow-500 px-1 py-1 rounded-md mr-1 text-white">
            Editar
          </button>
          <button
            onClick={() => deleteProduct(row._id)}
            className="bg-red-500 px-1 py-1 rounded-md text-white">
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      title="Lista de productos"
      columns={columns}
      data={products}
      fixedHeader
      fixedHeaderScrollHeight="300px"
      pagination
    />
  );
};
