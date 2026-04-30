import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Position, CreatePositionDto, UpdatePositionDto } from '../types/position';
import { positionApi } from '../api/positionApi';
import { addNodeToTree, removeNodeById, updateNodeById } from '../utils/treeHelpers';

interface PositionState {
  positions: Position[];
  currentPosition: Position | null;
  loading: boolean;
  error: string | null;
}

const initialState: PositionState = {
  positions: [],
  currentPosition: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchPositionsTree = createAsyncThunk(
  'positions/fetchTree',
  async (_, { rejectWithValue }) => {
    try {
      const response = await positionApi.getPositionsTree();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch positions');
    }
  }
);

export const fetchPositionById = createAsyncThunk(
  'positions/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await positionApi.getPositionById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch position');
    }
  }
);

export const createPosition = createAsyncThunk(
  'positions/create',
  async (position: CreatePositionDto, { rejectWithValue }) => {
    try {
      const response = await positionApi.createPosition(position);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create position');
    }
  }
);

export const updatePosition = createAsyncThunk(
  'positions/update',
  async ({ id, position }: { id: string; position: UpdatePositionDto }, { rejectWithValue }) => {
    try {
      const response = await positionApi.updatePosition(id, position);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update position');
    }
  }
);

export const deletePosition = createAsyncThunk(
  'positions/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await positionApi.deletePosition(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete position');
    }
  }
);

const positionSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {
    clearCurrentPosition: (state) => {
      state.currentPosition = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch positions tree
    builder
      .addCase(fetchPositionsTree.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPositionsTree.fulfilled, (state, action: PayloadAction<Position[]>) => {
        state.loading = false;
        state.positions = action.payload;
      })
      .addCase(fetchPositionsTree.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch position by ID
    builder
      .addCase(fetchPositionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPositionById.fulfilled, (state, action: PayloadAction<Position>) => {
        state.loading = false;
        state.currentPosition = action.payload;
      })
      .addCase(fetchPositionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create position
    builder
      .addCase(createPosition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPosition.fulfilled, (state, action: PayloadAction<Position>) => {
        state.loading = false;
        state.positions = addNodeToTree(state.positions, action.payload);
      })
      .addCase(createPosition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update position
    builder
      .addCase(updatePosition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePosition.fulfilled, (state, action: PayloadAction<Position>) => {
        state.loading = false;
        state.positions = updateNodeById(state.positions, action.payload.id, action.payload);
        if (state.currentPosition?.id === action.payload.id) {
          state.currentPosition = action.payload;
        }
      })
      .addCase(updatePosition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete position
    builder
      .addCase(deletePosition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePosition.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.positions = removeNodeById(state.positions, action.payload);
        if (state.currentPosition?.id === action.payload) {
          state.currentPosition = null;
        }
      })
      .addCase(deletePosition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentPosition, clearError } = positionSlice.actions;
export default positionSlice.reducer;
