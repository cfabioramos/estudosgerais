package br.com.caelum.leilao.servico;

import java.util.Calendar;
import java.util.List;

import br.com.caelum.leilao.dominio.Leilao;
import br.com.caelum.leilao.dominio.Pagamento;
import br.com.caelum.leilao.infra.dao.LeilaoDao;
import br.com.caelum.leilao.infra.dao.RepositorioDePagamentos;

public class GeradorDePagamento {

	private LeilaoDao leilaoDao;
	private Avaliador avaliador;
	private RepositorioDePagamentos repositorioDePagamentos;
	
	public GeradorDePagamento(LeilaoDao leilaoDao, Avaliador avaliador,
			RepositorioDePagamentos repositorioDePagamentos){
		this.leilaoDao = leilaoDao;
		this.avaliador = avaliador;
		this.repositorioDePagamentos = repositorioDePagamentos;
	}
	
	public void gera() {
		List<Leilao> leiloesEncerrados = this.leilaoDao.encerrados();
		
		for (Leilao leilao : leiloesEncerrados) {
			this.avaliador.avalia(leilao);
			
			Pagamento novoPagamento = new Pagamento(avaliador.getMaiorLance(), Calendar.getInstance());
			this.repositorioDePagamentos.salva(novoPagamento);
		}
	}
	
}
