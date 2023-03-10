import { InputComponent } from '@/features/common/components/input_component';
import { useState } from 'react';
import styles from '@/features/reading_form/reading_form_container.module.scss';
import { createReading } from './apis/reading_form_api';
import { ButtonComponent } from '../common/components/button_component';
import { useRouter } from 'next/router';

export const ReadingFormContainer = () => {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [totalPageCount, setTotalPageCount] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  const create = async () => {
    const totalPageCountNum = parseInt(totalPageCount);
    if (isNaN(totalPageCountNum)) {
      setErrors(['総ページ数： 数値を入力してください']);
      return;
    }
    if (totalPageCountNum < 1) {
      setErrors(['総ページ数： 0より大きい値を入力してください']);
      return;
    }
    if (totalPageCountNum > 50000) {
      setErrors(['総ページ数： 50000以下の値を入力してください']);
      return;
    }

    const { reading, error } = await createReading(title, author, totalPageCountNum);
    if (error) {
      const errors = [];
      if (error.msg) errors.push(error.msg);
      if (error.bookName) errors.push(`タイトル： ${error.bookName}`);
      if (error.bookAuthor) errors.push(`著者： ${error.bookAuthor}`);
      if (error.totalPageCount) errors.push(`総ページ数: ${error.totalPageCount}`);
      setErrors(errors);
      return;
    }
    console.log('done');

    router.push(`/readings/${reading.id}`);
  };

  return (
    <div className={styles.root}>
      {errors.length !== 0 && (
        <div className={styles.errors}>
          {errors.map((errorText, idx) => (
            <div key={idx}>{errorText}</div>
          ))}
        </div>
      )}
      <InputComponent
        id='title'
        type='text'
        labelText='タイトル'
        value={title}
        setFunc={setTitle}
      />
      <InputComponent id='author' type='text' labelText='著者' value={author} setFunc={setAuthor} />
      <InputComponent
        id='total_page_count'
        type='text'
        labelText='総ページ数'
        value={totalPageCount}
        setFunc={setTotalPageCount}
      />
      <ButtonComponent title='作成' onClick={create} />
    </div>
  );
};
