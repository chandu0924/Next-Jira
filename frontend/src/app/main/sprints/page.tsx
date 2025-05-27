"use client"

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { useState } from "react"

const initialData = {
  todo: [
    { id: "task-1", content: "Design UI" },
    { id: "task-2", content: "Setup DB Schema" },
  ],
  inprogress: [
    { id: "task-3", content: "Write APIs" }
  ],
  completed: [
    { id: "task-4", content: "Project Setup" }
  ]
}

export default function SprintsPage() {
  const [tasks, setTasks] = useState(initialData)

  const onDragEnd = (result: any) => {
    const { source, destination } = result

    if (!destination) return

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    const sourceCol = [...tasks[source.droppableId]]
    const destCol = [...tasks[destination.droppableId]]
    const [movedTask] = sourceCol.splice(source.index, 1)

    if (source.droppableId === destination.droppableId) {
      sourceCol.splice(destination.index, 0, movedTask)
      setTasks(prev => ({
        ...prev,
        [source.droppableId]: sourceCol
      }))
    } else {
      destCol.splice(destination.index, 0, movedTask)
      setTasks(prev => ({
        ...prev,
        [source.droppableId]: sourceCol,
        [destination.droppableId]: destCol
      }))
    }
  }

  const columnStyle = {
    flex: 1,
    margin: "0 10px",
    background: "#f5f5f5",
    borderRadius: "8px",
    padding: "10px",
    minHeight: "400px"
  }

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <DragDropContext onDragEnd={onDragEnd}>
        {["todo", "inprogress", "completed"].map((colId) => (
          <Droppable droppableId={colId} key={colId}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={columnStyle}
              >
                <h2 style={{ textTransform: "capitalize" }}>{colId.replace("inprogress", "In Progress")}</h2>
                {tasks[colId].map((task, index) => (
                  <Draggable draggableId={task.id} index={index} key={task.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: "none",
                          padding: 16,
                          marginBottom: 8,
                          backgroundColor: snapshot.isDragging ? "#b3cde0" : "#fff",
                          borderRadius: "6px",
                          boxShadow: snapshot.isDragging ? "0 2px 6px rgba(0,0,0,0.2)" : "none",
                          ...provided.draggableProps.style
                        }}
                      >
                        {task.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  )
}
