import Card from "components/card";
import { useEffect, useState } from "react";
import { deleteProducts, getCatalogs, getProducts, getProductsDetail } from "services/adminService";
import Modal from "./Modal";
import Edit from "./Edit";
import React from "react";
import Cloudinaryshow from "./Cloudinary";

// Your interface definitions and component declarations remain the same
interface ProductDetails {
  Brand: string;
  Model: string;
  Processor: string;
  GraphicsCard: string;
  RAMSize: number;
  StorageSize: number;
}
interface Product {
  ProductId: number;
  ProductName: string;
  CatalogName: string;
  ImageURL: any;
  CatalogId: number;
  Quantity: number;
  Price: number;
  Details: ProductDetails;
}

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const productsData = await getProducts();
      setProducts(productsData);
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCatalogs = async () => {
    try {
      const catalogsData = await getCatalogs();
      setCatalogs(catalogsData);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCatalogs();
  }, []);

  const handleAddProduct = async () => {
    await fetchProducts();
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      await deleteProducts(productId);
      alert('Product deleted successfully!');
      fetchProducts();
    } catch (err) {
      alert("Failed to delete product. Please try again.");
    }
  };

  const handleShowDetail = async (productId: number) => {
    try {
      const productDetail = await getProductsDetail(productId);
      setSelectedProduct(productDetail);
      console.log(productDetail);
    } catch (error) {
      return;
    }
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  const ProductDetail = ({ products, onClose }: { products: Product; onClose: () => void }) => (
    <div className="px-6 pb-4">
      <div className="max-w-4xl bg-white w-full">
        <div>
          {Object.entries(products.Details).map(([key, value]) => (
            <div key={key} className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
              <p className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
              <p>{value}</p>
            </div>
          ))}
          <div className="flex">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteProduct(products.ProductId);
              }}
              className="my-2 p-6 focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5">
              Delete
            </button>
            <Edit product={products} catalogs={catalogs} onAddProduct={handleAddProduct} />
            <button onClick={onClose} className="my-2  mx-6 focus:outline-none text-white bg-gray-500 hover:bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5">Close</button>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <div className="text-center">
      <div role="status">
        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>;
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col items-center justify-between sm:flex-row sm:rounded-t-3xl p-3">
        <div className="text-lg font-bold text-gray-900">Products</div>
        <Modal onAddProduct={handleAddProduct} />
      </div>
      <Card extra="mt-3 !z-5 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-full bg-white dark:bg-navy-800">
            <div className="flex flex-col">
              <div className="grid grid-cols-1 sm:grid-cols-5 text-left text-navy-700 dark:text-white 3xl:hidden">
                <div className="px-4 text-center font-bold py-2 hidden sm:block ">IMG</div>
                <div className="px-4 text-center font-bold py-2 hidden sm:block ">Product Name</div>
                <div className="px-4 text-center font-bold py-2 hidden sm:block ">Catalog Name</div>
                <div className="px-4 text-center font-bold py-2 hidden sm:block ">Quantity</div>
                <div className="px-4 text-center font-bold py-2 hidden sm:block ">Price</div>
                {/* <div className="px-4 text-center font-bold py-2 hidden sm:block ">Edit</div> */}
              </div>
              {products.map((product: Product) => (
                <React.Fragment key={product.ProductId}>
                  <div
                    className="flex flex-col cursor-pointer hover:bg-gray-100 dark:hover:bg-navy-700"
                    onClick={() => handleShowDetail(product.ProductId)}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-5">
                      <div className="px-4 py-3 flex">
                        <Cloudinaryshow product={product} />
                      </div>
                      <div className="px-6 justify-center items-center py-2  flex"><h2 className="md:hidden mr-4 text-gray-600 capitalize">ProductName</h2>{product.ProductName}</div>
                      <div className="px-4 justify-center items-center py-2  flex"><h2 className="md:hidden mr-4 text-gray-600 capitalize">CatalogName</h2>{product.CatalogName}</div>
                      <div className="px-4 justify-center items-center py-2  flex"><h2 className="md:hidden mr-4 text-gray-600 capitalize">Quantity</h2>{product.Quantity}</div>
                      <div className="px-4 justify-center items-center py-2  flex"><h2 className="md:hidden mr-4 text-gray-600 capitalize">Price</h2>{product.Price}</div>
                    </div>
                  </div>
                  {selectedProduct && selectedProduct.ProductId === product.ProductId && (
                    <ProductDetail products={selectedProduct} onClose={handleCloseDetail} />
                  )}
                  <hr />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
};

export default ProductsList;
