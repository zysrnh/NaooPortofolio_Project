import{c as U,r as d,j as a,a as de,H as ge}from"./app-bAmKT1a3.js";import{N as ve}from"./Navbar-BWckoA6_.js";import{u as ue}from"./useVisitorTracker-BkF53OTj.js";/* empty css            */import"./ThemeToggle-DMixwq9C.js";const be={Hosted:{bg:"bg-[var(--nb-accent)]",text:"text-[var(--nb-primary)]",dot:"bg-[var(--nb-primary)]"},"In Progress":{bg:"bg-[var(--nb-secondary)]",text:"text-[var(--nb-primary)]",dot:"bg-[#F59E0B]"},Planning:{bg:"bg-[var(--nb-bg)]",text:"text-[var(--nb-primary)]",dot:"bg-[var(--nb-accent)]"}},ye=["All","Hosted","In Progress","Planning"],pe=6;function je(e){const t=U.c(5),o=d.useRef(null),[x,n]=d.useState(!1);let c;t[0]!==e?(c=()=>{const l=o.current;if(!l)return;const b=new IntersectionObserver(p=>{const[r]=p;r.isIntersecting&&(n(!0),b.disconnect())},{threshold:.12,...e});return b.observe(l),()=>b.disconnect()},t[0]=e,t[1]=c):c=t[1];let i;t[2]===Symbol.for("react.memo_cache_sentinel")?(i=[],t[2]=i):i=t[2],d.useEffect(c,i);let m;return t[3]!==x?(m={ref:o,inView:x},t[3]=x,t[4]=m):m=t[4],m}function me(e){const t=U.c(10),{children:o,delay:x,from:n,className:c}=e,i=x===void 0?0:x,m=n===void 0?"bottom":n,l=c===void 0?"":c,{ref:b,inView:p}=je();let r;t[0]===Symbol.for("react.memo_cache_sentinel")?(r={bottom:"translateY(32px)",left:"translateX(-32px)",right:"translateX(32px)"},t[0]=r):r=t[0];const v=r,C=p?1:0,Y=p?"translate(0,0)":v[m],j=`opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${i}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${i}ms`;let h;t[1]!==C||t[2]!==Y||t[3]!==j?(h={opacity:C,transform:Y,transition:j},t[1]=C,t[2]=Y,t[3]=j,t[4]=h):h=t[4];let T;return t[5]!==o||t[6]!==l||t[7]!==b||t[8]!==h?(T=a.jsx("div",{ref:b,className:l,style:h,children:o}),t[5]=o,t[6]=l,t[7]=b,t[8]=h,t[9]=T):T=t[9],T}function we(e){const t=U.c(9),{delay:o}=e,n=`${o===void 0?0:o}ms`;let c;t[0]!==n?(c={animationDelay:n},t[0]=n,t[1]=c):c=t[1];let i;t[2]===Symbol.for("react.memo_cache_sentinel")?(i=a.jsx("div",{className:"w-full h-44 skeleton-shimmer border-b-4 border-[var(--nb-primary)]"}),t[2]=i):i=t[2];let m,l,b;t[3]===Symbol.for("react.memo_cache_sentinel")?(m=a.jsx("div",{className:"skeleton-shimmer h-4 w-1/3"}),l=a.jsx("div",{className:"skeleton-shimmer h-6 w-3/4"}),b=a.jsx("div",{className:"skeleton-shimmer h-12 w-full"}),t[3]=m,t[4]=l,t[5]=b):(m=t[3],l=t[4],b=t[5]);let p;t[6]===Symbol.for("react.memo_cache_sentinel")?(p=a.jsxs("div",{className:"p-5 flex flex-col gap-3",children:[m,l,b,a.jsxs("div",{className:"flex gap-2",children:[a.jsx("div",{className:"skeleton-shimmer h-8 w-8"}),a.jsx("div",{className:"skeleton-shimmer h-8 w-8"})]})]}),t[6]=p):p=t[6];let r;return t[7]!==c?(r=a.jsxs("div",{className:"border-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] shadow-[5px_5px_0_var(--nb-primary)] p-0 overflow-hidden",style:c,children:[i,p]}),t[7]=c,t[8]=r):r=t[8],r}function ke(e){const t=U.c(8),{children:o,onClick:x,delay:n,visible:c}=e,i=n===void 0?0:n,m=c===void 0?!0:c,l=m?1:0,b=m?"translateY(0)":"translateY(16px)",p=`opacity 0.4s ease ${i}ms, transform 0.4s ease ${i}ms`;let r;t[0]!==l||t[1]!==b||t[2]!==p?(r={opacity:l,transform:b,transition:p},t[0]=l,t[1]=b,t[2]=p,t[3]=r):r=t[3];let v;return t[4]!==o||t[5]!==x||t[6]!==r?(v=a.jsx("div",{onClick:x,className:"spotlight-card rounded-none",style:r,children:o}),t[4]=o,t[5]=x,t[6]=r,t[7]=v):v=t[7],v}function He(){const e=U.c(94);ue("/projects");let t;e[0]===Symbol.for("react.memo_cache_sentinel")?(t=[],e[0]=t):t=e[0];const[o,x]=d.useState(t),[n,c]=d.useState(!0),[i,m]=d.useState(!1),[l,b]=d.useState("All"),[p]=d.useState("All"),[r,v]=d.useState(1),[C,Y]=d.useState(0),[j,h]=d.useState(!0),[,T]=d.useState(!1),xe=d.useRef(null),[le,fe]=d.useState(0);let X,q;e[1]===Symbol.for("react.memo_cache_sentinel")?(X=()=>{const f=setTimeout(()=>T(!0),60);return()=>clearTimeout(f)},q=[],e[1]=X,e[2]=q):(X=e[1],q=e[2]),d.useEffect(X,q);let J,Q;e[3]===Symbol.for("react.memo_cache_sentinel")?(J=()=>{c(!0),m(!1),fetch("/api/projects").then(Te).then(f=>{x(Array.isArray(f)?f:[]),c(!1)}).catch(()=>{m(!0),c(!1)})},Q=[],e[3]=J,e[4]=Q):(J=e[3],Q=e[4]),d.useEffect(J,Q);let Z,ee;e[5]===Symbol.for("react.memo_cache_sentinel")?(Z=()=>{const f=()=>fe(window.scrollY*.18);return window.addEventListener("scroll",f,{passive:!0}),()=>window.removeEventListener("scroll",f)},ee=[],e[5]=Z,e[6]=ee):(Z=e[5],ee=e[6]),d.useEffect(Z,ee),Array.from(new Set(o.map(Ye)));let w,u,k,N,S,F,I,_,A,P,L,$,z,y;if(e[7]!==p||e[8]!==i||e[9]!==l||e[10]!==C||e[11]!==j||e[12]!==le||e[13]!==n||e[14]!==r||e[15]!==o){let f;e[30]!==p||e[31]!==l?(f=s=>{const O=l==="All"||s.status===l,E=p==="All"||(s.category||"Web Application")===p;return O&&E},e[30]=p,e[31]=l,e[32]=f):f=e[32],w=o.filter(f),y=Math.ceil(w.length/pe);const g=w.slice((r-1)*pe,r*pe);let ae;e[33]===Symbol.for("react.memo_cache_sentinel")?(ae=s=>{h(!1),setTimeout(()=>{b(s),v(1),Y(Ee),h(!0)},220)},e[33]=ae):ae=e[33];const he=ae;let ne;e[34]===Symbol.for("react.memo_cache_sentinel")?(ne=s=>{h(!1),setTimeout(()=>{v(s),Y(Ce),h(!0),window.scrollTo({top:0,behavior:"smooth"})},220)},e[34]=ne):ne=e[34],u=ne,e[35]===Symbol.for("react.memo_cache_sentinel")?(P=a.jsx("style",{children:`
        @keyframes pageIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroReveal {
          from { opacity: 0; transform: translateY(24px) scale(0.99); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideDownFade {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes counterUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(158, 204, 250, 0); }
          50%       { box-shadow: 0 0 0 4px rgba(158, 204, 250, 0.25); }
        }
        @keyframes skeletonPulse {
          0%,100% { opacity: 0.5; }
          50%     { opacity: 1; }
        }

        .back-btn-wrap {
          animation: slideDownFade 0.4s cubic-bezier(0.16,1,0.3,1) 0.05s both;
        }
        .filter-wrap {
          animation: slideDownFade 0.5s cubic-bezier(0.16,1,0.3,1) 0.28s both;
        }
        .hero-block {
          animation: heroReveal 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both;
        }
        .hero-stat {
          animation: counterUp 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }

        .grid-wrapper {
          transition: opacity 0.22s ease, transform 0.22s ease;
        }
        .grid-wrapper.hidden {
          opacity: 0;
          transform: translateY(10px);
          pointer-events: none;
        }

        .spotlight-card {
          position: relative;
          overflow: visible !important;
          cursor: pointer;
          background: var(--nb-bg);
          border: 4px solid var(--nb-primary);
          box-shadow: 5px 5px 0 var(--nb-primary);
          transition: transform 0.18s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.18s cubic-bezier(0.16,1,0.3,1);
        }
        .spotlight-card:hover {
          transform: translate(-4px,-4px);
          box-shadow: 9px 9px 0 var(--nb-accent), 11px 11px 0 var(--nb-primary);
        }
        .spotlight-card:active {
          transform: translate(1px,1px);
          box-shadow: 3px 3px 0 var(--nb-primary);
        }
        .spotlight-card:hover .card-img { transform: scale(1.07); }
        .card-img { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); }
        .card-overlay { opacity: 0; transition: opacity 0.25s ease; }
        .spotlight-card:hover .card-overlay { opacity: 1; }

        .filter-btn {
          border: 3px solid var(--nb-primary); padding: 8px 18px;
          font-weight: 900; font-size: 12px; text-transform: uppercase;
          letter-spacing: 0.08em; cursor: pointer;
          transition: transform 0.1s ease, box-shadow 0.1s ease, background 0.15s ease, color 0.15s ease;
          box-shadow: 3px 3px 0 var(--nb-primary);
          position: relative; overflow: hidden;
        }
        .filter-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%);
          background-size: 200% 100%;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .filter-btn:hover::after { opacity: 1; animation: shimmer 0.6s ease; }
        .filter-btn:hover  { transform: translate(2px,2px); box-shadow: 1px 1px 0 var(--nb-primary); }
        .filter-btn:active { transform: translate(3px,3px); box-shadow: 0 0 0 var(--nb-primary); }
        .filter-btn.active { background: var(--nb-primary); color: var(--nb-accent); animation: pulseGlow 2s ease 0.3s; }

        .back-btn {
          display: inline-flex; align-items: center; gap: 8px;
          border: 4px solid var(--nb-primary); padding: 10px 20px;
          font-weight: 900; font-size: 13px; text-transform: uppercase;
          color: var(--nb-primary); background: var(--nb-bg); cursor: pointer;
          box-shadow: 4px 4px 0 var(--nb-primary); letter-spacing: 0.07em;
          transition: transform 0.1s ease, box-shadow 0.1s ease;
        }
        .back-btn:hover  { transform: translate(2px,2px); box-shadow: 2px 2px 0 var(--nb-primary); }
        .back-btn:active { transform: translate(4px,4px); box-shadow: 0 0 0 var(--nb-primary); }
        .back-btn svg { transition: transform 0.2s ease; }
        .back-btn:hover svg { transform: translateX(-3px); }

        .page-btn {
          border: 3px solid var(--nb-primary); width: 40px; height: 40px;
          font-weight: 900; font-size: 13px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: transform 0.1s ease, box-shadow 0.1s ease, background 0.12s ease;
          box-shadow: 3px 3px 0 var(--nb-primary); background: var(--nb-bg); color: var(--nb-primary);
        }
        .page-btn:hover  { transform: translate(2px,2px); box-shadow: 1px 1px 0 var(--nb-primary); }
        .page-btn.active { background: var(--nb-primary); color: var(--nb-accent); }
        .page-btn:disabled { opacity: 0.35; cursor: not-allowed; transform: none; }

        .dot {
          width: 12px; height: 12px;
          border: 2px solid var(--nb-primary); background: transparent;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1); cursor: pointer; flex-shrink: 0;
        }
        .dot.active { background: var(--nb-primary); width: 32px; }
        .dot:hover:not(.active) { background: var(--nb-accent); }

        .stack-chip {
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .stack-chip:hover {
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 var(--nb-primary);
        }

        .hero-grid {
          background-image:
            repeating-linear-gradient(0deg,var(--nb-accent) 0,var(--nb-accent) 1px,transparent 1px,transparent 40px),
            repeating-linear-gradient(90deg,var(--nb-accent) 0,var(--nb-accent) 1px,transparent 1px,transparent 40px);
        }

        .skeleton-shimmer {
          background: linear-gradient(90deg, var(--nb-accent-light) 25%, var(--nb-accent) 50%, var(--nb-accent-light) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s ease infinite, skeletonPulse 1.4s ease infinite;
        }

        .error-box {
          border: 4px solid var(--nb-primary); background: #FFD1D1;
          box-shadow: 6px 6px 0 var(--nb-primary);
          padding: 40px 24px; text-align: center;
        }

        .retry-btn {
          border: 3px solid var(--nb-primary); padding: 10px 24px;
          font-weight: 900; font-size: 12px; text-transform: uppercase;
          background: var(--nb-primary); color: var(--nb-accent); cursor: pointer;
          box-shadow: 3px 3px 0 var(--nb-accent);
          transition: transform 0.1s ease, box-shadow 0.1s ease;
        }
        .retry-btn:hover  { transform: translate(2px,2px); box-shadow: 1px 1px 0 var(--nb-accent); }
        .retry-btn:active { transform: translate(3px,3px); box-shadow: 0 0 0 var(--nb-accent); }
      `}),e[35]=P):P=e[35],I="min-h-screen bg-[var(--nb-accent-light)]",e[36]===Symbol.for("react.memo_cache_sentinel")?(_=a.jsx(ge,{title:"Projects - Portfolio"}),A=a.jsx(ve,{}),e[36]=_,e[37]=A):(_=e[36],A=e[37]),L="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-20",e[38]===Symbol.for("react.memo_cache_sentinel")?($=a.jsx("div",{className:"back-btn-wrap mb-8",children:a.jsxs("button",{className:"back-btn",onClick:ze,children:[a.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[a.jsx("line",{x1:"19",y1:"12",x2:"5",y2:"12"}),a.jsx("polyline",{points:"12 19 5 12 12 5"})]}),"Kembali ke Home"]})}),e[38]=$):$=e[38];const ce=`translateY(${le}px)`;let V;e[39]!==ce?(V=a.jsx("div",{className:"absolute inset-0 opacity-10 hero-grid",style:{transform:ce,transition:"transform 0.1s linear"}}),e[39]=ce,e[40]=V):V=e[40];let re;e[41]===Symbol.for("react.memo_cache_sentinel")?(re=a.jsx("div",{className:"absolute top-0 right-0 w-32 h-32 opacity-5",style:{background:"radial-gradient(circle at top right, var(--nb-accent), transparent 70%)"}}),e[41]=re):re=e[41];let se,ie,oe;e[42]===Symbol.for("react.memo_cache_sentinel")?(se=a.jsx("p",{className:"font-black uppercase text-xs text-[var(--nb-accent)] tracking-[0.3em] mb-2",children:"Portfolio"}),ie=a.jsx("h1",{className:"text-3xl sm:text-5xl font-black uppercase text-[var(--nb-bg)] mb-3 leading-tight",children:"All Projects"}),oe=a.jsx("p",{className:"font-semibold text-[var(--nb-accent-light)] text-base sm:text-lg max-w-2xl",children:"Semua project yang pernah dibangun — dari web app, dashboard, hingga tools internal."}),e[42]=se,e[43]=ie,e[44]=oe):(se=e[42],ie=e[43],oe=e[44]);let B;e[45]!==n||e[46]!==o?(B=!n&&a.jsx("div",{className:"mt-6 flex gap-4 flex-wrap",children:[{count:o.length,label:"Total Projects"},{count:o.filter($e).length,label:"Hosted"},{count:o.filter(Pe).length,label:"In Progress"}].map(Ae)}),e[45]=n,e[46]=o,e[47]=B):B=e[47];let K;e[48]!==n?(K=n&&a.jsx("div",{className:"mt-6 flex gap-4 flex-wrap",children:[0,1,2].map(_e)}),e[48]=n,e[49]=K):K=e[49];let M;e[50]!==B||e[51]!==K?(M=a.jsxs("div",{className:"relative z-10",children:[se,ie,oe,B,K]}),e[50]=B,e[51]=K,e[52]=M):M=e[52],e[53]!==V||e[54]!==M?(z=a.jsxs("div",{ref:xe,className:"hero-block bg-[var(--nb-primary)] border-4 border-[var(--nb-primary)] shadow-[10px_10px_0_var(--nb-accent)] p-8 sm:p-10 mb-8 relative overflow-hidden",children:[V,re,M]}),e[53]=V,e[54]=M,e[55]=z):z=e[55];let W;e[56]!==l||e[57]!==n||e[58]!==o?(W=ye.map((s,O)=>a.jsxs("button",{className:`filter-btn ${l===s?"active":"bg-[var(--nb-bg)] text-[var(--nb-primary)]"}`,style:{transitionDelay:`${O*40}ms`},onClick:()=>he(s),disabled:n,children:[s,!n&&a.jsxs("span",{className:"ml-2 opacity-60 text-xs",children:["(",s==="All"?o.length:o.filter(E=>E.status===s).length,")"]})]},s)),e[56]=l,e[57]=n,e[58]=o,e[59]=W):W=e[59],e[60]!==W?(k=a.jsx("div",{className:"filter-wrap flex flex-wrap gap-3 mb-8",children:W}),e[60]=W,e[61]=k):k=e[61],e[62]!==i?(N=i&&a.jsx(me,{children:a.jsxs("div",{className:"error-box mb-8",children:[a.jsx("p",{className:"font-black uppercase text-lg text-[var(--nb-primary)] mb-2",children:"Gagal Memuat Data"}),a.jsx("p",{className:"font-semibold text-[var(--nb-primary)] opacity-60 mb-6",children:"Koneksi ke server gagal. Coba lagi."}),a.jsx("button",{className:"retry-btn",onClick:()=>{m(!1),c(!0),fetch("/api/projects").then(Se).then(s=>{x(Array.isArray(s)?s:[]),c(!1)}).catch(()=>{m(!0),c(!1)})},children:"↻ Coba Lagi"})]})}),e[62]=i,e[63]=N):N=e[63],e[64]!==n?(S=n&&a.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10",children:[0,1,2,3,4,5].map(Ne)}),e[64]=n,e[65]=S):S=e[65],F=!n&&!i&&a.jsx("div",{className:`grid-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 ${j?"":"hidden"}`,style:{padding:"12px",margin:"-12px",marginBottom:"calc(2.5rem - 12px)"},children:g.map((s,O)=>{const E=be[s.status]??be.Planning;return a.jsxs(ke,{delay:O*70,visible:j,onClick:()=>de.visit(`/projects/${s.slug}`),children:[a.jsxs("div",{className:"w-full h-44 overflow-hidden border-b-4 border-[var(--nb-primary)] relative",children:[s.images?.[0]?a.jsx("img",{src:s.images[0],alt:s.title,className:"card-img w-full h-full object-cover object-top"}):a.jsx("div",{className:"w-full h-full bg-[var(--nb-accent-light)] flex items-center justify-center",children:a.jsx("span",{className:"font-black uppercase text-xs text-[var(--nb-primary)] opacity-30",children:"No Image"})}),a.jsx("div",{className:"card-overlay absolute inset-0 bg-[var(--nb-primary)] bg-opacity-65 flex items-center justify-center",children:a.jsx("span",{className:"text-[var(--nb-accent)] font-black uppercase text-sm border-2 border-[var(--nb-accent)] px-4 py-2",children:"Lihat Detail →"})}),a.jsxs("div",{className:`absolute top-3 left-3 inline-flex items-center gap-1.5 border-2 border-[var(--nb-primary)] px-3 py-1 ${E.bg} z-20`,children:[a.jsx("div",{className:`w-1.5 h-1.5 rounded-full ${E.dot}`}),a.jsx("span",{className:`font-black uppercase text-xs tracking-wide ${E.text}`,children:s.status})]}),a.jsx("div",{className:"absolute top-3 right-3 z-20 bg-[var(--nb-primary)] border-2 border-[var(--nb-accent)] px-2 py-0.5",children:a.jsx("span",{className:"font-black text-[9px] text-[var(--nb-accent)] uppercase tracking-tighter",children:s.workType==="Solo"?s.soloRole||"Solo":"Collab"})})]}),a.jsxs("div",{className:"p-5 relative z-20",children:[a.jsx("div",{className:"mb-2",children:a.jsxs("span",{className:"inline-block font-black uppercase text-[10px] bg-[var(--nb-primary)] text-[var(--nb-accent)] px-2 py-0.5 border border-[var(--nb-primary)] tracking-wider",children:["🏷️ ",s.category||"Web Application"]})}),a.jsxs("div",{className:"flex items-start justify-between gap-2 mb-2",children:[a.jsx("h3",{className:"font-black uppercase text-sm text-[var(--nb-primary)] leading-tight",children:s.title}),a.jsx("span",{className:"text-xs font-bold text-[var(--nb-primary)] opacity-50 flex-shrink-0",children:s.date})]}),a.jsx("p",{className:"font-semibold text-xs text-[var(--nb-primary)] opacity-70 leading-relaxed",children:s.desc})]})]},s.id)})},C),e[7]=p,e[8]=i,e[9]=l,e[10]=C,e[11]=j,e[12]=le,e[13]=n,e[14]=r,e[15]=o,e[16]=w,e[17]=u,e[18]=k,e[19]=N,e[20]=S,e[21]=F,e[22]=I,e[23]=_,e[24]=A,e[25]=P,e[26]=L,e[27]=$,e[28]=z,e[29]=y}else w=e[16],u=e[17],k=e[18],N=e[19],S=e[20],F=e[21],I=e[22],_=e[23],A=e[24],P=e[25],L=e[26],$=e[27],z=e[28],y=e[29];let D;e[66]!==i||e[67]!==w||e[68]!==n?(D=!n&&!i&&w.length===0&&a.jsx(me,{children:a.jsxs("div",{className:"text-center py-20 border-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] shadow-[6px_6px_0_var(--nb-primary)]",children:[a.jsx("p",{className:"font-black uppercase text-2xl text-[var(--nb-primary)] mb-2",children:"Tidak Ada Project"}),a.jsx("p",{className:"font-semibold text-[var(--nb-primary)] opacity-60",children:"Coba filter yang lain"})]})}),e[66]=i,e[67]=w,e[68]=n,e[69]=D):D=e[69];let R;e[70]!==i||e[71]!==u||e[72]!==n||e[73]!==r||e[74]!==y?(R=!n&&!i&&y>1&&a.jsx(me,{delay:100,children:a.jsxs("div",{className:"flex items-center justify-between mt-4",children:[a.jsx("div",{className:"flex items-center gap-3",children:Array.from({length:y}).map((f,g)=>a.jsx("div",{className:`dot ${r===g+1?"active":""}`,onClick:()=>u(g+1)},g))}),a.jsxs("div",{className:"flex items-center gap-2",children:[a.jsx("button",{className:"page-btn",onClick:()=>u(r-1),disabled:r===1,children:"←"}),Array.from({length:y}).map((f,g)=>a.jsx("button",{className:`page-btn ${r===g+1?"active":""}`,onClick:()=>u(g+1),children:g+1},g)),a.jsx("button",{className:"page-btn",onClick:()=>u(r+1),disabled:r===y,children:"→"})]})]})}),e[70]=i,e[71]=u,e[72]=n,e[73]=r,e[74]=y,e[75]=R):R=e[75];let H;e[76]!==k||e[77]!==N||e[78]!==S||e[79]!==F||e[80]!==D||e[81]!==R||e[82]!==L||e[83]!==$||e[84]!==z?(H=a.jsxs("div",{className:L,children:[$,z,k,N,S,F,D,R]}),e[76]=k,e[77]=N,e[78]=S,e[79]=F,e[80]=D,e[81]=R,e[82]=L,e[83]=$,e[84]=z,e[85]=H):H=e[85];let G;e[86]!==I||e[87]!==_||e[88]!==A||e[89]!==H?(G=a.jsxs("div",{className:I,children:[_,A,H]}),e[86]=I,e[87]=_,e[88]=A,e[89]=H,e[90]=G):G=e[90];let te;return e[91]!==P||e[92]!==G?(te=a.jsxs(a.Fragment,{children:[P,G]}),e[91]=P,e[92]=G,e[93]=te):te=e[93],te}function Ne(e){return a.jsx(we,{delay:e*60},e)}function Se(e){return e.json()}function _e(e){return a.jsx("div",{className:"skeleton-shimmer border-2 border-[var(--nb-accent)] px-4 py-2 inline-flex items-center gap-2",style:{width:130,height:42}},e)}function Ae(e,t){return a.jsxs("div",{className:"hero-stat border-2 border-[var(--nb-accent)] px-4 py-2 inline-flex items-center gap-2",style:{animationDelay:`${.35+t*.1}s`},children:[a.jsx("span",{className:"font-black text-[var(--nb-accent)] text-xl",children:e.count}),a.jsx("span",{className:"font-black text-[var(--nb-accent-light)] text-xs uppercase tracking-widest",children:e.label})]},t)}function Pe(e){return e.status==="In Progress"}function $e(e){return e.status==="Hosted"}function ze(){return de.visit("/")}function Ce(e){return e+1}function Ee(e){return e+1}function Ye(e){return e.category||"Web Application"}function Te(e){if(!e.ok)throw new Error("Gagal fetch");return e.json()}export{He as default};
