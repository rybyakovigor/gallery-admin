import { Column } from 'primereact/column';
import { DataTable, DataTableValue } from 'primereact/datatable';
import { Skeleton } from 'primereact/skeleton';

interface Props {
  data: DataTableValue[];
  isLoading: boolean;
}

const FeedbackTable = ({ data, isLoading }: Props): React.ReactElement => {
  if (isLoading && !data.length) {
    return (
      <DataTable className="p-datatable-striped" value={[{ id: 1 }, { id: 2 }, { id: 3 }]}>
        <Column body={<Skeleton />} header="#"></Column>
        <Column body={<Skeleton />} field="name" header="Имя"></Column>
        <Column body={<Skeleton />} field="email" header="Email"></Column>
        <Column body={<Skeleton />} field="phone" header="Телефон"></Column>
        <Column body={<Skeleton />} field="created_at" header="Дата создания"></Column>
      </DataTable>
    );
  }

  return (
    <DataTable scrollable loading={isLoading} scrollHeight="calc(100vh - 100px)" value={data}>
      <Column body={(_, options) => <div>{options.rowIndex + 1}</div>} header="#"></Column>
      <Column field="name" header="Имя"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="phone" header="Телефон"></Column>
      <Column
        body={(rowData) => new Date(rowData.created_at).toLocaleString()}
        field="created_at"
        header="Дата создания"
      ></Column>
    </DataTable>
  );
};

export default FeedbackTable;
