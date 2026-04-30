import { api } from './axios';
import { Position, CreatePositionDto, UpdatePositionDto } from '../types/position';

export const positionApi = {
  // Get the complete position tree
  getPositionsTree: async (): Promise<Position[]> => {
    const response = await api.get('/positions/tree');
    return response.data;
  },

  // Get a single position by ID
  getPositionById: async (id: string): Promise<Position> => {
    const response = await api.get(`/positions/${id}`);
    return response.data;
  },

  // Get all children of a specific position
  getPositionChildren: async (parentId: string): Promise<Position[]> => {
    const response = await api.get(`/positions/${parentId}/children`);
    return response.data;
  },

  // Create a new position
  createPosition: async (position: CreatePositionDto): Promise<Position> => {
    const response = await api.post('/positions', position);
    return response.data;
  },

  // Update an existing position
  updatePosition: async (id: string, position: UpdatePositionDto): Promise<Position> => {
    const response = await api.put(`/positions/${id}`, position);
    return response.data;
  },

  // Delete a position
  deletePosition: async (id: string): Promise<void> => {
    await api.delete(`/positions/${id}`);
  },
};
