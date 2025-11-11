import { exchangeRateQueryOptions } from '@/queries/exchangeRate';
import { useCurrencyStore } from '@/stores/currency';
import useShoppingCartStore from '@/stores/shoppingCart';
import Badge from '@/ui-lib/components/badge';
import CurrencyToggle from '@/ui-lib/components/currency-toggle';
import { ArrowLeftIcon, ShoppingCartIcon } from '@/ui-lib/components/icons';
import Logo from '@/ui-lib/components/logo';
import { useSuspenseQuery } from '@tanstack/react-query';
import { objectValues } from '@toss/utils';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Flex, styled } from 'styled-system/jsx';
import { flex } from 'styled-system/patterns';

export function Header() {
  const location = useLocation();

  const currency = useCurrencyStore(state => state.currency);
  const setCurrency = useCurrencyStore(state => state.setCurrency);
  const setExchangeRate = useCurrencyStore(state => state.setExchangeRate);

  const { data: exchangeRateMap } = useSuspenseQuery(exchangeRateQueryOptions());

  useEffect(() => {
    setExchangeRate(exchangeRateMap);
  }, [exchangeRateMap]);

  const shoppingCart = useShoppingCartStore(state => state.shoppingCart);
  const totalItems = objectValues(shoppingCart).reduce((acc, curr) => acc + curr, 0);

  const isRootRoute = location.pathname === '/';

  return (
    <styled.header
      className={flex({
        pos: 'sticky',
        top: 0,
        alignItems: 'center',
        justifyContent: 'space-between',
        h: 14,
        px: 5,
        zIndex: 'docked',
        bg: 'background.01_white',
      })}
    >
      {isRootRoute ? <Logo /> : <BackButton />}
      <Flex alignItems="center" gap={4}>
        <CurrencyToggle value={currency} onValueChange={setCurrency} />
        <ShoppingCartButton totalItems={totalItems} />
      </Flex>
    </styled.header>
  );
}

function BackButton() {
  const navigate = useNavigate();

  return (
    <styled.button onClick={() => navigate(-1)} color="neutral.01_black">
      <ArrowLeftIcon />
    </styled.button>
  );
}

function ShoppingCartButton({ totalItems }: { totalItems: number }) {
  const navigate = useNavigate();

  return (
    <Badge content={totalItems} size="sm" cursor="pointer" onClick={() => navigate('/shopping-cart')}>
      <ShoppingCartIcon size={22} />
    </Badge>
  );
}
