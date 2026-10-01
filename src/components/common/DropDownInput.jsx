import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function DropDownInput({ label, options = [], value, onChange, setValue, error }) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState("");
  const dropdownRef = useRef(null);
  const selectedValue = value ?? internalValue;

  useEffect(() => {
    function handleDocumentClick(event) {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const selectedOption = options.find((option) => {
    const optionValue = typeof option === "string" ? option : option.name;
    return optionValue === selectedValue;
  });
  const displayedLabel = selectedOption
    ? typeof selectedOption === "string"
      ? selectedOption
      : selectedOption.name
    : label;

  function handleSelect(option) {
    const nextValue = typeof option === "string" ? option : option.name;
    setInternalValue(nextValue);
    setValue("category", nextValue, {
      shouldDirty: true,
      shouldValidate: true,
    });
    onChange?.(nextValue);
    setIsOpen(false);
    console.log("DropDownInput.handleSelect() nextValue:", nextValue);
  }

  return (
    <>
      <div ref={dropdownRef} className="relative w-full">
        <button
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className="inline-flex w-full items-center justify-between border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-300"
          onClick={() => setIsOpen((open) => !open)}
          type="button">
          <span>{displayedLabel}</span>
          <ChevronDown size={18} className={isOpen ? "rotate-180" : ""} />
        </button>

        <div className={`absolute left-0 top-full z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg ${isOpen ? "block" : "hidden"}`}>
          <ul className="p-1 text-sm font-medium text-gray-700" role="listbox">
            {options.map((option, index) => {
              const optionValue = typeof option === "string" ? option.id : option.id;
              const optionLabel = typeof option === "string" ? option.name : option.name;

              return (
                <li key={index}>
                  <button
                    aria-selected={optionValue === selectedValue}
                    className="inline-flex w-full items-center rounded p-2 text-left hover:bg-gray-100"
                    onClick={() => handleSelect(option)}
                    role="option"
                    type="button">
                    {optionLabel}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-error">{error.message}</p>}
    </>
  )
}
