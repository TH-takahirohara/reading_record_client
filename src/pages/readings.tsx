import { UserLayout } from '@/features/common/components/user_layout';
import { ReadingsContainer } from '@/features/readings/readings_container';
import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';

const ReadingsPage: NextPageWithLayout = () => <ReadingsContainer />;

ReadingsPage.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout subtitle='読書記録一覧'>{page}</UserLayout>;
};

export default ReadingsPage;
