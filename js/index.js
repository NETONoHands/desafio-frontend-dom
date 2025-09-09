import {dados} from './data.js';


// construtor de produtos
const containerClassicos = document.querySelector('.container__classicos');
const containerGelados = document.querySelector('.container__gelados');

dados.produtos.forEach(produto => {    

    const productDiv = document.createElement('div');
    productDiv.classList.add('products__list--item');

    const img = document.createElement('img');
    img.src = produto.imagem;
    img.alt = produto.nome;
    

    const preco = document.createElement('h3');
    preco.classList.add('products__list--price');
    preco.innerHTML = 'R$ ' + formataPreco(produto.preco.por) + '<span> R$ ' + formataPreco(produto.preco.de) + '</span>';

    const nome = document.createElement('h4');
    nome.classList.add('products__list--name');
    nome.innerText = produto.nome;

    const tag = document.createElement('div');
    tag.classList.add('products__tag');
    const tagImg = document.createElement('img');
    const tagText = document.createElement('span');

    if (produto.vegano === true) {
        tagImg.src = './image/Plant.png';
        tagText.innerText = 'Produto Vegano';
    } else {
        tagImg.src = './image/Cow.png';
        tagText.innerText = 'Contém lactose';
    }

    tag.appendChild(tagImg);
    tag.appendChild(tagText);

    const formulario = document.createElement('form');
    const div3 = document.createElement('div');
    div3.classList.add('product__buy');

    const sessionQtde = document.createElement('section');
    sessionQtde.classList.add('product__quantity');
    
    const botaoMenos = document.createElement('button');
    botaoMenos.type = 'button';
    botaoMenos.classList.add('product__quantity--minus');
    const imgMenos = document.createElement('img');
    imgMenos.src = './image/Minus.svg';
    botaoMenos.appendChild(imgMenos);


    const visualizarQtde = document.createElement('input');
    visualizarQtde.classList.add('product__quantity--input');
    visualizarQtde.type = 'text';
    visualizarQtde.disabled = true;
    visualizarQtde.value = 1;

    const botaoMais = document.createElement('button');
    botaoMais.type = 'button';
    botaoMais.classList.add('product__quantity--plus');
    const imgMais = document.createElement('img');
    imgMais.src = './image/Plus.svg';
    botaoMais.appendChild(imgMais);

    const botaoComprar = document.createElement('button');
    botaoComprar.type = 'button';
    botaoComprar.classList.add('product__button');
    botaoComprar.innerText = 'Comprar';

    sessionQtde.appendChild(botaoMenos);
    sessionQtde.appendChild(visualizarQtde);
    sessionQtde.appendChild(botaoMais);

    productDiv.appendChild(img);
    productDiv.appendChild(preco);
    productDiv.appendChild(nome);
    productDiv.appendChild(tag);
    productDiv.appendChild(formulario);
    formulario.appendChild(div3);
    div3.appendChild(sessionQtde);
    productDiv.appendChild(botaoComprar);

    if (produto.categoria === 'classicos') {
        containerClassicos.appendChild(productDiv);
    } else {
        containerGelados.appendChild(productDiv);
    }

    botaoMais.addEventListener('click', () => {
                let currentValue = parseInt(visualizarQtde.value);
                currentValue++;
                visualizarQtde.value = currentValue;
            });

    botaoMenos.addEventListener('click', () => {
                let currentValue = parseInt(visualizarQtde.value);
                if (currentValue > 1) {
                    currentValue--;
                    visualizarQtde.value = currentValue;
                }
            });

    botaoComprar.addEventListener('click', () => {
        const quantidade = parseInt(visualizarQtde.value);
        addCarrinho(produto, quantidade);
        atualizaNumeroCarrinho();
        alert(`Você adicionou ${quantidade} unidade(s) de ${produto.nome} ao carrinho.`);
    }
)
});


//inicio do carrinho
const chaveCarrinho = 'carrinho';

function salvaCarrinho(carrinho) {
    localStorage.setItem(chaveCarrinho, JSON.stringify(carrinho)) ?? [];
}

function carregaCarrinho() {
    try {
        return JSON.parse(localStorage.getItem(chaveCarrinho)) ?? [];
    } catch {
        return [];
    }
}

function formataPreco(preco) {
    return 'R$ ' + (preco / 100).toFixed(2).replace('.', ',');
}

function atualizaNumeroCarrinho(cart = carregaCarrinho()) {
    const numImg = document.querySelector('.badge__quantity');
    if (!numImg) return;
    const total = cart.reduce((acc, item) => acc + (item.quantidade || 0), 0);
    numImg.textContent = total;
}

//construtor da estrutura do carrinho
const cartContainer = document.querySelector('.header');

const carrinho = document.createElement('div');
carrinho.classList.add('cart');

const cabecalho = document.createElement('div');
cabecalho.classList.add('cart__header');

const titulo = document.createElement('h3');
titulo.classList.add('cart__title');
titulo.innerText = 'Seu Carrinho';
cabecalho.appendChild(titulo);

const botaoFechar = document.createElement('button');
botaoFechar.classList.add('cart__close');
botaoFechar.innerText = 'X';
cabecalho.appendChild(botaoFechar);

carrinho.appendChild(cabecalho);

const corpo = document.createElement('div');
corpo.classList.add('cart__body');

const info = document.createElement('div');
info.classList.add('cart__info');

const quantidadeSpan = document.createElement('span');
quantidadeSpan.classList.add('cart__quantity-items');
info.appendChild(quantidadeSpan);

const deletaTudo = document.createElement('button');
deletaTudo.classList.add('cart__remove-all');
deletaTudo.textContent = 'Limpar carrinho';
info.appendChild(deletaTudo);

corpo.appendChild(info);

const listaCarrinho = document.createElement('div');
listaCarrinho.classList.add('cart__products');
corpo.appendChild(listaCarrinho);

carrinho.appendChild(corpo);

const rodape = document.createElement('div');
rodape.classList.add('cart__footer');

const subTotalLinha = document.createElement('div');
subTotalLinha.classList.add('cart__footer--row','cart__footer--subtotal');
subTotalLinha.innerHTML  = `<span class="cart__footer--title">Subtotal</span><strong class="cart__footer--price">R$ 0,00</strong>`;
rodape.appendChild(subTotalLinha);

const entregaLinha = document.createElement('div');
entregaLinha.classList.add('cart__footer--row','cart__footer--delivery');
entregaLinha.innerHTML  = `<span class="cart__footer--title">Entrega</span><strong class="cart__footer--price">R$ 0,00</strong>`;
rodape.appendChild(entregaLinha);


const total = document.createElement('div');
total.classList.add('cart__footer--row','cart__footer--total');
total.innerHTML  = `<span class="cart__footer--title">Total</span><strong class="cart__footer--price">R$ 0,00</strong>`;
rodape.appendChild(total);

const finalizarButton = document.createElement('button');
finalizarButton.classList.add('cart__buy');
finalizarButton.innerText = 'Finalizar Compra';
rodape.appendChild(finalizarButton);


carrinho.appendChild(rodape);
cartContainer.appendChild(carrinho);

const botaoCarrinho = document.querySelector('.link__quantity');

botaoCarrinho.addEventListener('click', (e) =>{
    e.preventDefault();
    carrinho.classList.add('cart--active');
})

botaoFechar.addEventListener('click', () => {
    carrinho.classList.remove('cart--active');
})

deletaTudo.addEventListener('click', () => {
    salvaCarrinho([]);
    criaItemCart([]);
    atualizaNumeroCarrinho([]);
    quantidadeSpan.textContent = '0 item(ns)';
})


//construtor de itens do carrinho
function criaItemCart(carrinho = carregaCarrinho()) {
    listaCarrinho.innerHTML = '';
    let valor = 0;

    carrinho.forEach((item) => {
        valor += item.preco * item.quantidade;

        const itemCarrinho = document.createElement('div');
        itemCarrinho.classList.add('cart__product');

        const img = document.createElement('img');
        img.classList.add('cart__product--image');
        img.src = item.img;
        img.alt = item.nomeProduto;

        const coluna = document.createElement('div');
        coluna.classList.add('cart__product--column');

        const nomeProduto = document.createElement('h4');
        nomeProduto.classList.add('cart__product--name');
        nomeProduto.textContent = item.nome;

        const controlesContainer = document.createElement('div');
        controlesContainer.classList.add('product__quantity');

        const botaoMenosCarrinho = document.createElement('button');
        botaoMenosCarrinho.type = 'button';
        botaoMenosCarrinho.classList.add('product__quantity--minus');
        botaoMenosCarrinho.innerText = '-';

        const quantidadeProduto = document.createElement('input');
        quantidadeProduto.classList.add('product__quantity--input');
        quantidadeProduto.type = 'text';
        quantidadeProduto.disabled = true;
        quantidadeProduto.value = item.quantidade;


        const botaoMaisCarrinho = document.createElement('button');
        botaoMaisCarrinho.type = 'button';
        botaoMaisCarrinho.classList.add('product__quantity--plus');
        botaoMaisCarrinho.innerText = '+';

        controlesContainer.appendChild(botaoMenosCarrinho);
        controlesContainer.appendChild(quantidadeProduto);
        controlesContainer.appendChild(botaoMaisCarrinho);


        const precoProduto = document.createElement('span');
        precoProduto.classList.add('cart__product--price');
        precoProduto.textContent = formataPreco(item.preco * item.quantidade)

        const botaoRemover = document.createElement('button');
        botaoRemover.type = 'button';
        botaoRemover.classList.add('cart__product--delete');
        botaoRemover.innerText = 'X';
        botaoRemover.title = 'Remover';
            

        coluna.appendChild(nomeProduto);
        coluna.appendChild(controlesContainer);

        const linha = document.createElement('div');
        linha.classList.add('cart__product--row');
        linha.appendChild(coluna);
        linha.appendChild(precoProduto);

        linha.appendChild(botaoRemover);
        itemCarrinho.appendChild(img);
        itemCarrinho.appendChild(linha);

        listaCarrinho.appendChild(itemCarrinho);


        //eventos
        botaoMaisCarrinho.addEventListener('click', () => {
            const c = carregaCarrinho();
            const i = c.findIndex(p => p.idProduto === item.idProduto);
            if (i >= 0) {
                c[i].quantidade += 1;
                salvaCarrinho(c);
                criaItemCart(c);
                atualizaNumeroCarrinho(c);
            }
        });

        botaoMenosCarrinho.addEventListener('click', () => {
            const c = carregaCarrinho();
            const i = c.findIndex(p => p.idProduto === item.idProduto);
            if (i >= 0) {
                c[i].quantidade = Math.max(i, c[i].quantidade - 1);
                salvaCarrinho(c);
                criaItemCart(c);
                atualizaNumeroCarrinho(c);
            }
        });

        botaoRemover.addEventListener('click', () => {
            const c = carregaCarrinho().filter(p => p.idProduto !== item.idProduto);
            salvaCarrinho(c);
            criaItemCart(c);
            atualizaNumeroCarrinho(c);
        });


        const [subtotalEl, , totalEl] = rodape.querySelectorAll('.cart__footer--row .cart__footer--price');
        if (subtotalEl) subtotalEl.textContent = formataPreco(valor);
        if (totalEl) totalEl.textContent = formataPreco(valor);
        quantidadeSpan.textContent = `${carrinho.reduce((a,b)=>a + Number(b.quantidade||0),0)} item(ns)`;
    }
)};

    



function addCarrinho(item, quantidade) {
    const carrinho = carregaCarrinho();
    const id = carrinho.findIndex(i => i.idProduto === item.id);
    if (id >= 0) {
        carrinho[id].quantidade += quantidade;
    } else {
        carrinho.push({
            idProduto: item.id,
            nomeProduto: item.nome,
            img: item.imagem,
            preco: item.preco.por,
            tag: item.vegano,
            quantidade
        })
    }
    salvaCarrinho(carrinho);
    criaItemCart(carrinho);
    atualizaNumeroCarrinho(carrinho);
}


criaItemCart(carregaCarrinho());
atualizaNumeroCarrinho(carregaCarrinho());