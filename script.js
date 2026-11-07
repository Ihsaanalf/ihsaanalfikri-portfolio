const translations = { en: 'en', id: 'id' };
let currentLanguage = 'en';
const languageToggle = document.getElementById('languageToggle');
const languageSpans = languageToggle.querySelectorAll('span');

function setLanguage(language) {
  currentLanguage = translations[language] ? language : 'en';
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll('[data-en][data-id]').forEach((element) => {
    const value = element.dataset[currentLanguage];
    if (value !== undefined) element.innerHTML = value;
  });
  languageSpans[0].classList.toggle('lang-active', currentLanguage === 'en');
  languageSpans[1].classList.toggle('lang-active', currentLanguage === 'id');
  languageToggle.setAttribute('aria-label', currentLanguage === 'en' ? 'Switch to Indonesian' : 'Switch to English');
}
languageToggle.addEventListener('click', () => setLanguage(currentLanguage === 'en' ? 'id' : 'en'));

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const projectContent = {
  myduit: {
    title: 'MyDuit — Finance Tracker',
    description: {
      en: 'An Android finance app concept focused on recording income and expenses, displaying a dashboard, and viewing transaction details. The project uses Kotlin and Jetpack Compose.',
      id: 'Konsep aplikasi keuangan Android yang berfokus pada pencatatan pemasukan dan pengeluaran, tampilan dashboard, serta detail transaksi. Proyek ini menggunakan Kotlin dan Jetpack Compose.'
    },
    tags: ['Kotlin', 'Jetpack Compose', 'Android']
  },
  todo: {
    title: 'JavaFX To-Do List',
    description: {
      en: 'A desktop task manager built with JavaFX. It includes task creation, deadline selection, completion status, and task-list management, applying object-oriented programming concepts.',
      id: 'Aplikasi pengelola tugas desktop yang dibangun menggunakan JavaFX. Fitur utamanya meliputi penambahan tugas, pemilihan deadline, status selesai, dan pengelolaan daftar tugas dengan menerapkan konsep pemrograman berorientasi objek.'
    },
    tags: ['Java', 'JavaFX', 'OOP']
  },
  caffe: {
    title: 'Caffe Senja — Web Catalog',
    description: {
      en: 'A PHP Native web project for managing a cafe product catalog. The project includes CRUD functionality and image uploads, developed in a local Laragon environment with MySQL.',
      id: 'Proyek web PHP Native untuk mengelola katalog produk kafe. Proyek ini mencakup fungsi CRUD dan unggah gambar, dikembangkan di lingkungan lokal Laragon dengan MySQL.'
    },
    tags: ['PHP Native', 'MySQL', 'Laragon']
  }
};
const dialog = document.getElementById('projectDialog');
const dialogTitle = document.getElementById('dialogTitle');
const dialogDescription = document.getElementById('dialogDescription');
const dialogTags = document.getElementById('dialogTags');
document.querySelectorAll('.project-detail').forEach((button) => {
  button.addEventListener('click', () => {
    const project = projectContent[button.dataset.project];
    if (!project) return;
    dialogTitle.textContent = project.title;
    dialogDescription.textContent = project.description[currentLanguage];
    dialogTags.innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join('');
    dialog.showModal();
  });
});
document.getElementById('dialogClose').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

const progress = document.getElementById('readingProgress');
window.addEventListener('scroll', () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${percentage}%`;
}, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.getElementById('year').textContent = new Date().getFullYear();
