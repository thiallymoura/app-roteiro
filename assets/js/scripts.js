//biblioteca dayjs
const formatador = (data) =>{
    return {
       dia: {
           numerico: dayjs(data).format('DD'),
           semana: {
               curto: dayjs(data).format('ddd'),
               longo: dayjs(data).format('dddd'),
           }
        },
       mes: dayjs(data).format('MMMM'),
       hora: dayjs(data).format('HH:mm'),
       
    }
}


const atividade = {
    nome: "Café da manhã",
    data: new Date("2022-04-16 08:00:00"), //new Date - cria uma data
    finalizada: true
}

let atividades = [
    atividade, 
    {
        nome: "Lanche",
        data: new Date("2022-04-16 14:00:00"),
        finalizada: false
    },
    {
        nome: "Estudos",
        data: new Date("2022-04-16 14:00:00"),
        finalizada: true
    },

]

//atividades = []

const criarItemDeAtividade = (atividade) =>{ 

    let input = `
    <input 
    onchange="concluirAtividade(event)"
    value="${atividade.data}" 
    type="checkbox"
    `

    if(atividade.finalizada){ 
        input += 'checked'
    }

    input += '>' 

    const formatar = formatador(atividade.data);

    return ` 
        <div>
            ${input}
            <span>${atividade.nome}</span>
            <time>
                ${formatar.dia.semana.longo},
                dia ${formatar.dia.numerico} 
                de ${formatar.mes}
                às ${formatar.hora}h
                </time> 
        </div>
    `
}

const atualizarListaDeAtividades = () => { //cria uma função
    const section = document.querySelector('section'); // acesso o documento e pega um seletor 
    section.innerHTML = ''

    // verifica se o array esta vazio
    if(atividades.length === 0){ 
        section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>`
        return
        
    }

    for(let atividade of atividades){ //for - percorre o array
        section.innerHTML += criarItemDeAtividade(atividade); // innerHTML - modifica o HTML, () executa a função  | += concatena
    }

}

atualizarListaDeAtividades()


const salvarAtividade = (event) => {
    event.preventDefault(); //previne o comportamento padrao
    const dadosDoFormulario = new FormData(event.target); //pega os dados do formulario

    const nome = dadosDoFormulario.get('atividade');
    const dia = dadosDoFormulario.get('dia');
    const hora = dadosDoFormulario.get('hora');
    const data = `${dia} ${hora}`

    const novaAtividade = { //objeto
        nome,
        data,
        finalizada: false
    }

    const atividadeExiste = atividades.find((atividade) => { //find - percorre o array
        return atividade.data === novaAtividade.data //retorna true ou false
    })

    if(atividadeExiste){
        return alert('Dia/hora não disponível')
    }


    atividades = [novaAtividade, ...atividades] //concatena o array com o novo item
    atualizarListaDeAtividades()
}


const criarDiasSelecao = () => {
    const dias = [
        "2024-12-31",
        "2025-01-01",
        "2025-01-02",
        "2025-01-03",
        "2025-01-04",
    ]


    let diasSelecao = ' '

    for(let dia of dias){
        const formatar = formatador(dia);
        const diaFormatado = `
        ${formatar.dia.numerico} de 
        ${formatar.mes}`

        diasSelecao += `
        <option value="${dia}">${diaFormatado}</option>
        `
    }

    document.querySelector('select[name="dia"]')
    .innerHTML = diasSelecao
}
criarDiasSelecao()

const criarHorasSelecao = (i) => {
    let horasDisponiveis = ' '

    for(let i = 6; i < 23; i++){
        const hora = String(i).padStart(2, '0') //padStart - adiciona 0 na frente
        horasDisponiveis += `<option value="${hora}:00">${hora}:00</option>`
        horasDisponiveis += `<option value="${hora}:30">${hora}:30</option>`
        
    }

    document.querySelector('select[name="hora"]')
    .innerHTML = horasDisponiveis
   
}
criarHorasSelecao()

const concluirAtividade = (event) => {
    const input = event.target
    const dataDesteInput = input.value

    const atividade = atividades.find((atividade) => {
        return atividade.data == dataDesteInput
    })

    if(!atividade){
        return
    }

    atividade.finalizada = !atividade.finalizada //inverte o valor
}