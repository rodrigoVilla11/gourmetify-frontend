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
    paymentMethod: string;
    setPaymentMethod: (v: string) => void;
    notes: string;
    setNotes: (v: string) => void;
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
    paymentMethod,
    setPaymentMethod,
    notes,
    setNotes,
  }: Props) {
    return (
      <div className="space-y-6">
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
  
        {/* Método de pago */}
        <div className="max-w-sm">
          <label className="text-sm font-medium">Método de pago</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
          >
            <option value="Efectivo">💵 Efectivo</option>
            <option value="Tarjeta">💳 Tarjeta</option>
            <option value="Transferencia">🪙 Transferencia / QR</option>
            <option value="Cripto">💲 Cripto (USDT)</option>
          </select>
        </div>
  
        {/* Notas adicionales */}
        <div className="max-w-xl">
          <label className="text-sm font-medium">Notas adicionales</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
            placeholder="Ej: sin cebolla, entregar a las 22 hs..."
          />
        </div>
      </div>
    );
  }
  