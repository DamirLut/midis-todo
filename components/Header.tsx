import { useTheme as useNextTheme } from 'next-themes';
import { Container, Switch, useTheme, Text } from '@nextui-org/react';
import { SunIcon } from './Icons/SunIcon';
import { MoonIcon } from './Icons/MoonIcon';

export default function Header() {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  return (
    <header>
      <Container
        css={{
          backgroundColor: '$colors$primary',
          height: '5vh',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text h3 color="white">
          Midis-ToDo
        </Text>
        <Switch
          id="switch-mode"
          checked={isDark}
          onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
          iconOn={<MoonIcon filled />}
          iconOff={<SunIcon filled />}
        />
      </Container>
    </header>
  );
}
