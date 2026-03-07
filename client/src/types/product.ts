export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    cost: number;
    stock: number;
    sku: string;
    category: string;
    status: "active" | "draft" | "archived";
    published: boolean;
    createdAt: string;
}
