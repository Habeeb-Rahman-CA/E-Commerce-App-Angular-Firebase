import { AfterViewInit, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {gsap} from 'gsap'
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger)

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

  initScrollTrigger(){
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

  ngAfterViewInit(): void {
    this.initScrollTrigger()
}

}
