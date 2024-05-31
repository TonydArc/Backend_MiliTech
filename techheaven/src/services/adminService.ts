import axios from 'axios';
import { getAccessToken } from './untils';

const API_URL = 'http://127.0.0.1:8000/api/';

//products
export async function getProducts() {
    const token = getAccessToken();
    try {
        const products = await axios.get(API_URL + `products`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return products.data;
    } catch (error) {
        throw error;
    }
}
export async function getProductsDetail(id: number) {
    const token = getAccessToken();
    try {
        const products = await axios.get(API_URL + `products/` + id, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return products.data;
    } catch (error) {
        throw error;
    }
}
export async function deleteProducts(id: number) {
    const token = getAccessToken();
    try {
        const response = await axios.delete(API_URL + `products/` + id, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
export async function createProducts(formdata: {
    'ProductName': string,
    'Quantity': number,
    'Price': number,
    'ImageURL': string,
    'CatalogId': number,
    'Brand': string,
    'GraphicsCard': string,
    'Model': string,
    'Processor': string,
    'RAMSize': number,
    'ReleaseDate': string,
    'StorageSize': number,
}) {
    const token = getAccessToken();
    try {
        const products = await axios.post(API_URL + `products`, formdata, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return products.data;
    } catch (error) {
        throw error;
    }
}
export async function updateProducts(id: number, formdata: {
    'ProductName': string,
    'Quantity': number,
    'Price': number,
    'CatalogId': any,
    'Brand': string,
    'Model': string,
    'Processor': string,
    'GraphicsCard': string,
    'RAMSize': number,
    'StorageSize': number,
}) {
    const token = getAccessToken();
    try {
        const products = await axios.put(API_URL + `products/` + id, formdata, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return products.data;
    } catch (error) {
        throw error;
    }
}


//catalogs
export async function getCatalogs() {
    const token = getAccessToken();
    try {
        const catalogs = await axios.get(API_URL + `products_catalog`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return catalogs.data;
    } catch (error) {
        throw error;
    }
}

export async function createCatalogs(formdata: {
    'CatalogName': string,
    'Description': string,
}) {
    const token = getAccessToken();
    try {
        const catalogs = await axios.post(API_URL + `products_catalog`, formdata, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return catalogs.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteCatalogs(id: number) {
    const token = getAccessToken();
    try {
        const response = await axios.delete(API_URL + `products_catalog/` + id, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}


//users
export async function getUsers() {
    const token = getAccessToken();
    try {
        const users = await axios.get(API_URL + `users`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return users.data.data;
    } catch (error) {
        throw error;
    }
}

//orders
export async function getOrders() {
    const token = getAccessToken();
    try {
        const oders = await axios.get(API_URL + `orders`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return oders.data;
    } catch (error) {
        throw error;
    }
}
export async function getOrderDetail(id: number) {
    const token = getAccessToken();
    try {
        const order = await axios.get(API_URL + `order/` + id, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return order.data;
    } catch (error) {
        throw error;
    }
}
export async function updateOrder(id: number, formdata: {
    'StatusId': number,
    'TotalAmount': string,
    'Quantity': number,
    'Address': string
}) {
    const token = getAccessToken();
    try {
        const order = await axios.put(API_URL + `order/` + id, formdata, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return order.data;
    } catch (error) {
        throw error;
    }
}