import { useQuery } from "@tanstack/react-query";

export function usePyodide() {
  return useQuery({
    queryKey: ["pyodide"],
    queryFn: loadPyodide
  })
}