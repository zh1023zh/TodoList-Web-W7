// V2 第1阶段：todos 是页面状态的唯一来源。
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
function render() {
  list.replaceChildren();
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo';
    li.textContent = todo.text;
    list.append(li);
  });
  document.querySelector('#empty').hidden = todos.length !== 0;
  document.querySelector('#count').textContent = `${todos.length} 项待完成`;
  document.querySelector('#summary').textContent = `已完成 0 / 共 ${todos.length} 项`;
}
form.addEventListener('submit', event => {
  event.preventDefault();
  addTodo(input.value);
  input.value = '';
});
render();
