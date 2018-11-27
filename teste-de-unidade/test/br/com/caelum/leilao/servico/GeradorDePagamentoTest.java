package br.com.caelum.leilao.servico;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.Calendar;

import org.junit.Test;
import org.mockito.ArgumentCaptor;

import br.com.caelum.leilao.builder.CriadorDeLeilao;
import br.com.caelum.leilao.dominio.Leilao;
import br.com.caelum.leilao.dominio.Pagamento;
import br.com.caelum.leilao.dominio.Usuario;
import br.com.caelum.leilao.infra.dao.LeilaoDao;
import br.com.caelum.leilao.infra.dao.RepositorioDePagamentos;
import br.com.caelum.leilao.infra.relogio.Relogio;


public class GeradorDePagamentoTest {

	@Test
	public void deveGerarPagamentoParaUmLeilaoEncerrado() {
		LeilaoDao leilaoDao = mock(LeilaoDao.class);
		RepositorioDePagamentos repositorioDePagamentos = mock(RepositorioDePagamentos.class);
//		Avaliador avaliador = mock(Avaliador.class);
		
		Leilao leilao = new CriadorDeLeilao().para("Playstation")
				.lance(new Usuario("Zé"), 2000.0)
				.lance(new Usuario("Jão"), 2500.0)
				.constroi();
		
		when(leilaoDao.encerrados()).thenReturn(Arrays.asList(leilao));
//		when(avaliador.getMaiorLance()).thenReturn(2500.0);
		
		GeradorDePagamento geradorDePagamento = new GeradorDePagamento(
				leilaoDao, new Avaliador(), repositorioDePagamentos);
		
		geradorDePagamento.gera();
		
		// Para capturar o argumento que é passado para o método salva na geracao do pagamento;
		ArgumentCaptor<Pagamento> argumento = ArgumentCaptor.forClass(Pagamento.class);
		verify(repositorioDePagamentos).salva(argumento.capture());
		
		Pagamento pagamentoGerado = argumento.getValue();
		
		assertEquals(2500.0, pagamentoGerado.getValor(), 0.00001);
		
	}
	
	@Test
	public void deveEmpurrarParaOProximoDiaUtil() {
		LeilaoDao leilaoDao = mock(LeilaoDao.class);
		RepositorioDePagamentos repositorioDePagamentos = mock(RepositorioDePagamentos.class);
		Relogio relogio = mock(Relogio.class);
		
		Leilao leilao = new CriadorDeLeilao()
				.para("Playstation")
				.lance(new Usuario("Zé"), 2000.0)
				.lance(new Usuario("Jão"), 2500.0)
				.constroi();
		
		when(leilaoDao.encerrados()).thenReturn(Arrays.asList(leilao));
		
		Calendar sabado = Calendar.getInstance();
		sabado.set(2012, Calendar.APRIL, 7);
		
		when(relogio.hoje()).thenReturn(sabado);
		
		GeradorDePagamento geradorDePagamento = new GeradorDePagamento(
				leilaoDao, new Avaliador(), repositorioDePagamentos, relogio);
		geradorDePagamento.gera();
		
		ArgumentCaptor<Pagamento> argumento = ArgumentCaptor.forClass(Pagamento.class);
		verify(repositorioDePagamentos).salva(argumento.capture());
		
		Pagamento pagamentoGerado = argumento.getValue();
		
		assertEquals(Calendar.MONDAY, pagamentoGerado.getData().get(Calendar.DAY_OF_WEEK));
		assertEquals(9, pagamentoGerado.getData().get(Calendar.DAY_OF_MONTH));
	}

}
