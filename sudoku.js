/*
v 0.7.0b
up:
сократил немного кода
*/
var n, num, c1, cell, c3, tmp, c2, ar, plc, pl, place, flpl;
var sudo = new Array(81),
   ottn = new Array(3),
   plc = 35,
   c4 = 0,
   c5 = 0,
   c6 = 0,
   c7 = 0,
   c8 = 0;
   zoomtmp = 42;
window.onload = create;

//Логика!
//Главаная функция задаёт поле Судоку
function create() {
   for (var j = 0; j < 81; j++) {
      document.getElementsByTagName("td")[j].setAttribute("onclick", "choose(" + j + ");");
   }
   document.getElementsByTagName("body")[0].style.backgroundColor = "white";
   tmp = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      []
   ];
   ar = [];
   sudo = buildarray(sudo, 81, 0);
   cell = -1;
   for (var j = 1; j < 9; j++) {
      c1 = 0;
      c3 = 0;
      c2 = [];
      if (c4 == 1) {
         if (j == 9) {
            c5 += 1;
         }
         if (c5 != 4) {
            j -= 1;
            c4 = 0;
            for (var j2 = 0; j2 < 81; j2++) {
               if (sudo[j2] == j) {
                  sudo[j2] = 0;
               }
            }
         } else {
            c5 = 0;
         }
      }
      for (var j1 = 0; j1 < 81; j1 += 9) {
         ar = process();
         if (ar.length != 0) {
            n = getnumber(ar.length, 0);
         }
         n = getnumber(ar.length, 0);
         if (ar.length == 0) {
            c4 = 1;
         }
         num = ar[n];
         tmp[c1][j - 1] = num;
         switch (num) {
            case 0:
            case 1:
            case 2:
               c2[c3] = 1;
               break
            case 3:
            case 4:
            case 5:
               c2[c3] = 2;
               break
            case 6:
            case 7:
            case 8:
               c2[c3] = 3;
               break
         }
         c1 += 1;
         c3 += 1;
         if (c3 == 3) {
            c2 = [];
            c3 = 0;
         }
         sudo[j1 + num] = j;
      }
   }
   verief();

   function verief() {
      c6 = 0;
      c7 = 0;
      for (var k = 0; k < 81; k++) {
         if (sudo[k] == 0) {
            sudo[k] = 9;
         }
      }
      for (var k = 0; k < 81; k++) {
         if (sudo[k] == 8) {
            c6 += 1;
         } else if (sudo[k] == 9) {
            c7 += 1;
         }
      }
      if (c6 != 9 && c7 != 9) {
         create();
      } else {
         crutch(sudo);
      }
   }

   function process() //По алгоритму удаляет всё что может создать ошибку
      {
         ar = buildarray(ar, 9);
         for (var j2 = 0; j2 < c2.length; j2++) //Удаляет по 3 обязательных
         {
            ar = arsplice(ar, c2[j2]);
         }
         for (var j2 = 0; j2 < tmp[j1 / 9].length; j2++) { //Удаляет числа, которые не могут находится в строке
            for (var j3 = 0; j3 < ar.length; j3++) {
               if (tmp[j1 / 9][j2] == ar[j3]) {
                  ar.splice(j3, 1);
               }
            }
         }
         for (var j2 = 0; j2 < c1; j2++) { //Удаляет место где не может находиться число n
            for (var j3 = 0; j3 < ar.length; j3++) {
               if (tmp[j2][j - 1] == ar[j3]) {
                  ar.splice(j3, 1);
               }
            }
         }
         return (ar);
      }

   function arsplice(ottar, ott) {
      switch (ott) {
         case 1:
            ottn = [0, 1, 2];
            break
         case 2:
            ottn = [3, 4, 5];
            break
         case 3:
            ottn = [6, 7, 8];
            break
      }
      for (var k = 0; k < ottn.length; k++) {
         for (var k1 = 0; k1 < ottar.length; k1++) {
            if (ottn[k] == ottar[k1]) {
               ottar.splice(k1, 1);
            }
         }
      }
      return (ottar);
   }
}

//Простой рандомайзер, подбирает следующее число
function getnumber(ma, mi) {
   return (Math.floor(Math.random() * (ma - mi)) + mi);
}
   
//Обнуляет массив или заполняет с 0
function buildarray(tmpar, dim, cntnt) {
   for (var k = 0; k < dim; k++) {
      if (cntnt || cntnt == 0) {
         tmpar[k] = cntnt;
      } else {
         tmpar[k] = k;
      }
   } 
   return (tmpar);
}

//Устанавливает пустые ячейки
function crutch(csudo) {
   place = [];
   for (var j = 0; j < 81; j++) {
      document.getElementsByTagName("td")[j].innerHTML = "";
      document.getElementsByTagName("td")[j].style.backgroundColor = "white";
   }
   generplace(place);
   for (var j = 0; j < 81; j++) {
      for (var j1 = 0; j1 < place.length; j1++) {
         if (j == place[j1]) {
            document.getElementsByTagName("td")[j].innerHTML = " ";
            document.getElementsByTagName("td")[j].style.backgroundColor = "lightgrey";
         }
      }
      if (document.getElementsByTagName("td")[j].innerHTML != " ") {
         document.getElementsByTagName("td")[j].innerHTML = csudo[j];
      }
   }
}

//Опустошает клетки
function generplace(gplc) {
   if (plc == 0) {
      /*arfi=[];
		createfigure(arfi);
		for (var i=0, iii=0;i<arfi.length;i++) {
			if (i%2==1) {
				for (var ii=arfi[i];ii>0;ii--) {
					gplc[iii]=ii;
					iii++;
				}
			}
			else {
				for (var ii=arfi[i];ii>0;ii--) {
					iii++;
				}
			}
		}
		console.log(arfi);*/
   } else {
      for (var j = 0; j < plc;) {
         flpl = 0;
         pl = getnumber(81, 0);
         for (var jj = 0; jj < gplc.length; jj++) {
            if (gplc[jj] == pl) {
               flpl = 1;
               break;
            }
         }
         if (flpl == 0) {
            gplc[j] = pl;
            j += 1;
         }
      }
   }
   return (gplc);
}

//Окончательная проверка иннициируемая пользователем
function verification() {
   c1 = 0;
   if (cell != -1) {
      choose(cell);
   }
   var redfortest = [];
   var redcount = 0;
   for (var i = 0; i < 81; i++) {
      if (sudo[i] != document.getElementsByTagName("td")[i].innerHTML) {
         redfortest[redcount] = i;
         //document.getElementsByTagName("td")[i].style.backgroundColor="#D60F3A";
         redcount += 1;
         c1 += 1;
      }
   }
   if (c1 > 4) {
      for (var i = 0; i < c1; i++) {
         document.getElementsByTagName("td")[redfortest[i]].style.backgroundColor = "#D60F3A";
      }
   }
   if (c1 == 4) {
      //сверить 4 числа и если там 2 одинаковые пары, то тру
      for (var i = 0; i < 81; i++) {
         var redfortest = [];
         if (document.getElementsByTagName("td")[i].style.backgroundColor == "rgb(255,40,40)") {
            redfortest[redcount] = document.getElementsByTagName("td")[i].style.innerHTML;
            redcount++;
         }
      }
      if (redfortest[0] == redfortest[3] && redfortest[1] == redfortest[2]) {
         console.log("Great Job!");
         document.getElementsByTagName("body")[0].style.backgroundColor = "#0FD661";
      }
   }
   if (c1 == 0) {
      console.log("Great Job!");
      document.getElementsByTagName("body")[0].style.backgroundColor = "#0FD661";
   } else {
      console.log("Mistakes:" + c1);
   }
   if (cell != -1) {
      document.getElementsByTagName("td")[cell].style.backgroundColor = "rgb(241, 196, 15)";
   }
}

/*function createfigure(arfi) {
	var temf, sumf;
	for (var i=0, j=0;i<40;j++) {
		temf=getnumber(3, 0);
		sumf+=temf;
		if (sumf>40) {
			temf=temf-(sumf-40);
		}
		i+=temf;
		arfi[j]=temf;
	}
	return(arfi);
}*/

//Интерфэйс!
function Move(key) //Возможность двигаться по ячецкам с помощью стрелок и назначать число
   {
      var keycode = key.keyCode ? key.keyCode : key.keyChar;
      if (keycode > 36 && keycode < 41) {
         if (cell >= 0) {
            switch (keycode) {
               case 37:
                  cell -= 1;
                  //if (cell==-1 || cell==8 || cell==17 || cell==26 || cell==35 || cell==44 || cell==53 || cell==62 || cell==71) {
                  if (cell == -1 || cell % 9 == 8) {
                     cell += 9;
                  }
                  break
               case 38:
                  cell -= 9;
                  if (cell < 0) {
                     cell = 81 + cell;
                  }
                  break
               case 39:
                  cell += 1;
                  //if (cell==9 || cell==18 || cell==27 || cell==36 || cell==45 || cell==54 || cell==63 || cell==72 || cell==81) {
                  if (cell % 9 == 0) {
                     cell -= 9;
                  }
                  break
               case 40:
                  cell += 9;
                  if (cell > 80) {
                     cell = cell - 81;
                  }
                  break
            }
         } else {
            cell = 0;
         }
         choose(cell);
      } else if (keycode > 48 && keycode < 58) {
         innernum(keycode - 48);
      } else if (keycode == 67 || keycode == 48) {
         for (var i = 0; i < place.length; i++) {
            if (place[i] == cell) {
               document.getElementsByTagName("td")[cell].innerHTML = " ";
            }
         }
      }
   }
   
//Следит за выбранной ячейкой и её фоном
function choose(cho)
{
   if (document.getElementById('info').style.display == 'block') settings();
   for (var i = 0; i < 81; i++) {
      document.getElementsByTagName("td")[i].style.backgroundColor = "white";
   }
   for (var i = 0; i < place.length; i++) {
      document.getElementsByTagName("td")[place[i]].style.backgroundColor = "lightgrey";
   }
   document.getElementsByTagName("td")[cho].style.backgroundColor = "rgb(241, 196, 15)";
   cell = cho;
}

function innernum(sp) //Проверяет есть ли возможность поставить в данную ячеёку число
   {
      c8 = 0;
      for (var i = 0; i < place.length; i++) {
         if (place[i] == cell) {
            c8 = 1;
         }
      }
      if (c8 == 1) {
         document.getElementsByTagName("td")[cell].innerHTML = sp;
      }
   }

function lvlchs(level) {
   switch (level) {
      case 1:
         document.getElementsByTagName('img')[0].src = 'https://wildstir.ru/img/play/staron.png';
         document.getElementsByTagName('img')[1].src = 'https://wildstir.ru/img/play/staroff.png';
         document.getElementsByTagName('img')[2].src = 'https://wildstir.ru/img/play/staroff.png';
         document.getElementsByTagName('img')[3].src = 'https://wildstir.ru/img/play/figureoff.png';
         plc = 35;
         break
      case 2:
         document.getElementsByTagName('img')[0].src = 'https://wildstir.ru/img/play/staron.png';
         document.getElementsByTagName('img')[1].src = 'https://wildstir.ru/img/play/staron.png';
         document.getElementsByTagName('img')[2].src = 'https://wildstir.ru/img/play/staroff.png';
         document.getElementsByTagName('img')[3].src = 'https://wildstir.ru/img/play/figureoff.png';
         plc = 41;
         break
      case 3:
         document.getElementsByTagName('img')[0].src = 'https://wildstir.ru/img/play/staron.png';
         document.getElementsByTagName('img')[1].src = 'https://wildstir.ru/img/play/staron.png';
         document.getElementsByTagName('img')[2].src = 'https://wildstir.ru/img/play/staron.png';
         document.getElementsByTagName('img')[3].src = 'https://wildstir.ru/img/play/figureoff.png';
         plc = 47;
         break
      case 4:
         document.getElementsByTagName('img')[0].src = 'https://wildstir.ru/img/play/staroff.png';
         document.getElementsByTagName('img')[1].src = 'https://wildstir.ru/img/play/staroff.png';
         document.getElementsByTagName('img')[2].src = 'https://wildstir.ru/img/play/staroff.png';
         document.getElementsByTagName('img')[3].src = 'https://wildstir.ru/img/play/figureon.png';
         plc = 0;
         break
   }
   create();
}

var flagset = 0;

function settings() {
   flagset += 1;
   if (flagset == 1) {
      document.getElementById('info').style.display = 'block';
   } else {
      flagset = 0;
      document.getElementById('info').style.display = 'none';
   }
}

//Zoom + and - on field
function zoom(vz) {
      zoomtmp += vz;
      if (zoomtmp > 38 && zoomtmp < 81) {
         document.getElementById('sudcen').style.width = zoomtmp * 9 + 14 + "px";
         document.getElementById('sudcen').style.height = zoomtmp * 10 + 69 + "px";
         for (var i = 0; i < 90; i++) {
            document.getElementsByTagName('td')[i].style.width = zoomtmp + "px";
            document.getElementsByTagName('td')[i].style.height = zoomtmp + "px";
         }
      } else {
         console.log("Very BIG or SMALL");
      }
   }

function timeopenque() {
   for (var i=0; i< 81;i++) {
      document.getElementsByTagName('td')[i].innerHTML = sudo[i];
   }
   settings();
}
   //Cloro SEt
   /*function setcolor()
   {
      
   }*/
   
   //Sandbox
   //n=Math.floor(Math.random()*(checkran));
   //Math.floor(Math.random()*(checkran+1-0))+0;
   //document.getElementsByTagName("td")[j].onclick=function() {}