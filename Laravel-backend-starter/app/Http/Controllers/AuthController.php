<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'forget', 'reset']]);
    }


    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'FirstName' => 'required',
            'LastName' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'response' => Response::HTTP_BAD_REQUEST,
                'success' => false,
                'message' => $validator->errors(),
            ], Response::HTTP_BAD_REQUEST);
        } else {
            try {
                $user = new User;
                $user->name  = $request->name;
                $user->email  = $request->email;
                $user->password  = Hash::make($request->password);
                $user->remember_token  = Str::random(60);
                $user->role  = 'customer';
                $user->save();

                $customer = new Customer();
                $customer->FirstName = $request->FirstName; 
                $customer->LastName = $request->LastName; 
                $customer->Email = $user->email; 
                $user->customer()->save($customer);

                return response()->json([
                    'response' => Response::HTTP_CREATED,
                    'success' => true,
                    'message' => 'Register successfully.',
                    'data' => $request->all()
                ], Response::HTTP_CREATED);
            } catch (\Exception $e) {
                return response()->json([
                    'response' => Response::HTTP_INTERNAL_SERVER_ERROR,
                    'success' => false,
                    'message' => $e->getMessage(),
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }
    }



    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'response' => Response::HTTP_BAD_REQUEST,
                'success' => false,
                'message' => $validator->errors(),
            ], Response::HTTP_BAD_REQUEST);
        } else {
            try {
                if (!$token = auth()->attempt($request->all())) {
                    return response()->json([
                        'response' => Response::HTTP_UNAUTHORIZED,
                        'success' => false,
                        'message' => 'Username or password wrong',
                    ], Response::HTTP_UNAUTHORIZED);
                }
                return $this->respondWithToken($token);
            } catch (QueryException $e) {
                return response()->json([
                    'response' => Response::HTTP_INTERNAL_SERVER_ERROR,
                    'success' => false,
                    'message' => $e->getMessage(),
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }
    }

    public function profile()
    {
        return response()->json([
            'data' => auth()->user()
        ], Response::HTTP_OK);
    }

    public function logout()
    {
        auth()->logout();
        return response()->json([
            'response' => Response::HTTP_OK,
            'success' => true,
            'message' => 'Successfully logged out',
        ], Response::HTTP_OK);
    }

    public function refresh()
    {
        return $this->respondWithToken(Auth::refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60
        ], Response::HTTP_OK);
    }
}
