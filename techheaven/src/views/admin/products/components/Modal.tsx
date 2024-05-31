import CloudinaryScriptLoader from "components/cloudinary/CloudinaryScriptLoader";
import CloudinaryUploadWidget from "components/cloudinary/CloudinaryUploadWidget";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { createProducts, getCatalogs } from "services/adminService";

interface ModalProps {
    onAddProduct: () => void;
}


const Modal: React.FC<ModalProps> = ({ onAddProduct }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const [catalogs, setCatalogs] = useState<any[]>([]); // Set the correct type for catalogs
    const [publicId, setPublicId] = useState<string | null>(null);
    const uwConfig = {
        cloudName: "dbsou9jps",
        uploadPreset: "ml_default"
    };

    const [productName, setProductName] = useState<string>('');
    const [price, setPrice] = useState<number>();
    const [quantity, setQuantity] = useState<number>();
    const [ImageURL, setImageURL] = useState<string>('');
    const [catalogName, setCatalogName] = useState<string>('');
    //detail
    const [Brand, setBrand] = useState<string>();
    const [Model, setModel] = useState<string>();
    const [Processor, setProcessor] = useState<string>();
    const [RAMSize, setRAMSize] = useState<number>();
    const [StorageSize, setStorageSize] = useState<number>();
    const [GraphicsCard, setGraphicsCard] = useState<string>();
    const [ReleaseDate, setReleaseDate] = useState<string>();

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
    const handleChangeg = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReleaseDate(event.target.value);
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
        fetchCatalogs();
    }, [showModal]);

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
            const selectedCatalog = catalogs.find(catalog => catalog.CatalogName === catalogName);

            const formData = {
                ProductName: productName,
                Price: price,
                Quantity: quantity,
                ImageURL: publicId,
                CatalogId: selectedCatalog.CatalogId,
                Brand: Brand,
                GraphicsCard: GraphicsCard,
                Model: Model,
                Processor: Processor,
                RAMSize: RAMSize,
                ReleaseDate: ReleaseDate,
                StorageSize: StorageSize,
            };
            console.log(formData);
            
            await createProducts(formData);
            alert('Create product successfully!')
            onAddProduct();
            hideModal();
        } catch (error) {
            alert('Catalogs error: ' + error);
        }
    };


    return (
        <div>
            <button
                data-modal-target="popup-modal"
                data-modal-toggle="popup-modal"
                className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                type="button"
                onClick={toggleModal}
            >
                Add Product
            </button>

            {showModal && (
                <div
                    id="popup-modal"
                    className="overflow-y-auto overflow-x-hidden fixed z-50 inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50"
                >
                    <div ref={modalRef} className="relative w-full max-w-xl p-4">
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
                                    <select className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={catalogName} onChange={(e) => setCatalogName(e.target.value
                                    )}>
                                        <option key="" value="">Choose a catalog</option>
                                        {catalogs.map(catalog => (
                                            <option key={catalog.id} value={catalog.id}>
                                                {catalog.CatalogName}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="flex space-x-4 mt-4">
                                        <div className="relative flex-1">
                                            <input value={Brand} onChange={handleChangea} type="text" id="productName" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border-1 border-blueSecondary appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                            <label htmlFor="productName" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-80 top-3 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Brand</label>
                                        </div>
                                        <div className="relative flex-1">
                                            <input value={ReleaseDate} onChange={handleChangeg} type="text" id="productName" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border-1 border-blueSecondary appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                            <label htmlFor="productName" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-80 top-3 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">ReleaseDate</label>
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
                                <CloudinaryScriptLoader>
                                    <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />
                                    {/* {publicId && <input value={publicId}  type="text" />} */}
                                </CloudinaryScriptLoader>
                                <button
                                    data-modal-hide="popup-modal"
                                    type="button"
                                    className="text-white mt-4 w-full justify-center focus:outline-none bg-blueSecondary hover:bg-navy-500 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                                    onClick={handleClick}
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

export default Modal;
