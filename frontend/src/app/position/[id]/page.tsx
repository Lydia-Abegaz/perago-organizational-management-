'use client';

import { PositionDetailPage } from '../../../pages/PositionDetailPage';
import { AuthGuard } from '../../../components/AuthGuard';

export default function PositionPage() {
  return (
    <AuthGuard>
      <PositionDetailPage />
    </AuthGuard>
  );
}
