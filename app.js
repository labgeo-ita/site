/* LabGeo-ITA — renderização da interface a partir de data.js */

const UI = {
  pt: {
    nav_home: "Home", nav_research: "Pesquisa", nav_projects: "Projetos", nav_team: "Equipe", nav_pubs: "Publicações",
    hero_title1: "Transformando Dados Geoespaciais em", hero_title2: "Aplicações em Ecologia, Eng. Civil e de Transportes",
    btn_research: "Nossas Pesquisas", btn_collab: "Colaborar Conosco",
    research_title: "Linhas de Pesquisa", research_subtitle: "Clique em uma linha para ver pesquisadores, projetos e artigos associados",
    proj_title: "Projetos & Financiamento", proj_ongoing: "Em Andamento", proj_finished: "Finalizados",
    team_title: "Nossa Equipe", title_researchers: "Pesquisadores Associados", title_students: "Doutorandos & Mestrandos",
    title_tech: "Apoio Técnico", title_collaborators: "Rede de Colaboração Acadêmica", title_alumni: "Alumni (Ex-Alunos)",
    alumni_doctors: "Doutores & Mestres", alumni_grad: "Graduados (Engenharia Civil-Aeronáutica)",
    team_hint: "Clique em uma pessoa para ver artigos, linhas de pesquisa e projetos",
    pubs_title: "Publicações Selecionadas", tab_journal: "Artigos em Periódicos", tab_book: "Livros & Capítulos",
    tab_conference: "Anais de Congressos", tab_technical: "Trabalhos Técnicos",
    empty_book: "Nenhum capítulo listado ainda.", empty_conference: "Lista de congressos em breve.", empty_technical: "Relatórios técnicos em breve.",
    view_more: "Ver lista completa no Google Scholar →",
    modal_title: "Colaborar Conosco", modal_desc: "Selecione uma opção para entrar em contato:", btn_email_send: "Enviar E-mail", btn_selection_process: "Processo Seletivo ITA",
    footer_a: "Desenvolvido para fins de pesquisa científica.", footer_b: "Instituto Tecnológico de Aeronáutica (ITA)",
    d_lines: "Linhas de pesquisa", d_projects: "Projetos", d_pubs: "Artigos", d_people: "Pesquisadores", d_focus: "Foco atual",
    d_back: "Voltar", d_close: "Fechar", access: "Acessar Artigo", no_link: "Link a preencher", lattes: "Lattes",
    empty_pubs: "Nenhum artigo cadastrado ainda — a preencher (Lattes).", empty_projects: "Nenhum projeto associado ainda — a preencher.",
    empty_people: "Nenhum pesquisador associado ainda — a preencher.", empty_lines: "Nenhuma linha associada ainda — a preencher.",
    leader: "Líder", from: "Lab",
  },
  en: {
    nav_home: "Home", nav_research: "Research", nav_projects: "Projects", nav_team: "People", nav_pubs: "Publications",
    hero_title1: "Turning Geospatial Data into", hero_title2: "Ecology, Civil and Transport Engineering Applications",
    btn_research: "Our Research", btn_collab: "Collaborate",
    research_title: "Research Lines", research_subtitle: "Click a line to see associated researchers, projects and papers",
    proj_title: "Projects & Funding", proj_ongoing: "Ongoing", proj_finished: "Finished",
    team_title: "Our Team", title_researchers: "Associated Researchers", title_students: "PhD & MSc Students",
    title_tech: "Technical Support", title_collaborators: "Academic Collaboration Network", title_alumni: "Alumni (Former Members)",
    alumni_doctors: "PhD & MSc", alumni_grad: "Graduates (Civil-Aeronautical Eng.)",
    team_hint: "Click a person to see papers, research lines and projects",
    pubs_title: "Selected Publications", tab_journal: "Journal Papers", tab_book: "Books & Chapters",
    tab_conference: "Conference Proceedings", tab_technical: "Technical Reports",
    empty_book: "No chapters listed yet.", empty_conference: "Conference list coming soon.", empty_technical: "Technical reports coming soon.",
    view_more: "See full list on Google Scholar →",
    modal_title: "Collaborate with Us", modal_desc: "Choose an option to contact us:", btn_email_send: "Send Email", btn_selection_process: "ITA Selection Process",
    footer_a: "Developed for scientific research purposes.", footer_b: "Instituto Tecnológico de Aeronáutica (ITA)",
    d_lines: "Research lines", d_projects: "Projects", d_pubs: "Papers", d_people: "Researchers", d_focus: "Current focus",
    d_back: "Back", d_close: "Close", access: "Read Paper", no_link: "Link to be added", lattes: "Lattes",
    empty_pubs: "No papers registered yet — to be filled in (Lattes).", empty_projects: "No associated project yet — to be filled in.",
    empty_people: "No associated researcher yet — to be filled in.", empty_lines: "No associated line yet — to be filled in.",
    leader: "Head", from: "Lab",
  },
};

let lang = localStorage.getItem("labgeo-lang") || "pt";
let activeTab = "journal";
const stack = []; // histórico do painel lateral: {kind,id}

const $ = (s, r = document) => r.querySelector(s);
const tr = (k) => UI[lang][k] ?? k;
const tx = (o) => (o && typeof o === "object" ? o[lang] ?? o.pt : o ?? "");
const byId = (arr, id) => arr.find((x) => x.id === id);
const lattesUrl = (id) => `https://lattes.cnpq.br/${id}`;
const pubsOfPerson = (id) => PUBLICATIONS.filter((p) => p.authors.includes(id));
const pubsOfLine = (id) => PUBLICATIONS.filter((p) => p.lines.includes(id));
const peopleOfLine = (id) => PEOPLE.filter((p) => p.lines.includes(id));
const projectsOfLine = (id) => PROJECTS.filter((p) => p.lines.includes(id));
const initials = (n) => n.replace(/^(Dr\.|Dra\.|MSc\.|Prof\.)\s*/i, "").split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("");

/* ---------- peças reutilizáveis ---------- */
function avatar(p, size = "w-16 h-16") {
  return `<div class="avatar ${size}"><span>${initials(p.name)}</span>
    <img src="./${p.photo}" alt="${p.short}" loading="lazy" onerror="this.remove()"></div>`;
}
const lattesBtn = (p) => `<a href="${lattesUrl(p.lattes)}" target="_blank" rel="noopener" class="lattes-btn" onclick="event.stopPropagation()"
  title="Currículo Lattes">${tr("lattes")} <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`;
const chip = (kind, id, label, icon) => `<button class="chip" onclick="openDrawer('${kind}','${id}')"><i class="fa-solid ${icon}"></i>${label}</button>`;
const empty = (k) => `<p class="empty-note"><i class="fa-regular fa-pen-to-square"></i> ${tr(k)}</p>`;

function pubCard(p, compact = false) {
  const people = p.authors.map((id) => byId(PEOPLE, id)).filter(Boolean)
    .map((a) => `<button class="author-pill" onclick="openDrawer('person','${a.id}')"><i class="fa-solid fa-user"></i> ${a.short}</button>`).join("");
  const lines = p.lines.map((id) => byId(LINES, id)).filter(Boolean)
    .map((l) => `<button class="line-pill" onclick="openDrawer('line','${l.id}')">${tx(l.title).split(/[,&]| e /)[0]}</button>`).join("");
  const link = p.url
    ? `<a href="${p.url}" target="_blank" rel="noopener" class="pub-link"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${tr("access")}</a>`
    : `<span class="pub-link disabled"><i class="fa-solid fa-link-slash"></i> ${tr("no_link")}</span>`;
  return `<article class="pub-card ${compact ? "compact" : ""}">
    <div class="pub-year"><span>${p.year}</span>${p.q1 ? '<em>Q1</em>' : ""}</div>
    <div class="pub-body">
      <h4>${p.title}</h4>
      <p class="pub-authors">${p.authorsText}</p>
      <p class="pub-venue">${p.venue}</p>
      <div class="pub-tags">${compact ? "" : lines}${people}</div>
      ${link}
    </div></article>`;
}

/* ---------- seções ---------- */
function renderLines() {
  $("#lines-grid").innerHTML = LINES.map((l) => `
    <button class="line-card group" onclick="openDrawer('line','${l.id}')">
      <div class="line-img"><img src="./${l.img}" alt="" loading="lazy"><span class="line-tag">${tx(l.tag)}</span>
        <span class="line-icon"><i class="fa-solid ${l.icon}"></i></span></div>
      <h3>${tx(l.title)}</h3><p>${tx(l.desc)}</p>
      <div class="line-meta"><span><i class="fa-solid fa-users"></i> ${peopleOfLine(l.id).length}</span>
        <span><i class="fa-regular fa-file-lines"></i> ${pubsOfLine(l.id).length}</span>
        <span class="line-more">${lang === "pt" ? "Ver detalhes" : "See details"} <i class="fa-solid fa-arrow-right"></i></span></div>
    </button>`).join("");
}

function projectCard(p) {
  const on = p.status === "ongoing";
  return `<button class="proj-card ${on ? "on" : "off"}" onclick="openDrawer('project','${p.id}')">
    <div class="flex justify-between items-start gap-3"><h4>${p.name}</h4><span class="proj-badge">${tx(p.period)}</span></div>
    <p>${tx(p.desc)}</p>
    <div class="proj-lines">${p.lines.map((id) => `<span>${tx(byId(LINES, id).title).split(/[,&]| e /)[0]}</span>`).join("")}</div></button>`;
}
function renderProjects() {
  const sec = (st, title, dot) => `<h3 class="sub-title"><span class="dot ${dot}"></span>${tr(title)}</h3>
    <div class="grid md:grid-cols-2 gap-6 mb-12">${PROJECTS.filter((p) => p.status === st).map(projectCard).join("")}</div>`;
  $("#projects-body").innerHTML = sec("ongoing", "proj_ongoing", "live") + sec("finished", "proj_finished", "idle");
}

function personCard(p) {
  const n = pubsOfPerson(p.id).length;
  return `<div class="person-card" role="button" tabindex="0" onclick="openDrawer('person','${p.id}')"
      onkeydown="if(event.key==='Enter')openDrawer('person','${p.id}')">
    <div class="person-head">${avatar(p, "av-p")}
      <h4>${p.name}</h4><span class="role">${tx(p.role)}</span>${lattesBtn(p)}</div>
    <p class="bio">${tx(p.bio)}</p>
    ${p.focus ? `<div class="focus-box">${tx(p.focus)}</div>` : ""}
    <div class="person-foot"><span><i class="fa-regular fa-file-lines"></i> ${n}</span>
      <span class="person-lines">${p.lines.map((id) => `<i title="${tx(byId(LINES, id).title)}" class="fa-solid ${byId(LINES, id).icon}"></i>`).join("")}</span></div>
  </div>`;
}
function renderTeam() {
  const L = PEOPLE.find((p) => p.group === "leader");
  const group = (g) => PEOPLE.filter((p) => p.group === g).map(personCard).join("");
  $("#leader").innerHTML = `<div class="leader-card" role="button" tabindex="0" onclick="openDrawer('person','${L.id}')">
    ${avatar(L, "av-l")}
    <div class="text-center md:text-left flex-1">
      <div class="flex flex-col md:flex-row items-center gap-2 justify-center md:justify-start"><h3>${L.name}</h3>${lattesBtn(L)}</div>
      <span class="role gold">${tx(L.role)}</span>
      <p class="bio">${tx(L.bio)}</p>
      <div class="focus-box"><b>${tr("d_focus")}</b>${tx(L.focus)}</div>
    </div></div>`;
  $("#grid-researchers").innerHTML = group("researcher");
  $("#grid-students").innerHTML = group("student");
  $("#grid-tech").innerHTML = group("tech");
  $("#grid-collab").innerHTML = COLLABORATORS.map(([n, i]) => `<div class="collab-card"><div class="collab-ico"><i class="fa-solid fa-user-tie"></i></div>
    <h5>${n}</h5><span>${i}</span></div>`).join("");
  $("#alumni-post").innerHTML = ALUMNI_POST.map(([n, d]) => `<li><i class="fa-solid fa-user-graduate"></i><span><strong>${n}</strong> - ${tx(d)}</span></li>`).join("");
  $("#alumni-grad").innerHTML = ALUMNI_GRAD.map(([n, d]) => `<li><i class="fa-solid fa-certificate"></i><span><strong>${n}</strong> - ${lang === "pt" ? "Engenheiro(a)" : "Engineer"} (${d})</span></li>`).join("");
}

function renderPubs() {
  $("#pub-tabs").innerHTML = PUB_TABS.map((t) =>
    `<button onclick="switchTab('${t}')" class="tab ${t === activeTab ? "tab-active" : ""}">${tr("tab_" + t)}</button>`).join("");
  const list = PUBLICATIONS.filter((p) => p.type === activeTab).sort((a, b) => b.year - a.year);
  $("#pub-list").innerHTML = list.length ? list.map((p) => pubCard(p)).join("")
    : `<div class="text-center py-12 text-slate-400 italic">${tr("empty_" + activeTab)}</div>`;
}
function switchTab(t) { activeTab = t; renderPubs(); }

/* ---------- painel lateral (linhas / pessoas / projetos) ---------- */
function section(title, icon, html, count) {
  return `<section class="d-sec"><h5><i class="fa-solid ${icon}"></i> ${title}${count != null ? `<em>${count}</em>` : ""}</h5>${html}</section>`;
}
function drawerContent(kind, id) {
  if (kind === "line") {
    const l = byId(LINES, id), ppl = peopleOfLine(id), prj = projectsOfLine(id), pubs = pubsOfLine(id).sort((a, b) => b.year - a.year);
    return `<div class="d-hero" style="background-image:linear-gradient(135deg,rgba(10,28,63,.92),rgba(15,42,92,.78)),url('./${l.img}')">
        <span class="d-kicker">${tx(l.tag)}</span><h2>${tx(l.title)}</h2><p>${tx(l.desc)}</p></div>
      <div class="d-body">
      ${section(tr("d_people"), "fa-users", ppl.length ? `<div class="d-people">${ppl.map((p) => `
        <button class="d-person" onclick="openDrawer('person','${p.id}')">${avatar(p, "w-12 h-12")}<span><b>${p.short}</b><small>${tx(p.role).split("(")[0]}</small></span></button>`).join("")}</div>` : empty("empty_people"), ppl.length)}
      ${section(tr("d_projects"), "fa-diagram-project", prj.length ? prj.map(projectCard).join("") : empty("empty_projects"), prj.length)}
      ${section(tr("d_pubs"), "fa-file-lines", pubs.length ? pubs.map((p) => pubCard(p, true)).join("") : empty("empty_pubs"), pubs.length)}
      </div>`;
  }
  if (kind === "person") {
    const p = byId(PEOPLE, id), pubs = pubsOfPerson(id).sort((a, b) => b.year - a.year);
    return `<div class="d-hero person">
        <div class="flex items-center gap-5">${avatar(p, "w-24 h-24")}
          <div><h2>${p.name}</h2><p class="role">${tx(p.role)}</p>
          <a href="${lattesUrl(p.lattes)}" target="_blank" rel="noopener" class="d-lattes"><i class="fa-solid fa-id-card"></i> ${tr("lattes")} <i class="fa-solid fa-arrow-up-right-from-square"></i></a></div></div>
        <p class="bio">${tx(p.bio)}</p></div>
      <div class="d-body">
      ${p.focus ? section(tr("d_focus"), "fa-bullseye", `<p class="text-sm italic text-slate-600">${tx(p.focus)}</p>`) : ""}
      ${section(tr("d_lines"), "fa-layer-group", p.lines.length ? `<div class="flex flex-wrap gap-2">${p.lines.map((l) => chip("line", l, tx(byId(LINES, l).title), byId(LINES, l).icon)).join("")}</div>` : empty("empty_lines"), p.lines.length)}
      ${section(tr("d_projects"), "fa-diagram-project", p.projects.length ? p.projects.map((i) => projectCard(byId(PROJECTS, i))).join("") : empty("empty_projects"), p.projects.length)}
      ${section(tr("d_pubs"), "fa-file-lines", pubs.length ? pubs.map((x) => pubCard(x, true)).join("") : empty("empty_pubs"), pubs.length)}
      </div>`;
  }
  const pr = byId(PROJECTS, id), ppl = PEOPLE.filter((p) => p.projects.includes(id));
  return `<div class="d-hero"><span class="d-kicker">${pr.status === "ongoing" ? tr("proj_ongoing") : tr("proj_finished")} · ${tx(pr.period)}</span>
      <h2>${pr.name}</h2><p>${tx(pr.desc)}</p></div>
    <div class="d-body">
    ${section(tr("d_lines"), "fa-layer-group", `<div class="flex flex-wrap gap-2">${pr.lines.map((l) => chip("line", l, tx(byId(LINES, l).title), byId(LINES, l).icon)).join("")}</div>`, pr.lines.length)}
    ${section(tr("d_people"), "fa-users", ppl.length ? `<div class="d-people">${ppl.map((p) => `
      <button class="d-person" onclick="openDrawer('person','${p.id}')">${avatar(p, "w-12 h-12")}<span><b>${p.short}</b><small>${tx(p.role).split("(")[0]}</small></span></button>`).join("")}</div>` : empty("empty_people"), ppl.length)}
    </div>`;
}
function paintDrawer() {
  const top = stack[stack.length - 1];
  $("#drawer-content").innerHTML = top ? drawerContent(top.kind, top.id) : "";
  $("#drawer-back").classList.toggle("hidden", stack.length < 2);
  $("#drawer-scroll").scrollTop = 0;
}
function openDrawer(kind, id) {
  const top = stack[stack.length - 1];
  if (!top || top.kind !== kind || top.id !== id) stack.push({ kind, id });
  paintDrawer();
  $("#drawer").classList.add("open");
  document.body.classList.add("no-scroll");
}
function drawerBack() { stack.pop(); paintDrawer(); }
function closeDrawer() {
  stack.length = 0;
  $("#drawer").classList.remove("open");
  document.body.classList.remove("no-scroll");
}

/* ---------- modal, idioma, init ---------- */
const openModal = () => $("#collab-modal").classList.remove("hidden");
const closeModal = () => $("#collab-modal").classList.add("hidden");

function setLanguage(l) {
  lang = l; localStorage.setItem("labgeo-lang", l);
  document.documentElement.lang = l === "pt" ? "pt-br" : "en";
  document.querySelectorAll("[data-i18n]").forEach((el) => { el.innerHTML = tr(el.dataset.i18n); });
  $("#btn-pt").classList.toggle("lang-on", l === "pt");
  $("#btn-en").classList.toggle("lang-on", l === "en");
  renderLines(); renderProjects(); renderTeam(); renderPubs();
  if (stack.length) paintDrawer();
}

document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeModal(); closeDrawer(); } });
$("#collab-modal").addEventListener("click", (e) => { if (e.target.id === "collab-modal") closeModal(); });
window.addEventListener("scroll", () => $("#nav").classList.toggle("scrolled", scrollY > 20), { passive: true });
$("#socials").innerHTML = SOCIALS.map((s) => s.url
  ? `<a href="${s.url}" target="_blank" rel="noopener" title="${s.name}" aria-label="${s.name}"><i class="${s.icon}"></i></a>`
  : `<span class="off" title="${s.name} (em breve)"><i class="${s.icon}"></i></span>`).join("");
$("#year").textContent = new Date().getFullYear();
setLanguage(lang);

