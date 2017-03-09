document.addEventListener('DOMContentLoaded', ()=> {
	$('#wrapper').addEventListener('wheel', function(e) {
		onMouseWheel($('#content'))
	})
	$('#wrapper').onmousewheel = onMouseWheel;
	
	var oSbar = $('#scroll_bar');
	var oSbtn = $('#scroll_button');
	var wrapper = $('#wrapper');
	var content = $('#content');


	/** 鼠标滚动(触摸板滚动) */
	function onMouseWheel(e) {
		// if (!ele) return;
		var oe = e || window.event;
		var speed = 20;
		var distance = 0;
		if (getDirection()) {
			distance = oSbar.offsetLeft - speed;
		} else {
			distance = oSbar.offsetLeft + speed;
		}
		setPosition(distance);
		oe.preventDefault && oe.preventDefault();
		return false;
		
	}

	// 滚动方向
	function getDirection(e) {
		var oe = e || window.event;
		console.log(oe.deltaY > 0)
		return oe.deltaY > 0;// true -> 向下滑动, false -> 向上滑动
	}

	/** 传入方向，同步scrollBar与content的位置 */
	function setPosition(distance) {
		if (distance <= 0) distance = 0;
		if (distance > oSbar.offsetWidth - oSbtn.offsetWidth) {
			distance = oSbar.offsetWidth - oSbtn.offsetWidth;
		}
		var scale = distance / (oSbar.offsetWidth - oSbtn.offsetWidth);
		oSbtn.style.left = distance + 'px';
		content.style.top = -(content.offsetHeight - wrapper.offsetHeight) * scale + 'px';
	}

	/** utils */
	function $(selector) { return document.querySelector(selector) }
})
