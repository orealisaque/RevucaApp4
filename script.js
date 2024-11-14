document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const slider = document.querySelector('.slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const controls = document.querySelectorAll('.control');

    // Função para atualizar a posição do slider
    function updateSliderPosition() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateControls();
    }

    // Inicializa o primeiro slide como ativo
    slides[currentIndex].classList.add('active');

    // Função para atualizar os controles (botões de ponto)
    function updateControls() {
        controls.forEach((control, index) => {
            control.classList.remove('active');
            if (index === currentIndex) {
                control.classList.add('active');
            }
        });
    }

    // Botão de navegação para o slide anterior
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
        updateSliderPosition();
    });

    // Botão de navegação para o próximo slide
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
        updateSliderPosition();
    });

    // Controles de navegação por pontos
    controls.forEach((control, index) => {
        control.setAttribute('data-slide', index);  // Adiciona o data-slide a cada controle
        control.addEventListener('click', function() {
            currentIndex = index;
            updateSliderPosition();
        });
    });

    // Slider auto-play (opcional)
    setInterval(function() {
        nextBtn.click();
    }, 5000);

    // Inicializa o slider com o primeiro slide visível
    updateSliderPosition();
});



    // Função para alternar a visibilidade da seção de filtros avançados
    const toggleButton = document.querySelector('.toggle-filters-btn');
    const advancedSearchSection = document.querySelector('.advanced-search');

    if (toggleButton && advancedSearchSection) {
        toggleButton.addEventListener('click', function() {
            const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
            
            // Alterna a visibilidade da seção e o estado do botão
            advancedSearchSection.style.display = isExpanded ? 'none' : 'block';
            toggleButton.setAttribute('aria-expanded', !isExpanded);
        });
    }




    // Exemplo de função para capturar a localização atual
    const locationButton = document.getElementById("current-location-btn");
    if (locationButton) {
        locationButton.addEventListener("click", () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const lat = position.coords.latitude;
                    const long = position.coords.longitude;
                    console.log("Latitude: ", lat, "Longitude: ", long);
                    // Aqui você pode integrar com a API de localização para converter em cidade
                });
            } else {
                alert("Geolocalização não suportada pelo navegador.");
            }
        });
    }


// API DE GEOLOCALIZAÇÃO 
window.addEventListener('load', function() {
    // Verifica se a Geolocalização é suportada
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCityFromCoordinates, showError);
    } else {
        document.getElementById('user-location').textContent = "Geolocalização não é suportada pelo navegador.";
    }
});

function getCityFromCoordinates(position) {
    const userLat = position.coords.latitude;
    const userLong = position.coords.longitude;
    
    // URL para a API de geocodificação reversa (exemplo com OpenCage)
    const apiKey = 'c2dd026254364195acb9dc076fd21abb'; // Substitua com sua chave da API de geocodificação
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${userLat}+${userLong}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const city = data.results[0].components.city || data.results[0].components.town || data.results[0].components.village;
            document.getElementById('user-location').textContent = `Acompanhantes próximas a ${city}`;
        })
        .catch(error => {
            console.error('Erro ao obter a cidade:', error);
            document.getElementById('user-location').textContent = "Erro ao obter a localização.";
        });
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('user-location').textContent = "Permissão de localização negada.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('user-location').textContent = "Informações de localização não disponíveis.";
            break;
        case error.TIMEOUT:
            document.getElementById('user-location').textContent = "Tempo esgotado para obter localização.";
            break;
        default:
            document.getElementById('user-location').textContent = "Erro desconhecido ao obter localização.";
            break;
    }
}
