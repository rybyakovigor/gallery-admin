import { PrimeReactProvider } from 'primereact/api';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '~/ui/styles/index.css';

interface Props {
  children: React.ReactNode;
}
export const StylesProvider = ({ children }: Props): React.ReactElement => (
  <PrimeReactProvider value={{ ripple: true, appendTo: 'self' }}>{children}</PrimeReactProvider>
);
