'use strict';

// 第7周：状态唯一来源是 todos；所有操作遵循：改数据 → 保存 → 重渲染。
const STORAGE_KEY = 'web-w7-todos-v2';
let todos = load();
let currentFilter = 'all';

const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');
const empty = document.querySelector('#empty');
const count = document.querySelector('#count');
const summary = document.querySelector('#summary');

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
  const normalized = String(text).trim();
  if (!normalized) return;
  const item = {
    id: (typeof crypto !== 'undefined' && crypto.randomUUID)
      ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    text: normalized,
    completed: false
  };
  todos = [...todos, item]; // 创建新数组，不使用 push()
  save();
  render();
}

function removeTodo(id) {
  todos = todos.filter(todo => todo.id !== id); // 不修改原数组
  save();
  render();
}

function toggleTodo(id) {
  todos = todos.map(todo => todo.id === id
    ? { ...todo, completed: !todo.completed } : todo); // 新对象 + 新数组
  save();
  render();
}

// 独立练习题的参考版本：课程要求提交者不借助 AI 自己实现并验证。
function clearCompleted() {
  todos = todos.filter(todo => !todo.completed);
  save();
  render();
}

function setFilter(filter) {
  if (!['all', 'active', 'completed'].includes(filter)) return;
  currentFilter = filter; // 筛选只改视图状态，不删除原有任务
  document.querySelectorAll('[data-filter]').forEach(button => {
    const selected = button.dataset.filter === filter;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
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
  const visible = visibleTodos();
  visible.forEach(todo => {
    const li = document.createElement('li');
    li.className = `todo${todo.completed ? ' done' : ''}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.setAttribute('aria-label', `切换 ${todo.text} 的完成状态`);
    checkbox.addEventListener('change', () => toggleTodo(todo.id));

    const content = document.createElement('span');
    content.className = 'todo-text';
    content.textContent = todo.text; // 防止把用户文本作为 HTML 解析

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'delete';
    remove.textContent = '删除';
    remove.setAttribute('aria-label', `删除 ${todo.text}`);
    remove.addEventListener('click', () => removeTodo(todo.id));

    li.append(checkbox, content, remove);
    list.append(li);
  });
  empty.hidden = visible.length !== 0;
  const done = todos.filter(t => t.completed).length;
  count.textContent = `${todos.length - done} 项待完成`;
  summary.textContent = `已完成 ${done} / 共 ${todos.length} 项`;
  document.querySelector('#clear-completed').disabled = done === 0;
}

form.addEventListener('submit', event => {
  event.preventDefault();
  addTodo(input.value);
  input.value = '';
  input.focus();
});
document.querySelectorAll('[data-filter]').forEach(button =>
  button.addEventListener('click', () => setFilter(button.dataset.filter))
);
document.querySelector('#clear-completed').addEventListener('click', clearCompleted);
render();
