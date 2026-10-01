import { DollarSign, Plus } from "lucide-react";

export default function IngredientCheckInput({ text, cost, id }) {
  return (
    <div className="bg-white rounded-md border border-outline-variant col-span-6">
      <label
        htmlFor={id}
        className="
          flex cursor-pointer items-center gap-3
          rounded-md p-3
          bg-white
          has-checked:bg-surface-container
        "
      >
        <input
          type="checkbox"
          id={id}
          className="peer hidden"
        />

        <span
          className=" p-2 rounded-sm bg-transparent border border-outline-varian  peer-checked:bg-primary-container "
        />

        <span>{text}</span>

        {cost && <span className="ml-auto text-secondary-dark text-md font-bold felx items-center">
          <Plus className="inline -m-0.5" size={14} /><DollarSign className="inline -m-0.5" size={14} />{cost}</span>}
      </label>
    </div>
  );
}