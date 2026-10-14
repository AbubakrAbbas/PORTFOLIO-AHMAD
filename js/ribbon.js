(function(){
 const sec=document.getElementById("ribbon"),cv=document.getElementById("rb-canvas");
 if(!window.THREE){sec.hidden=true;return}
 let renderer;try{renderer=new THREE.WebGLRenderer({canvas:cv,antialias:false})}catch(e){sec.hidden=true;return}
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));const bgc=()=>new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue("--bg").trim()||"#141414");renderer.setClearColor(bgc(),1);
 const COV=["fringos-1","chickenking-2","daffy-1","aksteel-3","aksteel-4","apl-1","sharjah-1","zarafa-1","billboard","reel-cover","logo-wasser","gnews-phones"];
 const N=P.length,CZ=6,scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(35,1,.1,50);cam.position.z=CZ;
 const vert=`uniform float uX,uBend,uTime,uOpen;uniform vec2 uSize,uCover;varying vec2 vUv;varying float vShade;
 void main(){vUv=uv;vec2 lp=position.xy*uSize;float x=uX+lp.x;float w=x*.5;float b=uBend;
  vec3 p=vec3(x,lp.y,0.);
  p.y+=sin(w+uTime*.25)*.5*b;
  p.z+=(cos(w)-1.)*1.1*b+lp.y*sin(w)*.4*b;
  vShade=.72+.28*cos(w);
  vec3 q=vec3(position.xy*uCover*1.02,0.);
  p=mix(p,q,uOpen);vShade=mix(vShade,1.,uOpen);
  gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`;
 const frag=`uniform sampler2D uTex;uniform vec2 uImg;uniform float uAspect,uVel,uAlpha;varying vec2 vUv;varying float vShade;
 void main(){float I=uImg.x/uImg.y;vec2 s=vec2(1.);if(uAspect>I)s.y=I/uAspect;else s.x=uAspect/I;
  vec2 uv=(vUv-.5)*s+.5;float v=uVel;vec2 o=vec2(v*.035,0.);float bl=abs(v)*.02;
  vec3 c=vec3(0.);
  for(int i=-1;i<=1;i++){vec2 d=vec2(float(i)*bl,0.);c+=vec3(texture2D(uTex,uv+d+o).r,texture2D(uTex,uv+d).g,texture2D(uTex,uv+d-o).b);}
  c/=3.;gl_FragColor=vec4(c*vShade,uAlpha);}`;
 const loader=new THREE.TextureLoader(),geo=new THREE.PlaneGeometry(1,1,28,12),meshes=[];
 for(let i=0;i<N;i++){
  const u={uTex:{value:null},uImg:{value:new THREE.Vector2(1,1)},uX:{value:0},uBend:{value:1},uTime:{value:0},uOpen:{value:0},uSize:{value:new THREE.Vector2(3,2)},uCover:{value:new THREE.Vector2(4,3)},uAspect:{value:1.5},uVel:{value:0},uAlpha:{value:1}};
  const m=new THREE.Mesh(geo,new THREE.ShaderMaterial({uniforms:u,vertexShader:vert,fragmentShader:frag,transparent:true,side:THREE.DoubleSide}));
  m.frustumCulled=false;scene.add(m);meshes.push(m);
  loader.load(U("img/"+COV[i]+".webp"),t=>{t.minFilter=THREE.LinearFilter;t.generateMipmaps=false;u.uTex.value=t;u.uImg.value.set(t.image.width,t.image.height);dirty=true});
 }
 let visW=4,visH=3,sw=3,sh=2,pitch=3.4,W=1,H=1;
 function layout(){W=sec.clientWidth;H=sec.clientHeight;renderer.setSize(W,H,false);cam.aspect=W/H;cam.updateProjectionMatrix();
  visH=2*CZ*Math.tan(THREE.MathUtils.degToRad(cam.fov/2));visW=visH*cam.aspect;
  const por=cam.aspect<.9;sw=Math.min(visW*(por?.8:.74),3.3);sh=Math.min(sw*(por?1.2:.68),visH*(por?.6:.56));pitch=sw*1.14}
 layout();addEventListener("resize",()=>{layout();dirty=true});
 const clamp=(v,a,b)=>Math.min(b,Math.max(a,v)),mod=x=>((x%N)+N)%N;
 let dirty=true,cur=0,target=0,vel=0,last=performance.now(),idle=0,shown=-1,vis=true,open=null;
 const titleEl=document.getElementById("rb-title"),tagEl=document.getElementById("rb-tag"),cntEl=document.getElementById("rb-count");
 function label(i){if(i===shown)return;shown=i;titleEl.textContent=P[i].t;tagEl.textContent=P[i].tag;cntEl.textContent=String(i+1).padStart(2,"0")+" / "+String(N).padStart(2,"0");
  titleEl.classList.remove("swap");void titleEl.offsetWidth;titleEl.classList.add("swap")}
 label(0);
 /* called by the theme toggle: repaint the ribbon background straight away so the page transition captures it */
 window.setRibbonTheme=()=>{renderer.setClearColor(bgc(),1);dirty=true;renderer.render(scene,cam)};
 const go=d=>{target=Math.round(target)+d;idle=0};
 document.getElementById("rb-prev").onclick=()=>go(-1);document.getElementById("rb-next").onclick=()=>go(1);
 const pxPerSlide=()=>pitch/visW*W;
 sec.addEventListener("wheel",e=>{if(open)return;const h=Math.abs(e.deltaX)>Math.abs(e.deltaY)||e.shiftKey;if(!h)return;e.preventDefault();target+=(e.deltaX||e.deltaY)/pxPerSlide()*1.1;idle=0},{passive:false});
 addEventListener("keydown",e=>{if(!vis||open)return;if(e.key==="ArrowRight")go(1);if(e.key==="ArrowLeft")go(-1)});
 let down=null;
 cv.addEventListener("pointerdown",e=>{if(open)return;down={x:e.clientX,t:target,moved:0};cv.setPointerCapture(e.pointerId);cv.classList.add("drag")});
 cv.addEventListener("pointermove",e=>{if(!down)return;const dx=e.clientX-down.x;down.moved=Math.max(down.moved,Math.abs(dx));target=down.t-dx/pxPerSlide()*1.2;idle=0});
 const end=e=>{if(!down)return;cv.classList.remove("drag");const d=down;down=null;
  if(d.moved<6){const r=cv.getBoundingClientRect();const k=Math.round(cur+((e.clientX-r.left)-r.width/2)/pxPerSlide());
   if(k===Math.round(cur))openProject(mod(k));else{target=k;idle=0}}};
 cv.addEventListener("pointerup",end);cv.addEventListener("pointercancel",()=>{down=null;cv.classList.remove("drag")});
 const wipe=document.getElementById("wipe");
 function openProject(i){if(open)return;target=Math.round(cur);open={i,t:0,jumped:false}}
 new IntersectionObserver(es=>{vis=es[0].isIntersecting},{threshold:0}).observe(sec);
 const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
 function frame(now){requestAnimationFrame(frame);const dt=Math.min(.05,(now-last)/1000);last=now;if(!vis&&!open)return;
  idle+=dt;if(!down&&!open&&idle>.18)target=Math.round(target);
  const prev=cur;cur+=(target-cur)*Math.min(1,dt*6);vel+=((cur-prev)/Math.max(dt,.001)*.35-vel)*Math.min(1,dt*10);
  const v=clamp(vel,-1.2,1.2);if(Math.abs(target-cur)<.0004&&Math.abs(vel)<.002&&!open&&!dirty)return;dirty=false;label(mod(Math.round(cur)));
  if(open){open.t=Math.min(1,open.t+dt/.95);
   if(open.t>=1&&!open.jumped){open.jumped=true;wipe.classList.add("on");
    setTimeout(()=>{const el=document.getElementById("p"+open.i);if(el)window.scrollTo({top:el.getBoundingClientRect().top+scrollY-10,behavior:"instant"});wipe.classList.remove("on");open=null},380)}}
  const T=0.;
  meshes.forEach((m,i)=>{const u=m.material.uniforms,ox=(i-cur-N*Math.round((i-cur)/N))*pitch;m.visible=Math.abs(ox)<visW*.75+sw;
   const o=open&&open.i===i?ease(open.t):0;
   u.uX.value=ox;u.uSize.value.set(sw,sh);u.uCover.value.set(visW,visH);u.uTime.value=T;u.uVel.value=v;u.uOpen.value=o;
   u.uAspect.value=sw/sh+(visW/visH-sw/sh)*o;u.uAlpha.value=open&&open.i!==i?1-ease(open.t):1;
   m.renderOrder=o>0?10:0});
  renderer.render(scene,cam)}
 requestAnimationFrame(frame);
})();
