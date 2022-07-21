import { DanmakuData } from "../Danmaku/DanmakuData";
import { Renderer } from "./Renderer/Renderer";

/**
 * 舞台对象
 */
export class Stage {
  /** 舞台样式表 */
  protected stylesheet: HTMLStyleElement;
  /** 舞台容器 */
  readonly container: HTMLElement;
  /** 舞台本体 */
  readonly el: HTMLElement;
  /** 舞台尺寸 */
  readonly size: [number, number];
  /** 视点与舞台的距离 */
  readonly perspective: number
  /** 缩放比例 */
  protected scale: number
  /** 时间获取函数 */
  readonly getTime: () => number;
  /** 渲染器 */
  public renderer: Renderer;
  constructor({ container, size, perspective, getTime }: { container: HTMLElement; size?: [number, number]; perspective?: number; getTime: () => number; }) {
    this.container = container
    this.container.style.position = "relative"
    this.size = size || [1920, 1080];
    this.perspective = perspective || this.size[0]
    this.scale = 1
    this.getTime = getTime
    // 创建舞台
    this.el = document.createElement("div")
    this.el.classList.add("location-danmaku-stage")
    this.el.style.width = this.size[0] + "px"
    this.el.style.height = this.size[1] + "px"
    this.el.style.position = "absolute"
    this.el.style.transformOrigin = "left top"
    this.el.style.transformStyle = "preserve-3d"    // 启用3D效果
    this.el.style.perspective = this.perspective + "px" // 视点与弹幕舞台距离
    this.container.appendChild(this.el)
    
    this.resize()
    
    this.stylesheet = document.createElement("style")
    this.stylesheet.innerText += ".location-danmaku-stage.paused .location-danmaku-item { animation-play-state: paused }"
    this.stylesheet.innerText += ".location-danmaku-item.location-danmaku-invisible { visibility: hidden }"
    this.stylesheet.innerText += ".location-danmaku-item-content { -webkit-text-size-adjust: none; text-size-adjust: none}"
    this.container.appendChild(this.stylesheet)

    this.renderer = new Renderer(this.size)

    this.pause()    // 实例创建后设为暂停状态
  }
  /** 从列表中添加弹幕 */
  public addFromList(list: DanmakuData[]) {
    list.forEach((dan) => {
      this.add(dan)
    });
  }
  /** 添加一条弹幕 */
  public add(dan: DanmakuData) {
    // 检测弹幕是否早已结束
    if(dan.end > this.getTime()) {
      // 获得一条完整的弹幕
      let danmakuElement = this.renderer.render(dan)
      // 添加开始前隐藏机制
      danmakuElement.classList.add("location-danmaku-invisible")
      danmakuElement.addEventListener("animationstart", ()=>{
        danmakuElement.classList.remove("location-danmaku-invisible");
      }, {once: true})
      // 添加结束后销毁机制
      danmakuElement.addEventListener("animationend", (e)=>{
        if (e.animationName.substring(e.animationName.length-1) == "E") {
          this.el.removeChild(danmakuElement);
        }
      })
      // 根据当前时间设定动画延迟
      danmakuElement.style.animationDelay = this.renderer.animationRenderer.getCssAnimationDelay(dan.danmaku, dan.start - this.getTime())
      // 挂载
      this.mount(danmakuElement)
      return danmakuElement
    } else {
      console.log(`弹幕已结束: id-${dan.id} ${dan.end} < ${this.getTime()}`)
    }
  }
  /** 将弹幕DOM元素挂载到舞台上 */
  private mount(danElement: HTMLElement) {
    this.el.appendChild(danElement)
  }
  /** 根据id删除弹幕元素 */
  public remove_id(id: number | string) {
    let element = this.el.querySelector(`[data-id=${id}]`)
    element && this.el.removeChild(element)
  }
  /** 根据rid删除弹幕元素 */
  public remove_rid(rid: string) {
    let element = this.el.querySelector(`.location-danmaku-item-${rid}`)
    element && this.el.removeChild(element)
  }
  /** 清屏 */
  public clear() {
    this.el.innerHTML = ""
  }
  /** 播放 */
  public play() {
    this.el.classList.remove("paused")
  }
  /** 暂停 */
  public pause() {
    this.el.classList.add("paused")
  }
  public resize() {
    let {width, height} = this.container.getBoundingClientRect()
    if(width / this.size[0] < height / this.size[1]) {    // 宽占满
      this.scale = width / this.size[0]
      this.el.style.transform = `scale(${width / this.size[0]}, ${width / this.size[0]})`
      this.el.style.left = "0px"
      this.el.style.top = (height - this.size[1] * this.scale) / 2 + "px"
    } else {                                    // 高占满
      this.scale = height / this.size[1]
      this.el.style.transform = `scale(${height / this.size[1]}, ${height / this.size[1]})`
      this.el.style.left = (width - this.size[0] * this.scale) / 2 + "px"
      this.el.style.top = "0px"
    }
  }
}
