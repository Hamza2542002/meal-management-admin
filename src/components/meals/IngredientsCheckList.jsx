import { Plus } from "lucide-react";
import IngredientCehckInput from "../common/IngredientCehckInput";
import { useAtom } from "jotai";
import { setSelectedToppingsAtom } from "../../atoms/meals/mealAtoms";
import { toppingsAtom } from "../../atoms/meals/toppingAtom";

export default function IngredientsCheckList({ register }) {
  const [toppings] = useAtom(toppingsAtom);
  const [_, setToppings] = useAtom(setSelectedToppingsAtom);
  return (
    <div>
      <header className="flex justify-between items-center">
        <p className="uppercase text-on-background font-semibold">Extra Toppings</p>
        <button className="uppercase text-primary font-bold "><Plus size={16} className="inline-block" /> Add New Topping</button>
      </header>
      <div className="grid grid-cols-12 gap-6 my-4">
        {
          toppings.map((topping, index) => (
            <IngredientCehckInput
              key={index}
              text={topping.name}
              cost={topping.cost}
              id={`check${index}`}
              register={{ ...register, onchange: (e) => setToppings(e) }}
            />
          ))
        }
      </div>
    </div>
  )
}
