<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';
    protected $primaryKey = 'OrderId';

    protected $fillable = [
        'CustomerId', 
        'OrderDate',
        'StatusId', 
        'TotalAmount', 
    ];

    public function detail()
    {
        return $this->hasOne(OrderDetail::class, 'OrderId');
    }
    public function customer()
    {
        return $this->belongsTo(Customer::class, 'CustomerId');
    }
    public function status()
    {
        return $this->belongsTo(OrderStatus::class, 'StatusId');
    }

    public $timestamps = false;
}
