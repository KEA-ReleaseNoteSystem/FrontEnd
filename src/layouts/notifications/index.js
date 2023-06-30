import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialItems = [
  { id: "1", content: "Task 1", status: "todo" },
  { id: "2", content: "Task 2", status: "todo" },
  { id: "3", content: "Task 3", status: "inprogress" },
  { id: "4", content: "Task 4", status: "done" },
];

const statuses = ["todo", "inprogress", "done"];

function KanbanBoard() {
  const [items, setItems] = useState(initialItems);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(source.index, 1);
    reorderedItem.status = statuses[destination.droppableId];
    newItems.splice(destination.index, 0, reorderedItem);

    setItems(newItems);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="board">
        {statuses.map((status, index) => (
          <Droppable droppableId={String(index)} key={index}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="column"
              >
                <h3>{status}</h3>
                {items
                  .filter((item) => item.status === status)
                  .map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="item"
                        >
                          {item.content}
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

export default KanbanBoard;