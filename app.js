// V2 第2阶段：添加、删除和切换均创建新数组，然后渲染。
let todos = [];
const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');
function addTodo(text) {
  const value = String(text).trim();
  if (!value) return;
  todos = [...todos, { id: `${Date.now()}-${Math.random()}`, text: value, completed: false }];
  render();
}
function removeTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  render();
}
function toggleTodo(id) {
  todos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
  render();
}
function render() {
  list.replaceChildren();
  todos.forEach(todo => {
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
  document.querySelector('#empty').hidden = todos.length !== 0;
  document.querySelector('#count').textContent = `${todos.length - done} 项待完成`;
  document.querySelector('#summary').textContent = `已完成 ${done} / 共 ${todos.length} 项`;
}
form.addEventListener('submit', event => { event.preventDefault(); addTodo(input.value); input.value = ''; });
render();
