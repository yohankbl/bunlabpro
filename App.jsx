import React from "react";
import { HashRouter, Routes, Route, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Button({ as: Comp = "button", className = "", ...props }) {
  return (
    <Comp
      className={
        "inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold transition-transform duration-150 " +
        "bg-amber-600 text-white hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-600/20 " +
        className
      }
      {...props}
    />
  );
}
function Card({ className = "", children }) {
  return (
    <div className={"rounded-2xl bg-white/80 backdrop-blur shadow-xl ring-1 ring-black/5 " + className}>
      {children}
    </div>
  );
}
function Input(props) {
  return (
    <input
      {...props}
      className={
        "w-full rounded-xl border border-black/10 bg-white/90 px-4 py-3 outline-none ring-amber-500/0 focus:ring-2 focus:ring-amber-500/60 " +
        (props.className || "")
      }
    />
  );
}
function Select(props) {
  return (
    <select
      {...props}
      className={
        "w-full rounded-xl border border-black/10 bg-white/90 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500/60 " +
        (props.className || "")
      }
    />
  );
}
function Textarea(props) {
  return (
    <textarea
      {...props}
      className={
        "w-full rounded-xl border border-black/10 bg-white/90 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500/60 min-h-[120px] " +
        (props.className || "")
      }
    />
  );
}

const BRAND = {
  name: "BunLab Smash Club",
  slogan: "Smash burgers. Big flavor. Zero compromise.",
  address: "27 Rue Oberkampf, 75011 Paris",
  phone: "+33 1 86 76 54 32",
  hours: [{ d: "Lun – Dim", h: "11:30 – 23:00" }],
  socials: {
    instagram: "https://instagram.com/bunlab",
    tiktok: "https://tiktok.com/@bunlab",
    maps: "https://www.google.com/maps?q=27+Rue+Oberkampf,+75011+Paris",
  },
};

const MENU = {
  Burgers: [
    {
      name: "Smash Classic",
      desc: "Double smash, cheddar affiné, pickles, oignons, sauce BunLab.",
      price: "12€",
      img: "https://images.unsplash.com/photo-1606756790138-8ecb8a00ad7d?auto=format&fit=crop&w=1200&q=80",
      tags: ["signature"],
    },
    {
      name: "BBQ Blaze",
      desc: "Smash + bacon croustillant, sauce BBQ maison, oignons frits.",
      price: "14€",
      img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80",
      tags: ["best-seller"],
    },
    {
      name: "Green Power (Vegan)",
      desc: "Steak végétal, houmous, roquette, pain complet.",
      price: "11€",
      img: "https://images.unsplash.com/photo-1615717414013-1f4e1da5a45f?auto=format&fit=crop&w=1200&q=80",
      tags: ["vegan"],
    },
  ],
  "Accompagnements": [
    {
      name: "Frites maison",
      desc: "Pommes de terre françaises, double cuisson.",
      price: "4€",
      img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Onion Rings",
      desc: "Oignons sweet & crispy.",
      price: "5€",
      img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=1200&q=80",
    },
  ],
  "Boissons": [
    {
      name: "Bissap maison",
      desc: "Hibiscus, menthe fraîche, peu sucré.",
      price: "4€",
      img: "https://images.unsplash.com/photo-1582106245688-4e93d0f4af7f?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Limonade artisanale",
      desc: "Citron pressé, bulles fines.",
      price: "3.5€",
      img: "https://images.unsplash.com/photo-1553531888-a7f2a4b4cbae?auto=format&fit=crop&w=1200&q=80",
    },
  ],
  "Desserts": [
    {
      name: "Cheesecake vanille",
      desc: "Crème légère, base sablée croustillante.",
      price: "5€",
      img: "https://images.unsplash.com/photo-1599785209796-9e396f9a5b3e?auto=format&fit=crop&w=1200&q=80",
    },
  ],
};

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return Math.abs(h);
}
function generateId(len = 6) {
  const s = Math.random().toString(36).slice(2).toUpperCase();
  return s.slice(0, len);
}

function Page({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="min-h-[60vh]"
    >
      {children}
    </motion.main>
  );
}

function RouteWipe() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname + "-wipe"}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 0.35, ease: [0.5, 0, 0.2, 1] }}
        className="fixed inset-0 z-40 origin-left bg-amber-500"
      />
    </AnimatePresence>
  );
}

function Navbar() {
  const location = useLocation();
  const nav = [
    { to: "/", label: "Accueil" },
    { to: "/menu", label: "Menu" },
    { to: "/reservations", label: "Réservations" },
    { to: "/galerie", label: "Galerie" },
    { to: "/a-propos", label: "À propos" },
    { to: "/contact", label: "Contact" },
  ];
  return (
    <div className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-black/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <NavLink to="/" className="flex items-center gap-3">
          <Logo />
          <div className="font-black tracking-tight leading-none">
            <div className="text-lg">{BRAND.name}</div>
            <div className="text-xs text-black/60">Paris 11</div>
          </div>
        </NavLink>
        <nav className="hidden gap-6 md:flex">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                "relative px-1 py-1 text-sm font-semibold " +
                ((isActive || location.pathname === n.to)
                  ? "text-amber-700"
                  : "text-black/70 hover:text-black")
              }
            >
              {({ isActive }) => (
                <span className="inline-block">
                  {n.label}
                  {(isActive || location.pathname === n.to) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="block h-[2px] w-full bg-amber-600"
                    />
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button as="a" href="#/reservations" className="hidden md:inline-flex">
            Réserver
          </Button>
        </div>
      </div>
    </div>
  );
}

function Logo({ className = "" }) {
  return (
    <div className={"relative grid h-10 w-10 place-items-center rounded-xl bg-amber-600 " + className}>
      <svg viewBox="0 0 48 48" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M8 20h32" />
        <path d="M8 28h32" />
        <path d="M12 24c8-8 16-8 24 0" />
      </svg>
      <div className="absolute -bottom-1 right-0 h-3 w-3 rounded-full bg-green-400 ring-2 ring-white" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white/70 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Logo />
            <div>
              <div className="font-black">{BRAND.name}</div>
              <div className="text-sm text-black/60">{BRAND.slogan}</div>
            </div>
          </div>
          <div className="mt-4 text-sm text-black/70">
            {BRAND.address}
            <br /> {BRAND.phone}
          </div>
        </div>
        <div className="text-sm">
          <div className="font-semibold">Horaires</div>
          <ul className="mt-2 space-y-1 text-black/70">
            {BRAND.hours.map((h, i) => (
              <li key={i}>{h.d}: {h.h}</li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <div className="font-semibold">Suivez-nous</div>
          <div className="mt-2 space-y-1">
            <a className="text-black/70 hover:text-black" href={BRAND.socials.instagram} target="_blank">Instagram</a><br />
            <a className="text-black/70 hover:text-black" href={BRAND.socials.tiktok} target="_blank">TikTok</a><br />
            <a className="text-black/70 hover:text-black" href={BRAND.socials.maps} target="_blank">Google Maps</a>
          </div>
        </div>
      </div>
      <div className="bg-black/80 py-4 text-center text-white text-sm">
        © {new Date().getFullYear()} {BRAND.name}. Démo fictive. Tous droits réservés.
      </div>
    </footer>
  );
}

function Home() {
  const navigate = useNavigate();
  return (
    <Page>
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-amber-50 to-orange-100">
        <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=70')] bg-cover bg-center opacity-25" />
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-20 md:grid-cols-2">
          <div>
            <motion.h1
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 }}
              className="text-4xl font-black tracking-tight md:text-6xl"
            >
              Smash it. Love it.
            </motion.h1>
            <p className="mt-4 max-w-[50ch] text-lg text-black/70">
              {BRAND.slogan}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => navigate('/menu')}>Voir le menu</Button>
              <Button className="bg-black text-white hover:opacity-90" onClick={() => navigate('/reservations')}>
                Réserver une table
              </Button>
            </div>
            <div className="mt-6 text-sm text-black/60">
              📍 {BRAND.address}
            </div>
          </div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              "https://images.unsplash.com/photo-1607013407627-6ac4e4a6438e?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1526312426976-593c2b9990f5?auto=format&fit=crop&w=900&q=80",
            ].map((src, i) => (
              <motion.img
                key={i}
                src={src}
                alt="burger"
                className="h-44 w-full rounded-2xl object-cover shadow-md md:h-56"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[{
            title: "Ingrédients premium",
            desc: "Bœuf sélectionné, buns briochés, fromages affinés.",
          }, {
            title: "Cuisson smash",
            desc: "Caramélisation intense, croustillant dehors, juteux dedans.",
          }, {
            title: "Sur place, à emporter, livraison",
            desc: "Commandez comme vous aimez — on s'adapte.",
          }].map((f, i) => (
            <Card key={i} className="p-6">
              <div className="text-lg font-bold">{f.title}</div>
              <p className="mt-2 text-black/70">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-white/60">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-center text-3xl font-black">Ils en parlent</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {["“Le smash parfait.”", "“Le meilleur bun de Paris.”", "“Service rapide et chaleureux.”"].map((q, i) => (
              <Card key={i} className="p-6">
                <p className="text-lg">{q}</p>
                <div className="mt-4 text-sm text-black/60">— Avis client</div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Page>
  );
}

function MenuPage() {
  return (
    <Page>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-4xl font-black">Menu</h1>
        <p className="mt-2 text-black/60">Burgers, sides, boissons et desserts — tout est smashé avec amour.</p>
        <div className="mt-10 space-y-12">
          {Object.entries(MENU).map(([cat, items]) => (
            <div key={cat}>
              <h2 className="text-2xl font-extrabold">{cat}</h2>
              <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((it, i) => (
                  <Card key={i} className="overflow-hidden">
                    <img src={it.img} alt={it.name} className="h-44 w-full object-cover" />
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-bold">{it.name}</h3>
                          <p className="mt-1 text-black/60">{it.desc}</p>
                        </div>
                        <div className="shrink-0 rounded-full bg-amber-100 px-3 py-1 font-bold text-amber-700">{it.price}</div>
                      </div>
                      {it.tags && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {it.tags.map((t) => (
                            <span key={t} className="rounded-full bg-black/5 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-black/60">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Page>
  );
}

function ReservationsPage() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [date, setDate] = React.useState(() => new Date().toISOString().slice(0,10));
  const [time, setTime] = React.useState("19:30");
  const [size, setSize] = React.useState("2");
  const [notes, setNotes] = React.useState("");
  const [result, setResult] = React.useState(null);

  const slots = React.useMemo(() => {
    const out = [];
    for (let h = 11; h <= 22; h++) {
      for (let m of [0, 30]) {
        if (h === 11 && m < 30) continue;
        if (h === 22 && m > 0) continue;
        const hh = String(h).padStart(2, '0');
        const mm = String(m).padStart(2, '0');
        out.push(`${hh}:${mm}`);
      }
    }
    return out;
  }, []);

  function checkAvailability(d, t, s) {
    const capacity = 12;
    const occupied = (hash(d + t) % capacity) + parseInt(s,10) % 3;
    const free = Math.max(0, capacity - occupied);
    return { free, capacity, ok: free > 0 };
  }

  function generateId(len = 6) {
    const s = Math.random().toString(36).slice(2).toUpperCase();
    return s.slice(0, len);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const avail = checkAvailability(date, time, size);
    if (!avail.ok) {
      setResult({ ok: false, message: "Ce créneau est presque complet. Essayez un horaire voisin (±30 min)." });
      return;
    }
    const id = generateId();
    const payload = { id, name, email, phone, date, time, size, notes, ts: Date.now() };
    const all = JSON.parse(localStorage.getItem('bunlab_reservations') || '[]');
    all.push(payload);
    localStorage.setItem('bunlab_reservations', JSON.stringify(all));
    setResult({ ok: true, id, payload });
  }

  return (
    <Page>
      <section className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-4xl font-black">Réserver une table</h1>
        <p className="mt-2 text-black/60">Sélectionnez votre créneau — confirmation instantanée.</p>

        <Card className="mt-8 p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-semibold">Nom complet</label>
              <Input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex. Samir Ben Ali" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold">Email</label>
              <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@exemple.com" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold">Téléphone</label>
              <Input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="06 xx xx xx xx" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold">Date</label>
              <Input type="date" required min={new Date().toISOString().slice(0,10)} value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold">Heure</label>
              <Select value={time} onChange={(e) => setTime(e.target.value)}>
                {slots.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold">Personnes</label>
              <Select value={size} onChange={(e) => setSize(e.target.value)}>
                {[...Array(10)].map((_, i) => (
                  <option key={i+1} value={i+1}>{i+1}</option>
                ))}
              </Select>
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-semibold">Notes</label>
              <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Allergènes, préférence de table, événement…" />
            </div>
            <div className="md:col-span-2 flex items-center justify-between gap-3">
              <div className="text-sm text-black/60">📞 Besoin d'aide ? {BRAND.phone}</div>
              <Button type="submit">Confirmer la réservation</Button>
            </div>
          </form>
        </Card>

        {result && (
          <Card className="mt-6 p-6">
            {result.ok ? (
              <div>
                <div className="text-xl font-bold">C'est réservé 🎉</div>
                <p className="mt-1 text-black/70">
                  Numéro de confirmation <span className="font-mono font-bold">{result.id}</span> —
                  {" "}le {date} à {time} pour {size} personne(s).
                </p>
                <p className="mt-2 text-sm text-black/60">
                  Un email de confirmation sera envoyé à {email}. (Démo — non envoyé)
                </p>
              </div>
            ) : (
              <div>
                <div className="text-xl font-bold">Créneau très demandé</div>
                <p className="mt-1 text-black/70">{result.message}</p>
              </div>
            )}
          </Card>
        )}
      </section>
    </Page>
  );
}

function GalleryPage() {
  const imgs = [
    "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1607013407627-6ac4e4a6438e?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1526312426976-593c2b9990f5?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1601924582971-b0c5be3c2d1e?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?auto=format&fit=crop&w=1400&q=80",
  ];
  return (
    <Page>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-4xl font-black">Galerie</h1>
        <p className="mt-2 text-black/60">Un aperçu de nos smashs, sides et moments en salle.</p>
        <div className="mt-8 columns-1 gap-4 sm:columns-2 md:columns-3">
          {imgs.map((src, i) => (
            <img key={i} src={src} alt="galerie" className="mb-4 w-full break-inside-avoid rounded-2xl shadow-md transition-transform hover:-translate-y-1" />
          ))}
        </div>
      </section>
    </Page>
  );
}

function AboutPage() {
  return (
    <Page>
      <section className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-4xl font-black">Notre histoire</h1>
        <p className="mt-4 text-lg text-black/70">
          Né dans une cuisine de 12 m² à Oberkampf, {BRAND.name} est devenu un club pour
          amoureux de burgers smash : cuisson ultra‑chaude, bords crousti‑caramélisés,
          fromages qui fondent — et buns moelleux.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <div className="text-lg font-bold">Nos engagements</div>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-black/70">
              <li>Fournisseurs locaux & saisonnalité</li>
              <li>Options végétariennes & vegan</li>
              <li>Hygiène irréprochable</li>
              <li>Service sous 10 minutes à midi</li>
            </ul>
          </Card>
          <Card className="overflow-hidden">
            <img src="https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=1400&q=80" alt="équipe" className="h-full w-full object-cover" />
          </Card>
        </div>
      </section>
    </Page>
  );
}

function ContactPage() {
  return (
    <Page>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-4xl font-black">Nous trouver</h1>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <div className="text-lg font-bold">Adresse</div>
            <div className="mt-2 text-black/70">{BRAND.address}</div>
            <div className="mt-4 text-lg font-bold">Contact</div>
            <div className="mt-2 text-black/70">{BRAND.phone}</div>
            <a className="mt-4 inline-block text-amber-700 underline" href={BRAND.socials.maps} target="_blank">Itinéraire Google Maps</a>
          </Card>
          <Card className="overflow-hidden">
            <iframe
              title="map"
              className="h-[300px] w-full md:h-full"
              src="https://www.google.com/maps?q=27+Rue+Oberkampf,+75011+Paris&output=embed"
              loading="lazy"
            />
          </Card>
        </div>
      </section>
    </Page>
  );
}

function NotFound() {
  const navigate = useNavigate();
  return (
    <Page>
      <section className="mx-auto max-w-3xl px-4 py-24 text-center">
        <div className="text-6xl font-black">404</div>
        <p className="mt-2 text-black/60">Cette page n'existe pas.</p>
        <Button className="mt-6" onClick={() => navigate('/')}>Retour à l'accueil</Button>
      </section>
    </Page>
  );
}

export default function App() {
  return (
    <HashRouter>
      <SiteBg />
      <Navbar />
      <RouteWipe />
      <AnimatedRoutes />
      <Footer />
    </HashRouter>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/galerie" element={<GalleryPage />} />
        <Route path="/a-propos" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function SiteBg() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-50">
      <div className="absolute -top-32 left-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-400/30 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-72 w-72 translate-x-1/2 rounded-full bg-orange-300/25 blur-3xl" />
    </div>
  );
}
