import { Utensils, Tags, Pizza, Soup, Salad, CakeSlice, Coffee, Sandwich } from "lucide-react";

export const CATEGORY_ICONS = [
  { name: "Tags", Icon: Tags },
  { name: "Utensils", Icon: Utensils },
  { name: "Pizza", Icon: Pizza },
  { name: "Soup", Icon: Soup },
  { name: "Salad", Icon: Salad },
  { name: "CakeSlice", Icon: CakeSlice },
  { name: "Coffee", Icon: Coffee },
  { name: "Sandwich", Icon: Sandwich },
];

export function CategoryIcon({ name = "Tags", ...props }) {
  const Icon = CATEGORY_ICONS.find((item) => item.name === name)?.Icon ?? Tags;
  return <Icon {...props} />;
}

export default function CategoryIconPicker({ value, onChange }) {
  return <fieldset>
    <legend className="mb-2 block uppercase text-sm font-medium text-on-surface">REpresentativ icon</legend>
    <ul className="grid grid-cols-4 gap-2 sm:grid-cols-8">
      {CATEGORY_ICONS.map(({ name, Icon }) => <li key={name}>
        <button type="button" role="radio" aria-checked={value === name} aria-label={name} onClick={() => onChange(name)} className={`flex h-11 w-full items-center justify-center rounded-md border ${value === name ? "border-primary bg-primary/10 text-primary ring-2 ring-primary/20" : "border-outline-variant text-on-surface-variant hover:bg-surface-container"}`}>
          <Icon size={19} />
        </button>
      </li>)}
    </ul>
  </fieldset>;
}
