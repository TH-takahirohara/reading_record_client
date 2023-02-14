import { UserLayout } from '@/features/common/components/user_layout';
import { ReadingDetailContainer } from '@/features/reading_detail/reading_detail_container';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { NextPageWithLayout } from '../_app';

const ReadingPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id: readingId } = router.query;
  const readingIdNum = !readingId || isNaN(+readingId) ? undefined : +readingId;

  useEffect(() => {
    if (!router.isReady) return;
    if (!readingIdNum || readingIdNum < 1) {
      router.push('/readings');
      return;
    }
  }, [router.isReady]);

  return readingIdNum ? <ReadingDetailContainer readingId={readingIdNum} /> : null;
};

ReadingPage.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout subtitle='読書記録詳細'>{page}</UserLayout>;
};

export default ReadingPage;
