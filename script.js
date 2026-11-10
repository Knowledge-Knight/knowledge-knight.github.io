const classButtons = document.querySelectorAll(".class-btn");
const learningArea = document.getElementById("learning-area");
const contentTitle = document.getElementById("content-title");
const contentEyebrow = document.getElementById("content-eyebrow");
const contentBody = document.getElementById("content-body");
let selectedClass = "5";
let flashIndex = 0;
let score = 0;
let answered = new Set();

const resources = {
  notes: {
    title: "Starter study notes",
    html: `<div class="content-panel">
      <h3>Science • Living and non-living things</h3>
      <p><b>Living things</b> need food, water and air. They grow, respond to their surroundings and reproduce.</p>
      <ul><li>Plants are living things because they grow and make new plants.</li><li>Animals are living things because they need food and water.</li><li>A stone is non-living because it does not grow or reproduce by itself.</li></ul>
      <p><b>Remember:</b> These are starter notes. Add your own class-wise chapters after checking the correct school syllabus.</p>
    </div>`
  },
  flashcards: {title:"Quick revision flashcards"},
  quiz: {title:"Knowledge Knight mini quiz"}
};

const cards = [
  ["What do plants need to make food?","Sunlight, water and carbon dioxide."],
  ["Which organ pumps blood?","The heart."],
  ["What is the boiling point of water at sea level?","100°C."],
  ["What is the largest planet in our solar system?","Jupiter."],
  ["What do we call animals that eat only plants?","Herbivores."]
];

const questions = [
  {q:"Which part of a plant absorbs water from the soil?",a:["Flower","Roots","Leaves"],correct:1,why:"Roots absorb water and minerals from the soil."},
  {q:"Which planet is known as the Red Planet?",a:["Mars","Venus","Neptune"],correct:0,why:"Iron-rich dust makes Mars look reddish."},
  {q:"How many sides does a hexagon have?",a:["Five","Six","Eight"],correct:1,why:"A hexagon has six sides."},
  {q:"Which gas do humans need to breathe?",a:["Oxygen","Helium","Hydrogen"],correct:0,why:"Our bodies use oxygen to release energy from food."},
  {q:"What is 9 × 7?",a:["56","63","72"],correct:1,why:"9 multiplied by 7 equals 63."}
];

function showResource(type){
  const item = resources[type];
  learningArea.hidden = false;
  contentEyebrow.textContent = `CLASS ${selectedClass} • LEARNING RESOURCE`;
  contentTitle.textContent = item.title;
  if(type === "notes") contentBody.innerHTML = item.html;
  if(type === "flashcards") renderFlashcard();
  if(type === "quiz") renderQuiz();
  learningArea.scrollIntoView({behavior:"smooth",block:"start"});
}
function renderFlashcard(){
  const [front,back] = cards[flashIndex];
  contentBody.innerHTML = `<div class="flashcard"><span class="eyebrow">CARD ${flashIndex+1} OF ${cards.length}</span><strong>${front}</strong><button class="btn primary" id="reveal-card">Reveal answer</button><p id="card-answer" hidden>${back}</p><div style="margin-top:18px"><button class="btn secondary" id="next-card">Next card →</button></div></div>`;
  document.getElementById("reveal-card").addEventListener("click",()=>{document.getElementById("card-answer").hidden=false;});
  document.getElementById("next-card").addEventListener("click",()=>{flashIndex=(flashIndex+1)%cards.length;renderFlashcard();});
}
function renderQuiz(){
  score=0;answered=new Set();
  contentBody.innerHTML = `<div class="content-panel"><p>Choose one answer for each question. Your score will appear at the end.</p><div id="questions"></div><h3 id="quiz-result" aria-live="polite"></h3></div>`;
  const wrap=document.getElementById("questions");
  questions.forEach((q,i)=>{
    const box=document.createElement("div");box.className="quiz-question";
    const heading=document.createElement("h3");heading.textContent=`${i+1}. ${q.q}`;box.appendChild(heading);
    q.a.forEach((answer,j)=>{
      const btn=document.createElement("button");btn.className="answer";btn.textContent=answer;
      btn.addEventListener("click",()=>{
        if(answered.has(i))return;
        answered.add(i);
        const buttons=box.querySelectorAll(".answer");
        buttons.forEach((b,k)=>{b.disabled=true;if(k===q.correct)b.classList.add("correct");});
        if(j===q.correct)score++;else btn.classList.add("wrong");
        const explanation=document.createElement("p");explanation.textContent=q.why;explanation.style.color="#66758d";box.appendChild(explanation);
        if(answered.size===questions.length)document.getElementById("quiz-result").textContent=`You scored ${score} out of ${questions.length}. ${score===5?"Excellent work!":"Good effort — keep practising!"}`;
      });
      box.appendChild(btn);
    });
    wrap.appendChild(box);
  });
}
classButtons.forEach(button=>button.addEventListener("click",()=>{
  classButtons.forEach(b=>b.classList.remove("active"));
  button.classList.add("active");selectedClass=button.dataset.class;
  document.querySelectorAll("[data-open]").forEach(b=>b.setAttribute("aria-label",`${b.textContent.trim()} for Class ${selectedClass}`));
}));
document.querySelectorAll("[data-open]").forEach(button=>button.addEventListener("click",()=>showResource(button.dataset.open)));
document.getElementById("close-content").addEventListener("click",()=>{learningArea.hidden=true;});
document.getElementById("year").textContent=new Date().getFullYear();
