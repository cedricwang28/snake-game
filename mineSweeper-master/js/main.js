$(function () {


	let freezeOrNot = 0;

	let mineArr = [];
	while (mineArr.length < 10) {
		let randomNum = (Math.floor(Math.random() * 81)) + 1;
		if (mineArr.indexOf(randomNum) == -1) {
			mineArr.push(randomNum);
		}

	}

	

	for (let i = 0; i < 10; i++) {
		$('.grid').eq(mineArr[i] - 1).find('.forMine').attr('src', "img/mine.jpeg").addClass('mine').attr("exist", 1);
	}


	$('.grid').click(function (e) {


		if (e.shiftKey) {
			if (!$(this).find('.forFlag').attr('src')) {
				$('.mineRemain').text($('.mineRemain').text() - 1);
				if ($('.mineRemain').text() < 0) {
					$('.mineRemain').text(0);
					return false;
				}
				$(this).find('.forFlag').attr('src', "img/flag.png").addClass('flag').attr("exist", 1);
				$(this).find('.forFlag').css('z-index', 7);

			} else {
				$(this).find('.forFlag').attr('src', "").removeClass('flag').attr("exist", 0);
				$(this).find('.forFlag').css('z-index', 1);
				$('.mineRemain').text(parseFloat($('.mineRemain').text()) + 1);
				return false;
			}
		}


		if ($(this).find('.mine').attr('exist') && !$(this).find('.forFlag').attr('src')) {

			$(this).find('.mine').attr('src', 'img/redMine.jpeg');
			$('.grid').find('.mine').css('z-index', 5);
			$('.popSound').trigger('play');
			$('.face').find('img').attr('src', 'img/lose.png');
			clearInterval(setClock);
			freezeOrNot = 1;


			let allGrid = document.getElementsByClassName('grid');
			for (let i = 0; i < 81; i++) {
				if (!$(allGrid[i]).find('.forMine').attr('src') &&
					!$(allGrid[i]).find('.forFlag').attr('src') &&
					!$(allGrid[i]).find('.countNum').text()) {
					$(allGrid[i]).trigger('click');
				}
			}

		}


		let allMine = document.getElementsByClassName('mine');
		let mineMatch = 0;
		for (let i = 0; i < 10; i++) {
			if ($(allMine[i]).parent().find('.forFlag').attr('src')) {
				mineMatch++;
			}
		}

		let allTheGrid = document.getElementsByClassName('grid');
		let notClicked = 0;

		for (let i = 0; i < 81; i++) {
			if ($(allTheGrid[i]).find('.countNum').text()==null &&
				!$(allTheGrid[i]).find('.forFlag').attr('src')) {
				notClicked++;
			}
			if(notClicked > 0){
				break;
			}
		}


		if (parseFloat($(this).find('.countNum').text()) >= 0) {
			return false;
		}

		let that = $(this);
		countAroundFun(that);

		if (freezeOrNot) {
			return false;
		}

		if (mineMatch == 10 && notClicked == 0) {
			$('.face').find('img').attr('src', 'img/yeah.jpg');
			$('.start').trigger('play');
			clearInterval(setClock);
			freezeOrNot = 1;
		}

	});


	function countAroundFun(a) {
		let countAround = 0;
		let around1 = a.attr("number") - 10;
		let around2 = a.attr("number") - 9;
		let around3 = a.attr("number") - 8;
		let around4 = a.attr("number") - 1;
		let around5 = parseFloat(a.attr("number")) + 1;
		let around6 = parseFloat(a.attr("number")) + 8;
		let around7 = parseFloat(a.attr("number")) + 9;
		let around8 = parseFloat(a.attr("number")) + 10;

		// console.log(around1,around2,around3,around4,around5,around6,around7,around8);
		let qualifiedAroundNum = [];

		if (around1 > 0 && around1 % 9 != 0) {
			qualifiedAroundNum.push(around1);
			if ($('.grid').eq(around1 - 1).find('.mine').attr("exist")) {
				countAround++;
			}
		}
		if (around2 > 0) {
			qualifiedAroundNum.push(around2);
			if ($('.grid').eq(around2 - 1).find('.mine').attr("exist")) {
				countAround++;
			}
		}
		if (around3 > 0 && around3 % 9 != 1) {
			qualifiedAroundNum.push(around3);
			if ($('.grid').eq(around3 - 1).find('.mine').attr("exist")) {
				countAround++;
			}
		}
		if (around4 > 0 && around4 % 9 != 0) {
			qualifiedAroundNum.push(around4);
			if ($('.grid').eq(around4 - 1).find('.mine').attr("exist")) {
				countAround++;
			}
		}
		if (around5 % 9 != 1 && around5 <= 81) {
			qualifiedAroundNum.push(around5);
			if ($('.grid').eq(around5 - 1).find('.mine').attr("exist")) {
				countAround++;
			}
		}
		if (around6 <= 81 && around6 % 9 != 0) {
			qualifiedAroundNum.push(around6);
			if ($('.grid').eq(around6 - 1).find('.mine').attr("exist")) {
				countAround++;
			}
		}
		if (around7 <= 81) {
			qualifiedAroundNum.push(around7);
			if ($('.grid').eq(around7 - 1).find('.mine').attr("exist")) {
				countAround++;
			}
		}
		if (around8 <= 81 && around8 % 9 != 1) {
			qualifiedAroundNum.push(around8);
			if ($('.grid').eq(around8 - 1).find('.mine').attr("exist")) {
				countAround++;
			}
		}

		if (!a.find('.forMine').attr('src') && !a.find('.forFlag').attr('src')) {
			a.find('.countNum').text(countAround);
			a.find('img').hide();
			a.find('.gridInner').hide();

			if (countAround == 2) {
				a.find('.countNum').css('color', 'green');
			}
			if (countAround == 3) {
				a.find('.countNum').css('color', 'red');
			}
			if (countAround == 4) {
				a.find('.countNum').css('color', 'darkblue');
			}
			if (countAround == 5) {
				a.find('.countNum').css('color', 'crimson');
			}
			if (countAround == 0) {
				a.find('.countNum').css('color', 'lightgray');
				for (let i = 0; i < qualifiedAroundNum.length; i++) {

					let currentGrid = $('.grid').eq(qualifiedAroundNum[i] - 1);
					$(currentGrid).trigger('click');
					
				}
			}
		}
	}


	$('.grid').dblclick(function () {
		if (parseFloat($(this).find('.countNum').text()) > 0) {
			let around1 = $(this).attr("number") - 10;
			let around2 = $(this).attr("number") - 9;
			let around3 = $(this).attr("number") - 8;
			let around4 = $(this).attr("number") - 1;
			let around5 = parseFloat($(this).attr("number")) + 1;
			let around6 = parseFloat($(this).attr("number")) + 8;
			let around7 = parseFloat($(this).attr("number")) + 9;
			let around8 = parseFloat($(this).attr("number")) + 10;

			let flagAndMine = 0;
			let qualifiedAroundNum = [];

			if (around1 > 0 && around1 % 9 != 0) {
				qualifiedAroundNum.push(around1);
				if ($('.grid').eq(around1 - 1).find('.forFlag').attr('src')) {
					flagAndMine++;
				}
			}
			if (around2 > 0) {
				qualifiedAroundNum.push(around2);
				if ($('.grid').eq(around2 - 1).find('.forFlag').attr('src')) {
					flagAndMine++;
				}
			}
			if (around3 > 0 && around3 % 9 != 1) {
				qualifiedAroundNum.push(around3);
				if ($('.grid').eq(around3 - 1).find('.forFlag').attr('src')) {
					flagAndMine++;
				}
			}
			if (around4 > 0 && around4 % 9 != 0) {
				qualifiedAroundNum.push(around4);
				if ($('.grid').eq(around4 - 1).find('.forFlag').attr('src')) {
					flagAndMine++;
				}
			}
			if (around5 % 9 != 1 && around5 <= 81) {
				qualifiedAroundNum.push(around5);
				if ($('.grid').eq(around5 - 1).find('.forFlag').attr('src')) {
					flagAndMine++;
				}
			}
			if (around6 <= 81 && around6 % 9 != 0) {
				qualifiedAroundNum.push(around6);
				if ($('.grid').eq(around6 - 1).find('.forFlag').attr('src')) {
					flagAndMine++;
				}
			}
			if (around7 <= 81) {
				qualifiedAroundNum.push(around7);
				if ($('.grid').eq(around7 - 1).find('.forFlag').attr('src')) {
					flagAndMine++;
				}
			}
			if (around8 <= 81 && around8 % 9 != 1) {
				qualifiedAroundNum.push(around8);
				if ($('.grid').eq(around8 - 1).find('.forFlag').attr('src')) {
					flagAndMine++;
				}
			}

			if (parseFloat($(this).find('.countNum').text()) == flagAndMine) {
				for (let i = 0; i < qualifiedAroundNum.length; i++) {
					if ($('.grid').eq(qualifiedAroundNum[i] - 1).find('.flag').attr('src') &&
						!$('.grid').eq(qualifiedAroundNum[i] - 1).find('.forMine').attr('src')) {

						$('.grid').eq(qualifiedAroundNum[i] - 1).find('.forMine').attr('src', 'img/wrongMine.png');
						$('.grid').eq(qualifiedAroundNum[i] - 1).find('.forMine').css('z-index',9);
						clearInterval(setClock);
					}


					$('.grid').eq(qualifiedAroundNum[i] - 1).trigger('click');
				}

			}

		}
	});


	let setClock = setInterval(function(){
		$('.clock').text(parseFloat($('.clock').text()) + 1);
	}, 1000);  



	$('.face').click(function () {

		window.location.reload();

	});




});