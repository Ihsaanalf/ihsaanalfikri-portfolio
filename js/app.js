/*
  Logika situs: routing (#hash), render halaman, bahasa ID/EN, tema.
  Semua teks dan data proyek ada di data.js.
*/

/* Bahasa awal mengikuti browser. Pilihan tidak disimpan. */
let lang = (navigator.language || "id").toLowerCase().startsWith("id") ? "id" : "en";

const $ = (selector) => document.querySelector(selector);
const t = (key) => L[lang][key];
const pick = (obj) => obj[lang];

/* ---------- Helper kecil ---------- */

function tags(list) {
  const items = list.map((item) => `<span>${item}</span>`).join("");
  return `<div class="tags">${items}</div>`;
}

function rows(list) {
  return list
    .map(
      ([label, title, sub]) => `
        <div class="row">
          <span class="mono">${label}</span>
          <div><b>${title}</b><br><span style="opacity:.8">${sub}</span></div>
        </div>`
    )
    .join("");
}

function img(name, alt, cls = "") {
  return `<img src="assets/${name}.webp" alt="${alt}" class="${cls}" loading="lazy">`;
}

/* ---------- Halaman ---------- */

function renderHome() {
  const badge = t("bad");
  return `
    <div class="hero">
      <div>
        <p class="mono">${t("lab")}</p>
        <h1 style="margin-top:.6rem">Muhammad Ihsaan Al Fikri</h1>
        <p class="role">Full-Stack &amp; Mobile Developer | AI &amp; ML</p>
        <p class="d">${t("hi")}</p>
        <a class="btn" href="#projects">${t("bProj")}</a>
        <a class="btn o" href="#resume">${t("bCV")}</a>
      </div>
      <div class="ph">
        <img src="assets/hero.webp" alt="Muhammad Ihsaan Al Fikri">
        <span class="bd b1">${badge[0]}</span>
        <span class="bd b2">${badge[1]}</span>
        <span class="bd b3">${badge[2]}</span>
      </div>
    </div>`;
}

function renderAbout() {
  const skills = SK.map(
    ([label, list]) => `
      <div class="row"><span class="mono">${label}</span><div>${list}</div></div>`
  ).join("");

  return `
    <h2>${t("aT")}</h2>
    <p style="max-width:42em;margin-bottom:2.5rem">${t("aP")}</p>
    <section class="blk">
      <h3 class="mono">${t("edT")}</h3>
      <p style="margin-top:.5rem;max-width:42em">${t("ed")}</p>
    </section>
    <section class="blk"><h3 class="mono">${t("exT")}</h3>${rows(t("ex"))}</section>
    <section class="blk"><h3 class="mono">${t("acT")}</h3>${rows(t("ac"))}</section>
    <section class="blk"><h3 class="mono">${t("skT")}</h3>${skills}</section>`;
}

function renderProjects() {
  const featured = P.revalue;

  const gridCards = ["portaberita", "myduit"]
    .map((key) => {
      const p = P[key];
      return `
        <a class="card pc" href="#p-${key}">
          ${img(p.img[0], p.cap)}
          <div>
            <p class="mono">${pick(p.c)}</p>
            <h3>${p.n}</h3>
            <p>${pick(p.d)}</p>
            ${tags(p.st.slice(0, 3))}
          </div>
        </a>`;
    })
    .join("");

  return `
    <h2>${t("pT")}</h2>
    <p class="mono" style="margin-bottom:.8rem">${t("pF")}</p>
    <a class="card feat" href="#p-revalue">
      <div>
        <p class="mono">${pick(featured.c)}</p>
        <h3 style="font-size:2rem;margin:.3rem 0 .6rem">${featured.n}</h3>
        <p>${pick(featured.d)}</p>
        ${tags(featured.st)}
        <p style="margin-top:1rem;color:var(--ac)">${t("more")}</p>
      </div>
      <div class="im">
        ${img("rv-home", featured.cap)}
        ${img("rv-hasil", featured.cap)}
      </div>
    </a>
    <div class="grid">${gridCards}</div>`;
}

function renderProject(key) {
  const p = P[key];
  if (!p) return renderProjects();

  const shots = p.img.map((name) => img(name, p.cap, p.w ? "w" : "")).join("");
  const links = p.ln
    .map(
      ([label, url]) =>
        `<a class="btn o" target="_blank" rel="noopener" href="${url}">${label} ↗</a>`
    )
    .join("");

  return `
    <a href="#projects" class="mono">${t("back")}</a>
    <p class="mono" style="margin-top:1.4rem">${pick(p.c)}</p>
    <h1 style="margin:.4rem 0 1rem">${p.n}</h1>
    <p style="max-width:36em;font-size:1.15rem">${pick(p.d)}</p>
    <div class="grid" style="margin:2rem 0">
      <div class="card"><span class="mono">${t("dRole")}</span><p>${pick(p.role)}</p></div>
      <div class="card"><span class="mono">${t("dStat")}</span><p>${pick(p.s)}</p></div>
    </div>
    <section class="blk">
      <h3 class="mono">${t("dAbout")}</h3>
      <p style="max-width:40em;margin-top:.5rem">${pick(p.a)}</p>
    </section>
    <section class="blk"><h3 class="mono">${t("dStack")}</h3>${tags(p.st)}</section>
    <section class="blk">
      <h3 class="mono" style="margin-bottom:.8rem">${t("dShots")}</h3>
      <div class="shots">${shots}</div>
    </section>
    <section class="blk">
      <h3 class="mono" style="margin-bottom:.8rem">${t("dLinks")}</h3>
      ${links}
    </section>`;
}

function renderResume() {
  return `
    <h2>${t("rT")}</h2>
    <p style="margin-bottom:2rem">${t("rS")}</p>
    <div class="grid">
      <div class="card">
        <h3>${t("cv1")}</h3>
        <p style="margin:.6rem 0 1.2rem">${t("cv1d")}</p>
        <a class="btn" target="_blank" href="cv.pdf">${t("open")}</a>
      </div>
      <div class="card">
        <h3>${t("cv2")}</h3>
        <p style="margin:.6rem 0 1.2rem">${t("cv2d")}</p>
        <a class="btn o" target="_blank" href="cv-kuliah.pdf">${t("open")}</a>
      </div>
    </div>`;
}

function renderContact() {
  const cards = CT.map(
    ([label, text, url]) => `
      <a class="card" target="_blank" rel="noopener" href="${url}" style="text-decoration:none">
        <span class="mono">${label}</span>
        <p style="margin-top:.3rem;overflow-wrap:anywhere">${text}</p>
      </a>`
  ).join("");

  return `
    <h2>${t("cT")}</h2>
    <p style="margin-bottom:2rem">${t("cS")}</p>
    <div class="grid">${cards}</div>`;
}

/* ---------- Routing ---------- */

const pages = {
  home: renderHome,
  about: renderAbout,
  projects: renderProjects,
  resume: renderResume,
  contact: renderContact,
};

function view(route) {
  if (route.startsWith("p-")) return renderProject(route.slice(2));
  return (pages[route] || renderHome)();
}

function route() {
  const current = location.hash.slice(1) || "home";
  const main = $("#m");

  main.innerHTML = `<div class="pg show">${view(current)}</div>`;

  /* Transisi halaman: fade opacity halus */
  const page = main.firstElementChild;
  requestAnimationFrame(() => requestAnimationFrame(() => page.classList.add("in")));

  /* Tandai menu aktif (halaman detail proyek menandai "Projects") */
  const active = current.startsWith("p-") ? "projects" : current;
  document
    .querySelectorAll("[data-r]")
    .forEach((a) => a.classList.toggle("on", a.dataset.r === active));

  /* Terapkan bahasa ke teks navbar */
  document.querySelectorAll("[data-i]").forEach((el) => {
    el.textContent = t(el.dataset.i);
  });

  document.documentElement.lang = lang;
  $("#nv").classList.remove("open");
  scrollTo(0, 0);
}

/* ---------- Kontrol: bahasa, tema, menu HP ---------- */

$("#lg").onclick = () => {
  lang = lang === "id" ? "en" : "id";
  const y = scrollY;
  route();
  scrollTo(0, y);
};

$("#th").onclick = () => {
  const root = document.documentElement;
  const isDark = root.dataset.theme
    ? root.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = isDark ? "light" : "dark";
};

$("#bg").onclick = () => $("#nv").classList.toggle("open");

addEventListener("hashchange", route);
route();
