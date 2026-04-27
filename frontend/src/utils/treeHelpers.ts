import { Position, FlatPosition } from '../types/position';

/**
 * Flatten tree structure into a flat array with indentation levels
 */
export const flattenTree = (positions: Position[], level = 0): FlatPosition[] => {
  const result: FlatPosition[] = [];
  
  for (const position of positions) {
    const displayName = '  '.repeat(level) + position.name;
    result.push({
      id: position.id,
      name: position.name,
      description: position.description,
      parentId: position.parentId,
      level,
      displayName,
    });
    
    if (position.children && position.children.length > 0) {
      result.push(...flattenTree(position.children, level + 1));
    }
  }
  
  return result;
};

/**
 * Find a node in the tree by its ID
 */
export const findNodeById = (positions: Position[], id: number): Position | null => {
  for (const position of positions) {
    if (position.id === id) {
      return position;
    }
    
    if (position.children && position.children.length > 0) {
      const found = findNodeById(position.children, id);
      if (found) {
        return found;
      }
    }
  }
  
  return null;
};

/**
 * Count all nodes in the tree
 */
export const countNodes = (positions: Position[]): number => {
  let count = 0;
  
  for (const position of positions) {
    count++;
    if (position.children && position.children.length > 0) {
      count += countNodes(position.children);
    }
  }
  
  return count;
};

/**
 * Get all descendant IDs of a node (to prevent circular references)
 */
export const getDescendantIds = (position: Position): number[] => {
  const ids: number[] = [];
  
  if (position.children && position.children.length > 0) {
    for (const child of position.children) {
      ids.push(child.id);
      ids.push(...getDescendantIds(child));
    }
  }
  
  return ids;
};

/**
 * Remove a node from the tree by ID
 */
export const removeNodeById = (positions: Position[], id: number): Position[] => {
  return positions
    .filter(position => position.id !== id)
    .map(position => ({
      ...position,
      children: position.children ? removeNodeById(position.children, id) : undefined,
    }));
};

/**
 * Update a node in the tree by ID
 */
export const updateNodeById = (positions: Position[], id: number, updates: Partial<Position>): Position[] => {
  return positions.map(position => {
    if (position.id === id) {
      return { ...position, ...updates };
    }
    
    if (position.children && position.children.length > 0) {
      return {
        ...position,
        children: updateNodeById(position.children, id, updates),
      };
    }
    
    return position;
  });
};

/**
 * Add a new node to the tree
 */
export const addNodeToTree = (positions: Position[], newNode: Position): Position[] => {
  if (!newNode.parentId) {
    // Root level position
    return [...positions, newNode];
  }
  
  return positions.map(position => {
    if (position.id === newNode.parentId) {
      return {
        ...position,
        children: [...(position.children || []), newNode],
      };
    }
    
    if (position.children && position.children.length > 0) {
      return {
        ...position,
        children: addNodeToTree(position.children, newNode),
      };
    }
    
    return position;
  });
};
