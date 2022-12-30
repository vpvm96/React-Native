import { useCallback, useState } from "react"
import uuid from "react-native-uuid"
import TodoHeader from "../components/todo/TodoHeader"
import TodoBody from "../components/todo/TodoBody"
import styled from "@emotion/native"

const TodoPage = () => {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState("")
  const [categories, setCategories] = useState("javascript")
  const [isDone] = useState(false)

  const handleTextChange = useCallback((text) => {
    setText(text)
  }, [])

  const handleStatusPress = (updated) => {
    setTodos(todos.map((todo) => (todo.id === updated.id ? updated : todo)))
  }

  const handleTodoSubmit = () => {
    setTodos((prev) => [
      ...prev,
      { id: uuid.v4(), title: text, categories, isDone: false },
    ])
    setText("")
  }

  const handleTodoUpdated = (updated) => {
    setTodos(
      todos.map((todo) =>
        todo.id === updated.id ? { ...updated, title: updated.editText } : todo
      )
    )
  }

  const handleTodoDeletePress = (deleted) => () => {
    setTodos(todos.filter((todo) => todo.id !== deleted))
  }

  const handleTodoCategoriesPress = (categories) => () => {
    setCategories(categories)
  }

  return (
    <TodoPageContainer>
      <TodoHeader
        text={text}
        categories={categories}
        onTextChangeEvent={handleTextChange}
        onTodoSubmitEvent={handleTodoSubmit}
        onTodoCategoriesPressEvent={handleTodoCategoriesPress}
      />
      <TodoBody
        todos={todos}
        isDone={isDone}
        categories={categories}
        onStatusPressEvent={handleStatusPress}
        onTodoUpdatedEvent={handleTodoUpdated}
        onDeleteTodoPressEvent={handleTodoDeletePress}
      />
    </TodoPageContainer>
  )
}

const TodoPageContainer = styled.View`
  width: 90%;
  margin: 0 auto;
`

export default TodoPage
