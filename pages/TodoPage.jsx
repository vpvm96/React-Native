import { useCallback, useEffect, useState } from "react"
import { Alert } from "react-native"
import TodoHeader from "../components/todo/TodoHeader"
import TodoBody from "../components/todo/TodoBody"
import TodoService from "../api/todoService"
import styled from "@emotion/native"

const TodoPage = () => {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState("")
  const [category, setCategory] = useState("")

  useEffect(() => {
    TodoService.firebaseGetTodosRequest(setTodos)
    TodoService.firebaseGetCategoryRequest(setCategory)
  }, [])

  const handleTextChange = useCallback((text) => {
    setText(text)
  }, [])

  const handleStatusPress = async (updated) => {
    await TodoService.firebaseChangeIsDoneStatus(updated.id, updated.isDone)
  }

  const handleTodoSubmit = async () => {
    const newTodo = {
      text,
      category,
      isDone: false,
      createdAt: Date.now(),
    }
    await TodoService.firebaseCreatedTodoRequest(newTodo)
    setText("")
  }

  const handleTodoUpdated = async (updated) => {
    await TodoService.firebaseUpdatedTodoRequest(updated.id, updated.editText)
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
          onPress: async () =>
            await TodoService.firebaseDeletedTodoRequest(deleted),
        },
      ])
    }
  }

  const handleTodoCategoriesPress = (category) => async () => {
    setCategory(category)
    await TodoService.firebaseUpdatedCategoryRequest(category)
  }

  return (
    <TodoPageContainer>
      <TodoHeader
        text={text}
        category={category}
        onTextChangeEvent={handleTextChange}
        onTodoSubmitEvent={handleTodoSubmit}
        onTodoCategoriesPressEvent={handleTodoCategoriesPress}
      />
      <TodoBody
        todos={todos}
        category={category}
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
