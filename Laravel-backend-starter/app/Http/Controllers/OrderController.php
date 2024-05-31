<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;



class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('customer', 'status')->get();

        $ordersFormatted = $orders->map(function ($order) {
            return [
                'OrderId' => $order->OrderId,
                'CustomerName' => optional($order->customer)->FirstName . ' ' . optional($order->customer)->LastName,
                'Status' => optional($order->status)->Status,
                'TotalAmount' => number_format($order->TotalAmount, 0, ',', ',') . ' VNĐ',
                'OrderDate' => $order->OrderDate,
            ];
        });

        return $ordersFormatted;
    }
    public function create(Request $request){
    // Validate the request
    $request->validate([
        'CustomerId' => 'required|integer',
        'OrderDate' => 'required|date',
        'StatusId' => 'required|integer',
        'TotalAmount' => 'required|numeric', 
        'OrderDetails' => 'required|array',
        'OrderDetails.*.ProductId' => 'required|integer',
        'OrderDetails.*.Quantity' => 'required|integer',
        'OrderDetails.*.Price' => 'required|numeric',
        'OrderDetails.*.MethodId' => 'required|integer',
        'OrderDetails.*.Address' => 'required|string'
    ]);

    try {
        DB::beginTransaction();

        // Create Order
        $order = Order::create([
            'CustomerId' => $request->CustomerId,
            'OrderDate' => $request->OrderDate,
            'StatusId' => $request->StatusId,
            'TotalAmount' => $request->TotalAmount
        ]);

        // Create OrderDetails
        foreach ($request->OrderDetails as $detail) {
            OrderDetail::create([
                'OrderId' => $order->OrderId,
                'ProductId' => $detail['ProductId'],
                'Quantity' => $detail['Quantity'],
                'Price' => $detail['Price'],
                'MethodId' => $detail['MethodId'],
                'Address' => $detail['Address']
            ]);
        }

        DB::commit();

        return response()->json(['message' => 'Order created successfully'], 201);
    } catch (\Exception $e) {
        DB::rollBack();
        Log::error('Failed to create order: ' . $e->getMessage(), [
            'trace' => $e->getTraceAsString()
        ]);
        return response()->json(['message' => 'Failed to create order: ' . $e->getMessage()], 500);
    }
    }

    public function show($id)
    {
        $order = Order::with(['customer', 'status', 'detail'])->where('OrderId', $id)->first();

        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        $detail = $order->detail;

        if (!$detail) {
            return response()->json(['error' => 'Order details not found'], 404);
        }

        $product = $detail->product;

        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        $order_data = [
            'ProductName' => $product->ProductName,
            'Quantity' => $detail->Quantity,
            'Price' => $detail->Price,
            'Address' => $detail->Address,
        ];

        // Thông tin sản phẩm
        // $product_data = [
        //     'ProductId' => $product->ProductId,
        //     'ProductName' => $product->ProductName,
        //     'Price' => $product->Price,
        // ];

        // Định dạng lại thông tin đơn hàng
        $orderFormatted = [
            'OrderId' => $order->OrderId,
            'CustomerName' => optional($order->customer)->FirstName . ' ' . optional($order->customer)->LastName,
            'Status' => optional($order->status)->Status,
            'TotalAmount' => number_format($order->TotalAmount, 0, '.', '.') . ' VNĐ',
            'OrderDate' => $order->OrderDate,
            'Detail' => $order_data,
        ];

        //Trả về thông tin đơn hàng dưới dạng JSON
        return response()->json($orderFormatted);
        // return $id;
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'StatusId' => 'required|integer',
            'TotalAmount' => 'required|numeric',
            'Quantity' => 'required|numeric',
            'Address' => 'required|string',
        ]);

        $order = Order::findOrFail($id);
        if ($request->StatusId == 3 && $order->StatusId != 3) {
            $request->merge(['Quantity' => $request->Quantity + 1]);

            $product = $order->detail->product;
            $product->update(['Quantity' => $product->Quantity + 1]);
        }
        if ($request->StatusId == 4 && $order->StatusId != 4) {
            $request->merge(['Quantity' => $request->Quantity - 1]);

            $product = $order->detail->product;
            $product->update(['Quantity' => $product->Quantity - 1]);
        }

        $order->update($request->all());

        return response()->json(['message' => 'Order updated successfully']);
    }

    public function getOrdersByUserId($id)
    {
        $orders = Order::join('orderstatus', 'orders.StatusId', '=', 'orderstatus.StatusId')
        ->join('users', 'users.id', '=', 'orders.CustomerId')
        ->where('orders.CustomerId', $id)
        ->select('orders.*', 'orderstatus.*', 'users.name')
        ->get();
        return response()->json($orders);
    }
}
