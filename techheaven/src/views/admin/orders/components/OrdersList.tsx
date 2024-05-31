import Card from "components/card";
import { useEffect, useState } from "react";
import { getOrders, getOrderDetail } from "services/adminService";
// import Modal from "./Modal";
import Edit from "./Edit";
import React from "react";

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

const OrdersList = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order>(null);

    const fetchOrders = async () => {
        try {
            const ordersData = await getOrders();
            setOrders(ordersData);
        } catch (err) {
            alert(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);


    const handleShowDetail = async (orderId: number) => {
        try {
            const orderDetail = await getOrderDetail(orderId);
            setSelectedOrder(orderDetail);
        } catch (error) {
            return;
        }
    };

    const handleAddProduct = () =>{
        fetchOrders();
    }

    const handleCloseDetail = () => {
        setSelectedOrder(null);
    };

    const OrderDetailComponent = ({ order, onClose }: { order: Order; onClose: () => void }) => (
        <div className="px-6 pb-4">
            <div className="max-w-4xl bg-white w-full">
                <div>
                    <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                        <p className="text-gray-600 capitalize">ProductName</p>
                        <p>{order.Detail.ProductName}</p>
                    </div>
                    <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                        <p className="text-gray-600 capitalize">Quantity</p>
                        <p>{order.Detail.Quantity}</p>
                    </div>
                    <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                        <p className="text-gray-600 capitalize">Total Amount</p>
                        <p>{order.TotalAmount}</p>
                    </div>
                    <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                        <p className="text-gray-600 capitalize">Address</p>
                        <p>{order.Detail.Address}</p>
                    </div>
                    <div className="flex">
                        <Edit order={order} onAddProduct={handleAddProduct} />
                        <button onClick={onClose} className="my-2 focus:outline-none text-white bg-gray-500 hover:bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="text-center">
                <div role="status">
                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <div className="flex flex-col items-center justify-between sm:flex-row sm:rounded-t-3xl p-3">
                <div className="text-lg font-bold text-gray-900">Orders</div>
                {/* <Modal onAddOrder={fetchOrders} /> */}
            </div>
            <Card extra="mt-3 !z-5 overflow-hidden">
                <div className="overflow-x-auto">
                    <div className="min-w-full bg-white dark:bg-navy-800">
                        <div className="flex flex-col">
                            {/* Table headers */}
                            <div className="grid grid-cols-1 md:grid-cols-4">
                                <div className="px-4 py-2 text-left font-bold text-lg text-navy-700 dark:text-white">CustomerName</div>
                                <div className="px-4 py-2 text-center font-bold text-lg text-navy-700 dark:text-white">TotalAmount</div>
                                <div className="px-4 py-2 text-center font-bold text-lg text-navy-700 dark:text-white">OrderDate</div>
                                <div className="px-4 py-2 text-center font-bold text-lg text-navy-700 dark:text-white">Status</div>
                            </div>
                            {/* Orders list */}
                            {orders.map((order: Order) => (
                                <React.Fragment key={order.OrderId}>
                                    <div
                                        className="flex flex-col cursor-pointer hover:bg-gray-100 dark:hover:bg-navy-700"
                                        onClick={() => handleShowDetail(order.OrderId)}
                                    >
                                        {/* Order data */}
                                        <div className="grid grid-cols-1 md:grid-cols-4">
                                            <div className="px-4 py-3 items-center flex">{order.CustomerName}</div>
                                            <div className="px-4 py-3 justify-center items-center flex">{order.TotalAmount}</div>
                                            <div className="px-4 py-3 justify-center items-center flex">{order.OrderDate}</div>
                                            <div className="px-4 py-3 justify-center items-center flex">
                                                {order.Status === "Completed" ? (
                                                    <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                                        <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                                                        Available
                                                    </span>
                                                ) : order.Status === "Shipped" ? (
                                                    <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                                                        <span className="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
                                                        Shipping
                                                    </span>
                                                ) : order.Status === "Pending" ? (
                                                    <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-gray-900 dark:text-gray-300">
                                                        <span className="w-2 h-2 me-1 bg-gray-500 rounded-full"></span>
                                                        Pending
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                                                        <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                                                        Cancel
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {selectedOrder && selectedOrder.OrderId === order.OrderId && (
                                        <OrderDetailComponent order={selectedOrder} onClose={handleCloseDetail} />
                                    )}
                                    <hr />
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );

};

export default OrdersList;
