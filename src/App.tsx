import './styles/global.scss';
import './styles/sidebar.scss';
import './styles/content.scss';
import { Content } from './components/Content';
import { SideBar } from './components/SideBar';
import GlobalState from './global/GlobalState';


export function App() {

  return (

    <GlobalState>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />
        <Content />
      </div>
    </GlobalState>
  )
}