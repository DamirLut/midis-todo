import React from 'react';
import { Button, Card, Grid, Input, Loading, Text } from '@nextui-org/react';
import { useSetRecoilState } from 'recoil';
import { TableAtom } from 'store/table';
import { Fetch } from 'lib/fetch';
import { TableData } from 'lib/api.type';

export default function CreateTable() {
  const [createName, setCreateName] = React.useState('');
  const [joinName, setJoinName] = React.useState('');
  const setTable = useSetRecoilState(TableAtom);
  const [loading, setLoading] = React.useState(false);

  const create = async () => {
    if (createName) {
      setLoading(true);
      const data = await Fetch<{ id: string }>('https://todo.iky.su/table/create', {
        name: createName,
      });
      if ('id' in data) {
        localStorage.setItem('table-id', data.id);
        setTimeout(async () => {
          const table = await Fetch<TableData>('https://todo.iky.su/table/get', { id: data.id });
          if (!('error' in table)) setTable(table);
          setLoading(false);
        }, 1000);
      }
    }
  };
  const join = async () => {
    if (joinName) {
      setLoading(true);
      const table = await Fetch<TableData>('https://todo.iky.su/table/get', {
        id: joinName.trim(),
      });
      setLoading(false);
      if ('error' in table) {
        return alert('Таблица не найдена');
      }
      localStorage.setItem('table-id', joinName.trim());
      setTable(table);
    }
  };

  return (
    <Grid.Container
      justify="space-around"
      alignItems="center"
      css={{ height: '100%', mt: '1em', mb: '1em' }}
      id="create-table">
      <Grid xs={5}>
        <Card>
          <Card.Header css={{ bg: '$colors$warning' }}>
            <Text h3>Создать новую таблицу</Text>
          </Card.Header>
          <Card.Body>
            <Input label="Название" bordered onChange={(e) => setCreateName(e.target.value)} />
          </Card.Body>
          <Card.Footer>
            <Button disabled={loading} color="warning" onClick={create}>
              {loading ? <Loading type="points" color="currentColor" size="sm" /> : 'Создать'}
            </Button>
          </Card.Footer>
        </Card>
      </Grid>
      <Grid xs={5}>
        <Card>
          <Card.Header css={{ bg: '$colors$success' }}>
            <Text h3>Присоедниться к таблице</Text>
          </Card.Header>
          <Card.Body>
            <Input label="id" bordered onChange={(e) => setJoinName(e.target.value)} />
          </Card.Body>
          <Card.Footer>
            <Button disabled={loading} color="success" onClick={join}>
              {loading ? <Loading type="points" color="currentColor" size="sm" /> : 'Войти'}
            </Button>
          </Card.Footer>
        </Card>
      </Grid>
    </Grid.Container>
  );
}
