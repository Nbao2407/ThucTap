import { useState } from "react";
import { Plus, X, CornerDownLeft } from "lucide-react";
import styles from "./styles/TodoForm.module.scss"; 
import classNames from 'classnames';

const TodoForm = ({ onAdd, availableTags, onAddTag, onDeleteTag }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [showTagInput, setShowTagInput] = useState(false);
  const [newTagName, setNewTagName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      onAdd(trimmedValue, selectedTags, dueDate ? dueDate : null);
      setInputValue("");
      setSelectedTags([]);
      setDueDate("");
    }
  };

  const toggleTag = (tag) => {
    if (selectedTags.find(t => t.id === tag.id)) {
      setSelectedTags(selectedTags.filter(t => t.id !== tag.id));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleAddTag = () => {
    if (newTagName.trim()) {
      onAddTag(newTagName.trim());
      setNewTagName("");
      setShowTagInput(false);
    }
  };

  const isSelected = (tag) => !!selectedTags.find(t => t.id === tag.id);

  return (
    <div className={styles['todo-form']}>
      <form onSubmit={handleSubmit} className={styles['todo-form__input-group']}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="+ add task"
          className={styles['todo-form__input']}
        />
        <button type="submit" className={styles['todo-form__submit']} disabled={!inputValue.trim()}>
            <CornerDownLeft size={16} />
        </button>
      </form>
      
      <div className={styles['todo-form__controls']}>
        <div className={styles['todo-form__tags']}>
            {(availableTags || []).map(tag => (
            <div key={tag.id} className={styles['todo-form__tag-wrapper']}>
                <button
                onClick={() => toggleTag(tag)}
                className={classNames(styles['todo-form__tag'], { [styles['todo-form__tag--selected']]: isSelected(tag) })}
                style={{ 
                    backgroundColor: isSelected(tag) ? `${tag.color}20` : "transparent",
                    borderColor: isSelected(tag) ? tag.color : undefined,
                    color: isSelected(tag) ? tag.color : undefined
                }}
                >
                {tag.name}
                </button>
                <button
                onClick={() => onDeleteTag(tag.id)}
                className={styles['todo-form__delete-tag']}
                >
                <X size={10} />
                </button>
            </div>
            ))}
            
            {showTagInput ? (
            <div className={styles['todo-form__new-tag']}>
                <input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                placeholder="tag name"
                className={styles['todo-form__tag-input']}
                autoFocus
                />
                <button onClick={handleAddTag} className={styles['todo-form__tag-confirm']}>
                <Plus size={12} />
                </button>
            </div>
            ) : (
            <button
                onClick={() => setShowTagInput(true)}
                className={styles['todo-form__add-tag-trigger']}
            >
                + tag
            </button>
            )}
        </div>

        <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={styles['todo-form__date']}
        />
      </div>
    </div>
  );
};

export default TodoForm;
