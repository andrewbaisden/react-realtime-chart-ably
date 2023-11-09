'use client';
import * as Ably from 'ably';
import { AblyProvider } from 'ably/react';
import Chart from './components/Chart';
import { NEXT_PUBLIC_API_KEY } from './config/appConfig';

const client = {
  key: NEXT_PUBLIC_API_KEY,
  clientId: 'gcLqBA',
};

const ably = new Ably.Realtime.Promise(client);

export default function Home() {
  return (
    <>
      <AblyProvider client={ably}>
        <Chart />
      </AblyProvider>
    </>
  );
}
