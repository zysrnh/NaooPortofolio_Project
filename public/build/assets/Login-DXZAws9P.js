import{c as V,r as i,j as t,a as re}from"./app-Dx90k9lJ.js";/* empty css            */const de=()=>{const e=V.c(1);let r;return e[0]===Symbol.for("react.memo_cache_sentinel")?(r=t.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"#0B1957",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[t.jsx("path",{d:"M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"}),t.jsx("line",{x1:"12",y1:"9",x2:"12",y2:"13"}),t.jsx("line",{x1:"12",y1:"17",x2:"12.01",y2:"17"})]}),e[0]=r):r=e[0],r},be=()=>{const e=V.c(1);let r;return e[0]===Symbol.for("react.memo_cache_sentinel")?(r=t.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"#0B1957",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[t.jsx("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),t.jsx("circle",{cx:"12",cy:"12",r:"3"})]}),e[0]=r):r=e[0],r},xe=()=>{const e=V.c(1);let r;return e[0]===Symbol.for("react.memo_cache_sentinel")?(r=t.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"#0B1957",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:[t.jsx("path",{d:"M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"}),t.jsx("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]}),e[0]=r):r=e[0],r};function ke(){const e=V.c(73);let r;e[0]===Symbol.for("react.memo_cache_sentinel")?(r={email:"",password:""},e[0]=r):r=e[0];const[a,ne]=i.useState(r);let S;e[1]===Symbol.for("react.memo_cache_sentinel")?(S={},e[1]=S):S=e[1];const[n,j]=i.useState(S),[s,se]=i.useState(!1),[le,ce]=i.useState(!1),[_,me]=i.useState(!1),[pe,E]=i.useState(0);let B,F;e[2]===Symbol.for("react.memo_cache_sentinel")?(B=()=>{setTimeout(()=>ce(!0),50)},F=[],e[2]=B,e[3]=F):(B=e[2],F=e[3]),i.useEffect(B,F);let C;e[4]!==a.email||e[5]!==a.password?(C=N=>{N?.preventDefault();const Z={};if(a.email||(Z.email="Email wajib diisi!"),a.password||(Z.password="Password wajib diisi!"),Object.keys(Z).length){j(Z);return}j({}),se(!0);let T=0;const ie=setInterval(()=>{T=T+Math.random()*18,T>=85?(clearInterval(ie),E(85)):E(Math.round(T))},80);re.post("/login",{email:a.email,password:a.password},{onError:oe=>{clearInterval(ie),se(!1),E(0),j({general:oe.email||oe.password||"Email atau password salah!"})},onSuccess:()=>{E(100)}})},e[4]=a.email,e[5]=a.password,e[6]=C):C=e[6];const q=C;let z;e[7]===Symbol.for("react.memo_cache_sentinel")?(z=t.jsx("style",{children:`
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
      `}),e[7]=z):z=e[7];const G=le?1:0;let o;e[8]!==G?(o={opacity:G,transition:"opacity 0.35s ease"},e[8]=G,e[9]=o):o=e[9];let L,D,Y,M,A;e[10]===Symbol.for("react.memo_cache_sentinel")?(M=t.jsx("div",{className:"grid-bg"}),A=t.jsx("div",{className:"deco-a absolute top-10 left-8 w-16 h-16 border-4 border-[#0B1957] bg-[#9ECCFA] shadow-[4px_4px_0_#0B1957] hidden md:block"}),L=t.jsx("div",{className:"deco-b absolute bottom-16 right-10 w-10 h-10 border-4 border-[#0B1957] bg-[#F8F3EA] shadow-[4px_4px_0_#0B1957] hidden md:block"}),D=t.jsx("div",{className:"deco-c absolute top-1/3 right-14 w-7 h-7 border-4 border-[#0B1957] bg-[#0B1957] hidden md:block"}),Y=t.jsx("div",{className:"deco-a absolute bottom-28 left-16 w-5 h-5 border-4 border-[#0B1957] bg-[#9ECCFA] hidden md:block"}),e[10]=L,e[11]=D,e[12]=Y,e[13]=M,e[14]=A):(L=e[10],D=e[11],Y=e[12],M=e[13],A=e[14]);let X;e[15]===Symbol.for("react.memo_cache_sentinel")?(X=t.jsx("div",{className:"anim-logo mb-8 z-10",children:t.jsx("div",{onClick:ve,className:"cursor-pointer border-4 border-[var(--nb-primary)] bg-[var(--nb-primary)] px-6 py-3 shadow-[6px_6px_0_var(--nb-accent)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:translate-x-2 active:translate-y-2",children:t.jsx("span",{className:"font-black text-2xl text-[var(--nb-accent)] uppercase tracking-widest",children:"ZYSRNH"})})}),e[15]=X):X=e[15];let $;e[16]===Symbol.for("react.memo_cache_sentinel")?($=t.jsxs("div",{className:"bg-[var(--nb-primary)] px-8 py-6",children:[t.jsx("p",{className:"text-[var(--nb-accent)] font-black uppercase text-xs tracking-[0.3em] mb-1",children:"Welcome Back"}),t.jsx("h1",{className:"text-3xl font-black uppercase text-[var(--nb-bg)]",children:"Login"})]}),e[16]=$):$=e[16];const J=`${pe}%`;let l;e[17]!==J?(l=t.jsx("div",{className:"progress-wrap",children:t.jsx("div",{className:"progress-fill",style:{width:J}})}),e[17]=J,e[18]=l):l=e[18];let c;e[19]!==n.general?(c=n.general&&t.jsxs("div",{className:"err-shake border-4 border-[var(--nb-primary)] bg-[#FFD1D1] p-4 flex items-center gap-3",children:[t.jsx(de,{}),t.jsx("p",{className:"font-black text-[var(--nb-primary)] text-sm uppercase tracking-wide",children:n.general})]}),e[19]=n.general,e[20]=c):c=e[20];let I;e[21]===Symbol.for("react.memo_cache_sentinel")?(I=t.jsx("label",{className:"font-black uppercase text-xs tracking-widest text-[#0B1957] block mb-2",children:"Email"}),e[21]=I):I=e[21];const K=`input-brutal ${n.email?"has-err":""}`;let m;e[22]!==a?(m=N=>{ne({...a,email:N.target.value}),j(ge)},e[22]=a,e[23]=m):m=e[23];let p;e[24]!==a.email||e[25]!==s||e[26]!==K||e[27]!==m?(p=t.jsx("input",{className:K,type:"email",placeholder:"Masukkan email...",value:a.email,onChange:m,disabled:s,autoComplete:"email"}),e[24]=a.email,e[25]=s,e[26]=K,e[27]=m,e[28]=p):p=e[28];let d;e[29]!==n.email?(d=n.email&&t.jsx("span",{className:"field-err",children:n.email}),e[29]=n.email,e[30]=d):d=e[30];let b;e[31]!==p||e[32]!==d?(b=t.jsxs("div",{children:[I,p,d]}),e[31]=p,e[32]=d,e[33]=b):b=e[33];let P;e[34]===Symbol.for("react.memo_cache_sentinel")?(P=t.jsx("label",{className:"font-black uppercase text-xs tracking-widest text-[#0B1957]",children:"Password"}),e[34]=P):P=e[34];let W;e[35]===Symbol.for("react.memo_cache_sentinel")?(W=()=>me(ue),e[35]=W):W=e[35];let x;e[36]!==_?(x=_?t.jsx(xe,{}):t.jsx(be,{}),e[36]=_,e[37]=x):x=e[37];const Q=_?"Hide":"Show";let f;e[38]!==x||e[39]!==Q?(f=t.jsxs("div",{className:"flex items-center justify-between mb-2",children:[P,t.jsxs("button",{type:"button",className:"show-btn",onClick:W,children:[x,Q]})]}),e[38]=x,e[39]=Q,e[40]=f):f=e[40];const ee=`input-brutal ${n.password?"has-err":""}`,te=_?"text":"password";let h;e[41]!==a?(h=N=>{ne({...a,password:N.target.value}),j(he)},e[41]=a,e[42]=h):h=e[42];let u;e[43]!==a.password||e[44]!==s||e[45]!==ee||e[46]!==te||e[47]!==h?(u=t.jsx("input",{className:ee,type:te,placeholder:"Masukkan password...",value:a.password,onChange:h,disabled:s,autoComplete:"current-password"}),e[43]=a.password,e[44]=s,e[45]=ee,e[46]=te,e[47]=h,e[48]=u):u=e[48];let g;e[49]!==n.password?(g=n.password&&t.jsx("span",{className:"field-err",children:n.password}),e[49]=n.password,e[50]=g):g=e[50];let v;e[51]!==f||e[52]!==u||e[53]!==g?(v=t.jsxs("div",{children:[f,u,g]}),e[51]=f,e[52]=u,e[53]=g,e[54]=v):v=e[54];const ae=s?"Authenticating...":"Login →";let y;e[55]!==s||e[56]!==ae?(y=t.jsx("button",{type:"submit",className:"btn-submit mt-1",disabled:s,children:ae}),e[55]=s,e[56]=ae,e[57]=y):y=e[57];let H;e[58]===Symbol.for("react.memo_cache_sentinel")?(H=t.jsxs("div",{className:"mt-4 text-center",children:[t.jsx("p",{className:"font-bold text-[10px] uppercase text-[var(--nb-primary)] opacity-50 mb-2",children:"Belum punya akun?"}),t.jsx("button",{type:"button",onClick:fe,className:"font-black text-xs uppercase text-[var(--nb-primary)] border-b-2 border-[var(--nb-primary)] hover:text-[var(--nb-accent)] hover:border-[var(--nb-accent)] transition-all",children:"Daftar Sekarang →"})]}),e[58]=H):H=e[58];let w;e[59]!==q||e[60]!==c||e[61]!==b||e[62]!==v||e[63]!==y?(w=t.jsxs("form",{onSubmit:q,className:"p-8 flex flex-col gap-5",children:[c,b,v,y,H]}),e[59]=q,e[60]=c,e[61]=b,e[62]=v,e[63]=y,e[64]=w):w=e[64];let R;e[65]===Symbol.for("react.memo_cache_sentinel")?(R=t.jsx("div",{className:"h-3 bg-[var(--nb-accent)] border-t-4 border-[var(--nb-primary)]"}),e[65]=R):R=e[65];let k;e[66]!==l||e[67]!==w?(k=t.jsxs("div",{className:"anim-card w-full max-w-md bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[10px_10px_0_var(--nb-primary)] overflow-hidden z-10",children:[$,l,w,R]}),e[66]=l,e[67]=w,e[68]=k):k=e[68];let U;e[69]===Symbol.for("react.memo_cache_sentinel")?(U=t.jsxs("p",{className:"anim-foot mt-6 font-bold text-xs text-[var(--nb-primary)] uppercase tracking-widest opacity-50 z-10",children:["© ",new Date().getFullYear()," Zaki Yusron Hasyimmi"]}),e[69]=U):U=e[69];let O;return e[70]!==k||e[71]!==o?(O=t.jsxs(t.Fragment,{children:[z,t.jsxs("div",{className:"min-h-screen bg-[var(--nb-accent-light)] flex flex-col items-center justify-center px-4 relative overflow-hidden",style:o,children:[M,A,L,D,Y,X,k,U]})]}),e[70]=k,e[71]=o,e[72]=O):O=e[72],O}function fe(){return re.visit("/register")}function he(e){return{...e,password:void 0}}function ue(e){return!e}function ge(e){return{...e,email:void 0}}function ve(){return re.visit("/")}export{ke as default};
