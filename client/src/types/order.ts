export interface Order {
    id: string;
    customerName: string;
    customerEmail: string;
    customer: string;
    total: number;
    amount: number;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    date: string;
    items: Array<{
        id: string;
        name: string;
        quantity: number;
        price: number;
    }>;
}
