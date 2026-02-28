import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const InteractiveHoverButton = React.forwardRef(({ text = "Button", className, ...props }, ref) => {
    return (
        <button
            ref={ref}
            className={cn(
                "group relative w-auto min-w-32 cursor-pointer overflow-hidden rounded-full border bg-background p-3 px-8 text-center font-semibold transition-all duration-300",
                className
            )}
            {...props}
        >
            {/* Texto Inicial */}
            <span className="relative z-20 inline-block transition-all duration-300 group-hover:scale-95 group-hover:opacity-0">
                {text}
            </span>

            {/* Texto no Hover (com Seta) */}
            <div className="absolute inset-0 z-30 flex items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:opacity-100">
                <span className="translate-x-2 transition-all duration-300 group-hover:translate-x-0">{text}</span>
                <ArrowRight className="w-4 h-4 translate-x-2 transition-all duration-300 group-hover:translate-x-0" />
            </div>

            {/* Efeito de Background (Círculo que preenche) */}
            <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-primary opacity-0 transition-all duration-500 group-hover:h-full group-hover:w-full group-hover:scale-[2.5] group-hover:opacity-100 z-10"></div>
        </button>
    );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
