import { NormaItem } from "../types/Norma";

export class NormaService {







  private readonly baseUrl = "http://localhost:8080/api";

  async getNormas(categoria: string): Promise<NormaItem[]> {
    try {
      const endpoint = categoria.toLowerCase();
      const response = await fetch(`${this.baseUrl}/${endpoint}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch normas for ${endpoint}`);
      }

      return await response.json();
    } catch (error: any) {
      console.error("Erro no NormaService.getNormas:", error);
      throw error;
    }
  }

  async buscarPorId(id: string | number, categoria: string): Promise<NormaItem> {
    try {
      const endpoint = categoria.toLowerCase(); // ex: 'iop', 'training', 'explanation'
      const response = await fetch(`${this.baseUrl}/${endpoint}/${id}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint} with id ${id}`);
      }

      return await response.json();
    } catch (error: any) {
      console.error("Erro no NormaService.buscarPorId:", error);
      throw error;
    }
  }



  async deletar(id: number| string, categoria: string): Promise<void> {
  try {
    const endpoint = categoria.toLowerCase();
    const response = await fetch(`${this.baseUrl}/${endpoint}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete ${endpoint} with id ${id}`);
    }

    
    if (response.status === 204) {
      return;
    }

    const rawText = await response.text();
    if (rawText) {
      JSON.parse(rawText);
    }
  } catch (error: any) {
    console.error("Erro no NormaService.deletar:", error);
    throw error;
  }
}

  getCategorias(): string[] {
    return ["IOP", "TRAINING", "EXPLANATION"];
  }
}