// ---------- Active video change ----------

const videoBoxes = Array.from(document.querySelectorAll('.videoBox'));
const onPlay = document.querySelector('.onPlay');
const root = document.querySelector(":root");
let intervalId = '';

function translate(index = videoBoxes.indexOf(document.querySelector('.active'))) {
    videoBoxes.map(videoBox => videoBox.style.cssText = `translate: ${(onPlay.offsetLeft - 175 - (index * 300))}px;`);
};

translate();

videoBoxes.forEach(box => {
    box.addEventListener('click', () => {
        let index = videoBoxes.indexOf(box);
        videoBoxes.map(videoBox => {
            videoBox.style.cssText = `translate: ${(onPlay.offsetLeft - 175) - (index * 300)}px;`;
            videoBox.classList.remove('active');
        });
        box.classList.add('active');
        videosPlay(index);
    });
});

function activeChange(index) {
    if(index == videoBoxes.length) index = 0;
    let activeBox = videoBoxes[index];
    videoBoxes.map(videoBox => {
        videoBox.style.cssText = `translate: ${(onPlay.offsetLeft - 175) - (index * 300)}px;`;
        videoBox.classList.remove('active');
    });
    activeBox.classList.add('active');
    videosPlay(index);
}

// ---------- like button ----------

const likeBtns = document.querySelectorAll('.bx-heart');

likeBtns.forEach(btn => btn.addEventListener('click', () => btn.classList.toggle('bxs-heart')));

// ---------- putting videoBoxes to the center ---------- 

window.addEventListener('resize', () => {
    translate();
});

// ---------- Next & previouse slider buttons ----------

const sliderBtns = document.querySelectorAll('.onPlay i');

sliderBtns.forEach(icon => {
    icon.addEventListener('click', () => {
        let boxOrder = videoBoxes.indexOf(document.querySelector('.active'));
        videoBoxes.map(boxes => boxes.classList.remove('active'));
        if(icon.classList.contains('bx-chevron-right')) {
            if(boxOrder == videoBoxes.length-1) boxOrder = -1;
            videoBoxes[boxOrder + 1].classList.add('active');
            translate(boxOrder + 1);
            videosPlay(boxOrder + 1);
        }
        else {
            if(boxOrder == 0) boxOrder = videoBoxes.length;
            videoBoxes[boxOrder - 1].classList.add('active');
            translate(boxOrder - 1);
            videosPlay(boxOrder - 1);
        };
    });
});

// ---------- Auto play ----------

let videos = Array.from(document.querySelectorAll('.video'));

function videosPlay(index) {
    childArray = Array.from(videos[index].children);
    childArray.map(imgChild => {
        imgIndex = childArray.indexOf(imgChild);
        if(imgIndex < childArray.length - 1) {
            imgChild.style.cssText = `animation-delay: ${imgIndex *3}s`;
        };
    });
    if(intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
        activeChange(++index);
    }, (childArray.length - 1) * 3000);
    root.style.setProperty('--count', `${childArray.length-1}`);
};

videosPlay(0);