let pages = [];
let index = 0;

/* ---------- INIT ---------- */
window.addEventListener("DOMContentLoaded", () => {

    pages = document.querySelectorAll(".page");

    show(0);

    /* PHOTO FLIP */
    const cards = document.querySelectorAll(".photo-card");

    cards.forEach(card => {
        const back = card.querySelector(".back");
        back.textContent = card.getAttribute("data-text");

        card.addEventListener("click", () => {
            const active = card.classList.contains("active");

            cards.forEach(c => c.classList.remove("active"));

            if (!active) card.classList.add("active");
        });
    });
});

/* ---------- PAGE NAV ---------- */
function show(i){
    pages.forEach(p => p.classList.remove("active"));

    if (pages[i]) {
        pages[i].classList.add("active");
    }

    index = i;

    /* ✅ FINAL PAGE TRIGGER */
    if (pages[i] && pages[i].classList.contains("final")) {
        setTimeout(startFinalTyping, 300);
    }
}

function next(){
    if (index < pages.length - 1) {
        show(index + 1);
    }
}

function prev(){
    if (index > 0) {
        show(index - 1);
    }
}

/* ---------- INTRO ---------- */
function openStory(){
    document.getElementById("intro").style.display = "none";
    document.getElementById("app").style.display = "block";

    document.getElementById("introMusic").pause();
    document.getElementById("mainMusic").play();

    show(0);
}

/* ---------- MUSIC ---------- */
function toggleIntroMusic(){
    const m = document.getElementById("introMusic");
    if (m.paused) m.play();
    else m.pause();
}

/* ---------- TYPEWRITER (ONLY ONE VERSION) ---------- */
function typeWriter(el, text, speed = 25){
    let i = 0;
    el.innerHTML = "";

    function run(){
        if (i < text.length){
            el.innerHTML += text.charAt(i);
            i++;
            setTimeout(run, speed);
        }
    }

    run();
}

/* ---------- FINAL PAGE TYPEWRITER ---------- */
function startFinalTyping(){

    const final = document.querySelector(".final-text");
    if (!final) return;

    const p = final.querySelectorAll("p");

    if (p.length < 3) return;

    const text1 = p[0].textContent.trim();
    const text2 = p[2].textContent.trim();

    p[0].textContent = "";
    p[2].textContent = "";

    typeWriter(p[0], text1, 25);

    setTimeout(() => {
        typeWriter(p[2], text2, 25);
    }, text1.length * 25 + 400);
}
function toggleVideo(card){

    const isActive = card.classList.contains("active");

    // close all videos first (smooth fade)
    document.querySelectorAll(".video-card").forEach(v=>{
        v.classList.remove("active");
        let vid = v.querySelector("video");
        vid.pause();
        vid.currentTime = 0;
    });

    if(!isActive){
        card.classList.add("active");

        setTimeout(()=>{
            card.querySelector("video").play();
        }, 200); // slight delay = smoother feel
    }
}
let movieIndex = 0;
let movies;

window.addEventListener("DOMContentLoaded", () => {
    movies = document.querySelectorAll(".movie-card");

    if(movies.length > 0){
        startMovieMode();
    }
});

function startMovieMode(){
    movies.forEach(v => v.querySelector("video").pause());

    setInterval(() => {
        nextMovie();
    }, 6000); // change every 6 seconds

    playMovie(movies[0]);
}

function nextMovie(){
    movies[movieIndex].classList.remove("active");
    movies[movieIndex].querySelector("video").pause();

    movieIndex = (movieIndex + 1) % movies.length;

    playMovie(movies[movieIndex]);
}

function playMovie(card){
    card.classList.add("active");

    let vid = card.querySelector("video");
    vid.currentTime = 0;

    vid.play().catch(()=>{});
}
function toggleVideo(card){

    const isActive = card.classList.contains("active");

    // close all
    document.querySelectorAll(".video-card").forEach(v=>{
        v.classList.remove("active");
        let vid = v.querySelector("video");
        vid.pause();
    });

    if(!isActive){
        card.classList.add("active");
        card.querySelector("video").play();
    }
}

/* 🎬 AUTO PLAY BACKGROUND LOOP */
window.addEventListener("DOMContentLoaded", () => {

    const videos = document.querySelectorAll(".video-card video");

    videos.forEach(v=>{
        v.play().catch(()=>{});
    });

    let i = 0;

    setInterval(() => {
        videos.forEach(v => v.pause());

        videos[i].currentTime = 0;
        videos[i].play().catch(()=>{});

        i = (i + 1) % videos.length;
    }, 5000);
});
function openLetter(month){

    const popup = document.getElementById("letterPopup");
    const title = document.getElementById("letterTitle");
    const text = document.getElementById("letterText");

    const letters = {
        1: "Month 1 - The Beginning\n\nI still remember the first moments... the moment you said yes. the way I was so mesmerized with the thought of being with you. I wanted to express every thing that I felt during that day. It was perfect. The letter you made, the day you made me the happiest man by giving me your sweetest yes if true love really does exist, its you and its being with you my beloved langga! my day will never be as perfect today, without you in it.",
        2: "Month 2 - Feb\n\nDuring this month its more of a roller coaster and thrilling. You made me over come my fear which is anxiety. You knew that I was not confident enough but still forced me to go beyond my limits by introducing me in your family. I was really so happy the way you trusted me to be part of your family. I was overjoyed. Then after that we went to my house andI gave you my present the flowers and box which is hand crafted by me. It was all thanks to you thagt my creativity was again lived in me. thankyou my langga for staying and for giving me love that cannot be matched by others. I LOVE YOU.  .",
        3: "Month 3 - Sipalay\n\nIt feels like yesterday. Last time gina greet ko kaw happy birthday exactly 12 am... now look how much we have grown as an individuals langga ko. March was so special for me because I had the chance to celebrate your birthday with you and take those birthday blues away. Im so proud of you langga for telling me that thats why I made my best to be with you that day because I know it was hard enough for you to open up your feelings. Now that I'm already here, no more birthday sadness oweiki? baklan taka ube cake permi kag imo qwek qwek owiki? Thankyou langga ha for always being so comfortable to tell me anything that's been bothering you. I AM SO PROUD OF YOU ALWYAS!!  ",
        4: "Month 4 - Lola\n\nI've watched you grew in many different kinds of growth. for me this month was to most affectionate. The way you gave your time just to finished my suit that I needed to wear for my ball.Tas nag picture ta tatlo ni lola mwheheh gagmay sainyo.... Thankyou coming for my deepest heart my langga ko. And seeing you achieved that honor in your recognition feels like seeing your lover grow. I am so proud of you my langga yani ko, you never fail to make me. I hope that more achievements will be in your way and dont ever hesistate to grab it owki?.",
        5: "Month 5 - Movie\n\nThis month might be short (like you) charot.Wellcome to may, the month we watch A movie sa cinema nga du kita lang to duwa. it was a memorable as well because I was with you. mwheheh last money ko na to pro I still want to give you everything kayaa... bahala na basta ara kaw mwejeh then right after those thrilling hours of our life sa horror and mukbang foods, Nag mukbang kita ulit food sa canetown coffee kag ilocos empaanada BWHAHHAHAHAHA te puli ta nga du ga busong kita duwa hahaysss but atleast dibaa mwehe. Btw, first time ko maging ako sa tawo na palangga ko kay Im always filtering myself just to fit but with you, everything feels normal and it always comes naturally mwhehe blee bukaw!!.",
        6: "Month 6 - Recent\n\nThis will be the continuation of our love story, Today. Nag sleep over ta sa balay watch movies and mukbang sa mang inasal mwhehe ambot kung ako lang or weird gid ko ya kun upod ko ikaw... basta du ka natural sakun with youuu. Tapos nag side quest nanaman kitaaaa pagawahon tani kaso na flatan te duwa pa ta ga tulod ka motor na bug at bug at... Pro at least diba ya happy ta duwa mwheheheh amo lang na ih atun ligo sa housing nalang medjo higko pro lipay dyapon auh BWAHAHAHAHAHHA hisa gani mga tawo satun kay ga bibitime ta dyapon yaa anyways, Langga ko I want to be with you always and forever oweiki? kay be with mee until the end kay damo pa ta e story kag agyan and HAPPY 6TH MONTHSARRY LANGGA LANGGA KO PATO HAAA LESGOWWWWW 6th TANA NIII MWHWHEHEH LEO HAPPYYYYY (PALDO SI KUMAG LEO) "
    };

    title.innerText = "💌 Love Letter";
    text.innerText = letters[month];

    popup.style.display = "flex";
}

function closeLetter(){
    document.getElementById("letterPopup").style.display = "none";
}