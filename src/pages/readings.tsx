import { ReadingsContainer } from '@/features/readings/readings_container';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';

const ReadingsPage: NextPage = () => <ReadingsContainer />;

const DynamicReadingsPage = dynamic(
  {
    loader: async () => ReadingsPage,
  },
  { ssr: false },
);

export default DynamicReadingsPage;
