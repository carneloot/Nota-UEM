function getUrlParameter(sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
}

// Se o numero for menor que 10 coloca um 0 na frente
function n(n) {
	return n > 9 ? '' + n : '0' + n;
}

// Retorna o numero formatado com virgulas no lugar de pontos
function nota(num) {
	if (num === parseInt(num, 10))
		return num.toString() + ',0';
	else
		return num.toString().replace('.', ',');
}

// Converte o numero em binario e deixa com 5 caracteres
function num2Bin(num) {
	return '000000'.substring((num.toString(2) + '').length, 5) + num.toString(2);
}

// Função que pega os numeros marcados e corretos e retorna a nota
function getNota(marcado, correto) {
	// Se a questão for anulada
	if (correto == -1)
		return 6;

	// Converte os numeros em binário
	marcado = num2Bin(marcado);
	correto = num2Bin(correto);

	// Pega o numero de questões corretas
	var numCorr = correto.split(1).length - 1;
	// Inicia a Variavel numAcertos
	var numAcertos = 0;

	for (var i = 0; i < 5; i++) {
		// Se marcar alguma que nao podia
		if (marcado[i] == 1 && correto[i] == 0)
			return 0;

		// Se marcou certo a questão certa
		if (marcado[i] == 1 && correto[i] == 1)
			numAcertos++;
	}
	// Retorna 6 dividido pelo numero de corretas vezes no numero de acertos
	return (6 / numCorr) * numAcertos;
}

// Pega uma especifica feia e retorna bonita
function pretty(especifica) {
	var nomes = {
		'arte': 'Arte',
		'biologia': 'Biologia',
		'educacao-fisica': 'Educação Física',
		'filosofia': 'Filosofia',
		'fisica': 'Física',
		'geografia': 'Geografia',
		'historia': 'História',
		'matematica': 'Matemática',
		'quimica': 'Química',
		'sociologia': 'Sociologia',
		'ingles': 'Inglês',
		'espanhol': 'Espanhol',
		'frances': 'Francês'
	};
	return nomes[especifica];
}
var questoesCorretas = [],
	questoesMarcadas = [],
	serie, linguaEstrangeira, redacao, ano, curso, especificas;
var _gabarito, _especificas, _categorias;

var version = Math.floor(Math.random() * 1000 + 1);

$(function () {
	$.getJSON('./assets/js/gabarito.json?v=' + version, function (json) {
		_gabarito = json['gabarito'];
		_especificas = json['especificas'];
		_categorias = json['categorias'];

		ativarCursos();

		if (getUrlParameter('calcular') == 'true') {
			// Pega os valores das variaveis
			serie = getUrlParameter('serie');
			linguaEstrangeira = getUrlParameter('lingua-estrangeira');
			redacao = Number(getUrlParameter('redacao'));
			ano = getUrlParameter('ano');
			if (serie == '3ano') {
				curso = getUrlParameter('curso');
				especificas = _especificas[curso];
			}

			setInputs();
			setVariables();

			calculaNota();
		}
		showTooltips();

	});
});


// Se alterar a série para 3o ano ativa a opcao de cursos
function ativarCursos() {
	$('.form-serie').on('change', function () {
		if ($(this).val() == '3ano')
			$('.form-curso').removeAttr('disabled');
		else
			$('.form-curso').attr('disabled', 'true');
	});
}

// Seta as tags INPUT com os valores que estão no GET
function setInputs() {
	for (var i = 1; i <= 40; i++)
		$('input.questao[name="qst-' + i + '"]').val(getUrlParameter('qst-' + i));

	$('option[value="' + serie + '"]').attr('selected', 'selected').siblings().removeAttr('selected');
	if (serie == '3ano') {
		$('.form-curso').removeAttr('disabled');
		$('option[value="' + curso + '"]').attr('selected', 'selected').siblings().removeAttr('selected');
	}
	$('option[value="' + linguaEstrangeira + '"]').attr('selected', 'selected').siblings().removeAttr('selected');
	$('option[value="' + ano + '"]').attr('selected', 'selected').siblings().removeAttr('selected');

	$('input[name="redacao"]').val(redacao);
}

// Seta as variaveis questoesMarcadas e questoesCorretas
function setVariables() {
	for (var i = 1; i <= 40; i++)
		questoesMarcadas.push(parseInt(getUrlParameter('qst-' + i), 10));

	questoesCorretas = questoesCorretas.concat(_gabarito[ano][serie]['conhecimentos-gerais']);
	questoesCorretas = questoesCorretas.concat(_gabarito[ano][serie]['portugues-literatura']);
	questoesCorretas = questoesCorretas.concat(_gabarito[ano][serie][linguaEstrangeira]);
	if (serie == '3ano') {
		questoesCorretas = questoesCorretas.concat(_gabarito[ano][serie][especificas[0]]);
		questoesCorretas = questoesCorretas.concat(_gabarito[ano][serie][especificas[1]]);
	}
}

// Calcula as notas e mostra na tabela
function calculaNota() {
	var notas = [],
		notaObjetivas = 0,
		notaTotal = 0,
		numQuestoesCertas = 0,
		htmlTable = '',
		categorias = [];

	// Soma todas as notas na var notaObjetivas e adiciona as notas na array notas

	for (var i = 0; i < questoesMarcadas.length; i++) {
		var notaAtual = getNota(questoesMarcadas[i], questoesCorretas[i]);
		notas.push(notaAtual);
		notaObjetivas += notaAtual;
		if (notaAtual > 0)
			numQuestoesCertas++;
	}

	notaTotal = notaObjetivas + redacao;


	// Gera a array de categorias

	var numerosCategorias = _categorias[ano][serie];

	categorias = [
		['Conhecimentos Gerais', numerosCategorias['conhecimentos-gerais'][0], numerosCategorias['conhecimentos-gerais'][1]],
		['Português e Literatura', numerosCategorias['portugues-literatura'][0], numerosCategorias['portugues-literatura'][1]],
		['Língua Estrangeira - ' + pretty(linguaEstrangeira), numerosCategorias['lingua-estrangeira'][0], numerosCategorias['lingua-estrangeira'][1]]
	];

	if (serie == '3ano') {
		categorias[3] = ['Específica 1 - ' + pretty(especificas[0]), numerosCategorias['especifica-1'][0], numerosCategorias['especifica-1'][1]];
		categorias[4] = ['Específica 2 - ' + pretty(especificas[1]), numerosCategorias['especifica-2'][0], numerosCategorias['especifica-2'][1]];
	}

	// Coloca 'Reprovado' na frente se zerou a categoria ou a nota se nao zerou

	for (var i = 0; i < categorias.length; i++) {
		var notaCategoria = 0,
			notaMax = (categorias[i][2] - categorias[i][1] + 1) * 6;

		for (var j = categorias[i][1]; j <= categorias[i][2]; j++)
			notaCategoria += notas[j];

		notaCategoria = notaCategoria.toString().replace('.', ',');

		if (notaCategoria == 0)
			categorias[i][0] += '<span class=\'reprovado\'>Reprovou</span>';
		else if (notaCategoria == notaMax)
			categorias[i][0] += '<span class=\'gabaritado\'>Gabaritou (Total: ' + notaCategoria + ')</span>';
		else
			categorias[i][0] += '<span class=\'nota\'>Total: ' + notaCategoria + '</span>';

	}

	// INICIO Criação tabela notas
	htmlTable += '<tbody>';

	var rowNumber;

	// Passa por cada categoria em categorias
	for (var i = 0; i < categorias.length; i++) {

		htmlTable += '<tr><th colspan="5" scope="colgroup">' + categorias[i][0] + '</th></tr>';
		rowNumber = 0;

		// Passa por todas as notas em cada categorias

		for (var j = categorias[i][1]; j <= categorias[i][2]; j++) {

			// Se for o primeiro da linha, adiciona <tr>
			if (j == categorias[i][1] || j == categorias[i][1] + (5 * rowNumber)) {
				htmlTable += '<tr>';
				rowNumber++;
			}

			// Se for uma questão anulada
			if (questoesCorretas[j] == -1)
				htmlTable += '<td class="questao-anulada"><span>' + n(j + 1) + '</span> </td>';
			else // Se nao for uma questão anulada
				htmlTable += '<td><span>' + n(j + 1) + '</span> ' + nota(notas[j]) + '</td>';

			// Se for o último da linha, adicina o </tr>
			if (j == categorias[i][2] || j == (categorias[i][1] + 5 * rowNumber) - 1)
				htmlTable += '</tr>';
		}
	}
	htmlTable += '</tbody>';

	htmlTable += '<tfoot>';
	htmlTable += '<tr><td colspan="5"></td></tr>';

	htmlTable += '<tr>';
	if (questoesCorretas.indexOf(-1) != -1)
		htmlTable += '<td colspan="2" rowspan="2" class="anulada-aviso">*Questões anuladas valem 6 pontos.</td>';
	else
		htmlTable += '<td colspan="2" rowspan="2"></td>';
	htmlTable += '<th colspan="2">Não Zeradas</th>';
	htmlTable += '<td>' + numQuestoesCertas + '</td>';
	htmlTable += '</tr>';

	htmlTable += '<tr>';
	htmlTable += '<th colspan="2">Zeradas</th>';
	htmlTable += '<td>' + (40 - numQuestoesCertas) + '</td>';
	htmlTable += '</tr>';

	htmlTable += '</tfoot>';

	$('.tabela-questoes').html(htmlTable);
	// FIM Criação tabela notas

	$('.notas-resumo .nota-total span').text(nota(notaTotal) + ' / 360');
	$('.notas-resumo .nota-objetivas span').text(nota(notaObjetivas) + ' / 240');
	$('.notas-resumo .nota-redacao span').text(nota(redacao) + ' / 120');

	$('section.notas').css('display', 'block');
}

function showTooltips() {
	$('.tooltip-wrap').children().first().on('focus', function () {
		$('.tooltip-wrap .tooltip').addClass('show');
	});
	$('.tooltip-wrap').children().first().on('blur', function () {
		$('.tooltip-wrap .tooltip').removeClass('show');
	});
}