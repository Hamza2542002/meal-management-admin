export default function ToggleInput({ checked, onChange, id }) {
  return (
    <label
      htmlFor={id}
      className="group relative inline-flex cursor-pointer"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />

      <div
        className="
          relative
          h-6 w-11
          rounded-full
          bg-outline-variant
          transition-colors
          group-has-checked:bg-[#08431d]
        "
      >
        <div
          className="
            absolute
            left-1 top-1
            h-4 w-4
            rounded-full
            bg-white
            transition-transform duration-200
            group-has-checked:translate-x-5
          "
        />
      </div>
    </label>
  );
}