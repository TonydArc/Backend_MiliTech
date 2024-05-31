<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run()
    {
        DB::table('products')->insert([
            ['product_name' => 'Smartphone', 'price' => 299.99, 'quantity' => 50, 'catalog_id' => 1],
            ['product_name' => 'Laptop', 'price' => 799.99, 'quantity' => 30, 'catalog_id' => 1],
            ['product_name' => 'Fiction Novel', 'price' => 19.99, 'quantity' => 100, 'catalog_id' => 2],
            ['product_name' => 'Non-fiction Book', 'price' => 24.99, 'quantity' => 80, 'catalog_id' => 2],
            ['product_name' => 'Men T-Shirt', 'price' => 9.99, 'quantity' => 200, 'catalog_id' => 3],
            ['product_name' => 'Women Dress', 'price' => 29.99, 'quantity' => 150, 'catalog_id' => 3],
            ['product_name' => 'Microwave Oven', 'price' => 89.99, 'quantity' => 40, 'catalog_id' => 4],
            ['product_name' => 'Refrigerator', 'price' => 499.99, 'quantity' => 10, 'catalog_id' => 4],
            ['product_name' => 'Basketball', 'price' => 14.99, 'quantity' => 60, 'catalog_id' => 5],
            ['product_name' => 'Tennis Racket', 'price' => 89.99, 'quantity' => 20, 'catalog_id' => 5],
        ]);
    }
}

