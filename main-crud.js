const adicionarTarefaBtn = document.querySelector('.app__button--add-task')
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const textarea = document.querySelector('.app__form-textarea')
const listaTarefas = document.querySelector('.app__section-task-list')
const editarBtn = document.querySelector('.app_button-edit')
const cancelarBtn = document.querySelector('.app__form-footer__button--cancel')
const tarefaAtivaParagrafo= document.querySelector('.app__section-active-task-description')
const removerConcluidasBtn = document.querySelector('#btn-remover-concluidas')
const removerTodasBtn = document.querySelector('#btn-remover-todas')


let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
let tarefaSelecionada = null
let liTarefaSelecionada = null



function atualizarTarefa (){
    localStorage.setItem('tarefas', JSON.stringify(tarefas))

}


function criarElementoTarefa(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>`

    const parag = document.createElement('p')
    parag.classList.add('app__section-task-list-item-description')
    parag.textContent = tarefa.descricao

    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')
    const imagemBtn = document.createElement('img')
    imagemBtn.setAttribute('src', '/imagens-tarefas/edit.png')
    botao.append(imagemBtn)

    botao.onclick = async ()=>{
        const tarefaEditada = await Swal.fire({
            input: "textarea",
            inputLabel: "Nova descrição",
            inputPlaceholder: "Digite algo aqui...",
            inputAttributes: {
              "aria-label": "Type your message here"
            },
            showCancelButton: true
          });
          if (tarefaEditada) {
            tarefaEditadaArrumada = JSON.stringify(tarefaEditada.value);
            parag.textContent = tarefaEditadaArrumada.replace(/"/g, "")
            tarefa.descricao = tarefaEditadaArrumada.replace(/"/g, "")
            atualizarTarefa()
            
          }
        
        
        
    }

    



    li.append(svg)
    li.append(parag)
    li.append(botao)



    
   
    if(tarefa.completa){
    li.classList.add('app__section-task-list-item-complete')
    botao.setAttribute('disabled', 'disabled')

    }
    else{
    li.onclick = ()=>{
                document.querySelectorAll('.app__section-task-list-item-active')
                    .forEach(elemento => {
                    elemento.classList.remove('app__section-task-list-item-active')
                })
                if (tarefaSelecionada == tarefa){
                    tarefaAtivaParagrafo.textContent = ''
                    li.classList.remove('app__section-task-list-item-active')
                    tarefaSelecionada = null
                    liTarefaSelecionada = null
                    return
        
                }
                
                tarefaSelecionada = tarefa
                liTarefaSelecionada = li
                tarefaAtivaParagrafo.textContent = tarefa.descricao
                li.classList.add('app__section-task-list-item-active')
            
    };
}
    

    return li
};



cancelarBtn.addEventListener('click', ()=>{
    textarea.value = ''
    formAdicionarTarefa.classList.add('hidden')
})


adicionarTarefaBtn.addEventListener('click', ()=>{
    formAdicionarTarefa.classList.toggle('hidden')
})

formAdicionarTarefa.addEventListener('submit', (evento)=>{
    evento.preventDefault();
    const tarefa = {
        descricao: textarea.value
    }
    tarefas.push(tarefa)
    const elementoTarefa = criarElementoTarefa(tarefa)
    listaTarefas.append(elementoTarefa)
    atualizarTarefa()
    textarea.value = ''
    formAdicionarTarefa.classList.add('hidden')
    

});


tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    listaTarefas.append(elementoTarefa)

    
});

document.addEventListener('FocoFinalizado', ()=>{
    if(tarefaSelecionada && liTarefaSelecionada){
    liTarefaSelecionada.classList.remove('app__section-task-list-item-active')
    liTarefaSelecionada.classList.add('app__section-task-list-item-complete')
    liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled')
    tarefaSelecionada.completa = true
    atualizarTarefa()
    
    }


});

const removerTarefas = (somenteCompletas) => {
    // const classCompleta = somenteCompletas ? '.app__section-task-list-item-complete' : '.app__section-task-list-item'
    let seletor = '.app__section-task-list-item'
    if(somenteCompletas){
        seletor = '.app__section-task-list-item-complete'
    }
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove()
    })
    tarefas = somenteCompletas ? tarefas.filter(tarefa => !tarefa.completa) : []
    atualizarTarefa()
}

removerConcluidasBtn.onclick = () => removerTarefas(true)

removerTodasBtn.onclick = ()=> removerTarefas(false)

