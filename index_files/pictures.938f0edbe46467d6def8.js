"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2906],{201:function(e,n,r){var t,i;function o(e,n){e.forEach((function(e){e.isIntersecting&&(n.unobserve(e.target),c(e.target))}))}function c(e){var n=e.firstElementChild,r=n.textContent||n.innerHTML;e.insertAdjacentHTML("afterbegin",r),n.remove()}function u(e){void 0===e&&(e={rootMargin:"300px 0px"}),"performance"in window&&window.performance.mark("pictures-start"),i=document.querySelectorAll(".js-lazy-picture"),t=new IntersectionObserver(o,e),i.forEach((function(e){t.observe(e)})),window.addEventListener("beforeprint",(function(){i.forEach(c)})),"performance"in window&&(window.performance.mark("pictures-end"),window.performance.measure("pictures-time","pictures-start","pictures-end"))}r.d(n,{A:function(){return u},t:function(){return o}})}}]);