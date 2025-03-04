"use client"

import { QueryClientProvider, QueryClient } from "react-query"
import { useState } from "react"


export default function QueryProvider({children}){
    const queryClient = useState(() => new QueryClient());
    return <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>
}