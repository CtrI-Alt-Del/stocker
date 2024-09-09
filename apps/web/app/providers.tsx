"use client";
import { NextUIProvider } from '@nextui-org/react';
import { ReactNode } from 'react';

export const Providers = ({ children }: { children: ReactNode }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};