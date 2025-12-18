import { DEFAULT_TAGS, AVAILABLE_COLORS, getTagColors } from './tags.js';

class TodoApp {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.availableTags = JSON.parse(localStorage.getItem('tags')) || DEFAULT_TAGS;
        
        this.filter = 'all'; 
        this.tagFilter = 'all'; 
        this.newTaskTags = new Set();
        this.newTagColor = AVAILABLE_COLORS[4]; 
        this.editingTaskId = null;

        this.initElements();
        this.initListeners();
        this.render();
    }

    initElements() {
        this.todoForm = document.getElementById('todoForm');
        this.todoInput = document.getElementById('todoInput');
        this.tagTrigger = document.getElementById('tagTrigger');
        this.tagMenu = document.getElementById('tagMenu');
        this.tagSelectionList = document.getElementById('tagSelectionList');
        this.selectedTagsContainer = document.getElementById('selectedTagsContainer');

        this.newTagNameInput = document.getElementById('newTagName');
        this.addNewTagBtn = document.getElementById('addNewTagBtn');
        this.tagColorPicker = document.getElementById('tagColorPicker');

        this.todoList = document.getElementById('todoList');
        this.emptyState = document.getElementById('emptyState');
        this.filterTags = document.getElementById('filterTags');

        this.statusTabs = document.querySelectorAll('.status-tabs__item');
        this.countAll = document.getElementById('countAll');
        this.countActive = document.getElementById('countActive');
        this.countCompleted = document.getElementById('countCompleted');
    }

    initListeners() {
        this.todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        this.tagTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!this.tagMenu.classList.contains('hidden') && this.editingTaskId === null) {
                this.tagMenu.classList.add('hidden');
            } else {
                this.editingTaskId = null;
                this.renderTagSelection();
                this.renderColorPicker();
                this.tagMenu.classList.remove('hidden');
            }
        });

        this.addNewTagBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.addNewTag();
        });

        document.addEventListener('click', (e) => {
            if (!this.tagTrigger.contains(e.target) && 
                !this.tagMenu.contains(e.target) && 
                !e.target.closest('.tag-edit-btn')) {
                this.tagMenu.classList.add('hidden');
                this.editingTaskId = null;
            }
        });

        this.statusTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.statusTabs.forEach(t => t.classList.remove('status-tabs__item--active'));
                tab.classList.add('status-tabs__item--active');
                this.filter = tab.dataset.status;
                this.render();
            });
        });

        this.renderFilterTags();
    }

    // --- Tag Management ---

    // --- Tag Management ---

    renderTagSelection() {
        let currentTags = this.newTaskTags;
        if (this.editingTaskId !== null) {
            const task = this.tasks.find(t => t.id === this.editingTaskId);
            if (task) {
                currentTags = new Set(task.tags);
            }
        }

        this.tagSelectionList.innerHTML = this.availableTags.map(tag => {
            const isSelected = currentTags.has(tag.name);
            const style = isSelected 
                ? `background: ${tag.bg}; color: ${tag.color}; border: 1px solid ${tag.color}` 
                : '';
            
            return `
                <div class="tag-option ${isSelected ? 'tag-option--selected' : ''}" 
                     data-tag="${tag.name}"
                     style="${style}">
                    ${tag.name}
                </div>
            `;
        }).join('');

        this.tagSelectionList.querySelectorAll('.tag-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault(); 
                e.stopPropagation();
                const tagName = option.dataset.tag;
                this.toggleTag(tagName);
            });
        });
    }

    toggleTag(tagName) {
        if (this.editingTaskId !== null) {
            const task = this.tasks.find(t => t.id === this.editingTaskId);
            if (task) {
                const tags = new Set(task.tags);
                if (tags.has(tagName)) {
                    tags.delete(tagName);
                } else {
                    tags.add(tagName);
                }
                task.tags = Array.from(tags);
                this.saveTasks();
                this.render();
                this.renderTagSelection();
            }
        } else {
            if (this.newTaskTags.has(tagName)) {
                this.newTaskTags.delete(tagName);
            } else {
                this.newTaskTags.add(tagName);
            }
            this.renderTagSelection();
            this.renderSelectedTags();
        }
    }

    renderColorPicker() {
        this.tagColorPicker.innerHTML = AVAILABLE_COLORS.map(c => `
            <div class="color-swatch ${this.newTagColor.hex === c.hex ? 'color-swatch--selected' : ''}" 
                 style="background-color: ${c.hex};"
                 data-hex="${c.hex}">
            </div>
        `).join('');

        this.tagColorPicker.querySelectorAll('.color-swatch').forEach(swatch => {
            swatch.addEventListener('click', (e) => {
                e.stopPropagation();
                const hex = swatch.dataset.hex;
                this.newTagColor = AVAILABLE_COLORS.find(c => c.hex === hex);
                this.renderColorPicker();
            });
        });
    }

    addNewTag() {
        const name = this.newTagNameInput.value.trim();
        if (!name) return;

        if (this.availableTags.some(t => t.name.toLowerCase() === name.toLowerCase())) {
            alert('Thẻ đã tồn tại');
            return;
        }

        const newTag = {
            name: name,
            type: 'custom',
            color: this.newTagColor.hex,
            bg: this.newTagColor.bg
        };

        this.availableTags.push(newTag);
        this.saveTags();
        this.newTagNameInput.value = '';
        this.renderTagSelection();
        this.renderFilterTags();
    }

    saveTags() {
        localStorage.setItem('tags', JSON.stringify(this.availableTags));
    }

    renderSelectedTags() {
        this.selectedTagsContainer.innerHTML = Array.from(this.newTaskTags).map(tagName => {
            const tag = this.availableTags.find(t => t.name === tagName);
            if (!tag) return '';
            
            return `
                <span class="tag-pill" style="background: ${tag.bg}; color: ${tag.color}; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 6px;">
                    ${tag.name}
                    <span class="tag-remove" data-tag="${tag.name}" style="cursor:pointer; font-weight:bold;">×</span>
                </span>
            `;
        }).join('');

        this.selectedTagsContainer.querySelectorAll('.tag-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.newTaskTags.delete(e.target.dataset.tag);
                this.renderSelectedTags();
                this.renderTagSelection();
            });
        });
    }

    renderFilterTags() {
        const staticBtn = this.filterTags.querySelector('[data-tag="all"]');
        this.filterTags.innerHTML = '';
        this.filterTags.appendChild(staticBtn);

        this.availableTags.forEach(tag => {
            const btn = document.createElement('button');
            const isActive = this.tagFilter === tag.name;
            btn.className = `filter-tag ${isActive ? 'filter-tag--active' : ''}`;
            btn.textContent = tag.name;
            
            if (isActive) {
                btn.style.background = tag.bg;
                btn.style.color = tag.color;
                btn.style.borderColor = tag.color;
            } else {
                 btn.style.background = '#f8f9fa';
                 btn.style.color = '#333';
                 btn.style.borderColor = 'transparent';
            }

            btn.addEventListener('click', () => {
                this.filterTags.querySelectorAll('.filter-tag').forEach(b => {
                    b.classList.remove('filter-tag--active');
                    b.style = '';
                });
                btn.classList.add('filter-tag--active');
                this.tagFilter = tag.name;
                this.render();
                this.renderFilterTags();
            });
            this.filterTags.appendChild(btn);
        });

        staticBtn.onclick = () => {
             this.filterTags.querySelectorAll('.filter-tag').forEach(b => {
                 b.classList.remove('filter-tag--active');
                 b.style = '';
             });
             staticBtn.classList.add('filter-tag--active');
             this.tagFilter = 'all';
             this.render();
        };
    }

    // --- Tasks ---

    addTask() {
        const text = this.todoInput.value.trim();
        if (!text) return;

        const task = {
            id: Date.now(),
            text,
            isCompleted: false,
            tags: Array.from(this.newTaskTags) 
        };

        this.tasks.unshift(task);
        this.saveTasks();
        
        this.todoInput.value = '';
        this.newTaskTags.clear();
        this.renderSelectedTags();
        this.render();
        
        this.tagMenu.classList.add('hidden');
    }

    toggleTask(id) {
        this.tasks = this.tasks.map(t => 
            t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
        );
        this.saveTasks();
        this.render();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveTasks();
        this.render(); // If editing this task, menu will effectively lose context, but fine.
    }

    removeTagFromTask(taskId, tagName) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.tags = task.tags.filter(t => t !== tagName);
            this.saveTasks();
            this.render();
            // If editing this task currently, update menu
            if (this.editingTaskId === taskId) {
                this.renderTagSelection();
            }
        }
    }

    editTask(id, newText) {
        this.tasks = this.tasks.map(t => 
            t.id === id ? { ...t, text: newText } : t
        );
        this.saveTasks();
        this.render();
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        this.updateCounts();
    }

    updateCounts() {
        this.countAll.textContent = this.tasks.length;
        this.countActive.textContent = this.tasks.filter(t => !t.isCompleted).length;
        this.countCompleted.textContent = this.tasks.filter(t => t.isCompleted).length;
    }

    getFilteredTasks() {
        return this.tasks.filter(task => {
            if (this.filter === 'active' && task.isCompleted) return false;
            if (this.filter === 'completed' && !task.isCompleted) return false;
            if (this.tagFilter !== 'all' && !task.tags.includes(this.tagFilter)) return false;
            return true;
        });
    }

    render() {
        const filtered = this.getFilteredTasks();
        
        if (filtered.length === 0) {
            this.emptyState.classList.remove('hidden');
            this.todoList.innerHTML = '';
        } else {
            this.emptyState.classList.add('hidden');
            this.todoList.innerHTML = filtered.map(task => this.createTaskHTML(task)).join('');
        }

        this.updateCounts();
        lucide.createIcons();
        this.attachTaskEvents();
    }

    createTaskHTML(task) {
        const isChecked = task.isCompleted ? 'checked' : '';
        const completedClass = task.isCompleted ? 'todo-item--completed' : '';
        
        const tagsHTML = task.tags.map(tagName => {
            const tag = this.availableTags.find(t => t.name === tagName);
            const style = tag 
                ? `background: ${tag.bg}; color: ${tag.color}; border: 1px solid ${tag.color}` 
                : 'background: #eee; color: #555;';
            
            return `
                <span class="tag-badge" style="${style}">
                    ${tagName}
                    <span class="tag-remove-btn" data-tag="${tagName}" title="Xóa thẻ">×</span>
                </span>
            `;
        }).join('');

        const editTagBtn = `
            <button class="tag-edit-btn" title="Thêm/Sửa thẻ">
                <i data-lucide="tag" class="icon-xs"></i> Sửa
            </button>
        `;

        return `
            <li class="todo-item ${completedClass}" data-id="${task.id}">
                <label class="custom-radio">
                    <input type="checkbox" ${isChecked} class="task-checkbox">
                    <div class="radio-mark"></div>
                </label>
                
                <div class="todo-item__content">
                    <div class="todo-item__text-wrapper">
                         <span class="todo-item__text">${task.text}</span>
                         <input type="text" class="todo-item__edit-input hidden" value="${task.text}">
                    </div>
                    <div class="todo-item__tags">
                        ${tagsHTML}
                        ${editTagBtn}
                    </div>
                </div>

                <div class="todo-item__actions">
                    <button class="action-btn edit-btn" title="Sửa">
                        <i data-lucide="pencil" class="icon-xs"></i>
                    </button>
                    <button class="action-btn delete-btn" title="Xóa">
                        <i data-lucide="trash-2" class="icon-xs"></i>
                    </button>
                </div>
            </li>
        `;
    }

    attachTaskEvents() {
        this.todoList.querySelectorAll('.todo-item').forEach(item => {
            const id = Number(item.dataset.id);
            
            item.querySelector('.task-checkbox').addEventListener('change', () => this.toggleTask(id));

            item.querySelector('.delete-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                if(confirm('Bạn có chắc chắn muốn xóa không?')) this.deleteTask(id);
            });

            item.querySelectorAll('.tag-remove-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const tagName = e.target.dataset.tag;
                    this.removeTagFromTask(id, tagName);
                });
            });

            item.querySelector('.tag-edit-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                if (this.editingTaskId === id && !this.tagMenu.classList.contains('hidden')) {
                     this.tagMenu.classList.add('hidden');
                     this.editingTaskId = null;
                } else {
                    this.editingTaskId = id;
                    this.renderTagSelection();
                    this.renderColorPicker();
                    this.tagMenu.classList.remove('hidden');
                }
            });

            const editBtn = item.querySelector('.edit-btn');
            const textSpan = item.querySelector('.todo-item__text');
            const input = item.querySelector('.todo-item__edit-input');

            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                textSpan.classList.add('hidden');
                input.classList.remove('hidden');
                input.focus();
                item.classList.add('todo-item--editing');
            });

            const saveEdit = () => {
                const newText = input.value.trim();
                if (newText) {
                    this.editTask(id, newText);
                } else {
                   this.render();
                }
            };

            input.addEventListener('blur', saveEdit);
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') saveEdit();
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
