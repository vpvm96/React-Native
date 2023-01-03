import { useState } from "react"
import { Alert } from "react-native"
import { FontAwesome, AntDesign, Feather } from "@expo/vector-icons"
import styled from "@emotion/native"

const TodoContent = ({
  todo,
  onStatusPressEvent,
  onTodoUpdatedEvent,
  onDeleteTodoPressEvent,
}) => {
  const { id, text, isDone } = todo
  const [isEdit, setIsEdit] = useState(false)
  const [editText, setEditText] = useState("")

  const handleStatusPress = (isDone) => () => {
    onStatusPressEvent({ ...todo, isDone })
  }

  const handleTodoUpdated = () => {
    onTodoUpdatedEvent({ ...todo, editText })
    setEditText("")
    setIsEdit(false)
  }

  const handleTodoEditChange = (editText) => {
    setEditText(editText)
  }

  const handleEditTodoPress = () => {
    if (isDone) {
      Alert.alert("삭제불가", "완료된 Todo 목록은 삭제할 수 없습니다.", [
        {
          text: "확인",
          style: "default",
        },
      ])
    } else {
      setIsEdit(!isEdit)
      setEditText(text)
    }
  }

  return (
    <TodoContentWrap>
      <TodoContentContainer>
        {!isEdit ? (
          <TodoContentTextBox>
            {!isDone ? (
              <TodoContentText>{text}</TodoContentText>
            ) : (
              <TodoContentCompletedText>{text}</TodoContentCompletedText>
            )}
          </TodoContentTextBox>
        ) : (
          <TodoContentTextBox>
            <TodoContentEditInput
              placeholder="Enter your edit task"
              value={editText}
              onChangeText={handleTodoEditChange}
              onSubmitEditing={handleTodoUpdated}
            />
          </TodoContentTextBox>
        )}
        <TodoContentButtonBox>
          {!isDone ? (
            <TodoContentButton onPress={handleStatusPress(true)}>
              <AntDesign name="checksquareo" size={24} color="black" />
            </TodoContentButton>
          ) : (
            <TodoContentButton onPress={handleStatusPress(false)}>
              <AntDesign name="checksquare" size={24} color="black" />
            </TodoContentButton>
          )}
          <TodoContentButton onPress={handleEditTodoPress}>
            <Feather name="edit" size={24} color="black" />
          </TodoContentButton>
          <TodoContentButton onPress={onDeleteTodoPressEvent(id, isDone)}>
            <FontAwesome name="trash-o" size={24} color="black" />
          </TodoContentButton>
        </TodoContentButtonBox>
      </TodoContentContainer>
    </TodoContentWrap>
  )
}

const TodoContentWrap = styled.View`
  width: 100%;
  align-items: center;
  margin-top: 15px;
`
const TodoContentContainer = styled.View`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #d3d3d3;
`

const TodoContentTextBox = styled.View`
  width: 65%;
  display: flex;
`

const TodoContentButtonBox = styled.View`
  width: 25%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`
const TodoContentButton = styled.TouchableOpacity``

const TodoContentText = styled.Text``

const TodoContentCompletedText = styled.Text`
  color: grey;
  text-decoration: line-through;
`

const TodoContentEditInput = styled.TextInput`
  width: 95%;
  height: 40px;
  border: 2px solid gray;
  padding-left: 10px;
  background-color: white;
`

export default TodoContent
