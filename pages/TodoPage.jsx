import { useCallback, useEffect, useState } from "react"
import { Alert } from "react-native"
import uuid from "react-native-uuid"
import AsyncStorage from "@react-native-async-storage/async-storage"
import TodoHeader from "../components/todo/TodoHeader"
import TodoBody from "../components/todo/TodoBody"
import styled from "@emotion/native"

const TodoPage = () => {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState("")
  const [categories, setCategories] = useState("")

  useEffect(() => {
    const saveTodos = async () => {
      await AsyncStorage.setItem("todos", JSON.stringify(todos))
    }
    if (todos.length > 0) saveTodos()
  }, [todos])

  useEffect(() => {
    const getTodos = async () => {
      const res_todos = await AsyncStorage.getItem("todos")
      const res_category = await AsyncStorage.getItem("category")

      setTodos(JSON.parse(res_todos) ?? [])
      setCategories(res_category ?? "javascript")
    }
    getTodos()
  }, [])

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

  const handleTodoDeletePress = (deleted, status) => () => {
    if (status) {
      Alert.alert("삭제불가", "완료된 Todo 목록은 삭제할 수 없습니다.", [
        {
          text: "확인",
          style: "default",
        },
      ])
    } else {
      Alert.alert("Todo삭제", "정말 삭제하시겠습니까?", [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "삭제",
          style: "destructive",
          onPress: () => setTodos(todos.filter((todo) => todo.id !== deleted)),
        },
      ])
    }
  }

  const handleTodoCategoriesPress = (categories) => async () => {
    setCategories(categories)
    await AsyncStorage.setItem("category", categories)
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
