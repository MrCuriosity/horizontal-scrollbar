### 思路
> scrollBtnWidth / scrollBarWidth = wrapperWidth / contentWidth
wrapper onMouseWheel → 操作scrollBtn到适当的位置
scrollBtn onMouseDown(mouseMove) → 操作content到适当位置
content.offsetHeight > wapper.offsetHeight 时, 显示scrollBar