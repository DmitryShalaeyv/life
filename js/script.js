var canvas = document.getElementById('c1');
var ctx = canvas.getContext('2d');
var mas = [];
var count = 0;
var timer;

canvas.addEventListener('click', (event) => {
	var x = event.offsetX;
	var y = event.offsetY;

	//разбили на 30 квадратиков
	x = Math.floor(x / 10);
	y = Math.floor(y / 10);
	
	mas [y][x] = 1;
	drawField();

});

function goLife() {
	var n = 30, m = 30;
	for(var i = 0; i < m; i++) {
		mas[i] = [];
		for(var j = 0; j < n; j++) {
			mas[i][j] = 0;
		}
	}
}

goLife();

function drawField() {
	ctx.clearRect(0, 0, 300, 300);
	for(var i = 0; i < 30; i++) {
		for(var j = 0; j < 30; j++) {
			if(mas[i][j] == 1) {
				ctx.fillRect(j * 10, i * 10, 10, 10);
			}
		}
	}
}

function startLife() {
	//моделирование жизни
	var mas2 = [];
	for(var i = 0; i < 30; i++) {
		mas2[i] = [];
		for(var j = 0; j < 30; j++) {
			var neighbors = 0;
			if(mas[fpm(i) - 1][j] == 1) neighbors++;//верх
			if(mas[i][fpp(j) + 1] == 1) neighbors++;//право
			if(mas[fpp(i) + 1][j] == 1) neighbors++;//низ
			if(mas[i][fpm(j) - 1] == 1) neighbors++;//лево
			if(mas[fpm(i) - 1][fpp(j) + 1] == 1) neighbors++;
			if(mas[fpp(i) + 1][fpp(j) + 1] == 1) neighbors++;
			if(mas[fpp(i) + 1][fpm(j) - 1] == 1) neighbors++;
			if(mas[fpm(i) - 1][fpm(j) - 1] == 1) neighbors++;
			(neighbors == 1 || neighbors == 2 || neighbors == 3) ? mas2[i][j] = 1 : mas2[i][j] = 0;
		}
	}
	mas = mas2;
	drawField();
	count++;
	document.getElementById('count').innerHTML = count;
	timer = setTimeout(startLife, 700);
}

function fpm(i) {
	if(i == 0) return 30;
	else return i;
}

function fpp(i) {
	if(i == 29) return -1;
	else return i;
}

document.getElementById('start').onclick = startLife;
document.getElementById('stop').onclick = () => {
	clearTimeout(timer);
};
