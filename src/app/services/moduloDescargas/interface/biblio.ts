// export interface Biblio {
//   id: number;
//   usarioId: number;
//   recursos: number[];
// }
export interface Biblio {
    id:       number;
    usarioId: number;
    recursos: Recurso[];
}

export interface Recurso {
    id:      number;
    nombre:  string;
    tipo:    string;
    recurso: string;
}
