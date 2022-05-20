

// The codeMirror editor object
let codemirror = CodeMirror.fromTextArea( document.getElementById("codeBlock"), {
        mode                : {name: "htmlmixed", globalVars: true},
        theme               : "monokai",
        lineNumbers         : true,
        lineWrapping        : true,
        tabSize             : 4,
        indentUnit          : 4,
        matchBrackets       : true,
        autoCloseBrackets   : true,
        matchTags           : {bothTags: true},
        autoCloseTags       : true,
        autofocus           : true,
        openDialog: {onInput: true, onKeyUp: true, onKeyDown: true,},
        highlightSelectionMatches: {showToken: /\w/},
        highlightNonStandardPropertyKeywords: false,
        lint                : true,
        extraKeys: {"Ctrl-F": "findPersistent", "Ctrl-H": "replace", "Ctrl-Space": "autocomplete",
    'Tab': 'emmetExpandAbbreviation',
        'Esc': 'emmetResetAbbreviation',
        'Enter': 'emmetInsertLineBreak',
    },


        gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],
});


// Because it's easier to read errors :)
console.clear();

// The preview window
const xoutput = document.getElementById("output").contentWindow.document;

// The current html_values item being edited
let current;

// A list of html which will be used in the editor
let html_values = {
    TabA1   : localStorage.getItem("storeA1"),
    TabA2   : localStorage.getItem("storeA2"),
    TabA3   : localStorage.getItem("storeA3"),
};

// Updates the preview window and html_values
function updateHtml () {
    const val               = codemirror.getValue();
    html_values[current]    = val;
    xoutput.open(); xoutput.writeln(val); xoutput.close();
    localStorage.setItem("storeA1", html_values['TabA1']);
    localStorage.setItem("storeA2", html_values['TabA2']);
    localStorage.setItem("storeA3", html_values['TabA3']);
}

// Set the html_values item in the editor and preview
function setHtml(x) { current = x; codemirror.setValue(html_values[x]);}
setHtml("TabA1");

// autocomplete after keypress
codemirror.on("inputRead", function(instance) {
    if (instance.state.completionActive) { return}
    var cur = instance.getCursor();
    var token = instance.getTokenAt(cur);
    if (token.type && token.type != "comment") { CodeMirror.commands.autocomplete(instance);
    }
});



// Auto Run
var running = true;
function runs(){ tap ? runOff() : runOn(); tap = !tap;}
function runOff(){ document.querySelector('#runs').style.backgroundColor = 'inherit'; running = false }
function runOn(){ document.querySelector('#runs').style.backgroundColor = '#19478a';  running = true;  updateHtml() }

codemirror.on("change", function() {
   if(running == false) return;
   updateHtml()
});

updateHtml()
// Start the page using html_values.something
function kk(){  }

// Rotate
var tap = true;
function rotate(){ tap ? flip() : unflip(); tap = !tap;}
function flip(){
    codeView.style.flexDirection = 'column';
    codeIn.style.width = '100%'; codeIn.style.height = '50%';
    codeOut.style.width = '100%'; codeOut.style.height = '50%';
  }
function unflip(){
    codeView.style.flexDirection = 'row';
    codeIn.style.width = '50%'; codeIn.style.height = '100%';
    codeOut.style.width = '50%'; codeOut.style.height = '100%';
  }

// Word Wrap
function wrap(){ tap ? wrapOff() : wrapOn(); tap = !tap;}
function wrapOff(){ codemirror.setOption("lineWrapping", false);}
function wrapOn(){ codemirror.setOption("lineWrapping", true); }

// Font Size
function fontBig(){
    txt = document.querySelector('#codeIn');
    currentSize = parseFloat(window.getComputedStyle(txt, null).getPropertyValue('font-size'));
    txt.style.fontSize = (currentSize + 1) + 'px';
 }
function fontSmall(){
    txt = document.querySelector('#codeIn');
    currentSize = parseFloat(window.getComputedStyle(txt, null).getPropertyValue('font-size'));
    txt.style.fontSize = (currentSize - 1) + 'px';
 }

 // Toggle Preview
function preview(){ tap ? viewOff() : viewOn(); tap = !tap;}
function viewOff(){ codeOut.style.display = 'none'; codeIn.style.width = '100%'; document.querySelector('#preview').innerText = '❮';}
function viewOn(){ codeOut.style.display = 'block'; codeIn.style.width = '50%'; document.querySelector('#preview').innerText = '❯';}

// Search
function search(){ codemirror.execCommand("findPersistent") }

 // Toggle Theme
 function mode(){ tap ? light() : dark(); tap = !tap; }
 function light(){
    codemirror.setOption("theme", "default");
    document.querySelector('#lanBar').style.background = document.querySelector('.CodeMirror-gutters').style.backgroundColor;
}
 function dark(){
    codemirror.setOption("theme", "monokai");
    document.querySelector('#lanBar').style.background = document.querySelector('.CodeMirror-gutters').style.backgroundColor;
}

 // Change Theme
 function changeTheme(){
    var x = document.getElementById("themeSelect").value;
    localStorage.setItem("storeTheme", x);
    if(x==='1') { codemirror.setOption("theme", "monokai") }
    if(x==='2') { codemirror.setOption("theme", "default") }
    if(x==='3') { codemirror.setOption("theme", "dracula") }
    if(x==='4') { codemirror.setOption("theme", "eclipse") }
    if(x==='5') { codemirror.setOption("theme", "material") }
    if(x==='6') { codemirror.setOption("theme", "ambiance") }
    if(x==='7') { codemirror.setOption("theme", "neo") }
    if(x==='8') { codemirror.setOption("theme", "seti") }
    if(x==='9') { codemirror.setOption("theme", "ttcn") }
}
document.getElementById('themeSelect').value = localStorage.getItem("storeTheme");
changeTheme()

