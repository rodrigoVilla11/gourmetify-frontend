"use client";

import { Order } from "@/data/orders";
import { OrderCard } from "@/components/orders/OrderCard";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

interface Props {
  orders: Order[];
  onNextStatus: (id: string, newStatus: Order["status"]) => void;
}

const statusOrder: Order["status"][] = ["pending", "preparing", "ready"];

const statusStyles: Record<Order["status"], string> = {
  pending: "bg-yellow-50 border-yellow-400",
  preparing: "bg-blue-50 border-blue-400",
  ready: "bg-green-50 border-green-400",
  delivered: "bg-gray-100 border-gray-300",
};

export function OrderList({ orders, onNextStatus }: Props) {
  const grouped = statusOrder.reduce((acc, status) => {
    acc[status] = orders.filter((o) => o.status === status);
    return acc;
  }, {} as Record<Order["status"], Order[]>);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;

    const newStatus = destination.droppableId as Order["status"];
    onNextStatus(draggableId, newStatus);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {statusOrder.map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided:any) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`space-y-4 p-4 rounded-xl ring-1 ${statusStyles[status]}`}
              >
                <h3 className="text-lg font-semibold text-primary capitalize">
                  {status === "pending"
                    ? "🕐 Pendientes"
                    : status === "preparing"
                    ? "👨‍🍳 En preparación"
                    : "✅ Listos para entregar"}
                </h3>

                {grouped[status].map((order, index) => (
                  <Draggable key={order.id} draggableId={order.id} index={index}>
                    {(drag:any) => (
                      <div
                        ref={drag.innerRef}
                        {...drag.draggableProps}
                        {...drag.dragHandleProps}
                      >
                        <OrderCard order={order} onNextStatus={() => {}} />
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}