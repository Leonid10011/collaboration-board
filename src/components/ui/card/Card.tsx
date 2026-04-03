import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("rounded-md bg-card text-card-foreground", className)}
      {...props}
    />
  );
}

function CardSplit({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-row p-4 w-full justify-between", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-xl font-medium leading-none", className)}
      {...props}
    />
  );
}

function CardItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "text-sm rounded-md hover:cursor-pointer transition-colors duration-150 hover:bg-black/5 py-1 px-2",
        className,
      )}
      {...props}
    />
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
        `flex flex-row flex-1 p-4 ${pos === "end" ? "justify-end" : "justify-start"}`,
        className,
      )}
      {...props}
    />
  );
}

export { Card, CardSplit, CardItem, CardAction, CardTitle, CardFooter };
