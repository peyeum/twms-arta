'use client'
import { createContext, useContext } from "react";
export const ServiceContext = createContext(undefined)
export const useServiceContext = () => useContext(ServiceContext)
