### 思路
> scrollBtnWidth / scrollBarWidth = wrapperWidth / contentWidth

> wrapper onMouseWheel → 操作scrollBtn到适当的位置

> scrollBtn onMouseDown(mouseMove) → 操作content到适当位置

> content.offsetHeight > wapper.offsetHeight 时, 显示scrollBar

> 根据userAgent来判断用touchEvent | mouseEvent

```sh
git clone git@github.com:MrCuriosity/horizontal-scrollbar.git
```
PC：
```js
open index.html
```
mobile devices
```js
// ngrok 或 内网访问
```