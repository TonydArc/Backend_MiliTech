import React, { useState, useRef, useEffect, useCallback } from "react";
import { MdCreate } from "react-icons/md";
import { updateProducts } from "services/adminService";

interface customer {
    CustomerId: number;
    FirstName: string;
    LastName: string;
    Phone: string;
    Email: string;
    Address: string;
}
interface EditProps {
    user: customer;
    onAddProduct: () => void;
}


const Edit: React.FC<EditProps> = ({ user, onAddProduct }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const [customerFirstName, setCustomerFirstName] = useState<string>(user.FirstName);
    const [customerLastName, setCustomerLastName] = useState<string>(user.LastName);
    const [customerPhone, setCustomerPhone] = useState<string>(user.Phone);
    const [customerEmail, setCustomerEmail] = useState<string>(user.Email);
    const [customerAddress, setCustomerAddress] = useState<string>(user.Address);

    const handleChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerFirstName(event.target.value);
    };
    const handleChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerLastName(event.target.value);
    };
    const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerPhone(event.target.value);
    };
    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerEmail(event.target.value);
    };
    const handleChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerAddress(event.target.value);
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
        // try {

        //     let id: number = product.ProductId;

        //     const formData = {
        //         ProductName: productName,
        //         Price: price,
        //         Quantity: quantity,
        //     };
        //     await updateProducts(id,formData);
        //     alert('Update product successfully!');
        //     onAddProduct();
        //     hideModal();
        // } catch (error) {
        //     alert('Error: ' + error);
        // }
    };


    return (
        <div>
            <button
                data-modal-target="popup-modal"
                data-modal-toggle="popup-modal"
                className=" mx-1 my-1 focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                type="button"
                onClick={toggleModal}
            >
                <MdCreate />
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
                                            <input value={customerFirstName} onChange={handleChangeFirstName} type="text" id="productName" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border-1 border-blueSecondary appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                            <label htmlFor="productName" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-80 top-3 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">FirstName</label>
                                        </div>
                                        <div className="relative flex-1">
                                            <input value={customerLastName} onChange={handleChangeLastName} type="text" id="productName" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border-1 border-blueSecondary appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                            <label htmlFor="productName" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-80 top-3 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">LastName</label>
                                        </div>
                                    </div>
                                    <div className="relative mt-4">
                                        <input value={customerPhone} onChange={handleChangePhone} type="text" id="productName" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border-1 border-blueSecondary appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                        <label htmlFor="productName" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-80 top-3 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Phone</label>
                                    </div>
                                    <div className="relative mt-4">
                                        <input value={customerEmail} onChange={handleChangeEmail} type="text" id="productName" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border-1 border-blueSecondary appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                        <label htmlFor="productName" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-80 top-3 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email</label>
                                    </div>
                                    <div className="relative mt-4">
                                        <input value={customerAddress} onChange={handleChangeAddress} type="text" id="productName" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border-1 border-blueSecondary appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                        <label htmlFor="productName" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-80 top-3 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Address</label>
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
