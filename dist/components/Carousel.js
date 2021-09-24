"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Carousel = void 0;

require("core-js/modules/es.parse-int.js");

var _react = _interopRequireWildcard(require("react"));

var _CarouselModule = _interopRequireDefault(require("./Carousel.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class Carousel extends _react.default.Component {
  /* -----------------------------------------------
  * constructor : コンストラクタ
  ----------------------------------------------- */
  constructor(props) {
    super(props);
    this._mouseDownPos = {
      x: 0,
      y: 0,
      src: {
        x: 0,
        y: 0
      }
    };
    this._currentPos = {
      x: 0,
      y: 0
    };
    this._movePosX = 0;
    this._startPosX = 0;
    this._isDragStart = false;
    this._currentIndex = 0;
    this._touchStartTime = 0;
    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);
    this._animstep = this._animstep.bind(this);
    this._rootRef = /*#__PURE__*/(0, _react.createRef)();
  }
  /* -----------------------------------------------
  * componentDidMount
  * コンポーネントがマウント(配置)
  ----------------------------------------------- */


  componentDidMount() {}
  /* -----------------------------------------------
  * componentDidUpdate
  ----------------------------------------------- */


  componentDidUpdate(prevProps) {}
  /* -----------------------------------------------
  * _getWidth
  ----------------------------------------------- */


  _getWidth() {
    return this._rootRef.current.clientWidth;
  }
  /* -----------------------------------------------
  * _onTouchStart
  ----------------------------------------------- */


  _onTouchStart(evn) {
    //ドラッグ開始位置
    const touch = evn.touches[0];
    this._mouseDownPos.x = touch.clientX - this._currentPos.x;
    this._mouseDownPos.y = touch.clientY - this._currentPos.y;
    this._mouseDownPos.src.x = touch.clientX;
    this._mouseDownPos.src.y = touch.clientY; //横スクロール可能チェックする

    let isHScroll = false;
    let elm = evn.target;

    while (elm) {
      elm = elm.parentElement; //上位のスライダーまで到達した時は中断

      if (elm == this._rootRef.current) break;

      if (elm.clientWidth < elm.scrollWidth) {
        isHScroll = true;
        break;
      }
    } //横スクロールできる要素をタップした時はドラッグできない


    this._isDragStart = !isHScroll; //ドラッグ開始時

    if (this._isDragStart) {
      //アニメーションを停止
      window.cancelAnimationFrame(this._requestAnimationFrameId);
      this._touchStartTime = new Date().getTime();
    }
  }
  /* -----------------------------------------------
  * _onTouchMove
  ----------------------------------------------- */


  _onTouchMove(evn) {
    //ドラッグ判定
    if (!this._isDragStart) return;
    this._diffX = this._mouseDownPos.src.x - evn.touches[0].clientX; //ドラッグ開始しきい値

    if (Math.abs(this._diffX) < this.props.minimumTouchDrag) return; //差がプラスかマイナスで加算か減算に切り替える

    const diffMinimumTouchDrag = this._diffX > 0 ? this.props.minimumTouchDrag : this.props.minimumTouchDrag * -1; //ドラッグ移動量計算

    let posX = this._mouseDownPos.x - evn.touches[0].clientX - diffMinimumTouchDrag;
    this._currentPos.x = parseInt(posX) * -1; //制限処理

    if (this._currentPos.x > 0) {
      this._currentPos.x = 0;
    } else if (this._getWidth() * (this.props.children.length - 1) * -1 > this._currentPos.x) {
      this._currentPos.x = this._getWidth() * (this.props.children.length - 1) * -1;
    } //縦移動があった場合


    if (Math.abs(this._mouseDownPos.src.y - evn.touches[0].clientY) > 50) {
      //横移動をなくす
      this._currentPos.x = this._currentIndex * this._getWidth() * -1;
    } //スタイルに設定


    this._rootRef.current.style.transform = 'translate3d(' + this._currentPos.x + 'px, 0px, 0px)';
  }
  /* -----------------------------------------------
  * _easeInOutSine
  ----------------------------------------------- */


  _easeInOutSine(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
  }
  /* -----------------------------------------------
  * _animstep
  * アニメーション処理
  ----------------------------------------------- */


  _animstep(timestamp) {
    //オブジェクトが無い時はスキップ
    if (!this._rootRef.current) return; //開始時間の初期化

    if (!this._startTimestamp) this._startTimestamp = timestamp; //時間を計算

    var time = timestamp - this._startTimestamp; //アニメーション保管処理計算

    let val = this._easeInOutSine(time / this.props.transitionDuration);

    if (time > this.props.transitionDuration) val = 1.0; //開始位置と移動量とアニメーション保管値から現在の位置を計算

    this._currentPos.x = Math.round(this._startPosX + this._movePosX * val); //スタイルに設定する

    this._rootRef.current.style.transform = 'translate3d(' + this._currentPos.x + 'px, 0px, 0px)'; //アニメーション時間内

    if (time < this.props.transitionDuration) {
      //もう一度アニメーション
      this._requestAnimationFrameId = window.requestAnimationFrame(this._animstep);
    } else {
      const currentIndex = this._getCurrentSlideIndex();

      if (this._currentIndex != currentIndex) {
        //インデックス変更コールバック
        if (this.props.afterChange) this.props.afterChange(this._currentIndex, currentIndex);
      }

      this._currentIndex = currentIndex;
    }
  }
  /* -----------------------------------------------
  * _getCurrentSlideIndex
  * 現在のスライドインデックスを取得
  ----------------------------------------------- */


  _getCurrentSlideIndex() {
    let addX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    let index = Math.round((this._currentPos.x + addX) / this._getWidth() * -1); //２画面飛ばした時は1画面に抑える

    if (Math.abs(index - this._currentIndex) > 1) {
      index = index - this._currentIndex > 0 ? this._currentIndex + 1 : this._currentIndex - 1;
    }

    if (index < 0) {
      index = 0;
    } else if (this.props.children.length <= index) {
      index = this.props.children.length - 1;
    }

    return index;
  }
  /* -----------------------------------------------
  * _onTouchEnd
  ----------------------------------------------- */


  _onTouchEnd(evn) {
    const speedX = this._diffX / (new Date().getTime() - this._touchStartTime); //現在のスライド位置


    const slideIndex = this._getCurrentSlideIndex(-200 * speedX); //スライドインデックス指定


    this.goToSlide(slideIndex);
    this._diffX = 0;
  }
  /* -----------------------------------------------
  * next
  ----------------------------------------------- */


  next() {
    //次へ
    this.goToSlide(this._getCurrentSlideIndex() + 1);
  }
  /* -----------------------------------------------
  * previous
  ----------------------------------------------- */


  previous() {
    //前へ
    this.goToSlide(this._getCurrentSlideIndex() - 1);
  }
  /* -----------------------------------------------
  * goToSlide
  * スライドのインデックス指定
  ----------------------------------------------- */


  goToSlide(slideIndex) {
    //制限
    if (slideIndex < 0 || this.props.children.length <= slideIndex) return; //現在位置を開始位置に置き換える

    this._startPosX = this._currentPos.x; //移動位置

    this._movePosX = slideIndex * this._getWidth() * -1; //移動量を計算

    this._movePosX -= this._startPosX; //アニメーションを停止

    window.cancelAnimationFrame(this._requestAnimationFrameId); //アニメーション開始

    this._requestAnimationFrameId = window.requestAnimationFrame(this._animstep); //開始時間を初期化

    this._startTimestamp = null;
  }
  /* -----------------------------------------------
  * render
  ----------------------------------------------- */


  render() {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: _CarouselModule.default.carousel,
      onTouchStart: this._onTouchStart,
      onTouchMove: this._onTouchMove,
      onTouchEnd: this._onTouchEnd
    }, /*#__PURE__*/_react.default.createElement("div", {
      ref: this._rootRef,
      className: _CarouselModule.default.wrapper
    }, this.props.children.map((child, index) => /*#__PURE__*/_react.default.createElement("li", {
      key: index
    }, child))));
  }

} // Propsのデフォルト値


exports.Carousel = Carousel;
Carousel.defaultProps = {
  //アニメーション速度
  transitionDuration: 300,
  //次のスライドに移動するためのスワイプする距離
  minimumTouchDrag: 50
};