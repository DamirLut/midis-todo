import { Button, Card, Modal, Text, Input, Textarea, Dropdown } from '@nextui-org/react';
import { TaskData, TableData } from 'lib/api.type';
import { Fetch } from 'lib/fetch';
import React from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { ModalAtom } from 'store/modal';
import { TableAtom } from 'store/table';

type TaskProps = {
  data: TaskData;
};

export default function Task({ data }: TaskProps) {
  const setModal = useSetRecoilState(ModalAtom);
  return (
    <Card
      isPressable
      isHoverable
      variant="bordered"
      css={{ minHeight: '100px' }}
      onPress={() => setModal(<EditTaskModal data={data} />)}>
      <Card.Header>
        <Text size={18} b>
          {data.name}
        </Text>
      </Card.Header>
      <Card.Body
        css={{
          overflow: 'hidden',
        }}>
        <Text>{data.description}</Text>
      </Card.Body>
    </Card>
  );
}

function EditTaskModal({ data }: TaskProps) {
  const setModal = useSetRecoilState(ModalAtom);
  const [table, setTable] = useRecoilState(TableAtom);
  const [desciprtion, setDescription] = React.useState(data.description);

  const moveTo = async (keys: any) => {
    const response = await Fetch<TableData>('https://todo.iky.su/task/move', {
      table_id: localStorage.getItem('table-id'),
      id: data.id,
      position: table.columns.findIndex((value) => value.name === keys.anchorKey),
    });
    if (!('error' in response)) {
      setTable(response);
      setModal(null);
    }
  };

  return (
    <Modal closeButton open={true} onClose={() => setModal(null)}>
      <Modal.Header>
        <Text>Редактирование</Text>
      </Modal.Header>
      <Modal.Body>
        <Text>
          Задача: <Text h4>{data.name}</Text>
        </Text>
        <Textarea
          value={desciprtion}
          onChange={(e) => setDescription(e.target.value)}
          bordered
          readOnly
          label="Описание"
        />

        <Dropdown>
          <Dropdown.Button flat>Колонка</Dropdown.Button>
          <Dropdown.Menu
            disabledKeys={[table.columns[0].name]}
            selectedKeys={[table.columns[data.column].name]}
            selectionMode="single"
            onSelectionChange={moveTo}>
            {table.columns.map((column) => (
              <Dropdown.Item key={column.name} color={column.color}>
                {column.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Modal.Body>
      <Modal.Footer>
        <Button auto color="success">
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
