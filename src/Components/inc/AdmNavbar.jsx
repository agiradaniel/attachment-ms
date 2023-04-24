import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import Hambuger from '../Images/hambuger.png';
import { auth } from '../../firebase-config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import SettingsModalFd from './settingsModalFd';

function AdmNavbar() {

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
          <MenuItem component={<Link to="/AdminDashboard"/>}> Dashboard</MenuItem>
          <MenuItem component={<Link to="/next"/>}> Reload</MenuItem>

          <MenuItem onClick={signUserOut} style={{marginTop:"390px"}}> Logout</MenuItem>
        </Menu>
      </Sidebar>
      <main>
        <img style={{width:"40px"}}  src={Hambuger} onClick={() => collapseSidebar()}/>
      </main>
    </div>
  );
}

export default AdmNavbar