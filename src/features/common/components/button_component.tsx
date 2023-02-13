import styles from '@/features/common/components/button_component.module.scss';

interface IProps {
  title: string;
  onClick: () => void;
}

export const ButtonComponent = (props: IProps) => {
  const { title, onClick } = props;
  return (
    <button className={styles.button} onClick={onClick}>
      {title}
    </button>
  );
};
