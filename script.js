// Зберегти інформацію про ОС та браузер
const browserInfo = {
  userAgent: navigator.userAgent,
  platform: navigator.platform,
  language: navigator.language
};
localStorage.setItem('browserInfo', JSON.stringify(browserInfo));

// Показати інформацію у футері
const localDataDiv = document.getElementById('local-data');
localDataDiv.innerText = JSON.stringify(browserInfo, null, 2);

// Отримати коментарі (замість 1 встав свій номер)
fetch('https://jsonplaceholder.typicode.com/posts/16/comments')
  .then(res => res.json())
  .then(comments => {
    const commentsDiv = document.getElementById('comments');
    comments.forEach(c => {
      const el = document.createElement('p');
      el.innerHTML = `<strong>${c.name}</strong>: ${c.body}`;
      commentsDiv.appendChild(el);
    });
  });

// Модальне вікно через 1 хв
let modalTimer;
let modalShown = false;

function showModal() {
  if (!modalShown) {
    document.getElementById('modal').style.display = 'block';
    modalShown = true;
  }
}

function hideModal() {
  document.getElementById('modal').style.display = 'none';
  modalShown = false;

  // Показати знову через 60 секунд
  clearTimeout(modalTimer);
  modalTimer = setTimeout(showModal, 60000);
}

// Запуск першого таймера при завантаженні сторінки
window.addEventListener('load', () => {
  modalTimer = setTimeout(showModal, 60000); // 60 секунд
});

// Закриття по кнопці
document.getElementById('closeModal').addEventListener('click', hideModal);

// Перемикання теми
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-theme', themeToggle.checked);
  localStorage.setItem('theme', themeToggle.checked ? 'dark' : 'light');
});

// Автоматична тема за часом
const hour = new Date().getHours();
const isNight = hour < 7 || hour >= 21;
if (isNight) {
  document.body.classList.add('dark-theme');
  themeToggle.checked = true;
} else {
  themeToggle.checked = false;
}
