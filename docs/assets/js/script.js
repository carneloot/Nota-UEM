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
};

// Se o numero for menor que 10 coloca um 0 na frente
function n(n) {
	return n > 9 ? "" + n : "0" + n;
}

// Retorna o numero formatado com virgulas no lugar de pontos
function nota(num) {
	if (num === parseInt(num, 10))
		return num.toString() + ",0"
	else
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
		'arte' : 'Arte',
		'biologia' : 'Biologia',
		'educacao-fisica' : 'Educação Física',
		'filosofia' : 'Filosofia',
		'fisica' : 'Física',
		'geografia' : 'Geografia',
		'historia' : 'História',
		'matematica' : 'Matemática',
		'quimica' : 'Química',
		'sociologia' : 'Sociologia',
		'ingles' : 'Inglês',
		'espanhol' : 'Espanhol',
		'frances' : 'Francês'
	};
	return nomes[especifica];
}

const _gabarito = {
	'2016' : {
		'1ano' : {
			'conhecimentos-gerais' : [05,05,11,23,22,15,11,23,14,13,06,27,29,13,19,07,11,12,26,06,27,20,17,12,10],
			'portugues-literatura' : [11,05,20,26,23,27,30,18,11,11],
			'espanhol' : [21,21,06,07,25],
			'frances' : [03,26,29,13,04],
			'ingles' : [28,17,26,21,28]
		},

		'2ano' : {
			'conhecimentos-gerais' : [29,21,20,27,14,18,05,26,08,14,05,30,28,23,05,06,20,25,08,02,21,11,28,29,16],
			'portugues-literatura' : [24,04,06,29,18,20,10,21,18,16],
			'espanhol' : [23,10,17,06,10],
			'frances' : [13,18,22,14,25],
			'ingles' : [09,14,17,11,22]
		},

		'3ano' : {
			'conhecimentos-gerais' : [07,19,13,18,04,14,29,16,23,10,13,03,02,14,23,01,25,18,13],
			'portugues-literatura' : [06,10,23,05,17,18,12],
			'espanhol' : [18,09,03,12],
			'frances' : [17,20,30,14],
			'ingles' : [03,09,24,22],
			'arte' : [25,25,30,05,11],
			'biologia' : [26,17,03,15,09],
			'educacao-fisica' : [13,14,07,22,11],
			'filosofia' : [14,25,23,26,15],
			'fisica' : [17,10,25,23,28],
			'geografia' : [14,23,27,07,30],
			'historia' : [23,10,25,04,10],
			'matematica' : [18,28,12,29,20],
			'quimica' : [17,28,11,20,13],
			'sociologia' : [15,21,13,17,19]
		}
	}
};

const _categorias = {
	'2016' : {
		'3ano' : {
			'conhecimentos-gerais' : [0, 18],
			'portugues-literatura' : [19, 25],
			'lingua-estrangeira' : [26, 29],
			'especifica-1' : [30, 34],
			'especifica-2' : [35, 39],
		},
		'2ano' : {
			'conhecimentos-gerais' : [0, 24],
			'portugues-literatura' : [25, 34],
			'lingua-estrangeira' : [35, 39]
		},
		'1ano' : {
			'conhecimentos-gerais' : [0, 24],
			'portugues-literatura' : [25, 34],
			'lingua-estrangeira' : [35, 39]
		}
	}
}

const _especificas = {
	'administracao' : ['historia', 'matematica'],
	'agronomia' : ['biologia', 'quimica'],
	'arquitetura-e-urbanismo' : ['arte', 'matematica'],
	'artes-cenicas' : ['arte', 'historia'],
	'artes-visuais' : ['arte', 'historia'],
	'biomedicina' : ['biologia', 'quimica'],
	'bioquimica' : ['biologia', 'quimica'],
	'ciencia-da-computacao' : ['fisica', 'matematica'],
	'ciencias-biologicas' : ['biologia', 'quimica'],
	'ciencias-contabeis' : ['historia', 'matematica'],
	'ciencias-econômicas' : ['historia', 'matematica'],
	'ciencias-sociais' : ['historia', 'sociologia'],
	'comunicacao-e-multimeios' : ['arte', 'sociologia'],
	'design' : ['fisica', 'historia'],
	'direito' : ['historia', 'sociologia'],
	'educacao-fisica' : ['educacao-fisica', 'historia'],
	'enfermagem' : ['biologia', 'sociologia'],
	'engenharia-agricola' : ['fisica', 'matematica'],
	'engenharia-ambiental' : ['fisica', 'matematica'],
	'engenharia-civil' : ['fisica', 'matematica'],
	'engenharia-de-alimentos' : ['matematica', 'quimica'],
	'engenharia-de-producao' : ['fisica', 'matematica'],
	'engenharia-elétrica' : ['fisica', 'matematica'],
	'engenharia-mecânica' : ['fisica', 'matematica'],
	'engenharia-quimica' : ['matematica', 'quimica'],
	'engenharia-textil' : ['matematica', 'quimica'],
	'estatistica' : ['fisica', 'matematica'],
	'farmacia' : ['biologia', 'quimica'],
	'filosofia' : ['filosofia', 'historia'],
	'fisica' : ['fisica', 'matematica'],
	'geografia' : ['geografia', 'matematica'],
	'historia' : ['geografia', 'historia'],
	'informatica' : ['fisica', 'matematica'],
	'letras' : ['filosofia', 'historia'],
	'licenciatura-plena-em-ciencias' : ['biologia', 'matematica'],
	'matematica' : ['fisica', 'matematica'],
	'medicina' : ['biologia', 'quimica'],
	'medicina veterinaria' : ['biologia', 'quimica'],
	'moda' : ['historia', 'matematica'],
	'música' : ['arte', 'historia'],
	'odontologia' : ['biologia', 'quimica'],
	'pedagogia' : ['geografia', 'historia'],
	'psicologia' : ['biologia', 'historia'],
	'quimica' : ['matematica', 'quimica'],
	'secretariado-executivo-trilingue' : ['historia', 'sociologia'],
	'servico-social' : ['historia', 'sociologia'],
	'tecnologia-em-alimentos' : ['fisica', 'quimica'],
	'tecnologia-em-biotecnologia' : ['biologia', 'quimica'],
	'tecnologia-em-construcao-civil' : ['fisica', 'matematica'],
	'tecnologia-em-meio-ambiente' : ['matematica', 'quimica'],
	'zootecnia' : ['biologia', 'matematica']
}

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

	// Coloca 'Reprovado' na frente se zerou a categoria

	for (var i = 0; i < categorias.length; i++) {
		var notaCategoria = 0;

		for (var j = categorias[i][1]; j <= categorias[i][2]; j++)
			notaCategoria += notas[j];

		if (notaCategoria == 0)
			categorias[i][0] += "<span>Reprovado</span>";

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
