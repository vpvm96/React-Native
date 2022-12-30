import TodoContent from "./TodoContent"
import styled from "@emotion/native"

const TodoBody = ({
  todos,
  isDone,
  categories,
  onStatusPressEvent,
  onTodoUpdatedEvent,
  onDeleteTodoPressEvent,
}) => {
  return (
    <TodoBodyWrap>
      {todos
        .filter((todo) => todo.categories === categories)
        .map((todo) => (
          <TodoContent
            key={todo.id}
            todo={todo}
            isDone={isDone}
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
