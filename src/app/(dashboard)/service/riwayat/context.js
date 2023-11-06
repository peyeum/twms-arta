'use client'
import { createContext, useContext } from "react";
export const RiwayatServiceContext = createContext(undefined)
export const useRiwayatServiceContext = () => useContext(RiwayatServiceContext)
