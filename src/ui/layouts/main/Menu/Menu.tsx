import { Menu as PrimeMenu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';

interface Props {
  items: MenuItem[];
}

const Menu = ({ items }: Props): React.ReactElement => {
  return <PrimeMenu model={items} />;
};

export default Menu;
