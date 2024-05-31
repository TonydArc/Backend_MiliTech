<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Requests;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class AccountController extends Controller
{
    public function profile()
    {
        return response()->json([
            'data' => auth()->user()
        ], Response::HTTP_OK);
    }
}

