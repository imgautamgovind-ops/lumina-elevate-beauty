import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Facebook,
  Instagram,
  MapPin,
  Menu,
  Phone,
  Quote,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { toast } from "sonner";

import heroImage from "@/assets/lumina-hero.jpg";
import mayaImage from "@/assets/stylist-maya.jpg";
import julianImage from "@/assets/stylist-julian.jpg";
import sofiaImage from "@/assets/stylist-sofia.jpg";
import amaraImage from "@/assets/stylist-amara.jpg";
import balayageImage from "@/assets/transformation-balayage.jpg";
import bobImage from "@/assets/transformation-bob.jpg";
import manicureImage from "@/assets/service-manicure.jpg";
import treatmentImage from "@/assets/service-treatment.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Luxury Hair & Beauty — Lumina Salon" },
      {
        name: "description",
        content:
          "Discover bespoke cuts, dimensional color, restorative treatments, and occasion styling at Lumina Salon.",
      },
      { property: "og:title", content: "Luxury Hair & Beauty — Lumina Salon" },
      {
        property: "og:description",
        content: "Bespoke hair artistry and thoughtful beauty rituals, tailored to you.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navItems = [
  ["Services", "#services"],
  ["About Us", "#about"],
  ["Gallery", "#gallery"],
  ["Stylists", "#stylists"],
];

const serviceGroups = {
  "Cut & Style": [
    { name: "Signature Cut & Finish", note: "Consultation, cleanse, cut & blowout", time: "75 min", price: "$95+" },
    { name: "Luxury Blowout", note: "Tailored styling with lasting polish", time: "45 min", price: "$65+" },
    { name: "Curly Hair Ritual", note: "Dry shaping, hydration & curl styling", time: "90 min", price: "$125+" },
  ],
  Color: [
    { name: "Dimensional Balayage", note: "Custom placement, gloss & finish", time: "3 hrs", price: "$245+" },
    { name: "Full Color Refresh", note: "Root-to-end color and conditioning", time: "2 hrs", price: "$165+" },
    { name: "Gloss & Tone", note: "Shine-enhancing tonal refresh", time: "60 min", price: "$85+" },
  ],
  Treatments: [
    { name: "Scalp Spa Ritual", note: "Exfoliation, massage & hydration", time: "60 min", price: "$110" },
    { name: "Bond Restoration", note: "Intensive repair for compromised hair", time: "45 min", price: "$75" },
    { name: "Keratin Smoothing", note: "Frizz control and luminous softness", time: "3 hrs", price: "$285+" },
  ],
  Occasion: [
    { name: "Event Styling", note: "Polished updo or editorial waves", time: "75 min", price: "$135+" },
    { name: "Bridal Preview", note: "Full consultation and style trial", time: "2 hrs", price: "$195" },
    { name: "Bridal Styling", note: "On-the-day signature bridal look", time: "90 min", price: "$225+" },
  ],
};

const stylists = [
  { name: "Maya Chen", role: "Creative Director", specialty: "Dimensional color · Editorial styling", image: mayaImage },
  { name: "Julian Reyes", role: "Master Stylist", specialty: "Precision cuts · Modern texture", image: julianImage },
  { name: "Sofia Bennett", role: "Senior Colorist", specialty: "Blondes · Lived-in color", image: sofiaImage },
  { name: "Amara Brooks", role: "Texture Specialist", specialty: "Curls · Protective styling", image: amaraImage },
];

const galleryItems = [
  { image: balayageImage, title: "Caramel dimension", detail: "Balayage by Maya", alt: "Before and after caramel balayage hair transformation" },
  { image: bobImage, title: "The modern bob", detail: "Cut by Julian", alt: "Before and after precision bob haircut transformation" },
  { image: treatmentImage, title: "The scalp ritual", detail: "Treatment by Sofia", alt: "Client enjoying a luxury scalp treatment" },
  { image: manicureImage, title: "Quiet luxury", detail: "Signature manicure", alt: "Neutral luxury manicure treatment" },
] as const;

const reviews = [
  { quote: "From the consultation to the final reveal, I felt completely understood. My color has never looked this luminous.", name: "Olivia M.", source: "Google review" },
  { quote: "The space is serene, the team is warm, and Julian gave me the most flattering cut I’ve ever had.", name: "Danielle R.", source: "Google review" },
  { quote: "Amara transformed my curls and taught me how to care for them at home. Every detail felt considered.", name: "Tessa K.", source: "Instagram review" },
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState<keyof typeof serviceGroups>("Cut & Style");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preferredStylist, setPreferredStylist] = useState("");
  const galleryItem = galleryItems[galleryIndex] ?? galleryItems[0];

  const openBooking = (stylist = "") => {
    setPreferredStylist(stylist);
    setBookingOpen(true);
  };

  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBookingOpen(false);
    toast.success("Your appointment request is on its way", {
      description: "Our concierge will confirm your preferred time shortly.",
    });
  };

  return (
    <main className="overflow-hidden bg-background">
      <header className="absolute inset-x-0 top-0 z-40 border-b border-hero-foreground/20 text-hero-foreground">
        <div className="section-shell grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:flex lg:justify-between">
          <a href="#top" className="min-w-0 font-display text-2xl sm:text-3xl" aria-label="Lumina Salon home">
            Lumina <span className="text-champagne">Salon</span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="text-sm font-medium transition-colors hover:text-champagne">
                {label}
              </a>
            ))}
            <Button variant="nav" size="lg" onClick={() => openBooking()}>
              Book now
            </Button>
          </nav>
          <Button
            variant="hero-outline"
            size="icon"
            className="shrink-0 lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen && (
          <nav className="border-t border-hero-foreground/20 bg-charcoal px-4 py-5 lg:hidden" aria-label="Mobile navigation">
            <div className="mx-auto flex max-w-xl flex-col gap-1">
              {navItems.map(([label, href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} className="border-b border-hero-foreground/10 py-3 text-base">
                  {label}
                </a>
              ))}
              <Button variant="nav" size="lg" className="mt-4" onClick={() => openBooking()}>
                Book now
              </Button>
            </div>
          </nav>
        )}
      </header>

      <section id="top" className="relative flex min-h-[44rem] items-end text-hero-foreground lg:min-h-[48rem]">
        <img src={heroImage} width={1920} height={1152} alt="Stylists at work inside Lumina Salon" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/60 to-charcoal/5" />
        <div className="section-shell relative z-10 pb-16 pt-36 sm:pb-24">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-champagne">
              <span className="h-px w-10 bg-champagne" /> Modern beauty, thoughtfully done
            </div>
            <h1 className="max-w-2xl text-5xl leading-[1.05] sm:text-6xl lg:text-8xl">
              Elevate Your <span className="italic text-champagne">Everyday</span> Style.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-hero-foreground/80 sm:text-lg">
              Experience luxury hair care and bespoke styling tailored exclusively for you.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button variant="hero" size="lg" onClick={() => openBooking()}>
                Book an appointment <ArrowRight />
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <a href="#services">Explore services</a>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 hidden min-w-72 border-l border-t border-hero-foreground/20 bg-hero-surface px-8 py-5 backdrop-blur-md md:block">
          <p className="text-xs uppercase tracking-[0.18em] text-champagne">Now welcoming</p>
          <p className="mt-1 text-sm">New clients · Tuesday–Saturday</p>
        </div>
      </section>

      <section id="about" className="bg-cream py-20 sm:py-28">
        <div className="section-shell grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div>
            <p className="eyebrow">The Lumina philosophy</p>
            <h2 className="mt-4 text-4xl leading-tight sm:text-5xl lg:text-6xl">Beauty that feels entirely your own.</h2>
          </div>
          <div className="border-l border-primary/35 pl-6 sm:pl-10">
            <p className="text-lg leading-8 text-muted-foreground">
              We pair intuitive consultation with modern technique, creating effortless looks that honor your texture, your routine, and your point of view.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t hairline pt-6">
              <div><strong className="font-display text-3xl text-foreground">12+</strong><span className="mt-1 block text-xs text-muted-foreground">Years of artistry</span></div>
              <div><strong className="font-display text-3xl text-foreground">4.9</strong><span className="mt-1 block text-xs text-muted-foreground">Client rating</span></div>
              <div><strong className="font-display text-3xl text-foreground">3k+</strong><span className="mt-1 block text-xs text-muted-foreground">Happy clients</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 sm:py-28">
        <div className="section-shell">
          <div className="max-w-2xl">
            <p className="eyebrow">Our menu</p>
            <h2 className="mt-4 text-4xl sm:text-5xl">Services designed around you.</h2>
            <p className="mt-4 text-muted-foreground">Every appointment begins with a thoughtful consultation. Pricing may vary by hair length and stylist level.</p>
          </div>
          <div className="mt-10 overflow-x-auto border-b hairline">
            <div className="flex min-w-max gap-8" role="tablist" aria-label="Service categories">
              {(Object.keys(serviceGroups) as Array<keyof typeof serviceGroups>).map((category) => (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={activeService === category}
                  onClick={() => setActiveService(category)}
                  className={`relative pb-4 text-sm font-semibold transition-colors ${activeService === category ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {category}
                  {activeService === category && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-px bg-border lg:grid-cols-3">
            {serviceGroups[activeService].map((service) => (
              <article key={service.name} className="group bg-background p-7 transition-colors hover:bg-card sm:p-9">
                <div className="flex items-start justify-between gap-5">
                  <h3 className="text-2xl">{service.name}</h3>
                  <span className="shrink-0 font-display text-xl text-primary">{service.price}</span>
                </div>
                <p className="mt-3 min-h-12 text-sm leading-6 text-muted-foreground">{service.note}</p>
                <div className="mt-7 flex items-center justify-between border-t hairline pt-5">
                  <span className="flex items-center gap-2 text-xs text-muted-foreground"><Clock3 className="size-4 text-primary" />{service.time}</span>
                  <button type="button" onClick={() => openBooking()} className="text-xs font-semibold uppercase tracking-[0.12em] text-primary transition-colors hover:text-foreground">Book service</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="stylists" className="bg-charcoal py-20 text-hero-foreground sm:py-28">
        <div className="section-shell">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow text-champagne">The artists</p>
              <h2 className="mt-4 max-w-2xl text-4xl sm:text-5xl">Meet the hands behind the glow.</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-hero-foreground/65">A collective of specialists, united by craft and an instinct for what makes you feel most like yourself.</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stylists.map((stylist) => (
              <article key={stylist.name} className="group">
                <div className="overflow-hidden bg-hero-surface">
                  <img src={stylist.image} width={768} height={1024} loading="lazy" alt={`${stylist.name}, ${stylist.role} at Lumina Salon`} className="aspect-[3/4] w-full object-cover grayscale-[15%] transition duration-500 group-hover:scale-[1.025] group-hover:grayscale-0" />
                </div>
                <div className="border-b border-hero-foreground/20 py-5">
                  <p className="text-xs uppercase tracking-[0.15em] text-champagne">{stylist.role}</p>
                  <h3 className="mt-2 text-2xl">{stylist.name}</h3>
                  <p className="mt-2 text-sm text-hero-foreground/60">{stylist.specialty}</p>
                  <button type="button" onClick={() => openBooking(stylist.name)} className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-champagne transition-all hover:gap-3">
                    Book with {stylist.name.split(" ")[0]} <ArrowRight className="size-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-cream py-20 sm:py-28">
        <div className="section-shell">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <p className="eyebrow">Transformations</p>
              <h2 className="mt-4 text-4xl sm:text-5xl">Real craft. Real confidence.</h2>
              <p className="mt-5 max-w-md leading-7 text-muted-foreground">From subtle refinements to fresh new chapters, each look begins with your story.</p>
              <div className="mt-8 flex items-center gap-3">
                <Button variant="outline" size="icon" aria-label="Previous gallery image" onClick={() => setGalleryIndex((galleryIndex - 1 + galleryItems.length) % galleryItems.length)}><ArrowLeft /></Button>
                <Button variant="outline" size="icon" aria-label="Next gallery image" onClick={() => setGalleryIndex((galleryIndex + 1) % galleryItems.length)}><ArrowRight /></Button>
                <span className="ml-3 text-xs tabular-nums text-muted-foreground">0{galleryIndex + 1} / 0{galleryItems.length}</span>
              </div>
            </div>
            <div className="relative overflow-hidden bg-warm">
              <img src={galleryItem.image} width={1400} height={900} loading="lazy" alt={galleryItem.alt} className="aspect-[14/9] w-full object-cover" />
              <div className="absolute bottom-0 left-0 bg-charcoal px-6 py-4 text-hero-foreground sm:px-8">
                <p className="font-display text-xl">{galleryItem.title}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-champagne">{galleryItem.detail}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28" aria-labelledby="reviews-title">
        <div className="section-shell">
          <div className="text-center">
            <p className="eyebrow">Client notes</p>
            <h2 id="reviews-title" className="mt-4 text-4xl sm:text-5xl">Love, in their own words.</h2>
          </div>
          <div className="mt-12 grid gap-px bg-border md:grid-cols-3">
            {reviews.map((review) => (
              <figure key={review.name} className="relative bg-background p-8 sm:p-10">
                <Quote className="size-8 text-primary/35" />
                <div className="mt-6 flex gap-1" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4 fill-champagne text-champagne" />)}</div>
                <blockquote className="mt-6 font-display text-xl leading-8">“{review.quote}”</blockquote>
                <figcaption className="mt-8 border-t hairline pt-5"><span className="font-semibold">{review.name}</span><span className="ml-2 text-xs text-muted-foreground">{review.source}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-charcoal py-20 text-hero-foreground sm:py-28">
        <div className="section-shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <p className="eyebrow text-champagne">Visit Lumina</p>
            <h2 className="mt-4 text-4xl sm:text-5xl">Your best hair days start here.</h2>
            <p className="mt-5 max-w-md leading-7 text-hero-foreground/65">Tell us what you’re dreaming of. Our concierge will pair you with the right artist and appointment.</p>
            <div className="mt-10 space-y-5 border-t border-hero-foreground/15 pt-8 text-sm">
              <div className="flex gap-4"><MapPin className="mt-0.5 size-5 shrink-0 text-champagne" /><span>128 Mercer Street<br />New York, NY 10012</span></div>
              <div className="flex gap-4"><Phone className="size-5 shrink-0 text-champagne" /><a href="tel:+12125550184" className="hover:text-champagne">(212) 555-0184</a></div>
              <div className="flex gap-4"><Clock3 className="mt-0.5 size-5 shrink-0 text-champagne" /><span>Tue–Fri 9am–7pm<br />Saturday 9am–5pm</span></div>
            </div>
            <div className="mt-8 flex gap-3">
              <Button variant="hero-outline" size="icon" aria-label="Instagram"><Instagram /></Button>
              <Button variant="hero-outline" size="icon" aria-label="Facebook"><Facebook /></Button>
            </div>
          </div>
          <div className="bg-cream p-6 text-foreground sm:p-10">
            <div className="flex items-center gap-3 text-primary"><Sparkles className="size-5" /><span className="text-xs font-semibold uppercase tracking-[0.15em]">Appointment request</span></div>
            <BookingForm onSubmit={submitBooking} preferredStylist={preferredStylist} />
          </div>
        </div>
        <div className="section-shell mt-12">
          <div className="relative grid min-h-56 place-items-center overflow-hidden border border-hero-foreground/15 bg-hero-surface text-center">
            <div className="map-grid absolute inset-0 opacity-25" />
            <div className="relative"><MapPin className="mx-auto size-7 text-champagne" /><p className="mt-3 font-display text-2xl">SoHo, New York</p><a href="https://maps.google.com/?q=128+Mercer+Street+New+York" target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs uppercase tracking-[0.12em] text-champagne hover:underline">Open in maps</a></div>
          </div>
        </div>
      </section>

      <footer className="bg-cream py-14">
        <div className="section-shell">
          <div className="grid gap-10 border-b hairline pb-10 md:grid-cols-[1fr_auto_auto] md:gap-16">
            <div className="max-w-sm">
              <a href="#top" className="font-display text-3xl">Lumina <span className="text-primary">Salon</span></a>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">Join our list for seasonal rituals, artist notes, and a welcome offer for your next visit.</p>
              <NewsletterForm />
            </div>
            <div><p className="text-xs font-semibold uppercase tracking-[0.15em]">Explore</p><div className="mt-5 grid gap-3 text-sm text-muted-foreground">{navItems.map(([label, href]) => <a key={href} href={href} className="hover:text-foreground">{label}</a>)}</div></div>
            <div><p className="text-xs font-semibold uppercase tracking-[0.15em]">Contact</p><div className="mt-5 space-y-3 text-sm text-muted-foreground"><p>128 Mercer Street<br />New York, NY 10012</p><p>(212) 555-0184</p><p>hello@luminasalon.com</p></div></div>
          </div>
          <div className="flex flex-col gap-3 pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between"><p>© 2026 Lumina Salon. All rights reserved.</p><div className="flex gap-5"><a href="#top" className="hover:text-foreground">Privacy</a><a href="#top" className="hover:text-foreground">Accessibility</a></div></div>
        </div>
      </footer>

      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto bg-cream p-6 sm:p-10">
          <DialogHeader>
            <p className="eyebrow">Your Lumina visit</p>
            <DialogTitle className="font-display text-3xl font-normal sm:text-4xl">Request an appointment</DialogTitle>
            <DialogDescription>Share your preferences and our concierge will confirm your time.</DialogDescription>
          </DialogHeader>
          <BookingForm onSubmit={submitBooking} preferredStylist={preferredStylist} />
        </DialogContent>
      </Dialog>
    </main>
  );
}

function BookingForm({ onSubmit, preferredStylist }: { onSubmit: (event: FormEvent<HTMLFormElement>) => void; preferredStylist: string }) {
  return (
    <form className="mt-7 grid gap-5 sm:grid-cols-2" onSubmit={onSubmit}>
      <Field label="Full name"><Input required name="name" placeholder="Your name" className="h-12 bg-card" /></Field>
      <Field label="Email"><Input required name="email" type="email" placeholder="you@example.com" className="h-12 bg-card" /></Field>
      <Field label="Phone"><Input required name="phone" type="tel" placeholder="(555) 000-0000" className="h-12 bg-card" /></Field>
      <Field label="Service">
        <Select required><SelectTrigger className="h-12 bg-card"><SelectValue placeholder="Select a service" /></SelectTrigger><SelectContent><SelectItem value="cut">Cut & styling</SelectItem><SelectItem value="color">Color</SelectItem><SelectItem value="treatment">Treatment</SelectItem><SelectItem value="occasion">Bridal / occasion</SelectItem><SelectItem value="manicure">Manicure</SelectItem></SelectContent></Select>
      </Field>
      <Field label="Preferred date"><div className="relative"><CalendarDays className="pointer-events-none absolute left-3 top-3.5 size-5 text-muted-foreground" /><Input required name="date" type="date" className="h-12 bg-card pl-11" /></div></Field>
      <Field label="Preferred time"><Input required name="time" type="time" className="h-12 bg-card" /></Field>
      {preferredStylist && <div className="sm:col-span-2 flex items-center gap-2 bg-secondary px-4 py-3 text-sm"><Check className="size-4 text-primary" /> Preferred artist: <strong>{preferredStylist}</strong></div>}
      <Button type="submit" size="lg" className="sm:col-span-2 mt-2">Request appointment <ArrowRight /></Button>
      <p className="sm:col-span-2 text-xs leading-5 text-muted-foreground">Submitting this form requests an appointment. Your booking is confirmed only after our concierge contacts you.</p>
    </form>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground"><span>{label}</span>{children}</label>;
}

function NewsletterForm() {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("You’re on the Lumina list", { description: "Your welcome offer will arrive by email." });
    event.currentTarget.reset();
  };
  return <form onSubmit={submit} className="mt-5 flex"><Input required type="email" aria-label="Email for newsletter" placeholder="Email address" className="h-11 rounded-r-none bg-card" /><Button type="submit" className="h-11 rounded-l-none px-5" aria-label="Join newsletter"><ArrowRight /></Button></form>;
}
