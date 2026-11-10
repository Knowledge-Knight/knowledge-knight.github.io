const subjects = [
  {name:"Mathematics", detail:"Maths Mela", symbol:"∑", color:"#eaf1ff", ink:"#2864df"},
  {name:"English", detail:"Santoor", symbol:"A", color:"#fff1e8", ink:"#df8740"},
  {name:"Hindi", detail:"Rimjhim", symbol:"अ", color:"#f2edff", ink:"#7958d8"},
  {name:"The World Around Us", detail:"Our Wondrous World", symbol:"🌍", color:"#e8f8ef", ink:"#249b60"},
  {name:"Arts Education", detail:"Bansuri", symbol:"✿", color:"#fff0f5", ink:"#d65c91"},
  {name:"Physical Education", detail:"Khel Yoga", symbol:"⚽", color:"#eaf7fb", ink:"#2792a9"}
];

const grid = document.getElementById("subjectGrid");
const search = document.getElementById("subjectSearch");
const empty = document.getElementById("emptyState");
const resourceTitle = document.getElementById("resourceTitle");
const message = document.getElementById("selectionMessage");
let selectedSubject = "";

function renderSubjects(filter = "") {
  const matches = subjects.filter(s => s.name.toLowerCase().includes(filter.toLowerCase()));
  grid.innerHTML = "";
  matches.forEach(subject => {
    const button = document.createElement("button");
    button.className = "subject-card" + (selectedSubject === subject.name ? " selected" : "");
    button.type = "button";
    button.innerHTML = `<span class="subject-symbol" style="background:${subject.color};color:${subject.ink}">${subject.symbol}</span>
      <span><b>${subject.name}</b><small>${subject.detail}</small></span><span class="subject-arrow">→</span>`;
    button.addEventListener("click", () => selectSubject(subject.name));
    grid.appendChild(button);
  });
  empty.hidden = matches.length !== 0;
}
function selectSubject(name) {
  selectedSubject = name;
  resourceTitle.textContent = `${name} resources`;
  message.innerHTML = `<span class="message-dot"></span>Great choice! Now select Notes, Flashcards, Practice Questions or Quizzes for ${name}.`;
  renderSubjects(search.value);
}
document.querySelectorAll(".resource-card").forEach(card => {
  card.addEventListener("click", () => {
    if (!selectedSubject) {
      message.innerHTML = '<span class="message-dot"></span>Please choose a subject first.';
      document.getElementById("subjects").scrollIntoView({behavior:"smooth"});
      return;
    }
    document.querySelectorAll(".resource-card").forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    const resource = card.dataset.resource;
    message.innerHTML = `<span class="message-dot"></span><b>${selectedSubject} · ${resource}</b> — This section is ready for your original content.`;
  });
});
search.addEventListener("input", e => renderSubjects(e.target.value));
renderSubjects();
