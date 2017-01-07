var questoesCorretas = [],
		questoesMarcadas = [],
		serie, linguaEstrangeira, redacao, ano, curso, especificas;

$(function() {
	ativarCursos();
	if (getUrlParameter('calcular') == 'true') {
		// Pega os valores das variaveis
		serie = getUrlParameter('serie');
		linguaEstrangeira = getUrlParameter('lingua-estrangeira');
		redacao = getUrlParameter('redacao');
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
})


// Se alterar a série para 3o ano ativa a opcao de cursos
function ativarCursos() {
	$('.form-serie').on("change", function() {
		if ( $(this).val() == '3ano' )
			$('.form-curso').removeAttr('disabled');
		else
			$('.form-curso').attr('disabled','true');
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
	for (var i = 1 ; i <= 40 ; i++)
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
			notaObjetivas = 0;
			notaTotal = 0,
			numQuestoesCertas = 0,
			htmlTable = '',
			categorias = [];

	// Soma todas as notas na var notaTotal e adiciona as notas na array notas
	for (var i = 0; i < questoesMarcadas.length; i++) {
		var notaAtual = getNota(questoesMarcadas[i], questoesCorretas[i]);
		notas.push(notaAtual);
		notaObjetivas += notaAtual;
		if (notaAtual > 0)
			numQuestoesCertas++;
	}

	notaTotal = Number(notaObjetivas) + Number(redacao);

	switch (serie) {
		case '1ano':
		case '2ano':
			categorias = [
				['Conhecimentos Gerais', 0, 24],
				['Português e Literatura', 25, 34],
				['Língua Estrangeira (' + pretty(linguaEstrangeira) + ')', 35, 39]
			]
			break;

		case '3ano':
			categorias = [
				['Conhecimentos Gerais', 0, 18],
				['Português e Literatura', 19, 25],
				['Língua Estrangeira (' + pretty(linguaEstrangeira) + ')', 26, 29],
				['Específica 1 (' + pretty(especificas[0]) + ')', 30, 34],
				['Específica 2 (' + pretty(especificas[1]) + ')', 35, 39]
			]
			break;
	}

	// Coloca 'Reprovado' na frente se zerou a categoria

	for (var i = 0; i < categorias.length; i++) {
		var notaCategoria = 0;

		for (var j = categorias[i][1]; j <= categorias[i][2]; j++)
			notaCategoria += notas[j];

		if (notaCategoria == 0)
			categorias[i][0] += " <span>Reprovado</span>";

	}

	// INICIO Criação tabela notas
	htmlTable += '<table class="tabela-questoes">';

	htmlTable += '<tbody>';

	var rowNumber;

	// Passa por cada categoria em categorias
	for (var i = 0; i < categorias.length; i++) {

		htmlTable += '<tr><th colspan="5" scope="colgroup">' + categorias[i][0] + '</th></tr>'
		rowNumber = 0;

		for (var j = categorias[i][1]; j <= categorias[i][2]; j++) {
			if (j == categorias[i][1] || j == categorias[i][1] + (5 * rowNumber)) {
				htmlTable += '<tr>';
				rowNumber++;
			}
			if (questoesCorretas[j] == -1)
				htmlTable += '<td class="questao-anulada"><span>' + n(j + 1) + '</span> </td>';
			else
				htmlTable += '<td><span>' + n(j + 1) + '</span> ' + nota(notas[j]) + '</td>';
			if (j == categorias[i][2] || j == (categorias[i][1] + 5 * rowNumber) - 1) {
				htmlTable += '</tr>';
			}
		}
	}
	htmlTable += '</tbody>';

	htmlTable += '<tfoot>'
	htmlTable += '<tr><td colspan="5"></td></tr>'

	htmlTable += '<tr>'
	if (questoesCorretas.indexOf(-1) != -1)
		htmlTable += '<td colspan="2" rowspan="2" class="anulada-aviso">*Questões anuladas valem 6 pontos.</td>'
	else
		htmlTable += '<td colspan="2" rowspan="2"></td>'
	htmlTable += '<th colspan="2">Não Zeradas</th>'
	htmlTable += '<td>' + numQuestoesCertas + '</td>'
	htmlTable += '</tr>'

	htmlTable += '<tr>'
	htmlTable += '<th colspan="2">Zeradas</th>'
	htmlTable += '<td>' + (40 - numQuestoesCertas) + '</td>'
	htmlTable += '</tr>'

	htmlTable += '</tfoot>'

	htmlTable += '</table>';

	$('.tabela-questoes').html(htmlTable);
	// FIM Criação tabela notas

	$('.notas-resumo .nota-total span').text( nota(notaTotal) + ' / 360')
	$('.notas-resumo .nota-objetivas span').text( nota(notaObjetivas) + ' / 240')
	$('.notas-resumo .nota-redacao span').text( nota(redacao) + ' / 120')

	$('section.notas').css('display', 'block');
}

function showTooltips() {
	$('.tooltip-wrap').children().first().on('focus', function() {
		$('.tooltip-wrap .tooltip').addClass('show');
	})
	$('.tooltip-wrap').children().first().on('blur', function() {
		$('.tooltip-wrap .tooltip').removeClass('show');
	})
}
