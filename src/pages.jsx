import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, Check, CheckCircle, Coins, CreditCard, Info, MapPin, Plus, SealCheck, ShieldCheck, SteeringWheel, UserFocus } from '@phosphor-icons/react';
import { Breadcrumb, PageCTA, ParallaxImage, Reveal } from './ui';
import { categoryKeys, formatPrice, initialCategory, mapUrl, packageTotal, priceCategories, unitPrices } from './site-data';

export function AboutPage() {
  return <>
    <Breadcrumb current="O nama" />
    <section className="about-page-hero container" aria-labelledby="about-page-title">
      <Reveal className="page-hero-copy"><p className="eyebrow">O NAMA</p><h1 id="about-page-title">Znanje ostaje.<br /><span>Sigurnost raste.</span></h1><p>U FNS-u učimo za stvarne puteve, uz strpljenje, jasna objašnjenja i podršku na svakom času.</p><a href="/kontakt/#upit" className="button">Započni obuku <ArrowUpRight size={20} /></a></Reveal>
      <Reveal className="about-page-visual" delay={0.1}><ParallaxImage name="prostor" alt="Učionica auto škole FNS sa računarima za teorijsku nastavu" priority sizes="(max-width: 767px) 100vw, 50vw" /></Reveal>
    </section>
    <section className="school-story container section-space" aria-labelledby="story-title">
      <Reveal className="school-experience"><span>15<span>+</span></span><p>godina iskustva<br />naših instruktora</p></Reveal>
      <Reveal className="school-story-copy"><h2 id="story-title">Dobar instruktor.<br />Velika razlika.</h2><p>Prvi susret sa vožnjom donosi mnogo pitanja. Tu smo da objasnimo, ponovimo i pomognemo ti da svaki sledeći čas dočekaš sa više sigurnosti.</p><p>Naš tim licenciranih instruktora vodi obuku za A i B kategoriju u Novom Sadu. Spajamo teoriju sa praktičnim situacijama, uz pristup prilagođen svakom kandidatu.</p><a className="text-link" href="/cenovnik/">Pogledaj cenovnik <ArrowUpRight size={20} /></a></Reveal>
    </section>
    <section className="approach-section section-space" aria-labelledby="approach-title"><div className="container approach-grid">
      <Reveal className="approach-photo"><ParallaxImage name="cas-voznje" alt="Ilustracija praktičnog časa vožnje sa instruktorom" position="42% center" /></Reveal>
      <div><Reveal><h2 id="approach-title">Tvoj tempo.<br />Naša podrška.</h2></Reveal><div className="approach-list">{[
        [UserFocus, 'Slobodno pitaj.', 'Jasna objašnjenja i prostor za svako pitanje, od prvih pravila do složenijih saobraćajnih situacija.'],
        [SteeringWheel, 'Uči kroz vožnju.', 'Znanje sa teorijske nastave primenjuješ na poligonu i gradskim ulicama, uz podršku instruktora.'],
        [ShieldCheck, 'Gradi dobre navike.', 'Pažnja, procena i odgovornost deo su svakog časa. Cilj je sigurnost i kada počneš da voziš samostalno.'],
      ].map(([Icon, title, text], i) => <Reveal className="approach-item" key={title} delay={i * 0.06}><Icon size={27} weight="light" /><div><h3>{title}</h3><p>{text}</p></div></Reveal>)}</div></div>
    </div></section>
    <section className="school-space container section-space" aria-labelledby="space-title"><Reveal><h2 id="space-title">Od učionice do ulice.</h2><p>Teorija daje osnovu. Praksa je pretvara u znanje koje koristiš svakog dana.</p></Reveal><div className="school-gallery"><figure><ParallaxImage name="prostor" alt="Računari za teorijsku nastavu u auto školi FNS" /><figcaption>Prostor za učenje i pripremu.</figcaption></figure><figure><ParallaxImage name="poligon" alt="Ilustracija automobila za obuku na poligonu" /><figcaption>Mesto za prve sigurne pokrete.</figcaption></figure></div></section>
    <PageCTA />
  </>;
}

const price = value => `${formatPrice(value)} din`;
const rich = text => text.split('**').map((part, i) => i % 2 ? <strong key={i}>{part}</strong> : part);

const processSteps = [
  ['Upis', 'Lična karta i potpis ugovora. Za maloletnike — saglasnost roditelja.'],
  ['Teorija', `7–40 časova u učionici, u zavisnosti od trenutne dozvole. ${price(unitPrices.theory)} / čas.`],
  ['Teorijski ispit', 'Zvanični test u školi. Položen test važi 18 meseci za nastavak obuke.'],
  ['Lekarsko uverenje', 'Neophodno pre početka vožnje. Uverenje važi 1 godinu.'],
  ['Vožnja', `7–40 časova sa instruktorom u realnom saobraćaju. ${price(unitPrices.driving)} / čas.`],
  ['Praktični ispit', 'Vožnja pred ispitivačem. Nakon polaganja spremamo dokumentaciju za probnu dozvolu.'],
];

const processFacts = [
  ['Trajanje', '2–3 meseca', 'Prosečno trajanje kompletne obuke za B kategoriju. Teorija 2–3 nedelje, vožnja oko 2 meseca — u zavisnosti od tvog rasporeda.'],
  ['Rokovi', '18 meseci', 'Rok važenja teorijskog ispita — u tom periodu se mora položiti praktični, u suprotnom se teorija polaže ponovo.'],
  ['Termini', 'Fleksibilno', 'Časovi se planiraju prema tvom rasporedu — pre ili posle posla, vikendom. Radimo pon–pet 09–17, sub 09–14.'],
];

const priceQuestions = [
  ['Koliko traje obuka za B kategoriju?', 'Kompletna obuka za B kategoriju traje prosečno 2–3 meseca. Teorija (40č) oko 2–3 nedelje, vožnja (40č) oko 2 meseca, zavisno od tvog rasporeda.'],
  ['Da li mogu da platim na rate?', 'Da. Plaćanje je moguće gotovinom u više rata, čekovima, administrativnom zabranom ili bankarskim kreditom. Bez kamate i bez skrivenih troškova.'],
  ['Šta je potrebno za upis?', 'Za punoletne — važeća lična karta. Za maloletnike (od 16 god.) — lična karta i potpis jednog roditelja/staratelja na ugovor. Lekarsko uverenje je potrebno pre praktične obuke.'],
  ['Koliko važi položeni teorijski ispit?', '18 meseci. Ako u tom roku ne položiš praktični deo, teorijski ispit se mora ponovo polagati.'],
  ['Kako se računa cena obuke?', <>Cena je transparentna i jednaka za sve kategorije: <strong>{formatPrice(unitPrices.theory)} dinara po času teorije</strong>, <strong>{formatPrice(unitPrices.driving)} dinara po času vožnje</strong> i <strong>{formatPrice(unitPrices.exam)} dinara jednokratno za polaganje</strong> (teorijski + praktični ispit). Ako već imaš neku kategoriju, broj časova je manji — pa je i cena niža. Svi paketi su prikazani iznad.</>],
  ['Da li mogu da odustanem tokom obuke?', <>Naravno. Plaća se samo ono što je do tog trenutka odslušano i odvoženo. Bez penala i bez dodatnih troškova. Za detalje pogledaj ugovor ili nas <a href="/kontakt/">kontaktiraj</a>.</>],
  ['Gde mogu da vežbam testove?', <>Zvanični testovi za polaganje teorijskog dela ispita dostupni su putem portala eUprave. <a href="https://servisi.euprava.gov.rs/autoskole/prijava" target="_blank" rel="noreferrer">Prijavi se na eUpravu <ArrowUpRight size={14} /></a></>],
];

function PackageCard({ category, item, index }) {
  return <article className="package-card" aria-labelledby={`paket-${category}-${index}`}>
    <div className="package-head"><h3 id={`paket-${category}-${index}`}>{item.label}</h3><span className="package-badge">{category} Kat.</span></div>
    <dl className="package-rows">
      <div><dt>Teorija{item.theory > 0 && <span> ({item.theory}č × {formatPrice(unitPrices.theory)})</span>}</dt><dd>{item.theory > 0 ? price(item.theory * unitPrices.theory) : <span className="package-none">NEMA</span>}</dd></div>
      <div><dt>Vožnja <span>({item.driving}č × {formatPrice(unitPrices.driving)})</span></dt><dd>{price(item.driving * unitPrices.driving)}</dd></div>
      <div><dt>Polaganje <span>(T + V)</span></dt><dd>{price(unitPrices.exam)}</dd></div>
      <div className="package-total"><dt>Ukupno</dt><dd>{price(packageTotal(item))}</dd></div>
    </dl>
    <a className="button button-dark" href={`/kontakt/?kategorija=${category}&paket=${index}#upit`} aria-label={`Upiši se: ${category} kategorija, ${item.label}`}>Upiši se <ArrowRight size={17} /></a>
  </article>;
}

export function PricingPage() {
  const [category, setCategory] = useState(initialCategory);
  const data = priceCategories[category];
  const full = data.packages[0];
  return <>
    <Breadcrumb current="Cenovnik" />
    <section className="pricing-hero container" aria-labelledby="pricing-title">
      <Reveal className="page-hero-copy"><p className="eyebrow">CENOVNIK</p><h1 id="pricing-title">Koji paket<br /><span>tebi odgovara?</span></h1></Reveal>
      <Reveal className="pricing-intro" delay={0.1}><p>Tačna cena obuke zavisi od tvoje trenutne dozvole i odabrane kategorije. Svi paketi rade po istim jediničnim cenama — <strong>{price(unitPrices.theory)}</strong> čas teorije, <strong>{price(unitPrices.driving)}</strong> čas vožnje i <strong>{price(unitPrices.exam)}</strong> polaganje (teorijski + praktični ispit).</p><p>Ispod imaš razrađen paket za svaki slučaj.</p></Reveal>
    </section>
    <section className="unit-prices container" aria-labelledby="unit-title"><Reveal className="unit-card">
      <div className="unit-head"><span className="unit-icon" aria-hidden="true"><Coins size={22} weight="bold" /></span><div><h2 id="unit-title">Jedinične cene obuke</h2><p>Iste za sve kategorije — ukupna cena zavisi samo od broja časova.</p></div></div>
      <dl className="unit-grid">
        <div><dt>Čas teorije</dt><dd><strong>{formatPrice(unitPrices.theory)}</strong> din / čas</dd></div>
        <div><dt>Čas vožnje</dt><dd><strong>{formatPrice(unitPrices.driving)}</strong> din / čas</dd></div>
        <div><dt>Polaganje (T + V)</dt><dd><strong>{formatPrice(unitPrices.exam)}</strong> din, jednokratno</dd></div>
      </dl>
      <p className="unit-formula"><strong>Kako se računa:</strong> ukupna cena = (broj časova teorije × {formatPrice(unitPrices.theory)}) + (broj časova vožnje × {formatPrice(unitPrices.driving)}) + {price(unitPrices.exam)} polaganje. Ako već imaš neku kategoriju, propisani broj časova je manji — pa je i cena niža.</p>
    </Reveal></section>
    <section id="paketi" className="packages container" aria-labelledby="packages-title">
      <h2 id="packages-title" className="sr-only">Paketi obuke za {category} kategoriju</h2>
      <fieldset className="category-tabs"><legend className="sr-only">Izaberi kategoriju</legend>{categoryKeys.map(key => <label key={key} className={category === key ? 'selected' : ''}><input type="radio" name="price-category" value={key} checked={category === key} onChange={() => setCategory(key)} aria-label={`${key} kategorija`} aria-controls="paketi-lista kategorija-detalji" /><span aria-hidden="true">{key}</span></label>)}</fieldset>
      <div id="paketi-lista"><Reveal key={category} className="package-grid">{data.packages.map((item, index) => <PackageCard key={item.label} category={category} item={item} index={index} />)}</Reveal></div>
    </section>
    <section id="kategorija-detalji" className="category-detail container" aria-labelledby="category-detail-title"><div className="category-detail-inner">
      <div className="category-detail-main">
        <span className="category-detail-letter" aria-hidden="true">{category}</span>
        <p className="eyebrow">{category} KATEGORIJA</p>
        <h2 id="category-detail-title">{data.name}</h2>
        <p className="category-detail-text">{rich(data.description)}</p>
        <ul className="category-facts" aria-label={`Osnovni podaci za ${category} kategoriju`}>
          <li>Upis <strong>{data.ages[0]} god.</strong></li>
          <li>Ispit <strong>{data.ages[1]} god.</strong></li>
          <li>Teorija <strong>{full.theory}č</strong></li>
          <li>Vožnja <strong>{full.driving}č</strong></li>
          <li>{data.limit[0]} <strong>{data.limit[1]}</strong></li>
        </ul>
      </div>
      <div className="category-conditions"><h3>Uslovi i dokumenti</h3><ul>{data.conditions.map(text => <li key={text}><CheckCircle size={20} weight="fill" aria-hidden="true" /><span>{rich(text)}</span></li>)}</ul></div>
    </div></section>
    <section className="pricing-terms container" aria-label="Plaćanje i napomene"><ul>
      <li><CreditCard size={24} weight="light" aria-hidden="true" /><p><strong>Plaćanje na rate — bez kamate:</strong> Gotovinom, čekovima građana, administrativnom zabranom ili bankarskim kreditom. Broj rata biraju kandidati.</p></li>
      <li><SealCheck size={24} weight="light" aria-hidden="true" /><p><strong>Bez skrivenih troškova:</strong> Cena iz cenovnika je konačna — teorija + vožnja + polaganje. Šta dogovorimo, to i platiš.</p></li>
      <li><Info size={24} weight="light" aria-hidden="true" /><p><strong>Napomena:</strong> Za direktan pristup A kategoriji potrebno je min. 24 godine starosti. Cene važe od 2026. i mogu se dogovoriti u više rata. <a href="/kontakt/#upit">Pitaj za detalje</a></p></li>
    </ul></section>
    <section className="process container section-space" aria-labelledby="process-title">
      <Reveal className="section-heading"><p className="eyebrow">POSTUPAK OBUKE</p><h2 id="process-title">Kako obuka teče.</h2><p>Isti proces važi za sve kategorije. Trajanje se razlikuje samo po broju časova.</p></Reveal>
      <ol className="steps process-steps">{processSteps.map(([title, text], i) => <li key={title}><Reveal delay={(i % 3) * 0.08}><div className="step-top"><span>0{i + 1}</span>{i < processSteps.length - 1 ? <ArrowRight size={23} weight="light" /> : <Check size={23} weight="light" />}</div><h3>{title}</h3><p>{text}</p></Reveal></li>)}</ol>
      <div className="process-facts">{processFacts.map(([label, value, text], i) => <Reveal key={label} className="process-fact" delay={i * 0.06}><p className="process-fact-label">{label}</p><strong>{value}</strong><p>{text}</p></Reveal>)}</div>
    </section>
    <section className="faq container pricing-faq" aria-labelledby="pricing-faq-title"><Reveal className="faq-heading"><p className="eyebrow">PITANJA I ODGOVORI</p><h2 id="pricing-faq-title">Česta<br />pitanja.</h2><p>Nekoliko korisnih odgovora pre prvog razgovora.</p></Reveal><div className="faq-list">{priceQuestions.map(([q, a]) => <details name="pricing-faq" key={q}><summary>{q}<Plus size={21} weight="light" /></summary><p>{a}</p></details>)}</div></section>
    <PageCTA />
  </>;
}

export function ContactLocation() {
  const [showMap, setShowMap] = useState(false);
  return <section className="location-section container section-space" aria-labelledby="location-title"><div className="location-copy"><h2 id="location-title">Svrati da<br />se upoznamo.</h2><p>Čekamo te u Kosovskoj 30 u Novom Sadu. Dođi sa pitanjima o obuci, upisu ili terminima.</p><a className="text-link" href={mapUrl} target="_blank" rel="noreferrer">Otvori putanju u Google Maps <ArrowUpRight size={19} /></a><div className="visit-note"><h3>Pre dolaska</h3><p>Ako želiš razgovor o određenoj kategoriji, pozovi nas da proverimo termin koji ti odgovara.</p></div></div><div className="location-map">{showMap ? <iframe title="Lokacija auto škole FNS, Kosovska 30, Novi Sad" src="https://www.google.com/maps?q=Auto+skola+FNS+Kosovska+30+Novi+Sad&output=embed" loading="lazy" referrerPolicy="no-referrer" allowFullScreen /> : <><MapPin size={44} weight="light" /><h3>Kosovska 30</h3><p>Novi Sad, Srbija</p><button className="button" onClick={() => setShowMap(true)}>Prikaži mapu <ArrowUpRight size={18} /></button><small>Učitava Google Maps.</small></>}</div></section>;
}
