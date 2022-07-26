import { DanmakuData } from "../../Danmaku/DanmakuData";
import numberToColor from "../../utils/numberToColor";

/** Dom渲染器, 用于创建弹幕DOM元素 */
export class DomRenderer {
  protected stageSize: [number, number];
  constructor(stageSize?: [number, number]) {
    this.stageSize = stageSize || [1920, 1080];
  }
  /** 创建弹幕DOM元素 */
  public createDom(dan: DanmakuData): HTMLDivElement {
    let danmaku = dan.danmaku

    // 创建容器元素
    let container = document.createElement("div");
    container.classList.add("pos-danmaku-item", `pos-danmaku-item-${dan.rid}`);
    container.setAttribute("data-id", String(dan.id))
    container.setAttribute("r-id", dan.rid)
    container.style.position = "absolute";
    container.style.display = "inline-block";
    container.style.transformOrigin = "left top";

    // 创建内容元素
    let content = document.createElement("div");
    content.classList.add("pos-danmaku-item-content");
    content.innerHTML = danmaku.content
    content.style.whiteSpace = "pre";
    content.style.transform = danmaku.anchor ? `translate(${-danmaku.anchor[0]*100}%, ${-danmaku.anchor[1]*100}%)` : "";
    
    // 设置基本样式
    content.style.fontSize = this.setRelativeSize(danmaku.size, danmaku.relative) + "px"
    content.style.color = this.getColorString(danmaku.color)
    content.style.fontWeight = danmaku.bold ? "700" : "400";
    content.style.fontFamily = danmaku.font || "SimHei";
    content.style.textShadow = danmaku.shadow ? `${this.setRelativeSize(danmaku.shadow[1], danmaku.relative)}px ${this.setRelativeSize(danmaku.shadow[2], danmaku.relative)}px ${this.setRelativeSize(danmaku.shadow[3], danmaku.relative)}px ${this.getColorString(danmaku.shadow[0])} ` : ""
    content.style.webkitTextStroke = danmaku.stroke ? `${this.setRelativeSize(danmaku.stroke[1], danmaku.relative)}px ${this.getColorString(danmaku.stroke[0])}` : ""

    container.appendChild(content)
    return container
  }
  /** 根据相对屏幕宽度设置值 */
  public setRelativeSize(value?: number, relative?: number) {
    return value ? value / (relative || 800) * this.stageSize[0] : 0
  }
  public getColorString(value: number | string) {
    if (typeof value == "number") {
      return numberToColor(value)
    }
    else {
      return value
    }
  }
}
