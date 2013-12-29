Date.prototype.isEqualTo = function(day,month,year) {
	if ((day==this.getDate()) && (month==this.getMonth()) && (year==this.getFullYear())) {
		return true;
	} else {
		return false;
	}
}

Date.prototype.getWeekDayFromMonday = function() {
	return (this.getDay() + 6) % 7;
}


function Calendari() {
	var noms_dies = Array('dilluns','dimarts','dimecres','dijous','divendres','dissabte','diumenge');
	var noms_mesos = Array('gener','febrer','març','abril','maig','juny','juliol','agost','setembre','octubre','novembre','desembre');

	function setHiddenInfo(node,key,value) {
		node.setAttribute('data-'+key,value);
	};

	function getHiddenInfo(node,key) {
		return node.getAttribute('data-'+key);
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
		novadata.setDate(novadata.getDate()+28);
		var d = novadata.getWeekDayFromMonday();
		var m = novadata.getMonth();
		var y = novadata.getFullYear();
		alert('Es preveu regla per al proper ' + noms_dies[d] + ' ' + novadata.getDate() + ' de ' + noms_mesos[m] + ' de ' + y);
	};

	this.generaMesActual = function(base) {
		var today = new Date();
		var year = today.getFullYear();
		var date = new Date(), y = date.getFullYear(), m = date.getMonth(), d = date.getDate();
		var heading = document.createElement('h2');
		base.appendChild(heading);
		heading.appendChild( document.createTextNode(noms_mesos[m] + ' ' + y) );

		var taula = document.createElement('table');
		taula.className = 'calendari';
		base.appendChild(taula);

		var row = document.createElement('tr');
		taula.appendChild(row);
		generaDia(row,'Dll');
		generaDia(row,'Dm');
		generaDia(row,'Dc');
		generaDia(row,'Dj');
		generaDia(row,'Dv');
		generaDia(row,'Ds');
		generaDia(row,'Dg');

		var firstDay = new Date(y, m, 2);
		var diasetmana = firstDay.getWeekDayFromMonday();
		firstDay.setDate( firstDay.getDate() - ((diasetmana>0)?diasetmana:7) );

		var lastDay = new Date(y, m + 1, 0);

		row = document.createElement('tr');
		taula.appendChild(row);

		var setmana = 1;
		// 42 dies: 6 setmanes
		for (var setmana=0; setmana<6; setmana++) {
			row = document.createElement('tr');
			taula.appendChild(row);
			for (var weekday=0; weekday<7; weekday++) {
				var month = firstDay.getMonth();
				var td = document.createElement('td');
				setHiddenInfo(td,'date',firstDay.getTime());
				td.onclick = showNextPeriod;
				if (month==m) {
					td.className = 'mesactual';
					if (firstDay.isEqualTo(d,m,y)) {
						td.className = 'avui';
					}
				} else {
					td.className = 'mesdistint';
				}
				row.appendChild(td);
				var day = firstDay.getDate();
				td.appendChild( document.createTextNode(day) );
				firstDay.setDate( day + 1 );
			}
		}

	};
};

