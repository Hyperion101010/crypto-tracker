"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CryptoDashboard from "@/components/CryptoDashboard";

const qclient = new QueryClient();

export default function Home({}) {
  return (
    <QueryClientProvider client={qclient}>
    <CryptoDashboard></CryptoDashboard>
    </QueryClientProvider>
  )
}
