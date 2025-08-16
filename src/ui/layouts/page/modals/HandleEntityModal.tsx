import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  children: React.ReactNode;
  okHandler: () => void;
  cancelHandler: () => void;
  title: string;
}

const HandleEntityModal = ({
  cancelHandler,
  children,
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

  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <span className="font-bold white-space-nowrap">{title}</span>
    </div>
  );

  const footerContent = (
    <div className="flex justify-content-end gap-2">
      <Button autoFocus icon="pi pi-check" label="Ok" onClick={ok} />
      <Button className="p-button-danger" icon="pi pi-times" label="Cancel" onClick={cancel} />
    </div>
  );

  return (
    <Dialog modal className="w-11 " footer={footerContent} header={headerElement} visible={visible} onHide={cancel}>
      {children}
    </Dialog>
  );
};

export default HandleEntityModal;
