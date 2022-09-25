import { Container } from '@nextui-org/react';
import Table from '../components/Table';

import Header from 'components/Header';
import { useRecoilState, useRecoilValue } from 'recoil';
import React from 'react';
import CreateTable from 'components/CreateTable';
import Loading from 'components/Loading';
import { ModalAtom } from 'store/modal';
import { setRecoil } from 'recoil-nexus';
import { TableAtom } from 'store/table';
import { Fetch } from 'lib/fetch';
import { TableData } from 'lib/api.type';

const Content = () => {
  const [table, setTable] = useRecoilState(TableAtom);
  const [exists, setExists] = React.useState(false);

  React.useEffect(() => {
    const getTable = async () => {
      const id = localStorage.getItem('table-id');
      if (id) {
        const data = await Fetch<TableData>('api/table/get', { id });
        if (!('error' in data)) {
          setTable(data);
          document.title = data.title;
        } else {
        }
      }
    };

    getTable();
  }, []);

  React.useEffect(()=>{
    setExists(!('error' in table));
  },['error' in table]);

  return <Container css={{ height: '100%' }}>{exists ? <Table /> : <CreateTable />}</Container>;
};

export default function Main() {
  const modal = useRecoilValue(ModalAtom);

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
          css={{
            height: '5vh',
            backgroundColor: '$colors$neutral',
          }}>
          Делали какие-то JS клоуны
        </Container>
      </footer>
    </div>
  );
}
