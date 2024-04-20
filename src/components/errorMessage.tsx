import { RotateCcw } from "lucide-react";

export default function ErrorMessage() {
  function handleClick() {
    window.location.reload();
  }

  return (
    <div className="w-full flex flex-col items-center mt-10 gap-3 text-[#1d2a42c4] font-semibold">
      <div>Algo ha salido mal, inténtelo nuévamente</div>
      <button
        onClick={handleClick}
        className="outline outline-[1px] flex gap-3 items-center justify-center px-2 py-[0.17rem] rounded-xl outline-[#b3b3b3]"
      >
        recargar <RotateCcw className="w-[0.85rem]" />
      </button>
    </div>
  );
}
