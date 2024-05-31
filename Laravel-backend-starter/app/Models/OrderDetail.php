<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;

    protected $table = 'orderdetail';
    protected $primaryKey = 'OrderItemId';

    // Define the fillable fields for mass assignment
    protected $fillable = [
        'OrderId',
        'ProductId',
        'Quantity',
        'Price',
        'Address',
        'MethodId',
    ];

    // Relationships
    public function order()
    {
        return $this->belongsTo(Order::class, 'OrderId');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'ProductId');
    }

    public function payment()
    {
        return $this->belongsTo(PaymentMethod::class, 'MethodId');
    }
    public $timestamps = false;
}
