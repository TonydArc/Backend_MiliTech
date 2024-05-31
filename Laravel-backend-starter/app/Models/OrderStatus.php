<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderStatus extends Model
{
    use HasFactory;

    protected $table = 'orderstatus';

    protected $primaryKey = 'StatusId';

    public $timestamps = false;

    protected $fillable = [
        'Status', 
        'DateUpdated'
    ];

    public function order()
    {
        return $this->hasOne(Order::class, 'StatusId');
    }
}
