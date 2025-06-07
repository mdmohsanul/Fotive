import { format } from "date-fns";

export  const useDate = () => {
    const getDate = (inputDate: string): string | undefined => {
     if (!inputDate) return;
    const dateFormat = format(inputDate, "yyyy-MM-dd");
    return dateFormat;
    }
    return getDate
  };