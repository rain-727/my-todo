// ---------- 数据 ----------
let tasks = [];   // 每个任务对象: { id, text, completed }

// DOM 元素
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// ---------- 保存到 localStorage ----------
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ---------- 渲染列表 ----------
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
            <span class="task-text ${task.completed ? 'completed' : ''}">${escapeHtml(task.text)}</span>
            <button class="delete-btn" data-id="${task.id}">删除</button>
        `;
    // 点击文字切换完成状态
    const taskSpan = li.querySelector('.task-text');
    taskSpan.addEventListener('click', () => toggleComplete(task.id));
    // 点击删除按钮
    const delBtn = li.querySelector('.delete-btn');
    delBtn.addEventListener('click', () => deleteTask(task.id));
    taskList.appendChild(li);
  });
}

// 辅助：防止XSS（把特殊字符转义）
function escapeHtml(str) {
  return str.replace(/[&<>]/g, function (m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

// ---------- 增 ----------
function addTask() {
  const text = taskInput.value.trim();
  if (text === '') {
    alert('请写点什么');
    return;
  }
  const newTask = {
    id: Date.now(),
    text: text,
    completed: false
  };
  tasks.push(newTask);
  saveTasks();
  renderTasks();
  taskInput.value = '';
  taskInput.focus();
}

// ---------- 删 ----------
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

// ---------- 切换完成状态 ----------
function toggleComplete(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }
}

// ---------- 初始化加载 ----------
function loadTasks() {
  const stored = localStorage.getItem('tasks');
  if (stored) {
    tasks = JSON.parse(stored);
  }
  renderTasks();
}

// ---------- 绑定事件 ----------
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

// 启动应用
loadTasks();