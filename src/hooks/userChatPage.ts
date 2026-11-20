import { useState, useRef, useEffect } from "react";
import { chatService, ChatMessage } from "../services/ChatService";

export function useChatPage() {
  const [categoriasDisponiveis] = useState<string[]>(chatService.getCategorias());
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>("IOP");
  const [mensagens, setMensagens] = useState<ChatMessage[]>([]);
  const [textoInput, setTextoInput] = useState<string>("");
  const [carregando, setCarregando] = useState<boolean>(false);

  const fimDasMensagensRef = useRef<HTMLDivElement | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

 
  useEffect(() => {
    fimDasMensagensRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens, carregando]);

 
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const alterarCategoria = (categoria: string) => {
    setCategoriaSelecionada(categoria);
  };

  const novoChat = () => {
    abortControllerRef.current?.abort();
    setCarregando(false);
    setMensagens([]);
    setTextoInput("");
  };

  const pararMensagem = () => {
    abortControllerRef.current?.abort();
    setCarregando(false);
  };

  const enviarMensagem = async () => {
    const pergunta = textoInput.trim();
    if (!pergunta || carregando) return;

    setMensagens((prev) => [...prev, { remetente: "user", texto: pergunta }]);
    setTextoInput("");
    setCarregando(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const resposta = await chatService.enviarPergunta(
        pergunta,
        categoriaSelecionada,
        controller.signal
      );

      setMensagens((prev) => [...prev, { remetente: "bot", texto: resposta }]);
    } catch (error: any) {
      if (error.name === "AbortError") {
        setMensagens((prev) => [
          ...prev,
          { remetente: "bot", texto: "_Geração interrompida._" },
        ]);
      } else {
        setMensagens((prev) => [
          ...prev,
          {
            remetente: "bot",
            texto: "Não foi possível obter resposta do servidor.",
          },
        ]);
      }
    } finally {
      setCarregando(false);
      abortControllerRef.current = null;
    }
  };

  return {
    categoriasDisponiveis,
    categoriaSelecionada,
    mensagens,
    textoInput,
    setTextoInput,
    carregando,
    fimDasMensagensRef,
    alterarCategoria,
    novoChat,
    enviarMensagem,
    pararMensagem,
  };
}