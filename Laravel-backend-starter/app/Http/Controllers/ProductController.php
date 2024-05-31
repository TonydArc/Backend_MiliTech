<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductDetail;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('catalog')->get();
        $products_join = $products->map(function ($product) {
            return [
                'ProductId' => $product->ProductId,
                'ProductName' => $product->ProductName,
                'Price' => number_format($product->Price, 0, '.', '.') . ' VNĐ',
                'Quantity' => $product->Quantity,
                'ImageURL' => $product->ImageURL,
                'CatalogName' => $product->catalog->CatalogName ?? null,
            ];
        });

        return $products_join;
    }

    public function show($id)
    {
        $product = Product::with('detail')->where('ProductId', $id)->first();

        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        $detail = $product->detail;
        $details = [
            'Brand' => $detail->Brand,
            'Model' => $detail->Model,
            'Processor' => $detail->Processor,
            'RAMSize' => $detail->RAMSize,
            'StorageSize' => $detail->StorageSize,
            'GraphicsCard' => $detail->GraphicsCard,
            'ReleaseDate' => $detail->ReleaseDate,
        ];

        $product_data = [
            'ProductId' => $product->ProductId,
            'ProductName' => $product->ProductName,
            'Price' => number_format($product->Price, 0, '.', '.') . ' VNĐ',
            'Quantity' => $product->Quantity,
            'ImageURL' => $product->ImageURL,
            'Details' => $details,
            'CatalogName' => $product->catalog->CatalogName ?? null,
        ];

        return response()->json($product_data);
    }

    public function create(Request $request)
    {
        // Validate the request
        $request->validate([
            'ProductName' => 'required|string',
            'Price' => 'required|numeric',
            'Quantity' => 'required|numeric',
            'ImageURL' => 'required|string',
            'CatalogId' => 'required|exists:productcatalog,CatalogId',
            'Brand' => 'required|string',
            'Model' => 'required|string',
            'Processor' => 'required|string',
            'RAMSize' => 'required|numeric',
            'StorageSize' => 'required|numeric',
            'GraphicsCard' => 'required|string',
            'ReleaseDate' => 'required|date',
        ]);

        try {
            DB::beginTransaction();

            // Create Product
            $product = new Product();
            $product->ProductName = $request->ProductName;
            $product->Price = $request->Price;
            $product->Quantity = $request->Quantity;
            $product->ImageURL = $request->ImageURL;
            $product->CatalogId = $request->CatalogId;
            $product->save();

            // Create ProductDetail
            $productDetail = new ProductDetail();
            $productDetail->Brand = $request->Brand;
            $productDetail->Model = $request->Model;
            $productDetail->Processor = $request->Processor;
            $productDetail->RAMSize = $request->RAMSize;
            $productDetail->StorageSize = $request->StorageSize;
            $productDetail->GraphicsCard = $request->GraphicsCard;
            $productDetail->ReleaseDate = $request->ReleaseDate;
            $productDetail->ProductId = $product->ProductId;
            $productDetail->save();

            DB::commit();
            $product->load('detail');

            return response()->json($product, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to create product.'], 500);
        }
    }


    public function update(Request $request, $id)
    {
        // Validate the request
        $request->validate([
            'ProductName' => 'required|string',
            'Price' => 'required|numeric',
            'Quantity' => 'required|numeric',
            'CatalogId' => 'required|exists:productcatalog,CatalogId',
            'Brand' => 'required|string',
            'Model' => 'required|string',
            'Processor' => 'required|string',
            'RAMSize' => 'required|numeric',
            'StorageSize' => 'required|numeric',
            'GraphicsCard' => 'required|string',
        ]);

        try {
            DB::beginTransaction();

            // Find the product by its ID
            $product = Product::with('detail')->findOrFail($id);

            // Update the product
            $productData = $request->only(['ProductName', 'Price', 'Quantity', 'CatalogId']);
            $product->update($productData);

            // Update the product detail
            $productDetailData = $request->only(['Brand', 'Model', 'Processor', 'RAMSize', 'StorageSize', 'GraphicsCard']);
            if ($product->detail) {
                $product->detail->update($productDetailData);
            } else {
                $productDetail = new ProductDetail($productDetailData);
                $productDetail->ProductId = $product->id;
                $productDetail->save();
            }

            DB::commit();

            // Reload the product with its details
            $product->load('detail');

            return response()->json([
                'message' => 'Product updated successfully!',
                'data' => $product,
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to update product.',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }





    public function destroy($id)
    {
        $product = Product::with('detail')->find($id);

        if ($product) {
            if ($product->detail) {
                $product->detail->delete();
            }

            $product->delete();

            return response()->json([
                'message' => 'Product deleted successfully!',
            ], Response::HTTP_OK);
        } else {
            return response()->json([
                'message' => 'Product not found!',
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
