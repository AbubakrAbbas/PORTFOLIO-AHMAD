(function(){var d=document.documentElement,i=document.getElementById("intro"),c=document.getElementById("inc"),b=document.getElementById("inb");
try{history.scrollRestoration="manual"}catch(e){}scrollTo(0,0);
function go(){d.classList.add("ready");d.classList.remove("lock")}
if(matchMedia("(prefers-reduced-motion:reduce)").matches){i.remove();go();return}
d.classList.add("lock");var t0=performance.now(),D=1500,done=false,loaded=document.readyState==="complete";
addEventListener("load",function(){loaded=true});
function fin(){if(done)return;done=true;i.classList.add("out");setTimeout(go,350);setTimeout(function(){i.remove()},1300)}
function step(n){var p=Math.min(1,(n-t0)/D),e=1-Math.pow(1-p,2);c.textContent=Math.round(e*100);b.style.transform="scaleX("+e+")";if(p<1||!loaded)requestAnimationFrame(step);else fin()}
requestAnimationFrame(step);setTimeout(fin,5000);
})();
