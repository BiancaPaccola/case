const fs = require('fs');

// Função para ler um arquivo e o retorna em formato JSON
function readFile(file) {
    const result = fs.readFileSync(file, 'utf8');
    return JSON.parse(result);
}

// Função para fazer a troca dos caracteres corrompidos
function normalizeStrings(file) {
    let result = file

    for (row of result) {
        if (row.nome) {
            row.nome = row.nome.replaceAll('æ', 'a').replaceAll('ø', 'o')
        } else if (row.marca) {
            row.marca = row.marca.replaceAll('æ', 'a').replaceAll('ø', 'o')
        }
    }

    return result;
}

// Função para mudar o tipo string para o tipo number da propriedade vendas
function fixSales(file) {
    const result = file

    for (row of result) {
        if (row.vendas) {
            row.vendas = parseInt(row.vendas)
        }
    }

    return result;
}

// Função para gravar os arquivos modificados
function exportFile(content, title) {
    const path = `./new-files-database/${title}`
    fs.writeFile(path, JSON.stringify(content), (err) => {
        if(err) throw err;
        console.log(`Arquivo exportado para ${path}`)
    })
}

// ------------- Chamando as funções -------------- //

// Corrigindo o primeiro arquivo
const readFisrtFile = readFile("./files-database/broken_database_1.json")
const normFirstFile = normalizeStrings(readFisrtFile)
const normFirstFileSales = fixSales(normFirstFile)
exportFile(normFirstFileSales, "./broken_database_1.json")

// Corrigindo o segundo arquivo
 const normSecondFile = normalizeStrings(readFile("./files-database/broken_database_2.json"))
 exportFile(normSecondFile, "./broken_database_2.json")
 



