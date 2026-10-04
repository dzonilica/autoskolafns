import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, MotionConfig, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { ArrowUpRight, ArrowRight, Phone, MapPin, EnvelopeSimple, InstagramLogo, Plus, Minus, X, List, Check, SteeringWheel, ShieldCheck, UserFocus } from '@phosphor-icons/react';
import { ParallaxImage, Reveal, Breadcrumb } from './ui';
import { AboutPage, PricingPage, ContactLocation } from './pages';
import { phone, email, instagramUrl, initialCategory, categoryKeys, chosenPackage, formatPrice, packageTotal, unitPrices } from './site-data';
import './style.css';
import './pages.css';
import './premium.css';

const IMG = '/images/';
const pageName = window.location.pathname.replace(/^\/+|\/+$/g, '').replace(/\/index\.html$/, '') || 'pocetna';
const navItems = [['/o-nama/', 'O nama'], ['/#obuka', 'Obuka'], ['/#kako-do-dozvole', 'Put do dozvole'], ['/cenovnik/', 'Cenovnik'], ['/kontakt/', 'Kontakt']];
const categories = {
  B: { title: 'Sloboda na četiri točka.', label: 'Obuka za automobil', image: 'cas-voznje', alt: 'Kandidatkinja vežba vožnju uz podršku instruktora', description: 'Od prvog susreta sa volanom do samostalne vožnje. Učiš da razumeš saobraćaj i sigurno reaguješ u stvarnim situacijama.', items: ['Teorijska nastava i priprema za test', 'Praktična obuka na poligonu i u gradu', 'Priprema za praktični ispit'] },
  A: { title: 'Doživi put drugačije.', label: 'Obuka za motocikl', image: 'motocikl', alt: 'Praktična obuka vožnje motocikla na poligonu', description: 'Ravnoteža, kontrola i dobre odluke. Uz podršku instruktora, stičeš veštine za bezbednu i samostalnu vožnju motocikla.', items: ['Teorijska priprema za motocikliste', 'Upravljanje motociklom i vežbe na poligonu', 'Vožnja u saobraćaju i priprema za ispit'] },
};

function Brand({ footer = false }) {
  return <a className={`brand ${footer ? 'brand-footer' : ''}`} href="/" title="FNS, početna stranica"><img className="brand-logo" src="/brand/fns-logo.webp" alt="FNS" width="355" height="320" /><span className="brand-description">AUTO ŠKOLA<br />NOVI SAD</span></a>;
}

const ease = [0.16, 1, 0.3, 1];
// The panel wipes down from under the header and staggers its links in; closing wipes it back up in one quick move.
const menuPanel = {
  closed: { clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.38, ease: [0.65, 0, 0.35, 1] } },
  open: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.55, ease, staggerChildren: 0.05, delayChildren: 0.08 } },
};
const menuPanelReduced = { closed: { opacity: 0, transition: { duration: 0.2 } }, open: { opacity: 1, transition: { duration: 0.2 } } };
const menuLink = { closed: { opacity: 0, y: 18, transition: { duration: 0.3 } }, open: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } };

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 0);
  const { scrollY } = useScroll();
  const toggle = useRef(null);
  const reduced = useReducedMotion();
  useMotionValueEvent(scrollY, 'change', y => setScrolled(y > 0));
  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (e.key === 'Escape') { setOpen(false); toggle.current?.focus(); } };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-menu-open' : ''}`}>
    <div className="header-inner container">
      <Brand />
      <nav className="desktop-nav" aria-label="Glavna navigacija">{navItems.map(([href, label]) => <a key={href} href={href} aria-current={href === `/${pageName}/` ? 'page' : undefined}>{label}</a>)}</nav>
      <a className="button button-small header-cta" href="/kontakt/#upit">Započni obuku <ArrowUpRight size={17} /></a>
      <button ref={toggle} className="menu-toggle icon-button" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Zatvori meni' : 'Otvori meni'} onClick={() => setOpen(!open)}>
        <AnimatePresence initial={false}>
          <motion.span key={open ? 'close' : 'open'} className="menu-icon" initial={{ opacity: 0, rotate: -90, scale: 0.6 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 90, scale: 0.6 }} transition={{ duration: 0.3, ease }}>{open ? <X size={26} /> : <List size={26} />}</motion.span>
        </AnimatePresence>
      </button>
    </div>
    <AnimatePresence>
      {open && <motion.div key="backdrop" className="menu-backdrop" aria-hidden="true" onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />}
      {open && <motion.nav key="nav" id="mobile-nav" className="mobile-nav" aria-label="Mobilna navigacija" variants={reduced ? menuPanelReduced : menuPanel} initial="closed" animate="open" exit="closed">
        {navItems.map(([href, label]) => <motion.a key={href} variants={menuLink} href={href} aria-current={href === `/${pageName}/` ? 'page' : undefined} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={22} /></motion.a>)}
      </motion.nav>}
    </AnimatePresence>
  </header>;
}

function Hero() {
  return <section id="pocetna" className="hero container" aria-labelledby="hero-title">
    <div className="hero-heading">
      <Reveal><p className="eyebrow">AUTO ŠKOLA FNS / NOVI SAD</p><h1 id="hero-title">Tvoj put.<br /><span>Tvoja sloboda.</span></h1></Reveal>
      <Reveal className="hero-aside" delay={0.12}><p>Dobra vožnja počinje dobrim osećajem. Stekni znanje i sigurnost za svaki sledeći kilometar.</p><a className="button" href="#kontakt">Započni obuku <ArrowUpRight size={20} /></a></Reveal>
    </div>
    <div className="hero-visual"><ParallaxImage name="hero" alt="Beli automobil za obuku na mirnoj ulici sa drvoredom" priority position="center 58%" sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1100px) calc(100vw - 64px), (max-width: 1336px) calc(100vw - 96px), 1240px" /></div>
  </section>;
}

function About() {
  return <section id="o-nama" className="about container section-space" aria-labelledby="about-title">
    <div className="about-grid">
      <Reveal className="about-copy"><h2 id="about-title">Mnogo više od<br />položenog ispita.</h2><p className="large-copy">Prvi čas se pamti.<br />Dobra obuka ostaje.</p><p>U FNS-u učimo zajedno, strpljivo i korak po korak. Da za volan sedneš sa znanjem, sigurnošću i poverenjem u sebe.</p><div className="experience"><span>15<span>+</span></span><p>godina iskustva<br />naših instruktora</p></div><a className="text-link" href="/o-nama/">Upoznaj naš pristup <ArrowUpRight size={20} /></a></Reveal>
      <div className="about-gallery"><Reveal className="about-photo" delay={0.1}><ParallaxImage name="ucionica" alt="Teorijska nastava i objašnjavanje saobraćajnih situacija" position="60% center" sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1100px) 50vw, 440px" /></Reveal>
      <Reveal className="about-note" delay={0.2}><div className="about-note-image"><ParallaxImage name="prostor" alt="Učionica auto škole FNS sa računarima za kandidate" sizes="(max-width: 767px) 35vw, 210px" /></div><p>Razumevanje na času.<br />Samopouzdanje na putu.</p></Reveal></div>
    </div>
    <div className="principles"><div><UserFocus size={24} weight="light" /><span>Pristup prilagođen tebi</span></div><div><SteeringWheel size={24} weight="light" /><span>Znanje za stvarnu vožnju</span></div><div><ShieldCheck size={24} weight="light" /><span>Sigurnost na prvom mestu</span></div></div>
  </section>;
}

function Training({ onDetails }) {
  const [active, setActive] = useState('B');
  const reduced = useReducedMotion();
  const selected = categories[active];
  return <section id="obuka" className="training section-space" aria-labelledby="training-title"><div className="container">
    <Reveal className="section-heading"><p className="eyebrow">IZABERI SVOJ PRAVAC</p><h2 id="training-title">Dva puta. Isti osećaj slobode.</h2><p>Automobil ili motocikl. Pronađi obuku za svoj sledeći korak.</p></Reveal>
    <div className="training-showcase">
      <Reveal className="training-selector">{Object.entries(categories).map(([key, data]) => <div key={key} className={`training-choice ${active === key ? 'is-active' : ''}`}>
        <h3><button id={`training-toggle-${key}`} className="training-toggle" aria-expanded={active === key} aria-controls={`training-panel-${key}`} onClick={() => setActive(key)}><span><span className="training-category">{key} kategorija</span><span className="training-name">{data.label}</span></span>{active === key ? <Minus size={21} weight="light" aria-hidden="true" /> : <Plus size={21} weight="light" aria-hidden="true" />}</button></h3>
        <div id={`training-panel-${key}`} className="training-panel" role="region" aria-labelledby={`training-toggle-${key}`} hidden={active !== key}><p>{data.description}</p><ul>{data.items.map(item => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul><button className="text-link" onClick={() => onDetails(key)} aria-label={`Detalji ${key} kategorije`}>Više o {key} kategoriji <ArrowUpRight size={19} /></button></div>
      </div>)}<a className="training-prices text-link" href="/cenovnik/">Pogledaj cene obuke <ArrowUpRight size={18} /></a></Reveal>
      <Reveal className="training-media" delay={0.1}><figure><div className="training-photo"><AnimatePresence initial={false} mode="sync"><motion.div className="training-photo-layer" key={active} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.35 }}><ParallaxImage name={selected.image} alt={selected.alt} sizes="(max-width: 767px) 100vw, 55vw" /></motion.div></AnimatePresence></div><figcaption aria-live="polite">{selected.title}</figcaption></figure></Reveal>
    </div>
  </div></section>;
}

const steps = [
  ['Upoznajemo se', 'Razgovaramo o tvojoj kategoriji, obuci i svim pitanjima pre upisa.'],
  ['Razumeš pravila', 'Teorijska nastava povezuje propise sa situacijama koje te čekaju na putu.'],
  ['Stičeš sigurnost', 'Od poligona do gradskih ulica, vežbaš uz podršku svog instruktora.'],
  ['Spreman za put', 'Pripremaš se za ispit i samostalnu vožnju sa znanjem koje ostaje.'],
];

function Journey() {
  return <section id="kako-do-dozvole" className="journey container section-space" aria-labelledby="journey-title">
    <Reveal className="section-heading"><h2 id="journey-title">Veliki korak.<br /><span>Nekoliko jasnih etapa.</span></h2><p>Od prvog razgovora do prvog samostalnog kilometra, znaš šta te čeka.</p></Reveal>
    <ol className="steps">{steps.map(([title, text], i) => <li key={title}><Reveal delay={i * 0.08}><div className="step-top"><span>0{i + 1}</span>{i < 3 ? <ArrowRight size={23} weight="light" /> : <Check size={23} weight="light" />}</div><h3>{title}</h3><p>{text}</p></Reveal></li>)}</ol>
  </section>;
}

function PhotoBreak() {
  return <section className="photo-break container" aria-label="Praktična obuka"><Reveal><ParallaxImage name="poligon" alt="Automobil za praktičnu obuku na prostranom poligonu" position="center 58%" /></Reveal><div className="photo-break-caption"><span>Za sve puteve koji te čekaju.</span><span>Počni od dobrih osnova.</span></div></section>;
}

const questions = [
  ['Kako izgleda upis u auto školu?', 'Javi nam se telefonom, e-mailom ili dođi u Kosovsku 30. Zajedno prolazimo kroz izbor kategorije, potrebnu dokumentaciju, cenu i početak obuke.'],
  ['Da li mi je potrebno prethodno iskustvo?', 'Ne. Obuka je namenjena i potpunim početnicima. Krećemo od osnova i postepeno gradimo znanje i sigurnost, uz podršku instruktora.'],
  ['Koliko košta obuka?', `Cena zavisi od kategorije i dozvole koju već imaš: čas teorije je ${formatPrice(unitPrices.theory)} din, čas vožnje ${formatPrice(unitPrices.driving)} din, a polaganje ${formatPrice(unitPrices.exam)} din. Svi paketi su na stranici Cenovnik.`],
  ['Kako se dogovaraju termini časova?', 'Raspored teorijske nastave i časove vožnje dogovaraš sa školom, u skladu sa slobodnim terminima. Prilikom upisa reci nam koje ti vreme najviše odgovara.'],
  ['Gde se nalazi auto škola FNS?', 'Nalazimo se u Kosovskoj 30 u Novom Sadu. Kontakt i link do mape nalaze se odmah ispod. Svrati da se upoznamo i odgovorimo na tvoja pitanja.'],
];

function FAQ() {
  return <section className="faq container section-space" aria-labelledby="faq-title"><Reveal className="faq-heading"><h2 id="faq-title">Pre nego<br />što kreneš.</h2><p>Odgovori na pitanja koja nam najčešće postavljate.</p><span className="faq-monogram" aria-hidden="true">?</span></Reveal><div className="faq-list">{questions.map(([q, a]) => <details key={q} name="faq"><summary>{q}<Plus size={21} weight="light" /></summary><p>{a}</p></details>)}</div></section>;
}

function Contact({ category, setCategory, standalone = false }) {
  const Heading = standalone ? 'h1' : 'h2';
  const chosen = standalone ? chosenPackage() : null;
  useEffect(() => {
    if (standalone && window.location.hash === '#upit') {
      document.querySelector('input[name="name"]')?.focus({ preventScroll: true });
    }
  }, [standalone]);
  const [prepared, setPrepared] = useState(null);
  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Zdravo, želim informacije o obuci za ${category} kategoriju.\n\nIme i prezime: ${data.get('name')}\nE-mail: ${data.get('email')}\nTelefon: ${data.get('phone') || 'Nije naveden'}\n\n${data.get('message') || ''}`;
    setPrepared(`mailto:${email}?subject=${encodeURIComponent(`Upit za ${category} kategoriju`)}&body=${encodeURIComponent(body)}`);
  };
  return <section id="kontakt" className={`contact section-space ${standalone ? 'contact-page' : ''}`} aria-labelledby="contact-title"><div className="container contact-grid">
    <Reveal className="contact-copy"><p className="eyebrow">{standalone ? 'KONTAKT' : 'SLEDEĆI KORAK JE TVOJ'}</p><Heading id="contact-title">Za više odgovora<br /><span>kontaktiraj nas</span></Heading><p>O svemu ostalom možemo da razgovaramo.<br />Javi se i napravi svoj prvi korak.</p><a className="contact-phone" href={`tel:${phone}`}>069 164 6590 <ArrowUpRight weight="light" size={27} /></a><div className="contact-details"><a href="https://www.google.com/maps/search/?api=1&query=Auto+skola+FNS+Kosovska+30+Novi+Sad" target="_blank" rel="noreferrer"><MapPin size={21} weight="light" /><span>Kosovska 30, Novi Sad<small>Prikaži na mapi <ArrowUpRight size={13} /></small></span></a><a href={`mailto:${email}`}><EnvelopeSimple size={21} weight="light" /><span>{email}</span></a><a href={instagramUrl} target="_blank" rel="noreferrer"><InstagramLogo size={21} weight="light" /><span>@autoskolafns<small>Instagram <ArrowUpRight size={13} /></small></span></a></div><div className="office-hours"><h3>Radno vreme</h3><p>Pon - pet: 09:00 - 17:00<br />Subota: 09:00 - 14:00</p></div></Reveal>
    <Reveal className="contact-form-wrap" delay={0.12}><form id="upit" onSubmit={submit} onChange={() => prepared && setPrepared(null)}><h3>Kontaktiraj nas</h3><p className="form-intro">Zanima me obuka za:</p><fieldset className="category-picker"><legend className="sr-only">Izaberi kategoriju</legend>{categoryKeys.map(k => <label key={k} className={category === k ? 'selected' : ''}><input type="radio" name="category" value={k} checked={category === k} onChange={() => setCategory(k)} /><span>{k} kategorija</span>{category === k && <Check size={17} />}</label>)}</fieldset><div className="form-fields"><label>Ime i prezime<input name="name" autoComplete="name" placeholder="Kako se zoveš?" required maxLength={100} /></label><div className="form-row"><label>E-mail<input name="email" type="email" autoComplete="email" placeholder="tvoj@email.com" required maxLength={160} /></label><label>Telefon <span>(opciono)</span><input name="phone" type="tel" autoComplete="tel" placeholder="06x xxx xxxx" maxLength={40} /></label></div><label>Poruka <span>(opciono)</span><textarea name="message" defaultValue={chosen ? `Želim da se upišem. Paket: ${chosen.label} (ukupno ${formatPrice(packageTotal(chosen))} din).` : ''} rows={standalone ? 3 : 2} placeholder="Šta želiš da znaš o obuci?" maxLength={1500} /></label></div><p className="form-note">Upit šalješ preko svoje e-mail aplikacije. Podaci se ne čuvaju na ovom sajtu.</p><button className="button form-submit" type="submit">Pripremi upit <ArrowUpRight size={20} /></button>{prepared && <div className="form-confirmation" role="status"><Check size={21} /><div><strong>Upit je spreman.</strong><p>Otvori e-mail aplikaciju, proveri poruku i pošalji je školi.</p><a className="text-link" href={prepared}>Otvori e-mail aplikaciju <ArrowUpRight size={17} /></a><small>Ako nemaš e-mail aplikaciju, piši na {email} ili nas pozovi.</small></div></div>}</form></Reveal>
  </div></section>;
}

function CategoryDialog({ category, close, onChoose }) {
  const ref = useRef(null);
  const data = category ? categories[category] : null;
  useEffect(() => {
    const dialog = ref.current;
    if (category) { dialog.showModal(); document.body.classList.add('dialog-open'); }
    else { dialog.close(); document.body.classList.remove('dialog-open'); }
    return () => document.body.classList.remove('dialog-open');
  }, [category]);
  return <dialog className="category-dialog" ref={ref} onCancel={close} onClick={e => { if (e.target === ref.current) close(); }} aria-labelledby="dialog-title">{data && <div className="dialog-content"><button autoFocus className="icon-button dialog-close" onClick={close} aria-label="Zatvori detalje"><X size={24} /></button><img className="dialog-image" src={`${IMG}${data.image}-800.webp`} alt={data.alt} width="800" height="533" /><div className="dialog-body"><p className="eyebrow">{category} KATEGORIJA</p><h2 id="dialog-title">{data.title}</h2><p>{data.description}</p><ul>{data.items.map(item => <li key={item}><Check size={18} />{item}</li>)}</ul><p className="dialog-note">Za cenu, uslove upisa i raspoložive termine, javi se našem timu.</p><button className="button" onClick={() => onChoose(category)}>Zanima me {category} kategorija <ArrowUpRight size={19} /></button></div></div>}</dialog>;
}

function Footer() {
  return <footer className="footer container"><div className="footer-top"><Brand footer /><p>Dobri vozači počinju<br />dobrom obukom.</p><nav className="footer-nav" aria-label="Navigacija u podnožju"><a href="/o-nama/">O nama</a><a href="/cenovnik/">Cenovnik</a><a href="/kontakt/">Kontakt</a></nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Auto škola FNS. Sva prava zadržana.</span><a href={`tel:${phone}`}><Phone size={15} /> Tu smo za tvoja pitanja.</a><span>Novi Sad, Srbija</span></div></footer>;
}

function App() {
  const [detail, setDetail] = useState(null);
  const [category, setCategory] = useState(initialCategory);
  const reduced = useReducedMotion();
  const select = key => {
    setCategory(key); setDetail(null);
    requestAnimationFrame(() => {
      document.getElementById('kontakt')?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' });
      document.querySelector('input[name="name"]')?.focus({ preventScroll: true });
    });
  };
  return <MotionConfig reducedMotion="user"><a className="skip-link" href="#sadrzaj">Preskoči na sadržaj</a><Header /><main id="sadrzaj" tabIndex={-1}>{pageName === 'o-nama' ? <AboutPage /> : pageName === 'cenovnik' ? <PricingPage /> : pageName === 'kontakt' ? <><Breadcrumb current="Kontakt" /><Contact category={category} setCategory={setCategory} standalone /><ContactLocation /></> : <><Hero /><About /><Training onDetails={setDetail} /><Journey /><PhotoBreak /><FAQ /><Contact category={category} setCategory={setCategory} /></>}</main><Footer /><CategoryDialog category={detail} close={() => setDetail(null)} onChoose={select} /></MotionConfig>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
