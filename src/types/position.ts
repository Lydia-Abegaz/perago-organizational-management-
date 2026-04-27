export interface Position {
  id: number;
  name: string;
  description: string;
  parentId: number | null;
  children?: Position[];
}

export interface CreatePositionDto {
  name: string;
  description?: string;
  parentId?: number | null;
}

export interface UpdatePositionDto {
  name?: string;
  description?: string;
  parentId?: number | null;
}

export interface FlatPosition {
  id: number;
  name: string;
  description: string;
  parentId: number | null;
  level: number;
  displayName: string;
}
