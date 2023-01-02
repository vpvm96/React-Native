import TodoContent from "./TodoContent"
import styled from "@emotion/native"

const TodoBody = ({
  todos,
  category,
  onStatusPressEvent,
  onTodoUpdatedEvent,
  onDeleteTodoPressEvent,
}) => {
  return (
    <TodoBodyWrap>
      {todos
        .filter((todo) => todo.category === category)
        .map((todo) => (
          <TodoContent
            key={todo.id}
            todo={todo}
            onStatusPressEvent={onStatusPressEvent}
            onTodoUpdatedEvent={onTodoUpdatedEvent}
            onDeleteTodoPressEvent={onDeleteTodoPressEvent}
          />
        ))}
    </TodoBodyWrap>
  )
}

const TodoBodyWrap = styled.ScrollView`
  width: 100%;
`

export default TodoBody
