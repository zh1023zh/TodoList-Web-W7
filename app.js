// V2 第2阶段：添加、删除和切换均创建新数组，然后渲染。
const STORAGE_KEY = 'web-w7-todos-v2';
let todos = load();
let currentFilter = 'all';
const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');
function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(t => t && typeof t.id === 'string'
      && typeof t.text === 'string' && typeof t.completed === 'boolean');
  } catch (error) {
    console.warn('读取本地任务失败，使用空列表：', error);
    return [];
  }
}

function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(todos)); }
  catch (error) { console.warn('保存任务失败：', error); }
}

function addTodo(text) {
  const value = String(text).trim();
  if (!value) return;
  todos = [...todos, { id: `${Date.now()}-${Math.random()}`, text: value, completed: false }];
  save();
  render();
}
function removeTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  save();
  render();
}
function toggleTodo(id) {
  todos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
  save();
  render();
}
// 课堂独立练习：禁用 AI 后自己完成函数体。
// 预期：只保留未完成事项，并保存、重渲染。
function clearCompleted() {
  // TODO: 请独立填写三步操作。
}
function setFilter(filter) {
  if (!['all', 'active', 'completed'].includes(filter)) return;
  currentFilter = filter;
  document.querySelectorAll('[data-filter]').forEach(button => {
    button.classList.toggle('active', button.dataset.filter === filter);
  });
  render();
}
function visibleTodos() {
  if (currentFilter === 'active') return todos.filter(t => !t.completed);
  if (currentFilter === 'completed') return todos.filter(t => t.completed);
  return todos;
}
function render() {
  list.replaceChildren();
  visibleTodos().forEach(todo => {
    const li = document.createElement('li');
    li.className = `todo${todo.completed ? ' done' : ''}`;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodo(todo.id));
    const content = document.createElement('span');
    content.className = 'todo-text';
    content.textContent = todo.text;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'delete';
    button.textContent = '删除';
    button.addEventListener('click', () => removeTodo(todo.id));
    li.append(checkbox, content, button);
    list.append(li);
  });
  const done = todos.filter(todo => todo.completed).length;
  document.querySelector('#empty').hidden = visibleTodos().length !== 0;
  document.querySelector('#count').textContent = `${todos.length - done} 项待完成`;
  document.querySelector('#summary').textContent = `已完成 ${done} / 共 ${todos.length} 项`;
  document.querySelector('#clear-completed').disabled = done === 0;
}
form.addEventListener('submit', event => { event.preventDefault(); addTodo(input.value); input.value = ''; });
render();
document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => setFilter(button.dataset.filter));
});
document.querySelector('#clear-completed').addEventListener('click', clearCompleted);
