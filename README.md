# Kishan Hotel — Component-led hospitality website

A responsive hospitality website concept built with React 19, TypeScript, Vite, Motion for React, Radix UI primitives, Embla Carousel, and Lucide React.

## Integrated UI libraries

- Motion for React: hero entrance, in-view section reveals, and experience-row transitions.
- Radix UI Accordion: accessible FAQ disclosures with keyboard support and expanded-state semantics.
- Radix UI Dialog: modal gallery lightbox.
- Embla Carousel: touch-friendly room carousel with previous/next controls.
- Lucide React: consistent icon set across navigation, cards, forms, and controls.
- Local shadcn-inspired primitives in `src/components/ui`: reusable Button, Accordion, and Dialog wrappers styled to the hotel design tokens.
- Custom CSS: editorial visual system, responsive layouts, dark theme, and reduced-motion handling.

## Property-media research

- Scraped publicly accessible listing pages for Hotel Kishan, Bettiah, including Justdial's three-photo gallery and Restaurant Guru's visible gallery images.
- Used the Justdial exterior photo in the hero, public room/property photos in the stay section, and Restaurant Guru dining imagery in dining/gallery sections.
- `src/data/property-media.ts` contains selected image URLs, the scraped image inventory, public-listing facts, source URLs, and caveats.
- No hotel-specific video was located in the accessible sources. MakeMyTrip and Goibibo pages returned restricted/empty scrape content, so their galleries were not fully extracted.
- Third-party photo reuse rights have not been verified. Do not treat these images as hotel-owned or approved; replace with client-supplied/authorized assets before production launch.

## Run locally

    npm install
    npm run typecheck
    npm run build
    npm run dev

## Data accuracy and launch guardrails

This website is based on third-party listings, not a hotel-confirmed data feed. Public listings mention room categories (Standard Non AC, Standard AC, Deluxe, Family Room, Luxury), amenities, restaurant details, and address landmarks, but these are labeled as unconfirmed. Rates and availability are not displayed because booking-site prices are date-sensitive. Check-in/out times, contact numbers, policies, exact map pin, restaurant name/hours/menu, and current amenities conflict or lack direct confirmation and must be verified with the property. The enquiry composer only prepares/copies a message; it does not send a message, book a room, or accept payment.

## Research record

See [docs/kishan-property-research.md](docs/kishan-property-research.md) for the source inventory, scraped facts, asset mapping, discrepancies, and unresolved items.
