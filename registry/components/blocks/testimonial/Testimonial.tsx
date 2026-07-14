import type { CSSProperties } from "react";
import Image from "next/image";

type CardProps = {
  name: string;
  role: string;
  quote: string;
  image: string;
};

const testimonialVars = {
  "--testimonial-ink": "#121416",
  "--testimonial-muted": "#6f7778",
  "--testimonial-page": "#f7fafa",
  "--testimonial-panel": "#eef5f5",
  "--testimonial-card": "rgba(246, 251, 251, 0.82)",
  "--testimonial-line": "rgba(111, 119, 120, 0.16)",
} as CSSProperties;

const authorRow = "flex items-center gap-[14px]";
const avatar =
  "h-[46px] w-[46px] min-h-[46px] min-w-[46px] rounded-full object-cover overflow-hidden";
const authorName =
  "m-0 text-[0.92rem] font-bold leading-[1.25] text-[var(--testimonial-ink)]";
const authorRole =
  "mt-[3px] mb-0 text-[0.78rem] leading-[1.2] text-[var(--testimonial-muted)]";

function TestimonialCard({ name, role, quote, image }: CardProps) {
  return (
    <article className="border-t border-(--testimonial-line) pt-5 first:border-t-0 first:pt-0 pb-5">
      <p className="m-0 mb-4 max-w-82.5 text-[0.95rem] font-semibold leading-normal max-sm:max-w-none">
        “{quote}”
      </p>
      <div className={authorRow}>
        <Image
          src={image}
          alt={name}
          width={46}
          height={46}
          className={avatar}
          style={{ borderRadius: "9999px" }}
        />
        <div>
          <h3 className={authorName}>{name}</h3>
          <p className={authorRole}>{role}</p>
        </div>
      </div>
    </article>
  );
}

const testimonials: CardProps[] = [
  {
    name: "Karen Smith",
    role: "Entrepreneur",
    quote:
      "This website is amazing that it tracked my daily routine using an AI algorithm and provided the information that i needed to improve also it suggested the health products in the website itself",
    image: "/testimonial-images/download.jpeg",
  },
  {
    name: "Jessica Wise",
    role: "Book Writer",
    quote:
      "I have been using the products from this website for a while now and I am really impressed with the quality and effectiveness of the products. I highly recommend it to anyone looking for health and wellness products.",
    image: "/testimonial-images/Woman3.jpeg",
  },
  
];

export default function Testimonial() {
  return (
    <section
      style={testimonialVars}
      className="grid min-h-screen place-items-center bg-(--testimonial-page) px-7 py-10.5 text-(--testimonial-ink) max-sm:p-4.5"
    >
      <div className="grid min-h-160 w-[min(100%,1280px)] grid-cols-[minmax(0,0.95fr)_minmax(0,1.45fr)] items-center overflow-hidden bg-(--testimonial-panel) px-11.5 py-14.5 max-[1180px]:grid-cols-1 max-[1180px]:gap-8.5 max-[1180px]:px-7 max-[1180px]:py-10.5  max-[1180px]:min-h-auto max-sm:min-h-auto max-sm:px-5 max-sm:py-8.5">
        <div className="relative z-10 max-w-155 max-[1180px]:max-w-160">
          <svg
            className="block w-14.5 fill-(--testimonial-ink) max-sm:w-11.5"
            viewBox="0 0 74 54"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M0 54V32.5C0 13.5 10.5 3.4 28.8 0L33 13.2C22 16.5 16.8 22.4 16.8 31.3H31V54H0Z" />
            <path d="M41 54V32.5C41 13.5 51.5 3.4 69.8 0L74 13.2C63 16.5 57.8 22.4 57.8 31.3H72V54H41Z" />
          </svg>

          <p className="my-5 mb-6.5 max-w-155 text-[clamp(1.25rem,2vw,2rem)] font-bold leading-[1.12] tracking-normal max-sm:max-w-none max-sm:text-[1.1rem]">
            I never realized how weak i am but using the ZenVitals company products has really helped my daily life and i am so grateful for the amazing products that they have to offer.
          </p>

          <div className={authorRow}>
            <Image
              src="/testimonial-images/Woman1.jpg"
              alt="Angela Summer"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <h2 className={authorName}>Angela Summer</h2>
              <p className={authorRole}>Book Writer</p>
            </div>
          </div>
        </div>

        <div className="relative z-1 grid min-h-127.5 grid-cols-[minmax(260px,360px)_minmax(230px,1fr)] items-stretch gap-8.5 rounded-[18px] border border-white/80 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.9),transparent_38%),linear-gradient(135deg,var(--testimonial-card)_0%,rgba(231,242,243,0.86)_100%)] py-10.5 pr-12 pl-10.5 shadow-[0_28px_58px_rgba(47,64,70,0.15),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-sm -ml-50 max-[1180px]:ml-0 max-[1180px]:grid-cols-1 max-sm:min-h-auto max-sm:gap-7 max-sm:p-4.5">
          <div className="relative min-h-106.5 overflow-hidden rounded-2xl shadow-[0_24px_42px_rgba(69,86,91,0.12)] max-[1180px]:h-full max-sm:min-h-60">
            <Image
              src="/testimonial-images/Women2.jpg"
              alt="Woman drinking tea in the morning"
              fill
              sizes="(max-width: 768px) 100vw, 360px"
              className="object-cover object-[68%_center]"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 h-[38%] bg-[linear-gradient(180deg,transparent,rgba(238,245,245,0.82))]" />
            <button className="absolute bottom-7 left-1/2 z-1 min-w-56 -translate-x-1/2 cursor-pointer rounded-full border-0 bg-[rgba(238,242,242,0.92)] px-6 py-3.25 text-[0.8rem] leading-none font-bold text-[#151718] shadow-[0_14px_26px_rgba(83,98,102,0.12)] max-sm:w-[calc(100%-36px)] max-sm:min-w-0">
              See More Stories About Us
            </button>
          </div>

          <div className="testimonial-scroll flex flex-col overflow-y-auto pr-2 h-105 max-sm:h-60">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.name}-${index}`}
                {...testimonial}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
