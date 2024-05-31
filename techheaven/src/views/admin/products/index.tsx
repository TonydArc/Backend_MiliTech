import ProductsList from "./components/ProductsList";


const ManagementProduct = () => {
  return (
    <div className="mt-3 grid h-full w-full gap-5">
      <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-2">
        <div className="mb-5" />
        <ProductsList />
      </div>
    </div>
  );
};

export default ManagementProduct;
