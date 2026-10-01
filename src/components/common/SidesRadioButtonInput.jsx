import { DollarSign, Plus } from "lucide-react";

export default function SidesRadioButtonInput({ id, text, cost }) {
  return (
    <div className="bg-white rounded-md border border-outline-variant col-span-12">
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
          type="radio"
          id={id}
          className="peer hidden"
          name="sides"
        />

        <span
          className="h-5 w-5 border-6 rounded-full bg-white border-outline-variant  peer-checked:border-primary-container"
        />

        <span>{text}</span>

        {cost && <span className="ml-auto text-secondary-dark text-md font-bold felx items-center">
          <Plus className="inline -m-0.5" size={14} /><DollarSign className="inline -m-0.5" size={14} />{cost}</span>}
      </label>
    </div>
  )
}
