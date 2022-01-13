import { Component, OnInit } from "@angular/core";

import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to('.btn-scroll-hidden', {
      opacity: 0,
      duration: 1,
      scrollTrigger: '.square'
    })
    
    gsap.to('.square', {
      x: -1500,
      duration: 1,
      scrollTrigger: '.square_2'
    })

    // var tl = gsap.timeline()
    // //var tl = gsap.timeline({ defaults: { duration:1, ease: 'elastic'} })

    // tl.from('.square', {
    //   x: 500,
    //   opacity: 0,
    //   ease: 'back.out(1.7)',
    //   duration: .5
    // })
    // tl.from('.square_2', {
    //   x: -500,
    //   opacity: 0,
    //   ease: 'back.out(1.7)',
    //   duration: .5
    // }) 
  }

  

}