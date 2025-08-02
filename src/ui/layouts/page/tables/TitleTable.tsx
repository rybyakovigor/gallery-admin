import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableValue } from 'primereact/datatable';
import { Skeleton } from 'primereact/skeleton';

interface Props {
  data: DataTableValue[];
  editEntityHandler: (id: string) => void;
  deleteEntityHandler: (id: string) => void;
  isLoading: boolean;
}

const TitleTable = ({ data, deleteEntityHandler, editEntityHandler, isLoading }: Props): React.ReactElement => {
  if (isLoading && !data.length) {
    return (
      <DataTable className="p-datatable-striped" value={[{ id: 1 }, { id: 2 }, { id: 3 }]}>
        <Column body={<Skeleton />} header="#"></Column>
        <Column body={<Skeleton />} field="title" header="Название"></Column>
        <Column body={<Skeleton />} header="Действия"></Column>
      </DataTable>
    );
  }

  return (
    <DataTable scrollable loading={isLoading} scrollHeight="calc(100vh - 100px)" value={data}>
      <Column body={(_, options) => <div>{options.rowIndex + 1}</div>} header="#"></Column>
      <Column field="title" header="Название"></Column>
      <Column
        body={(rowData) => (
          <div className="flex gap-2">
            <Button text label="Редактировать" onClick={() => editEntityHandler(rowData.id)} />
            <Button text label="Удалить" severity="danger" onClick={() => deleteEntityHandler(rowData.id)} />
          </div>
        )}
        header="Действия"
      ></Column>
    </DataTable>
  );
};

export default TitleTable;
