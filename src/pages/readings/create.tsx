import { ReadingFormContainer } from '@/features/reading_form/reading_form_container';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';

const ReadingsCreatePage: NextPage = () => <ReadingFormContainer />;

const DynamicReadingsCreatePage = dynamic(
  {
    loader: async () => ReadingsCreatePage,
  },
  { ssr: false },
);

export default DynamicReadingsCreatePage;
