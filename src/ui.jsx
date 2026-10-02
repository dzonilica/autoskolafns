import React, { useRef, useSyncExternalStore } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, ArrowRight } from '@phosphor-icons/react';

export function ParallaxImage({ name, alt, className = '', priority = false, position = 'center', sizes }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);
  return <div ref={ref} className={`parallax-image ${className}`}>
    <motion.img src={`/images/${name}-1600.webp`} srcSet={`/images/${name}-800.webp 800w, /images/${name}-1600.webp 1600w`} sizes={sizes || (priority ? '(max-width: 767px) 100vw, 94vw' : '(max-width: 767px) 100vw, 55vw')} alt={alt} width="1600" height="1067" loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} style={{ y: reduced ? 0 : y, objectPosition: position }} />
  </div>;
}

// The intro loader (src/loader/loader.js) marks the page ready when it starts lifting.
const isSiteReady = () => document.documentElement.classList.contains('fns-ready');
const onSiteReady = callback => { window.addEventListener('fns:ready', callback); return () => window.removeEventListener('fns:ready', callback); };

export function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const ready = useSyncExternalStore(onSiteReady, isSiteReady);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  return <motion.div ref={ref} className={className} initial={reduced ? false : { opacity: 0, y: 24 }} animate={ready && inView ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>;
}

export function Breadcrumb({ current }) {
  return <nav className="breadcrumb container" aria-label="Putanja stranice"><a href="/">Početna</a><ArrowRight size={13} aria-hidden="true" /><span aria-current="page">{current}</span></nav>;
}

export function PageCTA() {
  return <section className="page-cta container" aria-labelledby="next-step-title"><Reveal className="page-cta-inner"><div><h2 id="next-step-title">Tvoj prvi korak?<br /><span>Da se upoznamo.</span></h2><p>Javi nam se za sve što želiš da znaš pre upisa.</p></div><a className="button" href="/kontakt/#upit">Započni obuku <ArrowUpRight size={20} /></a></Reveal></section>;
}
