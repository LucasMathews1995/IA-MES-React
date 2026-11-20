import { useCallback, useEffect, useState } from "react";
import { NormaService } from "../services/NormaService";
import { NormaItem } from "../types/Norma";

export function useAppPage(categoriaInicial = 'IOP')  {
    const normaService = new NormaService();

const [categoriasDisponiveis] = useState<string[]>(
    normaService.getCategorias()
  );
   
    const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [itensFiltrados, setItensFiltrados] = useState<NormaItem[]>([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>(categoriaInicial);

   const carregarDadosPorCategoria = useCallback(async (categoria: string) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const dados = await normaService.getNormas(categoria);
      setItensFiltrados(dados);
    } catch (error: any) {
      setErrorMessage(error.message || 'Ocorreu um erro inesperado.');
    } finally {
      setLoading(false);
    }
  }, []);

  const selecionarCategoria = (categoria: string) => {
    if (categoria !== categoriaSelecionada) {
      setCategoriaSelecionada(categoria);
    }
  };


 useEffect(() => {
    carregarDadosPorCategoria(categoriaSelecionada);
  }, [categoriaSelecionada, carregarDadosPorCategoria]);

   return {
    categoriasDisponiveis,
    categoriaSelecionada,
    itensFiltrados,
    loading,
    errorMessage,
    selecionarCategoria,
  };
}