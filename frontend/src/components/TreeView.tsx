import React, { useState } from 'react';
import { 
  Paper, 
  Group, 
  Text, 
  ActionIcon, 
  Collapse, 
  Stack,
  Badge,
  Button
} from '@mantine/core';
import { IconEdit, IconTrash, IconChevronRight, IconChevronDown } from '@tabler/icons-react';
import { Position } from '../types/position';
import Link from 'next/link';

import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface TreeNodeProps {
  position: Position;
  level: number;
  onDelete: (id: string) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ position, level, onDelete }) => {
  const [expanded, setExpanded] = useState(true);
  const { user } = useSelector((state: RootState) => state.auth);
  const isAdmin = user?.role === 'admin';
  const hasChildren = position.children && position.children.length > 0;

  return (
    <div className="mb-2">
      <Paper 
        shadow="sm" 
        p="md" 
        radius="xl"
        bg="#1e1e20" 
        style={{ 
          marginLeft: `${level * 28}px`,
          border: '1px solid #3B3B3D',
          color: '#FFFFFF',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)'
        }}
        className="hover:shadow-[0_0_15px_rgba(0,232,255,0.15)] hover:border-[#00E8FF] hover:scale-[1.01]"
      >
        <Group justify="space-between">
          <Group>
            {hasChildren && (
              <ActionIcon
                size="sm"
                variant="subtle"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? <IconChevronDown size={14} /> : <IconChevronRight size={14} />}
              </ActionIcon>
            )}
            <div>
              <Text fw={600} size="sm">
                {position.name}
              </Text>
              {position.description && (
                <Text size="xs" c="dimmed" mt={2}>
                  {position.description}
                </Text>
              )}
            </div>
            {hasChildren && (
              <Badge size="sm" bg="#8A00FF" c="#FFFFFF" radius="xl" style={{ letterSpacing: '0.5px', boxShadow: '0 0 10px rgba(138, 0, 255, 0.4)' }}>
                {position.children?.length} {position.children?.length === 1 ? 'CHILD' : 'CHILDREN'}
              </Badge>
            )}
          </Group>
          
          <Group>
            {isAdmin && (
              <>
                <ActionIcon
                  component={Link}
                  href={`/position/${position.id}`}
                  bg="rgba(0, 232, 255, 0.1)"
                  c="#00E8FF"
                  variant="light"
                  size="lg"
                  radius="xl"
                  style={{ transition: 'all 0.2s', border: '1px solid rgba(0,232,255,0.2)' }}
                >
                  <IconEdit size={16} />
                </ActionIcon>
                <ActionIcon
                  bg="rgba(255, 0, 60, 0.1)"
                  c="#ff003c"
                  variant="light"
                  size="lg"
                  radius="xl"
                  onClick={() => onDelete(position.id)}
                  style={{ transition: 'all 0.2s', border: '1px solid rgba(255,0,60,0.2)' }}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </>
            )}
          </Group>
        </Group>
      </Paper>
      
      {hasChildren && (
        <Collapse in={expanded}>
          <Stack mt="xs" gap="xs">
            {position.children?.map((child) => (
              <TreeNode
                key={child.id}
                position={child}
                level={level + 1}
                onDelete={onDelete}
              />
            ))}
          </Stack>
        </Collapse>
      )}
    </div>
  );
};

interface TreeViewProps {
  positions: Position[];
  onDelete: (id: string) => void;
}

export const TreeView: React.FC<TreeViewProps> = ({ positions, onDelete }) => {
  if (positions.length === 0) {
    return (
      <Paper 
        shadow="sm" 
        p="xl" 
        bg="#556B2F"
        style={{ 
          textAlign: 'center',
          borderRadius: '12px',
          border: '2px solid #8B9B66'
        }}
      >
        <Text c="#FEFEFA" size="lg" fw={500}>
          No positions found. Create your first position to get started.
        </Text>
      </Paper>
    );
  }

  return (
    <Stack gap="xs">
      {positions.map((position) => (
        <TreeNode
          key={position.id}
          position={position}
          level={0}
          onDelete={onDelete}
        />
      ))}
    </Stack>
  );
};
