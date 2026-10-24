<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep About-only institutional content and its presentation in the About route, reusing existing semantic tokens; this isolates institutional updates from shared pages and layouts.
- Flyer cards and their viewer share the browser-updated offer-status hook and order-link component, so expiration and WhatsApp behavior remain consistent without duplicating dates or contact URLs.
- The brand mark lives in src/assets and is imported only through the shared components — Logo (symbol plus name) for header and footer, BrandSymbol (symbol alone) for page openings and the flyer viewer — and the browser-tab and home-screen icons in public/ are generated from that same artwork, so the mark stays identical everywhere and is referenced from one place.
