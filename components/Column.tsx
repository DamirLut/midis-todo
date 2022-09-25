import { Button, Card, Text, Modal, Input, Textarea } from '@nextui-org/react';
import { ColumnData, TableData, TaskData } from 'lib/api.type';
import { Plus } from 'react-iconly';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { ModalAtom } from 'store/modal';
import Task from './Task';
import React from 'react';
import { TableAtom } from 'store/table';
import { Fetch } from 'lib/fetch';

type ColumnProps = {
  data: ColumnData;
};

export default function Column({ data }: ColumnProps) {
  return (
    <Card css={{ $$cardColor: '$colors$' + data.color }}>
      <Card.Header
        css={{
          dflex: 'center',
        }}>
        <Text size={24} b color="white">
          {data.name}
        </Text>
        {data.main && <CreateTaskButton />}
      </Card.Header>
      <Card.Divider />
      <Card.Body
        id="column"
        css={{
          gap: '$5',
          h: '80vh',
        }}>
        {data.tasks.map((task) => (
          <Task data={task} key={task.id} />
        ))}
      </Card.Body>
    </Card>
  );
}

function CreateTaskButton() {
  const setModal = useSetRecoilState(ModalAtom);

  const showModal = () => {
    setModal(<ModalCreate />);
  };
  return (
    <Button
      css={{ ml: '1em' }}
      auto
      flat
      color="primary"
      icon={<Plus filled />}
      onClick={showModal}
    />
  );
}

const ModalCreate = () => {
  const setModal = useSetRecoilState(ModalAtom);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const tableId = localStorage.getItem('table-id') || '';
  const [table, setTable] = useRecoilState(TableAtom);

  const createTask = async () => {
    const data = await Fetch<TaskData>('api/task/create', { table_id: tableId, name, description });
    if (!('error' in data)) {
      const copy: TableData = JSON.parse(JSON.stringify(table));
      console.log(copy);
      copy.columns[0].tasks.push(data);
      setTable(copy);
      setModal(null);
    }
  };

  return (
    <Modal closeButton onClose={() => setModal(null)} open={true}>
      <Modal.Header>
        <Text size={18}>Создать задачу</Text>
      </Modal.Header>
      <Modal.Body>
        <Input bordered fullWidth label="Название" onChange={(e) => setName(e.target.value)} />
        <Textarea
          bordered
          fullWidth
          label="Описание"
          onChange={(e) => setDescription(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          auto
          color="success"
          onClick={createTask}
          disabled={name === '' && description === ''}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
