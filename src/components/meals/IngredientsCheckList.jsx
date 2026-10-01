import { Plus } from "lucide-react";
import IngredientCehckInput from "../common/IngredientCehckInput";

export default function IngredientsCheckList() {
  return (
    <div>
      <header className="flex justify-between items-center">
        <p className="uppercase text-on-background font-semibold">Extra Toppings</p>
        <button className="uppercase text-primary font-bold "><Plus size={16} className="inline-block" /> Add New Topping</button>
      </header>
      <div className="grid grid-cols-12 gap-6 my-4">
        <IngredientCehckInput rege text="Extra Truffle Oil" cost={2.5} id='check1' />
        <IngredientCehckInput text="Extra Truffle Oil" cost={2.5} id='check2' />
        <IngredientCehckInput text="Extra Truffle Oil" cost={2.5} id='check3' />
      </div>
    </div>
  )
}
