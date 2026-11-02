import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FlyerOrderButton({ className }: { className?: string }) {
  return (
    <Button asChild className={cn("h-11 gap-2 bg-primary-dark text-primary-foreground hover:bg-primary-dark/90", className)}>
      <a href="https://alou.com.vc/loja/varejao-das-frutas" target="_blank" rel="noopener noreferrer" aria-label="Fazer pedido">
        <ShoppingCart aria-hidden="true" />
        Fazer pedido
      </a>
    </Button>
  );
}