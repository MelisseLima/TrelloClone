import React from 'react';
import {
  BsBoxArrowInRight,
  BsHouseDoorFill,
  BsKanban,
  BsPeopleCircle,
} from 'react-icons/bs';
import api from '../../services/api';
import { ContainerHeader, ContainerInfoUser } from './styles';

function Header() {
  const user = JSON.parse(sessionStorage.getItem('user'));

  async function logout() {
    await api.put(`/logout`).then((resp) => {
      window.location.href = '/';
    });
  }

  async function home() {
    window.location.href = '/home ';
  }

  return (
    <ContainerHeader>
      <button onClick={() => home()}>
        <BsHouseDoorFill size={24} />
      </button>
      <button
        style={{ minWidth: '20px', maxWidth: 'fit-content', padding: '20px' }}
      >
        <BsKanban style={{ marginRight: '5px' }} size={24} />
        <strong>Trello Clone</strong>
      </button>
      <ContainerInfoUser>
        <div>
          <BsPeopleCircle size={24} />
          <span style={{ margin: 'auto', marginLeft: 10 }}>
            {user.username}
          </span>
        </div>

        <button onClick={() => logout()}>
          <BsBoxArrowInRight size={24} />
        </button>
      </ContainerInfoUser>
    </ContainerHeader>
  );
}

export default Header;
