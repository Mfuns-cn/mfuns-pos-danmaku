import { DanmakuData } from "../../Danmaku/DanmakuData";
import { LDData } from "../../Danmaku/LDData";

/** 动画渲染器 */
export class AnimationRenderer {
  /** 舞台尺寸 */
  protected stageSize: [number, number];
  constructor(stageSize?: [number, number]) {
    this.stageSize = stageSize || [1920, 1080];
  }
  /** 为弹幕DOM元素添加含动画属性的style标签 */
  public addAnimation(dan: DanmakuData, container: HTMLElement) {
    let style = this.getStyleSheet(dan);
    container.appendChild(style);
  }
  /** 生成css动画的style标签 */
  public getStyleSheet(dan: DanmakuData): HTMLStyleElement {
    let danmaku = dan.danmaku
    let stylesheet = document.createElement("style");
    let aniId: string = "danmaku-A-" + dan.rid;
    let location: [number, number, number?] = danmaku.location || [0, 0, 0];
    let rotation: [number, number, number] = danmaku.rotation || [0, 0, 0];
    let scale: [number, number] = danmaku.scale || [1, 1];
    // 添加初始属性
    stylesheet.innerText += `.location-danmaku-item-${dan.rid} { transform: ${this.getCssTransform(location, rotation, scale)} }`;
    // 添加css动画帧属性
    danmaku.animations?.forEach((k, i) => {
      if (k.location) location = k.location;
      if (k.rotation) rotation = k.rotation;
      if (k.scale) scale = k.scale;
      stylesheet.innerText += `@keyframes ${aniId}-${i + 1} { to { transform: ${this.getCssTransform(location, rotation, scale)} } }`;
    });
    // 添加一个空的停留帧
    stylesheet.innerText += `@keyframes ${aniId}-E { }`;
    // 添加动画属性
    stylesheet.innerText += `.location-danmaku-item-${dan.rid} { animation: ${this.getCssAnimation(dan)}; animation-delay: ${this.getCssAnimationDelay(dan.danmaku)}; animation-fill-mode: forwards; }`;
    return stylesheet;
  }
  /** 获取transform属性值 */
  public getCssTransform(
    location: [number, number, number?],
    rotation: [number, number, number],
    scale: [number, number]
  ): string {
    let css_translate = `translate3d(${location[0] * this.stageSize[0]}px, ${location[1] * this.stageSize[1]}px, 0)`;
    let css_rotateX = `rotateX(${rotation[0]}deg)`;
    let css_rotateY = `rotateY(${rotation[1]}deg)`;
    let css_rotateZ = `rotateZ(${rotation[2]}deg)`;
    let css_scale = `scale(${scale[0]}, ${scale[1]})`;
    return `${css_translate} ${css_rotateX} ${css_rotateY} ${css_rotateZ} ${css_scale}`;
  }
  /** 获取animation属性值 */
  public getCssAnimation(dan: DanmakuData): string {
    let animationLine: string[] = [];
    // 根据动画帧添加动画属性
    dan.danmaku.animations?.forEach((k, i) => {
      animationLine.push(
        `danmaku-A-${dan.rid}-${i + 1} ${k.duration || 0}ms ${["linear", "ease-in", "ease-out", "ease-in-out"][k.ease || 0]}`
      );
    });
    // 添加停留动画属性
    animationLine.push(`danmaku-A-${dan.rid}-E ${dan.danmaku.duration || 0}ms linear`)
    return animationLine.join(", ");
  }
  /** 获取animation-delay属性值 */
  public getCssAnimationDelay(
    danmaku: LDData,
    offset: number = 0    // 延迟时间
  ): string{
    let delay = 0;
    let delayLine: string[] = [];
    // 为每一动画帧设置delay
    danmaku.animations?.forEach((k: { duration?: number }) => {
      delayLine.push(delay + offset + "ms");
      delay += k.duration || 0;
    });
    // 为停留帧设置delay
    delayLine.push(delay + offset + "ms")
    return delayLine.join(", ");
  }
}
