package br.com.caelum.leilao.servico;

import java.util.Calendar;
import java.util.List;

import br.com.caelum.leilao.dominio.Leilao;
import br.com.caelum.leilao.dominio.Pagamento;
import br.com.caelum.leilao.infra.dao.LeilaoDao;
import br.com.caelum.leilao.infra.dao.RepositorioDePagamentos;
import br.com.caelum.leilao.infra.relogio.Relogio;
import br.com.caelum.leilao.infra.relogio.RelogioDoSistema;

public class GeradorDePagamento {

	private LeilaoDao leilaoDao;
	private Avaliador avaliador;
	private RepositorioDePagamentos repositorioDePagamentos;
	private Relogio relogio;
	
	public GeradorDePagamento(LeilaoDao leilaoDao, Avaliador avaliador,
			RepositorioDePagamentos repositorioDePagamentos){
		this(leilaoDao, avaliador, repositorioDePagamentos, new RelogioDoSistema());
	}
	
	public GeradorDePagamento(LeilaoDao leilaoDao, Avaliador avaliador,
			RepositorioDePagamentos repositorioDePagamentos, Relogio relogio){
		this.leilaoDao = leilaoDao;
		this.avaliador = avaliador;
		this.repositorioDePagamentos = repositorioDePagamentos;
		this.relogio = relogio;
	}
	
	public void gera() {
		List<Leilao> leiloesEncerrados = this.leilaoDao.encerrados();
		
		for (Leilao leilao : leiloesEncerrados) {
			this.avaliador.avalia(leilao);
			
			Pagamento novoPagamento = new Pagamento(avaliador.getMaiorLance(), this.primeiroDiaUtil());
			this.repositorioDePagamentos.salva(novoPagamento);
		}
	}
	
	private Calendar primeiroDiaUtil() {
		Calendar data = this.relogio.hoje();
		int diaDaSemana = data.get(Calendar.DAY_OF_WEEK);
		
		if (diaDaSemana == Calendar.SATURDAY) 
			data.add(Calendar.DAY_OF_MONTH, 2);
		
		else if (diaDaSemana == Calendar.SUNDAY) 
			data.add(Calendar.DAY_OF_MONTH, 1);
		
		return data;
	}
	
}
