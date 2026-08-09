import{c as fe,r as i,j as t,a as se,H as xe}from"./app-I91K9lxT.js";/* empty css            */function we(){const e=fe.c(85);let C;e[0]===Symbol.for("react.memo_cache_sentinel")?(C={name:"",email:"",password:"",password_confirmation:""},e[0]=C):C=e[0];const[a,z]=i.useState(C);let E;e[1]===Symbol.for("react.memo_cache_sentinel")?(E={},e[1]=E):E=e[1];const[n,ie]=i.useState(E),[r,le]=i.useState(!1),[ce,me]=i.useState(!1),[G,pe]=i.useState(!1),[de,F]=i.useState(0);let X,R;e[2]===Symbol.for("react.memo_cache_sentinel")?(X=()=>{setTimeout(()=>me(!0),50)},R=[],e[2]=X,e[3]=R):(X=e[2],R=e[3]),i.useEffect(X,R);let Y;e[4]!==a?(Y=s=>{s?.preventDefault(),ie({}),le(!0);let B=0;const oe=setInterval(()=>{B=B+Math.random()*15,B>=85?(clearInterval(oe),F(85)):F(Math.round(B))},80);se.post("/register",a,{onError:be=>{clearInterval(oe),le(!1),F(0),ie(be)},onSuccess:()=>{F(100)}})},e[4]=a,e[5]=Y):Y=e[5];const J=Y;let D,P;e[6]===Symbol.for("react.memo_cache_sentinel")?(D=t.jsx(xe,{title:"Register - Create Account"}),P=t.jsx("style",{children:`
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

        .grid-bg {
          position:fixed; inset:0; pointer-events:none;
          background-image:
            repeating-linear-gradient(0deg,var(--nb-primary) 0,var(--nb-primary) 1px,transparent 1px,transparent 48px),
            repeating-linear-gradient(90deg,var(--nb-primary) 0,var(--nb-primary) 1px,transparent 1px,transparent 48px);
          opacity:0.05;
        }

        .input-brutal {
          width:100%; border:4px solid var(--nb-primary); padding:12px 16px;
          font-weight:800; font-size:14px; color:var(--nb-primary);
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
          font-size:10px; font-weight:800; text-transform:uppercase; color:var(--nb-primary);
          cursor:pointer; letter-spacing:0.05em; font-family:inherit;
        }

        .err-shake { animation:shake 0.4s ease; }
        .field-err {
          display:inline-block; margin-top:5px;
          font-size:10px; font-weight:800; color:var(--nb-primary); text-transform:uppercase;
          background:#FFD1D1; border:2px solid var(--nb-primary); padding:2px 8px;
        }

        .progress-wrap { height:4px; background:var(--nb-accent-light); }
        .progress-fill {
          height:100%; background:var(--nb-accent); position:relative; overflow:hidden;
          transition:width 0.1s linear;
        }
      `}),e[6]=D,e[7]=P):(D=e[6],P=e[7]);const O=ce?1:0;let l;e[8]!==O?(l={opacity:O,transition:"opacity 0.35s ease"},e[8]=O,e[9]=l):l=e[9];let $;e[10]===Symbol.for("react.memo_cache_sentinel")?($=t.jsx("div",{className:"grid-bg"}),e[10]=$):$=e[10];let A;e[11]===Symbol.for("react.memo_cache_sentinel")?(A=t.jsx("div",{className:"anim-logo mb-8 z-10",children:t.jsx("div",{onClick:ve,className:"cursor-pointer border-4 border-[var(--nb-primary)] bg-[var(--nb-primary)] px-6 py-3 shadow-[6px_6px_0_var(--nb-accent)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:translate-x-2 active:translate-y-2",children:t.jsx("span",{className:"font-black text-2xl text-[var(--nb-accent)] uppercase tracking-widest",children:"Naoo.id"})})}),e[11]=A):A=e[11];let H;e[12]===Symbol.for("react.memo_cache_sentinel")?(H=t.jsxs("div",{className:"bg-[var(--nb-primary)] px-8 py-6",children:[t.jsx("p",{className:"text-[var(--nb-accent)] font-black uppercase text-xs tracking-[0.3em] mb-1",children:"Create Account"}),t.jsx("h1",{className:"text-3xl font-black uppercase text-[var(--nb-bg)]",children:"Register"})]}),e[12]=H):H=e[12];const Q=`${de}%`;let o;e[13]!==Q?(o=t.jsx("div",{className:"progress-wrap",children:t.jsx("div",{className:"progress-fill",style:{width:Q}})}),e[13]=Q,e[14]=o):o=e[14];let I;e[15]===Symbol.for("react.memo_cache_sentinel")?(I=t.jsx("label",{className:"font-black uppercase text-[10px] tracking-widest text-[var(--nb-primary)] block mb-1.5",children:"Full Name"}),e[15]=I):I=e[15];const W=`input-brutal ${n.name?"has-err":""}`;let c;e[16]!==a?(c=s=>z({...a,name:s.target.value}),e[16]=a,e[17]=c):c=e[17];let m;e[18]!==a.name||e[19]!==r||e[20]!==W||e[21]!==c?(m=t.jsx("input",{className:W,type:"text",placeholder:"Nama lengkap...",value:a.name,onChange:c,disabled:r}),e[18]=a.name,e[19]=r,e[20]=W,e[21]=c,e[22]=m):m=e[22];let p;e[23]!==n.name?(p=n.name&&t.jsx("span",{className:"field-err",children:n.name}),e[23]=n.name,e[24]=p):p=e[24];let d;e[25]!==m||e[26]!==p?(d=t.jsxs("div",{children:[I,m,p]}),e[25]=m,e[26]=p,e[27]=d):d=e[27];let U;e[28]===Symbol.for("react.memo_cache_sentinel")?(U=t.jsx("label",{className:"font-black uppercase text-[10px] tracking-widest text-[var(--nb-primary)] block mb-1.5",children:"Email Address"}),e[28]=U):U=e[28];const Z=`input-brutal ${n.email?"has-err":""}`;let b;e[29]!==a?(b=s=>z({...a,email:s.target.value}),e[29]=a,e[30]=b):b=e[30];let f;e[31]!==a.email||e[32]!==r||e[33]!==Z||e[34]!==b?(f=t.jsx("input",{className:Z,type:"email",placeholder:"email@example.com",value:a.email,onChange:b,disabled:r}),e[31]=a.email,e[32]=r,e[33]=Z,e[34]=b,e[35]=f):f=e[35];let x;e[36]!==n.email?(x=n.email&&t.jsx("span",{className:"field-err",children:n.email}),e[36]=n.email,e[37]=x):x=e[37];let h;e[38]!==f||e[39]!==x?(h=t.jsxs("div",{children:[U,f,x]}),e[38]=f,e[39]=x,e[40]=h):h=e[40];let L;e[41]===Symbol.for("react.memo_cache_sentinel")?(L=t.jsx("label",{className:"font-black uppercase text-[10px] tracking-widest text-[var(--nb-primary)]",children:"Password"}),e[41]=L):L=e[41];let M;e[42]===Symbol.for("react.memo_cache_sentinel")?(M=()=>pe(ue),e[42]=M):M=e[42];const ee=G?"Hide":"Show";let u;e[43]!==ee?(u=t.jsxs("div",{className:"flex items-center justify-between mb-1.5",children:[L,t.jsx("button",{type:"button",className:"show-btn",onClick:M,children:ee})]}),e[43]=ee,e[44]=u):u=e[44];const te=`input-brutal ${n.password?"has-err":""}`,ae=G?"text":"password";let v;e[45]!==a?(v=s=>z({...a,password:s.target.value}),e[45]=a,e[46]=v):v=e[46];let g;e[47]!==a.password||e[48]!==r||e[49]!==te||e[50]!==ae||e[51]!==v?(g=t.jsx("input",{className:te,type:ae,placeholder:"••••••••",value:a.password,onChange:v,disabled:r}),e[47]=a.password,e[48]=r,e[49]=te,e[50]=ae,e[51]=v,e[52]=g):g=e[52];let y;e[53]!==n.password?(y=n.password&&t.jsx("span",{className:"field-err",children:n.password}),e[53]=n.password,e[54]=y):y=e[54];let w;e[55]!==u||e[56]!==g||e[57]!==y?(w=t.jsxs("div",{children:[u,g,y]}),e[55]=u,e[56]=g,e[57]=y,e[58]=w):w=e[58];let K;e[59]===Symbol.for("react.memo_cache_sentinel")?(K=t.jsx("label",{className:"font-black uppercase text-[10px] tracking-widest text-[var(--nb-primary)] block mb-1.5",children:"Confirm Password"}),e[59]=K):K=e[59];const re=G?"text":"password";let _;e[60]!==a?(_=s=>z({...a,password_confirmation:s.target.value}),e[60]=a,e[61]=_):_=e[61];let k;e[62]!==a.password_confirmation||e[63]!==r||e[64]!==re||e[65]!==_?(k=t.jsxs("div",{children:[K,t.jsx("input",{className:"input-brutal",type:re,placeholder:"••••••••",value:a.password_confirmation,onChange:_,disabled:r})]}),e[62]=a.password_confirmation,e[63]=r,e[64]=re,e[65]=_,e[66]=k):k=e[66];const ne=r?"Creating account...":"Register →";let j;e[67]!==r||e[68]!==ne?(j=t.jsx("button",{type:"submit",className:"btn-submit mt-2",disabled:r,children:ne}),e[67]=r,e[68]=ne,e[69]=j):j=e[69];let T;e[70]===Symbol.for("react.memo_cache_sentinel")?(T=t.jsxs("div",{className:"mt-2 text-center border-t-2 border-dashed border-[var(--nb-primary)] pt-4 opacity-70",children:[t.jsx("p",{className:"font-bold text-[10px] uppercase text-[var(--nb-primary)] mb-2",children:"Sudah punya akun?"}),t.jsx("button",{type:"button",onClick:he,className:"font-black text-xs uppercase text-[var(--nb-primary)] border-b-2 border-[var(--nb-primary)] hover:text-[var(--nb-accent)] hover:border-[var(--nb-accent)] transition-all",children:"Kembali ke Login"})]}),e[70]=T):T=e[70];let N;e[71]!==J||e[72]!==d||e[73]!==h||e[74]!==w||e[75]!==k||e[76]!==j?(N=t.jsxs("form",{onSubmit:J,className:"p-8 flex flex-col gap-4",children:[d,h,w,k,j,T]}),e[71]=J,e[72]=d,e[73]=h,e[74]=w,e[75]=k,e[76]=j,e[77]=N):N=e[77];let V;e[78]===Symbol.for("react.memo_cache_sentinel")?(V=t.jsx("div",{className:"h-3 bg-[var(--nb-accent)] border-t-4 border-[var(--nb-primary)]"}),e[78]=V):V=e[78];let S;e[79]!==o||e[80]!==N?(S=t.jsxs("div",{className:"anim-card w-full max-w-md bg-[var(--nb-bg)] border-4 border-[var(--nb-primary)] shadow-[10px_10px_0_var(--nb-primary)] overflow-hidden z-10",children:[H,o,N,V]}),e[79]=o,e[80]=N,e[81]=S):S=e[81];let q;return e[82]!==S||e[83]!==l?(q=t.jsxs(t.Fragment,{children:[D,P,t.jsxs("div",{className:"min-h-screen bg-[var(--nb-accent-light)] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden",style:l,children:[$,A,S]})]}),e[82]=S,e[83]=l,e[84]=q):q=e[84],q}function he(){return se.visit("/login")}function ue(e){return!e}function ve(){return se.visit("/")}export{we as default};
