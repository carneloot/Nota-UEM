var questoesCorretas = [],
	questoesMarcadas = [],
	serie, linguaEstrangeira, redacao, ano, curso, especificas;

$(function() {
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
})


// Se alterar a série para 3o ano ativa a opcao de cursos
function ativarCursos() {
	$('.form-serie').on("change", function() {
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
		notaObjetivas = 0;
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

		if (notaCategoria == 0)
			categorias[i][0] += "<span class='reprovado'>Reprovou</span>";
		else if (notaCategoria == notaMax)
			categorias[i][0] += "<span class='gabaritado'>Gabaritou (" + nota(notaCategoria) + ")</span>";
		else
			categorias[i][0] += "<span class='nota'>Total: " + nota(notaCategoria) + "</span>";

	}

	// INICIO Criação tabela notas
	htmlTable += '<tbody>';

	var rowNumber;

	// Passa por cada categoria em categorias
	for (var i = 0; i < categorias.length; i++) {

		htmlTable += '<tr><th colspan="5" scope="colgroup">' + categorias[i][0] + '</th></tr>'
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

	$('.tabela-questoes').html(htmlTable);
	// FIM Criação tabela notas

	$('.notas-resumo .nota-total span').text(nota(notaTotal) + ' / 360')
	$('.notas-resumo .nota-objetivas span').text(nota(notaObjetivas) + ' / 240')
	$('.notas-resumo .nota-redacao span').text(nota(redacao) + ' / 120')

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
