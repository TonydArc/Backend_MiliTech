import React, { useState, useRef, useEffect, useCallback } from "react";
import { updateOrder } from "services/adminService";

interface OrderDetail {
    ProductName: string;
    Quantity: number;
    Price: string;
    Address: string;
    OrderId: number;
}

interface Order {
    OrderId: number;
    CustomerName: string;
    Status: string;
    TotalAmount: string;
    OrderDate: string;
    Detail: OrderDetail;
}
interface EditProps {
    order: Order;
    onAddProduct: () => void;
}


const Edit: React.FC<EditProps> = ({ order, onAddProduct }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const modalRef = useRef<HTMLDivElement>(null);

    // const [orderCustomerName, setOrderCustomerName] = useState<string>(order.CustomerName);
    const [orderTotalAmount, setOrderTotalAmount] = useState<string>(order.TotalAmount);
    const [quantity, setQuantity] = useState<number>(order.Detail.Quantity);
    const [address, setAddress] = useState<string>(order.Detail.Address);
    const [status, setStatus] = useState<string>(order.Status); // Initialize with order's status

    const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(event.target.value);
    };

    // const handleChangeTotal = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setOrderCustomerName(event.target.value);
    // };
    const handleChangeTotal = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderTotalAmount(event.target.value);
    };
    const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(event.target.value));
    };
    const handleChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
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
    function getStatusValue(status: string): number {
        switch (status) {
            case 'pending':
                return 1;
            case 'processing':
                return 3;
            case 'completed':
                return 2;
            case 'shipped':
                return 4;
            default:
                return;
        }
    }

    const handleClick = async () => {
        try {

            let id: number = order.OrderId;

            const formattedTotalAmount = orderTotalAmount.replace(/\D/g, '');

            const formData = {
                StatusId: getStatusValue(status),
                TotalAmount: formattedTotalAmount,
                Quantity: quantity,
                Address: address
            };
            console.log(formData);

            if (!formData.StatusId) {
                alert('Missing Stastus!')
                return;
            }

            await updateOrder(id, formData);
            alert('Update product successfully!');
            onAddProduct();
        } catch (error) {
            alert('Error: ' + error);
        }
    };


    return (
        <div>
            <button
                data-modal-target="popup-modal"
                data-modal-toggle="popup-modal"
                className=" mx-1 my-2 focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
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
                                            <input value={orderTotalAmount} onChange={handleChangeTotal} type="text" id="productName" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border-1 border-blueSecondary appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                            <label htmlFor="productName" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-80 top-3 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">TotalAmount</label>
                                        </div>
                                    </div>
                                    <div className="relative mt-4">
                                        <input value={quantity} disabled onChange={handleChangeQuantity} type="text" id="productName" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border-1 border-blueSecondary appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                        <label htmlFor="productName" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-80 top-3 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Quantity</label>
                                    </div>
                                    <div className="relative mt-4">
                                        <input value={address} onChange={handleChangeAddress} type="text" id="productName" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border-1 border-blueSecondary appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                        <label htmlFor="productName" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-80 top-3 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Address</label>
                                    </div>
                                    <div className="relative mt-4">
                                        <select
                                            id="status"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={status}
                                            onChange={handleChangeStatus}
                                            disabled={order.Status === 'Completed'} // Disable the select when order status is 'completed'
                                        >
                                            <option value="default">{order.Status}</option>
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="completed">Completed</option>
                                            <option value="shipped">Shipped</option>
                                        </select>
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
