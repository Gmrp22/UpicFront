export interface Resource {
  nombre: String | null;
  tipo: String | null;
  recurso: string | null;
  plan: Number | null;
  
}

export interface gResource {
  nombre: String | null;
  tipo: String | null;
  recurso: string | null;
  plan: Plan;
  owner: Owner;
}

export interface Plan {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
}

interface Owner {
  nombres: String | null;
  correo: String | null;
  roles: Number;
}
