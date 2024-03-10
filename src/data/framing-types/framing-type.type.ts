export interface FramingType {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrUpdateFramingType extends Pick<FramingType, 'title'> {}
