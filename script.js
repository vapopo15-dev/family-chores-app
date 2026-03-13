// ------------------------------
// ① 固定家事リスト
// ------------------------------
let predefinedTasks = [
  { id: 1, title: "ルンバ掃除", person: "", completedAt: null },
  { id: 2, title: "ほこり取り", person: "", completedAt: null },
  { id: 3, title: "洗面器の掃除", person: "", completedAt: null },
  { id: 4, title: "風呂掃除", person: "", completedAt: null },
  { id: 5, title: "トイレ掃除", person: "", completedAt: null }
];
const personColors = {
  "直人": "#c8f7c5",   // 柔らかいグリーン
  "礼雄": "#a3d8ff"    // 優しいブルー
};

// ------------------------------
// ② HTML要素の取得
// ------------------------------
const taskTitleInput = document.getElementById("taskTitle");
const taskPersonInput = document.getElementById("taskPerson");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// ユーザーが追加した家事
let tasks = [];

// ------------------------------
// ③ 家事追加ボタン
// ------------------------------
addTaskBtn.addEventListener("click", () => {
  const title = taskTitleInput.value.trim();
  const person = taskPersonInput.value.trim();

  if (!title || !person) {
    alert("家事名と担当者を入力してください");
    return;
  }

  const task = {
    id: Date.now(),
    title,
    person,
    completedAt: null,
  };

  tasks.push(task);
  saveData();
  renderTasks();

  taskTitleInput.value = "";
  taskPersonInput.value = "";
});

// ------------------------------
// ④ 家事カードを描画する共通関数
// ------------------------------
function renderTaskCard(task, isPredefined) {
  const card = document.createElement("div");
  card.className = "task-card";

  const header = document.createElement("div");
  header.className = "task-header";

  const titleEl = document.createElement("div");
  titleEl.className = "task-title";
  titleEl.textContent = task.title;

  header.appendChild(titleEl);

  const footer = document.createElement("div");
  footer.className = "task-footer";

  const timeEl = document.createElement("div");
  if (task.completedAt) {
    timeEl.textContent = `完了：${formatDate(task.completedAt)}（${task.person}）`;
  } else {
    timeEl.textContent = "未完了";
  }

  const button = document.createElement("button");
  button.className = "complete-btn";
  button.textContent = task.completedAt ? "完了済み" : "完了";

  button.addEventListener("click", () => {
    if (!task.completedAt) {
      const selectedPerson = taskPersonInput.value.trim();
      if (!selectedPerson) {
        alert("担当者を選択してください");
        return;
      }
      task.completedAt = new Date();
      task.person = selectedPerson;
    } else {
      task.completedAt = null;
      task.person = "";
    }

    saveData();
    renderTasks();
  });

  footer.appendChild(timeEl);
  footer.appendChild(button);

  card.appendChild(header);
  card.appendChild(footer);
// 完了していたらカードの色を変える
if (task.completedAt && task.person) {
  const color = personColors[task.person] || "#f7f8ff";
  card.style.background = color;
}

  taskList.appendChild(card);
}

// ------------------------------
// ⑤ 全体の家事リストを描画
// ------------------------------
function renderTasks() {
  taskList.innerHTML = "";

  // 固定家事
  predefinedTasks.forEach((task) => {
    renderTaskCard(task, true);
  });

  // 追加家事
  tasks.forEach((task) => {
    renderTaskCard(task, false);
  });
}

// ------------------------------
// ⑥ 日付フォーマット
// ------------------------------
function formatDate(date) {
  const d = new Date(date);
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const h = d.getHours().toString().padStart(2, "0");
  const min = d.getMinutes().toString().padStart(2, "0");
  return `${m}/${day} ${h}:${min}`;
}

// ------------------------------
// ⑦ データ保存・読み込み
// ------------------------------
function saveData() {
  localStorage.setItem("predefinedTasks", JSON.stringify(predefinedTasks));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadData() {
  const savedPre = localStorage.getItem("predefinedTasks");
  const savedTasks = localStorage.getItem("tasks");

  if (savedPre) predefinedTasks = JSON.parse(savedPre);
  if (savedTasks) tasks = JSON.parse(savedTasks);
}

// 初期読み込み
loadData();
renderTasks();