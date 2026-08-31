import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  ChevronRight,
  CircleDot,
  Code2,
  Cpu,
  ExternalLink,
  Github,
  GraduationCap,
  Image as ImageIcon,
  Mail,
  MapPin,
  Maximize2,
  Pause,
  Play,
  ScanLine,
  Sparkles,
  Target,
  X,
} from 'lucide-react'
import {
  capabilities,
  certificates,
  honors,
  patents,
  profile,
  profileStats,
  projects,
  socialLinks,
  timeline,
  toolchain,
  type Certificate,
  type Project,
  type ProjectMedia,
  type ProjectMediaImage,
} from './data/portfolio'

const navItems = [
  { label: '关于', href: '#about' },
  { label: '项目', href: '#projects' },
  { label: '能力', href: '#capabilities' },
  { label: '经历', href: '#journey' },
  { label: '成果', href: '#outcomes' },
]

const capabilityIcons = {
  scan: ScanLine,
  target: Target,
  cpu: Cpu,
  code: Code2,
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function GradientButton({
  href,
  label,
  secondary = false,
  icon,
}: {
  href: string
  label: string
  secondary?: boolean
  icon?: ReactNode
}) {
  return (
    <a className={`gradient-button ${secondary ? 'is-secondary' : ''}`} href={href}>
      <span className="gradient-button__inner">
        <span className="gradient-button__labels" aria-hidden="true">
          <span>{label}</span>
          <span>{label}</span>
        </span>
        <span className="sr-only">{label}</span>
        {icon}
      </span>
    </a>
  )
}

function EmailModal({
  email,
  onClose,
}: {
  email: string
  onClose: () => void
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div
      className="email-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-modal-title"
      onClick={onClose}
    >
      <div className="email-modal__card" onClick={(event) => event.stopPropagation()}>
        <button className="email-modal__close" type="button" onClick={onClose} aria-label="Close">
          <X aria-hidden="true" />
        </button>
        <Mail className="email-modal__icon" aria-hidden="true" />
        <h2 id="email-modal-title">Email Address</h2>
        <a className="email-modal__address" href={`mailto:${email}`}>
          {email}
        </a>
        <p>Click the address to send an email.</p>
      </div>
    </div>
  )
}

function Navbar({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}) {
  const firstMobileLink = useRef<HTMLAnchorElement>(null)
  const [activeNavHref, setActiveNavHref] = useState(navItems[0]?.href ?? '#about')
  const [showEmailModal, setShowEmailModal] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const timer = window.setTimeout(() => firstMobileLink.current?.focus(), 120)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen, setMenuOpen])

  useEffect(() => {
    const sections = navItems
      .map((item) => ({
        href: item.href,
        element: document.querySelector<HTMLElement>(item.href),
      }))
      .filter(
        (section): section is { href: string; element: HTMLElement } =>
          Boolean(section.element),
      )

    let animationFrame = 0

    const updateActiveSection = () => {
      animationFrame = 0
      const markerY = Math.min(window.innerHeight * 0.28, 220)
      let nextHref = sections[0]?.href

      for (const section of sections) {
        const bounds = section.element.getBoundingClientRect()

        if (bounds.top <= markerY) {
          nextHref = section.href
        }

        if (bounds.top <= markerY && bounds.bottom > markerY) {
          nextHref = section.href
          break
        }
      }

      if (nextHref) {
        setActiveNavHref((currentHref) =>
          currentHref === nextHref ? currentHref : nextHref,
        )
      }
    }

    const scheduleUpdate = () => {
      if (animationFrame) return
      animationFrame = window.requestAnimationFrame(updateActiveSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    window.addEventListener('hashchange', scheduleUpdate)

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      window.removeEventListener('hashchange', scheduleUpdate)
    }
  }, [])

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="曹义涛个人网站首页">
          <span className="brand__mark">CYT</span>
          <span className="brand__name">
            曹义涛
            <small>CAO YITAO</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="主导航">
          {navItems.map((item) => (
            <a
              key={item.href}
              className={activeNavHref === item.href ? 'is-active' : ''}
              href={item.href}
              aria-current={activeNavHref === item.href ? 'location' : undefined}
              onClick={() => setActiveNavHref(item.href)}
            >
              <span className="desktop-nav__orb" aria-hidden="true" />
              <span className="desktop-nav__labels">
                <span>{item.label}</span>
                <span aria-hidden="true">{item.label}</span>
              </span>
            </a>
          ))}
        </nav>

        <a className="header-contact" href="#contact">
          联系我 <ArrowUpRight aria-hidden="true" />
        </a>

        <button
          className={`menu-button ${menuOpen ? 'is-open' : ''}`}
          type="button"
          aria-label={menuOpen ? '关闭导航菜单' : '打开导航菜单'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
      </header>

      <aside
        id="mobile-navigation"
        className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <p>EXPLORE / 个人档案</p>
        <nav aria-label="移动端导航">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              ref={index === 0 ? firstMobileLink : undefined}
              href={item.href}
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => {
                setActiveNavHref(item.href)
                setMenuOpen(false)
              }}
            >
              <span>0{index + 1}</span>
              {item.label}
              <ChevronRight aria-hidden="true" />
            </a>
          ))}
        </nav>
        <a
          className="mobile-menu__contact"
          href={`mailto:${profile.email}`}
          tabIndex={menuOpen ? 0 : -1}
          onClick={(event) => {
            event.preventDefault()
            setMenuOpen(false)
            setShowEmailModal(true)
          }}
        >
          <Mail aria-hidden="true" /> 发送邮件
        </a>
      </aside>

      <button
        className={`menu-overlay ${menuOpen ? 'is-open' : ''}`}
        type="button"
        aria-label="关闭导航菜单"
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
      />

      {showEmailModal && <EmailModal email={profile.email} onClose={() => setShowEmailModal(false)} />}
    </>
  )
}

function Hero() {
  const reduceMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const avatarVideoRef = useRef<HTMLVideoElement>(null)
  const [avatarFailed, setAvatarFailed] = useState(false)

  useEffect(() => {
    const hero = heroRef.current
    const avatarVideo = avatarVideoRef.current
    if (!hero || !avatarVideo || avatarFailed) return

    let disposed = false
    let retryTimer = 0
    let scrollFrame = 0
    let retryCount = 0
    let isNearViewport = true

    const isHeroNearViewport = () => {
      const bounds = hero.getBoundingClientRect()
      return bounds.bottom > -160 && bounds.top < window.innerHeight + 160
    }

    const requestPlayback = (delay = 0) => {
      if (disposed || retryTimer || reduceMotion) return

      retryTimer = window.setTimeout(() => {
        retryTimer = 0
        if (disposed || document.hidden || !isNearViewport || !isHeroNearViewport()) return

        avatarVideo.muted = true
        avatarVideo.defaultMuted = true
        avatarVideo.playbackRate = 1

        if (!avatarVideo.paused && !avatarVideo.ended) {
          retryCount = 0
          return
        }

        if (avatarVideo.ended) {
          avatarVideo.currentTime = 0
        }

        void avatarVideo.play().then(
          () => {
            retryCount = 0
          },
          () => {
            retryCount += 1
            requestPlayback(Math.min(120 * 2 ** retryCount, 960))
          },
        )
      }, delay)
    }

    const handlePlaybackInterruption = () => {
      requestPlayback(80)
    }

    const handleVisibilityChange = () => {
      if (!document.hidden) requestPlayback(60)
    }

    const handleScroll = () => {
      if (scrollFrame) return
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0
        requestPlayback()
      })
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isNearViewport = entry.isIntersecting
        if (isNearViewport) requestPlayback()
      },
      { rootMargin: '160px 0px', threshold: 0 },
    )

    if (reduceMotion) {
      avatarVideo.pause()
      avatarVideo.currentTime = 0
    } else {
      observer.observe(hero)
      avatarVideo.addEventListener('canplay', handlePlaybackInterruption)
      avatarVideo.addEventListener('pause', handlePlaybackInterruption)
      avatarVideo.addEventListener('ended', handlePlaybackInterruption)
      avatarVideo.addEventListener('stalled', handlePlaybackInterruption)
      avatarVideo.addEventListener('waiting', handlePlaybackInterruption)
      document.addEventListener('visibilitychange', handleVisibilityChange)
      window.addEventListener('focus', handlePlaybackInterruption)
      window.addEventListener('pageshow', handlePlaybackInterruption)
      window.addEventListener('scroll', handleScroll, { passive: true })
      requestPlayback()
    }

    return () => {
      disposed = true
      observer.disconnect()
      if (retryTimer) window.clearTimeout(retryTimer)
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame)
      avatarVideo.removeEventListener('canplay', handlePlaybackInterruption)
      avatarVideo.removeEventListener('pause', handlePlaybackInterruption)
      avatarVideo.removeEventListener('ended', handlePlaybackInterruption)
      avatarVideo.removeEventListener('stalled', handlePlaybackInterruption)
      avatarVideo.removeEventListener('waiting', handlePlaybackInterruption)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handlePlaybackInterruption)
      window.removeEventListener('pageshow', handlePlaybackInterruption)
      window.removeEventListener('scroll', handleScroll)
      avatarVideo.pause()
    }
  }, [avatarFailed, reduceMotion])

  return (
    <section ref={heroRef} className="hero-section" id="top" aria-labelledby="hero-title">
      <div className="hero-frame">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orb hero-orb--violet" aria-hidden="true" />
        <div className="hero-orb hero-orb--coral" aria-hidden="true" />
        <div className="hero-scrim" aria-hidden="true" />

        <div className="hero-layout">
          <motion.div
            className="hero-copy"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="eyebrow">
              <span />
              {profile.eyebrow}
            </div>
            <p className="hero-name">{profile.name} / {profile.englishName}</p>
            <h1 id="hero-title">
              {profile.headline.split('\n').map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <p className="hero-introduction">{profile.introduction}</p>
            <div className="hero-actions">
              <GradientButton href="#projects" label="查看代表项目" icon={<ArrowDown />} />
              <GradientButton href="#about" label="认识我" secondary icon={<ArrowRight />} />
            </div>
          </motion.div>

          <motion.div
            className="avatar-stage"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            aria-label="卡通形象展示位"
          >
            <div className="avatar-stage__portrait">
              {!avatarFailed ? (
                <video
                  ref={avatarVideoRef}
                  className="avatar-stage__video"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  poster="./media/cartoon-avatar-poster.webp"
                  aria-label="曹义涛的卡通形象打招呼动画"
                  disablePictureInPicture
                  onError={() => setAvatarFailed(true)}
                >
                  <source src="./media/cartoon-avatar.mp4" type="video/mp4" />
                </video>
              ) : (
                <div className="avatar-placeholder" aria-label="卡通形象素材待补充">
                  <span>CY</span>
                  <small>PERSONAL AVATAR</small>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <div className="hero-footer">
          <span>SCROLL TO EXPLORE</span>
          <span className="hero-footer__line" />
          <span>FUZHOU · CHINA</span>
        </div>
      </div>
    </section>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow: string
  title: string
  description: string
  align?: 'left' | 'center'
}) {
  return (
    <div className={`section-heading is-${align}`}>
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      <span>{description}</span>
    </div>
  )
}

function About() {
  return (
    <section className="about-section section-shell" id="about">
      <div className="content-wrap about-layout">
        <Reveal className="about-portrait">
          <div className="about-portrait__frame">
            <img src="./profile.webp" alt="曹义涛个人照片" decoding="async" />
            <span>PORTRAIT / 2026</span>
          </div>
          <div className="about-portrait__index">01</div>
        </Reveal>

        <Reveal className="about-copy" delay={0.08}>
          <div className="eyebrow">
            <span />
            ABOUT / 关于我
          </div>
          <h2>从算法研究，走向真实系统。</h2>
          <blockquote>“{profile.philosophy}”</blockquote>
          <p>
            当前就读于福州大学机械工程专业，研究方向为智能光学图像处理。持续参与国防科研与校企合作项目，
            关注的不只是模型指标，也包括推理效率、软件实现、设备通信和现场稳定运行。
          </p>
          <div className="about-location">
            <MapPin aria-hidden="true" />
            {profile.location}
          </div>
          <div className="about-stats">
            {profileStats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function MediaPlaceholder({ media }: { media: ProjectMedia }) {
  return (
    <div className="media-placeholder">
      <div className="media-placeholder__rings" aria-hidden="true">
        <i />
        <i />
      </div>
      <div className="media-placeholder__icon">
        {media.type === 'video' ? <Play aria-hidden="true" /> : <ImageIcon aria-hidden="true" />}
      </div>
      <span>{media.type === 'video' ? 'VIDEO SLOT' : 'IMAGE SLOT'}</span>
      <strong>{media.title}</strong>
      <p>{media.caption}</p>
    </div>
  )
}

function ProjectImageGallery({ media }: { media: ProjectMedia }) {
  const images = useMemo<ProjectMediaImage[]>(
    () =>
      media.images?.length
        ? media.images
        : [{ src: media.src, alt: media.alt, surface: 'theme' }],
    [media],
  )
  const [imageIndex, setImageIndex] = useState(0)
  const [failedSources, setFailedSources] = useState<string[]>([])
  const galleryRef = useRef<HTMLDivElement>(null)
  const dragStartRef = useRef<{ x: number; y: number } | null>(null)
  const wheelLockedUntilRef = useRef(0)
  const activeImage = images[imageIndex]
  const hasMultipleImages = images.length > 1

  const moveGallery = useCallback(
    (direction: -1 | 1) => {
      setImageIndex((current) =>
        (current + direction + images.length) % images.length,
      )
    },
    [images.length],
  )

  useEffect(() => {
    const gallery = galleryRef.current
    if (!gallery || !hasMultipleImages) return

    const handleWheel = (event: WheelEvent) => {
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

      event.preventDefault()
      event.stopPropagation()

      const delta =
        Math.abs(event.deltaY) >= Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX
      if (Math.abs(delta) < 4) return

      const now = Date.now()
      if (now < wheelLockedUntilRef.current) return
      wheelLockedUntilRef.current = now + 360
      moveGallery(delta > 0 ? 1 : -1)
    }

    gallery.addEventListener('wheel', handleWheel, { passive: false })
    return () => gallery.removeEventListener('wheel', handleWheel)
  }, [hasMultipleImages, moveGallery])

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!hasMultipleImages) return
    dragStartRef.current = { x: event.clientX, y: event.clientY }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = dragStartRef.current
    dragStartRef.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    if (!start) return

    const deltaX = event.clientX - start.x
    const deltaY = event.clientY - start.y
    if (Math.abs(deltaX) < 44 || Math.abs(deltaX) <= Math.abs(deltaY)) return
    moveGallery(deltaX < 0 ? 1 : -1)
  }

  const handleGalleryKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      moveGallery(-1)
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      moveGallery(1)
    }
  }

  const activeImageFailed = failedSources.includes(activeImage.src)

  return (
    <div
      ref={galleryRef}
      className="project-image-gallery"
      role="region"
      aria-roledescription="图片轮播"
      aria-label={`${media.title}，共 ${images.length} 张图片`}
      tabIndex={hasMultipleImages ? 0 : -1}
      onKeyDown={handleGalleryKeyDown}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        dragStartRef.current = null
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.figure
          className={`project-image-gallery__slide is-${activeImage.surface}`}
          key={activeImage.src}
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          {activeImageFailed ? (
            <MediaPlaceholder media={media} />
          ) : (
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              loading="lazy"
              decoding="async"
              draggable={false}
              onError={() =>
                setFailedSources((current) =>
                  current.includes(activeImage.src)
                    ? current
                    : [...current, activeImage.src],
                )
              }
            />
          )}
        </motion.figure>
      </AnimatePresence>

      {hasMultipleImages && (
        <>
          <button
            className="project-image-gallery__arrow is-previous"
            type="button"
            aria-label={`查看${media.title}上一张图片`}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => moveGallery(-1)}
          >
            <ArrowLeft aria-hidden="true" />
          </button>
          <button
            className="project-image-gallery__arrow is-next"
            type="button"
            aria-label={`查看${media.title}下一张图片`}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => moveGallery(1)}
          >
            <ArrowRight aria-hidden="true" />
          </button>
          <div className="project-image-gallery__status" aria-live="polite">
            <span>{String(imageIndex + 1).padStart(2, '0')}</span>
            <i />
            <span>{String(images.length).padStart(2, '0')}</span>
          </div>
          <span className="project-image-gallery__hint">滚轮 / 拖拽</span>
        </>
      )}
    </div>
  )
}

function ProjectMediaViewer({ project }: { project: Project }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [mediaFailed, setMediaFailed] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const viewerRef = useRef<HTMLDivElement>(null)
  const activeMedia = project.media[activeIndex]

  const pauseVideo = useCallback((reset = false) => {
    if (!videoRef.current) return
    videoRef.current.pause()
    if (reset) videoRef.current.currentTime = 0
    setIsPlaying(false)
  }, [])

  useEffect(() => {
    const viewer = viewerRef.current
    if (!viewer) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          pauseVideo()
          return
        }

      },
      { threshold: 0.22 },
    )
    observer.observe(viewer)
    return () => observer.disconnect()
  }, [activeMedia.id, pauseVideo])

  const changeMedia = (index: number) => {
    if (index === activeIndex) return
    pauseVideo(true)
    setMediaFailed(false)
    setCurrentTime(0)
    setDuration(0)
    setActiveIndex(index)
  }

  const togglePlayback = async () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      try {
        await video.play()
        setIsPlaying(true)
      } catch {
        setIsPlaying(false)
      }
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const setProgress = (value: number) => {
    if (!videoRef.current) return
    videoRef.current.currentTime = value
    setCurrentTime(value)
  }

  const hasSource =
    (activeMedia.type === 'image'
      ? Boolean(activeMedia.images?.some((image) => image.src) || activeMedia.src)
      : Boolean(activeMedia.src)) && !mediaFailed

  return (
    <div className="project-media" ref={viewerRef}>
      <div className="project-media__topbar">
        <div>
          <span className="live-dot" />
          MEDIA ARCHIVE / {project.index}
        </div>
        <span>{String(activeIndex + 1).padStart(2, '0')} / {String(project.media.length).padStart(2, '0')}</span>
      </div>

      <div className="project-media__stage">
        <AnimatePresence mode="wait">
          <motion.div
            className="project-media__content"
            key={activeMedia.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {!hasSource ? (
              <MediaPlaceholder media={activeMedia} />
            ) : activeMedia.type === 'image' ? (
              <ProjectImageGallery media={activeMedia} />
            ) : (
              <video
                ref={videoRef}
                src={activeMedia.src}
                poster={activeMedia.poster}
                loop={activeMedia.loop}
                muted
                playsInline
                preload="none"
                aria-label={activeMedia.alt}
                onLoadedMetadata={(event) => {
                  const playbackRate = activeMedia.playbackRate ?? 1
                  event.currentTarget.defaultPlaybackRate = playbackRate
                  event.currentTarget.playbackRate = playbackRate
                  setDuration(event.currentTarget.duration)
                }}
                onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onError={() => setMediaFailed(true)}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {hasSource && activeMedia.type === 'video' && (
          <div className="video-controls">
            <button type="button" onClick={togglePlayback} aria-label={isPlaying ? '暂停视频' : '播放视频'}>
              {isPlaying ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
            </button>
            <input
              type="range"
              min="0"
              max={duration || 1}
              step="0.05"
              value={currentTime}
              aria-label="视频播放进度"
              onChange={(event) => setProgress(Number(event.target.value))}
            />
            <span>{Math.round(currentTime)}s</span>
          </div>
        )}
      </div>

      <div className="project-media__caption">
        <div>
          <span>{activeMedia.type.toUpperCase()}</span>
          <strong>{activeMedia.title}</strong>
        </div>
        <p>{activeMedia.caption}</p>
      </div>

      <div
        className={`media-thumbnails ${
          project.media.length === 2
            ? 'is-two'
            : project.media.length === 3
              ? 'is-three'
              : ''
        }`}
        role="tablist"
        aria-label={`${project.title}媒体列表`}
      >
        {project.media.map((media, index) => (
          <button
            key={media.id}
            className={index === activeIndex ? 'is-active' : ''}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`查看${media.title}`}
            onClick={() => changeMedia(index)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {media.type === 'video' ? <Play aria-hidden="true" /> : <ImageIcon aria-hidden="true" />}
            <strong>{media.title}</strong>
          </button>
        ))}
      </div>
    </div>
  )
}

function ProjectChapter({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      className={`project-chapter accent-${project.accent}`}
      initial={reduceMotion ? false : { opacity: 0, y: 56, scale: 0.975 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.14 }}
      transition={
        reduceMotion
          ? undefined
          : { duration: 0.62, ease: [0.22, 1, 0.36, 1] }
      }
    >
      <div className="project-chapter__glow" aria-hidden="true" />
      <div className="project-chapter__layout">
        <Reveal className="project-details">
          <div className="project-index">
            <span>PROJECT</span>
            <strong>{project.index}</strong>
          </div>
          <p className="project-category">{project.category}</p>
          <h3>{project.title}</h3>
          <p className="project-summary">{project.summary}</p>

          {project.metrics.length > 0 && (
            <div className="project-metrics">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          )}

          <div className="project-role">
            <span>MY ROLE</span>
            <strong>{project.role}</strong>
          </div>

          <div className="project-facts">
            <details open>
              <summary>项目背景</summary>
              <p>{project.background}</p>
            </details>
            <details>
              <summary>我的工作</summary>
              <ul>{project.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
            </details>
            <details>
              <summary>技术方案</summary>
              <ul>{project.approach.map((item) => <li key={item}>{item}</li>)}</ul>
            </details>
            <details>
              <summary>阶段结果</summary>
              <ul>{project.results.map((item) => <li key={item}>{item}</li>)}</ul>
            </details>
          </div>

          <div className="project-stack">
            {project.stack.map((item) => <span key={item}>{item}</span>)}
          </div>
        </Reveal>

        <Reveal className="project-viewer-wrap" delay={0.08}>
          <ProjectMediaViewer project={project} />
        </Reveal>
      </div>
    </motion.article>
  )
}

function Projects() {
  return (
    <section className="projects-section section-shell" id="projects">
      <div className="content-wrap">
        <Reveal>
          <SectionHeading
            eyebrow="SELECTED WORK / 代表项目"
            title="每一项研究，都走向真实场景。"
            description="从图像融合到目标跟踪，从模型部署到工业设备，把技术路径、工程过程和阶段成果放在同一条叙事线上。"
          />
        </Reveal>
        <div className="projects-list">
          {projects.map((project) => <ProjectChapter key={project.id} project={project} />)}
        </div>
      </div>
    </section>
  )
}

function Capabilities() {
  return (
    <section className="capabilities-section section-shell" id="capabilities">
      <div className="technical-grid" aria-hidden="true" />
      <div className="content-wrap">
        <Reveal>
          <SectionHeading
            eyebrow="CAPABILITY MATRIX / 能力体系"
            title="贯穿视觉系统的完整技术链路。"
            description="不止训练模型，也关注数据、推理、桌面软件、设备通信与现场调试之间的协同。"
          />
        </Reveal>

        <div className="capability-grid">
          {capabilities.map((item, index) => {
            const Icon = capabilityIcons[item.icon as keyof typeof capabilityIcons]
            return (
              <Reveal className="capability-card glass-panel" delay={index * 0.06} key={item.id}>
                <div className="capability-card__top">
                  <span>{item.number}</span>
                  <Icon aria-hidden="true" />
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="toolchain-panel glass-panel" delay={0.12}>
          <div>
            <span>TOOLCHAIN</span>
            <strong>研究与工程工具栈</strong>
          </div>
          <div className="toolchain-list">
            {toolchain.map((item) => <span key={item}>{item}</span>)}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Journey() {
  return (
    <section className="journey-section section-shell" id="journey">
      <div className="content-wrap journey-layout">
        <Reveal className="journey-intro">
          <SectionHeading
            eyebrow="JOURNEY / 教育与实践"
            title="在研究与工程之间持续生长。"
            description="由智能制造进入机械工程与智能视觉，在每一次项目实践中补全从理论到系统的能力。"
          />
          <p>LEARNING · BUILDING · REFINING</p>
        </Reveal>

        <div className="timeline">
          <div className="timeline__line" aria-hidden="true" />
          {timeline.map((item, index) => (
            <Reveal className="timeline-item" delay={index * 0.07} key={`${item.period}-${item.title}`}>
              <div className="timeline-item__node" aria-hidden="true" />
              <div className="timeline-item__meta">
                <span>{item.period}</span>
                <span className="timeline-item__badge">
                  <CircleDot aria-hidden="true" />
                  {item.badge}
                </span>
              </div>
              <div className="timeline-item__title">
                {item.type === 'work' ? <Cpu aria-hidden="true" /> : <GraduationCap aria-hidden="true" />}
                <div>
                  <h3>{item.title}</h3>
                  <h4>{item.place}</h4>
                </div>
              </div>
              <p>{item.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CertificateVisual({ certificate, large = false }: { certificate: Certificate; large?: boolean }) {
  const [failed, setFailed] = useState(false)
  const hasImage = Boolean(certificate.src) && !failed

  if (hasImage) {
    return (
      <img
        src={certificate.src}
        alt={certificate.alt}
        loading={large ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <div className={`certificate-placeholder ${large ? 'is-large' : ''}`}>
      <div className="certificate-placeholder__seal">
        <Award aria-hidden="true" />
      </div>
      <span>{certificate.category}</span>
      <strong>{certificate.title}</strong>
      <i />
      <small>IMAGE TO BE ADDED</small>
    </div>
  )
}

function CertificateModal({
  certificate,
  onClose,
}: {
  certificate: Certificate
  onClose: () => void
}) {
  const closeButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab') {
        event.preventDefault()
        closeButton.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  return (
    <motion.div
      className="certificate-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-modal-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <motion.div
        className="certificate-modal__panel"
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: 0.25 }}
      >
        <div className="certificate-modal__header">
          <div>
            <span>{certificate.category} · {certificate.year}</span>
            <h3 id="certificate-modal-title">{certificate.title}</h3>
          </div>
          <button ref={closeButton} type="button" onClick={onClose} aria-label="关闭证书大图">
            <X aria-hidden="true" />
          </button>
        </div>
        <div className="certificate-modal__image">
          <CertificateVisual certificate={certificate} large />
        </div>
      </motion.div>
    </motion.div>
  )
}

function CertificateCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
  })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const lastTrigger = useRef<HTMLButtonElement | null>(null)
  const lastWheelAt = useRef(Number.NEGATIVE_INFINITY)

  useEffect(() => {
    if (!emblaApi) return
    const syncCarousel = () => {
      setScrollSnaps(emblaApi.scrollSnapList())
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }
    window.queueMicrotask(syncCarousel)
    emblaApi.on('select', syncCarousel)
    emblaApi.on('reInit', syncCarousel)
    return () => {
      emblaApi.off('select', syncCarousel)
      emblaApi.off('reInit', syncCarousel)
    }
  }, [emblaApi])

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel || !emblaApi) return

    const onWheel = (event: WheelEvent) => {
      const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX
      if (Math.abs(delta) < 4) return

      event.preventDefault()

      const currentIndex = emblaApi.selectedScrollSnap()
      const lastIndex = emblaApi.scrollSnapList().length - 1
      const canMove = delta > 0 ? currentIndex < lastIndex : currentIndex > 0

      if (!canMove) return

      const now = window.performance.now()
      if (now - lastWheelAt.current < 320) return
      lastWheelAt.current = now

      if (delta > 0) emblaApi.scrollNext()
      else emblaApi.scrollPrev()
    }

    carousel.addEventListener('wheel', onWheel, { passive: false })
    return () => carousel.removeEventListener('wheel', onWheel)
  }, [emblaApi])

  const openCertificate = (certificate: Certificate, trigger: HTMLButtonElement) => {
    lastTrigger.current = trigger
    setSelectedCertificate(certificate)
  }

  const closeCertificate = () => {
    setSelectedCertificate(null)
    window.requestAnimationFrame(() => lastTrigger.current?.focus())
  }

  return (
    <>
      <div className="certificate-carousel" ref={carouselRef}>
        <div className="certificate-carousel__controls">
          <div>
            <span>SELECTED CERTIFICATES</span>
            <strong>证书与荣誉存档</strong>
          </div>
          <div>
            <button
              type="button"
              aria-label="查看上一张证书"
              disabled={selectedIndex === 0}
              onClick={() => emblaApi?.scrollPrev()}
            >
              <ArrowLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="查看下一张证书"
              disabled={selectedIndex === scrollSnaps.length - 1}
              onClick={() => emblaApi?.scrollNext()}
            >
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="certificate-carousel__viewport" ref={emblaRef}>
          <div className="certificate-carousel__container">
            {certificates.map((certificate, index) => (
              <div className="certificate-slide" key={certificate.id}>
                <button
                  type="button"
                  onClick={(event) => openCertificate(certificate, event.currentTarget)}
                  aria-label={`放大查看${certificate.title}`}
                >
                  <div className="certificate-slide__image">
                    <CertificateVisual certificate={certificate} />
                    <span className="certificate-slide__zoom">
                      <Maximize2 aria-hidden="true" />
                    </span>
                  </div>
                  <div className="certificate-slide__meta">
                    <span>{String(index + 1).padStart(2, '0')} / {certificate.category}</span>
                    <strong>{certificate.title}</strong>
                    <small>{certificate.year}</small>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="certificate-carousel__dots" aria-label="证书滑轨位置">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              className={index === selectedIndex ? 'is-active' : ''}
              aria-label={`转到第 ${index + 1} 组证书`}
              aria-current={index === selectedIndex}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCertificate && (
          <CertificateModal certificate={selectedCertificate} onClose={closeCertificate} />
        )}
      </AnimatePresence>
    </>
  )
}

function Outcomes() {
  return (
    <section className="outcomes-section section-shell" id="outcomes">
      <div className="content-wrap">
        <Reveal>
          <SectionHeading
            eyebrow="OUTCOMES / 专利与荣誉"
            title="让积累留下可验证的坐标。"
            description="围绕光学测量、缺陷检测与双光谱应用形成阶段成果，也记录研究和实践过程中的持续投入。"
          />
        </Reveal>

        <div className="outcomes-layout">
          <div className="patent-list">
            {patents.map((patent, index) => (
              <Reveal className="patent-card glass-panel" delay={index * 0.05} key={patent.code}>
                <span>0{index + 1}</span>
                <div>
                  <p>{patent.status} · {patent.code}</p>
                  <h3>{patent.title}</h3>
                </div>
                <Award aria-hidden="true" />
              </Reveal>
            ))}
          </div>

          <Reveal className="honors-panel glass-panel" delay={0.12}>
            <div className="honors-panel__title">
              <Sparkles aria-hidden="true" />
              <div>
                <span>HONORS</span>
                <strong>奖学金与荣誉</strong>
              </div>
            </div>
            <div className="honors-grid">
              {honors.map((honor) => (
                <div key={honor.label}>
                  <strong>{honor.value}</strong>
                  <span>{honor.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className="certificate-wrap" delay={0.14}>
          <CertificateCarousel />
        </Reveal>
      </div>
    </section>
  )
}

function Contact() {
  const visibleLinks = useMemo(() => socialLinks.filter((link) => Boolean(link.href)), [])
  const [showEmailModal, setShowEmailModal] = useState(false)

  return (
    <section className="contact-section section-shell" id="contact">
      <div className="contact-grid" aria-hidden="true" />
      <div className="contact-glow contact-glow--left" aria-hidden="true" />
      <div className="contact-glow contact-glow--right" aria-hidden="true" />
      <Reveal className="contact-content">
        <div className="eyebrow">
          <span />
          LET&apos;S CONNECT
        </div>
        <h2>让看见，成为行动的开始。</h2>
        <p>如果你对我的研究、项目或视觉算法工程经验感兴趣，欢迎通过邮件或专业平台继续交流。</p>
        <div className="contact-actions">
          {visibleLinks.map((link, index) => {
            const className = index === 0 ? 'contact-primary' : 'contact-secondary'
            const content = (
              <>
                {link.kind === 'email' ? <Mail aria-hidden="true" /> : <Github aria-hidden="true" />}
                {link.label}
                {index > 0 && <ExternalLink aria-hidden="true" />}
              </>
            )

            if (link.kind === 'email') {
              return (
                <button
                  className={className}
                  type="button"
                  key={link.kind}
                  onClick={() => setShowEmailModal(true)}
                >
                  {content}
                </button>
              )
            }

            return (
              <a
                className={className}
                href={link.href}
                key={link.kind}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              >
                {content}
              </a>
            )
          })}
        </div>
      </Reveal>
      {showEmailModal && <EmailModal email={profile.email} onClose={() => setShowEmailModal(false)} />}
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="content-wrap footer-layout">
        <a className="brand" href="#top" aria-label="返回网站顶部">
          <span className="brand__mark">CY</span>
          <span className="brand__name">
            曹义涛
            <small>CAO YITAO</small>
          </span>
        </a>
        <p>视觉算法 · 智能光学图像处理 · 高性能部署</p>
        <nav aria-label="页脚导航">
          {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <span>© 2026 曹义涛. All rights reserved.</span>
      </div>
    </footer>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = menuOpen ? 'hidden' : previousOverflow
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  return (
    <div className="site-shell">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Capabilities />
        <Journey />
        <Outcomes />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
