const data = {
    "Setor": {
        "Cargo": {
            "Processo": [
                "A01: Atividade 1",
                "A02: Atividade 2",
                "A03: Atividade 3",
                "A04: Atividade 4",
                "A05: Atividade 5",
                "A06: Atividade 6",
                "A07: Atividade 7",
                "A08: Atividade 8",
                "A09: Atividade 9",
                "A10: Atividade 10",
                "A11: Atividade 11",
                "A12: Atividade 12",
                "A13: Atividade 13"
            ],
            "Processo": [
                "A01: Atividade 1",
                "A02: Atividade 2",
                "A03: Atividade 3",
                "A04: Atividade 4",
                "A05: Atividade 5?",
                "Caso SIM: Ir para A06 e seguir leitura",
                "Caso NÃO: Voltar para A02 e seguir leitura",
                "A06: Atividade 6",
                "A07: Atividade 7",
                "Caso SIM: Ir para A08 e finalizar processo",
                "Caso NÃO: Voltar para A04 e seguir leitura",
                 "A08: Atividade 8"
            ]
        }
    }
};

const descricaoDetalhada = {
    "Nome da Atividade": "Escreva uma pequena descrição do processo",
    "Nome da Atividade": "<img src='img/caso queirma colocar alguma imagem.png' style='width: 100%; height: auto;'>"
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
