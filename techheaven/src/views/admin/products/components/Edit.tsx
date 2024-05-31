import React, { useState, useRef, useEffect, useCallback } from "react";
import { updateProducts } from "services/adminService";

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
interface Catalog {
    CatalogId: number;
    CatalogName: string;
}
interface EditProps {
    product: Product;
    catalogs: Catalog[];
    onAddProduct: () => void;
}


const Edit: React.FC<EditProps> = ({ product, catalogs, onAddProduct }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const [productName, setProductName] = useState<string>(product.ProductName);
    const [price, setPrice] = useState<number>(product.Price);
    const [quantity, setQuantity] = useState<number>(product.Quantity);
    const [catalogName, setCatalogName] = useState<string>(product.CatalogName);
    //detail
    const [Brand, setBrand] = useState<string>(product.Details.Brand);
    const [Model, setModel] = useState<string>(product.Details.Model);
    const [Processor, setProcessor] = useState<string>(product.Details.Processor);
    const [RAMSize, setRAMSize] = useState<number>(product.Details.RAMSize);
    const [StorageSize, setStorageSize] = useState<number>(product.Details.StorageSize);
    const [GraphicsCard, setGraphicsCard] = useState<string>(product.Details.GraphicsCard);

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProductName(event.target.value);
    };

    const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(Number(event.target.value));
    };

    const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(event.target.value));
    };
    //detail
    const handleChangea = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBrand(event.target.value);
    };
    const handleChangeb = (event: React.ChangeEvent<HTMLInputElement>) => {
        setModel(event.target.value);
    };
    const handleChangec = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProcessor(event.target.value);
    };
    const handleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGraphicsCard(event.target.value);
    };
    const handleChangee = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRAMSize(Number(event.target.value));
    };
    const handleChangef = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStorageSize(Number(event.target.value));
    };

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            hideModal();
        }
    }, []);

    useEffect(() => {
        if (showModal) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showModal, handleClickOutside]);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const hideModal = () => {
        setShowModal(false);
    };

    const handleClick = async () => {
        try {
            const selectedCatalog = catalogs.find(catalog => catalog.CatalogName === product.CatalogName);

            let id: number = product.ProductId;
            const formData = {
                ProductName: productName,
                Price: price,
                Quantity: quantity,
                CatalogId: selectedCatalog.CatalogId,
                Brand: Brand,
                Model: Model,
                Processor: Processor,
                GraphicsCard: GraphicsCard,
                RAMSize: RAMSize,
                StorageSize: StorageSize,
            };
            await updateProducts(id, formData);
            alert('Update product successfully!');
            onAddProduct();
            hideModal();
        } catch (error) {
            alert('Error: ' + error);
        }
    };


    return (
        <div>
            <button
                data-modal-target="popup-modal"
                data-modal-toggle="popup-modal"
                className=" ml-6 my-2  flex focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                type="button"
                onClick={toggleModal}
            >
                Edit
            </button>

            {showModal && (
                <div
                    id="popup-modal"
                    className="overflow-y-auto overflow-x-hidden fixed z-50 inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50"
                >
                    <div ref={modalRef} className="relative w-full max-w-md p-4">
                        <div className="bg-gray-100 rounded-lg shadow dark:bg-gray-700">
                            <div className="p-4 md:p-5 text-center">
                                <div className="my-6">
                                    <div className="flex space-x-4">
                                        <div className="relative flex-1">
                                            <input value={productName} onChange={handleChangeName} type="text" id="productName" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border-1 border-blueSecondary appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                            <label htmlFor="productName" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-80 top-3 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">ProductName</label>
                                        </div>
                                        <div className="relative flex-1">
                                            <input value={price} onChange={handleChangePrice} type="text" id="productName" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border-1 border-blueSecondary appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                            <label htmlFor="productName" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-80 top-3 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Price</label>
                                        </div>
                                    </div>
                                    <div className="relative mt-4">
                                        <input value={quantity} onChange={handleChangeQuantity} type="text" id="quantity" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-whiterounded-lg border-1 border-blueSecondary appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                        <label htmlFor="quantity" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-80 top-3 z-10 origin-[0] bg-transparent  dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Quantity</label>
                                    </div>
                                    <select className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={catalogName} onChange={(e) => setCatalogName(e.target.value)}>
                                        <option hidden value={0}>{catalogName}</option>
                                        {catalogs.map(catalog => (
                                            <option key={catalog.CatalogId}>
                                                {catalog.CatalogName}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="flex space-x-4 mt-4">
                                        <div className="relative flex-1">
                                            <input value={Brand} onChange={handleChangea} type="text" id="productName" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border-1 border-blueSecondary appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                            <label htmlFor="productName" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-80 top-3 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Brand</label>
                                        </div>
                                    </div>
                                    <div className="flex space-x-4 mt-4">
                                        <div className="relative flex-1">
                                            <input value={Processor} onChange={handleChangec} type="text" id="productName" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border-1 border-blueSecondary appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                            <label htmlFor="productName" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-80 top-3 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Processor</label>
                                        </div>
                                        <div className="relative flex-1">
                                            <input value={RAMSize} onChange={handleChangee} type="text" id="productName" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border-1 border-blueSecondary appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                            <label htmlFor="productName" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-80 top-3 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">RAMSize</label>
                                        </div>
                                    </div>
                                    <div className="flex space-x-4 mt-4">
                                        <div className="relative flex-1">
                                            <input value={StorageSize} onChange={handleChangef} type="text" id="productName" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border-1 border-blueSecondary appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                            <label htmlFor="productName" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-80 top-3 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">StorageSize</label>
                                        </div>
                                        <div className="relative flex-1">
                                            <input value={GraphicsCard} onChange={handleChanged} type="text" id="productName" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border-1 border-blueSecondary appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                            <label htmlFor="productName" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-80 top-3 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">GraphicsCard</label>
                                        </div>
                                    </div>
                                    <div className="relative mt-4">
                                        <input value={Model} onChange={handleChangeb} type="text" id="quantity" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-whiterounded-lg border-1 border-blueSecondary appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                        <label htmlFor="quantity" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-80 top-3 z-10 origin-[0] bg-transparent  dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Model</label>
                                    </div>
                                </div>
                                <button
                                    data-modal-hide="popup-modal"
                                    type="button"
                                    className="text-white w-full justify-center focus:outline-none bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                                    onClick={() => handleClick()}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Edit;
