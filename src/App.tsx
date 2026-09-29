import { useCallback, useEffect, useState, type FormEvent } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, BedDouble, Check, Coffee, Copy, Heart, Menu, Moon, Sparkles, Sun, Utensils, X } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion';
import { PROPERTY_MEDIA, PUBLIC_LISTING_FACTS } from './data/property-media';
import { Button } from './components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from './components/ui/dialog';

const rooms = [
  { name: 'Standard Non AC', tag: 'Listed room category · confirm', text: 'A non-AC category shown in a public booking listing. Confirm current room details, occupancy, and inclusions with the hotel.', img: PROPERTY_MEDIA.room1.src },
  { name: 'Standard AC', tag: 'Listed room category · confirm', text: 'An AC category shown in a public booking listing. Confirm current room details, occupancy, and inclusions with the hotel.', img: PROPERTY_MEDIA.room2.src },
  { name: 'Deluxe', tag: 'Listed room category · confirm', text: 'A deluxe category shown in a public booking listing. No specific photo has been verified for this room type.', img: PROPERTY_MEDIA.room1.src },
  { name: 'Family Room', tag: 'Listed room category · confirm', text: 'A family room category appears in a public booking listing. Confirm occupancy, bedding, and availability directly.', img: PROPERTY_MEDIA.room2.src },
  { name: 'Luxury', tag: 'Listed room category · confirm', text: 'A luxury category appears in a public booking listing. The exact room features and photo mapping are unverified.', img: PROPERTY_MEDIA.room1.src }
];
const photos = [
  { src: PROPERTY_MEDIA.interior.src, alt: 'Restaurant interior photo associated with Hotel Kishan listing', caption: 'Restaurant interior · public listing' },
  { src: PROPERTY_MEDIA.room1.src, alt: 'Guest room photo associated with Hotel Kishan listing', caption: 'Guest room · public listing' },
  { src: PROPERTY_MEDIA.facade.src, alt: 'Restaurant facade photo associated with Kishan listing', caption: 'Restaurant facade · public listing' },
  { src: PROPERTY_MEDIA.food.src, alt: 'Food photo associated with Kishan restaurant listing', caption: 'Dishes · public listing' },
  { src: 'https://img02.restaurantguru.com/cf1c-Restaurant-kishan-sweets-and-restaurant-meals.jpg', alt: 'Meals photo associated with restaurant listing', caption: 'Meals · public listing' },
  { src: 'https://img02.restaurantguru.com/c412-kishan-sweets-and-restaurant-Bettiah-dishes.jpg', alt: 'Dishes photo associated with restaurant listing', caption: 'Dishes · public listing' },
  { src: 'https://img02.restaurantguru.com/c5ef-kishan-sweets-and-restaurant-Bettiah-meals.jpg', alt: 'Meals photo associated with restaurant listing', caption: 'Meals · public listing' },
  { src: 'https://img02.restaurantguru.com/c562-kishan-sweets-and-restaurant-Bettiah-food.jpg', alt: 'Food photo associated with restaurant listing', caption: 'Food · public listing' },
  { src: 'https://img02.restaurantguru.com/c273-Restaurant-kishan-sweets-and-restaurant-dishes.jpg', alt: 'Dishes photo associated with restaurant listing', caption: 'Dishes · public listing' },
  { src: 'https://img02.restaurantguru.com/cef3-Restaurant-kishan-sweets-and-restaurant-food.jpg', alt: 'Food photo associated with restaurant listing', caption: 'Food · public listing' },
  { src: 'https://img02.restaurantguru.com/c42b-Hotel-Kishan-Bettiah-food.jpg', alt: 'Food photo associated with Hotel Kishan listing', caption: 'Food · public listing' },
  { src: PROPERTY_MEDIA.exterior2.src, alt: 'Exterior photo associated with restaurant listing', caption: 'Exterior · public listing' },
  { src: 'https://img02.restaurantguru.com/c7ed-Restaurant-kishan-sweets-and-restaurant-dessert.jpg', alt: 'Dessert photo associated with restaurant listing', caption: 'Dessert · public listing' },
  { src: 'https://img02.restaurantguru.com/c16f-kishan-sweets-and-restaurant-Bettiah-meat.jpg', alt: 'Meat dish photo associated with restaurant listing', caption: 'Dish · public listing' },
  { src: 'https://img02.restaurantguru.com/cbe6-kishan-sweets-and-restaurant-meat.jpg', alt: 'Meat dish photo associated with restaurant listing', caption: 'Dish · public listing' }
];
const perks = [
  { Icon: BedDouble, title: 'Room service & housekeeping', text: 'Room service, housekeeping, and power backup are reported in a public booking listing. Current availability is unconfirmed.' },
  { Icon: Utensils, title: 'Wi-Fi & air conditioning', text: 'Wi-Fi and air conditioning appear in public listing amenities. Confirm which room categories include them.' },
  { Icon: Coffee, title: 'Guest assistance', text: 'Luggage assistance, doctor on call, and first-aid support are listed online; verify each service directly.' },
  { Icon: BedDouble, title: 'Accessibility', text: 'A listing mentions wheelchair accessibility. Entrance access, room access, and facilities have not been independently checked.' },
  { Icon: ArrowUpRight, title: 'Transfers & pickup', text: 'Railway, airport, bus transfer, and pickup/drop services appear in a public listing. Availability and fees are unknown.' },
  { Icon: Sparkles, title: 'In-room amenities', text: 'A listing mentions toiletries, dental kits, sofa, newspaper, and smoking rooms. Room-specific availability is not confirmed.' }
];
const questions = [
  ['Which room categories are listed?', 'Public booking listings show Standard Non AC, Standard AC, Deluxe, Family Room, and Luxury. Categories, inclusions, and availability must be confirmed with the hotel.'],
  ['Are room prices shown here?', 'No. Booking-site prices are date- and availability-dependent and may be promotional. The hotel has not confirmed direct rates, so none are displayed.'],
  ['Can I book or pay online?', 'Online booking and payment are not connected. The enquiry composer prepares a message you can copy; no message is sent and no reservation is created.'],
  ['Are these photos of the actual property?', 'These images were found on public third-party hotel and restaurant listings. The property has not confirmed them, and reuse permission has not been verified.'],
  ['What amenities are listed?', 'Public listings mention room service, Wi-Fi, air conditioning, power backup, housekeeping, luggage assistance, wheelchair accessibility, doctor on call, first aid, transfers, toiletries, dental kits, newspaper, sofa, and smoking rooms. None are hotel-confirmed here.'],
  ['What are the hotel policies?', 'A booking listing mentions age/ID requirements, a couple policy, and restrictions around pets and outside food. These are third-party claims, may be outdated, and are not reproduced as official policy. Confirm directly before booking.'],
  ['What contact number should I call?', 'Public directories show conflicting numbers, and some may refer to the restaurant or older listings. No number has been verified as the official hotel booking contact, so this page does not label one as official.'],
  ['What are the restaurant hours and prices?', 'One third-party directory reports 6 AM–10 PM and Indian cuisine; another listing uses a different restaurant name. The menu, hours, service options, and prices are not confirmed.'],
  ['What are check-in and check-out times?', 'Public sources conflict. Please confirm directly with the property; no time is presented as official.']
];

function Heading({ n, label, title, italic, description }: { n: string; label: string; title: string; italic: string; description?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className="section-heading" initial={reduce ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
    <div className="section-kicker"><span>{n}</span><span>{label}</span></div>
    <h2>{title}<br /><em>{italic}</em></h2>
    {description && <p>{description}</p>}
  </motion.div>;
}

function RoomsCarousel() {
  const [viewport, api] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps' });
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(true);
  const sync = useCallback(() => { if (api) { setPrev(api.canScrollPrev()); setNext(api.canScrollNext()); } }, [api]);
  useEffect(() => {
    if (!api) return;
    sync(); api.on('select', sync); api.on('reInit', sync);
    return () => { api.off('select', sync); api.off('reInit', sync); };
  }, [api, sync]);
  return <div className="rooms-carousel">
    <div className="embla-viewport" ref={viewport}><div className="embla-track">{rooms.map((room, i) => <article className="room-card embla-slide" key={room.name}>
      <div className="room-photo"><img src={room.img} alt={room.name + ' photo from a public listing'} loading="lazy" /><span className="image-tag">Public listing photo · rights to confirm</span><span className="photo-index">0{i + 1} / 05</span></div>
      <div className="room-info"><div><small>{room.tag}</small><h3>{room.name}</h3><p>{room.text}</p></div><a href="#enquiry" className="circle-arrow" aria-label={'Enquire about ' + room.name}><ArrowUpRight size={19} /></a></div>
    </article>)}</div></div>
    <div className="carousel-bottom"><span>Swipe through listed room categories</span><div><Button variant="icon" disabled={!prev} onClick={() => api?.scrollPrev()} aria-label="Previous room"><ArrowLeft size={18} /></Button><Button variant="icon" disabled={!next} onClick={() => api?.scrollNext()} aria-label="Next room"><ArrowRight size={18} /></Button></div></div>
  </div>;
}

function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const change = (d: number) => setSelected(s => s === null ? 0 : (s + d + photos.length) % photos.length);
  return <section className="section-pad gallery-section" id="gallery"><div className="page-wrap">
    <div className="gallery-intro"><Heading n="04" label="Property & dining gallery" title="A look at" italic="Kishan." description="Photos associated with Hotel Kishan and its restaurant listings. This gallery includes visible public-listing photos; image ownership and reuse permission remain unverified." /></div>
    <div className="gallery-grid">{photos.map((p, i) => <button key={p.src} className={'gallery-tile gallery-tile-' + (i + 1)} onClick={() => setSelected(i)} aria-label={'Open image ' + p.caption}><img src={p.src} alt={p.alt} loading="lazy" /><span className="image-tag">Public listing photo · rights to confirm</span><span className="gallery-caption">{p.caption}<ArrowUpRight size={17} /></span></button>)}</div>
  </div>
  <Dialog open={selected !== null} onOpenChange={o => !o && setSelected(null)}><DialogContent className="lightbox">
    <div className="lightbox-head"><DialogTitle>{selected === null ? 'Gallery' : photos[selected].caption}</DialogTitle><DialogClose className="close-lightbox" aria-label="Close gallery"><X size={20} /></DialogClose></div>
    <DialogDescription className="sr-only">Public listing image. Photo association and reuse permission have not been verified. Use previous and next buttons to browse.</DialogDescription>
    {selected !== null && <><div className="lightbox-photo"><img src={photos[selected].src} alt={photos[selected].alt} /></div><div className="lightbox-bottom"><span>0{selected + 1} / 0{photos.length} · Public listing photo</span><div><Button variant="icon" onClick={() => change(-1)} aria-label="Previous image"><ArrowLeft size={18} /></Button><Button variant="icon" onClick={() => change(1)} aria-label="Next image"><ArrowRight size={18} /></Button></div></div></>}
  </DialogContent></Dialog>
  </section>;
}

function Enquiry() {
  const [form, setForm] = useState({ name: '', dates: '', guests: '2', room: 'Any room type', note: '' });
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const update = (key: keyof typeof form, value: string) => setForm(s => ({ ...s, [key]: value }));
  const prepare = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setCopied(false);
    setMessage(['Hello, I would like to enquire about a stay at Kishan Hotel.', form.name ? 'Name: ' + form.name : '', form.dates ? 'Preferred dates: ' + form.dates : '', 'Guests: ' + form.guests, 'Room preference: ' + form.room, form.note ? 'Additional request: ' + form.note : ''].filter(Boolean).join('\n'));
  };
  const copy = async () => { try { await navigator.clipboard.writeText(message); setCopied(true); } catch { setCopied(false); } };
  return <div className="enquiry-layout" id="enquiry">
    <div><Heading n="05" label="Plan a visit" title="Let’s start" italic="with a hello." description="Share a few details and prepare an enquiry message. No booking is made and no message is sent from this page." /><div className="enquiry-note"><Sparkles size={18} /><p>Verified rates, inventory, and direct booking are not connected in this concept build.</p></div></div>
    <div className="enquiry-card"><form onSubmit={prepare}>
      <label>Your name<input value={form.name} onChange={e => update('name', e.target.value)} placeholder="How should we address you?" autoComplete="name" /></label>
      <div className="form-row"><label>Preferred dates<input value={form.dates} onChange={e => update('dates', e.target.value)} placeholder="e.g. 12–14 October" /></label><label>Guests<select value={form.guests} onChange={e => update('guests', e.target.value)}>{['1','2','3','4','5+'].map(x => <option key={x}>{x}</option>)}</select></label></div>
      <label>Room preference<select value={form.room} onChange={e => update('room', e.target.value)}><option>Any room type</option>{rooms.map(r => <option key={r.name}>{r.name}</option>)}</select></label>
      <label>Anything else?<textarea value={form.note} onChange={e => update('note', e.target.value)} placeholder="Add a request or a little context…" rows={3} /></label>
      <Button type="submit">Prepare enquiry <ArrowUpRight size={18} /></Button>
    </form>
    {message && <div className="prepared" aria-live="polite"><strong><Check size={17} /> Message prepared</strong><textarea readOnly value={message} rows={6} aria-label="Prepared enquiry message" /><Button variant="outline" onClick={copy}>{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? 'Copied to clipboard' : 'Copy message'}</Button><p>This copies the message only. Send it through a contact channel confirmed by the hotel.</p></div>}
    </div>
  </div>;
}

export default function App() {
  const [night, setNight] = useState(false);
  const [menu, setMenu] = useState(false);
  const links = [['Story', '#story'], ['Stay', '#stay'], ['Experience', '#experience'], ['Dining', '#dining'], ['Location', '#location'], ['Listing notes', '#listing-notes'], ['Gallery', '#gallery'], ['FAQs', '#faqs']];
  return <div className={night ? 'site night' : 'site'}>
    <div className="top-strip"><span>BETTIAH · WEST CHAMPARAN</span><span>Hospitality, thoughtfully considered</span><a href="#enquiry">Plan a visit <ArrowUpRight size={13} /></a></div>
    <header className="site-header"><a href="#home" className="brand" aria-label="Kishan Hotel home"><span className="brand-symbol">K<span>.</span></span><span>KISHAN HOTEL<small>BETTIAH · BIHAR</small></span></a>
      <nav className={menu ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">{links.map(([t, h]) => <a key={t} href={h} onClick={() => setMenu(false)}>{t}</a>)}</nav>
      <div className="header-actions"><button className="theme-toggle" onClick={() => setNight(!night)} aria-pressed={night} aria-label={night ? 'Switch to day theme' : 'Switch to night theme'}>{night ? <Sun size={17} /> : <Moon size={17} />}<span>{night ? 'Day' : 'Night'}</span></button><a className="header-cta" href="#enquiry">Enquire <ArrowUpRight size={15} /></a><button className="mobile-menu" onClick={() => setMenu(v => !v)} aria-expanded={menu} aria-label={menu ? 'Close navigation' : 'Open navigation'}>{menu ? <X /> : <Menu />}</button></div>
    </header>
    <main>
      <section className="hero" id="home"><div className="hero-bg"><img src={PROPERTY_MEDIA.hero.src} alt="" fetchPriority="high" /><div /></div>
        <div className="hero-meta"><span><i /> PUBLIC-LISTING-BASED PREVIEW</span><span>BETTIAH · BIHAR</span></div>
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: 'easeOut' }}><p className="hero-kicker">A place to stay in Bettiah</p><h1>Arrive.<br /><em>Unwind.</em><br />Feel at home.</h1><div className="hero-bottom"><p>Explore the room categories and dining details found in public listings. Rates, availability, and property information still need direct confirmation.</p><a href="#story">Discover Kishan <span><ArrowDownRight size={19} /></span></a></div></motion.div>
        <div className="hero-foot"><span>SCROLL TO EXPLORE</span><span>PUBLIC LISTING PHOTOS · USAGE RIGHTS TO CONFIRM</span></div>
      </section>
      <section className="section-pad story-section" id="story"><div className="page-wrap story-layout"><div className="story-side"><span>01 — THE KISHAN FEELING</span><div><Heart size={20} /><small>MADE FOR<br />YOUR MOMENTS</small></div></div><div className="story-copy"><span className="eyebrow">A stay in Bettiah</span><h2>Some places are<br />more than a <em>stop.</em></h2><div className="story-bottom"><p>Public booking and directory listings place Hotel Kishan on Supriya Cinema Road in Kamalnath Nagar, Bettiah. The exact entrance, current services, and booking process should be confirmed directly with the property.</p><a href="#experience" className="text-link">Explore the experience <ArrowUpRight size={16} /></a></div></div></div></section>
      <section className="wide-photo"><div><img src={PROPERTY_MEDIA.room1.src} alt="Hotel Kishan room photo from a public listing" loading="lazy" /><span className="image-tag">Public listing photo · rights to confirm</span></div><p><span>Hotel room · public listing</span><span>VISUAL DIRECTION / 01</span></p></section>
      <section className="section-pad stay-section" id="stay"><div className="page-wrap"><div className="stay-head"><Heading n="02" label="Find your room" title="A place for" italic="your kind of stay." description="Public booking listings show several room categories. Photos are not matched to a specific room type; confirm current categories, rates, and inclusions with the hotel." /><a href="#enquiry" className="text-link">Ask about a stay <ArrowUpRight size={16} /></a></div><RoomsCarousel /></div></section>
      <section className="section-pad experience-section" id="experience"><div className="page-wrap experience-layout"><div className="experience-photo"><img src={PROPERTY_MEDIA.room2.src} alt="Hotel Kishan room photo from a public listing" loading="lazy" /><span className="image-tag">Public listing photo · rights to confirm</span></div><div><Heading n="03" label="The experience" title="Little things," italic="thoughtfully done." description="The items below appear in a public booking listing. This is not a hotel-confirmed amenities list; please verify each service before relying on it." /><div className="perks">{perks.map(({ Icon, title, text }, i) => <motion.article className="perk" key={title} initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * .08, duration: .45 }}><span className="perk-icon"><Icon size={19} /></span><div><h3>{title}</h3><p>{text}</p></div><span className="perk-number">0{i + 1}</span></motion.article>)}</div></div></div></section>
      <section className="section-pad dining-section" id="dining"><div className="page-wrap dining-layout"><div className="dining-copy"><span className="eyebrow">Kishan Restaurant</span><h2>Dining at<br /><em>Kishan.</em></h2><p>Public sources use both “Kishan Restaurant” and “Kishan Sweets and Restaurant.” One directory reports Indian cuisine and 6 AM–10 PM hours, while another lists a broad ₹960–₹2,400 per-person range. These are unverified directory claims, not an official menu, rate, or schedule.</p><a href="#enquiry" className="text-link">Ask about dining <ArrowUpRight size={16} /></a></div><div className="dining-photo"><img src={PROPERTY_MEDIA.food.src} alt="Food photo associated with the restaurant listing" loading="lazy" /><span className="image-tag">Third-party restaurant photo · rights to confirm</span><div className="dining-stamp"><Utensils size={20} /><span>FOOD &<br />TOGETHERNESS</span></div></div></div></section>
      <section className="section-pad location-section" id="location"><div className="page-wrap">
        <Heading n="04" label="Find us" title="In the heart of" italic="Bettiah." description="Public listings place Hotel Kishan around Supriya Cinema Road / Kamalnath Nagar, Bettiah, Bihar 845438. Listings mention different nearby landmarks, so confirm the exact entrance and pin before travelling." />
        <div className="location-panel"><div><span className="eyebrow">Address from public listings</span><h3>Hotel Kishan</h3><p>Supriya Cinema Road, Kamalnath Nagar, Bettiah, West Champaran, Bihar 845438</p><small>Nearby landmarks differ by listing: beside V-Mart / opposite Axis Bank. Another listing uses Ground Floor, Opposite Axis Bank, Sarupriya Road, Lal Bazar. Exact address and pin are not hotel-confirmed.</small></div><a className="text-link" href="https://www.google.com/maps/dir/?api=1&destination=26.80503470,84.51397230" target="_blank" rel="noreferrer">Open listing map pin <ArrowUpRight size={16} /></a></div>
      </div></section>
      <section className="section-pad listing-notes" id="listing-notes"><div className="page-wrap listing-notes-layout">
        <Heading n="05" label="Public directory notes" title="What listings" italic="report." description="The details below are collected from third-party directories and booking listings. They are included for transparency—not presented as official hotel policies or guarantees." />
        <div className="listing-notes-grid">
          <article><span className="eyebrow">Reported amenities</span><ul>{PUBLIC_LISTING_FACTS.amenitiesReported.map(x => <li key={x}>{x}</li>)}</ul></article>
          <article><span className="eyebrow">Names & operating details</span><p><strong>Restaurant names found:</strong> {PUBLIC_LISTING_FACTS.restaurantNames.join(' / ')}</p><p><strong>Reported hours:</strong> {PUBLIC_LISTING_FACTS.reportedRestaurantHours}</p><p><strong>Reported cuisine:</strong> Indian cuisine (directory claim; not confirmed).</p><p><strong>Reported dining price range:</strong> ₹960–₹2,400 per person in one directory; not a confirmed menu price.</p></article>
          <article><span className="eyebrow">Address variants</span><p>{PUBLIC_LISTING_FACTS.area}</p><ul>{PUBLIC_LISTING_FACTS.nearbyLandmarks.map(x => <li key={x}>{x}</li>)}</ul><p>Other directory variant: Ground Floor, Opposite Axis Bank, Sarupriya Road, Lal Bazar, Bettiah 845438.</p></article>
          <article><span className="eyebrow">Contact numbers found online</span><p>These are unverified public directory entries—not an official hotel booking line:</p><ul>{PUBLIC_LISTING_FACTS.publicContactVariants.map(x => <li key={x.source}><strong>{x.value}</strong><br /><small>{x.source} · {x.note}</small></li>)}</ul></article>
          <article><span className="eyebrow">Policies reported by listings</span><ul>{PUBLIC_LISTING_FACTS.reportedPolicies.map(x => <li key={x}>{x}</li>)}</ul></article>
          <article><span className="eyebrow">Video search</span><p>A Facebook videos page for Hotel Kishan was discovered, but no individual video file could be retrieved or verified. No video is embedded.</p><a href={PUBLIC_LISTING_FACTS.sources[6]} target="_blank" rel="noreferrer" className="text-link">View discovered video page <ArrowUpRight size={15} /></a></article>
        </div>
      </div></section>
      <Gallery />
      <section className="section-pad faq-section" id="faqs"><div className="page-wrap faq-layout"><Heading n="06" label="Good to know" title="A few things" italic="before you arrive." description="Clear answers, without assumptions about unverified hotel details." /><Accordion type="single" collapsible className="faq-list">{questions.map(([q, a], i) => <AccordionItem value={String(i)} key={q}><AccordionTrigger><span className="faq-number">0{i + 1}</span>{q}</AccordionTrigger><AccordionContent>{a}</AccordionContent></AccordionItem>)}</Accordion></div></section>
      <section className="section-pad enquiry-section"><div className="page-wrap"><Enquiry /></div></section>
      <section className="closing"><div className="closing-photo"><img src={PROPERTY_MEDIA.exterior2.src} alt="" loading="lazy" /><div /></div><div className="closing-copy"><span className="eyebrow">Kishan Hotel · Bettiah</span><h2>Make room<br /><em>for a moment.</em></h2><a href="#enquiry">Prepare an enquiry <ArrowUpRight size={18} /></a></div><span className="image-tag">Public listing photo · rights to confirm</span></section>
    </main>
    <footer className="site-footer"><a href="#home" className="brand"><span className="brand-symbol">K<span>.</span></span><span>KISHAN HOTEL<small>BETTIAH · BIHAR</small></span></a><p>Hospitality, thoughtfully considered.</p><nav><a href="#story">Story</a><a href="#stay">Stay</a><a href="#dining">Dining</a><a href="#location">Location</a><a href="#listing-notes">Listing notes</a><a href="#gallery">Gallery</a><a href="#enquiry">Enquiry</a></nav><div className="footer-bottom"><span>© {new Date().getFullYear()} Kishan Hotel</span><span>Public listing photos and details · usage rights and property confirmation pending</span><a href="#home">Back to top ↑</a></div></footer>
  </div>;
}