export interface ChatMessage {
  remetente: "user" | "bot";
  texto: string;
}
export interface ChatResponseDTO {
  resposta: string;
}
export class ChatService {
  private readonly baseUrl = "http://localhost:8080/api/chat";

  async enviarPergunta(
    pergunta: string,
    categoriaSuporte: string,
    signal?: AbortSignal
  ): Promise<string> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pergunta, categoriaSuporte }),
      signal,
    });

    if (!response.ok) {
      throw new Error("Erro ao comunicar com o Assistente IA.");
    }

    const data: ChatResponseDTO = await response.json();
    return data.resposta;
  }

  getCategorias(): string[] {
    return ["IOP", "TRAINING", "EXPLANATION"];
  }
}

export const chatService = new ChatService();