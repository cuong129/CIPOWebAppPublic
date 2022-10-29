// Chakra imports
import {
  Flex,
  Grid,
  Image,
  SimpleGrid,
  useColorModeValue,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
// assets
import peopleImage from 'assets/img/people-image.png';
import { Chart, Line } from 'react-chartjs-2';
// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from 'components/Icons/Icons';
import React from 'react';

import { Card, CardBody } from 'components/Card';
import 'chart.js/auto';

import { Column, useTable } from 'react-table';
import { data } from 'variables/data';
import { firms } from 'variables/firm';

const CustomTable = ({ columns, data }: any) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  return (
    <TableContainer>
      <Table {...getTableProps()} variant='simple' bg='white'>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()} textAlign='center'>
                  {column.render('Header')}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()} textAlign='center'>
                      {cell.render('Cell')}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
const genData = () => {
  return data.map((item, index) => {
    const {
      st13applicationnumber,
      markeventdate,
      markeventcode,
      markeventresponsedate,
      markeventdescriptiontext,
      markeventadditionaltext,
    } = item._source;
    return {
      st13applicationnumber: st13applicationnumber.slice(6, 12),
      markeventdate,
      markeventcode,
      markeventresponsedate,
      markeventdescriptiontext,
      markeventadditionaltext,
    };
  });
};
export default function LossGainFirm() {
  const textColor = useColorModeValue('gray.700', 'white');
  const data = React.useMemo(() => genData(), []);
  const [appointedCount, setAppointedCount] = React.useState(0);
  const [revokedCount, setRevokedCount] = React.useState(0);
  const [appointedList, setAppointedList] = React.useState<any[]>([]);
  const [revokedList, setRevokedList] = React.useState<any[]>([]);

  React.useEffect(() => {
    //calculate appointed and revoked data
    const tempAppointedData = new Map();
    const tempRevokedData = new Map();
    let appointedCount = 0;
    let revokedCount = 0;
    data.forEach((item, key) => {
      // @ts-ignore: Object is possibly 'null'.
      const from_agent = item.markeventadditionaltext
        .match(/(?<=From:|From\/De:|De:)\s*\d*\s*(?=[A-Z][a-z])/)[0]
        .trim();
      // @ts-ignore: Object is possibly 'null'.
      const to_agent = item.markeventadditionaltext
        .match(/(?<=To:|To\/A:|A:)\s*\d*\s*(?=\/|)/)[0]
        .trim();
      //get date event
      const event_date = item.markeventdate;
      if (from_agent === '16080') {
        revokedCount += 1;
        if (tempRevokedData.has(to_agent)) {
          tempRevokedData.set(to_agent, tempRevokedData.get(to_agent) + 1);
        } else {
          tempRevokedData.set(to_agent, 1);
        }
      } else if (to_agent === '16080') {
        appointedCount += 1;
        if (tempAppointedData.has(from_agent)) {
          tempAppointedData.set(
            from_agent,
            tempAppointedData.get(from_agent) + 1
          );
        } else {
          tempAppointedData.set(from_agent, 1);
        }
      }
    });

    setAppointedCount(appointedCount);
    setRevokedCount(revokedCount);
    const lst1 = Array.from(tempAppointedData.entries())
      .sort((a: any, b: any) => {
        return b[1] - a[1];
      })
      .map((item) => {
        return {
          agentId: item[0] === '' ? 'None' : item[0],
          count: item[1],
        };
      });
    console.log(lst1);
    setAppointedList(lst1);
    const lst2 = Array.from(tempRevokedData.entries())
      .sort((a: any, b: any) => {
        return b[1] - a[1];
      })
      .map((item) => {
        return {
          agentId: item[0] === '' ? 'None' : item[0],
          count: item[1],
        };
      });
    setRevokedList(lst2);
    console.log(lst2);
  }, []);

  const getListColor = (length: number) => {
    let result = [];
    for (let i = 0; i < length; i++) {
      result.push('hsl(' + (i / length) * 360 + ', 50%, 50%)');
    }
    return result;
  };
  const getPieChartData = (list: any[]) => {
    const labels = list.map((x) => firms[x.agentId as keyof typeof firms]);
    const data = list.map((x) => x.count);
    const backgroundColor = getListColor(list.length);
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor,
        },
      ],
    };
  };
  const columns = React.useMemo<Column<{}>[]>(
    () => [
      {
        Header: 'Application Number',
        accessor: 'st13applicationnumber',
      },
      {
        Header: 'Action Date',
        accessor: 'markeventdate',
      },
      {
        Header: 'Event Code',
        accessor: 'markeventcode',
      },
      {
        Header: 'Response Deadline',
        accessor: 'markeventresponsedate',
      },
      {
        Header: 'Event Name',
        accessor: 'markeventdescriptiontext',
      },
      {
        Header: 'Description',
        accessor: 'markeventadditionaltext',
      },
    ],
    []
  );
  return (
    <Flex flexDirection='column' pt={{ base: '120px', md: '75px' }}>
      <InputGroup mb={{ lg: '26px' }}>
        <InputLeftElement
          pointerEvents='none'
          children={<SearchIcon color='gray.300' />}
        />
        <Input
          variant={'filled'}
          py='11px'
          bg='white'
          borderRadius='14px'
          boxShadow={'xs'}
        />
      </InputGroup>
      {/* <SimpleGrid columns={2} spacing={10} mb={10}>
        <Card>
          <CardBody>
            <Flex flex='1' justify='center'>
              <Chart
                type='pie'
                data={getPieChartData(appointedList)}
                width={500}
                height={250}
                options={{
                  maintainAspectRatio: false,
                  responsive: false,
                  plugins: {
                    title: {
                      display: true,
                      text: 'Appointed Statistic',
                      position: 'bottom',
                    },
                    legend: {
                      display: true,
                      position: 'right',
                    },
                  },
                }}
              />
            </Flex>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Flex flex='1' justify='center'>
              <Chart
                type='pie'
                data={getPieChartData(revokedList)}
                width={500}
                height={250}
                options={{
                  maintainAspectRatio: false,
                  responsive: false,
                  plugins: {
                    title: {
                      display: true,
                      text: 'Revoked Statistic',
                      position: 'bottom',
                    },
                    legend: {
                      display: true,
                      position: 'right',
                    },
                  },
                }}
              />
            </Flex>
          </CardBody>
        </Card>
      </SimpleGrid>
      <Card>
        <Line
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
              {
                label: 'Appointed',
                data: [33, 53, 85, 41, 44, 65],
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
              },
              {
                label: 'Revoked',
                data: [33, 25, 35, 51, 54, 76],
                borderColor: '#742774',
              },
            ],
          }}
          options={{
            responsive: true,
          }}
        />
      </Card> */}
      <Grid templateColumns={'1fr 2fr'} mb={10} gap={10}>
        <Grid gap='20px'>
          <Card>
            <Flex justify={'center'}>
              <Chart
                type='pie'
                data={getPieChartData(appointedList)}
                width={450}
                height={200}
                options={{
                  maintainAspectRatio: false,
                  responsive: false,
                  plugins: {
                    title: {
                      display: true,
                      text: 'Appointed Statistic',
                      position: 'bottom',
                    },
                    legend: {
                      display: true,
                      position: 'right',
                    },
                  },
                }}
              />
            </Flex>
          </Card>
          <Card>
            <Flex justify={'center'}>
              <Chart
                type='pie'
                data={getPieChartData(revokedList)}
                width={450}
                height={200}
                options={{
                  maintainAspectRatio: false,
                  responsive: false,
                  plugins: {
                    title: {
                      display: true,
                      text: 'Revoked Statistic',
                      position: 'bottom',
                    },
                    legend: {
                      display: true,
                      position: 'right',
                    },
                  },
                }}
              />
            </Flex>
          </Card>
        </Grid>
        <Card>
          <Flex pl={10} pr={10}>
            <Line
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                  {
                    label: 'Appointed',
                    data: [33, 53, 85, 41, 44, 65],
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    borderColor: 'rgba(75,192,192,1)',
                  },
                  {
                    label: 'Revoked',
                    data: [33, 25, 35, 51, 54, 76],
                    borderColor: '#742774',
                  },
                ],
              }}
              options={{
                responsive: true,
              }}
            />
          </Flex>
        </Card>
      </Grid>
      <CustomTable columns={columns} data={data} />
    </Flex>
  );
}
