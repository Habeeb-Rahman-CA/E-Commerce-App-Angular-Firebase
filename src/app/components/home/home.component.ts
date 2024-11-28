import { AfterViewInit, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GsapService } from '../../services/gsap.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

  gsapService = inject(GsapService)

  ngAfterViewInit(): void {
    this.gsapService.initScrollTrigger()
}

}
