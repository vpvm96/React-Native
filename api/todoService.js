import { fireStore } from "./firebaseService"
import {
  query,
  collection,
  onSnapshot,
  orderBy,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"

const TodoService = {}

TodoService.firebaseGetCategoryRequest = async (setCategory) => {
  const snapshot = await getDoc(doc(fireStore, "category", "currentCategory"))
  setCategory(snapshot.data().category)
}

TodoService.firebaseUpdatedCategoryRequest = async (category) => {
  await updateDoc(doc(fireStore, "category", "currentCategory"), {
    category,
  })
  return true
}

TodoService.firebaseGetTodosRequest = (setTodos) => {
  const q = query(collection(fireStore, "todos"), orderBy("createdAt", "desc"))

  onSnapshot(q, (snapshot) => {
    const newTodos = snapshot.docs.map((doc) => {
      const newTodo = {
        id: doc.id,
        ...doc.data(),
      }
      return newTodo
    })
    setTodos(newTodos)
  })
}

TodoService.firebaseCreatedTodoRequest = async (newTodo) => {
  await addDoc(collection(fireStore, "todos"), newTodo)
}

TodoService.firebaseDeletedTodoRequest = async (todoId) => {
  await deleteDoc(doc(fireStore, "todos", todoId))
}

TodoService.firebaseUpdatedTodoRequest = async (todoId, editText) => {
  await updateDoc(doc(fireStore, "todos", todoId), {
    text: editText,
  })
}

TodoService.firebaseChangeIsDoneStatus = async (todoId, isDone) => {
  await updateDoc(doc(fireStore, "todos", todoId), {
    isDone,
  })
}

export default TodoService
