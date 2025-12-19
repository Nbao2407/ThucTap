import { X, Pencil, Check } from "lucide-react";
import { useState } from "react";
import styles from "./styles/TodoItem.module.scss";
import classNames from 'classnames';

const TodoItem = ({ todo, onToggle, onDelete, onEdit, availableTags }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editTags, setEditTags] = useState(todo.tags || []);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || "");

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim(), editTags, editDueDate || null);
      setIsEditing(false);
    }
  };

  const toggleTag = (tag) => {
    if (editTags.find(t => t.id === tag.id)) {
      setEditTags(editTags.filter(t => t.id !== tag.id));
    } else {
      setEditTags([...editTags, tag]);
    }
  };

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  const formatDate = (dateStr) => {
      const d = new Date(dateStr);
      return `${d.getDate()}/${d.getMonth()+1}`;
  };

  if (isEditing) {
    return (
      <div className={styles['todo-item-edit']}>
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className={styles['todo-item-edit__input']}
          autoFocus
        />
        <div className={styles['todo-item-edit__tags']}>
          {availableTags.map(tag => {
            const isSelected = !!editTags.find(t => t.id === tag.id);
            return (
                <button
                key={tag.id}
                onClick={() => toggleTag(tag)}
                className={classNames(styles['todo-item-edit__tag-btn'], { [styles['todo-item-edit__tag-btn--selected']]: isSelected })}
                style={{ 
                    backgroundColor: isSelected ? `${tag.color}20` : "transparent",
                    color: isSelected ? tag.color : undefined,
                    borderColor: isSelected ? tag.color : undefined
                }}
                >
                {tag.name}
                </button>
            );
          })}
        </div>
        <div className={styles['todo-item-edit__controls']}>
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className={styles['todo-item-edit__date-input']}
          />
          <button onClick={handleSave} className={styles['todo-item-edit__action-btn']}>
            <Check size={16} />
          </button>
          <button onClick={() => setIsEditing(false)} className={styles['todo-item-edit__action-btn']}>
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['todo-item']}>
      <button
        onClick={() => onToggle(todo.id)}
        className={classNames(styles['todo-item__checkbox'], {
          [styles['todo-item__checkbox--completed']]: todo.completed
        })}
      />
      <div className={styles['todo-item__content']}>
        <span
          className={classNames(styles['todo-item__text'], {
             [styles['todo-item__text--completed']]: todo.completed
          })}
        >
          {todo.text}
        </span>
        <div className={styles['todo-item__meta']}>
          {(todo.tags || []).map(tag => (
            <span
              key={tag.id}
              className={styles['todo-item__tag']}
              style={{ backgroundColor: `${tag.color}30`, color: tag.color }}
            >
              {tag.name}
            </span>
          ))}
          {todo.dueDate && (
            <span className={classNames(styles['todo-item__due-date'], { [styles['todo-item__due-date--overdue']]: isOverdue })}>
              {formatDate(todo.dueDate)}
            </span>
          )}
        </div>
      </div>
      <div className={styles['todo-item__actions']}>
        <button
          onClick={() => setIsEditing(true)}
          className={styles['todo-item__action-btn']}
          aria-label="Edit"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className={styles['todo-item__action-btn']}
          aria-label="Delete"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
