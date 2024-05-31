<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductCatalogSeeder extends Seeder
{
    public function run()
    {
        DB::table('product_catalog')->insert([
            ['catalog_name' => 'Electronics', 'description' => 'Devices and gadgets'],
            ['catalog_name' => 'Books', 'description' => 'Various genres of books'],
            ['catalog_name' => 'Clothing', 'description' => 'Men and Women apparel'],
            ['catalog_name' => 'Home Appliances', 'description' => 'Household electrical appliances'],
            ['catalog_name' => 'Sports', 'description' => 'Sporting goods and equipment'],
        ]);
    }
}

