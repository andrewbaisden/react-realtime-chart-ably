'use client';
import * as Ably from 'ably';
import { AblyProvider } from 'ably/react';
import Chart from './components/Chart';
import { ChartProvider } from '../app/Context/ChartContext';

const client = {
  key: process.env.NEXT_PUBLIC_API_KEY,
  clientId: 'gcLqBA',
};

const ably = new Ably.Realtime.Promise(client);

export default function Home() {
  return (
    <>
      <AblyProvider client={ably}>
        <ChartProvider>
          <Chart />
        </ChartProvider>
      </AblyProvider>
    </>
  );
}
