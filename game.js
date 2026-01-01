// ===== VIDASIM PRO - GAME.JS COMPLETO =====

let personagem = null;
let jogoIniciado = false;

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('tela-loading').classList.remove('ativa');
        document.getElementById('tela-inicial').classList.add('ativa');
    }, 2500);
});

function voltarMenuPrincipal() {
    document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
    document.getElementById('tela-inicial').classList.add('ativa');
}

function mostrarCriacaoPersonagem() {
    document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
    document.getElementById('tela-criacao').classList.add('ativa');
    document.getElementById('form-criacao').innerHTML = `
        <div class="form-section"><h3><i class="fas fa-user"></i> Identidade</h3>
        <div class="form-group"><label>Nome</label><input type="text" id="input-nome" placeholder="Seu nome..."></div>
        <div class="form-group"><label>Gênero</label><select id="select-genero"><option value="masculino">Masculino</option><option value="feminino">Feminino</option></select></div></div>
        <div class="form-section"><h3><i class="fas fa-home"></i> Família</h3>
        <div class="form-group"><label>Classe Social</label><select id="select-classe"><option value="pobre">Classe Baixa</option><option value="media" selected>Classe Média</option><option value="alta">Classe Alta</option><option value="rica">Rica</option></select></div></div>
        <button class="btn-iniciar-vida" onclick="iniciarVidaPersonalizada()"><i class="fas fa-play"></i> Começar Vida</button>`;
}

function iniciarVidaAleatoria() {
    const g = Math.random() > 0.5 ? 'masculino' : 'feminino';
    const n = DADOS.nomes.brasil[g === 'masculino' ? 'masculinos' : 'femininos'];
    criarPersonagem({nome: n[Math.floor(Math.random()*n.length)], genero: g, classe: ['pobre','media','alta','rica'][Math.floor(Math.random()*4)]});
}

function iniciarVidaPersonalizada() {
    criarPersonagem({nome: document.getElementById('input-nome').value || 'Jogador', genero: document.getElementById('select-genero').value, classe: document.getElementById('select-classe').value});
}

function criarPersonagem(c) {
    const din = {pobre:0,media:5000,alta:50000,rica:500000};
    personagem = {
        nome: c.nome, sobrenome: DADOS.sobrenomes[Math.floor(Math.random()*DADOS.sobrenomes.length)], genero: c.genero, idade: 0,
        cidade: DADOS.cidades.brasil[Math.floor(Math.random()*DADOS.cidades.brasil.length)], classe: c.classe, vivo: true,
        felicidade: 80+Math.floor(Math.random()*20), saude: 85+Math.floor(Math.random()*15), inteligencia: 20+Math.floor(Math.random()*30), aparencia: 40+Math.floor(Math.random()*40), karma: 50,
        dinheiro: din[c.classe], salario: 0,
        familia: {
            mae: {nome: DADOS.nomes.brasil.femininos[Math.floor(Math.random()*30)], viva: true, afinidade: 85+Math.floor(Math.random()*15), idade: 25+Math.floor(Math.random()*10)},
            pai: {nome: DADOS.nomes.brasil.masculinos[Math.floor(Math.random()*30)], vivo: true, afinidade: 80+Math.floor(Math.random()*15), idade: 27+Math.floor(Math.random()*10)}
        },
        relacionamentos: [], emprego: null, eventos: [], conquistas: []
    };
    iniciarJogo();
}

function iniciarJogo() {
    document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
    document.getElementById('tela-jogo').classList.add('ativa');
    adicionarEvento('Você nasceu em '+personagem.cidade+'! 👶', 'positivo', 'fa-baby');
    renderizarStatus(); renderizarMenuAcoes(); atualizarInterface();
}

function atualizarInterface() {
    document.getElementById('nome-personagem').textContent = personagem.nome + ' ' + personagem.sobrenome;
    document.getElementById('info-personagem').textContent = personagem.idade + ' anos • ' + personagem.cidade;
    document.getElementById('mini-dinheiro').innerHTML = '<i class="fas fa-wallet"></i> R$ ' + personagem.dinheiro.toLocaleString('pt-BR');
    document.getElementById('idade-display').textContent = personagem.idade;
    ['felicidade','saude','inteligencia','aparencia'].forEach(s => {
        const v = Math.max(0, Math.min(100, personagem[s]));
        document.getElementById('bar-'+s).style.width = v+'%';
        document.getElementById('val-'+s).textContent = Math.floor(v)+'%';
    });
}

function renderizarStatus() {
    document.getElementById('status-container').innerHTML = ['felicidade','saude','inteligencia','aparencia'].map(s => 
        '<div class="status-bar" data-stat="'+s+'"><div class="status-icon"><i class="fas fa-'+(s==='felicidade'?'smile':s==='saude'?'heart':s==='inteligencia'?'brain':'star')+'"></i></div><div class="status-info"><span class="status-label">'+s.charAt(0).toUpperCase()+s.slice(1)+'</span><div class="bar-container"><div class="bar-fill" id="bar-'+s+'"></div></div></div><span class="status-value" id="val-'+s+'">100%</span></div>'
    ).join('');
}

function renderizarMenuAcoes() {
    document.getElementById('menu-acoes').innerHTML = '<button class="btn-acao" onclick="abrirMenu(\'familia\')"><i class="fas fa-home"></i><span>Família</span></button><button class="btn-acao" onclick="abrirMenu(\'atividades\')"><i class="fas fa-running"></i><span>Atividades</span></button><button class="btn-acao" onclick="abrirMenu(\'trabalho\')"><i class="fas fa-briefcase"></i><span>Trabalho</span></button><button class="btn-acao" onclick="abrirMenu(\'relacionamentos\')"><i class="fas fa-users"></i><span>Pessoas</span></button><button class="btn-acao" onclick="abrirMenu(\'bens\')"><i class="fas fa-car"></i><span>Bens</span></button>';
}

function adicionarEvento(texto, tipo, icone) {
    const log = document.getElementById('log-eventos');
    const ev = document.createElement('div');
    ev.className = 'evento evento-'+tipo;
    ev.innerHTML = '<div class="evento-icon"><i class="fas '+(icone||'fa-circle')+'"></i></div><div class="evento-content"><p class="evento-texto">'+texto+'</p><span class="evento-idade">'+personagem.idade+' anos</span></div>';
    log.insertBefore(ev, log.firstChild);
}

function avancarIdade() {
    personagem.idade++;
    if(personagem.familia.mae.viva) personagem.familia.mae.idade++;
    if(personagem.familia.pai.vivo) personagem.familia.pai.idade++;
    if(personagem.emprego) { personagem.dinheiro += personagem.salario; adicionarEvento('Salário recebido: R$ '+personagem.salario.toLocaleString('pt-BR'), 'positivo', 'fa-money-bill'); }
    if(Math.random()>0.5) { const evs = personagem.idade<12 ? DADOS.eventos.infancia : DADOS.eventos.adulto; const e = evs[Math.floor(Math.random()*evs.length)]; if(e.felicidade) personagem.felicidade=Math.min(100,Math.max(0,personagem.felicidade+e.felicidade)); if(e.dinheiro) personagem.dinheiro+=e.dinheiro; adicionarEvento(e.texto, e.felicidade>=0?'positivo':'negativo', e.icone); }
    personagem.felicidade = Math.max(0, personagem.felicidade - Math.random()*2);
    personagem.saude = Math.max(0, personagem.saude - (personagem.idade>50?2:0.5));
    if(personagem.saude<=0 || (personagem.idade>70 && Math.random()*100<personagem.idade-50)) { morrer(); return; }
    atualizarInterface(); mostrarToast('Você fez '+personagem.idade+' anos!', 'sucesso');
}

function morrer() {
    document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
    document.getElementById('tela-gameover').classList.add('ativa');
    document.getElementById('go-nome').textContent = personagem.nome + ' ' + personagem.sobrenome;
    document.getElementById('go-datas').textContent = '2026 - ' + (2026+personagem.idade);
    document.getElementById('go-causa').textContent = personagem.saude<=0 ? 'Causa: doença' : 'Causa: velhice';
    document.getElementById('go-stats').innerHTML = '<div class="stat-item"><i class="fas fa-birthday-cake"></i><span>'+personagem.idade+' anos</span></div><div class="stat-item"><i class="fas fa-money-bill"></i><span>R$ '+personagem.dinheiro.toLocaleString('pt-BR')+'</span></div>';
}

function abrirMenu(t) {
    const m = document.getElementById('modal-menu'), b = document.getElementById('modal-body'), ti = document.getElementById('modal-titulo');
    m.classList.add('ativo');
    if(t==='familia') { ti.innerHTML='<i class="fas fa-home"></i> Família'; b.innerHTML=(personagem.familia.mae.viva?'<div class="menu-item" onclick="interagirFamiliar(\'mae\')"><div class="menu-item-icon" style="background:rgba(253,121,168,0.2);color:#fd79a8;"><i class="fas fa-female"></i></div><div class="menu-item-info"><h4>'+personagem.familia.mae.nome+' (Mãe)</h4><p>Afinidade: '+personagem.familia.mae.afinidade+'%</p></div></div>':'')+(personagem.familia.pai.vivo?'<div class="menu-item" onclick="interagirFamiliar(\'pai\')"><div class="menu-item-icon" style="background:rgba(9,132,227,0.2);color:#0984e3;"><i class="fas fa-male"></i></div><div class="menu-item-info"><h4>'+personagem.familia.pai.nome+' (Pai)</h4><p>Afinidade: '+personagem.familia.pai.afinidade+'%</p></div></div>':''); }
    else if(t==='atividades') { ti.innerHTML='<i class="fas fa-running"></i> Atividades'; b.innerHTML=DADOS.atividades.exercicio.map((a,i)=>'<div class="menu-item" onclick="realizarAtividade(\'exercicio\','+i+')"><div class="menu-item-icon" style="background:rgba(0,184,148,0.2);color:#00b894;"><i class="fas '+a.icone+'"></i></div><div class="menu-item-info"><h4>'+a.nome+'</h4><p>+'+a.saude+' Saúde</p></div><span style="color:#00b894;">R$'+a.custo+'</span></div>').join('')+DADOS.atividades.lazer.map((a,i)=>'<div class="menu-item" onclick="realizarAtividade(\'lazer\','+i+')"><div class="menu-item-icon" style="background:rgba(253,203,110,0.2);color:#fdcb6e;"><i class="fas '+a.icone+'"></i></div><div class="menu-item-info"><h4>'+a.nome+'</h4><p>+'+a.felicidade+' Felicidade</p></div><span style="color:#fdcb6e;">R$'+a.custo+'</span></div>').join(''); }
    else if(t==='trabalho') { ti.innerHTML='<i class="fas fa-briefcase"></i> Trabalho'; b.innerHTML=personagem.emprego?'<div class="menu-item"><div class="menu-item-info"><h4>'+personagem.emprego.nome+'</h4><p>R$ '+personagem.salario.toLocaleString('pt-BR')+'/ano</p></div></div><button class="menu-item" onclick="personagem.emprego=null;personagem.salario=0;fecharModal();mostrarToast(\'Demitiu-se\',\'aviso\');"><span style="color:#d63031;">Pedir Demissão</span></button>':(personagem.idade>=18?DADOS.empregos.entrada.map((e,i)=>'<div class="menu-item" onclick="candidatar('+i+')"><div class="menu-item-info"><h4>'+e.nome+'</h4><p>R$ '+(e.salario*12).toLocaleString('pt-BR')+'/ano</p></div></div>').join(''):'<p style="color:#888;">Mínimo 18 anos</p>'); }
    else if(t==='relacionamentos') { ti.innerHTML='<i class="fas fa-users"></i> Pessoas'; b.innerHTML='<div class="menu-item" onclick="conhecerPessoa()"><div class="menu-item-icon" style="background:rgba(108,92,231,0.2);color:#6c5ce7;"><i class="fas fa-user-plus"></i></div><div class="menu-item-info"><h4>Conhecer alguém</h4></div></div>'+personagem.relacionamentos.map((r,i)=>'<div class="menu-item" onclick="interagirRel('+i+')"><div class="menu-item-info"><h4>'+r.nome+'</h4><p>'+r.tipo+' • '+r.afinidade+'%</p></div></div>').join(''); }
    else { b.innerHTML='<p style="color:#888;">Em breve!</p>'; }
}

function fecharModal() { document.getElementById('modal-menu').classList.remove('ativo'); }

function interagirFamiliar(t) {
    fecharModal();
    const f = t==='mae'?personagem.familia.mae:personagem.familia.pai;
    document.getElementById('dialogo-titulo').textContent = f.nome;
    document.getElementById('dialogo-texto').textContent = 'O que fazer?';
    document.getElementById('dialogo-opcoes').innerHTML = '<button class="btn-opcao" onclick="pedirDinheiro(\''+t+'\')"><i class="fas fa-money-bill"></i> Pedir Dinheiro</button><button class="btn-opcao" onclick="conversar(\''+t+'\')"><i class="fas fa-comments"></i> Conversar</button><button class="btn-opcao" onclick="abracar(\''+t+'\')"><i class="fas fa-heart"></i> Abraçar</button><button class="btn-opcao" onclick="fecharDialogo()"><i class="fas fa-times"></i> Cancelar</button>';
    document.getElementById('modal-dialogo').classList.add('ativo');
}

function fecharDialogo() { document.getElementById('modal-dialogo').classList.remove('ativo'); }

function pedirDinheiro(t) {
    fecharDialogo();
    const f = t==='mae'?personagem.familia.mae:personagem.familia.pai;
    const lim = DADOS.familia[t].limiteMessada[personagem.classe];
    document.getElementById('dialogo-titulo').textContent = 'Pedir quanto?';
    document.getElementById('dialogo-texto').textContent = 'Escolha o valor:';
    document.getElementById('dialogo-opcoes').innerHTML = DADOS.interacoesFamilia.pedirDinheiro.opcoes.map(o=>'<button class="btn-opcao" onclick="executarPedido(\''+t+'\','+o.valor+','+o.dificuldade+')"><i class="fas fa-coins"></i> '+o.texto+'</button>').join('')+'<button class="btn-opcao" onclick="fecharDialogo()"><i class="fas fa-times"></i> Cancelar</button>';
    document.getElementById('modal-dialogo').classList.add('ativo');
}

function executarPedido(t,val,dif) {
    fecharDialogo();
    const f = t==='mae'?personagem.familia.mae:personagem.familia.pai;
    if(f.afinidade + Math.random()*40 > dif) {
        personagem.dinheiro += val;
        const r = DADOS.interacoesFamilia.pedirDinheiro.respostas.sucesso[Math.floor(Math.random()*3)];
        mostrarResultado('sucesso','Conseguiu!',f.nome+': "'+r+'"',[{texto:'+R$'+val,tipo:'positivo'}]);
        adicionarEvento(f.nome+' te deu R$'+val,'positivo','fa-money-bill');
    } else {
        f.afinidade = Math.max(0, f.afinidade-5);
        const r = DADOS.interacoesFamilia.pedirDinheiro.respostas.falha[Math.floor(Math.random()*3)];
        mostrarResultado('falha','Recusou',f.nome+': "'+r+'"',[{texto:'-5 Afinidade',tipo:'negativo'}]);
    }
    atualizarInterface();
}

function conversar(t) { fecharDialogo(); const f=t==='mae'?personagem.familia.mae:personagem.familia.pai; f.afinidade=Math.min(100,f.afinidade+5); personagem.felicidade=Math.min(100,personagem.felicidade+5); mostrarResultado('sucesso','Boa conversa!','Vocês conversaram.',[{texto:'+5 Afinidade',tipo:'positivo'}]); adicionarEvento('Conversou com '+f.nome,'positivo','fa-comments'); atualizarInterface(); }
function abracar(t) { fecharDialogo(); const f=t==='mae'?personagem.familia.mae:personagem.familia.pai; f.afinidade=Math.min(100,f.afinidade+8); personagem.felicidade=Math.min(100,personagem.felicidade+10); mostrarResultado('sucesso','Abraço!',f.nome+' te abraçou.',[{texto:'+10 Felicidade',tipo:'positivo'}]); atualizarInterface(); }

function realizarAtividade(tipo,i) {
    const a = DADOS.atividades[tipo][i];
    if(personagem.dinheiro<a.custo) { mostrarToast('Sem dinheiro!','erro'); return; }
    personagem.dinheiro -= a.custo;
    if(a.saude) personagem.saude = Math.min(100, personagem.saude+a.saude);
    if(a.felicidade) personagem.felicidade = Math.min(100, personagem.felicidade+a.felicidade);
    if(a.inteligencia) personagem.inteligencia = Math.min(100, personagem.inteligencia+a.inteligencia);
    fecharModal(); adicionarEvento('Você foi '+a.nome.toLowerCase(),'positivo',a.icone); atualizarInterface();
}

function candidatar(i) {
    const e = DADOS.empregos.entrada[i];
    if(Math.random()*100 < 50+personagem.inteligencia/2) { personagem.emprego=e; personagem.salario=e.salario*12; fecharModal(); adicionarEvento('Contratado como '+e.nome+'!','positivo','fa-briefcase'); mostrarToast('Contratado!','sucesso'); }
    else { mostrarToast('Não selecionado','erro'); }
    atualizarInterface();
}

function conhecerPessoa() {
    fecharModal();
    const g = Math.random()>0.5?'masculino':'feminino';
    const n = DADOS.nomes.brasil[g==='masculino'?'masculinos':'femininos'][Math.floor(Math.random()*30)];
    personagem.relacionamentos.push({nome:n,genero:g,tipo:'Conhecido',afinidade:30+Math.floor(Math.random()*30)});
    adicionarEvento('Conheceu '+n+'!','positivo','fa-user-plus');
    mostrarToast('Conheceu '+n+'!','sucesso');
}

function interagirRel(i) {
    fecharModal();
    const r = personagem.relacionamentos[i];
    document.getElementById('dialogo-titulo').textContent = r.nome;
    document.getElementById('dialogo-texto').textContent = r.tipo+' • '+r.afinidade+'%';
    document.getElementById('dialogo-opcoes').innerHTML = '<button class="btn-opcao" onclick="conversarRel('+i+')"><i class="fas fa-comments"></i> Conversar</button><button class="btn-opcao" onclick="flertarRel('+i+')"><i class="fas fa-heart"></i> Flertar</button><button class="btn-opcao" onclick="fecharDialogo()"><i class="fas fa-times"></i> Cancelar</button>';
    document.getElementById('modal-dialogo').classList.add('ativo');
}

function conversarRel(i) { fecharDialogo(); personagem.relacionamentos[i].afinidade=Math.min(100,personagem.relacionamentos[i].afinidade+8); if(personagem.relacionamentos[i].afinidade>=60&&personagem.relacionamentos[i].tipo==='Conhecido') personagem.relacionamentos[i].tipo='Amigo'; mostrarResultado('sucesso','Boa conversa!','Afinidade aumentou!',[{texto:'+8',tipo:'positivo'}]); atualizarInterface(); }
function flertarRel(i) { fecharDialogo(); const r=personagem.relacionamentos[i]; if(Math.random()*100<r.afinidade+personagem.aparencia/2) { r.afinidade=Math.min(100,r.afinidade+15); if(r.afinidade>=75) r.tipo='Ficante'; mostrarResultado('sucesso','Deu certo!','Gostou!',[{texto:'+15',tipo:'positivo'}]); } else { r.afinidade=Math.max(0,r.afinidade-10); mostrarResultado('falha','Não rolou...','Rejeitou.',[{texto:'-10',tipo:'negativo'}]); } atualizarInterface(); }

function mostrarResultado(tipo,titulo,texto,stats) {
    document.getElementById('resultado-icon').className = 'resultado-icon '+tipo;
    document.getElementById('resultado-icon').innerHTML = '<i class="fas '+(tipo==='sucesso'?'fa-check':'fa-times')+'"></i>';
    document.getElementById('resultado-titulo').textContent = titulo;
    document.getElementById('resultado-texto').textContent = texto;
    document.getElementById('resultado-stats').innerHTML = stats.map(s=>'<span class="stat-change '+s.tipo+'">'+s.texto+'</span>').join('');
    document.getElementById('modal-resultado').classList.add('ativo');
}

function fecharResultado() { document.getElementById('modal-resultado').classList.remove('ativo'); }

function mostrarToast(msg,tipo) {
    const c = document.getElementById('toast-container');
    const t = document.createElement('div');
    t.className = 'toast '+tipo;
    t.innerHTML = '<i class="fas '+(tipo==='sucesso'?'fa-check':'fa-times')+'"></i><span>'+msg+'</span>';
    c.appendChild(t);
    setTimeout(()=>t.remove(),3000);
}

function salvarJogo() { localStorage.setItem('vidasim_save',JSON.stringify(personagem)); mostrarToast('Salvo!','sucesso'); }
function carregarJogo() { const s=localStorage.getItem('vidasim_save'); if(s){personagem=JSON.parse(s);iniciarJogo();} }
function mostrarConfiguracoes() { mostrarToast('Em breve!','aviso'); }
function mostrarConquistas() { mostrarToast('Em breve!','aviso'); }
function iniciarNovaVida() { location.reload(); }