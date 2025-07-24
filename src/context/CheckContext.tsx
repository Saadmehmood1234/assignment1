import { createContext, useContext, useState, type ReactNode } from "react";
import React from "react";
interface CheckBoxType {
  id: string;
  isChecked: boolean;
}
interface CheckContextType {
  checkData: CheckBoxType[];
  setCheckData: React.Dispatch<React.SetStateAction<CheckBoxType[]>>;
}
const CheckContext = createContext<CheckContextType | undefined>(undefined);
export const CheckProvider = ({ children }: { children: ReactNode }) => {
  const [checkData, setCheckData] = useState<CheckBoxType[]>([]);
  return (
    <CheckContext.Provider value={{ checkData, setCheckData }}>
      {children}
    </CheckContext.Provider>
  );
};

export const useCheckContext = () => {
  const context = useContext(CheckContext);
  if (!context) {
    throw new Error("useCheckContext must be used within a CheckProvider");
  }
  return context;
};
