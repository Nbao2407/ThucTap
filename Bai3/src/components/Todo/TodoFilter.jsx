import styles from "./styles/TodoFilter.module.scss";
import classNames from 'classnames';

const TodoFilter = ({ filter, onFilterChange }) => {
  const filters = [
    { key: "all", label: "all" },
    { key: "active", label: "active" },
    { key: "completed", label: "completed" },
  ];

  return (
    <div className={styles['todo-filter']}>
      {filters.map((f) => (
        <button
          key={f.key}
          onClick={() => onFilterChange(f.key)}
          className={classNames(styles['todo-filter__btn'], {
            [styles['todo-filter__btn--active']]: filter === f.key
          })}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};

export default TodoFilter;
