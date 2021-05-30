import { Button, Card, CircularProgress, TextField } from '@material-ui/core';
import md5 from 'md5';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

function Register() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  async function register(event) {
    event.preventDefault();
    setLoading(true);
    await api
      .post(`/register`, {
        username,
        password: md5(password),
        name,
        email,
      })
      .then(() => {
        enqueueSnackbar('Conta criada com sucesso, prossiga para o login.', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });

        window.location.href = '/';
      })
      .catch((e) => {
        enqueueSnackbar(
          'Não foi possivel criar a conta verifique os dados e tente novamente.',
          {
            variant: 'error',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
          }
        );
      });

    setLoading(false);
  }

  return (
    <Card
      style={{
        width: 400,
        height: 500,
        display: 'inline-grid',
        justifyContent: 'space-between',
        marginTop: 50,
      }}
    >
      <div style={{ padding: 20, display: 'inline-grid', width: 360 }}>
        <h3 style={{ width: 'inherit' }}>Sign Up</h3>
        <form
          style={{ padding: 20, display: 'inline-grid' }}
          onSubmit={(event) => register(event)}
        >
          <TextField
            style={{ width: 'inherit' }}
            label={'Name'}
            variant={'outlined'}
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            style={{ width: 'inherit' }}
            label={'Username'}
            variant={'outlined'}
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            style={{ width: 'inherit' }}
            label={'Email'}
            variant={'outlined'}
            value={email}
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            style={{ width: 'inherit' }}
            label={'Password'}
            variant={'outlined'}
            value={password}
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/">Já possuo conta</Link>
          <Button
            style={{ height: 'max-content', padding: 10 }}
            variant="contained"
            color="primary"
            type="submit"
          >
            {!loading ? (
              'Sign Up'
            ) : (
              <CircularProgress
                style={{ color: '#fff', width: 20, height: 20 }}
              />
            )}
          </Button>
        </form>
      </div>
    </Card>
  );
}

export default Register;
