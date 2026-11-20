import { useLocation, useParams } from "react-router-dom";
import { NormaService } from "../services/NormaService";
import { useEffect, useMemo, useState } from "react";
import { NormaItem } from "../types/Norma";

export function useDetailPage() {

  const { id, categoria: categoriaParam } = useParams<{
    id?: string;
    categoria?: string;
  }>();


  const location = useLocation();
  const normaService = useMemo(() => new NormaService(), []);

  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [itemDetalhado, setItemDetalhado] = useState<NormaItem | null>(null);

  useEffect(() => {
    let ativo = true;

    async function carregarDados() {
      setErrorMessage(null);

    
      const dadosDoState = location.state?.iop || location.state?.training || location.state?.explanation;
      if (dadosDoState) {
        if (ativo) {
          setItemDetalhado(dadosDoState);
          setLoading(false);
        }
        return;
      }

     
      if (id) {
        const categoriaResolvida =
          location.state?.categoria ||
          categoriaParam ||
          "IOP";

        try {
          if (ativo) setLoading(true);
          const dadosDaApi = await normaService.buscarPorId(
            id,
            categoriaResolvida
          );
          if (ativo) {
            setItemDetalhado(dadosDaApi);
          }
        } catch (error) {
          if (ativo) {
            setErrorMessage(
              `Erro ao carregar os detalhes (${categoriaResolvida}).`
            );
          }
        } finally {
          if (ativo) setLoading(false);
        }
        return;
      }


      if (ativo) {
        setErrorMessage("Nenhum identificador encontrado.");
        setLoading(false);
      }
    }

    carregarDados();

    return () => {
      ativo = false;
    };
  }, [location.state, id, categoriaParam, normaService]);

  return { loading, errorMessage, itemDetalhado };
}