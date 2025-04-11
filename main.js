const form = document.getElementById("form-atividade");
const mediaGeral = document.getElementById("media");

let medias = [];
let mediaMinima = 6;
let somaDasMedias = 0;
let totalDeMaterias = 0;

const materiasCadastradas = new Set();

if (medias.length === 0) {
    alert("Nenhuma média cadastrada!");
    let resposta = prompt("Deseja cadastrar uma média? (S/N)");
    if (resposta.toUpperCase() === "S") {
        mediaMinima = parseFloat(prompt("Digite a média mínima:"));
        medias.push(mediaMinima);
    } else {
        mediaMinima = 6;
    }
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputMateria = document.getElementById("materia");
    const inputAtv1 = document.getElementById("atv1");
    const inputAtv2 = document.getElementById("atv2");

    const materiaLower = inputMateria.value.trim().toLowerCase();
    if (materiasCadastradas.has(materiaLower)) {
        alert("Essa matéria já foi adicionada!");
        return;
    }
    materiasCadastradas.add(materiaLower);

    let linha = '<tr>';
    linha += '<td>' + inputMateria.value + '</td>';
    linha += '<td>' + inputAtv1.value + '</td>';
    linha += '<td>' + inputAtv2.value + '</td>';
    linha += '<td>' + ((parseFloat(inputAtv1.value) + parseFloat(inputAtv2.value)) / 2).toFixed(2) + '</td>';
    linha += '<td>' + (((parseFloat(inputAtv1.value) + parseFloat(inputAtv2.value)) / 2) >= mediaMinima ? 'Aprovado' : 'Reprovado') + '</td>';
    linha += '</tr>';

    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML += linha;
    
    alert('Materia: ' + inputMateria.value +
        '\nAtividade 1: ' + inputAtv1.value +
        '\nAtividade 2: ' + inputAtv2.value);

    const mediaMateria = ((parseFloat(inputAtv1.value) + parseFloat(inputAtv2.value)) / 2);
    somaDasMedias += mediaMateria;
    totalDeMaterias++;
    
    const mediaGeral = somaDasMedias / totalDeMaterias;
    const resultadoFinal = mediaGeral >= mediaMinima ? 'Aprovado!' : 'Reprovado!';
    
    document.getElementById("media").innerText = `NOTA ${mediaGeral.toFixed(2)} - ${resultadoFinal}` ;
    
    inputMateria.value = '';
    inputAtv1.value = '';
    inputAtv2.value = '';
});
