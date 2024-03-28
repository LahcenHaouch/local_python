type Output = "stderr" | "stdout" | "error";

export type ExecutionResult = {
  id: string;
  msg: string;
  output: Output;
};