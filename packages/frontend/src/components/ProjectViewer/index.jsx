import React, { useEffect, useState } from 'react';
import { BsCardChecklist, BsFilePlus } from 'react-icons/bs';
import CreateList from '../../dialogs/CreateList';
import TaskCard from '../../dialogs/TaskCard';
import api from '../../services/api';
import CardList from '../CardList';
import {
  ContainerHeaderActions,
  ContainerLists,
  ContainerProject,
  ContainerProjectHeader,
} from './styles';

function ProjectViewer({ id }) {
  const [board, setBoard] = useState({});
  const [lists, setLists] = useState([]);
  const [openCreateList, setOpenCreateList] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadLists() {
      const response = await api.get(`/board/${id}`);
      setBoard(response.data.data);
      setLists(response.data.data.lists);
    }

    loadLists();
  }, []);

  return (
    <ContainerProject>
      <ContainerProjectHeader className={'header-project'}>
        <h2>{board.name}</h2>

        <ContainerHeaderActions>
          <button onClick={() => setOpenTask(true)}>
            <BsCardChecklist size={20} />
            Criar tarefa
          </button>
          <button onClick={() => setOpenCreateList(true)}>
            <BsFilePlus size={16} />
            Criar coluna
          </button>
        </ContainerHeaderActions>
      </ContainerProjectHeader>

      <ContainerLists>
        {!loading &&
          lists.map((item) => {
            return <CardList item={item} />;
          })}
      </ContainerLists>

      <CreateList
        open={openCreateList}
        handleClose={() => setOpenCreateList(false)}
        board_id={board.id}
        addList={(item) => {
          setLists((oldLists) => [...oldLists, item]);
        }}
      />
      <TaskCard open={openTask} handleClose={() => setOpenTask(false)} />
    </ContainerProject>
  );
}

export default ProjectViewer;
