import { useTheme as useNextTheme } from 'next-themes';
import { Container, Switch, useTheme, Text, Button } from '@nextui-org/react';
import { SunIcon } from './Icons/SunIcon';
import { MoonIcon } from './Icons/MoonIcon';
import { useRecoilValue } from 'recoil';
import { TableExistAtom } from 'store/table';

export default function Header() {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();
  const exists = useRecoilValue(TableExistAtom);

  return (
    <header>
      <Container
        css={{
          backgroundColor: '$colors$primary',
          minheight: '5vh',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text h3 color="white">
          Midis-ToDo
          {exists && <Text color="white">id: {localStorage.getItem('table-id')}</Text>}
        </Text>
        <div>
          <Switch
            id="switch-mode"
            checked={isDark}
            onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
            iconOn={<MoonIcon filled />}
            iconOff={<SunIcon filled />}
          />
        </div>
      </Container>
    </header>
  );
}
