import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store as ReduxStore } from "@/redux/store";

interface ProviderProps {
  children: ReactNode;
}

export function ReduxProvider({ children }: ProviderProps) {
  return <Provider store={ReduxStore}>{children}</Provider>;
}
