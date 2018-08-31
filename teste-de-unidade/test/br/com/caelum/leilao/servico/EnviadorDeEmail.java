package br.com.caelum.leilao.servico;

import br.com.caelum.leilao.dominio.Leilao;

public interface EnviadorDeEmail {

	public void envia(Leilao leilao);
	
}
