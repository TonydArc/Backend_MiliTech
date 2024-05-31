<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    use HasFactory;

    protected $table = 'paymentmethods';

    protected $fillable = [
        'MethodId',
        'MethodName',
        'Description',
    ];

    // Relationships
    public function orderdetail()
    {
        return $this->hasMany(OrderDetail::class);
    }
}
