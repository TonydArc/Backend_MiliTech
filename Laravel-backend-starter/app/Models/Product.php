<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';
    protected $primaryKey = 'ProductId';

    protected $fillable = [
        'ProductName',
        'Price',
        'Quantity',
        'CatalogId',
    ];

    public function catalog()
    {
        return $this->belongsTo(ProductCatalog::class, 'CatalogId');
    }
    public function orderdetail()
    {
        return $this->belongsTo(ProductCatalog::class, 'ProductId');
    }
    public function detail()
    {
        return $this->hasOne(ProductDetail::class, 'ProductId');
    }
    public $timestamps = false;
}
