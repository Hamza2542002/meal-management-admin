import ButtonGroup from "./ButtonGroup";

export default function PageHeader({
  title,
  description,
  buttons = [],
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h1 className="text-4xl font-bold text-primary">
          {title}
        </h1>

        <p className="mt-2 text-md text-on-surface-variant">
          {description}
        </p>
      </div>

      <ButtonGroup buttons={buttons} />
    </div>
  );
}