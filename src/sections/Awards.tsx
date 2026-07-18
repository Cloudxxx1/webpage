import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BadgeCheck, Medal, Award, Star, HeartHandshake, Lightbulb } from 'lucide-react';
import ScrollGallery from "./ScrollGallery";
import "./ScrollGallery.css";
import { withBase } from "@/utils/asset";
import type { Language } from '@/types/language';

gsap.registerPlugin(ScrollTrigger);

const awards: Record<
  Language,
  Array<{ title: string; level: string; period: string; description: string; icon: typeof Medal; color: string }>
> = {
  zh: [
  // {
  //   title: '国家奖学金',
  //   level: '国家级',
  //   period: '硕士期间',
  //   description: '研究生国家奖学金，表彰优秀学术表现',
  //   icon: Trophy,
  //   color: 'from-yellow-400 to-orange-500',
  // },
  {
    title: '福州大学研究生中期奖学金一等奖',
    level: '校级',
    period: '2026年',
    description: '研究生中期考核优秀，获得一等奖学金',
    icon: Medal,
    color: 'from-neon-green to-emerald-500',
  },
  {
    title: '福州大学2024届本科毕业生升学先进个人',
    level: '校级',
    period: '2024年6月',
    description: '获评福州大学2024届本科毕业生升学先进个人称号',
    icon: BadgeCheck,
    color: 'from-red-400 via-rose-500 to-pink-600',
  },
  {
    title: '福州大学本科生校级综合奖学金三等奖',
    level: '校级',
    period: '2023',
    description: '本科阶段综合表现优秀',
    icon: Star,
    color: 'from-neon-purple to-violet-500',
  },
  {
    title: '福建省机械设计创新大赛二等奖',
    level: '省级',
    period: '2022',
    description: '机械设计创新大赛省级二等奖',
    icon: Award,
    color: 'from-neon-cyan to-blue-500',
  },
  {
    title: '全国大学生机械创新设计大赛福州大学校赛',
    level: '校级',
    period: '2021',
    description: '机械创新设计大赛校赛二等奖',
    icon: Lightbulb,
    color: 'from-teal-400 via-emerald-500 to-cyan-600',
  },
  {
    title: '福州大学20-21学年精神文明建设单项奖学金',
    level: '院级',
    period: '2020-2021学年',
    description: '表彰精神文明建设与志愿服务等综合表现',
    icon: HeartHandshake,
    color: 'from-rose-400 via-pink-500 to-fuchsia-600',
  },
  ],
  en: [
    {
      title: 'First-Class Mid-Term Graduate Scholarship, Fuzhou University',
      level: 'University',
      period: '2026',
      description: 'Awarded for outstanding performance in the graduate mid-term evaluation.',
      icon: Medal,
      color: 'from-neon-green to-emerald-500',
    },
    {
      title: 'Outstanding Graduate Advancement Award (Class of 2024), Fuzhou University',
      level: 'University',
      period: 'Jun 2024',
      description: 'Recognized as an advanced individual for undergraduate progression to graduate studies.',
      icon: BadgeCheck,
      color: 'from-red-400 via-rose-500 to-pink-600',
    },
    {
      title: 'Third Prize, Comprehensive Undergraduate Scholarship, Fuzhou University',
      level: 'University',
      period: '2023',
      description: 'Granted for excellent comprehensive performance during undergraduate study.',
      icon: Star,
      color: 'from-neon-purple to-violet-500',
    },
    {
      title: 'Second Prize, Fujian Provincial Mechanical Design Innovation Competition',
      level: 'Provincial',
      period: '2022',
      description: 'Won second prize in the provincial mechanical design innovation competition.',
      icon: Award,
      color: 'from-neon-cyan to-blue-500',
    },
    {
      title: 'Campus Award, National Mechanical Innovation Design Competition (Fuzhou University)',
      level: 'University',
      period: '2021',
      description: 'Won second prize in the university-level round of the national mechanical innovation design competition.',
      icon: Lightbulb,
      color: 'from-teal-400 via-emerald-500 to-cyan-600',
    },
    {
      title: 'Special Scholarship for Spiritual Civilization Development, Fuzhou University (2020-2021)',
      level: 'School',
      period: '2020-2021',
      description: 'Recognized for strong performance in civic engagement and volunteer service.',
      icon: HeartHandshake,
      color: 'from-rose-400 via-pink-500 to-fuchsia-600',
    },
  ],
};

const galleryItems = [
  { src: withBase("/images/cert-4.png"), label: "" },
  { src: withBase("/images/cert-3.png"), label: "" },
  { src: withBase("/images/cert-2.png"), label: "" },
  { src: withBase("/images/cert-1.png"), label: "" },
];

interface AwardsProps {
  language: Language;
}

export default function Awards({ language }: AwardsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isEnglish = language === 'en';
  const awardItems = awards[language];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.awards-title',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        '.award-card',
        { y: 60, opacity: 0, rotateY: -15 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="awards"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-x-clip"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-dark-bg" />

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-neon-green/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-neon-purple/5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="awards-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {isEnglish ? (
              <>
                Award <span className="text-gradient">Highlights</span>
              </>
            ) : (
              <>
                获奖<span className="text-gradient">情况</span>
              </>
            )}
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            {isEnglish
              ? 'Honors and recognitions received during undergraduate and graduate studies'
              : '本科与硕士期间获得的荣誉与认可'}
          </p>
        </div>

        {/* Awards Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 gap-6 perspective-1000"
        >
          {awardItems.map((award, index) => (
            <div
              key={index}
              className="award-card group relative glass rounded-2xl p-6 hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Spotlight effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent" />
              </div>

              {/* Glow border */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${award.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}
              />

              <div className="relative flex items-start gap-5">
                {/* Icon */}
                <div
                  className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${award.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <award.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-gradient transition-colors">
                      {award.title}
                    </h3>
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded-full bg-gradient-to-r ${award.color} text-white`}
                    >
                      {award.level}
                    </span>
                  </div>
                  <p className="text-neon-green text-sm font-medium mb-2">
                    {award.period}
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {award.description}
                  </p>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                <div
                  className={`w-full h-full bg-gradient-to-bl ${award.color}`}
                  style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '5+', label: isEnglish ? 'Total Awards' : '获奖总数' },
            { value: '1', label: isEnglish ? 'National' : '国家级' },
            { value: '1', label: isEnglish ? 'Provincial' : '省级' },
            { value: '2', label: isEnglish ? 'University' : '校级' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center glass rounded-xl p-4 hover:border-neon-green/30 transition-colors"
            >
              <p className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                {stat.value}
              </p>
              <p className="text-white/50 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
        {/* Certificates Gallery */}
        <div className="mt-8">
          <ScrollGallery items={galleryItems} language={language} />
        </div>
        
      </div>
    </section>
  );
}
