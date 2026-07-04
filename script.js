const tickets = {
  bento1: {
    number: "Coupon No.01",
    icon: "🍱",
    title: "お弁当リクエスト券",
    pass: "0414",
    message: "使用1週間ほど前に事前連絡願います。\n好きなおかず沢山入れるね🤍",
    photos: ["images/bento1.jpg"]
  },
  bento2: {
    number: "Coupon No.02",
    icon: "🍱",
    title: "お弁当リクエスト券",
    pass: "0414",
    message: "使用1週間ほど前に事前連絡願います。\n張り切って作ります",
    photos: ["images/bento2.jpg"]
  },
  movie: {
    number: "Coupon No.03",
    icon: "🎬",
    title: "好きな映画一緒に鑑賞券",
    pass: "1204",
    message: "なんだかんだ映画行ったことなかったから。\n多動症だけど悪しからず",
    photos: ["images/movie.jpg"]
  },
  hug: {
    number: "Coupon No.04",
    icon: "🤍",
    title: "ぎゅー券",
    pass: "0705",
    message: "私からのハグです",
    photos: ["images/hug.jpg"]
  },
  drive: {
    number: "Coupon No.05",
    icon: "🚗",
    title: "行きたい場所付き添い券",
    pass: "0429",
    message: "行きたいところについて行くよ、県外でも可",
    photos: ["images/drive.jpg"]
  },
  stay: {
    number: "Coupon No.06",
    icon: "🌙",
    title: "お泊まり券",
    pass: "0725",
    message: "のんびりお酒飲みながらお泊まり会、\n枕投げでもしますか？☺️",
    photos: ["images/stay.jpg"]
  },
  letter: {
    number: "Coupon No.07",
    icon: "💌",
    title: "手紙プレゼント券",
    pass: "0817",
    message: "いつもありがとう🥰\n心を込めて手紙を書きます✉️",
    photos: ["images/letter.jpg"]
  },
  surprise: {
    number: "Coupon No.08",
    icon: "🎁",
    title: "サプライズ券",
    pass: "4869",
    message: "逆張りの私からのサプライズ、\nお楽しみにね🥰",
    photos: ["images/surprise.jpg"]
  },
  secret: {
    number: "Coupon No.09",
    icon: "❓",
    title: "シークレット券",
    pass: "4869",
    message: "何が起こるか分かりません。",
    photos: ["images/secret.jpg"]
  },
  final: {
    number: "FINAL COUPON",
    icon: "👑",
    title: "なんでも言うこと聞く券",
    pass: "8171204",
    message: "1日すぐるさんのものです",
    note: "有効期間：24時間\n8/17から利用可能",
    photos: ["images/final.jpg"],
    final: true
  }
};

const params = new URLSearchParams(window.location.search);
const ticketId = params.get("ticket") || "bento1";
const ticket = tickets[ticketId] || tickets.bento1;

const openButton = document.getElementById("openButton");
const openGift = document.getElementById("openGift");
const giftScreen = document.getElementById("giftScreen");
const ticketScreen = document.getElementById("ticketScreen");
const ticketPreview = document.getElementById("ticketPreview");

const couponNumber = document.getElementById("couponNumber");
const ticketIcon = document.getElementById("ticketIcon");
const ticketTitle = document.getElementById("ticketTitle");
const passInput = document.getElementById("passInput");
const passButton = document.getElementById("passButton");
const errorText = document.getElementById("errorText");
const passArea = document.getElementById("passArea");
const content = document.getElementById("content");
const ticketMessage = document.getElementById("ticketMessage");
const noteArea = document.getElementById("noteArea");
const photoFrame = document.getElementById("photoFrame");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const photoCount = document.getElementById("photoCount");
const modal = document.getElementById("photoModal");
const modalImage = document.getElementById("modalImage");
const musicButton = document.getElementById("musicButton");

let currentPhoto = 0;
let audioContext = null;
let musicTimer = null;
let musicOn = false;

ticketPreview.textContent = ticket.icon;
couponNumber.textContent = ticket.number;
ticketIcon.textContent = ticket.icon;
ticketTitle.textContent = ticket.title;
ticketMessage.textContent = ticket.message;

if (ticket.note) noteArea.textContent = ticket.note;
if (ticket.final) document.body.classList.add("final-mode");

function openPresent() {
  openGift.classList.add("open");
  setTimeout(() => {
    giftScreen.classList.add("hidden");
    ticketScreen.classList.remove("hidden");
  }, 900);
}

function checkPass() {
  if (passInput.value === ticket.pass) {
    errorText.textContent = "";
    passArea.classList.add("hidden");
    content.classList.remove("hidden");
    renderPhoto();
    sparkle();
  } else {
    errorText.textContent = "パスコードが違います🥺";
    passInput.value = "";
  }
}

function renderPhoto() {
  const photos = ticket.photos || [];
  const src = photos[currentPhoto];

  photoFrame.innerHTML = "";

  if (!src) {
    photoFrame.innerHTML = "<p>📷 写真はあとからここに入れます</p>";
    photoCount.textContent = "";
    prevBtn.style.visibility = "hidden";
    nextBtn.style.visibility = "hidden";
    return;
  }

  const img = document.createElement("img");
  img.src = src;
  img.alt = ticket.title;
  img.onerror = () => {
    photoFrame.innerHTML = "<p>📷 写真はあとからここに入れます</p>";
    photoCount.textContent = "";
  };
  img.onclick = () => {
    modalImage.src = src;
    modal.classList.remove("hidden");
  };

  photoFrame.appendChild(img);

  if (photos.length > 1) {
    photoCount.textContent = `${currentPhoto + 1} / ${photos.length}`;
    prevBtn.style.visibility = "visible";
    nextBtn.style.visibility = "visible";
  } else {
    photoCount.textContent = "";
    prevBtn.style.visibility = "hidden";
    nextBtn.style.visibility = "hidden";
  }
}

function changePhoto(direction) {
  const photos = ticket.photos || [];
  if (photos.length <= 1) return;
  currentPhoto = (currentPhoto + direction + photos.length) % photos.length;
  renderPhoto();
}

function sparkle() {
  for (let i = 0; i < 18; i++) {
    const star = document.createElement("div");
    star.textContent = ticket.final ? "✦" : "✨";
    star.style.position = "fixed";
    star.style.left = Math.random() * 100 + "vw";
    star.style.top = "45vh";
    star.style.fontSize = 16 + Math.random() * 16 + "px";
    star.style.zIndex = "30";
    star.style.pointerEvents = "none";
    star.style.transition = "1.2s ease";
    document.body.appendChild(star);

    requestAnimationFrame(() => {
      star.style.transform = `translateY(${120 + Math.random() * 160}px) rotate(${Math.random()*180}deg)`;
      star.style.opacity = "0";
    });

    setTimeout(() => star.remove(), 1300);
  }
}

function playTone(freq, start, duration) {
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, audioContext.currentTime + start);
  gain.gain.exponentialRampToValueAtTime(0.04, audioContext.currentTime + start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + start + duration);
  osc.connect(gain).connect(audioContext.destination);
  osc.start(audioContext.currentTime + start);
  osc.stop(audioContext.currentTime + start + duration + 0.05);
}

function playBirthdayMelody() {
  if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const melody = [
    [392,0,.28],[392,.32,.28],[440,.64,.55],[392,1.24,.55],[523,1.84,.55],[494,2.44,.9],
    [392,3.55,.28],[392,3.87,.28],[440,4.19,.55],[392,4.79,.55],[587,5.39,.55],[523,5.99,.9]
  ];
  melody.forEach(n => playTone(n[0], n[1], n[2]));
}

function toggleMusic() {
  if (!musicOn) {
    musicOn = true;
    musicButton.textContent = "🎵";
    playBirthdayMelody();
    musicTimer = setInterval(playBirthdayMelody, 7600);
  } else {
    musicOn = false;
    musicButton.textContent = "🔇";
    clearInterval(musicTimer);
  }
}

openButton.addEventListener("click", openPresent);
openGift.addEventListener("click", openPresent);
passButton.addEventListener("click", checkPass);
prevBtn.addEventListener("click", () => changePhoto(-1));
nextBtn.addEventListener("click", () => changePhoto(1));
musicButton.addEventListener("click", toggleMusic);
modal.addEventListener("click", () => modal.classList.add("hidden"));

passInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") checkPass();
});
