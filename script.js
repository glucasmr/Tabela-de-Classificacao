console.clear();

var listaJogadores = [];
var input = document.getElementById("nome");
var elementoResposta = document.getElementById("resposta");

input.addEventListener("keyup", function (event) {
	if (event.key === "Enter") {
		document.getElementById("adicionarJogador").click();
	}
});

function adicionarJogador(nome) {
	elementoResposta.innerHTML = "";
	for (var i = 0; i < listaJogadores.length; i++) {
		if (nome == listaJogadores[i].nome) {
			elementoResposta.innerHTML = nome + " já foi adicionado a lista!";
			return;
		}
	}
	var jogador = {
		nome: nome,
		partidas: 0,
		vitorias: 0,
		empates: 0,
		derrotas: 0,
		pontos: 0
	};
	listaJogadores.push(jogador);
	exibeJogadores(listaJogadores);
	input.value = "";
}

function zerarPartidas() {
	for (var j = 0; j < listaJogadores.length; j++) {
		listaJogadores[j].vitorias = 0;
		listaJogadores[j].partidas = 0;
		listaJogadores[j].empates = 0;
		listaJogadores[j].derrotas = 0;
		listaJogadores[j].pontos = 0;
	}
	exibeJogadores(listaJogadores);
}

function zerarTabela() {
	listaJogadores = [];
	exibeJogadores(listaJogadores);
}

function adicionarVitoria(i) {
	var jogador = listaJogadores[i];
	jogador.vitorias++;
	jogador.partidas++;
	jogador.pontos = calcPontos(jogador);
	for (var j = 0; j < listaJogadores.length; j++) {
		if (j != i) {
			listaJogadores[j].partidas++;
			listaJogadores[j].derrotas++;
			listaJogadores[j].pontos = calcPontos(listaJogadores[j]);
		}
	}
	exibeJogadores(listaJogadores);
}

function adicionarEmpate(i) {
	for (var j = 0; j < listaJogadores.length; j++) {
		listaJogadores[j].empates++;
		listaJogadores[j].partidas++;
		listaJogadores[j].pontos = calcPontos(listaJogadores[j]);
	}
	exibeJogadores(listaJogadores);
}

function exibeJogadores(listaJogadores) {
	var melhorJogador = ["0", "0"]; //indice,pontos
	for (var j = 0; j < listaJogadores.length; j++) {
		if (listaJogadores[j].pontos > melhorJogador[1]) {
			melhorJogador[0] = j;
			melhorJogador[1] = listaJogadores[j].pontos;
		}
	}

	var elemento = "";
	for (var i = 0; i < listaJogadores.length; i++) {
		if (i == melhorJogador[0] && melhorJogador[1] != 0) {
			elemento +=
				"<tr><td style='color:yellow;'>" + listaJogadores[i].nome + "</td>"; //
		} else {
			elemento += "<tr><td>" + listaJogadores[i].nome + "</td>";
		}
		elemento += "<td>" + listaJogadores[i].partidas + "</td>";
		elemento += "<td>" + listaJogadores[i].vitorias + "</td>";
		elemento += "<td>" + listaJogadores[i].empates + "</td>";
		elemento += "<td>" + listaJogadores[i].derrotas + "</td>";
		elemento += "<td>" + listaJogadores[i].pontos + "</td>";
		elemento +=
			"<td><button onClick='adicionarVitoria(" + i + ")'>Vitória</button></td>";
		elemento +=
			"<td><button onClick='adicionarEmpate(" + i + ")'>Empate</button></td>";
		elemento += "</tr>";
	}
	var tabelaJogadores = document.getElementById("tabelaJogadores");
	tabelaJogadores.innerHTML = elemento;
}

function calcPontos(jogador) {
	var pontos = jogador.vitorias * 3 + jogador.empates;
	return pontos;
}
