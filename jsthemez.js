function pagination(a) {
  var e = "";
  var leftnum = parseInt(numshowpage / 2);
  if (leftnum == numshowpage - leftnum) {
    numshowpage = 2 * leftnum + 1;
  }
  var start = postnumber - leftnum;
  if (start < 1) {
    start = 1;
  }
  var maximum = parseInt(a / postperpage) + 1;
  if (maximum - 1 == a / postperpage) {
    maximum -= 1;
  }
  var end = start + numshowpage - 1;
  if (end > maximum) {
    end = maximum;
  }
  e += "<span class='totalpages'>Page " + postnumber + " of " + maximum + "</span>";
  var s = parseInt(postnumber) - 1;
  if (postnumber > 1) {
    e += (postnumber == 2 && type == "page") ? '<span class="showpage"><a href="' + home_page + '">' + prevpage + "</a></span>" :
      (type == "page") ? '<span class="pagenumber"><a href="#" onclick="redirectpage(' + s + ');return false">' + prevpage + "</a></span>" :
      '<span class="pagenumber"><a href="#" onclick="redirectlabel(' + s + ');return false">' + prevpage + "</a></span>";
  }
  if (start > 1) {
    e += (type == "page") ? '<span class="pagenumber"><a href="' + home_page + '">1</a></span>' :
      '<span class="pagenumber"><a href="/search/label/' + lblname1 + "?&max-results=" + postperpage + '">1</a></span>';
  }
  for (var r = start; r <= end; r++) {
    e += (postnumber == r) ? '<span class="current">' + r + "</span>" :
      (r == 1) ? ((type == "page") ? '<span class="pagenumber"><a href="' + home_page + '">1</a></span>' :
        '<span class="pagenumber"><a href="/search/label/' + lblname1 + "?&max-results=" + postperpage + '">1</a></span>') :
      ((type == "page") ? '<span class="pagenumber"><a href="#" onclick="redirectpage(' + r + ');return false">' + r + "</a></span>" :
        '<span class="pagenumber"><a href="#" onclick="redirectlabel(' + r + ');return false">' + r + "</a></span>");
  }
  if (end < maximum - 1) {
    e += "";
  }
  if (end < maximum) {
    e += (type == "page") ? '<span class="pagenumber"><a href="#" onclick="redirectpage(' + maximum + ');return false">' + maximum + "</a></span>" :
      '<span class="pagenumber"><a href="#" onclick="redirectlabel(' + maximum + ');return false">' + maximum + "</a></span>";
  }
  var n = parseInt(postnumber) + 1;
  if (postnumber < maximum) {
    e += (type == "page") ? '<span class="pagenumber"><a href="#" onclick="redirectpage(' + n + ');return false">' + nextpage + "</a></span>" :
      '<span class="pagenumber"><a href="#" onclick="redirectlabel(' + n + ');return false">' + nextpage + "</a></span>";
  }
  var t = document.getElementsByName("pageArea");
  var l = document.getElementById("blog-pager");
  if (t && t.length > 0) {
    t[0].innerHTML = e;
    e = "";
  }
  if (l) {
    l.innerHTML = e;
  }
}

function paginationall(a) {
  var e = a.feed;
  var s = parseInt(e.openSearch$totalResults.$t, 10);
  pagination(s);
}

function bloggerpage() {
  var a = urlactivepage;
  if (a.indexOf("/search/label/") !== -1) {
    lblname1 = (a.indexOf("?updated-max") !== -1) ?
      a.substring(a.indexOf("/search/label/") + 14, a.indexOf("?updated-max")) :
      a.substring(a.indexOf("/search/label/") + 14, a.indexOf("?&max"));
  }
  if (a.indexOf("?q=") === -1 && a.indexOf(".html") === -1) {
    if (a.indexOf("/search/label/") === -1) {
      type = "page";
      postnumber = (urlactivepage.indexOf("#PageNo=") !== -1) ?
        urlactivepage.substring(urlactivepage.indexOf("#PageNo=") + 8, urlactivepage.length) : 1;
      document.write('<script src="' + home_page + 'feeds/posts/summary?max-results=1&alt=json-in-script&callback=paginationall"></script>');
    } else {
      type = "label";
      postperpage = (a.indexOf("&max-results=") === -1) ? 20 : postperpage;
      postnumber = (urlactivepage.indexOf("#PageNo=") !== -1) ?
        urlactivepage.substring(urlactivepage.indexOf("#PageNo=") + 8, urlactivepage.length) : 1;
      document.write('<script src="' + home_page + "feeds/posts/summary/-/" + lblname1 + '?alt=json-in-script&callback=paginationall&max-results=1"></script>');
    }
  }
}

function redirectpage(a) {
  jsonstart = (a - 1) * postperpage;
  nopage = a;
  var e = document.getElementsByTagName("head")[0];
  var s = document.createElement("script");
  s.type = "text/javascript";
  s.setAttribute("src", home_page + "feeds/posts/summary?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost");
  e.appendChild(s);
}

function redirectlabel(a) {
  jsonstart = (a - 1) * postperpage;
  nopage = a;
  var e = document.getElementsByTagName("head")[0];
  var s = document.createElement("script");
  s.type = "text/javascript";
  s.setAttribute("src", home_page + "feeds/posts/summary/-/" + lblname1 + "?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost");
  e.appendChild(s);
}

function finddatepost(a) {
  post = a.feed.entry[0];
  var e = post.published.$t.substring(0, 19) + post.published.$t.substring(23, 29);
  var s = encodeURIComponent(e);
  var r = (type == "page") ?
    "/search?updated-max=" + s + "&max-results=" + postperpage + "#PageNo=" + nopage :
    "/search/label/" + lblname1 + "?updated-max=" + s + "&max-results=" + postperpage + "#PageNo=" + nopage;
  location.href = r;
}

var nopage, type, postnumber, lblname1;
bloggerpage();