// Definindo variáveis
const MARCADAS = [12, 19, 02, 22, 24, 10, 17, 06, 26, 10, 15, 13, 18, 04, 02, 05, 17, 10, 13, 06, 13, 23, 17, 10, 03, 16, 03, 09, 24, 22, 22, 11, 27, 19, 12, 02, 30, 13, 25, 20];

const NOTA_REDACAO = 0;

const CORRETAS = [07, 19, 13, 18, 04, 14, 29, 16, 23, 10, 13, 03, 02, 14, 23, 01, 25, 18, 13, 06, 10, 23, 05, 17, 18, 12, 03, 09, 24, 22, 17, 10, 25, 23, 28, 18, 28, 12, 29, 20];

const CATEGORIAS = [
	['Conhecimentos Gerais', 0, 18],
	['Português e Literatura', 19, 25],
	['Língua Estrangeira (Inglês)', 26, 29],
	['Específica 1 (Física)', 30, 34],
	['Específica 2 (Matemática)', 35, 39]
];

var notas = [],
	qstCertas = 0,
	notaQstObj = 0;

// Se o numero for menor que 10 coloca um 0 na frente
function n(n) {
	return n > 9 ? "" + n : "0" + n;
}

// Retorna o numero formatado com virgulas no lugar de pontos
function numBR(num) {
	return num.toString().replace('.',',');
}

// Converte o numero em binario e deixa com 5 caracteres
function num2Bin(num) {
	return "000000".substring((num.toString(2) + "").length, 5) + num.toString(2);
}

// Função que pega os numeros marcados e corretos e retorna a nota
function getNota(marcado, correto) {
	// Se a questão for anulada
	if (correto == -1)
		return 6

	// Converte os numeros em binário
	marcado = num2Bin(marcado);
	correto = num2Bin(correto);

	// Pega o numero de questões corretas
	var numCorr = correto.split(1).length - 1;
	var numAcertos = 0;

	for (var i = 0; i < 5; i++) {
		// Se marcar alguma que nao podia
		if (marcado[i] == 1 && correto[i] == 0)
			return 0;

		// Se marcou certo a questão certa
		if (marcado[i] == 1 && correto[i] == 1)
			numAcertos++;

	}

	return (6 / numCorr) * numAcertos;
}

// Soma todas as notas na var TOTAL e adiciona as notas na array notas
for (var i = 0; i < MARCADAS.length; i++) {
	var notaAtual = getNota(MARCADAS[i], CORRETAS[i]);
	notas[i] = notaAtual;
	notaQstObj += notaAtual;
	if (notaAtual > 0)
		qstCertas++;
}

// Escreve a tabela com cada questão que acertou, quantos pontos fez e quais numeros foram marcados
function escreverTabela() {
	var tblQuestoes = "";
	tblQuestoes += "<table>";
	for (var i = 0; i < CATEGORIAS.length; i++) {
		tblQuestoes += "<tr><th colspan='3'>" + CATEGORIAS[i][0] + "</th></tr>";
		for (var j = CATEGORIAS[i][1]; j <= CATEGORIAS[i][2]; j++) {
			if (CORRETAS[j] == -1) {
				tblQuestoes += "<tr>";
				tblQuestoes += "<td>Questão:&nbsp;" + n(j + 1) + "</td>";
				tblQuestoes += "<td>Nota:&nbsp;" + numBR(notas[j]) + "</td>";
				tblQuestoes += "<td>(&nbsp;Anul.&nbsp;)</td>";
				tblQuestoes += "</tr>";
			} else
			if (notas[j] > 0) {
				tblQuestoes += "<tr>";
				tblQuestoes += "<td>Questão:&nbsp;" + n(j + 1) + "</td>";
				tblQuestoes += "<td>Nota:&nbsp;" + numBR(notas[j]) + "</td>";
				tblQuestoes += "<td>(&nbsp;" + n(MARCADAS[j]) + "&nbsp;|&nbsp;" + n(CORRETAS[j]) + "&nbsp;)</td>";
				tblQuestoes += "</tr>";
			}
		}
	}
	tblQuestoes += "</table>";
	return tblQuestoes;
}


$(function() {
	escreverResumos();
	escreverAcertos();
	escreverQuestoes();
	ativarCursos();
	mostrarTabela();
})

function escreverResumos() {
	$('.notas .total span').text(numBR(NOTA_REDACAO + notaQstObj));
	$('.notas .objetivas span').text(numBR(notaQstObj));
	$('.notas .redacao span').text(numBR(NOTA_REDACAO));
}

function escreverAcertos() {
	$('.acertos').text('Acertos: ' + qstCertas + ' || Zeradas: ' + ( 40 - qstCertas ));
}

function escreverQuestoes() {
	$('.questoes').html(escreverTabela());
}

function ativarCursos() {
	$('.form-serie').on("change", function() {
		if ( $(this).val() == '3' )
			$('.form-curso').removeAttr('disabled');
		else
			$('.form-curso').attr('disabled','true');
	});
}

function mostrarTabela() {
	$('.notas-tabela .btn-mostrar').on('click', function() {
		$('.tabela-questoes').toggleClass('show');
	})
}
