import { Container, User, Text, Button } from '@nextui-org/react';
import Table from '../components/Table';

import Header from 'components/Header';
import { useRecoilState, useRecoilValue } from 'recoil';
import React from 'react';
import CreateTable from 'components/CreateTable';
import Loading from 'components/Loading';
import { ModalAtom } from 'store/modal';
import { setRecoil } from 'recoil-nexus';
import { TableAtom, TableExistAtom } from 'store/table';
import { Fetch } from 'lib/fetch';
import { TableData } from 'lib/api.type';

const Content = () => {
  const [table, setTable] = useRecoilState(TableAtom);
  const [exists, setExists] = useRecoilState(TableExistAtom);

  React.useEffect(() => {
    const getTable = async () => {
      const id = localStorage.getItem('table-id')?.trim();
      if (id) {
        const data = await Fetch<TableData>('https://todo.iky.su/table/get', { id });
        if (!('error' in data)) {
          setTable(data);
          document.title = data.title;
        }
      }
    };

    getTable();
  }, []);

  React.useEffect(() => {
    setExists(!('error' in table));
  }, ['error' in table]);

  return <Container>{exists ? <Table /> : <CreateTable />}</Container>;
};

const users = [
  {
    url: 'https://github.com/Damirlut',
    avatar:
      'https://portal.midis.info/upload/resize_cache/main/780/yncs8n7bvk7vd3q8ri9gv59qi4ovpfu0/200_200_2/livesey2.webp',
    username: 'Лутфрахманов Дамир',
  },
  {
    url: 'https://github.com/Ikysu',
    avatar:
      'https://web.damirlut.online/pirate.gif',
    username: 'Сагабутдинов Даниил',
  },
  {
    url: 'https://github.com/Huinko',
    avatar:
      'https://portal.midis.info/upload/resize_cache/main/a3e/30wu4yipj12oqv6ckxnhax8pwinq2sb0/200_200_2/$RPDBI5D.PNG',
    username: 'Маркин Егор',
  },
];

export default function Main() {
  const modal = useRecoilValue(ModalAtom);
  const [table, setTable] = useRecoilState(TableAtom);
  const [exists, setExists] = useRecoilState(TableExistAtom);

  const exitTable = () => {
    ///@ts-ignore
    setTable({ error: '' });
    localStorage.removeItem('table-id');
    setExists(false);
  };

  return (
    <div id="root">
      <Header />
      <main>
        {modal}
        <React.Suspense fallback={<Loading />}>
          <Content />
        </React.Suspense>
      </main>
      <footer>
        <Container
          id="footer"
          css={{
            minheight: '5vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '$border',
            p: '$2',
            pl: '1em',
            pr: '1em',
          }}>
          <div>
            <Text h5 b>
              Группа П-38
            </Text>
            {users.map((user) => (
              <User key={user.username} src={user.avatar} name={user.username}>
                <User.Link href={user.url}>@{user.url.split('https://github.com/')[1]}</User.Link>
              </User>
            ))}
          </div>
          {exists && (
            <Button color="error" onClick={exitTable} size="md">
              Выйти
            </Button>
          )}
        </Container>
      </footer>
    </div>
  );
}
