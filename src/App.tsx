import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const rooms = [
  { name: 'Deluxe Room', note: 'Restful details · Thoughtful essentials', type: 'ROOM TYPE / 01', image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=85' },
  { name: 'Premium Room', note: 'Room to unwind · A little extra ease', type: 'ROOM TYPE / 02', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85' },
  { name: 'Signature Suite', note: 'More room to settle · Made for lingering', type: 'ROOM TYPE / 03', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85' },
];
const gallery = [
  ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&q=85', 'Inviting lounge interior'],
  ['https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85', 'Softly lit interior details'],
  ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1100&q=85', 'Minimalist living space'],
  ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85', 'Quiet luxury interior detail'],
];

export default function App() {
  const [night, setNight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [activeRoom, setActiveRoom] = useState<number | null>(null);
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null);
  const roomsTrack = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      return () => mm.revert();
    }

    const ctx = gsap.context(() => {
      gsap.from('.hero-content > *', { y: 32, autoAlpha: 0, duration: 1, stagger: 0.13, ease: 'power3.out', delay: 0.12 });
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((element) => {
        gsap.fromTo(element, { y: 30, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element) => {
        gsap.fromTo(element, { yPercent: -5 }, {
          yPercent: 5, ease: 'none',
          scrollTrigger: { trigger: element.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 },
        });
      });
      mm.add('(min-width: 901px)', () => {
        const track = roomsTrack.current;
        if (!track) return;
        const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth + 48);
        gsap.to(track, {
          x: () => -getDistance(), ease: 'none',
          scrollTrigger: {
            trigger: '.rooms-pin', start: 'top top', end: () => `+=${getDistance()}`,
            pin: true, scrub: 1, invalidateOnRefresh: true,
          },
        });
      });
    });
    return () => { ctx.revert(); mm.revert(); };
  }, []);

  const scrollRooms = (direction: number) => {
    roomsTrack.current?.scrollBy({ left: direction * (roomsTrack.current.clientWidth * 0.72), behavior: 'smooth' });
  };
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (activeImage === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveImage(null);
      if (event.key === 'ArrowRight') setActiveImage((current) => current === null ? null : (current + 1) % gallery.length);
      if (event.key === 'ArrowLeft') setActiveImage((current) => current === null ? null : (current - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImage]);

  return (
    <div className={night ? 'site night' : 'site'}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-nav">
        <a className="brand" href="#home" aria-label="Kishan Hotel home">KISHAN HOTEL<small>Hospitality, thoughtfully</small></a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          {['Our story', 'Stay', 'Experience', 'Gallery', 'Contact'].map((label, i) => (
            <a key={label} href={['#story', '#rooms', '#experience', '#gallery', '#contact'][i]} onClick={closeMenu}>{label}</a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={() => setNight(!night)} aria-pressed={night}>{night ? '☼ Day' : '☾ Night'}</button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">{menuOpen ? '×' : '☰'}</button>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="home">
          <div className="hero-image"><img data-parallax src={night ? "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=90" : "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=90"} alt="Warm contemporary hotel lounge" /></div>
          <div className="hero-index">A PLACE TO PAUSE · BETTIAH</div>
          <div className="hero-content">
            <div className="eyebrow">An invitation to slow down</div>
            <h1>A stay<br /><em>apart.</em></h1>
            <div className="hero-bottom">
              <p className="hero-copy">A thoughtful kind of hospitality. Spaces made for stillness, moments made to linger, and the comfort of feeling right where you belong.</p>
              <a className="round-link" href="#story">Discover<br />our story <span>↘</span></a>
            </div>
          </div>
        </section>

        <section className="intro" id="story"><div className="wrap intro-grid">
          <div className="intro-kicker eyebrow reveal">01 / A different rhythm</div>
          <h2 className="reveal">Some places are more than a destination.<br /><em>They stay with you.</em></h2>
          <div className="intro-bottom reveal"><p>At Kishan Hotel, we believe the most memorable stays are often the simplest: a warm welcome, a quiet corner, the soft light of morning. A considered space where every detail invites you to settle in and make the moment your own.</p><a className="text-link" href="#experience">The Kishan feeling ↗</a></div>
        </div></section>

        <section className="statement">
          <div className="statement-top"><span className="eyebrow">A sense of place</span><span className="eyebrow">Kishan Hotel · 01</span></div>
          <div className="statement-photo"><img data-parallax loading="lazy" src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=2200&q=85" alt="Serene sunlit boutique hotel room" /></div>
          <div className="statement-caption"><span>Quiet design. Considered comfort.</span><span>Spaces to simply be.</span></div>
        </section>

        <div className="marquee-strip" aria-label="Kishan Hotel — thoughtful hospitality"><div className="marquee-track" aria-hidden="true">{Array.from({ length: 4 }, (_, index) => <span key={index}>A slower kind of stay <i>✳</i> Thoughtful hospitality <i>✳</i> Room to simply be <i>✳</i></span>)}</div></div>

        <section className="rooms" id="rooms">
          <div className="wrap section-head"><div><div className="eyebrow reveal">02 / Your room, your rhythm</div><h2 className="reveal">Find your<br /><em>own space.</em></h2></div><p className="reveal">Thoughtfully imagined rooms, generous textures and the little comforts that turn a stay into something personal.</p></div>
          <div className="rooms-pin">
            <div className="rooms-track" ref={roomsTrack}>
              {rooms.map((room) => <article className="room-card" key={room.name}>
                <div className="room-image"><img loading="lazy" src={room.image} alt={room.name} /><span className="room-number">{room.type}</span></div>
                <div className="room-meta"><div><h3>{room.name}</h3><p>{room.note}</p></div><button className="room-arrow" type="button" onClick={() => setActiveRoom(rooms.findIndex((item) => item.name === room.name))} aria-label={`View details for ${room.name}`}>↗</button></div>
              </article>)}
            </div>
          </div>
          <div className="track-footer"><span>Swipe or scroll to explore</span><div className="track-arrows"><button onClick={() => scrollRooms(-1)} aria-label="Previous rooms">←</button><button onClick={() => scrollRooms(1)} aria-label="Next rooms">→</button></div></div>
        </section>

        <section className="experience" id="experience"><div className="wrap experience-grid">
          <div className="experience-image reveal"><img data-parallax loading="lazy" src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85" alt="Peaceful contemporary interior with natural light" /></div>
          <div className="experience-copy"><div className="eyebrow reveal">03 / The experience</div><h2 className="reveal">Made for<br /><em>the in-between.</em></h2><p className="reveal">The unhurried coffee. The pause between plans. The comfort of returning to a space that feels familiar. Discover a stay shaped around the moments that matter to you.</p>
            <div className="experience-list reveal">{[
              { title: 'Warm, personal hospitality', detail: 'A welcoming approach shaped around attentive service and the comfort of feeling at ease.' },
              { title: 'Spaces to gather and unwind', detail: 'A calm setting to pause, reconnect, and enjoy a slower moment during your stay.' },
              { title: 'Thoughtful comforts', detail: 'Simple details and considered spaces intended to make time away feel more effortless.' },
            ].map((item, i) => <div className="experience-accordion" key={item.title}>
              <button className="experience-row" type="button" onClick={() => setExpandedExperience(expandedExperience === i ? null : i)} aria-expanded={expandedExperience === i}>
                <span>{item.title}</span><span>{expandedExperience === i ? '−' : '0' + (i + 1) + ' +'}</span>
              </button>
              {expandedExperience === i && <p className="experience-detail">{item.detail}</p>}
            </div>)}</div>
          </div>
        </div></section>

        <section className="gallery" id="gallery"><div className="wrap">
          <div className="gallery-head"><div><div className="eyebrow reveal">04 / A glimpse inside</div><h2 className="reveal">The art of<br /><em>feeling at home.</em></h2></div><span className="eyebrow">A visual journal / 01—04</span></div>
          <div className="gallery-grid">{gallery.map(([src, alt], i) => <button className="gallery-item reveal" key={src} type="button" onClick={() => setActiveImage(i)} aria-label={`View larger: ${alt}`}><img loading="lazy" src={src} alt={alt} /><span className="gallery-zoom" aria-hidden="true">↗</span></button>)}</div>
          <div className="gallery-note"><span>Light, texture, atmosphere</span><span>Kishan Hotel · Visual stories</span></div>
        </div></section>

        <section className="quote"><div className="eyebrow">A note on staying</div><blockquote>“The best journeys bring you back to a place where you can simply be.”</blockquote><cite>The Kishan Hotel philosophy</cite></section>

        <section className="contact" id="contact"><div className="wrap contact-grid">
          <div><div className="eyebrow reveal">05 / Your next stay</div><h2 className="reveal">Come as you are.<br /><em>Stay awhile.</em></h2><p className="contact-copy reveal">We look forward to welcoming you. Get in touch with our team for reservations, questions, or to start planning your stay.</p></div>
          <div className="contact-panel reveal"><div className="contact-line"><span>Reservations</span><span>Contact details to be added</span></div><div className="contact-line"><span>Location</span><span>Hotel address to be added</span></div><div className="contact-line"><span>Enquiries</span><a href="#home">Back to the beginning ↗</a></div></div>
        </div></section>
      </main>
      {activeRoom !== null && <div className="room-dialog-backdrop" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) setActiveRoom(null); }}>
        <section className="room-dialog" role="dialog" aria-modal="true" aria-labelledby="room-dialog-title">
          <button className="room-dialog-close" type="button" onClick={() => setActiveRoom(null)} aria-label="Close room details">×</button>
          <img src={rooms[activeRoom].image} alt={rooms[activeRoom].name} />
          <div className="room-dialog-copy"><div className="eyebrow">{rooms[activeRoom].type}</div><h2 id="room-dialog-title">{rooms[activeRoom].name}</h2><p>{rooms[activeRoom].note}</p><p className="room-dialog-note">Room specifications and reservation details can be added once confirmed by the hotel.</p><a className="text-link" href="#contact" onClick={() => setActiveRoom(null)}>Make an enquiry ↗</a></div>
        </section>
      </div>}
      {activeImage !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={(event) => { if (event.target === event.currentTarget) setActiveImage(null); }}>
        <button className="lightbox-close" type="button" onClick={() => setActiveImage(null)} aria-label="Close image viewer">×</button>
        <button className="lightbox-arrow lightbox-prev" type="button" onClick={() => setActiveImage((activeImage - 1 + gallery.length) % gallery.length)} aria-label="Previous image">←</button>
        <figure><img src={gallery[activeImage][0]} alt={gallery[activeImage][1]} /><figcaption>{gallery[activeImage][1]} <span>{String(activeImage + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span></figcaption></figure>
        <button className="lightbox-arrow lightbox-next" type="button" onClick={() => setActiveImage((activeImage + 1) % gallery.length)} aria-label="Next image">→</button>
      </div>}
      <footer className="footer"><span className="footer-brand">Kishan Hotel</span><span>Thoughtful hospitality, always.</span><span>© {new Date().getFullYear()} Kishan Hotel</span></footer>
    </div>
  );
}
