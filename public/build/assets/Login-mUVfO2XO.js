import{c as V,r as i,j as t,a as ie}from"./app-I91K9lxT.js";/* empty css            */const pe=()=>{const e=V.c(1);let r;return e[0]===Symbol.for("react.memo_cache_sentinel")?(r=t.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"#0B1957",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[t.jsx("path",{d:"M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"}),t.jsx("line",{x1:"12",y1:"9",x2:"12",y2:"13"}),t.jsx("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})]}),e[0]=r):r=e[0],r},de=()=>{const e=V.c(1);let r;return e[0]===Symbol.for("react.memo_cache_sentinel")?(r=t.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"#0B1957",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[t.jsx("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),t.jsx("circle",{cx:"12",cy:"12",r:"3"})]}),e[0]=r):r=e[0],r},be=()=>{const e=V.c(1);let r;return e[0]===Symbol.for("react.memo_cache_sentinel")?(r=t.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"#0B1957",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[t.jsx("path",{d:"M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"}),t.jsx("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]}),e[0]=r):r=e[0],r};function ye(){const e=V.c(72);let r;e[0]===Symbol.for("react.memo_cache_sentinel")?(r={email:"",password:""},e[0]=r):r=e[0];const[a,ae]=i.useState(r);let S;e[1]===Symbol.for("react.memo_cache_sentinel")?(S={},e[1]=S):S=e[1];const[s,j]=i.useState(S),[n,re]=i.useState(!1),[oe,le]=i.useState(!1),[_,ce]=i.useState(!1),[me,E]=i.useState(0);let B,F;e[2]===Symbol.for("react.memo_cache_sentinel")?(B=()=>{setTimeout(()=>le(!0),50)},F=[],e[2]=B,e[3]=F):(B=e[2],F=e[3]),i.useEffect(B,F);let z;e[4]!==a.email||e[5]!==a.password?(z=N=>{N?.preventDefault();const R={};if(a.email||(R.email="Email wajib diisi!"),a.password||(R.password="Password wajib diisi!"),Object.keys(R).length){j(R);return}j({}),re(!0);let T=0;const se=setInterval(()=>{T=T+Math.random()*18,T>=85?(clearInterval(se),E(85)):E(Math.round(T))},80);ie.post("/login",{email:a.email,password:a.password},{onError:ne=>{clearInterval(se),re(!1),E(0),j({general:ne.email||ne.password||"Email atau password salah!"})},onSuccess:()=>{E(100)}})},e[4]=a.email,e[5]=a.password,e[6]=z):z=e[6];const Z=z;let C;e[7]===Symbol.for("react.memo_cache_sentinel")?(C=t.jsx("style",{children:`
        @keyframes slideUp   { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shake     { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }
        @keyframes shimmer   { from{transform:translateX(-200%)} to{transform:translateX(200%)} }
        @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

        .anim-logo { animation:slideDown 0.5s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .anim-card { animation:slideUp   0.65s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
        .anim-foot { animation:slideUp   0.5s cubic-bezier(0.16,1,0.3,1) 0.5s both; }
        .deco-a    { animation:float 4s ease-in-out 0s infinite; }
        .deco-b    { animation:float 4s ease-in-out 1.2s infinite; }
        .deco-c    { animation:float 4s ease-in-out 2.4s infinite; }

        .grid-bg {
          position:fixed; inset:0; pointer-events:none;
          background-image:
            repeating-linear-gradient(0deg,var(--nb-primary) 0,var(--nb-primary) 1px,transparent 1px,transparent 48px),
            repeating-linear-gradient(90deg,var(--nb-primary) 0,var(--nb-primary) 1px,transparent 1px,transparent 48px);
          opacity:0.05;
        }

        .input-brutal {
          width:100%; border:4px solid var(--nb-primary); padding:12px 16px;
          font-weight:800; font-size:15px; color:var(--nb-primary);
          background:var(--nb-bg); outline:none; font-family:inherit;
          transition:box-shadow 0.15s ease, transform 0.12s ease, background 0.15s ease;
        }
        .input-brutal:focus { box-shadow:4px 4px 0 var(--nb-primary); transform:translate(-2px,-2px); background:#fff; }
        .input-brutal.has-err { background:#FFE8E8; }
        .input-brutal::placeholder { color:var(--nb-primary); opacity:0.3; font-weight:600; }

        .btn-submit {
          width:100%; border:4px solid var(--nb-primary); padding:14px;
          font-weight:900; font-size:15px; text-transform:uppercase; letter-spacing:0.1em;
          cursor:pointer; background:var(--nb-primary); color:var(--nb-accent);
          box-shadow:6px 6px 0 var(--nb-accent);
          transition:transform 0.08s ease, box-shadow 0.08s ease;
          font-family:inherit;
        }
        .btn-submit:hover:not(:disabled)  { transform:translate(2px,2px);  box-shadow:4px 4px 0 var(--nb-accent); }
        .btn-submit:active:not(:disabled) { transform:translate(5px,5px);  box-shadow:1px 1px 0 var(--nb-accent); }
        .btn-submit:disabled { opacity:0.7; cursor:not-allowed; }

        .show-btn {
          display:flex; align-items:center; gap:5px;
          border:2px solid var(--nb-primary); background:var(--nb-accent-light); padding:4px 10px;
          font-size:11px; font-weight:800; text-transform:uppercase; color:var(--nb-primary);
          cursor:pointer; letter-spacing:0.05em; font-family:inherit;
          transition:background 0.1s ease, transform 0.08s ease, box-shadow 0.08s ease;
        }
        .show-btn:hover { background:var(--nb-accent); transform:translate(-1px,-1px); box-shadow:2px 2px 0 var(--nb-primary); }

        .err-shake { animation:shake 0.4s ease; }
        .field-err {
          display:inline-block; margin-top:5px;
          font-size:11px; font-weight:800; color:var(--nb-primary); text-transform:uppercase; letter-spacing:0.05em;
          background:#FFD1D1; border:2px solid var(--nb-primary); padding:2px 8px;
        }

        .progress-wrap { height:4px; background:var(--nb-accent-light); }
        .progress-fill {
          height:100%; background:#9ECCFA; position:relative; overflow:hidden;
          transition:width 0.1s linear;
        }
        .progress-fill::after {
          content:''; position:absolute; inset:0;
          background:repeating-linear-gradient(90deg,transparent,transparent 8px,rgba(255,255,255,0.4) 8px,rgba(255,255,255,0.4) 16px);
          animation:shimmer 0.5s linear infinite;
        }
      `}),e[7]=C):C=e[7];const q=oe?1:0;let o;e[8]!==q?(o={opacity:q,transition:"opacity 0.35s ease"},e[8]=q,e[9]=o):o=e[9];let L,D,M,Y,A;e[10]===Symbol.for("react.memo_cache_sentinel")?(Y=t.jsx("div",{className:"grid-bg"}),A=t.jsx("div",{className:"deco-a absolute top-10 left-8 w-16 h-16 border-4 border-[#0B1957] bg-[#9ECCFA] shadow-[4px_4px_0_#0B1957] hidden md:block"}),L=t.jsx("div",{className:"deco-b absolute bottom-16 right-10 w-10 h-10 border-4 border-[#0B1957] bg-[#F8F3EA] shadow-[4px_4px_0_#0B1957] hidden md:block"}),D=t.jsx("div",{className:"deco-c absolute top-1/3 right-14 w-7 h-7 border-4 border-[#0B1957] bg-[#0B1957] hidden md:block"}),M=t.jsx("div",{className:"deco-a absolute bottom-28 left-16 w-5 h-5 border-4 border-[#0B1957] bg-[#9ECCFA] hidden md:block"}),e[10]=L,e[11]=D,e[12]=M,e[13]=Y,e[14]=A):(L=e[10],D=e[11],M=e[12],Y=e[13],A=e[14]);let X;e[15]===Symbol.for("react.memo_cache_sentinel")?(X=t.jsx("div",{className:"anim-logo mb-8 z-10",children:t.jsx("div",{onClick:ue,className:"cursor-pointer border-4 border-[var(--nb-primary)] bg-[var(--nb-primary)] px-6 py-3 shadow-[6px_6px_0_var(--nb-accent)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:translate-x-2 active:translate-y-2",children:t.jsx("span",{className:"font-black text-2xl text-[var(--nb-accent)] uppercase tracking-widest",children:"Naoo.id"})})}),e[15]=X):X=e[15];let $;e[16]===Symbol.for("react.memo_cache_sentinel")?($=t.jsxs("div",{className:"bg-[var(--nb-primary)] px-8 py-6",children:[t.jsx("p",{className:"text-[var(--nb-accent)] font-black uppercase text-xs tracking-[0.3em] mb-1",children:"Welcome Back"}),t.jsx("h1",{className:"text-3xl font-black uppercase text-[var(--nb-bg)]",children:"Login"})]}),e[16]=$):$=e[16];const G=`${me}%`;let l;e[17]!==G?(l=t.jsx("div",{className:"progress-wrap",children:t.jsx("div",{className:"progress-fill",style:{width:G}})}),e[17]=G,e[18]=l):l=e[18];let c;e[19]!==s.general?(c=s.general&&t.jsxs("div",{className:"err-shake border-4 border-[var(--nb-primary)] bg-[#FFD1D1] p-4 flex items-center gap-3",children:[t.jsx(pe,{}),t.jsx("p",{className:"font-black text-[var(--nb-primary)] text-sm uppercase tracking-wide",children:s.general})]}),e[19]=s.general,e[20]=c):c=e[20];let I;e[21]===Symbol.for("react.memo_cache_sentinel")?(I=t.jsx("label",{className:"font-black uppercase text-xs tracking-widest text-[#0B1957] block mb-2",children:"Email"}),e[21]=I):I=e[21];const J=`input-brutal ${s.email?"has-err":""}`;let m;e[22]!==a?(m=N=>{ae({...a,email:N.target.value}),j(he)},e[22]=a,e[23]=m):m=e[23];let p;e[24]!==a.email||e[25]!==n||e[26]!==J||e[27]!==m?(p=t.jsx("input",{className:J,type:"email",placeholder:"Masukkan email...",value:a.email,onChange:m,disabled:n,autoComplete:"email"}),e[24]=a.email,e[25]=n,e[26]=J,e[27]=m,e[28]=p):p=e[28];let d;e[29]!==s.email?(d=s.email&&t.jsx("span",{className:"field-err",children:s.email}),e[29]=s.email,e[30]=d):d=e[30];let b;e[31]!==p||e[32]!==d?(b=t.jsxs("div",{children:[I,p,d]}),e[31]=p,e[32]=d,e[33]=b):b=e[33];let P;e[34]===Symbol.for("react.memo_cache_sentinel")?(P=t.jsx("label",{className:"font-black uppercase text-xs tracking-widest text-[#0B1957]",children:"Password"}),e[34]=P):P=e[34];let W;e[35]===Symbol.for("react.memo_cache_sentinel")?(W=()=>ce(fe),e[35]=W):W=e[35];let x;e[36]!==_?(x=_?t.jsx(be,{}):t.jsx(de,{}),e[36]=_,e[37]=x):x=e[37];const K=_?"Hide":"Show";let f;e[38]!==x||e[39]!==K?(f=t.jsxs("div",{className:"flex items-center justify-between mb-2",children:[P,t.jsxs("button",{type:"button",className:"show-btn",onClick:W,children:[x,K]})]}),e[38]=x,e[39]=K,e[40]=f):f=e[40];const Q=`input-brutal ${s.password?"has-err":""}`,ee=_?"text":"password";let h;e[41]!==a?(h=N=>{ae({...a,password:N.target.value}),j(xe)},e[41]=a,e[42]=h):h=e[42];let u;e[43]!==a.password||e[44]!==n||e[45]!==Q||e[46]!==ee||e[47]!==h?(u=t.jsx("input",{className:Q,type:ee,placeholder:"Masukkan password...",value:a.password,onChange:h,disabled:n,autoComplete:"current-password"}),e[43]=a.password,e[44]=n,e[45]=Q,e[46]=ee,e[47]=h,e[48]=u):u=e[48];let g;e[49]!==s.password?(g=s.password&&t.jsx("span",{className:"field-err",children:s.password}),e[49]=s.password,e[50]=g):g=e[50];let v;e[51]!==f||e[52]!==u||e[53]!==g?(v=t.jsxs("div",{children:[f,u,g]}),e[51]=f,e[52]=u,e[53]=g,e[54]=v):v=e[54];const te=n?"Authenticating...":"Login →";let y;e[55]!==n||e[56]!==te?(y=t.jsx("button",{type:"submit",className:"btn-submit mt-1",disabled:n,children:te}),e[55]=n,e[56]=te,e[57]=y):y=e[57];let w;e[58]!==Z||e[59]!==c||e[60]!==b||e[61]!==v||e[62]!==y?(w=t.jsxs("form",{onSubmit:Z,className:"p-8 flex flex-col gap-5",children:[c,b,v,y]}),e[58]=Z,e[59]=c,e[60]=b,e[61]=v,e[62]=y,e[63]=w):w=e[63];let U;e[64]===Symbol.for("react.memo_cache_sentinel")?(U=t.jsx("div",{className:"h-3 bg-[var(--nb-accent)] border-t-4 border-[var(--nb-primary)]"}),e[64]=U):U=e[64];let k;e[65]!==l||e[66]!==w?(k=t.jsxs("div",{className:"anim-card w-full max-w-md bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[10px_10px_0_var(--nb-primary)] overflow-hidden z-10",children:[$,l,w,U]}),e[65]=l,e[66]=w,e[67]=k):k=e[67];let H;e[68]===Symbol.for("react.memo_cache_sentinel")?(H=t.jsxs("p",{className:"anim-foot mt-6 font-bold text-xs text-[var(--nb-primary)] uppercase tracking-widest opacity-50 z-10",children:["© ",new Date().getFullYear()," Zaki Yusron Hasyimmi"]}),e[68]=H):H=e[68];let O;return e[69]!==k||e[70]!==o?(O=t.jsxs(t.Fragment,{children:[C,t.jsxs("div",{className:"min-h-screen bg-[var(--nb-accent-light)] flex flex-col items-center justify-center px-4 relative overflow-hidden",style:o,children:[Y,A,L,D,M,X,k,H]})]}),e[69]=k,e[70]=o,e[71]=O):O=e[71],O}function xe(e){return{...e,password:void 0}}function fe(e){return!e}function he(e){return{...e,email:void 0}}function ue(){return ie.visit("/")}export{ye as default};
