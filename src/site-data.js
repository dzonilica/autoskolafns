export const phone = '+381691646590';
export const email = 'autoskolafns@gmail.com';
export const instagramUrl = 'https://www.instagram.com/autoskolafns/';
export const mapUrl = 'https://www.google.com/maps/search/?api=1&query=Auto+skola+FNS+Kosovska+30+Novi+Sad';

// Public contact and course information: https://autoskolafns.com/kontakt/ and /usluge/.
// Price list structure, unit prices and terms follow https://falkonplus2023kg.com/cenovnik (2026-10-02).
// Unit prices are in RSD; every package total is derived from them and the required hours.
export const unitPrices = { theory: 500, driving: 2000, exam: 6000 };

export const formatPrice = value => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export const packageTotal = ({ theory, driving }) => theory * unitPrices.theory + driving * unitPrices.driving + unitPrices.exam;

// Text between ** is shown in bold.
const pkg = (label, theory, driving) => ({ label, theory, driving });

export const priceCategories = {
  B: {
    name: 'Putnička i teretna vozila',
    description: 'Kategorija B obuhvata **putnička i teretna vozila čija najveća dozvoljena masa ne prelazi 3.500 kg** i koja pored vozačevog sedišta imaju najviše 8 sedišta (ukupno 9). Kandidat ima pravo da **upiše B kategoriju sa 16 godina**, ali za polaganje praktičnog dela ispita mora imati **navršenih 17 godina**. Puni obim obuke bez prethodne dozvole je **40 časova teorije + polaganje testa + 40 časova praktične vožnje + polaganje vožnje**.',
    ages: [16, 17],
    limit: ['Vozilo', 'do 3.500 kg'],
    packages: [pkg('Bez vozačke dozvole', 40, 40), pkg('Poseduje AM ili A1', 7, 35), pkg('Poseduje A2 ili A', 7, 30), pkg('Poseduje B1', 0, 30), pkg('Poseduje M', 25, 40), pkg('Poseduje F', 20, 20)],
    conditions: [
      '**Lična karta** je obavezna pri upisu, teorijskoj obuci i polaganju oba dela ispita.',
      'Za **maloletne kandidate** (od 16 god.) — saglasnost i potpis roditelja/staratelja na ugovoru.',
      '**Lekarsko uverenje** je neophodno pre početka časova vožnje (teorija se može slušati i test polagati bez uverenja).',
      'Sa **AM ili A1**: 7č teorije + 35č vožnje. Sa **A2 ili A**: 7č teorije + 30č vožnje. Sa **B1**: bez teorije + 30č vožnje.',
      'Nakon položenog praktičnog ispita, škola daje informacije o **dokumentaciji za probnu vozačku dozvolu**.',
    ],
  },
  A1: {
    name: 'Lakši motocikli',
    description: 'Kategorija A1 obuhvata **lakše motocikle čija radna zapremina motora nije veća od 125 cm³ i snage motora do 11 kW**, kao i teške tricikle čija snaga motora ne prelazi 15 kW. Upis je moguć sa **15 godina**, a polaganje praktičnog ispita sa **16 godina**. Puni obim obuke bez prethodne dozvole: **40 časova teorije + test + 20 časova vožnje + polaganje vožnje**. Sa AM kategorijom teorija nije potrebna — 7 časova praktične obuke.',
    ages: [15, 16],
    limit: ['Motor', 'do 125 cm³ / 11 kW'],
    packages: [pkg('Bez vozačke dozvole', 40, 20), pkg('Poseduje AM', 0, 7), pkg('Poseduje B', 7, 20)],
    conditions: [
      '**Lična karta** je obavezna pri upisu, teoriji i polaganju oba dela ispita.',
      'Za **maloletne kandidate** — saglasnost i potpis roditelja/staratelja na ugovoru.',
      '**Lekarsko uverenje** pre početka praktične obuke (za teoriju i test nije potrebno).',
      'Sa **B kategorijom**: 7č teorije + 20č vožnje. Sa **AM**: bez teorije + 7č vožnje.',
      'Za praktičnu obuku motociklista koriste se **kaciga i zaštitna oprema**. Dostupnost opreme i način komunikacije sa instruktorom proverite prilikom upisa.',
    ],
  },
  A2: {
    name: 'Srednji motocikli',
    description: 'Kategorija A2 obuhvata **motocikle čija snaga motora nije veća od 35 kW** i odnos snaga/masa do **0,2 kW/kg**. Kandidat se može upisati sa **17 godina**, a za polaganje praktičnog dela ispita potrebno je **navršenih 18 godina**. Puni obim obuke bez prethodne dozvole: **40 časova teorije + polaganje testa + 30 časova praktične obuke + polaganje vožnje**.',
    ages: [17, 18],
    limit: ['Snaga', 'do 35 kW'],
    packages: [pkg('Bez vozačke dozvole', 40, 30), pkg('Poseduje AM', 0, 14), pkg('Poseduje A1', 0, 7), pkg('Poseduje B', 7, 30)],
    conditions: [
      '**Lična karta** je obavezna pri upisu, obuci i polaganju oba dela ispita.',
      '**Lekarsko uverenje** je neophodno za početak časova vožnje. Teorijsku nastavu i test kandidat može slušati/polagati i bez uverenja.',
      'Sa **B kategorijom**: 7č teorije + 30č vožnje.',
      'Sa **A1**: bez teorije + 7č vožnje. Sa **AM**: bez teorije + 14č vožnje.',
      'Za praktičnu obuku motociklista koriste se **kaciga i zaštitna oprema**. Dostupnost opreme i način komunikacije sa instruktorom proverite prilikom upisa.',
      'Nakon položenog praktičnog ispita, škola daje informacije o **dokumentaciji za izdavanje vozačke dozvole**.',
    ],
  },
  A: {
    name: 'Svi motocikli — bez ograničenja',
    description: 'Kategorija A obuhvata **sve motocikle i teške tricikle čija snaga motora prelazi 15 kW** — bez ograničenja zapremine ili snage. Za direktan pristup A kategoriji potrebno je **navršenih 24 godine** (upis od 23. godine). Ako kandidat već ima A2 najmanje 2 godine, može direktno na A. Puni obim bez prethodne dozvole: **40 časova teorije + test + 40 časova vožnje + polaganje**.',
    ages: [23, 24],
    limit: ['Snaga', 'bez ograničenja'],
    packages: [pkg('Bez vozačke dozvole', 40, 40), pkg('Poseduje AM', 0, 20), pkg('Poseduje A1', 0, 14), pkg('Poseduje A2', 0, 7), pkg('Poseduje B', 7, 40)],
    conditions: [
      '**Lična karta** pri upisu i polaganju + **lekarsko uverenje** pre početka praktične obuke.',
      'Sa **B kategorijom**: 7č teorije + 40č vožnje.',
      'Sa **A2**: bez teorije + 7č vožnje. Sa **A1**: 14č vožnje. Sa **AM**: 20č vožnje.',
      'Za praktičnu obuku motociklista koriste se **kaciga i zaštitna oprema**. Dostupnost opreme i način komunikacije sa instruktorom proverite prilikom upisa.',
      'Nakon položenog praktičnog ispita, škola daje informacije o **dokumentaciji za izdavanje vozačke dozvole**.',
    ],
  },
};

export const categoryKeys = Object.keys(priceCategories);

export function initialCategory() {
  const key = new URLSearchParams(window.location.search).get('kategorija');
  return categoryKeys.includes(key) ? key : 'B';
}

// Package chosen with "Upit za upis" on the price list, from /kontakt/?kategorija=B&paket=1.
export function chosenPackage() {
  const params = new URLSearchParams(window.location.search);
  const index = Number(params.get('paket') ?? NaN);
  return Number.isInteger(index) ? priceCategories[params.get('kategorija')]?.packages[index] ?? null : null;
}
