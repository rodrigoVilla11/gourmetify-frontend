// components/sales/CustomerForm.tsx
type Props = {
    customerName: string;
    setCustomerName: (v: string) => void;
    view: "mostrador" | "delivery";
    deliveryPhone: string;
    setDeliveryPhone: (v: string) => void;
    deliveryAddress: string;
    setDeliveryAddress: (v: string) => void;
    shippingCost: number;
    setShippingCost: (v: number) => void;
  };
  
  export function CustomerForm({
    customerName,
    setCustomerName,
    view,
    deliveryPhone,
    setDeliveryPhone,
    deliveryAddress,
    setDeliveryAddress,
    shippingCost,
    setShippingCost,
  }: Props) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
        <div>
          <label className="text-sm font-medium">Nombre del cliente</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-sm"
          />
        </div>
  
        {view === "delivery" && (
          <>
            <div>
              <label className="text-sm font-medium">Teléfono</label>
              <input
                type="text"
                value={deliveryPhone}
                onChange={(e) => setDeliveryPhone(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Dirección</label>
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Costo de envío</label>
              <input
                type="number"
                value={shippingCost}
                onChange={(e) => setShippingCost(parseFloat(e.target.value))}
                className="w-full px-3 py-2 border rounded-md text-sm"
              />
            </div>
          </>
        )}
      </div>
    );
  }
  