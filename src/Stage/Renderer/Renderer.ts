import { DomRenderer } from "./DomRenderer";
import { AnimationRenderer } from "./AnimationRenderer";
import { DanmakuData } from "src/Danmaku/DanmakuData";

export class Renderer {
  /** Dom渲染器, 用于创建弹幕DOM元素 */
  public domRenderer: DomRenderer;
  /** 动画渲染器, 用于生成对应弹幕的style样式表 */
  public animationRenderer: AnimationRenderer;
  constructor(stageSize?: [number, number]) {
    this.domRenderer = new DomRenderer(stageSize)
    this.animationRenderer = new AnimationRenderer(stageSize)
  }
  /** 生成一个完整的弹幕DOM元素 */
  public render(dan: DanmakuData): HTMLElement {
    let danmakuDom = this.domRenderer.createDom(dan)
    this.animationRenderer.addAnimation(dan, danmakuDom)
    return danmakuDom
  }
}
