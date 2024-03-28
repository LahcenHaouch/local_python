import { useQuery } from "@tanstack/react-query";
import { loadPyodide } from "pyodide";

export function usePyodide() {
  return useQuery({
    queryKey: ["pyodide"],
    queryFn: () => loadPyodide()
  })
}