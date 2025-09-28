## ResponsiveLayout - 响应式布局设计

### 项目概述

ResponsiveLayout项目展示了如何在HarmonyOS中实现响应式布局设计，使应用能够适应不同屏幕尺寸和设备类型。该项目提供了多种布局示例，包括列表布局、网格布局、侧边栏布局等。

### 核心功能

- 响应式断点设计
- 列表布局适配
- 网格布局适配
- 侧边栏布局适配
- 双列和三列布局适配

### 关键技术点

#### 1. 响应式断点工具类

使用`WidthBreakpointType`类实现响应式断点：

```typescript
export class WidthBreakpointType<T> {
  // 小屏幕设备(手机)对应的值
  sm: T;
  // 中等屏幕设备(小平板)对应的值
  md: T;
  // 大屏幕设备(大平板、三折叠)对应的值
  lg: T;

  constructor(sm: T, md: T, lg: T) {
    this.sm = sm;
    this.md = md;
    this.lg = lg;
  }

  getValue(widthBp: WidthBreakpoint): T {
    // XS和SM断点使用小屏幕值
    if (widthBp === WidthBreakpoint.WIDTH_XS || widthBp === WidthBreakpoint.WIDTH_SM) {
      return this.sm;
    }
    // MD断点使用中等屏幕值
    if (widthBp === WidthBreakpoint.WIDTH_MD) {
      return this.md;
    } else {
      // LG及以上断点使用大屏幕值
      return this.lg;
    }
  }
}
```

#### 2. 窗口信息监听

使用`WindowUtil`类监听窗口变化：

```typescript
export class WindowUtil {
  // 主窗口信息
  mainWindowInfo: WindowInfo = new WindowInfo();
  
  // 监听窗口变化
  listenWindowChange() {
    // 获取窗口对象
    window.getLastWindow(this.ctx, (err, data) => {
      if (err.code) {
        hilog.error(0x0000, 'WindowUtil', 'Failed to obtain the window. Cause: %{public}s', JSON.stringify(err) ?? '');
        return;
      }
      // 获取窗口避让区域
      data.getWindowAvoidArea((err, avoidArea) => {
        if (err.code) {
          hilog.error(0x0000, 'WindowUtil', 'Failed to obtain the window avoidArea. Cause: %{public}s', JSON.stringify(err) ?? '');
          return;
        }
        this.mainWindowInfo.AvoidSystem = avoidArea;
      });
      
      // 监听窗口尺寸变化
      data.on('windowSizeChange', (size) => {
        this.mainWindowInfo.width = size.width;
        this.mainWindowInfo.height = size.height;
        this.mainWindowInfo.widthBp = this.getWidthBreakpoint(size.width);
      });
    });
  }
}
```

#### 3. 响应式列表布局

使用`lanes`属性实现响应式列数：

```typescript
List() {
  // 列表项内容
}
.width('100%')
// 响应式列数设置：小屏1列，中屏和大屏2列
.lanes(new WidthBreakpointType(1, 2, 2).getValue(this.mainWindowInfo.widthBp))
```

#### 4. 状态栏避让处理

根据系统状态栏高度设置内边距：

```typescript
.padding({
  // 根据系统状态栏高度设置顶部内边距，避免内容被状态栏遮挡
  top: this.getUIContext().px2vp(this.windowUtil?.mainWindowInfo.AvoidSystem?.topRect.height),
  left: 16,
  right: 16
})
```

### 实现步骤

1. 创建响应式断点工具类（WidthBreakpointType.ets）
2. 创建窗口工具类（WindowUtil.ets）
3. 实现各种布局示例组件（ListLayout.ets、GridLayout.ets等）
4. 实现主页面（Index.ets）
5. 添加资源文件（图标、字符串等）

## 5. ToDoList - 简易待办事项应用

### 项目概述

ToDoList项目实现了一个简单的待办事项应用，展示了HarmonyOS基本UI组件的使用和数据绑定。该项目结构简洁，适合初学者学习HarmonyOS应用开发的基础知识。

### 核心功能

- 待办事项列表显示
- 待办事项状态切换
- 简洁的UI设计

### 关键技术点

#### 1. 数据模型设计

使用单例模式实现数据模型：

```typescript
export class DataModel {
  /**
   * 保存的数据
   */
  public tasks: Array<Resource> = CommonConstants.TODO_DATA;

  /**
   * 获取数据
   */
  getData(): Array<Resource> {
    return this.tasks;
  }
}

export default new DataModel();
```

#### 2. 待办事项组件

实现可点击切换状态的待办事项组件：

```typescript
@Component
export default struct ToDoItem {
  public content?: string;
  @State isComplete: boolean = false;

  @Builder labelIcon(icon: Resource) {
    Image(icon)
      .objectFit(ImageFit.Contain)
      .width($r('app.float.checkbox_width'))
      .height($r('app.float.checkbox_width'))
      .margin($r('app.float.checkbox_margin'))
  }

  build() {
    Row() {
      if (this.isComplete) {
        this.labelIcon($r('app.media.ic_ok'));
      } else {
        this.labelIcon($r('app.media.ic_default'));
      }

      Text(this.content)
        .fontSize($r('app.float.item_font_size'))
        .fontWeight(CommonConstants.FONT_WEIGHT)
        .opacity(this.isComplete ? CommonConstants.OPACITY_COMPLETED : CommonConstants.OPACITY_DEFAULT)
        .decoration({ type: this.isComplete ? TextDecorationType.LineThrough : TextDecorationType.None })
    }
    .borderRadius(CommonConstants.BORDER_RADIUS)
    .backgroundColor($r('app.color.start_window_background'))
    .width(CommonConstants.LIST_DEFAULT_WIDTH)
    .height($r('app.float.list_item_height'))
    .onClick(() => {
      this.isComplete = !this.isComplete;
    })
  }
}
```

#### 3. 主页面实现

使用`ForEach`循环渲染待办事项列表：

```typescript
build() {
  Column({ space: CommonConstants.COLUMN_SPACE }) {
    Text($r('app.string.page_title'))
      .fontSize($r('app.float.title_font_size'))
      .fontWeight(FontWeight.Bold)
      .lineHeight($r('app.float.title_font_height'))
      .width(CommonConstants.TITLE_WIDTH)
      .margin({
        top: $r('app.float.title_margin_top'),
        bottom: $r('app.float.title_margin_bottom')
      })
      .textAlign(TextAlign.Start)

    ForEach(this.totalTasks, (item: string) => {
      ToDoItem({ content: item })
    }, (item: string) => JSON.stringify(item))
  }
  .width(CommonConstants.FULL_LENGTH)
  .height(CommonConstants.FULL_LENGTH)
  .backgroundColor($r('app.color.page_background'))
}
```

### 实现步骤

1. 定义常量配置（CommonConstant.ets）
2. 创建数据模型（DataModel.ets）
3. 实现待办事项组件（ToDoItem.ets）
4. 实现主页面（ToDoListPage.ets）
5. 添加资源文件（图标、字符串等）