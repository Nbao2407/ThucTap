import TodoItem from "./TodoItem";
import styles from "./styles/TodoList.module.scss";

const TodoList = ({ todos, onToggle, onDelete, onEdit, availableTags }) => {
  const completedCount = todos.filter((todo) => todo.completed).length;

  if (todos.length === 0) {
    return (
      <p className={styles['todo-list__empty']}>
        no tasks yet
      </p>
    );
  }

  return (
    <div className={styles['todo-list']}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          availableTags={availableTags}
        />
      ))}
      <div className={styles['todo-list__footer']}>
        {completedCount}/{todos.length} done
      </div>
    </div>
  );
};

export default TodoList;
