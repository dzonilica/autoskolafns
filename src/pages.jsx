import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, Check, CheckCircle, Coins, CreditCard, Info, MapPin, Plus, SealCheck, ShieldCheck, SteeringWheel, UserFocus } from '@phosphor-icons/react';
import { Breadcrumb, PageCTA, ParallaxImage, Reveal } from './ui';
import { categoryKeys, formatPrice, initialCategory, mapUrl, packageTotal, priceCategories, unitPrices } from './site-data';

export function AboutPage() {
  return <>
    <Breadcrumb current="O nama" />
    <section className="about-page-hero container" aria-labelledby="about-page-title">
      <Reveal className="page-hero-copy"><p className="eyebrow">O NAMA</p><h1 id="about-page-title">O auto školi FNS<br /><span>u Novom Sadu</span></h1><p>Auto škola FNS pruža teorijsku i praktičnu obuku za A i B kategoriju. Nastava obuhvata saobraćajne propise, časove vožnje i pripremu za vozački ispit.</p><a href="/kontakt/#upit" className="button">Informacije o upisu <ArrowUpRight size={20} /></a></Reveal>
      <Reveal className="about-page-visual" delay={0.1}><ParallaxImage name="prostor" alt="Učionica auto škole FNS sa računarima za teorijsku nastavu" priority sizes="(max-width: 767px) 100vw, 50vw" /></Reveal>
    </section>
    <section className="school-story container section-space" aria-labelledby="story-title">
      <Reveal className="school-experience"><span>15<span>+</span></span><p>godina iskustva<br />naših instruktora</p></Reveal>
      <Reveal className="school-story-copy"><h2 id="story-title">Licencirani<br />instruktori vožnje</h2><p>Instruktori imaju više od 15 godina iskustva u obuci kandidata. Tokom časova objašnjavaju postupke upravljanja vozilom i primenu saobraćajnih propisa.</p><p>Obuka se prilagođava prethodnom znanju kandidata. Posebna pažnja posvećuje se kontroli vozila, proceni saobraćajnih situacija i pripremi za polaganje ispita.</p><a className="text-link" href="/cenovnik/">Cenovnik vozačke obuke <ArrowUpRight size={20} /></a></Reveal>
    </section>
    <section className="approach-section section-space" aria-labelledby="approach-title"><div className="container approach-grid">
      <Reveal className="approach-photo"><ParallaxImage name="cas-voznje" alt="Ilustracija praktičnog časa vožnje sa instruktorom" position="42% center" /></Reveal>
      <div><Reveal><h2 id="approach-title">Sadržaj<br />vozačke obuke</h2></Reveal><div className="approach-list">{[
        [UserFocus, 'Saobraćajni propisi', 'Pravila prvenstva prolaza, saobraćajni znakovi i bezbedno ponašanje učesnika u saobraćaju.'],
        [SteeringWheel, 'Upravljanje vozilom', 'Vežbe na poligonu i vožnja u saobraćaju, uz objašnjenja i nadzor instruktora.'],
        [ShieldCheck, 'Priprema za ispit', 'Primena teorijskog znanja, pravilno izvođenje radnji vozilom i priprema za praktični vozački ispit.'],
      ].map(([Icon, title, text], i) => <Reveal className="approach-item" key={title} delay={i * 0.06}><Icon size={27} weight="light" /><div><h3>{title}</h3><p>{text}</p></div></Reveal>)}</div></div>
    </div></section>
    <section className="school-space container section-space" aria-labelledby="space-title"><Reveal><h2 id="space-title">Teorijska nastava i praktična obuka</h2><p>Teorijska nastava održava se u učionici. Praktični časovi obuhvataju vežbe na poligonu i vožnju u saobraćaju.</p></Reveal><div className="school-gallery"><figure><ParallaxImage name="prostor" alt="Računari za teorijsku nastavu u auto školi FNS" /><figcaption>Učionica za teorijsku nastavu.</figcaption></figure><figure><ParallaxImage name="poligon" alt="Ilustracija automobila za obuku na poligonu" /><figcaption>Vežbe vožnje na poligonu.</figcaption></figure></div></section>
    <PageCTA />
  </>;
}

const price = value => `${formatPrice(value)} din`;
const rich = text => text.split('**').map((part, i) => i % 2 ? <strong key={i}>{part}</strong> : part);

const processSteps = [
  ['Upis', 'Provera dokumentacije i potpisivanje ugovora o obuci. Za maloletne kandidate potrebna je saglasnost roditelja ili staratelja.'],
  ['Teorija', `Broj časova zavisi od kategorije i postojeće vozačke dozvole. ${price(unitPrices.theory)} / čas.`],
  ['Teorijski ispit', 'Polaganje teorijskog ispita nakon završene teorijske nastave.'],
  ['Lekarsko uverenje', 'Lekarsko uverenje potrebno je pre početka praktične obuke.'],
  ['Vožnja', `Časovi sa instruktorom na poligonu i u saobraćaju. ${price(unitPrices.driving)} / čas.`],
  ['Praktični ispit', 'Polaganje praktičnog ispita nakon završene praktične obuke.'],
];

const processFacts = [
  ['Trajanje', 'Prema rasporedu', 'Trajanje obuke zavisi od broja časova, rasporeda nastave i dostupnih termina ispita.'],
  ['Obim obuke', 'Po kategoriji', 'Broj teorijskih i praktičnih časova zavisi od izabrane kategorije i vozačke dozvole koju kandidat već poseduje.'],
  ['Termini', 'Po dogovoru', 'Raspored časova dogovara se sa školom, prema dostupnosti instruktora i kandidata. Informacije o početku obuke dostupne su u kancelariji.'],
];

const priceQuestions = [
  ['Koliko traje obuka za B kategoriju?', 'Trajanje zavisi od potrebnog broja časova, rasporeda nastave i termina ispita. Paket za kandidata bez vozačke dozvole uključuje 40 časova teorije i 40 časova vožnje. Za procenu trajanja i početak obuke kontaktirajte školu.'],
  ['Da li mogu da platim na rate?', 'Za mogućnost plaćanja na rate, broj uplata i prihvaćene načine plaćanja kontaktirajte školu. Uslovi plaćanja utvrđuju se ugovorom o obuci.'],
  ['Šta je potrebno za upis?', 'Važeća lična karta i ugovor o obuci. Za maloletne kandidate potrebna je saglasnost roditelja ili staratelja. Lekarsko uverenje dostavlja se pre praktične obuke. Uzrast za upis zavisi od kategorije.'],
  ['Koliko važi položeni teorijski ispit?', 'Položen teorijski ispit važi 18 meseci. Praktični ispit mora se položiti u tom roku; nakon isteka roka teorijski ispit polaže se ponovo.'],
  ['Kako se računa cena obuke?', <>Ukupan iznos paketa računa se prema broju časova i prikazanim jediničnim cenama: <strong>{formatPrice(unitPrices.theory)} dinara po času teorije</strong>, <strong>{formatPrice(unitPrices.driving)} dinara po času vožnje</strong> i <strong>{formatPrice(unitPrices.exam)} dinara za polaganje</strong> (teorijski + praktični ispit). Broj časova zavisi od izabrane kategorije i prethodne vozačke dozvole. Pregled paketa prikazan je iznad.</>],
  ['Da li mogu da odustanem tokom obuke?', <>Uslovi prekida obuke i obračun održanih časova uređeni su ugovorom. Za informacije o konkretnom slučaju <a href="/kontakt/">kontaktirajte školu</a>.</>],
  ['Gde mogu da vežbam testove?', <>Zvanični testovi za polaganje teorijskog dela ispita dostupni su putem portala eUprave. <a href="https://servisi.euprava.gov.rs/autoskole/prijava" target="_blank" rel="noreferrer">Prijava na eUpravu <ArrowUpRight size={14} /></a></>],
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
    <a className="button button-dark" href={`/kontakt/?kategorija=${category}&paket=${index}#upit`} aria-label={`Upit za upis: ${category} kategorija, ${item.label}`}>Upit za upis <ArrowRight size={17} /></a>
  </article>;
}

export function PricingPage() {
  const [category, setCategory] = useState(initialCategory);
  const data = priceCategories[category];
  const full = data.packages[0];
  return <>
    <Breadcrumb current="Cenovnik" />
    <section className="pricing-hero container" aria-labelledby="pricing-title">
      <Reveal className="page-hero-copy"><p className="eyebrow">CENOVNIK</p><h1 id="pricing-title">Cenovnik<br /><span>vozačke obuke</span></h1></Reveal>
      <Reveal className="pricing-intro" delay={0.1}><p>Cene obuke za B, A1, A2 i A kategoriju zavise od potrebnog broja časova i postojeće vozačke dozvole. Prikazane jedinične cene su: <strong>{price(unitPrices.theory)}</strong> čas teorije, <strong>{price(unitPrices.driving)}</strong> čas vožnje i <strong>{price(unitPrices.exam)}</strong> polaganje (teorijski + praktični ispit).</p><p>Izaberite kategoriju za pregled paketa, broja časova i ukupnog iznosa.</p></Reveal>
    </section>
    <section className="unit-prices container" aria-labelledby="unit-title"><Reveal className="unit-card">
      <div className="unit-head"><span className="unit-icon" aria-hidden="true"><Coins size={22} weight="bold" /></span><div><h2 id="unit-title">Jedinične cene obuke</h2><p>Ukupan iznos paketa dobija se iz broja časova teorije i vožnje i cene polaganja.</p></div></div>
      <dl className="unit-grid">
        <div><dt>Čas teorije</dt><dd><strong>{formatPrice(unitPrices.theory)}</strong> din / čas</dd></div>
        <div><dt>Čas vožnje</dt><dd><strong>{formatPrice(unitPrices.driving)}</strong> din / čas</dd></div>
        <div><dt>Polaganje (T + V)</dt><dd><strong>{formatPrice(unitPrices.exam)}</strong> din, jednokratno</dd></div>
      </dl>
      <p className="unit-formula"><strong>Kako se računa:</strong> ukupna cena = (broj časova teorije × {formatPrice(unitPrices.theory)}) + (broj časova vožnje × {formatPrice(unitPrices.driving)}) + {price(unitPrices.exam)} polaganje. Broj časova zavisi od izabrane kategorije i prethodne vozačke dozvole.</p>
    </Reveal></section>
    <section id="paketi" className="packages container" aria-labelledby="packages-title">
      <h2 id="packages-title" className="sr-only">Paketi obuke za {category} kategoriju</h2>
      <fieldset className="category-tabs"><legend className="sr-only">Izaberite kategoriju</legend>{categoryKeys.map(key => <label key={key} className={category === key ? 'selected' : ''}><input type="radio" name="price-category" value={key} checked={category === key} onChange={() => setCategory(key)} aria-label={`${key} kategorija`} aria-controls="paketi-lista kategorija-detalji" /><span aria-hidden="true">{key}</span></label>)}</fieldset>
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
      <li><CreditCard size={24} weight="light" aria-hidden="true" /><p><strong>Plaćanje obuke:</strong> Način plaćanja i dinamika uplata utvrđuju se prilikom upisa, prema ugovoru o obuci.</p></li>
      <li><SealCheck size={24} weight="light" aria-hidden="true" /><p><strong>Sadržaj paketa:</strong> Prikazani su iznosi teorijske nastave, časova vožnje i polaganja. Pre upisa proverite sadržaj izabranog paketa i uslove ugovora.</p></li>
      <li><Info size={24} weight="light" aria-hidden="true" /><p><strong>Uslovi upisa:</strong> Zavise od uzrasta, izabrane kategorije i postojeće vozačke dozvole. <a href="/kontakt/#upit">Informacije o upisu</a></p></li>
    </ul></section>
    <section className="process container section-space" aria-labelledby="process-title">
      <Reveal className="section-heading"><p className="eyebrow">POSTUPAK OBUKE</p><h2 id="process-title">Postupak vozačke obuke</h2><p>Faze teorijske i praktične obuke. Potreban broj časova i uslovi polaganja zavise od kategorije i postojeće dozvole.</p></Reveal>
      <ol className="steps process-steps">{processSteps.map(([title, text], i) => <li key={title}><Reveal delay={(i % 3) * 0.08}><div className="step-top"><span>0{i + 1}</span>{i < processSteps.length - 1 ? <ArrowRight size={23} weight="light" /> : <Check size={23} weight="light" />}</div><h3>{title}</h3><p>{text}</p></Reveal></li>)}</ol>
      <div className="process-facts">{processFacts.map(([label, value, text], i) => <Reveal key={label} className="process-fact" delay={i * 0.06}><p className="process-fact-label">{label}</p><strong>{value}</strong><p>{text}</p></Reveal>)}</div>
    </section>
    <section className="faq container pricing-faq" aria-labelledby="pricing-faq-title"><Reveal className="faq-heading"><p className="eyebrow">PITANJA I ODGOVORI</p><h2 id="pricing-faq-title">Pitanja o cenama<br /> i uslovima obuke</h2><p>Obim obuke, plaćanje, dokumentacija i vozački ispit.</p></Reveal><div className="faq-list">{priceQuestions.map(([q, a]) => <details name="pricing-faq" key={q}><summary>{q}<Plus size={21} weight="light" /></summary><p>{a}</p></details>)}</div></section>
    <PageCTA />
  </>;
}

export function ContactLocation() {
  const [showMap, setShowMap] = useState(false);
  return <section className="location-section container section-space" aria-labelledby="location-title"><div className="location-copy"><h2 id="location-title">Adresa<br />i lokacija škole</h2><p>Auto škola FNS nalazi se na adresi Kosovska 30, Novi Sad. U kancelariji su dostupne informacije o upisu, kategorijama i rasporedu obuke.</p><a className="text-link" href={mapUrl} target="_blank" rel="noreferrer">Lokacija u Google Maps <ArrowUpRight size={19} /></a><div className="visit-note"><h3>Pre dolaska</h3><p>Za informacije o određenoj kategoriji i raspoloživim terminima obuke pozovite 069 164 6590 pre dolaska.</p></div></div><div className="location-map">{showMap ? <iframe title="Lokacija auto škole FNS, Kosovska 30, Novi Sad" src="https://www.google.com/maps?q=Auto+skola+FNS+Kosovska+30+Novi+Sad&output=embed" loading="lazy" referrerPolicy="no-referrer" allowFullScreen /> : <><MapPin size={44} weight="light" /><h3>Kosovska 30</h3><p>Novi Sad, Srbija</p><button className="button" onClick={() => setShowMap(true)}>Prikažite mapu <ArrowUpRight size={18} /></button><small>Učitava Google Maps.</small></>}</div></section>;
}
