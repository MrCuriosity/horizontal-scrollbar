### 思路
> 原先的思路是用CSS来做，未遂

> 第二个思路：

> scrollBtnWidth / scrollBarWidth = wrapperWidth / contentWidth

> wrapper onMouseWheel → 操作scrollBtn到适当的位置

> scrollBtn onMouseDown(mouseMove) → 操作content到适当位置

> content.offsetHeight > wapper.offsetHeight 时, 显示scrollBar

> 根据userAgent来判断用touchEvent | mouseEvent

### USAGE
```sh
git clone git@github.com:MrCuriosity/horizontal-scrollbar.git
```
PC：
```js
open index.html
```
mobile devices
```js
// 手机只测试了iOS兼容
// ngrok 或 内网访问
```