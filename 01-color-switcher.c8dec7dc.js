const t={btnStart:document.querySelector("button[data-start]"),btnStop:document.querySelector("button[data-stop]")};let n=null;t.btnStop.disabled=!1,t.btnStart.addEventListener("click",(function(){n=setInterval((()=>{t.btnStop.disabled=!1,t.btnStart.disabled=!0,document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)})),t.btnStop.addEventListener("click",(function(){t.btnStop.disabled=!0,t.btnStart.disabled=!1,clearInterval(n)})),t.btnStop.disabled=!0;
//# sourceMappingURL=01-color-switcher.c8dec7dc.js.map
