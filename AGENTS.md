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
- Import header and footer artwork directly through the shared Logo component; keep BrandSymbol and public browser/home-screen icons independent so a header/footer-only update does not change other placements.
- Keep initial login configuration and validated browser requests separate from the form; the placeholder request never creates a session, so connecting real authentication requires an explicit later implementation.
