import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from 'react';
import styles from '@/features/common/components/input_component.module.scss';

interface IProps {
  id: string;
  type: HTMLInputTypeAttribute;
  labelText: string;
  value: string;
  setFunc: Dispatch<SetStateAction<string>>;
}

export const InputComponent = (props: IProps) => {
  const { id, type, labelText, value, setFunc } = props;

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={id} className={styles.label}>
        {labelText}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        className={styles.input}
        value={value}
        onChange={e => setFunc(e.target.value)}
      />
    </div>
  );
};
