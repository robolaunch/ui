import { MdContentCopy } from "react-icons/md";
import { toast } from "sonner";

interface ITextCopy {
  text: string;
}

export default function TextCopy({ text }: ITextCopy) {
  function handleCopy() {
    toast.success("Copied token to clipboard");
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="flex w-36 justify-between rounded border border-light-200 px-2 py-1.5">
      <p className="w-fit text-xs text-light-700">
        {text?.substring(0, 14)}...
      </p>
      <button
        className="transition-300 w-fit text-light-500 hover:text-green-600"
        onClick={() => handleCopy()}
      >
        <MdContentCopy />
      </button>
    </div>
  );
}
