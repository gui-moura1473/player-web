let musicas = [
    {titulo:'in the dark', artista:'Bring Me The Horizon - banda top', src:'musicas/Bring Me The Horizon - in the dark.mp3', img:'imagens/image1.jpg'},
    {titulo:'nihilist blues', artista:'Bring Me The Horizon', src:'musicas/Bring Me The Horizon - nihilist blues.mp3', img:'imagens/image2.jpg'},
    {titulo:'Catastrophist', artista:'Trivium', src:'musicas/Trivium - Catastrophist.mp3', img:'imagens/image3.jpg'}
];

let indexMusica = 0;
let musica = document.querySelector('audio');
let duracaoMusica = document.querySelector('.fim');
let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');
let pauseBtn = document.querySelector('.botao-pause');
let playBtn = document.querySelector('.botao-play')
let barraProgresso = document.querySelector('.barra')

renderizarMusica(indexMusica)

// Eventos   
document.querySelector('.botao-play').addEventListener('click', tocarMusica);

document.querySelector('.botao-pause').addEventListener('click', pausarMusica);

musica.addEventListener('timeupdate', atualizaBarra);

barraProgresso.addEventListener('click', atualizaProgresso);

document.querySelector('.anterior').addEventListener('click', () => {
    indexMusica--;
    if (indexMusica < 0) {
        indexMusica = 2;
    }
    renderizarMusica(indexMusica)
});

document.querySelector('.proximo').addEventListener('click', () => {
    indexMusica++;
    if (indexMusica > 2) {
        indexMusica = 0;
    }
    renderizarMusica(indexMusica)
});

// Funções
function atualizaProgresso(e) {
    let width = this.clientWidth;
    let clickX = e.offsetX;
    let duration = musica.duration
    
    musica.currentTime = (clickX / width) * duration
}

function renderizarMusica(index) {
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration))
        atualizaBarra()
        
        if (pauseBtn.style.display == 'block') {
            musica.play();
        }
    });
}

function tocarMusica() {
    musica.play();
    document.querySelector('.botao-pause').style.display = 'block';
    document.querySelector('.botao-play').style.display = 'none';
}

function pausarMusica() {
    musica.pause();
    document.querySelector('.botao-pause').style.display = 'none';
    document.querySelector('.botao-play').style.display = 'block';
}

function atualizaBarra() {
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function segundosParaMinutos(segundos) {
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    if (campoSegundos < 10) {
        campoSegundos = '0'+campoSegundos;
    }

    return campoMinutos +':'+ campoSegundos;
}

