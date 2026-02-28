import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";

function InteractiveHoverButtonDemo() {
    return (
        <div className="flex items-center justify-center p-10 bg-slate-50 dark:bg-zinc-950 rounded-[16px]">
            <div className="relative justify-center">
                <InteractiveHoverButton text="Demo Button" />
            </div>
        </div>
    );
}

export { InteractiveHoverButtonDemo };
