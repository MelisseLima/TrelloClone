import React from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import {
  ContainerActions,
  ContainerList,
  ContainerTasks,
  ListHeader,
} from './styles.ts';

function CardList({ item, removeList }) {
  return (
    <ContainerList className="list">
      <ListHeader className="header-list">
        <h4 className="list-label">{item.label}</h4>

        <ContainerActions>
          <button onClick={{}}>
            <BsFillTrashFill />
          </button>
        </ContainerActions>
      </ListHeader>

      <ContainerTasks>Content here!</ContainerTasks>
    </ContainerList>
  );
}

export default CardList;
