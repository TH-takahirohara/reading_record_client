import { UserLayout } from '@/features/common/components/user_layout';
import { ReadingFormContainer } from '@/features/reading_form/reading_form_container';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

const ReadingsCreatePage: NextPageWithLayout = () => <ReadingFormContainer />;

ReadingsCreatePage.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout subtitle='読書記録の新規作成'>{page}</UserLayout>;
};

export default ReadingsCreatePage;
