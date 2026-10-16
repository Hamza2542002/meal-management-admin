import { useAtom } from "jotai";
import SidesRadioButtonInput from "../common/SidesRadioButtonInput";
import { sidesAtom } from "../../atoms/meals/sidesAtom";

export default function SidesRadioButtonList({ register }) {
  const [sides] = useAtom(sidesAtom);
  return (
    <div>
      <header className="flex justify-between items-center">
        <p className="uppercase text-on-background font-semibold">Choose A SIDE</p>
      </header>
      <div className="grid grid-cols-12 gap-6 my-4">
        {
          sides.map((side, index) => (
            <SidesRadioButtonInput key={index} text={side.name} cost={side.cost} id={`radio${index}`} register={register} />
          ))
        }
      </div>
    </div>
  )
}
