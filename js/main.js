const U = (p) => p;
const VID = {
  lucky: "video/lucky.mp4",
  ism: "video/ism.mp4",
  pm1: "video/pm1.mp4",
  pm2: "video/pm2.mp4",
  pm3: "video/pm3.mp4",
};
const REELS = `<div class="reels" id="reels"><figure class="ph" data-v="lucky"><video muted loop playsinline preload="none" poster="video/lucky.webp" src="${VID.lucky}"></video><b class="mono">Lucky</b></figure><figure class="ph" data-v="ism"><video muted loop playsinline preload="none" poster="video/ism.webp" src="${VID.ism}"></video><b class="mono">ISM</b></figure><figure class="ph" data-v="pm1"><video muted loop playsinline preload="none" poster="video/pm1.webp" src="${VID.pm1}"></video><b class="mono">Prisma Mall 01</b></figure><figure class="ph" data-v="pm2"><video muted loop playsinline preload="none" poster="video/pm2.webp" src="${VID.pm2}"></video><b class="mono">Prisma Mall 02</b></figure><figure class="ph" data-v="pm3"><video muted loop playsinline preload="none" poster="video/pm3.webp" src="${VID.pm3}"></video><b class="mono">Prisma Mall 03</b></figure></div>`;
const R = (p, n) =>
  Array.from({ length: n }, (_, i) => `img/${p}-${i + 1}.webp`);
const P = [
  {
    t: "Fringos",
    tag: "Social media posts",
    txt: "Bold red-and-gold food promotions: deal posts, product hero shots and playful taglines for a fast food brand.",
    cols: "",
    imgs: R("fringos", 6),
  },
  {
    t: "Chicken King",
    tag: "Social media posts",
    txt: "Dark, high-contrast food creatives for a pizza and BBQ restaurant, with prices and delivery details built into every post.",
    imgs: R("chickenking", 6),
  },
  {
    t: "Daffy Duck",
    tag: "Social posts & menus",
    txt: "A bright yellow brand system across social posts and two full printed menus.",
    imgs: [...R("daffy", 3), "img/daffy-menu-1.webp", "img/daffy-menu-2.webp"],
  },
  {
    t: "AK Steel",
    tag: "Social media posts",
    txt: "Industrial campaign visuals for AK Steel &amp; Re-Rolling Mills, including a launch screen and grade announcement for mobile.",
    imgs: [...R("aksteel", 3), "img/aksteel-phones.webp"],
    c: "c4",
  },
  {
    t: "AM Steel",
    tag: "Social media posts",
    txt: "Construction-led posts for AM Steel built around strong headlines and real-world imagery.",
    imgs: [
      "img/aksteel-4.webp",
      "img/aksteel-5.webp",
      "img/aksteel-6.webp",
      "img/aksteel-7.webp",
    ],
    c: "c4",
  },
  {
    t: "APL Aluminium",
    tag: "Social media posts",
    txt: "Clean, light-toned posts for windows and doors, from the house of APL and Guardian Aluminium.",
    imgs: R("apl", 7),
  },
  {
    t: "Sharjah Tiles",
    tag: "Social media posts",
    txt: "Elegant lifestyle and product posts for Sharjah Tiles, since 1998.",
    imgs: R("sharjah", 7),
  },
  {
    t: "Zarafa Rice",
    tag: "Social posts",
    txt: "Premium basmati creatives, a contest campaign and festive food visuals for Zarafa Rice.",
    imgs: R("zarafa", 7),
  },
  {
    t: "Print Media",
    tag: "Billboard & standees",
    txt: "Large-format designs: a Techno furniture billboard and Urdu standees for Welco, Aisha Developers, White Gold Steel and Zarafa.",
    single: ["img/billboard.webp", "img/standees.webp"],
  },
  {
    t: "Video Editing",
    tag: "Influencer reels",
    txt: "Short-form vertical video edits for brands and malls: Prisma Mall, Lucky, ISM and influencer reels, with on-screen text and promo overlays.",
    reels: true,
  },
  {
    t: "Logo Designs",
    tag: "Identity",
    txt: "Logos for Wasser, MM Entertainment, Supercheap Tyres Perth and Deep Assist.",
    logos: [
      ["img/logo-wasser.webp", 0],
      ["img/logo-mm.webp", 0],
      ["img/logo-supercheap.webp", 1],
      ["img/logo-deepassist.webp", 1],
    ],
  },
  {
    t: "Gujranwala News",
    tag: "2024 — Now",
    txt: "Region’s number 1 news network: social creatives for the Gujranwala News and Gujranwala TV pages, with the on-air team.",
    single: ["img/GUJNEWS.PNG"],
    ex: true,
  },
];
const $ = (s) => document.querySelector(s);
const pad = (n) => String(n).padStart(2, "0");
$("#count").textContent = P.length + " projects";
const fig = (s) => `<figure><img src="${U(s)}" loading="lazy" alt=""></figure>`;
$("#projects").innerHTML = P.map((p, i) => {
  let body = "";
  if (p.reels && !p.single) body = "";
  else if (p.logos)
    body = `<div class="logos rv">${p.logos.map((l) => `<figure class="${l[1] ? "dk" : ""}">${l[0].includes("deepassist") ? '<div class="da" role="img" aria-label="Deep Assist"><b>DEEP</b><span>ASSIST</span></div>' : `<img src="${U(l[0])}" alt="">`}</figure>`).join("")}</div>`;
  else if (p.single)
    body = `<div class="single rv">${p.single.map(fig).join("")}</div>`;
  else {
    body = `<div class="masonry ${p.c || ""} rv">${p.imgs.map(fig).join("")}</div>`;
    if (p.extra)
      body += `<div class="two rv" style="margin-top:clamp(10px,1.4vw,20px)">${p.extra.map(fig).join("")}</div>`;
  }
  if (p.reels) body = REELS + body;
  return `<article class="proj" id="p${i}"><div class="head"><div class="rv"><div class="meta mono"><span>Project ${i + 1}</span><span>${p.tag}</span></div><h3>${p.t}</h3></div><div class="rv"><p>${p.txt}</p></div></div>${body}</article>`;
}).join("");

// reveal
if ("IntersectionObserver" in window)
  document.documentElement.classList.add("js");
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
);
document.querySelectorAll(".rv").forEach((el) => io.observe(el));
// scroll-in animation for every image and text block, with a small stagger
document.querySelectorAll(".masonry,.single,.two,.logos").forEach((c) =>
  [...c.children].forEach((f, i) => {
    f.classList.add("rv", "fi");
    f.style.transitionDelay = (i % 4) * 90 + "ms";
    io.observe(f);
  }),
);
document
  .querySelectorAll(
    ".proj .head .meta,.proj h3,.proj .head p,.facts .f,.svc div,.sh,.cinfo a",
  )
  .forEach((el) => {
    el.classList.add("rv");
    io.observe(el);
  });

// reel wall: scroll-driven fan-in, play only when visible
(() => {
  const w = document.getElementById("reels");
  if (!w) return;
  const ph = [...w.children],
    vs = ph.map((f) => f.querySelector("video"));
  const mobile = matchMedia("(max-width:900px)"),
    calm = matchMedia("(prefers-reduced-motion:reduce)");
  let on = false,
    tk = false;
  const upd = () => {
    tk = false;
    if (mobile.matches || calm.matches) {
      w.style.setProperty("--p", 1);
      return;
    }
    const r = w.getBoundingClientRect(),
      vh = innerHeight,
      p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.75)));
    const e = 1 - Math.pow(1 - p, 3);
    ph.forEach((f, i) =>
      f.style.setProperty(
        "--p",
        Math.min(1, Math.max(0, e * 1.25 - Math.abs(i - 2) * 0.1)),
      ),
    );
  };
  const q = () => {
    if (!tk) {
      tk = true;
      requestAnimationFrame(upd);
    }
  };
  addEventListener("scroll", q, { passive: true, capture: true });
  addEventListener("resize", q);
  upd();
  new IntersectionObserver(
    (es) => {
      es.forEach((e) => {
        on = e.isIntersecting;
        vs.forEach((v) => (on ? v.play().catch(() => {}) : v.pause()));
      });
    },
    { threshold: 0.15 },
  ).observe(w);
  const vb = document.getElementById("vb"),
    vv = vb.querySelector("video");
  w.addEventListener("click", (e) => {
    const f = e.target.closest(".ph");
    if (!f) return;
    vv.src = VID[f.dataset.v];
    vv.muted = true;
    vb.classList.add("on");
    vv.play().catch(() => {});
  });
  vb.addEventListener("click", (e) => {
    if (e.target === vv) return;
    vb.classList.remove("on");
    vv.pause();
    vv.removeAttribute("src");
    vv.load();
  });
  addEventListener("keydown", (e) => {
    if (e.key === "Escape" && vb.classList.contains("on")) {
      vb.classList.remove("on");
      vv.pause();
    }
  });
})();

// hide nav on scroll down, show on scroll up
const hd = document.querySelector("header");
let ly = 0,
  ty = 0;
const Y = () =>
  window.pageYOffset ||
  document.documentElement.scrollTop ||
  document.body.scrollTop ||
  0;
const setNav = (down) => hd.classList.toggle("hide", down && Y() > 80);
let ticking = false;
const onScroll = () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    const y = Y(),
      d = y - ly;
    if (y <= 80) {
      hd.classList.remove("hide");
    } else if (Math.abs(d) >= 4) {
      hd.classList.toggle("hide", d > 0);
    }
    ly = y;
  });
};
addEventListener("scroll", onScroll, { passive: true, capture: true });
document.addEventListener("scroll", onScroll, { passive: true, capture: true });
/* also react to wheel and touch directly, in case the page scrolls in a wrapper */
addEventListener(
  "wheel",
  (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && Math.abs(e.deltaY) > 2)
      setNav(e.deltaY > 0);
  },
  { passive: true },
);
addEventListener(
  "touchstart",
  (e) => {
    ty = e.touches[0].clientY;
  },
  { passive: true },
);
addEventListener(
  "touchmove",
  (e) => {
    const y = e.touches[0].clientY,
      d = ty - y;
    if (Math.abs(d) > 8) {
      setNav(d > 0);
      ty = y;
    }
  },
  { passive: true },
);

// light / dark toggle: circular reveal growing from the button
(() => {
  const root = document.documentElement,
    btn = document.getElementById("theme");
  if (!btn) return;
  const calm = matchMedia("(prefers-reduced-motion:reduce)"),
    BG = { light: "#f3f3f0", dark: "#141414" },
    EASE = "cubic-bezier(.76,0,.24,1)",
    DUR = 950;
  const cur = () => (root.dataset.theme === "light" ? "light" : "dark");
  const sync = () => {
    const l = cur() === "light";
    btn.setAttribute(
      "aria-label",
      l ? "Switch to dark theme" : "Switch to light theme",
    );
    btn.setAttribute("aria-pressed", String(l));
  };
  const apply = (t) => {
    root.dataset.theme = t;
    try {
      localStorage.setItem("theme", t);
    } catch (e) {}
    const m = document.querySelector('meta[name="theme-color"]');
    if (m) m.content = BG[t];
    if (window.setRibbonTheme) window.setRibbonTheme();
    sync();
  };
  sync();
  btn.addEventListener("click", () => {
    const next = cur() === "light" ? "dark" : "light",
      r = btn.getBoundingClientRect(),
      x = r.left + r.width / 2,
      y = r.top + r.height / 2;
    const end = Math.ceil(
      Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)),
    );
    if (calm.matches) {
      apply(next);
      return;
    }
    if (document.startViewTransition) {
      const vt = document.startViewTransition(() => apply(next));
      vt.ready
        .then(() => {
          root.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${end}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: DUR,
              easing: EASE,
              pseudoElement: "::view-transition-new(root)",
            },
          );
          root.animate(
            {
              filter: [
                "brightness(1) saturate(1)",
                "brightness(.55) saturate(.7)",
              ],
            },
            {
              duration: DUR,
              easing: EASE,
              fill: "forwards",
              pseudoElement: "::view-transition-old(root)",
            },
          );
        })
        .catch(() => {});
    } else {
      /* browsers without View Transitions: a coloured circle grows over the page, the theme swaps underneath, then it fades */
      const ov = document.createElement("div");
      ov.style.cssText =
        "position:fixed;inset:0;z-index:300;pointer-events:none;background:" +
        BG[next];
      document.body.appendChild(ov);
      const a = ov.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${end}px at ${x}px ${y}px)`,
          ],
        },
        { duration: DUR * 0.75, easing: EASE, fill: "forwards" },
      );
      a.onfinish = () => {
        apply(next);
        ov.animate(
          { opacity: [1, 0] },
          { duration: 380, fill: "forwards" },
        ).onfinish = () => ov.remove();
      };
    }
  });
})();

// lightbox
const lb = $("#lb"),
  lbi = lb.querySelector("img");
document.addEventListener("click", (e) => {
  const f = e.target.closest(
    ".masonry figure,.single figure,.two figure,.logos figure",
  );
  if (f && f.querySelector("img")) {
    lbi.src = f.querySelector("img").src;
    lb.classList.add("on");
  }
});
lb.addEventListener("click", () => lb.classList.remove("on"));
addEventListener("keydown", (e) => {
  if (e.key === "Escape") lb.classList.remove("on");
});
