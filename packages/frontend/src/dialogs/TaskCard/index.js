import { Button, CircularProgress, Dialog, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import api from '../../services/api';

function CardTask({ open, handleClose, board_id }) {
  const [loading, setLoading] = useState(false);
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');

  async function CardTask() {
    setLoading(true);
    const response = await api.post(
      `/task`,
      {
        label: label,
        description: description,
        board_id: '75523842-2c99-4953-bfcb-3111181d6d9b',
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
        },
      }
    );
    setLoading(false);
    handleClose();
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <div
        style={{
          width: 400,
          height: 300,
          color: '#000',
          margin: 20,
          display: 'grid',
        }}
      >
        <h2>Adicionar tarefa</h2>
        <TextField
          label="Titulo"
          variant="outlined"
          value={label}
          onChange={(e) => {
            setLabel(e.target.value);
          }}
        />
        <TextField
          label="Descrição"
          variant="outlined"
          multiline
          rows={3}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={CardTask}
          style={{ height: 'fit-content' }}
        >
          {!loading ? (
            'Criar'
          ) : (
            <CircularProgress
              style={{ color: '#fff', width: 20, height: 20 }}
            />
          )}
        </Button>
      </div>
    </Dialog>
  );
}

export default CardTask;
