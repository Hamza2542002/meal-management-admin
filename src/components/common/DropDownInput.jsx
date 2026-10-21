import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function DropDownInput({ label, options = [], value, onChange, setValue, error, className }) {
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

  const getOptionValue = (option) => typeof option === "string"
    ? option
    : option.value ?? option.id ?? option.name;
  const getOptionLabel = (option) => typeof option === "string"
    ? option
    : option.label ?? option.name;
  const selectedOption = options.find((option) => getOptionValue(option) === selectedValue);
  const displayedLabel = selectedOption ? getOptionLabel(selectedOption) : label;

  function handleSelect(option) {
    const nextValue = getOptionValue(option);
    setInternalValue(nextValue);
    if (setValue) {
      setValue("category", nextValue, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
    onChange?.(nextValue);
    setIsOpen(false);
  }

  return (
    <>
      <div ref={dropdownRef} className="relative w-full duration-500 ">
        <button
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          // className="inline-flex w-full items-center justify-between border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-300"
          className="h-10 inline-flex items-center justify-between  rounded-md border border-outline-variant bg-background px-3 text-sm text-on-surface outline-none focus:border-primary w-full"

          onClick={() => setIsOpen((open) => !open)}
          type="button">
          <span>{displayedLabel}</span>
          <ChevronDown size={18} className={isOpen ? "rotate-180 inline" : "inline"} />
        </button>

        <div className={`absolute left-0 top-full max-h-50 overflow-scroll no-scrollbar z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg ${isOpen ? "block" : "hidden"}`}>
          <ul className="p-1 text-sm font-medium text-gray-700" role="listbox">
            {options.map((option, index) => {
              const optionValue = getOptionValue(option);
              const optionLabel = getOptionLabel(option);

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
