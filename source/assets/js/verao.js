var questoesCorretas = [],
	questoesMarcadas = [],
	linguaEstrangeira, redacao, ano, curso, especificas;
var _gabarito, _especificas, _categorias, params;

var version = Math.floor(Math.random() * 1000 + 1);
const NUM_QUESTOES = 60;

$(function () {
	$.getJSON('./../assets/js/gabVer.json?v=' + version, function (json) {
		_gabarito = json['gabarito'];
		_especificas = json['especificas'];
		_categorias = json['categorias'];

		params = getParams();

		if (params['calcular'] == 'true') {
			// Pega os valores das variaveis
			linguaEstrangeira = params['lingua-estrangeira'];
			redacao = Number(params['redacao']);
			ano = params['ano'];
			curso = params['curso'];
			especificas = _especificas[curso];

			setInputs();
			setVariables();

			calculaNota();
		}
		showTooltips();

	});
});

// Seta as tags INPUT com os valores que estão no GET
function setInputs() {
	for (var i = 1; i <= NUM_QUESTOES; i++)
		$('input.questao[name="qst-' + i + '"]').val(params['qst-' + i]);

	$('option[value="' + curso + '"]').attr('selected', 'selected').siblings().removeAttr('selected');
	$('option[value="' + linguaEstrangeira + '"]').attr('selected', 'selected').siblings().removeAttr('selected');
	$('option[value="' + ano + '"]').attr('selected', 'selected').siblings().removeAttr('selected');

	$('input[name="redacao"]').val(redacao);
}

// Seta as variaveis questoesMarcadas e questoesCorretas
function setVariables() {
	for (var i = 1; i <= NUM_QUESTOES; i++)
		questoesMarcadas.push(parseInt(params['qst-' + i], 10));

	questoesCorretas = questoesCorretas.concat(_gabarito[ano]['conhecimentos-gerais']);
	questoesCorretas = questoesCorretas.concat(_gabarito[ano]['portugues-literatura']);
	questoesCorretas = questoesCorretas.concat(_gabarito[ano][linguaEstrangeira]);
	questoesCorretas = questoesCorretas.concat(_gabarito[ano][especificas[0]]);
	questoesCorretas = questoesCorretas.concat(_gabarito[ano][especificas[1]]);
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

	var numerosCategorias = _categorias[ano];
	categorias = [
		['Conhecimentos Gerais', numerosCategorias['conhecimentos-gerais'][0], numerosCategorias['conhecimentos-gerais'][1]],
		['Português e Literatura', numerosCategorias['portugues-literatura'][0], numerosCategorias['portugues-literatura'][1]],
		['Língua Estrangeira - ' + pretty(linguaEstrangeira), numerosCategorias['lingua-estrangeira'][0], numerosCategorias['lingua-estrangeira'][1]],
		['Específica 1 - ' + pretty(especificas[0]), numerosCategorias['especifica-1'][0], numerosCategorias['especifica-1'][1]],
		['Específica 2 - ' + pretty(especificas[1]), numerosCategorias['especifica-2'][0], numerosCategorias['especifica-2'][1]]
	];

	// Calcula a nota da categoria

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
	htmlTable += '<td>' + (NUM_QUESTOES - numQuestoesCertas) + '</td>';
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