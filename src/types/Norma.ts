export interface IopModel{
   
    id?: number | string;
    titulo?: string;
    EquipmentType?: string;
    chamadoReferencia?: string;
    texto? : string;
}

export interface TrainingModel{
    
    id?: number | string;
    titulo?: string;
    TrainingType?: string;
    chamadoReferencia?: string;
    texto? : string;

}



export type NormaItem = IopModel | TrainingModel;