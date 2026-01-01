// Game.js - Lógica principal do VidaSim

let personagem = null;
let menuAtual = null;

// Inicializar nova vida
function iniciarNovaVida() {
    const genero = Math.random() > 0.5 ? 'masculino' : 'feminino';
    const nomes = genero === 'masculino' ? DADOS.nomes.masculinos : DADOS.nomes.femininos;
    
    personagem = {
        nome: nomes[Math.floor(Math.random() * nomes.length)],
        sobrenome: DADOS.sobrenomes[Math.floor(Math.random() * DADOS.sobrenomes.length)],
        genero: genero,
        idade: 0,
        cidade: DADOS.cidades[Math.floor(Math.random() * DADOS.cidades.length)],
        
        // Atributos
        felicidade: 80 + Math.floor(Math.random() * 20),
        saude: 80 + Math.floor(Math.random() * 20),
        inteligencia: Math.floor(Math.random() * 30) + 20,
        dinheiro: 0,
        
        // Educação e Trabalho
        educacao: [],
        educacaoAtual: null,
        anosRestantesEducacao: 0,
        emprego: null,
        
        // Relacionamentos
        relacionamentos: [],
        
        // Histórico
        eventos: []
    };

    // Adicionar evento de nascimento
    adicionarEvento(`Você nasceu em ${personagem.cidade}! 👶`, 'positivo');
    
    // Trocar tela
    document.getElementById('tela-inicial').classList.remove('ativa');
    document.getElementById('tela-gameover').classList.remove('ativa');
    document.getElementById('tela-jogo').classList.add('ativa');
    
    atualizarInterface();
}

// Atualizar interface
function atualizarInterface() {
    // Nome e idade
    document.getElementById('nome-personagem').textContent = 
        `${personagem.nome} ${personagem.sobrenome}`;
    document.getElementById('idade-personagem').textContent = 
        `${personagem.idade} ${personagem.idade === 1 ? 'ano' : 'anos'} - ${personagem.cidade}`;
    
    // Barras de status
    atualizarBarra('felicidade', personagem.felicidade);
    atualizarBarra('saude', personagem.saude);
    atualizarBarra('inteligencia', personagem.inteligencia);
    
    // Dinheiro
    document.getElementById('barra-dinheiro').style.width = 
        `${Math.min(100, Math.max(0, personagem.dinheiro / 1000))}%`;
    document.getElementById('valor-dinheiro').textContent = 
        `R$ ${personagem.dinheiro.toLocaleString('pt-BR')}`;
}

function atualizarBarra(tipo, valor) {
    valor = Math.max(0, Math.min(100, valor));
    document.getElementById(`barra-${tipo}`).style.width = `${valor}%`;
    document.getElementById(`valor-${tipo}`).textContent = `${Math.floor(valor)}%`;
}

// Adicionar evento ao log
function adicionarEvento(texto, tipo = 'neutro') {
    const log = document.getElementById('log-eventos');
    const p = document.createElement('p');
    p.textContent = texto;
    p.className = `evento-${tipo}`;
    log.insertBefore(p, log.firstChild);
    
    // Manter apenas os últimos 20 eventos
    while (log.children.length > 20) {
        log.removeChild(log.lastChild);
    }
    
    personagem.eventos.push({ texto, tipo, idade: personagem.idade });
}

// Avançar idade
function avancarIdade() {
    personagem.idade++;
    
    // Processar educação em andamento
    if (personagem.educacaoAtual) {
        personagem.anosRestantesEducacao--;
        if (personagem.anosRestantesEducacao <= 0) {
            personagem.educacao.push(personagem.educacaoAtual.nome);
            personagem.inteligencia = Math.min(100, personagem.inteligencia + personagem.educacaoAtual.bonus_inteligencia);
            adicionarEvento(`Você concluiu ${personagem.educacaoAtual.nome}! 🎓`, 'positivo');
            personagem.educacaoAtual = null;
        }
    }
    
    // Receber salário se empregado
    if (personagem.emprego) {
        personagem.dinheiro += personagem.emprego.salario * 12;
        adicionarEvento(`Você recebeu seu salário anual: R$ ${(personagem.emprego.salario * 12).toLocaleString('pt-BR')} 💰`, 'positivo');
    }
    
    // Evento aleatório baseado na idade
    if (Math.random() > 0.4) {
        let eventosDisponiveis;
        if (personagem.idade < 12) {
            eventosDisponiveis = DADOS.eventos.infancia;
        } else if (personagem.idade < 18) {
            eventosDisponiveis = DADOS.eventos.adolescencia;
        } else if (personagem.idade < 60) {
            eventosDisponiveis = DADOS.eventos.adulto;
        } else {
            eventosDisponiveis = DADOS.eventos.idoso;
        }
        
        const evento = eventosDisponiveis[Math.floor(Math.random() * eventosDisponiveis.length)];
        aplicarEvento(evento);
    }
    
    // Decaimento natural
    personagem.felicidade = Math.max(0, personagem.felicidade - Math.random() * 3);
    personagem.saude = Math.max(0, personagem.saude - (personagem.idade > 50 ? 2 : 0.5));
    
    // Evoluir relacionamentos
    personagem.relacionamentos.forEach(rel => {
        rel.afinidade = Math.max(0, rel.afinidade - Math.random() * 5);
    });
    
    // Verificar morte
    if (verificarMorte()) {
        return;
    }
    
    atualizarInterface();
}

// Aplicar evento
function aplicarEvento(evento) {
    personagem.felicidade = Math.max(0, Math.min(100, personagem.felicidade + evento.felicidade));
    personagem.saude = Math.max(0, Math.min(100, personagem.saude + evento.saude));
    personagem.inteligencia = Math.max(0, Math.min(100, personagem.inteligencia + evento.inteligencia));
    personagem.dinheiro += evento.dinheiro;
    
    const tipo = (evento.felicidade + evento.saude + evento.dinheiro) >= 0 ? 'positivo' : 'negativo';
    adicionarEvento(evento.texto, tipo);
}

// Verificar morte
function verificarMorte() {
    let chanceMorte = 0;
    
    if (personagem.saude <= 0) {
        chanceMorte = 100;
    } else if (personagem.idade > 100) {
        chanceMorte = 90;
    } else if (personagem.idade > 90) {
        chanceMorte = 50;
    } else if (personagem.idade > 80) {
        chanceMorte = 30;
    } else if (personagem.idade > 70) {
        chanceMorte = 15;
    } else if (personagem.idade > 60) {
        chanceMorte = 5;
    } else if (personagem.saude < 20) {
        chanceMorte = 10;
    }
    
    if (Math.random() * 100 < chanceMorte) {
        gameOver();
        return true;
    }
    return false;
}

// Game Over
function gameOver() {
    const causa = personagem.saude <= 0 
        ? DADOS.causasMorte[Math.floor(Math.random() * (DADOS.causasMorte.length - 1)) + 1]
        : "velhice";
    
    document.getElementById('tela-jogo').classList.remove('ativa');
    document.getElementById('tela-gameover').classList.add('ativa');
    
    const resumo = document.getElementById('resumo-vida');
    resumo.innerHTML = `
        <h3>${personagem.nome} ${personagem.sobrenome}</h3>
        <p>⚰️ Faleceu aos ${personagem.idade} anos por ${causa}</p>
        <p>📍 Nasceu em ${personagem.cidade}</p>
        <p>💰 Patrimônio final: R$ ${personagem.dinheiro.toLocaleString('pt-BR')}</p>
        <p>🎓 Educação: ${personagem.educacao.length > 0 ? personagem.educacao.join(', ') : 'Nenhuma'}</p>
        <p>💼 Último emprego: ${personagem.emprego ? personagem.emprego.nome : 'Nenhum'}</p>
        <p>💕 Relacionamentos: ${personagem.relacionamentos.length}</p>
    `;
}

// Mostrar menu
function mostrarMenu(menu) {
    fecharMenu();
    menuAtual = menu;
    
    const menuElement = document.getElementById(`menu-${menu}`);
    menuElement.classList.add('ativo');
    
    // Atualizar conteúdo do menu
    if (menu === 'relacionamentos') {
        atualizarMenuRelacionamentos();
    } else if (menu === 'trabalho') {
        atualizarMenuTrabalho();
    } else if (menu === 'educacao') {
        atualizarMenuEducacao();
    }
}

// Fechar menu
function fecharMenu() {
    document.querySelectorAll('.menu-popup').forEach(m => m.classList.remove('ativo'));
    menuAtual = null;
}

// Realizar atividade
function realizarAtividade(tipo) {
    const atividade = DADOS.atividades[tipo];
    
    if (atividade.dinheiro && personagem.dinheiro + atividade.dinheiro < 0) {
        adicionarEvento("Você não tem dinheiro suficiente! 💸", 'negativo');
        return;
    }
    
    personagem.felicidade = Math.max(0, Math.min(100, personagem.felicidade + atividade.felicidade));
    personagem.saude = Math.max(0, Math.min(100, personagem.saude + atividade.saude));
    personagem.inteligencia = Math.max(0, Math.min(100, personagem.inteligencia + atividade.inteligencia));
    personagem.dinheiro += atividade.dinheiro || 0;
    
    adicionarEvento(atividade.texto, 'positivo');
    atualizarInterface();
    fecharMenu();
}

// Menu de Relacionamentos
function atualizarMenuRelacionamentos() {
    const lista = document.getElementById('lista-relacionamentos');
    
    if (personagem.relacionamentos.length === 0) {
        lista.innerHTML = '<p style="color: #888; text-align: center;">Você ainda não conhece ninguém.</p>';
        return;
    }
    
    lista.innerHTML = personagem.relacionamentos.map((rel, index) => `
        <div class="relacionamento-item">
            <h4>${rel.nome}</h4>
            <p>${rel.tipo} - Afinidade: ${Math.floor(rel.afinidade)}%</p>
            <button onclick="interagirRelacionamento(${index}, 'conversar')">💬 Conversar</button>
            <button onclick="interagirRelacionamento(${index}, 'presente')">🎁 Presente</button>
            <button onclick="interagirRelacionamento(${index}, 'passeio')">🚶 Passeio</button>
        </div>
    `).join('');
}

// Conhecer pessoa
function conhecerPessoa() {
    const genero = Math.random() > 0.5 ? 'masculino' : 'feminino';
    const nomes = genero === 'masculino' ? DADOS.nomes.masculinos : DADOS.nomes.femininos;
    
    const novaPessoa = {
        nome: nomes[Math.floor(Math.random() * nomes.length)],
        genero: genero,
        tipo: "Amigo",
        afinidade: 30 + Math.floor(Math.random() * 30)
    };
    
    personagem.relacionamentos.push(novaPessoa);
    adicionarEvento(`Você conheceu ${novaPessoa.nome}! 👋`, 'positivo');
    personagem.felicidade = Math.min(100, personagem.felicidade + 5);
    
    atualizarMenuRelacionamentos();
    atualizarInterface();
}

// Interagir com relacionamento
function interagirRelacionamento(index, tipo) {
    const rel = personagem.relacionamentos[index];
    const interacao = DADOS.interacoes[tipo];
    
    if (interacao.custo && personagem.dinheiro < interacao.custo) {
        adicionarEvento("Você não tem dinheiro suficiente! 💸", 'negativo');
        return;
    }
    
    rel.afinidade = Math.max(0, Math.min(100, rel.afinidade + interacao.afinidade));
    personagem.felicidade = Math.max(0, Math.min(100, personagem.felicidade + interacao.felicidade));
    if (interacao.custo) personagem.dinheiro -= interacao.custo;
    
    adicionarEvento(`${rel.nome}: ${interacao.texto}`, 'positivo');
    
    // Evoluir relacionamento
    if (rel.afinidade >= 80 && rel.tipo === "Amigo") {
        rel.tipo = "Melhor Amigo";
        adicionarEvento(`${rel.nome} agora é seu melhor amigo! 🤗`, 'positivo');
    }
    
    atualizarMenuRelacionamentos();
    atualizarInterface();
}

// Menu de Trabalho
function atualizarMenuTrabalho() {
    const trabalhoAtual = document.getElementById('trabalho-atual');
    const listaEmpregos = document.getElementById('lista-empregos');
    
    if (personagem.emprego) {
        trabalhoAtual.innerHTML = `
            <div class="emprego-item">
                <h4>Emprego Atual: ${personagem.emprego.nome}</h4>
                <p>Salário: R$ ${personagem.emprego.salario.toLocaleString('pt-BR')}/mês</p>
                <button onclick="pedirDemissao()">🚪 Pedir Demissão</button>
            </div>
        `;
    } else {
        trabalhoAtual.innerHTML = '<p style="color: #888;">Você está desempregado.</p>';
    }
    
    const empregosDisponiveis = DADOS.empregos.filter(emp => {
        if (personagem.idade < emp.requisitos.idade) return false;
        if (personagem.inteligencia < emp.requisitos.inteligencia) return false;
        if (emp.requisitos.educacao && !personagem.educacao.includes(emp.requisitos.educacao)) return false;
        if (personagem.emprego && personagem.emprego.nome === emp.nome) return false;
        return true;
    });
    
    if (empregosDisponiveis.length === 0) {
        listaEmpregos.innerHTML = '<p style="color: #888;">Nenhuma vaga disponível para seu perfil.</p>';
    } else {
        listaEmpregos.innerHTML = empregosDisponiveis.map(emp => `
            <div class="emprego-item">
                <h4>${emp.nome}</h4>
                <p>Salário: R$ ${emp.salario.toLocaleString('pt-BR')}/mês</p>
                <p>Requisitos: ${emp.requisitos.educacao || 'Nenhum'}, Int. ${emp.requisitos.inteligencia}%</p>
                <button onclick="candidatarEmprego('${emp.nome}')">📝 Candidatar-se</button>
            </div>
        `).join('');
    }
}

// Candidatar a emprego
function candidatarEmprego(nomeEmprego) {
    const emprego = DADOS.empregos.find(e => e.nome === nomeEmprego);
    const chance = 50 + (personagem.inteligencia / 2);
    
    if (Math.random() * 100 < chance) {
        personagem.emprego = emprego;
        adicionarEvento(`Você foi contratado como ${emprego.nome}! 🎉`, 'positivo');
        personagem.felicidade = Math.min(100, personagem.felicidade + 20);
    } else {
        adicionarEvento(`Você não foi selecionado para a vaga de ${emprego.nome}. 😞`, 'negativo');
        personagem.felicidade = Math.max(0, personagem.felicidade - 10);
    }
    
    atualizarMenuTrabalho();
    atualizarInterface();
}

// Pedir demissão
function pedirDemissao() {
    adicionarEvento(`Você pediu demissão de ${personagem.emprego.nome}. 🚪`, 'neutro');
    personagem.emprego = null;
    atualizarMenuTrabalho();
    atualizarInterface();
}

// Menu de Educação
function atualizarMenuEducacao() {
    const educacaoAtual = document.getElementById('educacao-atual');
    const listaCursos = document.getElementById('lista-cursos');
    
    if (personagem.educacaoAtual) {
        educacaoAtual.innerHTML = `
            <div class="curso-item">
                <h4>Cursando: ${personagem.educacaoAtual.nome}</h4>
                <p>Anos restantes: ${personagem.anosRestantesEducacao}</p>
            </div>
        `;
    } else {
        educacaoAtual.innerHTML = `
            <p style="color: #888;">Formação: ${personagem.educacao.length > 0 ? personagem.educacao.join(', ') : 'Nenhuma'}</p>
        `;
    }
    
    const cursosDisponiveis = DADOS.cursos.filter(curso => {
        if (personagem.idade < curso.idade_minima) return false;
        if (personagem.educacao.includes(curso.nome)) return false;
        if (personagem.educacaoAtual) return false;
        return true;
    });
    
    if (cursosDisponiveis.length === 0) {
        listaCursos.innerHTML = '<p style="color: #888;">Nenhum curso disponível no momento.</p>';
    } else {
        listaCursos.innerHTML = cursosDisponiveis.map(curso => `
            <div class="curso-item">
                <h4>${curso.nome}</h4>
                <p>Duração: ${curso.duracao} anos</p>
                <p>Custo: R$ ${curso.custo.toLocaleString('pt-BR')}</p>
                <p>Bônus Inteligência: +${curso.bonus_inteligencia}%</p>
                <button onclick="iniciarCurso('${curso.nome}')">📚 Matricular-se</button>
            </div>
        `).join('');
    }
}

// Iniciar curso
function iniciarCurso(nomeCurso) {
    const curso = DADOS.cursos.find(c => c.nome === nomeCurso);
    
    if (personagem.dinheiro < curso.custo) {
        adicionarEvento("Você não tem dinheiro suficiente para este curso! 💸", 'negativo');
        return;
    }
    
    personagem.dinheiro -= curso.custo;
    personagem.educacaoAtual = curso;
    personagem.anosRestantesEducacao = curso.duracao;
    
    adicionarEvento(`Você começou a cursar ${curso.nome}! 📚`, 'positivo');
    personagem.felicidade = Math.min(100, personagem.felicidade + 10);
    
    atualizarMenuEducacao();
    atualizarInterface();
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    console.log('VidaSim carregado! 🎮');
});
