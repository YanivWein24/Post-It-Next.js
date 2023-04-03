"use client";

import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

interface Props {
  children?: ReactNode;
}

const QueryWrapper = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    {/* we cant add the Toaster component in "app" because app is a server component and
    we need to use this inside a client component. "QueryWrapper" is a good place since its
    a client component that wraps all out pages*/}
    {children}
  </QueryClientProvider>
);

export default QueryWrapper;
