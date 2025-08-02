import { ConfirmDialog } from 'primereact/confirmdialog';

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  okHandler: () => void;
  cancelHandler: () => void;
  title: string;
  message: string;
}

const ConfirmDeleteModal = ({
  cancelHandler,
  message,
  okHandler,
  setVisible,
  title,
  visible,
}: Props): React.ReactElement => {
  const ok = (): void => {
    try {
      okHandler();
      setVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const cancel = (): void => {
    try {
      cancelHandler();
      setVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  return <ConfirmDialog accept={ok} header={title} message={message} reject={cancel} visible={visible} />;
};

export default ConfirmDeleteModal;
