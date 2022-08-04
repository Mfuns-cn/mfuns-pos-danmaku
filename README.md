# mfuns-pos-danmaku

## 下载 & 安装
### 标签导入
下载 lib/mfunsPosDanmaku.js 文件，使用 script 标记导入到 html 中

### 使用 npm 安装
```
npm i mfuns-pos-danmaku
```
导入方式
```javascript
import { MfunsPosDanmaku } from "mfuns-pos-danmaku";
```
实例化
```javascript
let advancedDanmaku = new MfunsPosDanmaku(
  // 挂载的DOM容器, 其css样式的position属性须设置为relative/absolute
  container: document.getElementById("advanced-danmaku"),
  // 拉取弹幕列表
  getDanmaku: () => {
    return ([{...}, {...}])
  },
  // 舞台基本尺寸, 可选
  stageSize: [1920, 1080]
);
```

## 方法
#### play()
播放

#### pause()
暂停

#### seek(```time```:number)
跳转到指定位置(单位ms)

#### time():number
获取弹幕引擎的播放时间，单位为ms

#### reload()
在不重置时间的情况下清空并重新加载弹幕

#### reset()
重置弹幕引擎并重新加载弹幕

#### addDanmaku(danmaku)
添加一条弹幕到时间轴，适用于新增实时弹幕

#### playDanmaku(danmaku)
播放一条弹幕，即直接添加一条弹幕到舞台，适用于弹幕编辑效果预览

#### resize()
根据舞台容器的尺寸调整舞台大小

当浏览器窗口大小变化时，会自动调用resize()方法调整舞台大小

## 数据格式

### 传入的弹幕列表格式
``` json5
[
  {
    "id": 0,  // 弹幕唯一标识id, 可选, 接受数字/字符串格式
    "text": "{...}", // 定位弹幕JSON字符串
    "time": 0        // 弹幕发送位置, 可选, 弹幕内容无发送时间设置时将使用该属性替代
  },
  ...
]
```
### MFUNS定位弹幕格式
``` json5
{
  "content": "",        // 弹幕内容
  "size": 25,           // 弹幕字号
  "color": 16777215,    // 弹幕颜色(Hex字符串/Hex转十进制)
  "bold": false,        // 粗体
  "font": "SimHei",     // 字体
  "shadow": [16777215, 0, 0, 0],  // 阴影(可选) [颜色, x, y, 模糊]
  "stroke": [16777215, 1],        // 描边(可选) [颜色, 描边宽度]
  "start": 0,           // 弹幕开始时间
  "zIndex": 50,         // 弹幕层级
  "anchor": [0, 0],     // 锚点
  "relative": 800,      // 相对宽度
  "duration": 1000,     // 存活时间
  "position": [0, 0],   // 位置 [x, y]
  "rotation": [0, 0, 0],// 角度 [x, y, z] (可选, 若不选则不做变换)
  "scale": [0, 0],      // 大小 [x, y] (可选, 若不选则不做变换)
  "animations": [       // 动画
    {
      "duration": 1000,     // 运动时间
      "position": [0, 0],   // 位置 [x, y] (与舞台宽高的比值)
      "rotation": [0, 0, 0],// 角度 [x, y, z] (可选, 若不选则不做变换)
      "scale": [1, 1],      // 大小 [x, y] (可选, 若不选则不做变换)
      "ease": 0             // 速度曲线 (0=线性 1=加速 2=减速 3=缓入缓出)
    }
  ]
}

```