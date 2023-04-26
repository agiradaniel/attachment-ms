import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import Hambuger from '../Images/hambuger.png';
import { auth } from '../../firebase-config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import SettingsModal from './settingsModal';
import SupervisorModal from './supervisorModal';

function SideBarMenu() {

  const { collapseSidebar } = useProSidebar();

  const navigate = useNavigate();

  const signUserOut = async () => {
      await signOut(auth);
      navigate("/")
  }

  return (
    <div style={{ display: 'flex', height: '550px', position: 'absolute'}}>
      <Sidebar width="140px">
        <Menu>
          <MenuItem component={<Link to="/StudentDashboard"/>}> Dashboard</MenuItem>
          <MenuItem component={<Link to="/ELogbook"/>}> Logbook</MenuItem>
          <MenuItem component={<Link to="/Report"/>}> Report</MenuItem>
          <MenuItem> <SupervisorModal/></MenuItem>

          <MenuItem style={{marginTop:"250px"}}> <SettingsModal/> </MenuItem>
          <MenuItem onClick={signUserOut}> Logout</MenuItem>
        </Menu>
      </Sidebar>
      <main>
        <img style={{width:"40px"}}  src={Hambuger} onClick={() => collapseSidebar()}/>
      </main>
    </div>
  );
}

export default SideBarMenu