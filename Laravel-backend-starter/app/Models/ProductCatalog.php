<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductCatalog extends Model
{
    use HasFactory;

    protected $table = 'productcatalog';
    protected $primaryKey = 'CatalogId';

    protected $fillable = [
        'CatalogName',
        'Description',
    ];

    public function products()
    {
        return $this->hasMany(Product::class, 'CatalogID');
    }
    public $timestamps = false;
}

