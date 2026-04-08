import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("rounded-md bg-card px-2 py-4 ", className)}
      {...props}
    />
  );
}

/**
 * Default justify-end
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mb-4", className)} {...props} />;
}

function CardSplit({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-row w-full justify-between", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("text-card-title", className)} {...props} />;
}

function CardItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("text-sm hover:cursor-default", className)} {...props} />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return <CardItem className={cn("border-1", className)} {...props} />;
}

interface CardFooterProps extends React.ComponentProps<"div"> {
  pos: string;
}

function CardFooter({ className, pos, ...props }: CardFooterProps) {
  return (
    <div
      className={cn(
        `flex flex-row flex-1 ${pos === "end" ? "justify-end" : "justify-start"}`,
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardSplit,
  CardItem,
  CardAction,
  CardTitle,
  CardFooter,
};
