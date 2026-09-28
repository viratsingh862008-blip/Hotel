# Hotel Kishan, Bettiah — Public-source scrape & asset map

**Research date:** 2026-09-29  
**Scope:** Public web listings for the Hotel Kishan / Kishan Sweets and Restaurant at Bettiah, West Champaran, Bihar. This is not a property-owner verification.

## Asset mapping used in the website

| Site area | Selected asset | Scraped classification | Caution |
|---|---|---|---|
| Hero background | [Justdial exterior photo](https://content.jdmagicbox.com/comp/bettiah/i5/9999p6254.6254.180908200923.l6i5/catalogue/hotel-kishan-bettiah-hotels-nhtg9elhpb.jpg) | Exterior photo in gallery category | Image reuse rights not verified |
| Room carousel / room feature | [Justdial room photo](https://content.jdmagicbox.com/comp/bettiah/i5/9999p6254.6254.180908200923.l6i5/catalogue/hotel-kishan-bettiah-hotels-ag9sjaqaso.jpg) | Room photo | Exact room type not mapped |
| Room carousel / gallery | [Justdial all-gallery photo](https://content.jdmagicbox.com/comp/bettiah/i5/9999p6254.6254.180908200923.l6i5/catalogue/hotel-kishan-bettiah-hotels-ppta6jmwcf.jpg) | General property photo / gallery image | Exact category not verified |
| Dining section | [Restaurant Guru food photo](https://img02.restaurantguru.com/c4a5-Restaurant-Hotel-Kishan-dishes.jpg) | Food / dishes | Associated with restaurant listing; rights not verified |
| Gallery | [Restaurant Guru interior](https://img02.restaurantguru.com/c7e4-Restaurant-kishan-sweets-and-restaurant-interior.jpg) | Interior | Listing-associated image; rights not verified |
| Closing section | [Restaurant Guru exterior](https://img02.restaurantguru.com/cba5-Restaurant-kishan-sweets-and-restaurant-exterior.jpg) | Exterior | May refer to restaurant facade; verify property association |

## Image inventory

### Justdial gallery
Scraped gallery shows **3 photos**: one labeled Exterior and two under Room. The page exposes these image assets:

1. `hotel-kishan-bettiah-hotels-nhtg9elhpb.jpg` — Exterior category; used for hero.
2. `hotel-kishan-bettiah-hotels-ag9sjaqaso.jpg` — Room category; used in room feature.
3. `hotel-kishan-bettiah-hotels-ppta6jmwcf.jpg` — All/gallery thumbnail; exact category not confirmed.

### Restaurant Guru gallery
The listing states **81 photos** overall; the scrape exposed 14 visible photo URLs. The visible group includes interior, food/dishes, meals, facade/exterior, dessert, and meat dishes:

- `c7e4-Restaurant-kishan-sweets-and-restaurant-interior.jpg` — interior
- `c4a5-Restaurant-Hotel-Kishan-dishes.jpg` — food/dishes
- `cf1c-Restaurant-kishan-sweets-and-restaurant-meals.jpg` — meals
- `c412-kishan-sweets-and-restaurant-Bettiah-dishes.jpg` — dishes
- `c5ef-kishan-sweets-and-restaurant-Bettiah-meals.jpg` — meals
- `c562-kishan-sweets-and-restaurant-Bettiah-food.jpg` — food
- `c273-Restaurant-kishan-sweets-and-restaurant-dishes.jpg` — dishes
- `cef3-Restaurant-kishan-sweets-and-restaurant-food.jpg` — food
- `c42b-Hotel-Kishan-Bettiah-food.jpg` — food
- `ca9a-Restaurant-kishan-sweets-and-restaurant-facade.jpg` — facade
- `cba5-Restaurant-kishan-sweets-and-restaurant-exterior.jpg` — exterior
- `c7ed-Restaurant-kishan-sweets-and-restaurant-dessert.jpg` — dessert
- `c16f-kishan-sweets-and-restaurant-Bettiah-meat.jpg` — meat dish
- `cbe6-kishan-sweets-and-restaurant-meat.jpg` — meat dish

The URLs and classifications are also recorded in `src/data/property-media.ts`.

## Public listing facts collected

### Property identity and location
- Name used by hotel booking listing: **HOTEL KISHAN**.
- Address variants: `Supriya Cinema Road, Kamalnath Nagar, Bettiah, West Champaran, Bihar 845438`; another listing says `Ground Floor, Opposite Axis Bank, Sarupriya Road, Lal Bazar, Bettiah 845438`; Restaurant Guru says `RG47+4W7, Kamalnath Nagar, Supriya Cinema Road, beside V-Mart`.
- Restaurant Guru map coordinates: **26.8050347, 84.5139723**. This is a directory pin, not owner-confirmed.
- The website shows a normalized neighborhood address and clearly notes that the exact entrance/pin needs confirmation.

### Room categories
Goibibo's public listing names:
- Standard NON AC
- STANDARD AC
- DELUX
- Family Room
- Luxury

The website uses three listed categories in the carousel and mentions the full set in the FAQ. No live rate is shown; OTA prices can vary by date, occupancy, promotion, and availability. The listing's square-foot measurements appeared implausibly large, so they were not copied.

### Amenities reported by a booking listing
Room service, smoking rooms, air conditioning, power backup, housekeeping, newspaper, Wi-Fi, wheelchair / wheelchair accessibility, doctor on call, luggage assistance, first-aid services, pickup/drop and railway/airport/bus transfers, sofa, toiletries, and dental kit. These are third-party claims and are not shown as confirmed hotel guarantees. The website only references a few broad items with an explicit public-listing caveat.

### Restaurant
- Goibibo listing names an on-site restaurant **“kishan restaurant.”**
- Restaurant Guru uses **“kishan sweets and restaurant.”**
- Restaurant Guru listing reports daily **6 AM–10 PM**, Indian cuisine, delivery and wheelchair accessibility; these hours/features are not owner-confirmed.
- Restaurant Guru listing reports a broad per-person price range of INR 960–2,400; not used on the site because the menu/pricing is not confirmed.
- A Restaurant Guru listing exposes `+91 91999 94456`; separate directories show other phone numbers. No phone number is presented as the verified hotel booking line.

### Reviews and policies
- Public listings show different review counts/ratings, which can change and were not used in the website.
- Public booking policies mention age/ID rules, couple policy, pets, outside food, and other conditions. These were not reproduced as definitive because they require confirmation.
- Check-in/check-out times differ across listings, so the website omits them.
- Search found a Facebook page titled “Hotel Kishan (@hotelkishanbettiah) - Videos” (https://www.facebook.com/hotelkishanbettiah/videos/), but scraping the page failed and no individual video URLs/files could be verified. No video is embedded in the website. No verified official standalone website was identified.

## Scrape coverage and limitations

| Source | Result |
|---|---|
| Justdial main listing | Scraped business details and photo categories |
| Justdial gallery | Scraped three image URLs and exterior/room labels |
| Restaurant Guru listing | Scraped visible image URLs, address, map link, hours, cuisine and contact details |
| Restaurant Guru menu page | No actual menu surfaced; page invites users to submit a menu link |
| Goibibo listing and room page | Scraper returned only “200 OK”; used indexed listing snippets for high-level facts, not a complete HTML scrape |
| MakeMyTrip photos page | Scraper returned “200-OK”; listing snippet says +24 property photos and +10 guest photos, but actual asset URLs were not extracted |
| ClickedIndia contact page | Scraped older address and contact-number variants |
| Yatra page | Search-indexed listing provides limited check-in/check-out and property claims; full scrape did not complete within the available run |
| Video sources | Search surfaced a Facebook videos page for Hotel Kishan, but the page could not be scraped; no individual video URL/file was verified or embedded |

## Before production launch

1. Ask the property owner for permission to use each third-party image or replace them with owner-supplied originals.
2. Confirm the hotel entrance, map pin, current phone/WhatsApp number, and business hours.
3. Confirm room categories, room-to-photo mapping, occupancy, amenities, rates, taxes, cancellation, and check-in/check-out policies.
4. Confirm the restaurant's official name, menu, prices, hours, service options, and contact channel.
5. Obtain hotel approval for the copy, media, and all claims before publishing.
