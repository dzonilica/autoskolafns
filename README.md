# Auto škola FNS

Premium sajt sa svetlom temom, logom škole, diskretnim narandžastim akcentom, uvodnim loaderom, lokalno učitanim DM Sans fontom i parallax fotografijama. React + Vite + Motion, sa izvornim CSS stilovima. Vizuelna dorada prati mirnu kompoziciju, tipografiju i fotografski prikaz iz korisnikove Hausmajstor reference.

## Pokretanje

```powershell
npm.cmd install
npm.cmd run dev
```

Sajt: http://127.0.0.1:5173/

```powershell
npm.cmd run build
npm.cmd run preview
```

Produkcijski fajlovi su u `dist/`; produkcijski lokalni pregled je na http://127.0.0.1:4173/. `dist/` se može postaviti na statički hosting.

## Objava na Vercelu

Na [vercel.com/new](https://vercel.com/new) uvesti GitHub repozitorijum `dzonilica/autoskolafns` i kliknuti Deploy. Podešavanja su u `vercel.json` (Vite, `npm ci`, `npm run build`, izlaz `dist/`), pa u Vercelu ništa ne treba menjati. Node verzija je 24.x (`engines` u `package.json`).

- `trailingSlash: true` šalje `/o-nama` na `/o-nama/`, isto kao linkovi na sajtu.
- Fajlovi u `/assets/` imaju heš u imenu i keširaju se godinu dana; slike iz `public/` koriste podrazumevano keširanje Vercela.
- Svaki push na `main` pravi novu produkcijsku verziju, a ostale grane dobijaju pregledne adrese.

## Funkcionalnosti

- Zasebne stranice: `/o-nama/`, `/cenovnik/` i `/kontakt/`, sa sopstvenim HTML ulazima i SEO naslovima/opisima. Direktno otvaranje, osvežavanje i istorija pregledača rade i na statičkom hostingu koji služi `index.html` iz direktorijuma.
- Zajednički header i footer povezuju sve stranice. Aktivna stranica je označena i na mobilnom meniju, a linkovi za obuku i put do dozvole vode na odgovarajuće sekcije početne.
- O nama: predstavljanje škole, iskustvo instruktora, pristup obuci i fotografije.
- Cenovnik: jedinične cene (čas teorije, čas vožnje, polaganje), izbor B/A1/A2/A kategorije mišem ili tastaturom, paketi prema dozvoli koju kandidat već ima, uslovi i dokumenti po kategoriji, plaćanje, postupak obuke i česta pitanja. Dugme „Upiši se“ prenosi kategoriju i paket u kontakt formu. Jedinične cene su u `src/site-data.js` (`unitPrices`, u RSD); svi iznosi paketa računaju se iz njih i broja časova u `priceCategories`.
- Kontakt: telefon, e-mail, adresa, radno vreme i forma. Mapa se učitava tek nakon klika na „Prikaži mapu“; direktan Google Maps link je uvek dostupan. Link `/kontakt/?kategorija=A&paket=4#upit` bira A kategoriju, u poruku upisuje izabrani paket sa cenom i fokusira ime.
- Logo škole u headeru i footeru, kao favicon i ikonica za iOS početni ekran.
- Profesionalan, konkretan tekst na svim stranicama, sa opisnim naslovima i posebnim SEO naslovima i meta opisima. Pravila tona i izvori podataka su u [dokumentaciji sadržaja](docs/content-style.md).
- Uvodna kompozicija sa širokom fotografijom automobila i jasnom tipografskom hijerarhijom. Sekcija predstavljanja spaja tekst sa asimetričnom galerijom; na telefonu se prikazuje u jednoj koloni. Navigacija ima diskretno zamućenje uz punu pozadinu kada korisnik traži smanjenu providnost.
- Uvodni loader sa logom pri prvom otvaranju sajta u sesiji pregledača. Ostale stranice iz iste sesije otvaraju se bez njega; za ponovni prikaz otvoriti sajt u novom tabu. Loader se ubacuje u sve HTML stranice preko `vite.config.js` iz `src/loader/` i prikazuje se pre učitavanja aplikacije. Animacije sekcija kreću kada se loader podigne, a uz `prefers-reduced-motion` loader samo kratko nestaje.
- Navigacija na desktopu i mobilni meni sa zatvaranjem na Escape.
- Parallax fotografije i diskretno pojavljivanje sekcija. Podešavanje `prefers-reduced-motion` isključuje animacije.
- Detalji A i B kategorije u pristupačnom izvornom HTML dijalogu.
- Sekcija obuke sa izborom A/B kategorije: opis levo i velika fotografija desno, koja prati izbor. Dugmad rade tastaturom, imaju `aria-expanded` i povezana su sa panelima. Na telefonu se sadržaj prikazuje u jednoj koloni.
- Prenos izabrane kategorije u kontakt formu, sa fokusom na prvo polje.
- FAQ sa izvornim HTML `details` elementima.
- Upit sa obaveznim imenom i e-mail adresom. Korisnik priprema poruku i zatim je sam šalje iz svoje e-mail aplikacije. Forma ne tvrdi da je poruka poslata i ne čuva podatke na serveru. Za direktno slanje iz sajta potrebno je povezati servis za slanje pošte.
- Telefon, e-mail i Google Maps linkovi sa proverenim javnim kontakt podacima.
- Slike u dve WebP veličine, lokalni font, osnovni SEO metapodaci i strukturirani podaci.

## Provera

```powershell
npm.cmd run check
```

Potreban je instaliran Chrome i pokrenut lokalni server. Za proveru produkcijskog pregleda:

```powershell
$env:TEST_URL = 'http://127.0.0.1:4173'
npm.cmd run check
```

Provera obuhvata kategorije, dijalog, Escape, fokus, pripremu upita bez slanja, FAQ, mobilni meni, parallax, reduced motion, svetlu temu uz tamno sistemsko podešavanje, učitavanje slika i širine 320/390/768/1024/1440 px. Rezultati i snimci su u `artifacts/`.

`scripts/check-pages.mjs` dodatno proverava nove stranice: direktne adrese i osvežavanje, naslove i aktivnu navigaciju, prikaz na svim navedenim širinama, izbor kategorije tastaturom, prenos upita, obavezna polja i poništavanje pripremljene poruke posle izmene. Test mape proverava aktivaciju i adresu uz zamenski odgovor servisa; dostupnost samog Google Maps servisa nije deo automatizovanog testa. Ni jedan test ne šalje poruke školi.

Provera 01.10.2026: produkcijski build uspešan, 22 provere početne stranice uspešne i 56 provera novih stranica uspešne (i na produkcijskom pregledu). Vizuelno pregledani desktop i mobilni snimci svih novih stranica. Izveštaji: `artifacts/check-results.json` i `artifacts/pages-check-results.json`.

Provera 01.10.2026, posle dodavanja loga, loadera i narandžaste palete: produkcijski build uspešan, 22 + 56 provera uspešne na produkcijskom pregledu. Mobilni Lighthouse početne stranice sa loaderom: performanse 89/100, pristupačnost 100/100 (kontrast boja prolazi); LCP 3,5 s, CLS 0, TBT 120 ms. Izveštaj: `artifacts/lighthouse-mobile-loader.json`.

Prethodno Lighthouse merenje početne stranice, pre loadera, u emulaciji mobilnog uređaja: performanse 92/100, pristupačnost 100/100, dobre prakse 100/100 i SEO 100/100. LCP 3,4 s, CLS 0 i TBT 30 ms. Ovo je lokalno laboratorijsko merenje sa simuliranim usporenjem; rezultati na hostingu i stvarnim uređajima mogu se razlikovati. Izveštaj je `artifacts/lighthouse-mobile.json`.

Novo mobilno Lighthouse merenje stranice O nama: performanse 96/100, pristupačnost 100/100, dobre prakse 100/100 i SEO 100/100; LCP 2,6 s, CLS 0. Izveštaj: `artifacts/lighthouse-o-nama-mobile.json`. Lighthouse merenja preostale dve nove stranice nisu završena; navedene ocene važe samo za O nama.

Provera 02.10.2026, posle novog cenovnika: produkcijski build uspešan, 22 + 57 provera uspešne na produkcijskom pregledu, bez prelivanja na širinama 320–1440 px.

Provera 03.10.2026, posle završne premium vizuelne dorade: produkcijski build uspešan, 24 + 57 provera uspešne na produkcijskom pregledu. Novi izbor obuke radi mišem i tastaturom, bez prelivanja na širinama 320–1440 px. Vizuelno pregledane sve stranice na desktopu i telefonu. Lokalno mobilno Lighthouse merenje početne sa širokom uvodnom fotografijom: performanse 91/100, pristupačnost 100/100, LCP 3,2 s, CLS 0, TBT 60 ms. Izveštaj: `artifacts/lighthouse-premium-wide-mobile.json`.

Provera 04.10.2026, posle prerade teksta: produkcijski build uspešan, 24 + 57 provera uspešne na lokalnom razvojnom serveru. Dodatno provereni jedinstveni SEO naslovi i meta opisi, jedan H1 po stranici, podudaranje Open Graph podataka i prikaz svih stranica na širinama 320/390/768/1024/1440 px. Pregled sadržaja i snimci su u `artifacts/content-review.json` i `artifacts/copy-*-desktop.png`, odnosno `artifacts/copy-*-mobile.png`.

## Sadržaj i vizuelni pravac

Svetla tema je izričit zahtev i ostaje svetla nezavisno od podešavanja sistema. Boje: pozadina `#faf9f6`, svetla površina `#eeefe7`, tekst `#30342f`, narandžasta brenda `#e85d10`. Sitan narandžasti tekst koristi tamniju `#ad420d` (`--accent-text`) zbog kontrasta. Glavna dugmad imaju tamnu površinu i svetao tekst, dok je dugme u headeru sa tankim okvirom. Fotografski paneli imaju radius 6px, glavne kontrole 4px, a pomoćna dugmad sa ikonicom ostaju okrugla. Header je sloj 20, skip link 30, loader 40, a dijalog koristi nativni top layer.

Kontakt i radno vreme preuzeti su sa [zvanične kontakt stranice FNS](https://autoskolafns.com/kontakt/). Ponuda A i B kategorije i iskustvo instruktora potvrđeni su na [zvaničnom sajtu](https://autoskolafns.com/) i [stranici usluga](https://autoskolafns.com/usluge/), provereno 30.09.2026. Procenat prolaznosti i recenzije nisu izmišljeni niti dodavani. Raspored cenovnika, cene, broj časova, uslovi, plaćanje na rate, oprema za motocikliste i česta pitanja preuzeti su 02.10.2026, na zahtev, sa [cenovnika auto škole Falkon Plus 2023](https://falkonplus2023kg.com/cenovnik) (Kragujevac). FNS ih još nije potvrdio; pre objave ih treba uporediti sa ponudom škole.

Za nove stranice podaci za kontakt, kategorije i iskustvo instruktora ponovo su provereni 01.10.2026. Javni iznosi cena nisu pronađeni. Sačuvani su svetla tema, postojeći fotografski materijal, rečnik obraćanja i sidra na početnoj stranici. `src/pages.css` sadrži rasporede dodatnih stranica; `src/premium.css` objedinjuje novu tipografiju, kompoziciju, kontrole i prilagodljivi prikaz na svim stranicama. Font se učitava lokalno, sa latin i latin-ext podskupovima i preloadingom na sva četiri HTML ulaza.

Originalni logo je `logo.png` (crno-beli, providna pozadina) i ostaje nepromenjen. Njegovi beli delovi ne bi se videli na svetloj pozadini, pa verzija za sajt, `public/brand/fns-logo.webp`, zadržava crne delove kao tamne, a bele boji narandžasto. Za ponovno pravljenje loga, favicona i iOS ikonice pokrenuti `node scripts/prepare-logo.mjs`. Sve postojeće slike sačuvane su.

Fotografija učionice `assets/img/ucionica-racunari.jpg` je postojeći lokalni materijal. Ostale fotografije su ilustrativni materijal iz foldera `autoskola-slike/` i generisani hero; ne predstavljaju dokumentarnu potvrdu voznog parka ili lokacije. Poreklo novog hero materijala i prompt su u [dokumentaciji fotografije](docs/image-generation.md).

Za ponovno pravljenje WebP fajlova pokrenuti `node scripts/prepare-images.mjs`. Original novog hero materijala sačuvan je u `assets/generated/fns-hero.png`.
