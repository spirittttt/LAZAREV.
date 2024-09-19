function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}


function navAnimation() {
    var nav = document.querySelector("nav")
nav.addEventListener("mouseenter",function(){
    let tl = gsap.timeline()
    tl.to("#nav-bottom",{
        height:"10vw",
    })
    tl.to("#nav-part2 h5",{
        delay:-1,
        display:"block"
    })
    tl.from("#nav-part2 h5 span",{
        y:25,
        stagger:{
            amount:0.5
        }
    })
})

nav.addEventListener("mouseleave",function(){
    let tl = gsap.timeline()
    tl.to("#nav-part2 h5",{
        display:"none"
    })
    tl.to("#nav-bottom",{
        height:"0vw",
        duration:0.1
    })
})
}

function page2Animation(){
    var relem = document.querySelectorAll(".page2-elem")
var relemImg = document.querySelectorAll(".page2-elem img")
relem.forEach(function(elem){
    elem.addEventListener("mouseenter",function(){
        gsap.to(elem.childNodes[3],{
            opacity :   1,
            scale:1
        })
    })
    elem.addEventListener("mouseleave",function(){
        gsap.to(elem.childNodes[3],{
            opacity : 0,
            scale:0
        })
    })
    elem.addEventListener("mousemove",function(dets){
        gsap.to(elem.childNodes[3],{
            x:dets.x-elem.getBoundingClientRect().x-50,
            y:dets.y-elem.getBoundingClientRect().y-150,
        })
    })
})
}

function playVideo() {
    var page3Center = document.querySelector("#page3-center")
var video = document.querySelector("#page3 video")
var nav = document.querySelector("nav")

page3Center.addEventListener("click",function(){
    video.play();
    nav.style.opacity = 0,
    gsap.to(video,{
        transform : "scaleX(1) ScaleY(1)",
        opacity: 1,
        borderRadius :0
    })
})
video.addEventListener("click",function(){
    video.pause();
    nav.style.opacity = 1,
    gsap.to(video,{
        transform : "scaleX(0.7) ScaleY(0)",
        opacity: 0,
        borderRadius :"30px"
    })
})

}

function hoverVideo(){
    var video1 = document.querySelector("#page5-2 #image1 video")
video1.addEventListener("mouseenter",function(){
    video1.style.opacity = 1
    video1.play()
})
video1.addEventListener("mouseleave",function(){
    video1.style.opacity = 0
    video1.load()
})
var video2 = document.querySelector("#page5-2 #image2 video")
video2.addEventListener("mouseenter",function(){
    video2.style.opacity = 1
    video2.play()
})
video2.addEventListener("mouseleave",function(){
    video2.style.opacity = 0
    video2.load()
})

}

function bottom(){
    gsap.from("#page7-bottom #part2 h4",{
        x:0,
        duration:1,
        scrollTrigger:{
            trigger:"#page7-bottom #part2",
            scroller: "#main",
            start:"top 70%",
            scrub:true
        }
    })
    gsap.from("#page7-bottom #part3 h4",{
        x:0,
        duration:1,
        scrollTrigger:{
            trigger:"#page7-bottom #part3",
            scroller: "#main",
            start:"top 70%",
            scrub:true
        }
    })
    gsap.from("#page7-bottom #part4 h4",{
        x:0,
        duration:1,
        scrollTrigger:{
            trigger:"#page7-bottom #part4",
            scroller: "#main",
            start:"top 70%",
            scrub:true
        }
    })
}

function loadingAnimation() {
    var tl = gsap.timeline();
tl.from("#page1",{
    opacity:0,
    duration:0.3,
    delay:0.2
})
tl.from("#page1",{
    transform: "scaleX(0.7) ScaleY(0)",
    borderRadius: "100px",
    duration:0.6,
    ease:"expo.out"
})
tl.from("nav ,#nav-duplicate ,#page1 h1 , #page1 p, #page1 #p-bottom, #page1 #moving-div",{
    opacity:0,
    stagger:0.2
})
}

navAnimation();
locomotiveAnimation();
loadingAnimation();
page2Animation();
playVideo();
hoverVideo();
bottom();
