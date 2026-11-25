# Reliable Accountancy website

A plain website: no build step, no framework. Open `index.html` in a browser to see it. Upload the whole folder to any host (GoDaddy, Netlify, Cloudflare Pages, your own server) and it works.

## Folder map

```
index.html                  The page structure and all the words you read on the page
assets/
  css/
    base.css                Colours, fonts, buttons  <- change the look of the whole site here
    header.css              Top bar, logo, menu
    hero.css                Home page hero (video, headline, stats) and the header that floats over it
    partners.css            The scrolling "Companies we work with" strip under the hero
    sections.css            About, services, industries, process, deadlines, FAQ
    booking.css             Booking calendar
    forms.css               Contact form, showcase
    footer.css              Footer
    responsive.css          Tablet and phone layout
    chat.css                Chat bubble and WhatsApp button
  js/
    config.js               ** SETTINGS: email, phone, forms, booking link, WhatsApp, receptionist **
    content.js              Industries text
    core.js                 Shared helpers (do not edit)
    motion.js               Scroll animations, sticky header, mobile menu
    partners.js             The scrolling "Companies we work with" strip
    industries.js           Industries tabs
    showcase.js             Business showcase, articles, stories, contact form
    booking.js              Booking calendar logic
    chat.js                 Chat bubble, offline answers, leave-a-message form
  video/
    hero.mp4                The looping video behind the home page  <- replace this file to change it
  img/
    hero-poster.jpg         Still photo shown while the video loads, and to visitors who turn motion off
    favicon.svg             Browser tab icon
docs/
  RECEPTIONIST.md           How the chat connects to Adrian, your AI receptionist
```

## Common changes

| I want to… | Edit |
|---|---|
| Change my email or phone | `assets/js/config.js` (`email`, `phone`, `phoneTel`, `phone2`, `phone2Tel`), and the text in `index.html` (search for `437-928-2278` and `416-939-0201`) |
| Change colours | `assets/css/base.css`, the `:root{ ... }` block at the top (`--red`, `--navy`, `--pink`) |
| Replace the hero video | Save a new MP4 as `assets/video/hero.mp4` (H.264, 1280x720 or 1920x1080, no sound needed, 6 to 10 seconds, under 2 MB) and a matching still frame as `assets/img/hero-poster.jpg`. Same file names, nothing else to change |
| Change the headline | `index.html`, the `<h1>` inside `<section class="hero">` |
| Change the scrolling company names (or turn the strip off) | `config.js` → `partners` (`items`, `title`, `speed`, `enabled`). **List only companies you genuinely work with and may name publicly.** The eight names there now are the ones from your design recording |
| Change a service or an industry | Services: `index.html` (section `id="services"`). Industries: `assets/js/content.js` |
| Send forms without opening the visitor's email app | `config.js` → `formEndpoint` (a Formspree or Web3Forms address) |
| Use Calendly / Cal.com instead of the built-in calendar | `config.js` → `bookingUrl` |
| Show a "Client login" link | `config.js` → `portalUrl` |
| Add showcase listings, articles, client stories | `config.js` → `listings`, `insights`, `stories` (they appear only when you add items) |
| Change what the chat bubble answers without Adrian | `assets/js/chat.js` → `OFFLINE_FAQ` |
| Turn the chat bubble or WhatsApp off | `config.js` → `chat.enabled: false` or `whatsapp.enabled: false` |

After any change: save, refresh the browser, upload the changed files.

## WhatsApp
`config.js` → `whatsapp.number` is digits only with the country code, no `+` or spaces (it is set to the office number, 14169390201). **Check that this number is registered on WhatsApp**, or change it to your WhatsApp Business number. Visitors who press the green button open a WhatsApp chat with a ready-made first line you can edit in `whatsapp.message`.

## Chat bubble and the AI receptionist
Two modes, no code change between them:
1. **Built-in** (default): answers common questions (hours, services, payroll, how to book) from `OFFLINE_FAQ`, never quotes prices, and takes a message.
2. **Connected to Adrian**: set `receptionist.endpoint` in `config.js` to your Adrian server address. The same Adrian that answers your phone, SMS and WhatsApp then answers on the website, and website messages reach you as Telegram or email alerts.

Step by step: `docs/RECEPTIONIST.md`. If Adrian is ever unreachable, the chat switches to "leave a message" automatically; visitors are never left with an error.

## Before you publish
- Fonts load from Google Fonts. Everything else is in this folder.
- The hero video plays silently on a loop and starts by itself on phones and computers. Visitors whose device is set to reduce motion see the still photo instead. If the video is ever missing, the photo shows.
- `https://www.reliableaccountancy.ca/` is set as the canonical address in `index.html`; change it if your domain changes.
- No home address appears anywhere on the site.
- The chat tells visitors not to share SIN or banking details. Keep that line.


## Social media links

Open `assets/js/config.js` and fill in the `social` block with the full address of each page
(Facebook, Instagram, TikTok, LinkedIn, X, YouTube, and your Google review link).
Each account that has an address shows as an icon button in the footer ("Follow us"), together with WhatsApp.
Empty ones stay hidden, so add each address as soon as the account exists.
Filled addresses are also added to the site's search data (`sameAs`).

## Glowing sun and stamp (hero corner)

The glowing orb (a golden sun that fades into your round stamp, `assets/img/stamp.png`) in the top-right of the home page is pure CSS (`assets/css/hero.css`, section "Glowing moon and sun").
Change its size, speed or position there, or delete the `hero-orb` line in `index.html` to remove it.

The page also brightens softly while the sun shines (`.sun-wash` in `hero.css`); change the alpha numbers there, or delete the `sun-wash` line in `index.html`.

