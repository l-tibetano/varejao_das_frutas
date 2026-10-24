import { Button } from "@/components/ui/button";
import { contato } from "@/data/site";
import { cn } from "@/lib/utils";

export function FlyerOrderButton({ className }: { className?: string }) {
  return (
    <Button asChild className={cn("h-11 gap-2 bg-primary-dark text-primary-foreground hover:bg-primary-dark/90", className)}>
      <a href={contato.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Pedir agora pelo WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.52 3.48A11.91 11.91 0 0 0 12.05 0C5.47 0 .12 5.35.12 11.93c0 2.1.55 4.15 1.6 5.95L0 24l6.28-1.65a11.93 11.93 0 0 0 5.77 1.47h.01C18.63 23.82 24 18.47 24 11.89c0-3.18-1.24-6.17-3.48-8.41ZM12.06 21.8a9.86 9.86 0 0 1-5.03-1.38l-.36-.22-3.73.98 1-3.64-.24-.38a9.89 9.89 0 0 1-1.52-5.23c0-5.46 4.44-9.9 9.88-9.9a9.84 9.84 0 0 1 7 2.9 9.84 9.84 0 0 1 2.9 7c0 5.45-4.45 9.87-9.9 9.87Zm5.43-7.39c-.3-.15-1.76-.87-2.03-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.8-1.49-1.79-1.66-2.09-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35Z" />
        </svg>
        Pedir agora
      </a>
    </Button>
  );
}