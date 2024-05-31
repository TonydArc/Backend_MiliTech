<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Resources\UserResource;
use App\Models\Customer;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;


class UserController extends Controller
{

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'response' => Response::HTTP_BAD_REQUEST,
                'success' => false,
                'message' => $validator->errors(),
            ], Response::HTTP_BAD_REQUEST);
        }else{
            try {
                $user = new User;
                $user->name  = $request->name;
                $user->email  = $request->email;
                $user->password  = Hash::make($request->password);
                $user->remember_token  = Str::random(60);
                $user->role  = 'admin';
                $user->save();
                return response()->json([
                    'response' => Response::HTTP_CREATED,
                    'success' => true,
                    'message' => 'Create user',
                    'data' => $request->all()
                ], Response::HTTP_CREATED);
                
            } catch (QueryException $e) {
                return response()->json([
                    'response' => Response::HTTP_INTERNAL_SERVER_ERROR,
                    'success' => false,
                    'message' => $e->getMessage(),
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }
    }

    public function read()
    {
        try {
            $respons = Customer::all();
            return response()->json([
                'response' => Response::HTTP_OK,
                'success' => true,
                'message' => 'Read all user',
                // 'data' => UserResource::collection($respons)
                'data' => $respons
            ], Response::HTTP_OK);
            
        } catch (QueryException $e) {
            return response()->json([
                'response' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'success' => false,
                'message' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update($id, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email,',
            'photo' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'response' => Response::HTTP_BAD_REQUEST,
                'success' => false,
                'message' => $validator->errors(),
            ], Response::HTTP_BAD_REQUEST);
        }else{
            try {
                $user =  User::findOrFail($id);;
                $user->name  = $request->name;
                $user->email  = $request->email;
                if($request->hasFile('photo')){
                    $imagePath = $request->file('photo')->getRealPath();
                    $result = Cloudinary::upload($imagePath,  ['folder' => 'user']);
                    $imageUrl = $result->getSecurePath();
                    $user->photo  = $imageUrl;
                }
                $user->save();
                return response()->json([
                    'response' => Response::HTTP_OK,
                    'success' => true,
                    'message' => 'update user by id ' . $id,
                    'data' => $request->all()
                ], Response::HTTP_OK);
                
            } catch (QueryException $e) {
                return response()->json([
                    'response' => Response::HTTP_INTERNAL_SERVER_ERROR,
                    'success' => false,
                    'message' => $e->getMessage(),
                    'data' => $request->all()
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }
    }

    public function destroy($id)
    {
        try {
            User::destroy($id);
            return response()->json([
                'response' => Response::HTTP_OK,
                'success' => true,
                'message' => 'Delete user by id ' . $id,
            ], Response::HTTP_OK);
            
        } catch (QueryException $e) {
            return response()->json([
                'response' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'success' => false,
                'message' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // public function search(Request $request){
    //     try {
    //         $keyword = $request->input('keyword');
    //         $respons = User::where('name', 'like', "%$keyword%")->get();
    //         return response()->json([
    //             'response' => Response::HTTP_OK,
    //             'success' => true,
    //             'message' => 'Read user like '.$keyword,
    //             'data' => UserResource::collection($respons)
    //         ], Response::HTTP_OK
    //     );
            
    //     } catch (QueryException $e) {
    //         return response()->json([

    //             'response' => Response::HTTP_INTERNAL_SERVER_ERROR,
    //             'success' => false,
    //             'message' => $e->getMessage(),
    //         ], Response::HTTP_INTERNAL_SERVER_ERROR);
    //     }
    // }
}
