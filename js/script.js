const data = {
    "Setor de Segurança": {
        "Gestor de SSO": {
            "Preenchimento de EPI e Aplicação dos Programas de SST": [
                "A01: Anualmente ou quando há demanda",
                "A02: Receber programas (PGR)",
                "A03: Receber ficha de EPI dos funcionários antecipadamente, via E-mail ou documento físico",
                "A04: Fazer análise de riscos da operação, a partir do documento anteriormente recebido",
                "A05: Auxiliar compra e receber programas de SST, podendo ser de contratos externos ou da própria empresa, dependendo dos riscos",
                "A06: Entender necessidades de enxoval para a equipe",
                "A07: Fazer entrega do enxoval (conjunto dos EPIs para o colaborador) no primeiro dia de trabalho",
                "A08: Preencher dados da ficha de EPI através da planilha do Excel",
                "A09: Enviar ficha de EPI's para gestor e funcionários via Teams ou E-Mail",
                "A10: Receber devolutiva da ficha de EPI assinada pelo colaborador via E-Mail ou Teams",
                "A11: Baixar ficha de EPIs já preenchida",
                "A12: Anexar ficha de EPIs juntamente com o CA na pasta no sistema",
                "A13: Conclusão do Preenchimento de EPI e Aplicação dos Programas de SST"
            ],
            "Atendimento aos Requisitos Legais SSO": [
                "A01: Mensalmente",
                "A02: Verificar requisitos legais",
                "A03: Atualizar planilha ou receber planilha atualizada",
                "A04: Verificar atendimento das leis",
                "A05: Está tudo atendendo às leis?",
                "Caso SIM: Ir para A06 e seguir leitura",
                "Caso NÃO: Voltar para A02 e seguir leitura",
                "A06: Monitorar atendimento das leis",
                "A07: Tudo certo no monitoramento?",
                "Caso SIM: Ir para A08 e finalizar processo",
                "Caso NÃO: Voltar para A04 e seguir leitura",
                "A08: Processo de Atendimento aos Requisitos Legais de SSO encerrado"
            ]
        }
    }
};

const descricaoDetalhada = {
    "Nome da Atividade": "Escreva uma pequena descrição do processo",
    "Nome da Atividade": "<img src='img/img-segurança/Doc. Preenchimento de EPI e AplicaÃ§Ã£o dos Programas de SST (3) 05.01.2024 - Pedro Couto Diagrama.png' style='width: 100%; height: auto;'>"
    // Adicione mais descrições detalhadas conforme necessário
};

function loadAreas() {
    const areaSelect = document.getElementById('areas');
    areaSelect.innerHTML = '<option value="">Selecione uma área:</option>';
    
    const areas = Object.keys(data);
    areas.forEach(area => {
        const option = document.createElement('option');
        option.value = area;
        option.text = area.charAt(0).toUpperCase() + area.slice(1);
        areaSelect.appendChild(option);
    });
}

function loadCargos() {
    const area = document.getElementById('areas').value;
    const cargoSelect = document.getElementById('cargos');
    cargoSelect.innerHTML = '<option value="">Selecione um cargo:</option>';
    document.getElementById('processos').innerHTML = '<option value="">Selecione um processo:</option>';
    document.getElementById('detalhes-list').innerHTML = '';
    document.getElementById('fluxograma').style.display = 'none';

    if (area) {
        const cargos = Object.keys(data[area]);
        cargos.forEach(cargo => {
            const option = document.createElement('option');
            option.value = cargo;
            option.text = cargo;
            cargoSelect.appendChild(option);
        });
        cargoSelect.disabled = false;
    } else {
        cargoSelect.disabled = true;
        document.getElementById('processos').disabled = true;
    }
}

function loadProcessos() {
    const area = document.getElementById('areas').value;
    const cargo = document.getElementById('cargos').value;
    const processoSelect = document.getElementById('processos');
    processoSelect.innerHTML = '<option value="">Selecione um processo:</option>';
    document.getElementById('detalhes-list').innerHTML = '';
    document.getElementById('fluxograma').style.display = 'none';

    if (cargo) {
        const processos = Object.keys(data[area][cargo]);
        processos.forEach(processo => {
            const option = document.createElement('option');
            option.value = processo;
            option.text = processo;
            processoSelect.appendChild(option);
        });
        processoSelect.disabled = false;
    } else {
        processoSelect.disabled = true;
    }
}

function loadDetalhes() {
    const area = document.getElementById('areas').value;
    const cargo = document.getElementById('cargos').value;
    const processo = document.getElementById('processos').value;
    const detalhesList = document.getElementById('detalhes-list');

    if (processo) {
        const etapas = data[area][cargo][processo];
        detalhesList.innerHTML = '';
        etapas.forEach(etapa => {
            const li = document.createElement('li');
            li.textContent = etapa;
            li.onclick = () => openModal(etapa);  // Abre o modal com a descrição detalhada
            detalhesList.appendChild(li);
        });
        
        document.getElementById('detalhes').style.display = 'block';

        // Mapeamento do nome do processo para a imagem do fluxograma correspondente
        let fluxogramaUrl;
        if (processo === "Título do processo") {
            fluxogramaUrl = 'img/img-setor/Nome do arquivo da imagem.png';
        } else if (processo === "Título do processo") {
            fluxogramaUrl = 'img/img-setor/Nome do arquivo da imagem.png';
        } else if (processo === "Título do processo") {
            fluxogramaUrl = 'img/img-setor/Nome do arquivo da imagem.png';
        } else if (processo === "Título do processo") {
            fluxogramaUrl = 'img/img-setor/Nome do arquivo da imagem.png';
        } 
        
        else {
            fluxogramaUrl = null;
        }

        // Verificar se o URL do fluxograma foi definido e carregar a imagem
        const fluxogramaContainer = document.getElementById('fluxograma');
        const fluxogramaImagem = document.getElementById('fluxograma-imagem');

        if (fluxogramaUrl) {
            fluxogramaImagem.src = fluxogramaUrl;
            fluxogramaContainer.style.display = 'block';  // Mostrar o container
        } else {
            fluxogramaContainer.style.display = 'none';  // Ocultar o container se não houver imagem
        }
    }
}

function openModal(etapa) {
    const descricao = descricaoDetalhada[etapa] || "Descrição detalhada não disponível.";
    document.getElementById('modal-description').innerHTML = descricao;
    document.getElementById('modal-overlay').style.display = 'block';
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
    document.getElementById('modal').style.display = 'none';
}

// Verifica se o usuário está logado
if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', loadAreas);
