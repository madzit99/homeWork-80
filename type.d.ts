export interface place {
  id: number;
  name: string;
  description: string | null;
}

export type placeWithoutId = Omit<place, "id">;

export interface category {
  id: number;
  name: string;
  description: string | null;
}

export type categoryWithoutId = Omit<category, "id">;

export interface item {
  id: number;
  categoryId: number;
  placeId: number;
  name: string;
  description: string | null;
  image: string | null;
}

export type itemWithoutId = Omit<item, "id">;
