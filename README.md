<div align="center">

<img src="docs/brand/banner.svg" alt="Bistrô Ancestral: Afro-Brazilian cooking in Niterói" width="100%">

Institutional site for an Afro-Brazilian restaurant in Niterói. A migration
from WordPress to Next.js, with a single business goal: get people to a table
in the dining room.

[![License](https://img.shields.io/badge/license-all%20rights%20reserved-7c2929)](LICENSE) ![Stack](https://img.shields.io/badge/Next.js%2016-React%2019-121011) ![Types](https://img.shields.io/badge/TypeScript-Tailwind%204-a81c10) ![Lighthouse](https://img.shields.io/badge/a11y%20·%20SEO%20·%20best%20practices-100-63b52f)

**[View the site](https://bistroancestral.com.br)** · [The screens](#the-screens) · [What it solves](#what-the-project-solves) · [Frontend](#frontend) · [License](#license)

</div>

---

```
apps/
  frontend/   Next.js 16 (App Router) + TypeScript
docs/telas/   screenshots used in this README
```

## What the project solves

The previous site was WordPress with Elementor. It worked, but it charged a
high price for that: the menu and the opening hours lived inside the visual
builder, the content came out of a theme nobody maintained any more, and every
page load pulled a 40 KB carousel just to show three still photos.

The business problem was a different one, and simpler: the restaurant depends
on people walking through the door. There is no delivery, no online ordering.
Every visit starts with a tap that opens WhatsApp, the map, or the phone.

This project rebuilds the site around that. The content left the WordPress
database and became typed data in `src/lib/`; the presentation follows the
brand's design system; and the paths that lead to the dining room, WhatsApp,
map, phone, menu, are measured as conversions.

## The screens

<div align="center">
<img src="docs/telas/01-home-card.webp" alt="Bistrô Ancestral home page" width="88%">
</div>

<table>
<tr>
<td width="50%"><a href="docs/telas/01-home.webp" title="view the full page"><img src="docs/telas/01-home-card.webp" alt="Home"></a><br><sub><b>Home</b> · photographic hero, menu, story and directions</sub></td>
<td width="50%"><a href="docs/telas/02-cardapio.webp" title="view the full page"><img src="docs/telas/02-cardapio-card.webp" alt="Menu"></a><br><sub><b>Menu</b> (<code>/cardapio</code>) · the most ordered dishes, numbered, with a full-bleed photo</sub></td>
</tr>
<tr>
<td width="50%"><a href="docs/telas/03-historia.webp" title="view the full page"><img src="docs/telas/03-historia-card.webp" alt="Our story"></a><br><sub><b>Our story</b> · video testimonials from the people who cook</sub></td>
<td width="50%"><a href="docs/telas/04-como-chegar.webp" title="view the full page"><img src="docs/telas/04-como-chegar-card.webp" alt="Directions"></a><br><sub><b>Directions</b> · address, hours and booking over WhatsApp</sub></td>
</tr>
<tr>
<td width="50%"><a href="docs/telas/05-links.webp" title="view the full page"><img src="docs/telas/05-links-card.webp" alt="BistroLinks"></a><br><sub><b>BistroLinks</b> · the Instagram bio page, with no navigation</sub></td>
<td width="50%"><a href="docs/telas/06-politica.webp" title="view the full page"><img src="docs/telas/06-politica-card.webp" alt="Privacy policy"></a><br><sub><b>Privacy</b> · the LGPD policy transcribed from the previous site</sub></td>
</tr>
</table>

### On the phone

The same content in a single column. The first WhatsApp button appears within
the first scroll.

<div align="center">
<a href="docs/telas/07-mobile-card.webp" title="view the full page"><img src="docs/telas/07-mobile-card.webp" alt="Home on a phone" width="320"></a>
</div>

---

## Frontend

Next.js with the App Router. The six routes are generated at build time; there
is no database and no API: the content is typed data, and changing a dish means
editing a file.

Decisions that hold the goal up:

* **Server Components by default.** Only the components that need state ship to
  the client: navigation, accordion, counter, player and the notices.
* **`next/font`** self-hosts Anton, Archivo and Instrument Serif at build time, with no third-party request and no layout shift when the font swaps.
* **Video player on demand.** The YouTube embed is only mounted on click.
  Loaded along with the page, it sets a third-party cookie and is the heaviest
  resource on the site.
* **SVG icons drawn in the project**, instead of a library over a CDN.
* **Consent that actually means something.** GTM only loads after cookies are accepted; on the previous site it came up before any click.
* `sitemap.xml`, `robots.txt`, canonical, Open Graph and `Restaurant` JSON-LD
  with coordinates, opening hours and menu.

```bash
cd apps/frontend
npm install
cp .env.example .env.local     # set NEXT_PUBLIC_SITE_URL and the GTM ID
npm run dev                    # http://localhost:3000
npm run build && npm start     # production
npm run lighthouse             # audits the six routes, mobile and desktop
```

### Where to make changes

| What | File |
| --- | --- |
| Address, hours, phone, external links | `src/lib/restaurante.ts` |
| Menu, services, FAQ, section copy | `src/lib/conteudo.ts` |
| Navigation routes | `src/lib/rotas.ts` |
| Colors, typography, spacing, motion | `src/styles/tokens/` |
| Design system components | `src/components/ds/` |
| Assembly of each screen | `src/views/` |

Editorial content is kept apart from the hard data on purpose: the kitchen
revises `conteudo.ts` often, while address and hours barely change and also
feed the JSON-LD.

### Measurement

The clicks that lead to the dining room fire events on the `dataLayer`:

| Event | Where |
| --- | --- |
| `clique_whatsapp` | booking and contact CTAs |
| `clique_telefone` | phone number in the header and footer |
| `clique_mapa` | "Ver endereço no mapa" (view address on the map) |
| `clique_cardapio` | full menu |

Anyone who declines cookies is not measured, so the count sits below the real
number of clicks. That is the cost of consent meaning something.

---

## Accessibility and performance

The six routes hit **100 on accessibility, best practices and SEO**, on both
the mobile and the desktop profile. Performance lands between 95 and 100.

Some decisions came out of measurement, not taste:

* The brand orange with white text gives 2.14:1. The action tone was darkened
  until it cleared the WCAG minimum, keeping the vivid shade where the
  background is dark.
* Entrance animations never hide content: the block starts at its final
  position and only slides when it comes into view. If JavaScript fails, the
  page stays readable.
* `prefers-reduced-motion` turns off all movement, marquee included.

---

## License

© 2026 NerdResolve. All rights reserved.

The repository is public for technical review and portfolio purposes. The code
may be read and studied; no license to use, copy or redistribute is granted.
See [LICENSE](LICENSE).

The Bistrô Ancestral brand, photography, copy and design system belong to their
owner and are not licensed by this repository.

<div align="center">
<img src="apps/frontend/public/brand/logo.webp" width="64" alt="">
</div>
