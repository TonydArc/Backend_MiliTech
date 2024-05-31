<?php

namespace App\Http\Controllers;

use App\Models\ProductCatalog;
use Illuminate\Routing\Controller;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductCatalogController extends Controller
{
    public function index()
    {
        $productCatalogs = ProductCatalog::all();
        return response()->json($productCatalogs);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'CatalogName' => 'required',
            'Description' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Bad Request',
                'message' => $validator->errors()
            ], Response::HTTP_BAD_REQUEST);
        } else {
            try {
                $catalog = new ProductCatalog;
                $catalog->CatalogName  = $request->CatalogName;
                $catalog->Description  = $request->Description;
                $catalog->timestamps = false;
                $catalog->save();
                return response()->json([
                    'message' => 'Catalog created successfully.',
                    'data' => $catalog
                ], Response::HTTP_CREATED);
            } catch (QueryException $e) {
                return response()->json([
                    'error' => 'Internal Server Error',
                    'message' => $e->getMessage()
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }
    }

    public function show($id)
    {
        $product_catalog = ProductCatalog::where('CatalogId', $id)->first();

        if (!$product_catalog) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        return response()->json($product_catalog);
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy($id)
    {
        $catalog = ProductCatalog::where('CatalogId', $id)->first();
        if ($catalog) {
            $catalog->delete();
            return response()->json([
                'message' => 'Catalog deleted successfully.',
            ], Response::HTTP_OK);
        }else{
            return response()->json([
                'message' => 'error.',
            ], Response::HTTP_BAD_REQUEST);
        }
    }
}
