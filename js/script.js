document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links li");

    hamburger.addEventListener('click', () => {
        //Animate Links
        navLinks.classList.toggle("open");
        links.forEach(link => {
            link.classList.toggle("fade");
        });

        //Hamburger Animation
        hamburger.classList.toggle("toggle");
    });
});


document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('custom-video');
    var playButton = document.getElementById('play-button');
    var soundIcon = document.getElementById('sound-icon');
    var progressBar = document.getElementById('progress-bar');
    var isFirstPlay = true;

    // Função para iniciar ou pausar o vídeo quando o botão de reprodução for clicado
    function togglePlayPause() {
        if (isFirstPlay) {
            video.currentTime = 0; // Reinicia o vídeo para o início
            video.play();
            video.muted = false; // Desmuta o vídeo
            playButton.style.display = 'none'; // Oculta o botão de reprodução quando o vídeo está sendo reproduzido
            soundIcon.style.display = 'none'; // Oculta o ícone de som silenciado e o texto
            isFirstPlay = false;
        } else {
            if (video.paused) {
                video.play();
                playButton.style.display = 'none'; // Oculta o botão de reprodução quando o vídeo está sendo reproduzido
            } else {
                video.pause();
            }
        }
    }

    // Atualiza a barra de progresso do vídeo
    function updateProgressBar() {
        var progress = (video.currentTime / video.duration) * 100;
        var scaledProgress = Math.pow(progress / 100, 0.5) * 100; // Aplicando a função de escala
        progressBar.style.width = scaledProgress + '%';

        // Verifica se o vídeo chegou ao fim
        if (progress === 100) {
            isFirstPlay = true;
            playButton.style.display = 'block'; // Exibe o botão de reprodução quando o vídeo termina
        } else {
            // Continua a atualização da barra de progresso enquanto o vídeo estiver sendo reproduzido
            requestAnimationFrame(updateProgressBar);
        }

        // Verifica se o vídeo está no fim e oculta o ícone de som
        if (video.currentTime >= video.duration - 0.1) {
            soundIcon.style.display = 'none';
        }
    }

    // Evento de clique no botão de reprodução
    playButton.addEventListener('click', function () {
        togglePlayPause();
        progressBar.style.display = 'block'; // Exibe a barra de progresso após o primeiro clique
    });

    // Evento de clique no vídeo
    video.addEventListener('click', function () {
        togglePlayPause();
        progressBar.style.display = 'block'; // Exibe a barra de progresso após o primeiro clique
    });

    // Evento de pausa do vídeo
    video.addEventListener('pause', function () {
        playButton.style.display = 'block'; // Exibe o botão de reprodução quando o vídeo está pausado
    });

    // Evento de tempo do vídeo
    video.addEventListener('timeupdate', function () {
        updateProgressBar();
    });

    // Evento para exibir o ícone de som silenciado e o texto antes do primeiro clique
    playButton.addEventListener('mouseover', function () {
        if (isFirstPlay && video.currentTime < video.duration - 0.1) {
            soundIcon.style.display = 'block';
        }
    });

    // Evento para ocultar o ícone de som silenciado e o texto após o primeiro clique
    playButton.addEventListener('mouseout', function () {
        if (isFirstPlay) {
            soundIcon.style.display = 'none';
        }
    });

    // Evento de clique no ícone de som
    soundIcon.addEventListener('click', function () {
        video.muted = !video.muted; // Alterna o estado de mudo do vídeo
        if (!video.muted) {
            video.currentTime = 0; // Reinicia o vídeo para o início
            video.play();
            soundIcon.style.display = 'none'; // Oculta o ícone de som silenciado e o texto
            isFirstPlay = false;
            progressBar.style.display = 'block'; // Exibe a barra de progresso após o primeiro clique
        }
    });

    // Oculta a barra de progresso durante o autoplay
    video.addEventListener('play', function () {
        if (isFirstPlay) {
            progressBar.style.display = 'none';
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    var soundIcon = document.getElementById('sound-icon');
    var icon = soundIcon.querySelector('i');
    var volumeIcons = ['fa-volume-off', 'fa-volume-low'];
    var currentIndex = 0;

    function toggleVolumeIcon() {
        currentIndex = (currentIndex + 1) % volumeIcons.length;
        icon.className = 'fa-solid ' + volumeIcons[currentIndex];
        setTimeout(toggleVolumeIcon, 1000);
    }

    toggleVolumeIcon();
});

let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function () {
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function () {
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(() => { next.click() }, 3000);
function reloadSlider() {
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => { next.click() }, 3000);


}

dots.forEach((li, key) => {
    li.addEventListener('click', () => {
        active = key;
        reloadSlider();
    })
})
window.onresize = function (event) {
    reloadSlider();
};