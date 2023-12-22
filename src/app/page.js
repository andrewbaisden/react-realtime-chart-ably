'use client';
import * as Ably from 'ably';
import { AblyProvider } from 'ably/react';
import Chart from './components/Chart';
import { ChartProvider } from '../app/Context/ChartContext';

const client = new Ably.Realtime.Promise({ authUrl: '/api/ably/' });

export default function Home() {
  return (
    <>
      <AblyProvider client={client}>
        <ChartProvider>
          <Chart />
        </ChartProvider>
      </AblyProvider>
    </>
  );
}
