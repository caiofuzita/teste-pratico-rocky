let fs = require('fs'); // inclui o modulo 'file system'

// abrindo o arquivo .json
let brokenJson = readFileJson();

//realizando as devidas correções no arquivo
for (let i in brokenJson){
    brokenJson[i]['name'] = fixName(brokenJson[i]['name']);
    brokenJson[i]['price'] = fixPrice(brokenJson[i]['price']);
    brokenJson[i]['quantity'] = fixQuantity(brokenJson[i]['quantity']);
}

// salvando o arquivo de forma corrigida
saveFileJson(brokenJson);

// abrindo o arquivo corrigido
let fixedJson = readFixedJson();

// ordenando por categoria e id
fixedJson.sort(function (a, b){ 
    return (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : (a.id > b.id) ? 1 : (b.id > a.id) ? -1 : 0);
});

// imprimindo o arquivo ordenado
console.log('Ordenado por categoria e ID:')
console.log('')
console.log(fixedJson);

// valor por categoria
console.log ('')
console.log('Valor dos produtos por categoria:')

// listando as categorias existentes
const categorias = ['Acessórios','Eletrodomésticos','Eletrônicos','Panelas'];

// varrendo e aplicando a função para calcular o valor do estoque de cada categoria
for (let i = 0; i < categorias.length; i++) {
    let produtos = fixedJson.filter((search) => {
        return search.category == categorias[i];
    }) 
    console.log(categorias[i], calculaEstoque(produtos))
}


//funções

// lê o arquivo .json
function readFileJson() {
    try{
        const data = fs.readFileSync('./broken-database.json','utf8'); // fonte: https://nodejs.org/api/fs.html
        return JSON.parse(data); // fonte: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse 
    } catch (err){
        console.error(err) 
    }
}

// corrige as letras
function fixName(letters) {
    return letters.replace(/æ/g,'a').replace(/¢/g,'c').replace(/ø/g,'o').replace(/ß/g,'b'); 
}

// corrige os preços
function fixPrice(preco){
    return Number(preco); 
}

// corrige as quantidades
function fixQuantity(quantity){
    return quantity || 0;
}

// salva o arquivo em .json
function saveFileJson(file){
    let dados = JSON.stringify(file);
    fs.writeFileSync('./saida.json', dados);
}

// abre o arquivo em .json já corrigido
function readFixedJson() {  
    try{
        const data = fs.readFileSync('./saida.json','utf8'); 
        return JSON.parse(data); 
    } catch (err){
        console.error(err) 
    }
}

// faz a multiplicacao (quantidade x preço) de um objeto
function calculaEstoque(products){
    let soma = 0;
    for (let i in products){
        soma += products[i]['quantity'] * products[i]['price'];
    } return soma 
}