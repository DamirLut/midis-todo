import React from 'react';
import { Button, Card, Grid, Input, Text } from '@nextui-org/react';
import { useSetRecoilState } from 'recoil';
import { TableAtom } from 'store/table';
import { Fetch } from 'lib/fetch';
import { TableData } from 'lib/api.type';

export default function CreateTable() {
  const [createName, setCreateName] = React.useState('');
  const [joinName, setJoinName] = React.useState('');
  const setTable = useSetRecoilState(TableAtom);

  const create = async () => {
    if (createName) {
      const data = await Fetch<{ id: string }>('api/table/create', { name: createName });
      if ('id' in data) {
        localStorage.setItem('table-id', data.id);
        const table = await Fetch<TableData>('api/table/get', { id: data.id });
        if (!('error' in table)) setTable(table);
      }
    }
  };
  const join = async () => {
    if (joinName) {
      const table = await Fetch<TableData>('api/table/get', { id: joinName });
      if ('error' in table) {
        return alert('Таблица не найдена');
      }
      localStorage.setItem('table-id', joinName);
      setTable(table);
    }
  };

  return (
    <Grid.Container justify="space-around" alignItems="center" css={{ height: '100%' }}>
      <Grid xs={5}>
        <Card>
          <Card.Header css={{ bg: '$colors$warning' }}>
            <Text h3>Создать новую таблицу</Text>
          </Card.Header>
          <Card.Body>
            <Input label="Название" bordered onChange={(e) => setCreateName(e.target.value)} />
          </Card.Body>
          <Card.Footer>
            <Button color="warning" onClick={create}>
              Создать
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
            <Button color="success" onClick={join}>
              Войти
            </Button>
          </Card.Footer>
        </Card>
      </Grid>
    </Grid.Container>
  );
}
