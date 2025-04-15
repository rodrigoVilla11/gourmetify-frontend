"use client";

import { useState } from "react";
import { PriceListUploader, PriceListItem } from "@/components/purchases/PriceListUploader";
import { PriceListTable } from "@/components/purchases/PriceListTable";
import { WhatsAppPreview } from "@/components/purchases/WhatsAppPreview";

export default function PurchasesPage() {
  const [priceList, setPriceList] = useState<PriceListItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [providerName, setProviderName] = useState<string>("");

  return (
    <div className="p-4 md:p-8 space-y-6">
      <h1 className="text-2xl font-bold text-primary">Orden de compra</h1>

      <PriceListUploader
        onImport={(items) => {
          setPriceList(items);
          if (items.length > 0) setProviderName(items[0].provider);
        }}
      />

      {priceList.length > 0 && (
        <PriceListTable items={priceList} onChange={setSelectedItems} />
      )}

      {selectedItems.length > 0 && (
        <WhatsAppPreview items={selectedItems} providerName={providerName} />
      )}
    </div>
  );
}