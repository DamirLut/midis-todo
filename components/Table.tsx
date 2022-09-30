import { Grid } from '@nextui-org/react';
import { useRecoilValue } from 'recoil';
import { TableAtom, TableExistAtom } from 'store/table';
import Column from './Column';

export default function Table() {
  const table = useRecoilValue(TableAtom);
  const exists = useRecoilValue(TableExistAtom);

  return (
    <Grid.Container gap={2} justify="center" id="grid-columns">
      {exists &&
        table.columns.map((column) => (
          <Grid key={column.name} xs={3}>
            <Column data={column} />
          </Grid>
        ))}
    </Grid.Container>
  );
}
