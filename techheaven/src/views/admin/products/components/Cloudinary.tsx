import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

interface Product {
    ProductId: number;
    ProductName: string;
    ImageURL: string; // Assuming ImageURL is a string
    Price: number;
    Quantity: number;
    CatalogId: number;
    CatalogName: string;
}

interface EditProps {
    product: Product;
}

const App: React.FC<EditProps> = ({ product }) => {
    const cld = new Cloudinary({ cloud: { cloudName: 'dbsou9jps' } });

    const img = cld.image(product.ImageURL)
        .resize(auto().gravity(autoGravity()).width(180).height(130))
        .format('auto')
        .quality('auto');

    return <AdvancedImage cldImg={img} />;
};

export default App;
