import { useCallback, useEffect, useState, type FormEvent } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, BedDouble, Check, Coffee, Copy, Heart, Menu, Moon, Sparkles, Sun, Utensils, X } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion';
import { Button } from './components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from './components/ui/dialog';

const rooms = [
  { name: 'Classic Room', tag: 'A calm place to land', text: 'A comfortable base for solo travellers and short stays.', img: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1500&q=85' },
  { name: 'Deluxe Room', tag: 'A little more room', text: 'A more spacious setting for a relaxed visit.', img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1500&q=85' },
  { name: 'Family Room', tag: 'Space to stay together', text: 'A flexible concept for families and small groups.', img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1500&q=85' }
];
const photos = [
  { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85', alt: 'Warm contemporary lounge interior', caption: 'A welcoming pause' },
  { src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1300&q=85', alt: 'Softly lit interior with natural textures', caption: 'Quiet details' },
  { src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1500&q=85', alt: 'Contemporary living space', caption: 'Room to unwind' },
  { src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1300&q=85', alt: 'Warm neutral interior detail', caption: 'A softer rhythm' }
];
const perks = [
  { Icon: BedDouble, title: 'A place to rest', text: 'Room concepts centered on comfort, ease, and a good night’s rest.' },
  { Icon: Utensils, title: 'Food & togetherness', text: 'A space for shared meals, everyday favourites, and small celebrations.' },
  { Icon: Coffee, title: 'A slower moment', text: 'Make room for a quiet coffee, a conversation, or a pause between plans.' }
];
const questions = [
  ['How can I check room availability?', 'Use the enquiry composer to prepare a request with your dates and preferred room. This page does not check live inventory or confirm reservations.'],
  ['Are room prices shown here?', 'No. Verified rates have not been provided, so prices are intentionally not displayed.'],
  ['Can I book or pay online?', 'Online booking and payment are not connected. The enquiry composer prepares a message you can copy and send through a contact channel confirmed by the hotel.'],
  ['Are these photos of the actual property?', 'No. These are illustrative concept images from Unsplash, not verified property photos. Replace them with approved hotel photography before publishing.']
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
      <div className="room-photo"><img src={room.img} alt={room.name + ' concept image'} loading="lazy" /><span className="image-tag">Concept imagery</span><span className="photo-index">0{i + 1} / 03</span></div>
      <div className="room-info"><div><small>{room.tag}</small><h3>{room.name}</h3><p>{room.text}</p></div><a href="#enquiry" className="circle-arrow" aria-label={'Enquire about ' + room.name}><ArrowUpRight size={19} /></a></div>
    </article>)}</div></div>
    <div className="carousel-bottom"><span>Swipe to explore room concepts</span><div><Button variant="icon" disabled={!prev} onClick={() => api?.scrollPrev()} aria-label="Previous room"><ArrowLeft size={18} /></Button><Button variant="icon" disabled={!next} onClick={() => api?.scrollNext()} aria-label="Next room"><ArrowRight size={18} /></Button></div></div>
  </div>;
}

function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const change = (d: number) => setSelected(s => s === null ? 0 : (s + d + photos.length) % photos.length);
  return <section className="section-pad gallery-section" id="gallery"><div className="page-wrap">
    <div className="gallery-intro"><Heading n="04" label="A glimpse inside" title="Spaces with" italic="a softer rhythm." description="A visual moodboard for the stay. These are illustrative references—not verified photographs of the property." /></div>
    <div className="gallery-grid">{photos.map((p, i) => <button key={p.src} className={'gallery-tile gallery-tile-' + (i + 1)} onClick={() => setSelected(i)} aria-label={'Open image ' + p.caption}><img src={p.src} alt={p.alt} loading="lazy" /><span className="image-tag">Concept image</span><span className="gallery-caption">{p.caption}<ArrowUpRight size={17} /></span></button>)}</div>
  </div>
  <Dialog open={selected !== null} onOpenChange={o => !o && setSelected(null)}><DialogContent className="lightbox">
    <div className="lightbox-head"><DialogTitle>{selected === null ? 'Gallery' : photos[selected].caption}</DialogTitle><DialogClose className="close-lightbox" aria-label="Close gallery"><X size={20} /></DialogClose></div>
    <DialogDescription className="sr-only">Illustrative gallery image. Use previous and next buttons to browse.</DialogDescription>
    {selected !== null && <><div className="lightbox-photo"><img src={photos[selected].src} alt={photos[selected].alt} /></div><div className="lightbox-bottom"><span>0{selected + 1} / 0{photos.length} · Concept imagery</span><div><Button variant="icon" onClick={() => change(-1)} aria-label="Previous image"><ArrowLeft size={18} /></Button><Button variant="icon" onClick={() => change(1)} aria-label="Next image"><ArrowRight size={18} /></Button></div></div></>}
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
  const links = [['Story', '#story'], ['Stay', '#stay'], ['Experience', '#experience'], ['Gallery', '#gallery'], ['FAQs', '#faqs']];
  return <div className={night ? 'site night' : 'site'}>
    <div className="top-strip"><span>BETTIAH · WEST CHAMPARAN</span><span>Hospitality, thoughtfully considered</span><a href="#enquiry">Plan a visit <ArrowUpRight size={13} /></a></div>
    <header className="site-header"><a href="#home" className="brand" aria-label="Kishan Hotel home"><span className="brand-symbol">K<span>.</span></span><span>KISHAN HOTEL<small>BETTIAH · BIHAR</small></span></a>
      <nav className={menu ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">{links.map(([t, h]) => <a key={t} href={h} onClick={() => setMenu(false)}>{t}</a>)}</nav>
      <div className="header-actions"><button className="theme-toggle" onClick={() => setNight(!night)} aria-pressed={night} aria-label={night ? 'Switch to day theme' : 'Switch to night theme'}>{night ? <Sun size={17} /> : <Moon size={17} />}<span>{night ? 'Day' : 'Night'}</span></button><a className="header-cta" href="#enquiry">Enquire <ArrowUpRight size={15} /></a><button className="mobile-menu" onClick={() => setMenu(v => !v)} aria-expanded={menu} aria-label={menu ? 'Close navigation' : 'Open navigation'}>{menu ? <X /> : <Menu />}</button></div>
    </header>
    <main>
      <section className="hero" id="home"><div className="hero-bg"><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=90" alt="" fetchPriority="high" /><div /></div>
        <div className="hero-meta"><span><i /> A HOSPITALITY CONCEPT</span><span>BETTIAH · BIHAR</span></div>
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: 'easeOut' }}><p className="hero-kicker">A welcoming pause in the heart of Bettiah</p><h1>Arrive.<br /><em>Unwind.</em><br />Feel at home.</h1><div className="hero-bottom"><p>A considered stay, shaped by comfort, connection, and the little moments that make a place feel familiar.</p><a href="#story">Discover Kishan <span><ArrowDownRight size={19} /></span></a></div></motion.div>
        <div className="hero-foot"><span>SCROLL TO EXPLORE</span><span>CONCEPT VISUALS · PROPERTY PHOTOS PENDING</span></div>
      </section>
      <section className="section-pad story-section" id="story"><div className="page-wrap story-layout"><div className="story-side"><span>01 — THE KISHAN FEELING</span><div><Heart size={20} /><small>MADE FOR<br />YOUR MOMENTS</small></div></div><div className="story-copy"><span className="eyebrow">A stay that feels considered</span><h2>Some places are<br />more than a <em>stop.</em></h2><div className="story-bottom"><p>They give you a moment to breathe, a place to reconnect, and a little comfort in the middle of a busy day. Kishan Hotel’s digital experience is being shaped around a simple idea: hospitality that feels warm, clear, and effortless.</p><a href="#experience" className="text-link">Explore the experience <ArrowUpRight size={16} /></a></div></div></div></section>
      <section className="wide-photo"><div><img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=2200&q=85" alt="Illustrative warm guest room interior" loading="lazy" /><span className="image-tag">Concept imagery · not a property photo</span></div><p><span>Spaces imagined for ease</span><span>VISUAL DIRECTION / 01</span></p></section>
      <section className="section-pad stay-section" id="stay"><div className="page-wrap"><div className="stay-head"><Heading n="02" label="Find your room" title="A place for" italic="your kind of stay." description="Explore illustrative room concepts. Final room categories, amenities, and availability must be confirmed by the hotel." /><a href="#enquiry" className="text-link">Ask about a stay <ArrowUpRight size={16} /></a></div><RoomsCarousel /></div></section>
      <section className="section-pad experience-section" id="experience"><div className="page-wrap experience-layout"><div className="experience-photo"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1500&q=85" alt="Illustrative sunlit interior" loading="lazy" /><span className="image-tag">Illustrative concept image</span></div><div><Heading n="03" label="The experience" title="Little things," italic="thoughtfully done." description="From a comfortable room to a shared meal, the best hospitality makes everyday moments feel easy." /><div className="perks">{perks.map(({ Icon, title, text }, i) => <motion.article className="perk" key={title} initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * .08, duration: .45 }}><span className="perk-icon"><Icon size={19} /></span><div><h3>{title}</h3><p>{text}</p></div><span className="perk-number">0{i + 1}</span></motion.article>)}</div></div></div></section>
      <section className="section-pad dining-section"><div className="page-wrap dining-layout"><div className="dining-copy"><span className="eyebrow">A table to gather around</span><h2>Good food.<br /><em>Good company.</em></h2><p>Every memorable stay has its moments around the table. This section is reserved for the hotel’s dining story—menu, service hours, and offerings will be added once verified.</p><a href="#enquiry" className="text-link">Ask about dining <ArrowUpRight size={16} /></a></div><div className="dining-photo"><img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1500&q=85" alt="Illustrative restaurant table setting" loading="lazy" /><span className="image-tag">Concept imagery · menu not confirmed</span><div className="dining-stamp"><Utensils size={20} /><span>FOOD &<br />TOGETHERNESS</span></div></div></div></section>
      <Gallery />
      <section className="section-pad faq-section" id="faqs"><div className="page-wrap faq-layout"><Heading n="06" label="Good to know" title="A few things" italic="before you arrive." description="Clear answers, without assumptions about unverified hotel details." /><Accordion type="single" collapsible className="faq-list">{questions.map(([q, a], i) => <AccordionItem value={String(i)} key={q}><AccordionTrigger><span className="faq-number">0{i + 1}</span>{q}</AccordionTrigger><AccordionContent>{a}</AccordionContent></AccordionItem>)}</Accordion></div></section>
      <section className="section-pad enquiry-section"><div className="page-wrap"><Enquiry /></div></section>
      <section className="closing"><div className="closing-photo"><img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=85" alt="" loading="lazy" /><div /></div><div className="closing-copy"><span className="eyebrow">Kishan Hotel · Bettiah</span><h2>Make room<br /><em>for a moment.</em></h2><a href="#enquiry">Prepare an enquiry <ArrowUpRight size={18} /></a></div><span className="image-tag">Illustrative concept imagery</span></section>
    </main>
    <footer className="site-footer"><a href="#home" className="brand"><span className="brand-symbol">K<span>.</span></span><span>KISHAN HOTEL<small>BETTIAH · BIHAR</small></span></a><p>Hospitality, thoughtfully considered.</p><nav><a href="#story">Story</a><a href="#stay">Stay</a><a href="#gallery">Gallery</a><a href="#enquiry">Enquiry</a></nav><div className="footer-bottom"><span>© {new Date().getFullYear()} Kishan Hotel</span><span>Concept website · Illustrative imagery · Details awaiting hotel approval</span><a href="#home">Back to top ↑</a></div></footer>
  </div>;
}