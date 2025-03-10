'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Swiper from 'swiper'
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

gsap.registerPlugin(ScrollTrigger)

export function HomeAnimations() {
  useEffect(() => {
    // Initialize Hero Animations
    gsap.from('.hero-content h1', {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: 'power4.out',
      delay: 0.5
    })

    gsap.from('.hero-content .hero-subtitle', {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power4.out',
      delay: 1
    })

    gsap.from('.hero-cta > *', {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
      ease: 'power4.out',
      delay: 1.2
    })

    // Stats Counter Animation
    const stats = document.querySelectorAll('.stat-value')
    stats.forEach(stat => {
      const value = parseInt((stat as HTMLElement).dataset.value || '0')
      gsap.to(stat, {
        innerHTML: value,
        duration: 2,
        snap: { innerHTML: 1 },
        scrollTrigger: {
          trigger: stat,
          start: 'top 80%'
        }
      })
    })

    // Program Cards Hover Effect
    const cards = document.querySelectorAll('.program-card')
    cards.forEach(card => {
      const content = card.querySelector('.card-content')
      if (!content) return

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect()
        const x = (e as MouseEvent).clientX - rect.left
        const y = (e as MouseEvent).clientY - rect.top
        
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        
        const rotateX = (y - centerY) / 20
        const rotateY = (centerX - x) / 20
        
        ;(content as HTMLElement).style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      })
      
      card.addEventListener('mouseleave', () => {
        ;(content as HTMLElement).style.transform = 'rotateX(0) rotateY(0)'
      })
    })

    // Initialize Gallery Slider
    const gallerySlider = new Swiper('.gallery-slider', {
      modules: [Navigation, EffectCoverflow],
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      speed: 800,
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 3,
        }
      }
    })

    // Initialize Graduations Slider
    const graduationsSlider = new Swiper('.graduations-slider', {
      modules: [Pagination, Autoplay],
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 600,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        480: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        }
      }
    })

    // Scroll Animations
    ScrollTrigger.batch('.program-card', {
      start: 'top 80%',
      onEnter: batch => {
        gsap.from(batch, {
          opacity: 0,
          y: 50,
          stagger: 0.15,
          duration: 1,
          ease: 'power4.out'
        })
      }
    })

    // Navigation Background on Scroll
    const nav = document.querySelector('.nav-main')
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        nav?.classList.add('scrolled')
      } else {
        nav?.classList.remove('scrolled')
      }
    })

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault()
        const target = document.querySelector((e.currentTarget as HTMLAnchorElement).getAttribute('href') || '')
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          })
        }
      })
    })

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      window.removeEventListener('scroll', () => {})
    }
  }, [])

  return null
} 