<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductDetail extends Model
{
    use HasFactory;
    protected $table = 'productdetail';
    protected $primaryKey = 'DetailId';

    protected $fillable = [
        'ProductId',
        'Brand',
        'Model',
        'Processor',
        'RAMSize',
        'StorageSize',
        'GraphicsCard',
        'ReleaseDate',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'ProductId');
    }
    public $timestamps = false;
}
