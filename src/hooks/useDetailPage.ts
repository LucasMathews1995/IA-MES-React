import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NormaService } from "../services/NormaService";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NormaItem } from "../types/Norma";

export function useDetailPage() {
  const { id, categoria: categoriaParam } = useParams<{
    id?: string;
    categoria?: string;
  }>();

  const location = useLocation();
  const navigate = useNavigate();
  const normaService = useMemo(() => new NormaService(), []);

  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [itemDetalhado, setItemDetalhado] = useState<NormaItem | null>(null);

  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  // Estados do pop-up de confirmação de exclusão
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const showToast = useCallback((mensagem: string) => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    setToastMsg(mensagem);
    timeoutRef.current = window.setTimeout(() => {
      setToastMsg(null);
    }, 2000);
  }, []);

  const copiarTexto = useCallback(
    async (texto: string, mensagem: string) => {
      if (!texto) return;

      try {
        await navigator.clipboard.writeText(texto);
        showToast(mensagem);
      } catch {
        showToast("Não foi possível copiar para a área de transferência.");
      }
    },
    [showToast]
  );

  // Direciona para a tela de formulário passando o item atual
  const irParaAtualizar = useCallback(() => {
    if (!itemDetalhado) return;

    const categoriaResolvida =
      location.state?.categoria ||
      categoriaParam ||
      ("EquipmentType" in itemDetalhado && itemDetalhado.EquipmentType
        ? "IOP"
        : "TrainingType" in itemDetalhado && itemDetalhado.TrainingType
          ? "TRAINING"
          : "IOP");

    navigate(`/form/${itemDetalhado.id ?? id ?? ""}`, {
      state: {
        item: itemDetalhado,
        categoria: categoriaResolvida,
        modo: "edicao",
      },
    });
  }, [navigate, itemDetalhado, id, categoriaParam, location.state]);

  const abrirConfirmacaoDelete = useCallback(() => {
    setConfirmDeleteOpen(true);
  }, []);

  const fecharConfirmacaoDelete = useCallback(() => {
    if (deleting) return;
    setConfirmDeleteOpen(false);
  }, [deleting]);

  const confirmarDelete = useCallback(async () => {
    const targetId = itemDetalhado?.id ?? id;
    if (!targetId) return;

    const categoriaResolvida =
      location.state?.categoria || categoriaParam || "IOP";

    try {
      setDeleting(true);
      await normaService.deletar(targetId, categoriaResolvida); // ajuste o nome do método no NormaService se for delete/excluir
      setConfirmDeleteOpen(false);
      navigate("/", {
        state: { toastMessage: "Item excluído com sucesso!" },
      });
    } catch {
      setConfirmDeleteOpen(false);
      showToast("Erro ao tentar excluir o item.");
    } finally {
      setDeleting(false);
    }
  }, [itemDetalhado, id, categoriaParam, location.state, normaService, navigate, showToast]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let ativo = true;

    async function carregarDados() {
      setErrorMessage(null);

      const dadosDoState =
        location.state?.iop ||
        location.state?.training ||
        location.state?.explanation;

      if (dadosDoState) {
        if (ativo) {
          setItemDetalhado(dadosDoState);
          setLoading(false);
        }
        return;
      }

      if (id) {
        const categoriaResolvida =
          location.state?.categoria || categoriaParam || "IOP";

        try {
          if (ativo) setLoading(true);
          const dadosDaApi = await normaService.buscarPorId(
            id,
            categoriaResolvida
          );
          if (ativo) {
            setItemDetalhado(dadosDaApi);
          }
        } catch {
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

  return {
    loading,
    errorMessage,
    itemDetalhado,
    toastMsg,
    copiarTexto,
    irParaAtualizar,
    confirmDeleteOpen,
    deleting,
    abrirConfirmacaoDelete,
    fecharConfirmacaoDelete,
    confirmarDelete,
  };
}