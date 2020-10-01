/*  v1.0.0  */
var n;const t=document.createElement("template");t.innerHTML="\n<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.1/codemirror.min.css\">\n<style>\n    :host {\n      display: block;\n      font-family:-apple-system, BlinkMacSystemFont, \"Segoe UI\",\n        Roboto, Oxygen-Sans, Ubuntu, Cantarell,\n        \"Helvetica Neue\", \"Source Sans Pro\", sans-serif;\n      line-height: 1.5;\n    }\n    :host([hidden]) {\n      display: none;\n    }\n    :host > div {\n      display: flex;\n      flex-flow: row;\n      width: 100%;\n      height: 100%;\n      margin-left: 0;\n      margin-right: 0;\n      justify-content: center;\n      align-items: center;\n    }\n    :host > div.stack-layout {\n      display: block;\n    }\n    .original-content {\n      display: none;\n    }\n    .source {\n      display: flex;\n      flex-flow: column;\n      justify-content: space-between;\n      margin-top: 0;\n      margin-bottom: 0;\n      margin-right: .5em;\n      width: calc(50% - .5em);\n      height: 100%;\n      min-width: 300px;\n      padding: 8px;\n      border-radius: 8px;\n      background: #35434e;\n    }\n    textarea {\n      display: block;\n      border: 1px solid rgba(0,0,0,.25);\n      outline: none;\n      resize: vertical;\n      width: 100%;\n      min-height: 4em;\n      font-family: 'JetBrains Mono', 'IBM Plex Mono', 'Fira Code', 'Source Code Pro',  monospace;\n      font-size: 16px;\n      line-height: 1.2;\n    }\n    .source textarea {\n      color: #c5c8c6;\n      background: #35434e;\n      border: none;\n      height: 100%;\n    }\n    .result {\n      width: calc(50% - .5em);\n      margin-left: .5em;\n    }\n    .output {\n      border-radius: 8px;\n      padding: 8px;\n      border: 1px solid rgba(0, 0, 0, .2);\n    }\n    .output textarea {\n      width: calc(100% - 16px);\n    }\n    .stack-layout .source, .stack-layout .result {\n      width: auto;\n      margin: 0;\n      background: transparent\n    }\n    .stack-layout .source {\n      border: 1px solid rgba(0, 0, 0, .2);\n      padding: 0;\n    }\n    .stack-layout .result  {\n      margin-top: 2em;\n    }\n    .stack-layout [type=radio]:checked ~ label {\n      color: #666;\n    }\n    .console {\n      max-height: 50vh;\n      padding: 8px;\n      border-radius: 8px;\n      overflow: auto;\n      font-size: 14px;\n      color: #c5c8c6;\n      background: #35434e;\n      white-space: pre-wrap;\n      border: 1px solid rgba(0, 0, 0, .2);\n    }\n    .console .sep {\n      color: #c5c8c6;\n    }\n    .console .index {\n      color: #c5c8c6;\n      opacity: .3;\n      float: left;\n      width: 0;\n      font-style: italic;\n    }\n    .console .boolean {\n      color: #b294bb;\n      font-weight: bold;\n    }\n    .console .empty {\n      color: #b294bb;\n      font-style: italic;\n    }\n    .console .null {\n      color: #b294bb;\n      font-style: italic;\n    }\n    .console .string {\n      color: #f0c674;\n      font-weight: bold;\n    }\n    .console .function {\n      color: #b5bd68;\n    }\n    .console .number {\n      color: #b294bb;\n    }\n    .console .property {\n      color: #b5bd68\n    }\n    .console .error {\n      display: block;\n      width: calc(100% - 8px);\n      padding: 4px;\n      background: #cc6666;\n      color: white;\n    }\n    .console .warning {\n      color: #f0c674\n    }\n    .console .group {\n      font-weight: bold;\n    }\n    \n    .tabs {\n      position: relative;   \n      display: flex;\n      flex-flow: row;\n      justify-content: center;\n      min-height: 200px;\n      height: 100%;\n      clear: both;\n      --tab-indicator-offset: 0;\n    }\n    .stack-layout .tabs {\n      flex-flow: column;\n    }\n    .stack-layout .tab {\n      height: auto;\n      background: transparent;\n    }\n    .stack-layout .tab:first-of-type:after {\n      display: none;\n    }\n    .stack-layout .tab:first-child, .stack-layout .tab:last-child {\n      border: none;\n      border-radius: 0;\n      padding-left: 8px;\n      padding-right: 8px;\n      padding-bottom: .5em;\n      margin-left: -8px;\n      margin-right: -8px;\n      margin-bottom: .5em;\n      margin-top: -8px;\n    }\n    .stack-layout .tab:first-child {\n      border-top-left-radius: 36px;\n      border-top-right-radius: 36px\n    }\n    .stack-layout .content {\n      visibility: visible;\n      position: relative;\n      top: auto;\n      left: auto;\n      bottom: auto;\n      padding-left: 1em;\n      background: #35434e\n    }\n    .stack-layout .tab > label {\n      display: block;\n      position: relative;\n      height: auto;\n      text-align: left;\n      padding-left: 1em;\n      padding-top: 1em;\n      padding-bottom: .5em;\n      color: #666;\n    }\n    .stack-layout .tab > input[type=\"radio\"] {\n      visibility: hidden;\n    }\n    .tab {\n      min-width: 150px;\n      border-color: #373b41;\n      background: #282a2e;\n      border-style: solid;\n      border-top-width: 1px;\n      border-bottom-width: 1px;\n      height: 36px;\n      border-left: none;\n      border-right: none;\n      box-sizing: content-box;\n    }\n\n    .tab:first-child {\n        border-top-left-radius: 36px;\n        border-bottom-left-radius: 36px;\n        border-left-width: 1px;\n        border-left-style: solid;\n        border-left-color: #373b41;\n    }\n\n    .tab:last-child {\n      border-top-right-radius: 36px;\n      border-bottom-right-radius: 36px;\n      border-right-width: 1px;\n      border-right-style: solid;\n      border-right-color: #373b41;\n    }\n    .tab:first-of-type:after {\n      content: '';\n      display: block;\n      position: relative;\n      width: 144px;\n      margin: 0;\n      top: 3px;\n      height: 30px;\n      left: calc(3px + var(--tab-indicator-offset));\n      z-index: 0;\n      border-radius: 36px;\n      background: #35434e;\n      transition-property: left;\n      transition-duration: 200ms;\n      transition-timing-function: ease-in-out;\n    }\n    .tab label {\n      position: absolute;\n      width: 150px;\n      height: 36px;\n      padding-top: 8px;\n      padding-bottom: 6px;\n      font-weight: 700;\n      letter-spacing: 0.5px;\n      font-size: 14px;\n      text-transform: uppercase;\n      text-align: center;\n      color: #c5c8c6;\n      user-select: none;\n      z-index: 1;\n    }\n    .tab [type=radio] {\n      display: none;   \n    }\n    .content {\n      visibility: hidden;\n      position: absolute;\n      top: 38px;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      font-size: 14px;\n    }\n    [type=radio]:hover ~ label {\n      color: #fff;\n    }\n    [type=radio]:checked ~ label {\n      color: #fff;\n      z-index: 2;\n    }\n    [type=radio]:checked ~ label ~ .content {\n      z-index: 1;\n      visibility: visible;\n    }\n    .buttons {\n      display: flex;\n      justify-content: space-between;\n      padding-left: 1em;\n      padding-right: 1em;\n      padding-bottom: .5em;\n    }\n    .button {\n      display: inline-block;\n      margin-bottom: 0.25em;\n      padding: 0.5em 1em;\n      font-size: 14px;\n      min-height: 30px;\n      margin-top: 6px;\n      margin-bottom: 6px;\n      font-weight: 700;\n      text-align: center;\n      text-decoration: none;\n      border-radius: 4px;\n      cursor: pointer;\n      user-select: none;\n      text-transform: uppercase;\n      outline: none;\n      background: #282a2e;\n      color: #c5c8c6;\n      border: 1px solid #111;\n    }\n    .stack-layout .button {\n      color: #333;\n      background: transparent;\n      border: 1px solid #ccc;\n    }\n    .button:disabled {\n      opacity: .5;\n    }\n    .button svg {\n      height: 1em;\n      width: 1em;\n      margin-right: .55em;\n      vertical-align: -.12em;\n    }\n    .button:enabled:hover, .button:enabled:active {\n      color: #0066ce;\n      border: 1px solid #0066ce;\n    }\n    .button:enabled:active {\n      color: #fff;\n      background: #0066ce;\n      border: 1px solid #0066ce;\n    }\n    .mathfield {\n      display: block;\n      border: 1px solid #ccc;\n      border-radius: 8px;\n      padding: .5em;\n      font-size: 2rem;\n      background: #fff;\n    }\n    @media (max-width: 777px) { \n      :host > div {\n          flex-flow: column;\n      }\n      .source, .result {\n          width: calc(100% - 1em);\n          margin-left: .5em;\n          margin-right: .5em;\n          margin-top: .5em;\n          margin-bottom: .5em;\n      }\n    }\n\n\n    /* Tomorrow Comment */\n    .hljs-comment,\n    .hljs-title {\n        color: #b4b7b4;\n        font-style: italic;\n    }\n    \n    /* Tomorrow Red */\n    .hljs-variable,\n    .hljs-attribute,\n    .hljs-tag,\n    .hljs-regexp,\n    .ruby .hljs-constant,\n    .xml .hljs-tag .hljs-title,\n    .xml .hljs-pi,\n    .xml .hljs-doctype,\n    .html .hljs-doctype,\n    .css .hljs-id,\n    .css .hljs-class,\n    .css .hljs-pseudo {\n        color: #cc6666;\n    }\n    \n    /* Tomorrow Orange */\n    .hljs-number,\n    .hljs-preprocessor,\n    .hljs-built_in,\n    .hljs-literal,\n    .hljs-params,\n    .hljs-constant {\n        color: #de935f;\n        font-weight: normal;\n    }\n    \n    /* Tomorrow Yellow */\n    .ruby .hljs-class .hljs-title,\n    .css .hljs-rules .hljs-attribute {\n        color: #f0c674;\n    }\n    \n    /* Tomorrow Green */\n    .hljs-string,\n    .hljs-value,\n    .hljs-inheritance,\n    .hljs-header,\n    .ruby .hljs-symbol,\n    .xml .hljs-cdata {\n        color: #b5bd68;\n    }\n    \n    /* Tomorrow Aqua */\n    .css .hljs-hexcolor {\n        color: #8abeb7;\n    }\n    \n    /* Tomorrow Blue */\n    .hljs-function,\n    .python .hljs-decorator,\n    .python .hljs-title,\n    .ruby .hljs-function .hljs-title,\n    .ruby .hljs-title .hljs-keyword,\n    .perl .hljs-sub,\n    .javascript .hljs-title,\n    .coffeescript .hljs-title {\n        color: #81a2be;\n        font-weight: bold;\n    }\n    \n    /* Tomorrow Purple */\n    .hljs-keyword,\n    .javascript .hljs-function {\n        color: #b294bb;\n        font-weight: bold;\n    }\n    \n    .hljs {\n        display: block;\n        background: #35434e;\n        color: #c5c8c6;\n        padding: 0.5em;\n    }\n    \n    .coffeescript .javascript,\n    .javascript .xml,\n    .tex .hljs-formula,\n    .xml .javascript,\n    .xml .vbscript,\n    .xml .css,\n    .xml .hljs-cdata {\n        opacity: 0.5;\n    }\n    \n    // Roughe typographic adjustments.\n    // See https://github.com/rouge-ruby/rouge/wiki/List-of-tokens\n    \n    .highlight .c1,     // Single line comment\n    .highlight .cm      // Multiline comment\n     {\n        font-style: italic;\n    }\n    \n    .highlight .k,       // keywords\n    .highlight .kc,       // keywords constant\n    .highlight .kd,       // keywords declaration\n    .highlight .kn,       // keywords namespace\n    .highlight .kp,       // keywords pseudi\n    .highlight .kr,       // keywords reserved\n    .highlight .kt,       // keywords type\n    .highlight .kv       // keywords variable\n     {\n        font-weight: bold;\n    }\n    \n    .CodeMirror {\n      font-family: 'JetBrains Mono', 'IBM Plex Mono', 'Fira Code', 'Source Code Pro',  monospace;\n    }\n    .cm-s-tomorrow-night.CodeMirror { background: #35434e; color: #c5c8c6; }\n    .cm-s-tomorrow-night div.CodeMirror-selected { background: #282a2e; }\n    .cm-s-tomorrow-night .CodeMirror-line::selection, .cm-s-tomorrow-night .CodeMirror-line > span::selection, .cm-s-tomorrow-night .CodeMirror-line > span > span::selection { background: rgba(45, 45, 45, 0.99); }\n    .cm-s-tomorrow-night .CodeMirror-line::-moz-selection, .cm-s-tomorrow-night .CodeMirror-line > span::-moz-selection, .cm-s-tomorrow-night .CodeMirror-line > span > span::-moz-selection { background: rgba(45, 45, 45, 0.99); }\n    .cm-s-tomorrow-night .CodeMirror-gutters { background: #35434e; border-right: 0px; }\n    .cm-s-tomorrow-night .CodeMirror-guttermarker { color: #cc6666; }\n    .cm-s-tomorrow-night .CodeMirror-guttermarker-subtle { color: #969896; }\n    .cm-s-tomorrow-night .CodeMirror-linenumber { color: #b4b7b4; opacity: .4; }\n    .cm-s-tomorrow-night .CodeMirror-cursor { border-left: 1px solid #81a2be; }\n    \n    .cm-s-tomorrow-night span.cm-comment { color: #de935f; }\n    .cm-s-tomorrow-night span.cm-atom { color: #b294bb; }\n    .cm-s-tomorrow-night span.cm-number { color: #b294bb; }\n    \n    .cm-s-tomorrow-night span.cm-property, .cm-s-tomorrow-night span.cm-attribute { color: #b5bd68; }\n    .cm-s-tomorrow-night span.cm-keyword { color: #cc6666; }\n    .cm-s-tomorrow-night span.cm-string { color: #f0c674; }\n    \n    .cm-s-tomorrow-night span.cm-variable { color: #b5bd68; }\n    .cm-s-tomorrow-night span.cm-variable-2 { color: #81a2be; }\n    .cm-s-tomorrow-night span.cm-def { color: #de935f; }\n    .cm-s-tomorrow-night span.cm-bracket { color: #c5c8c6; }\n    .cm-s-tomorrow-night span.cm-tag { color: #cc6666; }\n    .cm-s-tomorrow-night span.cm-link { color: #b294bb; }\n    .cm-s-tomorrow-night span.cm-error { background: #cc6666; color: #969896; }\n    \n    .cm-s-tomorrow-night .CodeMirror-activeline-background { background: #373b41; }\n    .cm-s-tomorrow-night .CodeMirror-matchingbracket { text-decoration: underline; color: white !important; }    \n  </style>\n";class e extends HTMLElement{constructor(){var n;super(),this.dirty=!1,this.id||(this.id=o()),this.moduleMap=null!==(n=window.moduleMap)&&void 0!==n?n:{},this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(t.content.cloneNode(!0));const e=document.createElement("div");this.containerId=o(),e.id=this.containerId,e.innerHTML='\n      <div class=\'original-content\'><slot name="html"></slot><slot name="css"></slot><slot name="javascript"></slot></div>\n      <div class=\'source\'><div class=\'tabs\'></div>\n      <div class=\'buttons\'>\n        <button id=\'reset-button\' class=\'button\' disabled><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="history" class="svg-inline--fa fa-history fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 255.532c.252 136.64-111.182 248.372-247.822 248.468-64.014.045-122.373-24.163-166.394-63.942-5.097-4.606-5.3-12.543-.443-17.4l16.96-16.96c4.529-4.529 11.776-4.659 16.555-.395C158.208 436.843 204.848 456 256 456c110.549 0 200-89.468 200-200 0-110.549-89.468-200-200-200-55.52 0-105.708 22.574-141.923 59.043l49.091 48.413c7.641 7.535 2.305 20.544-8.426 20.544H26.412c-6.627 0-12-5.373-12-12V45.443c0-10.651 12.843-16.023 20.426-8.544l45.097 44.474C124.866 36.067 187.15 8 256 8c136.811 0 247.747 110.781 248 247.532zm-167.058 90.173l14.116-19.409c3.898-5.36 2.713-12.865-2.647-16.763L280 259.778V116c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v168.222l88.179 64.13c5.36 3.897 12.865 2.712 16.763-2.647z"></path></svg>Reset</button>\n        <button id=\'run-button\' class=\'button\'><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="play" class="svg-inline--fa fa-play fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6zM48 453.5v-395c0-4.6 5.1-7.5 9.1-5.2l334.2 197.5c3.9 2.3 3.9 8 0 10.3L57.1 458.7c-4 2.3-9.1-.6-9.1-5.2z"></path></svg>Run</button>\n      </div></div>\n      <div class=\'result\'>\n          <div class=\'output\'></div>\n      </div></div>',this.shadowRoot.appendChild(e),this.shadowRoot.getElementById("run-button").addEventListener("click",n=>{this.runPlayground()}),this.shadowRoot.getElementById("reset-button").addEventListener("click",n=>{this.resetPlayground()}),this.shadowRoot.querySelector(".original-content").addEventListener("slotchange",n=>{this.dirty=!0,requestAnimationFrame(()=>this.update())})}static get observedAttributes(){return["activetab","layout","showlinenumbers"]}attributeChangedCallback(n,t,e){"activetab"===n&&t!==e?this.activateTab(e):"layout"===n&&t!==e?(this.shadowRoot.querySelector(":host > div").classList.toggle("tab-layout","stack"!==e),this.shadowRoot.querySelector(":host > div").classList.toggle("stack-layout","stack"===e)):"showlinenumbers"===n&&t!==e&&this.shadowRoot.querySelectorAll("textarea + .CodeMirror").forEach(n=>{var t;return null===(t=null==n?void 0:n.CodeMirror)||void 0===t?void 0:t.setLineNumbers(this.showLineNumbers)})}update(){if(!this.dirty)return;this.dirty=!1;const n=this.shadowRoot,t=this,e=function(n){const e=n.target;"LABEL"===e.tagName&&t.activateTab(e.parentNode.dataset.name)};n.querySelectorAll(".tab").forEach(n=>{n.removeEventListener("click",e)});const r=n.querySelectorAll(".original-content slot");let s="";r.forEach(n=>{const t=n.assignedNodes().map(n=>n.innerHTML).join("");if(t){const e=o(),r=n.name;s+=`<div class='tab' id="${e}" data-name="${r}">\n        <input type="radio" id="${e}" name="${this.id}">\n        <label for="${e}">${r}</label>\n        <div class="content ${r.toLowerCase()}">\n            <textarea data-language="${r.toLowerCase()}">${t}</textarea> \n        </div>\n    </div>`}}),n.querySelector(".tabs").innerHTML=s;const a=n.querySelectorAll(".tab");a.length<=1?(a.forEach(n=>n.style.visibility="hidden"),n.querySelector(".tab .content").style.top="0"):n.querySelectorAll(".tab label").forEach(n=>{n.addEventListener("click",e)}),"undefined"!=typeof CodeMirror&&n.querySelectorAll(".tab .content textarea").forEach(n=>{var t;n.value=n.value.replace(/<!--.*-->\n?/g,"");const e={javascript:"javascript",css:"css",html:"xml"}[null!==(t=n.dataset.language)&&void 0!==t?t:"javascript"],o=CodeMirror.fromTextArea(n,{lineNumbers:this.showLineNumbers,lineWrapping:!0,mode:e,theme:"tomorrow-night"});o.setSize("100%","100%"),o.on("change",()=>{this.editorContentChanged()})}),this.activateTab(this.activeTab||a[0].dataset.name),this.runPlayground(),setTimeout(()=>n.querySelectorAll("textarea + .CodeMirror").forEach(n=>{var t;return null===(t=null==n?void 0:n.CodeMirror)||void 0===t?void 0:t.refresh()}),128)}activateTab(n){var t;const e=null!==(t=this.shadowRoot.querySelector(`[data-name=${n}]`))&&void 0!==t?t:this.shadowRoot.querySelectorAll(".tab")[0];e&&(e.querySelector('input[type="radio"]').checked=!0,this.shadowRoot.querySelector(".tabs").style.setProperty("--tab-indicator-offset",e.offsetLeft-this.shadowRoot.querySelector(".tab:first-of-type").offsetLeft+"px"),requestAnimationFrame(()=>{var n,t;return null===(t=null===(n=e.querySelector("textarea + .CodeMirror"))||void 0===n?void 0:n.CodeMirror)||void 0===t?void 0:t.refresh()}))}runPlayground(){var n,t,e,o;const r=this.shadowRoot,s=r.querySelector(".result");s.querySelectorAll("script").forEach(n=>{s.removeChild(n)}),s.querySelectorAll(".console").forEach(n=>{s.removeChild(n)});let a="";const i=r.querySelector('textarea[data-language="html"] + .CodeMirror');a=i?i.CodeMirror.getValue():null!==(t=null===(n=r.querySelector('textarea[data-language="html"]'))||void 0===n?void 0:n.value)&&void 0!==t?t:"",r.querySelector(".output").innerHTML=a;const l=r.querySelector('textarea[data-language="javascript"] + .CodeMirror');let c="";c=l?l.CodeMirror.getValue():null!==(o=null===(e=r.querySelector('textarea[data-language="javascript"]'))||void 0===e?void 0:e.value)&&void 0!==o?o:"";const d=document.createElement("script");d.type="module";try{d.appendChild(document.createTextNode(this.processLiveCodeJavascript(c))),s.appendChild(d)}catch(n){this.pseudoConsole().error(n.message)}const u=window.onerror;window.onerror=(n,t,e,o,r)=>{t===window.location.href&&(0===e?"function"==typeof r.toString?this.pseudoConsole().error(n+r.toString()):this.pseudoConsole().error(n):this.pseudoConsole().error("Line "+e+": "+n))},setTimeout(()=>{window.onerror=u},500)}editorContentChanged(){this.shadowRoot.querySelector("#reset-button").disabled=!1}resetPlayground(){this.shadowRoot.querySelectorAll(".original-content slot").forEach(n=>{const t=n.assignedNodes().map(n=>n.innerText).join("");t&&this.shadowRoot.querySelector('textarea[data-language="'+n.name+'"] + .CodeMirror').CodeMirror.setValue(t)})}pseudoConsole(){const n=this.shadowRoot;let t=n.querySelector(".result .console");t||(t=document.createElement("pre"),t.classList.add("console"),n.querySelector(".result").appendChild(t));const e=function(n){var e;let o=t.innerHTML.split("\n");o.length>1e3&&(o=o.slice(o.length-1e3+1)),t.innerHTML=o.join("\n")+"&nbsp;&nbsp;".repeat(null!==(e=parseInt(t.dataset["group-level"]))&&void 0!==e?e:0)+n+"\n",t.scrollTop=t.scrollHeight};return{assert:function(n,...t){n||e(s(t))},catch:function(n){const t=n.stack.split("at ").pop().match(/:([0-9]+):([0-9]+)$/)||[];e('<span class="error">'+(t[1]?"Line "+t[1]+": ":"")+n.message+"</span>")},clear:function(){t.innerHTML=""},debug:function(...n){e(s(n))},error:function(...n){e('<span class="error">'+s(n)+"</span>")},group:function(...n){var o;arguments.length>0&&e('<span class="group">'+s(n)+"</span>"),t.dataset["group-level"]=Number((null!==(o=parseInt(t.dataset["group-level"]))&&void 0!==o?o:0)+1).toString()},groupCollapsed:function(...n){var o;arguments.length>0&&e('<span class="group">'+s(n)+"</span>"),t.dataset["group-level"]=Number((null!==(o=parseInt(t.dataset["group-level"]))&&void 0!==o?o:0)+1).toString()},groupEnd:function(){var n;t.dataset["group-level"]=Number((null!==(n=parseInt(t.dataset["group-level"]))&&void 0!==n?n:0)-1).toString()},info:function(...n){e(s(n))},log:function(...n){e(s(n))},warn:function(...n){e('<span class="warning">'+s(n)+"</span>")}}}processLiveCodeJavascript(n){n=(n=(n=(n=n.replace(/([^a-zA-Z0-9_-]?)document.querySelector\s*\(/g,"$1container.querySelector(")).replace(/([^a-zA-Z0-9_-]?)document.querySelectorAll\s*\(/g,"$1container.querySelectorAll(")).replace(/([^a-zA-Z0-9_-]?)document.getElementById\s*\(/g,"$1container.querySelector('#' + ")).replace(/([^a-zA-Z0-9_-])?console\./g,"$1host.pseudoConsole().");const t=[];return n=n.replace(/([^a-zA-Z0-9_-]?import.*)('.*'|".*");/g,(n,e,o)=>(t.push([n,e,o.slice(1,o.length-1)]),"")),t.map(n=>this.moduleMap[n[2]]?n[1]+'"'+this.moduleMap[n[2]]+'";':n[0]).join("\n")+`const shadowRoot = document.querySelector("#${this.id}").shadowRoot;const host = shadowRoot.host;`+`const container = shadowRoot.getElementById("${this.containerId}");`+`try{${n}} catch(err) { host.pseudoConsole().catch(err) }`}get activeTab(){return this.hasAttribute("activetab")?this.getAttribute("activetab"):""}set activeTab(n){n?this.setAttribute("activetab",n):this.removeAttribute("activetab")}get showLineNumbers(){return!this.hasAttribute("showlinenumbers")||"true"===this.getAttribute("showlinenumbers")}set showLineNumbers(n){n?this.setAttribute("showlinenumbers",n?"true":"false"):this.removeAttribute("showlinenumbers")}}function o(){return Date.now().toString(36).slice(-2)+Math.floor(1e5*Math.random()).toString(36)}function r(n,t,e={}){var o;if(null!==(o=e.quote)&&void 0!==o||(e.quote='"'),"boolean"==typeof t)return{text:`<span class="boolean">${a(String(t))}</span>`,itemCount:1,lineCount:1};if("number"==typeof t)return{text:`<span class="number">${a(String(t))}</span>`,itemCount:1,lineCount:1};if("string"==typeof t)return 0===e.quote.length?{text:a(t),itemCount:1,lineCount:t.split(/\r\n|\r|\n/).length}:{text:`<span class="string">${a(e.quote+t+e.quote)}</span>`,itemCount:1,lineCount:t.split(/\r\n|\r|\n/).length};if("function"==typeof t){let n="";return n=t.hasOwnProperty("toString")?a(t.toString()):a(String(t)),{text:`<span class="function">ƒ  ${n}</span>`,itemCount:1,lineCount:n.split(/\r\n|\r|\n/).length}}if(null===t)return{text:`<span class="null">${a(String(t))}</span>`,itemCount:1,lineCount:1};if(n>20)return{text:'<span class="sep">(...)</span>',itemCount:1,lineCount:1};if(Array.isArray(t)){const e=[];for(let o=0;o<t.length;o++)Object.keys(t).includes(Number(o).toString())?e.push(r(n+1,t[o])):e.push({text:'<span class="empty">empty</span>',itemCount:1,lineCount:1});const o=e.reduce((n,t)=>n+t.itemCount,0),s=e.reduce((n,t)=>Math.max(n,t.lineCount),0);return o>5||s>1?{text:"<span class='sep'>[</span>\n"+"  ".repeat(n+1)+e.map((n,t)=>'<span class="index">'+t+"</span>"+n.text).join("<span class='sep'>, </span>\n"+"  ".repeat(n+1))+"\n"+"  ".repeat(n)+"<span class='sep'>]</span>",itemCount:o,lineCount:2+e.reduce((n,t)=>n+t.lineCount,0)}:{text:"<span class='sep'>[</span>"+e.map(n=>n.text).join("<span class='sep'>, </span>")+"<span class='sep'>]</span>",itemCount:Math.max(1,o),lineCount:1}}if("object"==typeof t){const e=Object.keys(t);if(Object.getOwnPropertyNames(t).forEach(n=>{e.includes(n)||e.push(n)}),0===e.length&&"function"==typeof e.toString){const n=t.toString();return"[object Object]"===n?{text:'<span class="sep">{}</span>',itemCount:1,lineCount:1}:{text:n,itemCount:1,lineCount:n.split(/\r\n|\r|\n/).length}}const o=e.sort().map(e=>{if("object"==typeof t[e]&&null!==t[e]){let o=r(n+1,t[e]);return o.itemCount>500&&(o={text:"<span class='sep'>(...)</span>",itemCount:1,lineCount:1}),{text:`<span class="property">${e}</span><span class='sep'>: </span>${o.text}`,itemCount:o.itemCount,lineCount:o.lineCount}}if("function"==typeof t[e])return{text:`<span class="property">${e}</span></span><span class='sep'>: </span><span class='function'>ƒ (...)</span>`,itemCount:1,lineCount:1};const o=r(n+1,t[e]);return{text:`<span class="property">${e}</span></span><span class='sep'>: </span>${o.text}`,itemCount:o.itemCount,lineCount:o.lineCount}}),s=o.reduce((n,t)=>n+t.itemCount,0),a=o.reduce((n,t)=>n+t.lineCount,0);return s<5?{text:"<span class='sep'>{</span>"+o.map(n=>n.text).join("</span><span class='sep'>, </span>")+"<span class='sep'>}</span>",itemCount:s,lineCount:a}:{text:"<span class='sep'>{</span>\n"+"  ".repeat(n+1)+o.map(n=>n.text).join("</span><span class='sep'>,</span>\n"+"  ".repeat(n+1))+"\n"+"  ".repeat(n)+"<span class='sep'>}</span>",itemCount:s,lineCount:a+2}}return{text:String(t),itemCount:1,lineCount:1}}function s(n){const t=n[0],e=n.slice(1);return"string"==typeof t&&t.includes("%")&&e.length?t.replace(/(%[oscdif]|%(\d*)\.(\d*)[dif])/g,(n,t,o="",s)=>{if("%o"===t)return r(0,e.shift()).text;if("%s"===t)return e.shift();if("%c"===t)return`</span><span style="${e.shift()}">`;const a=e.shift();let i=null;return"f"===t.substr(-1)&&"number"==typeof a?i=isNaN(parseInt(s,10))?a:a.toFixed(s):"string"==typeof a&&(i=parseInt(a,10)),""===o?i:r(0,i).text.padStart(o," ")}):e.length?r(0,t,{quote:""}).text+e.map(n=>r(0,n,{quote:""})).join(""):r(0,t,{quote:""}).text}function a(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}null!==(n=customElements.get("code-playground"))&&void 0!==n||customElements.define("code-playground",e);export{e as CodeSection};
