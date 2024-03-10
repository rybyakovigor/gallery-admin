export interface Material {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrUpdateMaterial extends Pick<Material, 'title'> {}
