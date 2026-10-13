// V1.0：仅操作 DOM，没有 todos 数组作为唯一状态来源。
const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');
form.addEventListener('submit', event => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  const li = document.createElement('li');
  li.className = 'todo';
  li.textContent = text;
  list.append(li);
  input.value = '';
});
