import SearchPage from '@/components/pages/SearchPage';
import { Suspense } from 'react';

export default function Search() {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
}
