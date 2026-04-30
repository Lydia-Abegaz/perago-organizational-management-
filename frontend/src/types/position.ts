export interface Position {
  id: string;
  name: string;
  description: string;
  parentId: string | null;
  children?: Position[];
}

export interface CreatePositionDto {
  name: string;
  description?: string;
  parentId?: string | null;
}

export interface UpdatePositionDto {
  name?: string;
  description?: string;
  parentId?: string | null;
}

export interface FlatPosition {
  id: string;
  name: string;
  description: string;
  parentId: string | null;
  level: number;
  displayName: string;
}
