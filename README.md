# react-carousel &middot; ![npm-badge]

[npm-badge]: https://img.shields.io/npm/v/history.svg?style=flat-square



このモジュールは、React用のモバイルで高速に処理するスライダーまたはcarouselです。
現在はモバイルのみで動作いたします。

# Demo
https://belcrod5.github.io/react-carousel/



# Install
```
npm install @belcrod5/react-carousel --save

import Carousel from '@belcrod5/react-carousel';
```

# Document
## Minimum working set up.

```js
import Carousel from '@belcrod5/react-carousel';

<Carousel>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Carousel>;
```

## Example Code.

```js
import Carousel from '@belcrod5/react-carousel';


firstFunc(){
    //スライダーの最初に移動
    this.ref.slider.current.goToSlide(0);
}

previousFunc(){
    //スライダーの最初に移動
    this.ref.slider.current.previous();
}

nextFunc(){
    //スライダーの最初に移動
    this.ref.slider.current.next();
}

<button onClick={ this.firstFunc }>first</button>
<button onClick={ this.previousFunc }>previous</button>
<button onClick={ this.nextFunc }>next</button>

<Carousel
    ref="slider"
    transitionDuration={200}
    minimumTouchDrag={50}
    afterChange={ this.afterChange }
>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Carousel>;
```

## Options
|  Parameter  | Type |  Descriotion  |
| ---- | ---- | ---- |
|  transitionDuration  |  Number  |  スライドが指定位置に戻るミリセカンド速度  |
|  minimumTouchDrag  |  Number  |  ドラッグ開始までの最小ドラッグ距離（ピクセル）  |
|  afterChange  |  Function  |  スライドが変更された時に呼び出されるコールバック<br>afterChange(oldIndex, newIndex)<br>oldIndex 変更前のインデックス。 newIndex変更後のインデックス  |

## Methods
|  Method  |  Description  |
| ---- | ---- |
|  goToSlide  |  指定したインデックスに移動  |
|  next  |  現在より１つ後にスライド  |
|  previous  |  現在より１つ前にスライド  |


# Background
React用のスライダー、carouselは既に
* react-carousel
* react-slick
* etc...

と数多く公開されていますが、これらのモジュールでは iPhone Chrome、Safari においてカクつきが発生する事が確認されましたので制作をいたしました。
カクつきの原因はcssアニメーションの不具合のようです。原因はブラウザ側にあると思われます。

