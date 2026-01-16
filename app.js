/* =========================================
   DADOS INICIAIS E PERSISTÊNCIA
   ========================================= */
let estoque = JSON.parse(localStorage.getItem('ink_estoque')) || [];
let reservas = JSON.parse(localStorage.getItem('ink_reservas')) || [];
let feedbacks = JSON.parse(localStorage.getItem('ink_feedbacks')) || [];
let insumos = JSON.parse(localStorage.getItem('ink_insumos')) || []; // Nova linha para materiais

/* =========================================
   1. NAVEGAÇÃO DE ABAS
   ========================================= */
function switchTab(tabId) {
    if (tabId === 'estoque' && localStorage.getItem('ink_logado') !== 'true') {
        alert("Área restrita a profissionais.");
        switchTab('joias');
        return;
    }

    document.querySelectorAll('.tab-section').forEach(s => s.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    
    const abaAlvo = document.getElementById(tabId);
    if (abaAlvo) abaAlvo.classList.remove('hidden');
    
    const botoes = document.querySelectorAll('.tab-btn');
    botoes.forEach(btn => {
        if (btn.getAttribute('onclick').includes(tabId)) {
            btn.classList.add('active');
        }
    });

    if (tabId === 'joias') renderCatalogo();
    if (tabId === 'estoque') renderInsumos(); // Carrega os materiais quando entrar no Admin
}


/* =========================================
   3. VITRINE DE JOIAS (CATÁLOGO DINÂMICO)
   ========================================= */
function renderCatalogo() {
    const grid = document.getElementById('joias-grid');
    if (!grid) return;
    grid.innerHTML = '';

    if (estoque.length === 0) {
        grid.innerHTML = '<p>Nenhuma joia disponível no momento.</p>';
        return;
    }

    estoque.forEach(item => {
        const mensagemWhats = encodeURIComponent(`Olá! Vi no seu catálogo e gostaria de reservar a joia: ${item.nome}`);
        const seuNumero = "63992003431"; // <-- LEMBRE DE COLOCAR SEU NÚMERO AQUI

        grid.innerHTML += `
            <div class="card card-joia">
                <img src="${item.foto || 'https://via.placeholder.com/150'}" style="width:100%; border-radius:8px; margin-bottom:10px; height:200px; object-fit:cover;">
                <h4>${item.nome}</h4>
                <p style="font-size: 0.85rem; color: #666; margin-bottom: 8px;">${item.desc || 'Sem descrição.'}</p>
                <p style="color: var(--gold); font-weight: bold; font-size: 1.1rem;">R$ ${item.preco.toFixed(2)}</p>
                
                <a href="https://wa.me/${seuNumero}?text=${mensagemWhats}" 
                   target="_blank" 
                   class="btn-gold" 
                   style="text-decoration:none; display:block; text-align:center; margin-top:10px; line-height:35px;">
                   Reservar via WhatsApp
                </a>
            </div>
        `;
    });
}

/* =========================================
   4. FUNÇÕES DE ADMIN (JOIAS E RESERVAS)
   ========================================= */
function renderEstoque() {
    const gridEstoque = document.getElementById('inventory-grid');
    if (!gridEstoque) return;

    gridEstoque.innerHTML = `
        <div class="estoque-col">
            <h3>📦 Joias no Sistema</h3>
            <div id="lista-disponivel"></div>
        </div>
        <div class="reserva-col">
            <h3>📅 Reservas Ativas</h3>
            <div id="lista-reservados"></div>
        </div>
    `;

    const listaDisp = document.getElementById('lista-disponivel');
    const listaRes = document.getElementById('lista-reservados');

    estoque.forEach((item, index) => {
        listaDisp.innerHTML += `
            <div class="card item-estoque" style="display:flex; align-items:center; gap:10px;">
                <img src="${item.foto}" style="width:50px; height:50px; border-radius:5px; object-fit:cover;">
                <div style="flex:1">
                    <strong>${item.nome}</strong><br>
                    <small>Qtd: ${item.qtd} | R$ ${item.preco}</small>
                </div>
                <button class="btn-gold" style="padding:5px 10px; font-size:0.7rem;" onclick="abrirPainelReserva(${index})">Reservar</button>
                <button onclick="removerDoEstoque(${index})" style="color:red; border:none; background:none; cursor:pointer;">🗑️</button>
            </div>
        `;
    });

    reservas.forEach((res, index) => {
        listaRes.innerHTML += `
            <div class="card item-reserva" style="border-left: 5px solid var(--gold)">
                <strong>${res.peca}</strong>
                <p>👤 ${res.cliente} | 📅 ${res.data}</p>
                <div style="margin-top:10px;">
                    <button class="btn-gold" style="background:#444; font-size:0.7rem;" onclick="finalizarReserva(${index}, 'usado')">Baixa</button>
                    <button class="btn-gold" style="background:#999; font-size:0.7rem;" onclick="finalizarReserva(${index}, 'devolver')">Devolver</button>
                </div>
            </div>
        `;
    });
}

function abrirPainelReserva(index) {
    const item = estoque[index];
    if (item.qtd <= 0) return alert("Não há estoque!");
    const nome = prompt("Nome da Cliente:");
    const data = prompt("Data:");
    if (nome && data) {
        estoque[index].qtd--;
        reservas.push({ peca: item.nome, cliente: nome, data: data });
        salvarTudo();
    }
}

function finalizarReserva(index, acao) {
    if (acao === 'devolver') {
        const item = estoque.find(i => i.nome === reservas[index].peca);
        if (item) item.qtd++;
    }
    reservas.splice(index, 1);
    salvarTudo();
}

function removerDoEstoque(index) {
    if(confirm("Excluir este item?")) {
        estoque.splice(index, 1);
        salvarTudo();
    }
}

function salvarTudo() {
    localStorage.setItem('ink_estoque', JSON.stringify(estoque));
    localStorage.setItem('ink_reservas', JSON.stringify(reservas));
    renderEstoque();
    renderCatalogo();
}

/* =========================================
   5. GESTÃO DE MATERIAIS (INSUMOS)
   ========================================= */
function abrirModalInsumo() { document.getElementById('modalInsumo').classList.remove('hidden'); }
function fecharModalInsumo() { document.getElementById('modalInsumo').classList.add('hidden'); }

function salvarInsumo() {
    const nome = document.getElementById('insumoNome').value;
    const qtd = document.getElementById('insumoQtd').value;
    if (nome && qtd) {
        insumos.push({ nome, qtd: parseInt(qtd) });
        localStorage.setItem('ink_insumos', JSON.stringify(insumos));
        renderInsumos();
        fecharModalInsumo();
        document.getElementById('insumoNome').value = '';
        document.getElementById('insumoQtd').value = '';
    }
}

function renderInsumos() {
    const container = document.getElementById('lista-insumos');
    if (!container) return;
    container.innerHTML = '';
    
    insumos.forEach((item, index) => {
        container.innerHTML += `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:10px; border-bottom:1px solid #eee;">
                <span>${item.nome}</span>
                <div>
                    <button onclick="ajustarQtdInsumo(${index}, -1)">-</button>
                    <strong style="margin:0 10px">${item.qtd}</strong>
                    <button onclick="ajustarQtdInsumo(${index}, 1)">+</button>
                    <button onclick="removerInsumo(${index})" style="margin-left:15px; border:none; background:none;">🗑️</button>
                </div>
            </div>
        `;
    });
}

function ajustarQtdInsumo(index, valor) {
    insumos[index].qtd += valor;
    if (insumos[index].qtd < 0) insumos[index].qtd = 0;
    localStorage.setItem('ink_insumos', JSON.stringify(insumos));
    renderInsumos();
}

function removerInsumo(index) {
    if(confirm("Remover material?")) {
        insumos.splice(index, 1);
        localStorage.setItem('ink_insumos', JSON.stringify(insumos));
        renderInsumos();
    }
}

/* =========================================
   6. MODAL DE JOIAS E FEEDBACKS
   ========================================= */
const productForm = document.getElementById('product-form');
if (productForm) {
    productForm.onsubmit = (e) => {
        e.preventDefault();
        const fotoArq = document.getElementById('prodFoto').files[0];
        const reader = new FileReader();
        if (fotoArq) {
            reader.readAsDataURL(fotoArq);
            reader.onload = () => salvarNovoProduto(reader.result);
        } else {
            salvarNovoProduto('https://via.placeholder.com/150');
        }
    };
}

function salvarNovoProduto(fotoBase64) {
    const novo = {
        id: Date.now(),
        nome: document.getElementById('prodNome').value,
        preco: parseFloat(document.getElementById('prodPreco').value),
        qtd: parseInt(document.getElementById('prodQtd').value),
        desc: document.getElementById('prodDesc').value,
        foto: fotoBase64
    };
    estoque.push(novo);
    salvarTudo();
    document.getElementById('modal').classList.add('hidden');
    productForm.reset();
}

const modal = document.getElementById('modal');
if (document.getElementById('openModal')) {
    document.getElementById('openModal').onclick = () => modal.classList.remove('hidden');
}
if (document.getElementById('closeModal')) {
    document.getElementById('closeModal').onclick = () => modal.classList.add('hidden');
}

const feedbackForm = document.getElementById('feedback-form');
if (feedbackForm) {
    feedbackForm.onsubmit = (e) => {
        e.preventDefault();
        const fotoArq = document.getElementById('fbFoto').files[0];
        const reader = new FileReader();
        if (fotoArq) {
            reader.readAsDataURL(fotoArq);
            reader.onload = () => salvarFB(reader.result);
        } else {
            salvarFB(null);
        }
    };
}

function salvarFB(img) {
    feedbacks.unshift({
        nome: document.getElementById('fbNome').value,
        nota: document.getElementById('fbNota').value,
        texto: document.getElementById('fbTexto').value,
        foto: img,
        data: new Date().toLocaleDateString()
    });
    localStorage.setItem('ink_feedbacks', JSON.stringify(feedbacks));
    renderFeedbacks();
    feedbackForm.reset();
    alert("Avaliação enviada! ✨");
}

function renderFeedbacks() {
    const list = document.getElementById('feedback-list');
    if (!list) return;
    list.innerHTML = '';
    const logado = localStorage.getItem('ink_logado') === 'true';
    feedbacks.forEach((f, i) => {
        list.innerHTML += `
            <div class="card" style="position:relative">
                <strong>${f.nome} ${"⭐".repeat(f.nota)}</strong>
                <p>"${f.texto}"</p>
                ${f.foto ? `<img src="${f.foto}" style="width:100%; border-radius:8px; margin-top:10px;">` : ''}
                ${logado ? `<button onclick="excluirFB(${i})" style="position:absolute; top:10px; right:10px; background:none; border:none; cursor:pointer;">🗑️</button>` : ''}
            </div>
        `;
    });
}

function excluirFB(i) {
    if(confirm("Excluir feedback?")) {
        feedbacks.splice(i, 1);
        localStorage.setItem('ink_feedbacks', JSON.stringify(feedbacks));
        renderFeedbacks();
    }
}

/* =========================================
   7. INICIALIZAÇÃO E ACESSO
   ========================================= */
window.onload = () => {
    renderEstoque();
    renderCatalogo();
    renderFeedbacks();
    renderInsumos(); // Carrega os insumos ao abrir
    if (localStorage.getItem('ink_logado') === 'true') {
        document.getElementById('btn-admin').classList.remove('hidden');
    }
    switchTab('joias');
};

function acessoAdmin() {
    const senha = prompt("Senha de acesso (4 digitos):");
    if (senha === "4807") {
        localStorage.setItem('ink_logado', 'true');
        document.getElementById('btn-admin').classList.remove('hidden');
        switchTab('estoque');
    } else {
        alert("Incorreto.");
    }
}
