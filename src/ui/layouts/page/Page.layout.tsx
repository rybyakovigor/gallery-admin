import { useState } from 'react';

import { Button } from 'primereact/button';
import { DataTableValue } from 'primereact/datatable';

import ConfirmDeleteModal from './modals/ConfirmDeleteModal';
import HandleEntityModal from './modals/HandleEntityModal';
import TitleTable from './tables/TitleTable';

interface Props {
  title: string;
  data: DataTableValue[];
  handleEntityModalTitle: string;
  handleEntityModalChildren: React.ReactNode;
  createEntityHandler: () => void;
  updateEntityHandler: (id: string) => void;
  deleteEntityModalHandler: (id: string) => void;
  deleteEntityModalText: string;
  isLoading: boolean;
  setActiveEntity: (id: string | null) => void;
  activeEntityId: string | null;
}

const PageLayout = ({
  activeEntityId,
  createEntityHandler,
  data,
  deleteEntityModalHandler,
  deleteEntityModalText,
  handleEntityModalChildren,
  handleEntityModalTitle,
  isLoading,
  setActiveEntity,
  title,
  updateEntityHandler,
}: Props): React.ReactElement => {
  const [isHandleEntityModalVisible, setIsHandleEntityModalVisible] = useState(false);
  const [isConfirmDeleteModalVisible, setIsConfirmDeleteModalVisible] = useState(false);

  return (
    <>
      <section>
        <header className="flex justify-content-between align-items-center">
          <h1>{title}</h1>
          <Button label="Добавить" onClick={() => setIsHandleEntityModalVisible(true)} />
        </header>
        <TitleTable
          data={data}
          deleteEntityHandler={(id) => {
            setActiveEntity(id);
            setIsConfirmDeleteModalVisible(true);
          }}
          editEntityHandler={(id) => {
            setActiveEntity(id);
            setIsHandleEntityModalVisible(true);
          }}
          isLoading={isLoading}
        />
      </section>
      <HandleEntityModal
        cancelHandler={() => setActiveEntity(null)}
        okHandler={() => {
          if (activeEntityId) {
            updateEntityHandler(activeEntityId);
          } else {
            createEntityHandler();
          }
        }}
        setVisible={setIsHandleEntityModalVisible}
        title={handleEntityModalTitle}
        visible={isHandleEntityModalVisible}
      >
        {handleEntityModalChildren}
      </HandleEntityModal>
      <ConfirmDeleteModal
        cancelHandler={() => setActiveEntity(null)}
        message={deleteEntityModalText}
        okHandler={() => deleteEntityModalHandler(activeEntityId!)}
        setVisible={setIsConfirmDeleteModalVisible}
        title="Удаление"
        visible={isConfirmDeleteModalVisible}
      />
    </>
  );
};

export default PageLayout;
