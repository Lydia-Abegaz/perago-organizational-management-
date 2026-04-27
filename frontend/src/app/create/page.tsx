'use client';

import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { CreatePositionPage } from '../../pages/CreatePositionPage';
import { store } from '../../store';

export default function CreatePage() {
  return (
    <Provider store={store}>
      <MantineProvider>
        <ModalsProvider>
          <Notifications position="top-right" />
          <CreatePositionPage />
        </ModalsProvider>
      </MantineProvider>
    </Provider>
  );
}
