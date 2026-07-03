const tickets = {
  bento1: {
    number: "Coupon No.01",
    icon: "🍱",
    title: "お弁当リクエスト券",
    pass: "0414",
    message: "使用1週間ほど前に事前連絡願います。\n好きなおかず沢山入れるね🤍"
  },
  bento2: {
    number: "Coupon No.02",
    icon: "🍱",
    title: "お弁当リクエスト券",
    pass: "0414",
    message: "使用1週間ほど前に事前連絡願います。\n張り切って作ります"
  },
  movie: {
    number: "Coupon No.03",
    icon: "🎬",
    title: "好きな映画一緒に鑑賞券",
    pass: "1204",
    message: "なんだかんだ映画行ったことなかったから。\n多動症だけど悪しからず"
  },
  hug: {
    number: "Coupon No.04",
    icon: "🤍",
    title: "ぎゅー券",
    pass: "0705",
    message: "私からのハグです"
  },
  drive: {
    number: "Coupon No.05",
    icon: "🚗",
    title: "行きたい場所付き添い券",
    pass: "0429",
    message: "行きたいところについて行くよ、県外でも可"
  },
  stay: {
    number: "Coupon No.06",
    icon: "🌙",
    title: "お泊まり券",
    pass: "0725",
    message: "のんびりお酒飲みながらお泊まり会、\n枕投げでもしますか？☺️"
  },
  letter: {
    number: "Coupon No.07",
    icon: "💌",
    title: "手紙プレゼント券",
    pass: "0817",
    message: "いつもありがとう🥰\n心を込めて手紙を書きます✉️"
  },
  surprise: {
    number: "Coupon No.08",
    icon: "🎁",
    title: "サプライズ券",
    pass: "4869",
    message: "逆張りの私からのサプライズ、\nお楽しみにね🥰"
  },
  secret: {
    number: "Coupon No.09",
    icon: "❓",
    title: "シークレット券",
    pass: "4869",
    message: "何が起こるか分かりません。"
  },
  final: {
    number: "FINAL COUPON",
    icon: "👑",
    title: "なんでも言うこと聞く券",
    pass: "8171204",
    message: "1日すぐるさんのものです",
    note: "有効期間：24時間\n8/17から利用可能",
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

couponNumber.textContent = ticket.number;
ticketIcon.textContent = ticket.icon;
ticketTitle.textContent = ticket.title;
ticketMessage.textContent = ticket.message;

if (ticket.note) {
  noteArea.textContent = ticket.note;
}

if (ticket.final) {
  document.body.classList.add("final-mode");
}

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
  } else {
    errorText.textContent = "パスコードが違います🥺";
    passInput.value = "";
  }
}

openButton.addEventListener("click", openPresent);
openGift.addEventListener("click", openPresent);
passButton.addEventListener("click", checkPass);

passInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkPass();
  }
});
