const formatter = Intl.NumberFormat('pt-BR');// aqui é uma API para formatar numeros
// esta função é para formatar os numeros colocando , .
function formatNumber(value){
    return formatter.format(value);

}

export {formatNumber};