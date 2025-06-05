"use client"

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { useEffect, useState } from "react"
import axios from "axios"
import styles from "./sprint.module.css"

export default function SprintsPage() {
  const [tasks, setTasks] = useState({
    ToDo: [],
    InProgress: [],
    Completed: []
  })

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects`)
        const projects = res.data

        const groupedTasks = {
          ToDo: [],
          InProgress: [],
          Completed: []
        }

        projects.forEach((proj) => {
          // const task = {
          //   id: proj._id,
          //   content: proj.title
          // }
          const task = {
            id: proj._id,
            title: proj.title,
            description: proj.description,
            status: proj.status,
            priority: proj.priority,
            assignee: proj.assignee,
            assignedBy: proj.assignedBy
          }

          // const status = proj.status.toLowerCase()

          if (proj.status === "ToDo") {
            groupedTasks.ToDo.push(task)
          } else if (proj.status === "InProgress") {
            groupedTasks.InProgress.push(task)
          } else if (proj.status === "Completed") {
            groupedTasks.Completed.push(task)
          }
          
        })

        setTasks(groupedTasks)
      } catch (err) {
        console.error("Failed to fetch projects:", err)
      }
    }

    fetchTasks()
  }, [])

  const onDragEnd = async (result: any) => {
    const { source, destination } = result;
  
    if (!destination) return;
  
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
  
    const sourceCol = [...tasks[source.droppableId]];
    const destCol = [...tasks[destination.droppableId]];
    const [movedTask] = sourceCol.splice(source.index, 1);
  
    // Update frontend state
    if (source.droppableId === destination.droppableId) {
      sourceCol.splice(destination.index, 0, movedTask);
      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: sourceCol,
      }));
    } else {
      // Update task status before setting state
      const updatedTask = { ...movedTask, status: destination.droppableId };
      destCol.splice(destination.index, 0, updatedTask);
      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: sourceCol,
        [destination.droppableId]: destCol,
      }));
  
      // ✅ Make PATCH request to update status in backend
      try {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${movedTask.id}/status`,
          {
            status: destination.droppableId
          }
        );
      } catch (err) {
        console.error("Failed to update project status:", err);
      }
    }
  };
  
  return (
    <div className={styles.container}>
      <DragDropContext onDragEnd={onDragEnd}>
        {["ToDo", "InProgress", "Completed"].map((colId) => (
          <Droppable droppableId={colId} key={colId}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={styles.column}
              >
                <h2 className={styles.columnTitle}>
                  {colId}
                </h2>
                {tasks[colId].map((task, index) => (
                  <Draggable draggableId={task.id} index={index} key={task.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`${styles.taskCard} ${snapshot.isDragging ? styles.taskCardDragging : ""}`}
                      >
                        {/* {task.content} */}
                        <div className={styles.taskHeader}><strong>{task.title}</strong></div>
                        <div className={styles.taskInfo}><em>{task.description}</em></div>
                        <div className={styles.taskMeta}>
                          <p>Status: {task.status}</p>
                          <p>Priority: {task.priority}</p>
                          <p>Assignee: {task.assignee}</p>
                          <p>Assigned By: {task.assignedBy}</p>
                        </div>
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
