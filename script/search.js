/*
2020 @franknoh search.js
*/

limit = 5;

var search = [
  {
    'keys': ['알아두기', 'Java와 JavaScript는 서로 다른 언어입니다.', '순수 자바스크립트', 'Rhino', 'JavaScript 엔진', 'iOS', '안드로이드 버전', '안드로이드 버전 5.0(롤리팝) 미만'],
    'location': '1-1'
  }, {
    'keys': ['카카오톡 봇', '자동으로 응답', '메신저봇R을 기준', '채팅 자동응답 봇'],
    'location': '1-2'
  }, {
    'keys': ['작동 원리', '메신저봇', 'NotificationListenerService', 'WearableExtender', 'Rhino JavaScript Engine', '알림 정보를 전달'],
    'location': '1-3'
  }, {
    'keys': ['개발 준비', '앱 설치', '부계정을 사용할 경우', 'Google Play', 'Wear OS by Google', 'Android Wear', '안드로이드 버전이 7.0', '앱을 추가로 설치', '구동할 수 있는 환경이 조성', '알림 읽기 권한이 없습니다.', '데이터 폴더', '변경을 선택해 저장할 경로를 지정합니다.', '메신저봇R의 메인 화면', '스크립트 추가 버튼', '새 봇 창', '스크립트 이름', '올바른 추가 설정', '본계정과 부계정 모두', '삼성 듀얼 메신저 기능을 사용할 경우', '복제 앱을 사용할 경우', '공용 설정 > 알림을 읽을 패키지명', 'if(packageName != \'복제된 앱의 패키지명\') return;'],
    'location': '1-4'
  }, {
    'keys': [],
    'location': '1-5'
  }, {
    'keys': [],
    'location': '1-6'
  }, {
    'keys': [],
    'location': '1-7'
  }, {
    'keys': [],
    'location': '2-1'
  }, {
    'keys': [],
    'location': '2-2'
  }, {
    'keys': [],
    'location': '2-3'
  }, {
    'keys': [],
    'location': '2-4'
  }, {
    'keys': [],
    'location': '2-5'
  }, {
    'keys': [],
    'location': '2-6'
  }, {
    'keys': [],
    'location': '2-7'
  }, {
    'keys': [],
    'location': '2-8'
  }, {
    'keys': [],
    'location': '2-9'
  }, {
    'keys': [],
    'location': '2-10'
  }, {
    'keys': [],
    'location': '3-1'
  }, {
    'keys': [],
    'location': '3-2'
  }, {
    'keys': [],
    'location': '3-3'
  }, {
    'keys': [],
    'location': '3-4'
  }, {
    'keys': [],
    'location': '3-5'
  }, {
    'keys': [],
    'location': '3-6'
  }, {
    'keys': [],
    'location': '3-7'
  }, {
    'keys': [],
    'location': '3-8'
  }, {
    'keys': [],
    'location': '3-9'
  }, {
    'keys': [],
    'location': '4-1'
  }, {
    'keys': [],
    'location': '4-2'
  }, {
    'keys': [],
    'location': '4-3'
  }, {
    'keys': [],
    'location': '4-4'
  }, {
    'keys': [],
    'location': '4-5'
  }, {
    'keys': [],
    'location': '4-6'
  }, {
    'keys': [],
    'location': '4-7'
  }, {
    'keys': [],
    'location': '4-8'
  }, {
    'keys': [],
    'location': '4-9'
  }, {
    'keys': [],
    'location': '4-11'
  }, {
    'keys': [],
    'location': '4-11'
  }, {
    'keys': [],
    'location': '4-12'
  }, {
    'keys': [],
    'location': '5-1'
  }, {
    'keys': [],
    'location': '5-2'
  }, {
    'keys': [],
    'location': '5-3'
  }, {
    'keys': [],
    'location': '5-4'
  }, {
    'keys': [],
    'location': '5-5'
  }, {
    'keys': [],
    'location': '6-1'
  }, {
    'keys': [],
    'location': '6-2'
  }, {
    'keys': [],
    'location': '6-3'
  }
];

////////////////////////////////////////////////////////////////////////////////////////////////////

location.get = function () {
  if (location.search < 3) {
    return {};
  } else {
    var s = {}
    t = location.search.substr(1).split('&');
    t.forEach((e) => {
      s[decodeURIComponent(e.split('=')[0].replaceAll('+', ' '))] = decodeURIComponent(e.split('=')[1].replaceAll('+', ' '));
    });
    return s;
  }
}

Array.prototype.in = function (arg) {
  var t = false;
  this.forEach((e) => {
    if (e.toUpperCase().indexOf(arg.toUpperCase()) != -1) {
      t = e;
    }
  })
  return t;
};
var search_res;
var x;

function searchExec(r) {
  o = r;
  fnd = false;
  if (o.indexOf(' ') != -1) o = get_key(r);
  search.forEach((e) => {
    if (!!e.keys.in(o) && !fnd) {
      console.log(e.location)
      $([document.documentElement, document.body]).animate({
        scrollTop: $("#" + e.location).offset().top - 150
      }, 500);
      fnd = true;
    }
  });
  if (!fnd) setToast("'" + r + "' 이라는 검색결과가 없습니다.");
}

function get_key(txt) {
  var result = null;
  $.ajax({
    url: 'https://open-korean-text-api.herokuapp.com/extractPhrases?text=' + txt,
    type: 'get',
    dataType: 'json',
    async: false,
    success: function (data) {
      result = data;
    }
  });
  if (result.phrases[0]) {
    return result.phrases[0].split('(')[0];
  }
}

$(() => {
  if (!!location.get().search && location.get().search != '') {
    if (['/full', '/full.html'].includes(location.pathname)) {
      setTimeout(() => {
        $('input#search_txt').val(location.get().search)
        searchExec(location.get().search);
      }, 500);
    } else {
      $.cookie('docs_search', location.get().search, { expires: 1 });
      location.href = 'full' + location.search;
    }
  }
  if (!!$.cookie('docs_search')) {
    searchExec($.cookie('docs_search'));
    $.removeCookie('docs_search');
  }
  $('#search_txt').keydown(function (event) {
    // enter has keyCode = 13, change it if you want to use another button
    if (event.keyCode == 13) {
      this.form.submit();
      return false;
    }
  });
  var inp = document.getElementById("search_txt")
  //the autocomplete function takes two arguments,
  //the text field element and an array of possible autocompleted values:
  var currentFocus;
  //execute a function when someone writes in the text field:
  var a, b, c, d, e;
  inp.addEventListener("input", function (e) {
    var val = this.value;
    //close any already open lists of autocompleted values
    closeAllLists();
    if (!val) { return false; }
    currentFocus = -1;
    if (!document.getElementById('auto')) {
      //create a DIV element that will contain the items (values):
      a = document.createElement("DIV");
      a.setAttribute("id", "auto");
      a.className = 'auto-items';
      //append the DIV element as a child of the autocomplete container:
      this.parentNode.appendChild(a);
      c = document.createElement("TABLE");
      a.appendChild(c)
      d = document.createElement("TBODY");
      c.appendChild(d)
    }
    //for each item in the array...
    search_res = [];
    search.forEach((e) => {
      if (!!e.keys.in(val)) {
        search_res.push([e, e.keys.in(val)])
      }
    });
    function strong(s, l) {
      return l.split('').reverse().join('').substr(l.substr(l.toUpperCase().indexOf(s.toUpperCase())).length).split('').reverse().join('') + '<strong>' + l.substr(l.split('').reverse().join('').substr(l.substr(l.toUpperCase().indexOf(s.toUpperCase())).length).split('').reverse().join('').length).split('').reverse().join('').substr(l.substr(l.toUpperCase().indexOf(s.toUpperCase())).substr(s.length).length).split('').reverse().join('') + '</strong>' + l.substr(l.toUpperCase().indexOf(s.toUpperCase())).substr(s.length)
    }
    var nLim = limit;
    search_res.forEach((f) => {
      if (nLim > 0) {
        b = document.createElement("TR");
        b.className = 'mid'
        e = document.createElement("TD");
        var l = f[1];
        e.innerHTML = strong(val, l) + "<input type='hidden' value='" + l + "'>";
        e.addEventListener("click", function (g) {
          //insert the value for the autocomplete text field:
          inp.value = this.getElementsByTagName("input")[0].value;
          //close the list of autocompleted values,
          //(or any other open lists of autocompleted values:
          closeAllLists();
        });
        b.appendChild(e);
        d.appendChild(b);
        nLim--;
      }
    });
    var s = Array.from(document.getElementsByClassName('mid')).reverse()[0];
    if (!!s) {
      s.classList.remove("mid");
      s.id = 'last';
    }
  });
  //execute a function presses a key on the keyboard:
  inp.addEventListener("keydown", function (e) {
    x = document.getElementById("auto");
    if (x) x = x.getElementsByTagName("tr");
    if (e.key == "ArrowDown") {

      //if the arrow DOWN key is pressed,
      //increase the currentFocus variable:
      currentFocus++;
      //and and make the current item more visible:
      addActive(x);
    } else if (e.key == "ArrowUp") { //up
      //If the arrow UP key is pressed,
      //decrease the currentFocus variable:
      currentFocus--;
      //and and make the current item more visible:
      addActive(x);
    } else if (e.key == "Enter") {
      //If the ENTER key is pressed, prevent the form from being submitted,
      e.preventDefault();
      if (currentFocus > -1) {
        inp.value = x[currentFocus].innerText;
        //and simulate a click on the "active" item:
        x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    //a function to classify an item as "active":
    if (!x) return false;
    //start by removing the "active" class on all items:
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    //add class "autocomplete-active":
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    //a function to remove the "active" class from all autocomplete items:
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    //close all autocomplete lists in the document,
    //except the one passed as an argument:
    var x = document.getElementsByClassName("auto-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  //execute a function when someone clicks in the document:
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
});
