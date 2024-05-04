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

document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".swiper-container", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000, // Tempo em milissegundos 
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".custom-swiper-button-next",
            prevEl: ".custom-swiper-button-prev",
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 16
            }
        },
        on: {
            slideChange: function () {
                // Oculta todas as imagens
                document.querySelectorAll(".swiper-slide img").forEach(function (img) {
                    img.classList.add("swiper-slide-hidden");
                });
                // Exibe as imagens dos slides visíveis em dispositivos desktop
                var visibleSlides = this.slides.slice(this.activeIndex, this.activeIndex + this.params.slidesPerView);
                visibleSlides.forEach(function (slide) {
                    var img = slide.querySelector("img");
                    if (img) {
                        img.classList.remove("swiper-slide-hidden");
                    }
                });
            }
        }
    });
});

//FAQ
document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        item.addEventListener("click", function () {
            const answer = this.querySelector(".faq-answer");
            const isOpen = answer.classList.contains("open");

            const allAnswers = document.querySelectorAll(".faq-answer");
            const allIcons = document.querySelectorAll(".faq-question i");
            allAnswers.forEach(ans => {
                ans.classList.remove("open");
            });
            allIcons.forEach(icon => {
                icon.classList.remove("fa-minus");
                icon.classList.add("fa-plus");
            });

            if (!isOpen) {
                answer.classList.add("open");
                const icon = this.querySelector(".faq-question i");
                icon.classList.remove("fa-plus");
                icon.classList.add("fa-minus");
            } else {
                answer.classList.remove("open");
                const icon = this.querySelector(".faq-question i");
                icon.classList.remove("fa-minus");
                icon.classList.add("fa-plus");
            }
        });
    });
});

//modal

var modal = document.getElementById("modal");

var modalBtnPremium = document.getElementById("modalBtnPremium");
var modalBtnUltra = document.getElementById("modalBtnUltra");

var span = document.getElementsByClassName("close")[0];

function openModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

//link preço premium
modalBtnPremium.addEventListener("click", function () {
    openModal();
    document.getElementById("btnApple").href = "https://checkout.pepper.com.br/?p=136989&o=174901";
    document.getElementById("btnAndroid").href = "link_para_oferta_premium_android";
});

//link preço ultra
modalBtnUltra.addEventListener("click", function () {
    openModal();
    document.getElementById("btnApple").href = "https://checkout.pepper.com.br/?p=136989&o=174902";
    document.getElementById("btnAndroid").href = "link_para_oferta_ultra_android";
});

span.onclick = function () {
    closeModal();
}

window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
}
