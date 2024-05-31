<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    protected $table = 'customers';
    protected $primaryKey = 'CustomerId';

    protected $fillable = [
        'FirstName', 
        'LastName', 
        'Email', 
        'Phone', 
        'Address',
        'id',
    ];
    public function order()
    {
        return $this->hasMany(Order::class, 'CustomerId');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'id');
    }
    public $timestamps = false;
}
