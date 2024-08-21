export interface place {
  id: number;
  name: string;
  description: string | null;
}

export type placeWithoutId = Omit<place, "id">;
