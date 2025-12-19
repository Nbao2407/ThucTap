import { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";
import styles from "./styles/TodoApp.module.scss";

const TAG_COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#8b5cf6", "#ec4899"];

const TodoApp = () => {
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem('react_todo_tasks_v2');
        return saved ? JSON.parse(saved) : [
            { id: 1, text: "Học React", completed: true, tags: [], dueDate: null },
            { id: 2, text: "Làm bài tập", completed: false, tags: [], dueDate: null }
        ];
    });

    const [tags, setTags] = useState(() => {
        const saved = localStorage.getItem('react_todo_tags_v2');
        return saved ? JSON.parse(saved) : [
            { id: 1, name: "work", color: "#ef4444" },
            { id: 2, name: "personal", color: "#22c55e" },
        ];
    });

    const [filter, setFilter] = useState("all");

    useEffect(() => {
        localStorage.setItem('react_todo_tasks_v2', JSON.stringify(todos));
        localStorage.setItem('react_todo_tags_v2', JSON.stringify(tags));
    }, [todos, tags]);

    const handleAddTodo = (text, selectedTags, dueDate) => {
        const newTodo = {
            id: Date.now(),
            text,
            completed: false,
            tags: selectedTags,
            dueDate,
        };
        setTodos([...todos, newTodo]);
    };

    const handleToggleTodo = (id) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    };

    const handleDeleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleEditTodo = (id, text, newTags, dueDate) => {
        setTodos(todos.map((todo) => 
            todo.id === id ? { ...todo, text, tags: newTags, dueDate } : todo
        ));
    };

    const handleAddTag = (name) => {
        const colorIndex = tags.length % TAG_COLORS.length;
        const newTag = {
            id: Date.now(),
            name,
            color: TAG_COLORS[colorIndex],
        };
        setTags([...tags, newTag]);
    };

    const handleDeleteTag = (id) => {
        setTags(tags.filter((tag) => tag.id !== id));
        setTodos(todos.map((todo) => ({
            ...todo,
            tags: todo.tags.filter((t) => t.id !== id),
        })));
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

    return (
        <div className={styles['todo-app']}>
            <header className={styles['todo-app__header']}>
                <h1 className={styles['todo-app__title']}>todos</h1>
            </header>

            <section className={styles['todo-app__content']}>
                <TodoForm 
                    onAdd={handleAddTodo} 
                    availableTags={tags}
                    onAddTag={handleAddTag}
                    onDeleteTag={handleDeleteTag}
                />
                <TodoFilter filter={filter} onFilterChange={setFilter} />
                <TodoList 
                    todos={filteredTodos} 
                    onToggle={handleToggleTodo} 
                    onDelete={handleDeleteTodo}
                    onEdit={handleEditTodo}
                    availableTags={tags}
                />
            </section>
        </div>
    );
};

export default TodoApp;
