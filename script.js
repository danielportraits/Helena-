const messages = [
"Me encanta tu forma de ser.",
"Me encanta tu voz, podría escucharte por horas.",
"Hablar contigo es lo mejor de mi día.",
"Eres increíble, nunca lo olvides.",
"Lo mejor de Parchís fuiste tú. ❤️",
"Tienes una manera muy bonita de hacerme sonreír.",
"Contigo, hasta una conversación sencilla se vuelve especial.",
"Qué bonito es coincidir contigo en esta vida.",
"Me encanta escucharte contarme cualquier cosa.",
"Eres una de mis coincidencias favoritas.",
"Me haces sonreír incluso cuando no te das cuenta.",
"Si pudiera repetir el día en que te conocí, lo haría mil veces.",
"Me gusta la tranquilidad que siento cuando hablo contigo.",
"Hay personas bonitas y luego estás tú.",
"No necesitas hacer nada especial para alegrarme el día.",
"Tu existencia hace este mundo un poquito más bonito.",
"Si supieras lo mucho que disfruto hablar contigo…",
"Me gusta conocerte un poquito más cada día.",
"Gracias por aparecer en mi vida.",
"Tu voz podría ser mi sonido favorito.",
"Si la casualidad me llevó a ti, qué bonita casualidad.",
"Entre tantas personas, qué suerte haber coincidido contigo.",
"Este girasol es pequeño, pero el cariño que te tengo es enorme. 🌻"
];

const garden = document.getElementById('garden');
const backdrop = document.getElementById('letter-backdrop');
const letterMessage = document.getElementById('letter-message');
const timerBar = document.getElementById('timer-bar');
const dogArea = document.getElementById('dog-area');
const openedCount = document.getElementById('opened-count');
const closeButton = document.getElementById('close-letter');
let closeTimer = null;
let barkTimer = null;
const discovered = new Set();

function createFlower(message, index) {
  const button = document.createElement('button');
  button.className = 'sunflower';
  button.type = 'button';
  button.setAttribute('aria-label', `Girasol ${index + 1}. Toca para descubrir un mensaje.`);
  button.innerHTML = '<span class="stem"></span><span class="leaf"></span><span class="leaf right"></span><span class="flower-head"><span class="petal-ring"></span><span class="flower-center"></span></span>';
  button.addEventListener('click', () => openMessage(message, index, button));
  return button;
}
messages.forEach((message, index) => garden.appendChild(createFlower(message, index)));

function openMessage(message, index, flower) {
  clearTimeout(closeTimer);
  document.querySelectorAll('.sunflower.blooming').forEach(el => el.classList.remove('blooming'));
  flower.classList.remove('blooming');
  void flower.offsetWidth;
  flower.classList.add('blooming', 'discovered');
  discovered.add(index);
  openedCount.textContent = discovered.size;
  letterMessage.textContent = message;
  backdrop.hidden = false;
  timerBar.style.animation = 'none';
  void timerBar.offsetWidth;
  timerBar.style.animation = 'countdown 8s linear forwards';
  makeDogBark();
  closeTimer = setTimeout(closeLetter, 8000);
}
function closeLetter() {
  backdrop.hidden = true;
  clearTimeout(closeTimer);
}
closeButton.addEventListener('click', closeLetter);
backdrop.addEventListener('click', event => { if (event.target === backdrop) closeLetter(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !backdrop.hidden) closeLetter(); });

function makeDogBark() {
  dogArea.classList.remove('barking');
  void dogArea.offsetWidth;
  dogArea.classList.add('barking');
  clearTimeout(barkTimer);
  barkTimer = setTimeout(() => dogArea.classList.remove('barking'), 1500);
  // Short synthesized "yap" sound; starts only after a tap, as browsers require.
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    [0, 0.19].forEach((offset, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(i ? 430 : 520, now + offset);
      osc.frequency.exponentialRampToValueAtTime(i ? 180 : 230, now + offset + 0.11);
      filter.type = 'lowpass';
      filter.frequency.value = 1100;
      gain.gain.setValueAtTime(0.0001, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.13, now + offset + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.13);
      osc.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
      osc.start(now + offset); osc.stop(now + offset + 0.14);
    });
    setTimeout(() => ctx.close(), 600);
  } catch (error) {
    // The visual barking animation still works if sound is unavailable.
  }
}
