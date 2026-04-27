'use client';

import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { PositionDetailPage } from '../../../pages/PositionDetailPage';
import { store } from '../../../store';

export default function PositionPage() {
  return (
    <Provider store={store}>
      <MantineProvider>
        <ModalsProvider>
          <Notifications position="top-right" />
          <PositionDetailPage />
        </ModalsProvider>
      </MantineProvider>
    </Provider>
  );
}
