import { Injectable } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger)

@Injectable({
  providedIn: 'root'
})
export class GsapService {

  constructor() { }

  initScrollTrigger() {
    gsap.to('.text-anime', {
      opacity: 0,
      duration: 0.5,
      scrollTrigger: {
        trigger: '.home-section',
        scrub: true,
        start: '10% 50%',
        end: '90% 80%'
      }
    }),
      gsap.to('.text-fixed', {
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: '.home-section',
          scrub: true,
          start: '80% 100%',
          end: '100% 60%'
        }
      })
  }
}
