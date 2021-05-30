import { Button, Card, CircularProgress, TextField } from '@material-ui/core';
import md5 from 'md5';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  async function login(event) {
    event.preventDefault();
    setLoading(true);
    const response = await api
      .post(`/login`, { username, password: md5(password) })
      .then((response) => {
        sessionStorage.setItem('jwt', response.data.token);
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        setLoading(false);
        window.location.href = '/home';
      })
      .catch((e) => {
        console.log(e);
        enqueueSnackbar(
          'Não foi possivel realizar login, verifique os dados e tente novamente.',
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
    <div style={{ display: 'inline-grid' }}>
      <Card
        style={{
          width: 400,
          height: 400,
          display: 'inline-grid',
          justifyContent: 'space-between',
          marginTop: 50,
        }}
      >
        <div style={{ padding: 20, display: 'inline-grid', width: 360 }}>
          <h3 style={{ width: 'inherit' }}>Login</h3>
          <form
            onSubmit={(event) => login(event)}
            style={{ padding: 20, display: 'inline-grid' }}
          >
            <TextField
              style={{ width: 'inherit' }}
              label={'Username'}
              name={'username'}
              variant={'outlined'}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              style={{ width: 'inherit' }}
              label={'Password'}
              name={'password'}
              variant={'outlined'}
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to="/register">Criar conta</Link>

            <Button
              style={{ height: 'max-content', padding: 10 }}
              variant="contained"
              color="primary"
              type="submit"
            >
              {!loading ? (
                'Entrar'
              ) : (
                <CircularProgress
                  style={{ color: '#fff', width: 20, height: 20 }}
                />
              )}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default Login;
