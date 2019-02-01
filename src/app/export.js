function exportToCanvas() {

    var svgElem = document.querySelector("#lbd-chart-1 svg");
    svgElem.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    ctx.canvas.height = svgElem.clientHeight;
    ctx.canvas.width = svgElem.clientWidth;
  
    var DOMURL = window.URL || window.webkitURL || window;
    var img = new Image();
    img.crossOrigin = "Anonymous";
    var blob = undefined;
    //catch is not working, but I leave it here as a clue to help with blob in MSIE, if you need it to start something up
    //IEsupport : As per https://gist.github.com/Prinzhorn/5a9d7db4e4fb9372b2e6#gistcomment-2075344
    //foreignObject is not supported at all in IE as per https://developer.mozilla.org/en-US/docs/Web/SVG/Element/foreignObject
    try {
      blob = new Blob([svgElem.outerHTML], {
        type: "image/svg+xml;charset=utf-8"
      });
    }
    catch (e) {
      if (e.name == "InvalidStateError") {
        var bb = new MSBlobBuilder();
        bb.append(svgElem.outerHTML);
        blob = bb.getBlob("image/svg+xml;charset=utf-8");
      }
      else {
        throw e; //Fallthrough exception, if it wasn't for IE corner-case
      }
    }
    var url = DOMURL.createObjectURL(blob);
    img.onload = function() {
      console.log('onload');
      ctx.drawImage(img, 0, 0);
      DOMURL.revokeObjectURL(url);
    }
    img.src = url;
    console.log('export launched');
  }
  
  function inlineCSStoSVG() {
    var nodes = document.querySelectorAll("#lbd-chart-1 *");
    for (var i = 0; i < nodes.length; ++i) {
      var elemCSS = window.getComputedStyle(nodes[i], null);
      nodes[i].removeAttribute('xmlns');
      nodes[i].style.fill = elemCSS.fill;
      nodes[i].style.fillOpacity = elemCSS.fillOpacity;
      nodes[i].style.stroke = elemCSS.stroke;
      nodes[i].style.strokeLinecap = elemCSS.strokeLinecap;
      nodes[i].style.strokeDasharray = elemCSS.strokeDasharray;
      nodes[i].style.strokeWidth = elemCSS.strokeWidth;
      nodes[i].style.fontSize = elemCSS.fontSize;
      nodes[i].style.fontFamily = elemCSS.fontFamily;
      //Solution to embbed HTML in foreignObject https://stackoverflow.com/a/37124551
      if (nodes[i].nodeName === "SPAN") {
        nodes[i].setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
      }
    }
  }
  
  inlineCSStoSVG();
  
  document.getElementById("rasterCanvas").addEventListener('click', function() {
    exportToCanvas();
  });