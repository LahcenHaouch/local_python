import { ExecutionResult } from "./types";

type Props = {
  result: ExecutionResult;
};

const RESULT_DICT = {
  error: "[error]$",
  stderr: "[stderr]$",
  stdout: "$",
} as const;

export default function ExecutionMessage({ result }: Props) {
  return (
    <p>
      <span className="text-sky-600 mr-2">{RESULT_DICT[result.output]}</span>
      {result.msg}
    </p>
  );
}
