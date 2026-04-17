//获取元素
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

//添加任务函数
function addTask() {
  const text = taskInput.value.trim();
  if (text === '') {
    alert('请写点什么吧');
    return;
  }

  //创建li元素
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${text}</span>
    <button class="delete-btn">删除</button>
    `;

  // 找到删除按钮并绑定删除事件
  const delBtn = li.querySelector('.delete-btn');
  delBtn.addEventListener('click', function () {
    li.remove();   // 删除这一整条任务
  });

  //添加到列表
  taskList.appendChild(li);

  //清除输入框并聚焦
  taskInput.value = '';
  taskInput.focus();

}

//绑定添加按钮点击事件
addBtn.addEventListener('click', addTask);

//按回车也可以添加事件
taskInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addTask();
  }
});

