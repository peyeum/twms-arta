'use client'
import { createContext, useContext } from "react"
export const BookingContext = createContext(undefined)
export const useBookingContext = () => useContext(BookingContext)
