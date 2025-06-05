"use client"

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { useEffect, useState } from "react"
import axios from "axios"
import styles from "./sprint.module.css"

export default function SprintsPage() {
  const [tasks, setTasks] = useState({
    todo: [],
    inprogress: [],
    completed: []
  })

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects`)
        const projects = res.data

        const groupedTasks = {
          todo: [],
          inprogress: [],
          completed: []
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

          const status = proj.status.toLowerCase()

          if (status === "to do" || status === "todo") {
            groupedTasks.todo.push(task)
          } else if (status === "in progress" || status === "inprogress") {
            groupedTasks.inprogress.push(task)
          } else if (status === "completed") {
            groupedTasks.completed.push(task)
          }
        })

        setTasks(groupedTasks)
      } catch (err) {
        console.error("Failed to fetch projects:", err)
      }
    }

    fetchTasks()
  }, [])

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

    // Optional: Update status in DB via PUT request
    // axios.put(`/api/projects/${movedTask.id}`, { status: destination.droppableId })
  }

  return (
    <div className={styles.container}>
      <DragDropContext onDragEnd={onDragEnd}>
        {["todo", "inprogress", "completed"].map((colId) => (
          <Droppable droppableId={colId} key={colId}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={styles.column}
              >
                <h2 className={styles.columnTitle}>
                  {colId === "inprogress" ? "In Progress" : colId.charAt(0).toUpperCase() + colId.slice(1)}
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
