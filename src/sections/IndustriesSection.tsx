import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ShoppingBag,
  Building2,
  Hospital,
  GraduationCap,
  University,
  HardHat,
  Tractor,
  Landmark,
  Trophy,
  Briefcase,
  Plane,
  Factory
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const industries = [
  { name: 'Shopping Malls', icon: ShoppingBag },
  { name: 'Shopping Centers', icon: Building2 },
  { name: 'Hospitals', icon: Hospital },
  { name: 'Schools', icon: GraduationCap },
  { name: 'Universities', icon: University },
  { name: 'Construction Sites', icon: HardHat },
  { name: 'Farms', icon: Tractor },
  { name: 'Government Complexes', icon: Landmark },
  { name: 'Sports Complexes', icon: Trophy },
  { name: 'Business Complexes', icon: Briefcase },
  { name: 'Airports & Transit', icon: Plane },
  { name: 'Industrial Parks', icon: Factory },
];

export default function IndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards staggered animation
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: i * 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-brand-dark py-16 lg:py-24 px-4 sm:px-6 lg:px-[7vw]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F4F6FA' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      {/* Header */}
      <div ref={headerRef} className="mb-10 lg:mb-14">
        <h2 className="font-display headline-2 text-brand-light mb-4">
          Built for the places people go.
        </h2>
        <p className="body-text text-brand-text-secondary max-w-full lg:max-w-[46vw]">
          From public complexes to private campuses, we align signage with environment, traffic, and brand.
        </p>
      </div>

      {/* Industries Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {industries.map((industry, i) => {
          const Icon = industry.icon;
          return (
            <div
              key={industry.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="industry-card group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center transition-colors group-hover:bg-brand-accent/20">
                  <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-brand-accent" />
                </div>
                <span className="font-medium text-brand-light text-sm lg:text-base">{industry.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
