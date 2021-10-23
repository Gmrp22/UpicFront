export interface Biblio {
  id: number;
  usarioId: number;
  recursos: Recurso[];
}

interface Recurso {
  id: number;
  nombre: string;
  tipo: string;
  recurso: string;
  owner: Owner;
}

interface Owner {
  nombres: String | null;
  correo: String | null;
  roles: Number;
}

interface Plan {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
}
