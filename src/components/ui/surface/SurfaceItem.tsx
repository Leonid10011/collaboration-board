import { cn } from "@/lib/utils";

function SurfaceItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-md hover:cursor-pointer transition-colors duration-150 hover:bg-black/5 py-1 px-2",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Row component for surface items. It is a flex container that arranges its children in a row and applies some padding and hover effects. The position of the row can be customized using the className prop.
 * @param
 * @returns
 */
function SurfaceRow({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-row items-center gap-1 rounded-md hover:cursor-pointer transition-colors duration-150 hover:bg-black/5 py-1 px-2",
        className,
      )}
      {...props}
    />
  );
}

export { SurfaceItem, SurfaceRow };
