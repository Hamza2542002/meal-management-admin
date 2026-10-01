import SidesRadioButtonInput from "../common/SidesRadioButtonInput";

export default function SidesRadioButtonList() {
  return (
    <div>
      <header className="flex justify-between items-center">
        <p className="uppercase text-on-background font-semibold">Choose A SIDE</p>
      </header>
      <div className="grid grid-cols-12 gap-6 my-4">
        <SidesRadioButtonInput text="Extra Truffle Oil" cost={2.5} id='radio1' />
        <SidesRadioButtonInput text="Extra Truffle Oil" cost={2.5} id='radio2' />
        <SidesRadioButtonInput text="Extra Truffle Oil" cost={2.5} id='radio3' />
      </div>
    </div>
  )
}
