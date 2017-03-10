document.addEventListener('DOMContentLoaded', function() {
	$('#wrapper').addEventListener('wheel', function(e) {
		onMouseWheel(e);
	})
	$('#scroll_button').addEventListener('mousedown', function(e) {
		onDrag(e);
	})
	
	var oSbar = $('#scroll_bar');
	var oSbtn = $('#scroll_button');
	var wrapper = $('#wrapper');
	var content = $('#content');


	/** 鼠标滚动(触摸板滚动) */
	function onMouseWheel(e) {
		var oe = e || window.event;
		var speed = 20;
		var distance = 0;
		if (getDirection()) {
			distance = oSbtn.offsetLeft - speed;
		} else {
			distance = oSbtn.offsetLeft + speed;
		}
		setPosition(distance);
		oe.preventDefault && oe.preventDefault();
		return false;
		
	}

	/** 滑块拖拽 */
	function onDrag(e) {
		var oe = e || window.event;
		var eTargetTosBtnLeft = oe.clientX - oSbtn.offsetLeft;// 事件源距滑块左侧的距离
		document.addEventListener('mousemove', onMouseMove, false);
		document.addEventListener('mouseup', onMouseUp, false);
		
		function onMouseMove(e) {
			var oe = e || window.event;
			var distance = oe.clientX - eTargetTosBtnLeft;
			console.log('oSbtn.offsetLeft', oSbtn.offsetLeft)
			console.log('distance', distance)
			console.log('')
			setPosition(distance);
		}
		function onMouseUp() {
			document.removeEventListener('mousemove', onMouseMove, false)
			document.removeEventListener('mouseup', onMouseUp, false)
		}
	}

	/** 滚动方向 */
	function getDirection(e) {
		var oe = e || window.event;
		return oe.deltaY > 0;// true -> 向下滑动, false -> 向上滑动
	}

	/** 传入方向，同步scrollBar与content的位置 */
	function setPosition(distance) {
		// 边界值处理
		if (distance <= 0) distance = 0;
		if (distance > oSbar.offsetWidth - oSbtn.offsetWidth) {
			distance = oSbar.offsetWidth - oSbtn.offsetWidth;
		}
		var scale = distance / (oSbar.offsetWidth - oSbtn.offsetWidth);
		oSbtn.style.left = distance + 'px';// 滑块位置 
		content.style.top = -(content.offsetHeight - wrapper.offsetHeight) * scale + 'px';// 文章位置
	}

	/** utils */
	function $(selector) { return document.querySelector(selector) }
})
