Date.prototype.addDays = function(days) {
	this.setDate(this.getDate()+days);
}

Date.prototype.addMonths = function(months) {
	this.setMonth(this.getMonth()+months);
}

Date.prototype.addYears = function(years) {
	this.setFullYear(this.getFullYear()+years);
}

Date.prototype.isEqualTo = function(day,month,year) {
	if ((day==this.getDate()) && (month==this.getMonth()) && (year==this.getFullYear())) {
		return true;
	} else {
		return false;
	}
}

Date.prototype.isEqualToDate = function(date) {
	return this.isEqualTo(date.getDate(),date.getMonth(),date.getFullYear());
}


Date.prototype.getWeekDayFromMonday = function() {
	return (this.getDay() + 6) % 7;
}


function Calendari(parentNode) {
	var noms_dies = Array('dilluns','dimarts','dimecres','dijous','divendres','dissabte','diumenge');
	var noms_mesos = Array('gener','febrer','març','abril','maig','juny','juliol','agost','setembre','octubre','novembre','desembre');
	// Today
	var date = new Date();
	var baseNode = document.createElement('div');
	baseNode.id = 'calendar';
	parentNode.appendChild(baseNode);
	var months_list = document.createElement('div');
	months_list.id = 'cycle-slideshow';
	months_list.className =  'months-list';
	baseNode.appendChild(months_list);

	function setHiddenInfo(node,key,value) {
		node.setAttribute('data-'+key,value);
	};

	function getHiddenInfo(node,key) {
		return node.getAttribute('data-'+key);
	};

	function mesEnrere (event) {
		date.addMonths(-1);
		generaMesActual();
	};

	function mesEnvant (event) {
		date.addMonths(1);
		generaMesActual();
	};

	function anyEnrere (event) {
		date.addYears(-1);
		generaMesActual();
	};

	function anyEnvant (event) {
		date.addYears(1);
		generaMesActual();
	};

	function seleccionaDiaAvui (event) {
		date = new Date();
		generaMesActual();
	};

	function generaDia(node,contents) {
		var td = document.createElement('td');
		node.appendChild(td);
		td.appendChild( document.createTextNode(contents) );
	};

	function showNextPeriod (e) {
		var node = e.currentTarget;
		var novadata = new Date();
		novadata.setTime(getHiddenInfo(node,'date'));
		novadata.addDays(28);
		var d = novadata.getWeekDayFromMonday();
		var m = novadata.getMonth();
		var y = novadata.getFullYear();
		alert('Es preveu regla per al proper ' + noms_dies[d] + ' ' + novadata.getDate() + ' de ' + noms_mesos[m] + ' de ' + y);
	};

	this.generaCalendari = function() {
		var heading = document.createElement('h2');
		baseNode.parentNode.appendChild(heading);
		heading.appendChild( document.createTextNode(noms_mesos[0] + ' ' + 0) );

		var prevMonth = date;
		var nextMonth = date;
		prevMonth.addMonths(-1);
		generaMesActual(prevMonth.getFullYear(),prevMonth.getMonth(),prevMonth.getDate());
		generaMesActual(date.getFullYear(),date.getMonth(),date.getDate());
		nextMonth.addMonths(1);
		generaMesActual(nextMonth.getFullYear(),nextMonth.getMonth(),nextMonth.getDate());

 		/* Prev/next controls */
		var btn = document.createElement('button');
		btn.id = 'prevMonth';
		btn.appendChild(document.createTextNode('<'));
		baseNode.parentNode.appendChild(btn);

		btn = document.createElement('button');
		btn.appendChild( document.createTextNode('Avui') );
		btn.onclick = seleccionaDiaAvui;
		baseNode.parentNode.appendChild(btn);

		btn = document.createElement('button');
		btn.id = 'nextMonth';
		btn.appendChild(document.createTextNode('>'));
		baseNode.parentNode.appendChild(btn);

		$('.months-list').cycle({
			fx: 'scrollUp',
			speed: 200,
			timeout: 0
		});
		alert(baseNode.outerHTML);
	}

	function generaMesActual (y,m,d) {
		var div = document.createElement('div');
		div.id = 'month';
		var taula = document.createElement('table');
		taula.className = 'calendari';
		//div.appendChild(taula);
		//months_list.appendChild(div);
		months_list.appendChild(taula);

/*
		var hammer = Hammer(taula);
		hammer.on('swipedown dragdown',mesEnrere);
		hammer.on('swipeup dragup',mesEnvant);
		hammer.on('swiperight dragright',anyEnrere);
		hammer.on('swipeleft dragleft',anyEnvant);
*/

		var row = document.createElement('tr');
		taula.appendChild(row);
		generaDia(row,'Dll');
		generaDia(row,'Dm');
		generaDia(row,'Dc');
		generaDia(row,'Dj');
		generaDia(row,'Dv');
		generaDia(row,'Ds');
		generaDia(row,'Dg');

		var firstDay = new Date(y, m, 1);
		var diasetmana = firstDay.getWeekDayFromMonday();
		firstDay.addDays(- ((diasetmana>0)?diasetmana:7) );

		var lastDay = new Date(y, m + 1, 0);

		row = document.createElement('tr');
		taula.appendChild(row);

		// 42 dies: 6 setmanes
		for (var setmana=0; setmana<6; setmana++) {
			row = document.createElement('tr');
			taula.appendChild(row);
			for (var weekday=0; weekday<7; weekday++) {
				var month = firstDay.getMonth();
				var td = document.createElement('td');
				setHiddenInfo(td,'date',firstDay.getTime());
				var ham = Hammer(td);
				ham.on('tap', showNextPeriod);
				if (month==m) {
					td.className = 'mesactual';
				} else {
					td.className = 'mesdistint';
				}
				// Is it today?
				if (firstDay.isEqualToDate(new Date())) {
					td.className = 'avui';
				}
				row.appendChild(td);
				var day = firstDay.getDate();
				td.appendChild( document.createTextNode(day) );
				firstDay.setDate( day + 1 );
			}
		}

	};
};

