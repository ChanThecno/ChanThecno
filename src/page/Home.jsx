import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa6";

import Header from "../components/Header";
import LogoChanThecno from "../assets/chanthecno.svg";
import { FaGithub } from "react-icons/fa";

function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="m14.5 9.5-1.8 5-5 1.8 1.8-5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="0.75" fill="currentColor" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M12 3.5 19 6v5.5c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-4.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SproutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M12 21V11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 12c0-3.5-2.5-6-7-6 0 3.8 2.6 6.4 7 6ZM12 10c0-4 2.8-6.5 7-6.5 0 4.2-2.9 6.7-7 6.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0">
      <path
        d="m5 12.5 4.2 4.2L19 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PuzzleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M9 4h4a1 1 0 0 1 1 1v2.2a1.6 1.6 0 0 0 2.7 1.15A1.6 1.6 0 0 1 19.3 9V13a1 1 0 0 1-1 1h-2.2a1.6 1.6 0 0 0-1.15 2.7 1.6 1.6 0 0 1-1.15 2.7H10a1 1 0 0 1-1-1v-2.2a1.6 1.6 0 0 0-2.7-1.15A1.6 1.6 0 0 1 4.7 14 1.6 1.6 0 0 1 6.4 11a1.6 1.6 0 0 0-1.15-2.7A1.6 1.6 0 0 1 4 7V5a1 1 0 0 1 1-1h4Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const misi = [
  {
    title: "Identifikasi Masalah Bisnis",
    desc: "Membantu bisnis menemukan dan memahami persoalan operasional yang berpotensi diselesaikan lewat AI dan otomatisasi.",
  },
  {
    title: "Penerapan Artificial Intelligence",
    desc: "Mengembangkan dan menerapkan teknologi AI sebagai solusi yang membantu bisnis bekerja lebih efisien, terstruktur, dan konsisten.",
  },
  {
    title: "Mempercepat Pengembangan Bisnis",
    desc: "Menghemat waktu dan meningkatkan efisiensi proses kerja, agar pelaku usaha bisa fokus pada produk, layanan, dan pertumbuhan.",
  },
  {
    title: "Meningkatkan Kualitas Bisnis",
    desc: "Mengembangkan solusi yang meningkatkan kualitas pelayanan pelanggan, operasional, dan pengalaman pengguna.",
  },
  {
    title: "Mendorong Pertumbuhan Ekonomi",
    desc: "Mendukung pertumbuhan usaha lewat AI, sehingga tercipta peluang baru dan kebutuhan SDM pada pekerjaan bernilai tambah lebih tinggi.",
  },
];

const tujuan = [
  "Membantu UMKM memanfaatkan AI tanpa perlu infrastruktur teknologi yang kompleks.",
  "Mengurangi beban pekerjaan repetitif yang masih dilakukan secara manual.",
  "Meningkatkan kecepatan dan konsistensi pelayanan kepada pelanggan.",
  "Mengembangkan solusi AI yang mudah digunakan oleh pelaku bisnis.",
  "Menumbuhkan produk dari kebutuhan UMKM menuju kebutuhan perusahaan besar.",
  "Melakukan riset dan pengembangan AI secara berkelanjutan.",
  "Membangun ekosistem teknologi yang bermanfaat bagi bisnis, pekerja, dan masyarakat.",
];

const prinsip = [
  {
    icon: <CompassIcon />,
    title: "AI sebagai Alat",
    desc: "Dikembangkan untuk membantu manusia dan bisnis — bukan semata pengganti manusia.",
  },
  {
    icon: <TargetIcon />,
    title: "Berorientasi pada Masalah",
    desc: "Dimulai dari persoalan nyata pengguna, bukan sekadar keinginan memakai teknologi baru.",
  },
  {
    icon: <PuzzleIcon />,
    title: "Sederhana & Mudah Digunakan",
    desc: "Bisa dipakai bisnis tanpa perlu pemahaman teknologi yang rumit.",
  },
  {
    icon: <SproutIcon />,
    title: "Terus Berkembang",
    desc: "Dikembangkan berkelanjutan berdasarkan riset, data, dan kebutuhan bisnis yang berubah.",
  },
  {
    icon: <ShieldIcon />,
    title: "Bertanggung Jawab",
    desc: "Memperhatikan keamanan, privasi, dan dampak penerapan AI bagi pengguna serta masyarakat.",
  },
];

const roadmap = [
  {
    title: "Prototype",
    desc: "Membangun dan menguji kemampuan dasar AI Customer Service.",
  },
  {
    title: "MVP",
    desc: "Mengembangkan produk minimum yang bisa dipakai UMKM secara nyata.",
  },
  {
    title: "Validasi",
    desc: "Menguji produk bersama pengguna dan mengumpulkan masukan untuk peningkatan.",
  },
  {
    title: "Automation Platform",
    desc: "Mengembangkan sistem yang menangani berbagai kebutuhan otomatisasi bisnis.",
  },
  {
    title: "AI Business Platform",
    desc: "Memperluas solusi dari Customer Service ke berbagai proses bisnis lainnya.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

function Home() {
  useEffect(() => {
    const title =
      "ChanThecno — Solusi AI & Otomatisasi Bisnis untuk UMKM Indonesia";
    const description =
      "ChanThecno membantu UMKM dan perusahaan beralih dari proses kerja manual menuju AI dan otomatisasi bisnis, terutama customer service dan operasional.";
    const canonical = "https://chanthecno.com/";

    document.title = title;

    const setMeta = (selector, attribute, value) => {
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(
          attribute,
          selector.match(/\[([^=]+)=/)?.[1] || "",
        );
        document.head.appendChild(element);
      }
      element.setAttribute("content", value);
    };

    const setLink = (rel, href) => {
      let element = document.head.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    setMeta('meta[name="description"]', "name", description);
    setMeta(
      'meta[name="robots"]',
      "name",
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    );
    setMeta('meta[name="googlebot"]', "name", "index, follow");
    setMeta('meta[property="og:type"]', "property", "website");
    setMeta('meta[property="og:title"]', "property", title);
    setMeta('meta[property="og:description"]', "property", description);
    setMeta('meta[property="og:url"]', "property", canonical);
    setMeta('meta[property="og:site_name"]', "property", "ChanThecno");
    setMeta(
      'meta[property="og:image"]',
      "property",
      `${canonical}chanthecno.svg`,
    );
    setMeta('meta[name="twitter:card"]', "name", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", title);
    setMeta('meta[name="twitter:description"]', "name", description);
    setMeta('meta[name="twitter:image"]', "name", `${canonical}chanthecno.svg`);
    setLink("canonical", canonical);

    const existingSchema = document.head.querySelector(
      'script[data-chanthecno-seo="home"]',
    );
    if (existingSchema) existingSchema.remove();

    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.setAttribute("data-chanthecno-seo", "home");
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${canonical}#organization`,
          name: "ChanThecno",
          url: canonical,
          logo: `${canonical}chanthecno.svg`,
        },
        {
          "@type": "WebSite",
          "@id": `${canonical}#website`,
          url: canonical,
          name: "ChanThecno",
          publisher: { "@id": `${canonical}#organization` },
        },
        {
          "@type": "WebPage",
          "@id": `${canonical}#webpage`,
          url: canonical,
          name: title,
          description: description,
          isPartOf: { "@id": `${canonical}#website` },
          about: { "@id": `${canonical}#organization` },
        },
      ],
    });
    document.head.appendChild(schema);

    return () => {
      schema.remove();
    };
  }, []);

  const roadmapRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: roadmapRef,
    offset: ["start 65%", "end 40%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <main className="relative min-h-screen bg-[#020617] text-white">
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.1]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(148,163,184,0.6) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="relative z-10">
        <Header />

        {}
        <section className="px-6 pb-20 pt-16 md:pb-28 md:pt-24">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-6 text-4xl font-bold leading-[1.15] tracking-tight md:text-6xl"
            >
              Membangun jembatan teknologi AI
              <br className="hidden md:block" /> untuk bisnis yang{" "}
              <span className="text-blue-400">bertumbuh.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 md:text-lg"
            >
              Kami membantu UMKM dan perusahaan bertransisi dari proses kerja
              manual menuju otomatisasi — terutama dalam pelayanan pelanggan dan
              operasional bisnis sehari-hari.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <a
                href="#visi"
                className="rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-400"
              >
                Kenali Visi &amp; Misi Kami
              </a>
              <Link
                to="/ChanThecnoAi"
                className="rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/5"
              >
                Tanyakan Ai
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {}
        <section id="visi" className="border-t border-white/5 px-6 py-24">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <blockquote className="mt-5 text-2xl font-semibold leading-snug tracking-tight md:text-4xl">
                "Membangun jembatan teknologi Artificial Intelligence yang
                membantu UMKM dan perusahaan berkembang menuju otomatisasi,
                khususnya dalam pelayanan pelanggan dan operasional bisnis."
              </blockquote>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 md:p-8"
            >
              <p className="mt-4 text-sm leading-7 text-slate-400 md:text-base">
                "Jembatan teknologi" menggambarkan peran kami dalam membantu
                bisnis berpindah dari proses kerja manual menuju proses yang
                lebih modern dan terotomatisasi. Kami tidak hanya berorientasi
                pada pengembangan teknologi, tetapi pada manfaat nyata yang
                dirasakan bisnis dan masyarakat.
              </p>
            </motion.div>
          </div>
        </section>

        {}
        <section className="border-t border-white/5 px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
                Lima langkah mewujudkan visi kami.
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            >
              {misi.map((m) => (
                <motion.div
                  key={m.no}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-blue-400/30 hover:bg-white/[0.04]"
                >
                  <h3 className="mt-3 text-lg font-semibold text-white">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {m.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {}
        <section className="border-t border-white/5 px-6 py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
                Apa yang ingin kami capai.
              </h2>
            </motion.div>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="grid gap-x-8 gap-y-5 sm:grid-cols-2"
            >
              {tujuan.map((t) => (
                <motion.li
                  key={t}
                  variants={fadeUp}
                  transition={{ duration: 0.45 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-300">
                    <CheckIcon />
                  </span>
                  <span className="text-sm leading-6 text-slate-300 md:text-base">
                    {t}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </section>

        {}
        <section className="border-t border-white/5 px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
                Pegangan kami dalam berkarya.
              </h2>
            </motion.div>

            <div className="mt-14 divide-y divide-white/5 border-t border-white/5">
              {prinsip.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:gap-8"
                >
                  <div className="flex items-center gap-4 sm:w-64 sm:shrink-0">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300 transition group-hover:bg-blue-500/20">
                      {p.icon}
                    </span>
                    <h3 className="text-base font-semibold text-white">
                      {p.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-6 text-slate-400 sm:text-base">
                    {p.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {}
        <section
          ref={roadmapRef}
          className="border-t border-white/5 px-6 py-24"
        >
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
                Dari prototype menuju platform AI bisnis.
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-400 md:text-base">
                Kami memulai dari solusi{" "}
                <span className="text-slate-200">
                  AI Customer Service Automation
                </span>{" "}
                sebagai produk awal, dikembangkan bertahap.
              </p>
            </motion.div>

            <div className="relative mt-16 pl-9 sm:pl-12">
              <div className="absolute left-[7px] top-1 h-[calc(100%-1rem)] w-px bg-white/10 sm:left-[11px]" />
              <motion.div
                style={{ scaleY: lineScale }}
                className="absolute left-[7px] top-1 h-[calc(100%-1rem)] w-px origin-top bg-blue-400 sm:left-[11px]"
              />

              <div className="space-y-12">
                {roadmap.map((r) => (
                  <motion.div
                    key={r.title}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <span className="absolute -left-9 top-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-blue-400 bg-[#020617] sm:-left-12" />
                    <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">
                      {r.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400 md:text-base">
                      {r.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {}
        <footer className="border-t border-white/5 bg-slate-950 px-6 py-16 text-slate-400">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-10 pb-12 md:grid-cols-4 sm:grid-cols-2">
              <div className="flex flex-col gap-4 md:col-span-1">
                <img
                  className="h-7 w-auto object-contain self-start"
                  src={LogoChanThecno}
                  alt="Logo ChanThecno"
                />
                <p className="text-sm leading-relaxed text-slate-400">
                  ChanThecno adalah Pelayanan Automation
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
                  Perusahaan
                </h4>
                <ul className="flex flex-col gap-2 text-sm">
                  <li>
                    <a
                      href="javascript:void(0)"
                      className="transition-colors duration-200 hover:text-white"
                    >
                      Tentang Kami
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0)"
                      className="transition-colors duration-200 hover:text-white"
                    >
                      Kontak
                    </a>
                  </li>
                </ul>
              </div>

              {}
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
                  Layanan
                </h4>
                <ul className="flex flex-col gap-2 text-sm">
                  <li>
                    <a
                      href="javascript:void(0)"
                      className="transition-colors duration-200 hover:text-white"
                    >
                      Teknologi
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0)"
                      className="transition-colors duration-200 hover:text-white"
                    >
                      Kemitraan
                    </a>
                  </li>
                </ul>
              </div>

              {}
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
                  Legal
                </h4>
                <ul className="flex flex-col gap-2 text-sm">
                  <li>
                    <a
                      href="javascript:void(0)"
                      className="transition-colors duration-200 hover:text-white"
                    >
                      Kebijakan Privasi
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0)"
                      className="transition-colors duration-200 hover:text-white"
                    >
                      Syarat & Ketentuan
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {}
            <div className="flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 md:flex-row">
              <p className="text-xs text-slate-500 text-center md:text-left">
                &copy; {new Date().getFullYear()}{" "}
                <span className="font-semibold text-slate-300">ChanThecno</span>
                . Seluruh hak cipta dilindungi.
              </p>

              <div className="flex items-center gap-5">
                <a
                  href="https://github.com/chanthecno"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xl transition-colors duration-250 hover:text-pink-500"
                  aria-label="Instagram"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://instagram.com/chanthecno"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xl transition-colors duration-250 hover:text-pink-500"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://chat.whatsapp.com/FNT1ZIzQBS06V2wf9uRiTl"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xl transition-colors duration-250 hover:text-red-500"
                  aria-label="WaKomunitas"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

export default Home;
