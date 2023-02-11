import { ReadingDetailContainer } from '@/features/reading_detail/reading_detail_container';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ReadingPage: NextPage = () => {
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

export default ReadingPage;
