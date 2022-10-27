// Chakra imports
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import { Card, CardBody, CardHeader } from 'components/Card';
import TimelineRow from 'components/Tables/TimelineRow';
import React from 'react';

interface typeProps {
  title: string;
  amount: number;
  data: any;
}
const OrdersOverview = ({ title, amount, data }: typeProps) => {
  const textColor = useColorModeValue('gray.700', 'white');

  return (
    <Card maxH='100%'>
      <CardHeader p='22px 0px 35px 14px'>
        <Flex direction='column'>
          <Text fontSize='lg' color={textColor} fontWeight='bold' pb='.5rem'>
            {title}
          </Text>
          <Text fontSize='sm' color='gray.400' fontWeight='normal'>
            <Text fontWeight='bold' as='span' color='teal.300'>
              {`${amount}%`}
            </Text>{' '}
            this month.
          </Text>
        </Flex>
      </CardHeader>
      <CardBody ps='20px' pe='0px' mb='31px' position='relative'>
        <Flex direction='column'>
          {data.map((row: any, index: number, arr: any) => {
            return (
              <TimelineRow
                key={row.title}
                logo={row.logo}
                title={row.title}
                date={row.date}
                color={row.color}
                index={index}
                arrLength={arr.length}
              />
            );
          })}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default OrdersOverview;
