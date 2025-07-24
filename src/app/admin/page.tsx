
import OrderList from "@/components/admin/order-list";

export default function AdminPage() {
    return (
        <div>
            <h1 className="font-headline text-3xl text-primary mb-6">Pending Orders</h1>
            <OrderList status="pending" />
        </div>
    );
}
