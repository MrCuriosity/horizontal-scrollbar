document.addEventListener('DOMContentLoaded', function() {

	var eleSbar = $('#scroll_bar');
	var eleSbtn = $('#scroll_button');
	var wrapper = $('#wrapper');
	var content = $('#content');

	window.addEventListener('load', ifHideScrollBar)
	window.addEventListener('resize', ifHideScrollBar)

	if (isMobile()) {
		content.addEventListener('touchstart', onTouchStart, false);
		eleSbtn.addEventListener('touchstart', function(e) {
			onDrag(e);
		}, false)
	} else {
		wrapper.addEventListener('wheel', function(e) {
			onMouseWheel(e);
		}, false)
		eleSbtn.addEventListener('mousedown', function(e) {
			onDrag(e);
		}, false)
	}

	function onTouchStart(e) {
		var pageyOnStart = e.touches[0].pageY;
		content.addEventListener('touchmove', onTouchMove, false)
		content.addEventListener('touchend', onTouchEnd, false)

		function onTouchMove(e) { onMouseWheel(e, pageyOnStart) }
		function onTouchEnd(e) {
			content.removeEventListener('touchmove', onTouchMove, false)
			content.removeEventListener('touchend', onTouchEnd, false)
		}
	}
	/** 鼠标滚动(触摸板滚动) */
	function onMouseWheel(e, pageyOnStart) {
		var speed = isMobile() ? 2 : 20;
		var distance = 0;
		var direction;
		/** 滚动方向 */
		if (isMobile()) {
			direction =	Boolean((pageyOnStart - e.changedTouches[0].pageY) < 0);
		} else {
			var oe = e || window.event;
			direction = oe.deltaY > 0;// true -> 向下滑动, false -> 向上滑动
		}

		if (direction) {
			distance = eleSbtn.offsetLeft - speed;
		} else {
			distance = eleSbtn.offsetLeft + speed;
		}
		setPosition(distance);
		oe.preventDefault && oe.preventDefault();
		return false;
	}

	/** 滑块拖拽 */
	function onDrag(e) {
		var oe = e || window.event;
		
		var eTargetTosBtnLeft = oe.clientX - eleSbtn.offsetLeft;// 事件源距滑块左侧的距离
		document.addEventListener('mousemove', onMouseMove, false);
		document.addEventListener('mouseup', onMouseUp, false);
		document.addEventListener('touchmove', onMouseMove, false);
		document.addEventListener('touchend', onMouseUp, false);
		
		function onMouseMove(e) {
			var oe = e || window.event;
			var distance = oe.clientX - eTargetTosBtnLeft;
			setPosition(distance);
		}

		function onMouseUp() {
			document.removeEventListener('mousemove', onMouseMove, false)
			document.removeEventListener('mouseup', onMouseUp, false)
			document.removeEventListener('touchmove', onMouseMove, false)
			document.removeEventListener('touchend', onMouseUp, false)
		}
	}

	/** 传入方向，同步scrollBar与content的位置 */
	function setPosition(distance) {
		// 边界值处理
		if (distance <= 0) distance = 0;
		if (distance > eleSbar.offsetWidth - eleSbtn.offsetWidth) {
			distance = eleSbar.offsetWidth - eleSbtn.offsetWidth;
		}
		var scale = distance / (eleSbar.offsetWidth - eleSbtn.offsetWidth);
		eleSbtn.style.left = distance + 'px';// 滑块位置 
		content.style.top = -(content.offsetHeight - wrapper.offsetHeight) * scale + 'px';// 文章位置
	}

	/*************** utils ***************/

	/** DOM选择器 */
	function $(selector) { return document.querySelector(selector) }

	/** userAgent检查 */
	function isMobile() { return /(iPhone|iPod|Android|ios|iPad|Window\sPhone|SymbianOS)/i.test(window.navigator.userAgent) }

	/** 内容是否超出视口高度 */
	function needScrollBar() { return (document.body.clientHeight - $('#content').clientHeight) < 0 }
	
	/** 是否隐藏滚动条 */
	function ifHideScrollBar() {
		if (needScrollBar()) {
			$('#scroll_bar').style.display = 'block';
		} else {
			$('#scroll_bar').style.display = 'none';
		}
	}
})
