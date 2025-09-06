import { useEffect, useState } from "react";
import { Flex, Stack, styled } from "styled-system/jsx";
import { Spacing, Text, type CurrencyType } from "@/ui-lib";
import { DeliveryIcon, RocketIcon } from "@/ui-lib/components/icons";
import { useSuspenseQuery } from "@tanstack/react-query";
import { gradeShippingQueryOptions, type GradeShipping } from "@/queries/grade";
import { meQueryOptions } from "@/queries/me";
import { useCurrencyStore } from "@/stores/currency";
import { exchangeRateQueryOptions } from "@/queries/exchangeRate";
import { formatPrice } from "@/utils/price";

interface DeliveryMethodSectionProps {
  totalPrice: number;
  onChangeShippingFee: (shippingFee: number) => void;
}

function DeliveryMethodSection({ totalPrice, onChangeShippingFee }: DeliveryMethodSectionProps) {
  const { currency } = useCurrencyStore();
  const { data: exchangeRateMap } = useSuspenseQuery(exchangeRateQueryOptions());
  const exchangeRate = exchangeRateMap[currency];

  const { data: gradeShipping } = useSuspenseQuery(gradeShippingQueryOptions());
  const { data: me } = useSuspenseQuery(meQueryOptions());

  const [selectedDeliveryMethod, setSelectedDeliveryMethod] =
    useState<string>("Express");
  const selectedDelivery = gradeShipping.find((shipping) => shipping.type === me.grade) as GradeShipping;


  const isFreeShipping = totalPrice >= selectedDelivery.freeShippingThreshold;
  const premiumFreeShipping = isFreeShipping ? 0 : selectedDelivery.shippingFee;

  useEffect(() => {
    onChangeShippingFee(selectedDeliveryMethod === "Express" ? 0 : premiumFreeShipping);
  }, [selectedDeliveryMethod, premiumFreeShipping, onChangeShippingFee]);

  return (
    <styled.section css={{ p: 5, bgColor: "background.01_white" }}>
      <Text variant="H2_Bold">배송 방식</Text>

      <Spacing size={4} />

      <Stack gap={4}>
        <DeliveryItem
          title="Express"
          description="3-5일 후 도착 예정"
          icon={<DeliveryIcon size={28} />}
          price={0}
          currency={currency}
          isSelected={selectedDeliveryMethod === "Express"}
          onClick={() => setSelectedDeliveryMethod("Express")}
        />
        <DeliveryItem
          title="Premium"
          description="당일 배송"
          icon={<RocketIcon size={28} />}
          price={premiumFreeShipping * exchangeRate}
          currency={currency}
          isSelected={selectedDeliveryMethod === "Premium"}
          onClick={() => setSelectedDeliveryMethod("Premium")}
        />
      </Stack>
    </styled.section>
  );
}

function DeliveryItem({
  title,
  description,
  icon,
  price,
  currency,
  isSelected,
  onClick,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  price: number;
  currency: CurrencyType;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <Flex
      gap={3}
      css={{
        alignItems: "center",
        p: 5,
        py: 4,
        bgColor: isSelected ? "primary.01_primary" : "background.02_light-gray",
        transition: "background-color 0.3s ease",
        rounded: "2xl",
        color: isSelected ? "neutral.05_white" : "neutral.01_black",
        cursor: "pointer",
      }}
      role="button"
      onClick={onClick}
    >
      {icon}

      <Flex flexDir="column" gap={1} flex={1}>
        <Text
          variant="B2_Regular"
          fontWeight={"semibold"}
          color={isSelected ? "neutral.05_white" : "neutral.01_black"}
        >
          {title}
        </Text>
        <Text
          variant="C2_Medium"
          color={isSelected ? "neutral.05_white" : "neutral.02_gray"}
        >
          {description}
        </Text>
      </Flex>
      <Text
        variant="B2_Medium"
        fontWeight={"semibold"}
        color={isSelected ? "neutral.05_white" : "neutral.01_black"}
      >
        {price ? `${formatPrice(price, currency)}` : "무료"}
      </Text>
    </Flex>
  );
}

export default DeliveryMethodSection;
