import { Container, Loading } from '@nextui-org/react';

export default function LoadingSuspense() {
  return (
    <Loading
      type="points"
      css={{
        dflex: 'center',
        width: '100%',
        height: '100%',
      }}
      loadingCss={{ $$loadingSize: '25px' }}
    />
  );
}
