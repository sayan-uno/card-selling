
import OrderList from "@/components/admin/order-list";

export default function DeniedOrdersPage() {
    return (
        <div>
            <h1 className="font-headline text-3xl text-primary mb-6">Denied Orders</h1>
            <OrderList status="denied" />
        </div>
    );
}
