export default function ButtonGroup({ buttons = [] }) {
  return (
    <div className="flex items-center gap-3">
      {buttons.map((button, index) => {
        const Icon = button.icon;

        return (
          <button
            key={button.id ?? index}
            type={button.type ?? "button"}
            onClick={button.onClick}
            className={`
              inline-flex items-center gap-2
              rounded-md
              px-4 py-3
              text-sm font-semibold
              transition-colors
              text-on-primary 
              bg-${button.mode}
            `}
          >
            {Icon && <Icon size={18} />}
            {button.text}
          </button>
        );
      })}
    </div>
  );
}