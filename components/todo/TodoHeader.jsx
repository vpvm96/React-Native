import styled from "@emotion/native"

const TodoHeader = ({
  text,
  categories,
  onTextChangeEvent,
  onTodoSubmitEvent,
  onTodoCategoriesPressEvent,
}) => {
  return (
    <TodoHeaderWrap>
      <TodoHeaderButtonBox>
        <TodoHeaderButton
          active={categories === "javascript"}
          onPress={onTodoCategoriesPressEvent("javascript")}
        >
          <TodoHeaderText>Javascript</TodoHeaderText>
        </TodoHeaderButton>
        <TodoHeaderButton
          active={categories === "react"}
          onPress={onTodoCategoriesPressEvent("react")}
        >
          <TodoHeaderText>React</TodoHeaderText>
        </TodoHeaderButton>
        <TodoHeaderButton
          active={categories === "codingtest"}
          onPress={onTodoCategoriesPressEvent("codingtest")}
        >
          <TodoHeaderText>Coding Test</TodoHeaderText>
        </TodoHeaderButton>
      </TodoHeaderButtonBox>
      <TodoHeaderInputBox>
        <TodoHeaderInput
          placeholder="Enter your task"
          value={text}
          onChangeText={onTextChangeEvent}
          onSubmitEditing={onTodoSubmitEvent}
        />
      </TodoHeaderInputBox>
    </TodoHeaderWrap>
  )
}

const TodoHeaderWrap = styled.View`
  width: 100%;
`
const TodoHeaderButtonBox = styled.View`
  width: 100%;
  margin: 20px 0 20px 0;
  padding-bottom: 20px;
  border-bottom-width: 2px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const TodoHeaderInputBox = styled.View`
  width: 100%;
  align-items: center;
  padding-bottom: 20px;
  border-bottom-width: 2px;
`

const TodoHeaderButton = styled.TouchableOpacity`
  width: 30%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  background-color: ${(props) => (props.active ? "blue" : "gray")};
`

const TodoHeaderText = styled.Text`
  font-weight: bold;
`

const TodoHeaderInput = styled.TextInput`
  width: 100%;
  height: 40px;
  border: 2px solid black;
  padding-left: 10px;
`

export default TodoHeader
