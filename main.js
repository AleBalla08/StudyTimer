const html = document.querySelector('html');
const focoBotao = document.querySelector('.app__card-button--foco');
const curtoBotao = document.querySelector('.app__card-button--curto');
const longoBotao = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaInput = document.querySelector('#alternar-musica');
const musica = new Audio ('./sons/luna-rise-part-one.mp3');
const botaoComeçar = document.querySelector('#start-pause')
const audioPlay = new Audio('./sons/play.wav')
const audioPause = new Audio ('./sons/pause.mp3')
const audioFim = new Audio ('./sons/beep.mp3')
const iniciarPausarBt = document.querySelector('#start-pause span')
const iconBt = document.querySelector('.app__card-primary-butto-icon')
const contadorTempo = document.querySelector('#timer')


let tempoSegundos = 1500;
let intervaloId = null;


musica.loop = true;

musicaInput.addEventListener('change', () =>{
   if (musica.paused){
    musica.play()
   } else {
    musica.pause()

   }
});
 


focoBotao.addEventListener('click', () =>{
    tempoSegundos = 1500
   alterarContexto('foco')
   focoBotao.classList.add('active');
});

curtoBotao.addEventListener('click', () => {
    tempoSegundos = 300
    alterarContexto('descanso-curto')
    curtoBotao.classList.add('active');
});

longoBotao.addEventListener('click', () => {
    tempoSegundos = 900
    alterarContexto('descanso-longo')
    longoBotao.classList.add('active');
});

function alterarContexto(contexto) {
    contarTempo()
    botoes.forEach(function(contexto) {
        contexto.classList.remove('active')
    })
html.setAttribute('data-contexto', contexto)
banner.setAttribute('src', `./imagens/${contexto}.png`)
switch (contexto) {
    case "foco":
        titulo.innerHTML =  `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
        break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada,<br>
                <strong class="app__title-strong">Faça uma pausa curta.</strong>`
                break;
                case "descanso-longo":
                    titulo.innerHTML = `Hora de voltar à superfície,<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`

    default:
        break;
}

};
const contagemRegressiva = () =>{
    if(tempoSegundos<= 0){
        zerar()
        alert('Tempo finalizado!')
        audioFim.play()
        return
    }
    tempoSegundos -= 1
   contarTempo()
};

botaoComeçar.addEventListener('click', iniciarepausar);


function iniciarepausar() {
    if(intervaloId){
        zerar()
        audioPause.play()
        iconBt.setAttribute('src', './imagens/play_arrow.png')
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000)

    audioPlay.play()
     iniciarPausarBt.textContent = 'Pausar'
     iconBt.setAttribute('src', './imagens/pause.png')

}

function zerar(){
    clearInterval(intervaloId)
    intervaloId = null
    iniciarPausarBt.textContent = 'Começar'

}

function contarTempo(){
    const tempo = new Date(tempoSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    contadorTempo.innerHTML = `${tempoFormatado}`
}
contarTempo()



