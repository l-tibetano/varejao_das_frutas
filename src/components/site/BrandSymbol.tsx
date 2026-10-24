import logoAsset from "@/assets/logo-varejao.png.asset.json";
import { cn } from "@/lib/utils";

/** Símbolo do Varejão das Frutas (só o desenho, sem o nome), usado onde a marca ainda não aparece. */
export function BrandSymbol({ className }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt=""
      aria-hidden="true"
      width={584}
      height={524}
      draggable={false}
      className={cn("h-16 w-auto max-w-none shrink-0 object-contain", className)}
    />
  );
}
