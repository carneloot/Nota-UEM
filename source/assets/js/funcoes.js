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
