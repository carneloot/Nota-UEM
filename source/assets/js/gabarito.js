const _gabarito = {
	'2016': {
		'1ano': {
			'conhecimentos-gerais': [05, 05, 11, 23, 22, 15, 11, 23, 14, 13, 06, 27, 29, 13, 19, 07, 11, 12, 26, 06, 27, 20, 17, 12, 10],
			'portugues-literatura': [11, 05, 20, 26, 23, 27, 30, 18, 11, 11],
			'espanhol': [21, 21, 06, 07, 25],
			'frances': [03, 26, 29, 13, 04],
			'ingles': [28, 17, 26, 21, 28]
		},

		'2ano': {
			'conhecimentos-gerais': [29, 21, 20, 27, 14, 18, 05, 26, 08, 14, 05, 30, 28, 23, 05, 06, 20, 25, 08, 02, 21, 11, 28, 29, 16],
			'portugues-literatura': [24, 04, 06, 29, 18, 20, 10, 21, 18, 16],
			'espanhol': [23, 10, 17, 06, 10],
			'frances': [13, 18, 22, 14, 25],
			'ingles': [09, 14, 17, 11, 22]
		},

		'3ano': {
			'conhecimentos-gerais': [07, 19, 13, 18, 04, 14, 29, 16, 23, 10, 13, 03, 02, 14, 23, 01, 25, 18, 13],
			'portugues-literatura': [06, 10, 23, 05, 17, 18, 12],
			'espanhol': [18, 09, 03, 12],
			'frances': [17, 20, 30, 14],
			'ingles': [03, 09, 24, 22],
			'arte': [25, 25, 30, 05, 11],
			'biologia': [26, 17, 03, 15, 09],
			'educacao-fisica': [13, 14, 07, 22, 11],
			'filosofia': [14, 25, 23, 26, 15],
			'fisica': [17, 10, 25, 23, 28],
			'geografia': [14, 23, 27, 07, 30],
			'historia': [23, 10, 25, 04, 10],
			'matematica': [18, 28, 12, 29, 20],
			'quimica': [17, 28, 11, 20, 13],
			'sociologia': [15, 21, 13, 17, 19]
		}
	}
};

const _categorias = {
	'2016': {
		'3ano': {
			'conhecimentos-gerais': [0, 18],
			'portugues-literatura': [19, 25],
			'lingua-estrangeira': [26, 29],
			'especifica-1': [30, 34],
			'especifica-2': [35, 39],
		},
		'2ano': {
			'conhecimentos-gerais': [0, 24],
			'portugues-literatura': [25, 34],
			'lingua-estrangeira': [35, 39]
		},
		'1ano': {
			'conhecimentos-gerais': [0, 24],
			'portugues-literatura': [25, 34],
			'lingua-estrangeira': [35, 39]
		}
	}
}

const _especificas = {
	'administracao': ['historia', 'matematica'],
	'agronomia': ['biologia', 'quimica'],
	'arquitetura-e-urbanismo': ['arte', 'matematica'],
	'artes-cenicas': ['arte', 'historia'],
	'artes-visuais': ['arte', 'historia'],
	'biomedicina': ['biologia', 'quimica'],
	'bioquimica': ['biologia', 'quimica'],
	'ciencia-da-computacao': ['fisica', 'matematica'],
	'ciencias-biologicas': ['biologia', 'quimica'],
	'ciencias-contabeis': ['historia', 'matematica'],
	'ciencias-econômicas': ['historia', 'matematica'],
	'ciencias-sociais': ['historia', 'sociologia'],
	'comunicacao-e-multimeios': ['arte', 'sociologia'],
	'design': ['fisica', 'historia'],
	'direito': ['historia', 'sociologia'],
	'educacao-fisica': ['educacao-fisica', 'historia'],
	'enfermagem': ['biologia', 'sociologia'],
	'engenharia-agricola': ['fisica', 'matematica'],
	'engenharia-ambiental': ['fisica', 'matematica'],
	'engenharia-civil': ['fisica', 'matematica'],
	'engenharia-de-alimentos': ['matematica', 'quimica'],
	'engenharia-de-producao': ['fisica', 'matematica'],
	'engenharia-elétrica': ['fisica', 'matematica'],
	'engenharia-mecânica': ['fisica', 'matematica'],
	'engenharia-quimica': ['matematica', 'quimica'],
	'engenharia-textil': ['matematica', 'quimica'],
	'estatistica': ['fisica', 'matematica'],
	'farmacia': ['biologia', 'quimica'],
	'filosofia': ['filosofia', 'historia'],
	'fisica': ['fisica', 'matematica'],
	'geografia': ['geografia', 'matematica'],
	'historia': ['geografia', 'historia'],
	'informatica': ['fisica', 'matematica'],
	'letras': ['filosofia', 'historia'],
	'licenciatura-plena-em-ciencias': ['biologia', 'matematica'],
	'matematica': ['fisica', 'matematica'],
	'medicina': ['biologia', 'quimica'],
	'medicina veterinaria': ['biologia', 'quimica'],
	'moda': ['historia', 'matematica'],
	'música': ['arte', 'historia'],
	'odontologia': ['biologia', 'quimica'],
	'pedagogia': ['geografia', 'historia'],
	'psicologia': ['biologia', 'historia'],
	'quimica': ['matematica', 'quimica'],
	'secretariado-executivo-trilingue': ['historia', 'sociologia'],
	'servico-social': ['historia', 'sociologia'],
	'tecnologia-em-alimentos': ['fisica', 'quimica'],
	'tecnologia-em-biotecnologia': ['biologia', 'quimica'],
	'tecnologia-em-construcao-civil': ['fisica', 'matematica'],
	'tecnologia-em-meio-ambiente': ['matematica', 'quimica'],
	'zootecnia': ['biologia', 'matematica']
}
