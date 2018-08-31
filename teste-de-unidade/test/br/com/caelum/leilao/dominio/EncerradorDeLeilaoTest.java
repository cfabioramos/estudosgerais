package br.com.caelum.leilao.dominio;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.inOrder;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;

import org.junit.Test;
import org.mockito.InOrder;

import br.com.caelum.leilao.builder.CriadorDeLeilao;
import br.com.caelum.leilao.infra.dao.LeilaoDao;
import br.com.caelum.leilao.servico.EncerradorDeLeilao;
import br.com.caelum.leilao.servico.EnviadorDeEmail;

public class EncerradorDeLeilaoTest {

	@Test
    public void deveEncerrarLeiloesQueComecaramUmaSemanaAtras() {

        Calendar antiga = Calendar.getInstance();
        antiga.set(1999, 1, 20);

        Leilao leilao1 = new CriadorDeLeilao().para("TV de plasma")
            .naData(antiga).constroi();
        Leilao leilao2 = new CriadorDeLeilao().para("Geladeira")
            .naData(antiga).constroi();
        List<Leilao> leiloesAntigos = Arrays.asList(leilao1, leilao2);
        
        // criamos o mock
        LeilaoDao daoFalso = mock(LeilaoDao.class);
        // ensinamos ele a retornar a lista de leiloes antigos
        when(daoFalso.correntes()).thenReturn(leiloesAntigos);
        
        //Mock da interface que n�o tem nenhuma implementa��o
        EnviadorDeEmail carteiroFalso = mock(EnviadorDeEmail.class);
        
        EncerradorDeLeilao encerrador = new EncerradorDeLeilao(daoFalso, carteiroFalso);
        encerrador.encerra();

        assertTrue(leilao1.isEncerrado());
        assertTrue(leilao2.isEncerrado());
        
        // verificando que o metodo atualiza foi realmente invocado!
        verify(daoFalso, times(1)).atualiza(leilao1);
        // Ainda podemos passar atLeastOnce(), atLeast(numero) e atMost(numero) para o verify()
        
        // verificando que o metodo atualiza n�o foi invocado!
        // verify(daoFalso, never()).atualiza(leilao1);
        
        //TODO entender melhor o inOrder. porque eu troquei a ordem, mas n�o sei se funfou.
        // Passamos os mocks que serao verificados.
        InOrder inOrder = inOrder(daoFalso, carteiroFalso);
        // a primeira invoca��o
        inOrder.verify(daoFalso, times(1)).atualiza(leilao1);    
        // a segunda invoca��o
        inOrder.verify(carteiroFalso, times(1)).envia(leilao1);
        
    }
	
	//TODO Entender porque esse teste est� falhando.
	@Test
    public void naoDeveEncerrarLeiloesQueComecaramMenosDeUmaSemanaAtras() {

        Calendar ontem = Calendar.getInstance();
        ontem.add(Calendar.DAY_OF_MONTH, -1);

        Leilao leilao1 = new CriadorDeLeilao().para("TV de plasma")
            .naData(ontem).constroi();
        Leilao leilao2 = new CriadorDeLeilao().para("Geladeira")
            .naData(ontem).constroi();

        LeilaoDao daoFalso = mock(LeilaoDao.class);
        when(daoFalso.correntes())
            .thenReturn(Arrays.asList(leilao1, leilao2));

        EnviadorDeEmail carteiroFalso = mock(EnviadorDeEmail.class);
        EncerradorDeLeilao encerrador = 
            new EncerradorDeLeilao(daoFalso, carteiroFalso);

        encerrador.encerra();

        assertEquals(0, encerrador.getTotalEncerrados());
        assertFalse(leilao1.isEncerrado());
        assertFalse(leilao2.isEncerrado());

        verify(daoFalso, never()).atualiza(leilao1);
        verify(daoFalso, never()).atualiza(leilao2);
    }

    @Test
    public void naoDeveEncerrarLeiloesCasoNaoHajaNenhum() {

    	LeilaoDao daoFalso = mock(LeilaoDao.class);
        when(daoFalso.correntes())
            .thenReturn(new ArrayList<Leilao>());

        EnviadorDeEmail carteiroFalso = mock(EnviadorDeEmail.class);
        EncerradorDeLeilao encerrador = 
            new EncerradorDeLeilao(daoFalso, carteiroFalso);

        encerrador.encerra();

        assertEquals(0, encerrador.getTotalEncerrados());
    }

    @Test
    public void deveAtualizarLeiloesEncerrados() {

        Calendar antiga = Calendar.getInstance();
        antiga.set(1999, 1, 20);

        Leilao leilao1 = new CriadorDeLeilao().para("TV de plasma")
            .naData(antiga).constroi();

        LeilaoDao daoFalso = mock(LeilaoDao.class);
        when(daoFalso.correntes())
            .thenReturn(Arrays.asList(leilao1));

        EnviadorDeEmail carteiroFalso = mock(EnviadorDeEmail.class);
        EncerradorDeLeilao encerrador = 
            new EncerradorDeLeilao(daoFalso, carteiroFalso);

        encerrador.encerra();

        verify(daoFalso, times(1)).atualiza(leilao1);
    }
    
    @Test
    public void deveContinuarExecucaoMesmoQuandoDaoFalha() {

        Calendar antiga = Calendar.getInstance();
        antiga.set(1999, 1, 20);

        Leilao leilao1 = new CriadorDeLeilao().para("TV de plasma").naData(antiga).constroi();
        Leilao leilao2 = new CriadorDeLeilao().para("Geladeira").naData(antiga).constroi();

        LeilaoDao daoFalso = mock(LeilaoDao.class);
        EnviadorDeEmail carteiroFalso = mock(EnviadorDeEmail.class);
        
        when(daoFalso.correntes()).thenReturn(Arrays.asList(leilao1, leilao2));
        
        doThrow(new RuntimeException()).when(daoFalso).atualiza(leilao1);

        // caso o erro deva ser lançado para qualquer leilão        
        // doThrow(new RuntimeException()).when(daoFalso).atualiza(org.mockito.Matchers.any(Leilao.class));

        EncerradorDeLeilao encerrador = new EncerradorDeLeilao(daoFalso, carteiroFalso);
        encerrador.encerra();

        verify(daoFalso).atualiza(leilao2);
        verify(carteiroFalso).envia(leilao2);
        // No caso do erro ser lançado para qualquer leilão, essa seria a verificação;
        // verify(carteiroFalso, never()).envia(org.mockito.Matchers.any(Leilao.class));
        
        // verify(carteiroFalso, times(0)).envia(leilao1);
        verify(carteiroFalso, never()).envia(leilao1);
        
    }

}
