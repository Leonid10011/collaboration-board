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

export { SurfaceItem };
