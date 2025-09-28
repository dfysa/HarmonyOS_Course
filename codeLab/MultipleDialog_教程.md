# 鸿蒙多种弹窗实现开发教程

## 项目概述

本教程基于 MultipleDialog 项目，详细介绍如何在鸿蒙应用中实现多种类型的弹窗，包括固定样式弹窗（警告弹窗、日期选择器、文本选择器、气泡提示）和自定义弹窗。

## 核心技术点

### 1. 弹窗类型分类
- **固定样式弹窗**：系统提供的标准弹窗组件
- **自定义弹窗**：完全自定义样式和交互的弹窗

### 2. 弹窗管理
- PromptAction API 使用
- UIContext 上下文管理
- 弹窗生命周期控制

### 3. 用户交互设计
- 数据验证与提示
- 用户操作确认
- 信息展示与收集

## 项目结构分析

```
MultipleDialog/
├── entry/src/main/ets/
│   ├── entryability/
│   │   └── EntryAbility.ets         # 应用入口
│   ├── pages/
│   │   ├── index.ets                # 首页
│   │   └── PersonalInformation.ets  # 个人信息页
│   ├── utils/
│   │   ├── CommonUtils.ets          # 公共工具方法
│   │   └── Logger.ets               # 日志工具
│   └── view/
│       ├── Dialog.ets               # 自定义弹窗组件
│       ├── TextCommonComponent.ets  # 文本展示组件
│       └── TextInputComponent.ets   # 文本输入组件
└── entry/src/main/resources/        # 资源文件
```

## 弹窗类型详解

### 1. 警告弹窗 (AlertDialog)

```typescript
// 显示警告弹窗
showAlertDialog() {
  AlertDialog.show({
    title: '提示',
    message: '您有未保存的修改，确定要退出吗？',
    primaryButton: {
      value: '取消',
      action: () => {
        // 取消操作
      }
    },
    secondaryButton: {
      value: '确定',
      action: () => {
        // 确认退出操作
        this.exitPage();
      }
    }
  });
}
```

**使用场景：**
- 用户操作确认
- 重要信息提醒
- 错误信息展示

### 2. 日期选择器弹窗 (DatePickerDialog)

```typescript
// 显示日期选择弹窗
showDatePickerDialog() {
  DatePickerDialog.show({
    start: new Date('1900-1-1'),
    end: new Date('2100-12-31'),
    selected: this.selectedDate,
    onAccept: (value: DatePickerResult) => {
      this.selectedDate = new Date(value.year, value.month, value.day);
      this.birthDate = `${value.year}-${value.month + 1}-${value.day}`;
    }
  });
}
```

**关键参数：**
- `start/end`：日期范围限制
- `selected`：默认选中日期
- `onAccept`：确认选择回调

### 3. 文本选择器弹窗 (TextPickerDialog)

```typescript
// 显示文本选择弹窗
showTextPickerDialog() {
  const genderOptions = ['男', '女', '其他'];
  
  TextPickerDialog.show({
    range: genderOptions,
    selected: this.selectedGenderIndex,
    onAccept: (value: TextPickerResult) => {
      this.selectedGenderIndex = value.index as number;
      this.gender = genderOptions[this.selectedGenderIndex];
    }
  });
}
```

**应用场景：**
- 单选选项选择
- 枚举值选择
- 分类选择

### 4. 气泡弹窗 (Popup)

```typescript
@Component
struct PopupExample {
  @State showPopup: boolean = false;

  build() {
    Button('显示菜单')
      .onClick(() => {
        this.showPopup = !this.showPopup;
      })
      .bindPopup(this.showPopup, {
        builder: this.popupBuilder,
        placement: Placement.Bottom,
        maskColor: 0x33000000,
        popupColor: Color.White,
        enableArrow: true,
        onStateChange: (e) => {
          this.showPopup = e.isVisible;
        }
      })
  }

  @Builder
  popupBuilder() {
    Column({ space: 2 }) {
      Button('保存')
        .onClick(() => {
          this.saveData();
          this.showPopup = false;
        })
      
      Button('重置')
        .onClick(() => {
          this.resetData();
          this.showPopup = false;
        })
    }
    .width(100)
    .padding(8)
  }
}
```

### 5. 自定义弹窗 (CustomDialog)

```typescript
// 自定义弹窗类
class PromptActionClass {
  private ctx: UIContext | undefined = undefined;
  private contentNode: ComponentContent<Object> | undefined = undefined;
  private options: promptAction.BaseDialogOptions | undefined = undefined;

  setContext(context: UIContext) {
    this.ctx = context;
  }

  setContentNode(node: ComponentContent<Object>) {
    this.contentNode = node;
  }

  setOptions(options: promptAction.BaseDialogOptions) {
    this.options = options;
  }

  openDialog() {
    if (this.contentNode !== null) {
      this.ctx?.getPromptAction().openCustomDialog(this.contentNode, this.options)
        .then(() => {
          hilog.info(0xFF00, 'Dialog', 'OpenCustomDialog complete');
        })
        .catch((error: BusinessError) => {
          let message = (error as BusinessError).message;
          let code = (error as BusinessError).code;
          hilog.error(0xFF00, 'Dialog', 
            `OpenCustomDialog error code: ${code}, message: ${message}`);
        });
    }
  }
}

// 自定义弹窗组件
@Component
struct CustomDialogComponent {
  @State selectedHobbies: string[] = [];
  private hobbies: string[] = ['读书', '运动', '音乐', '旅行', '摄影', '绘画'];
  private onConfirm?: (hobbies: string[]) => void;

  build() {
    Column() {
      Text('选择兴趣爱好')
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .margin({ bottom: 20 })

      // 兴趣爱好选择列表
      Grid() {
        ForEach(this.hobbies, (hobby: string) => {
          GridItem() {
            Row() {
              Checkbox({ name: hobby, group: 'hobbies' })
                .select(this.selectedHobbies.includes(hobby))
                .onChange((value: boolean) => {
                  if (value) {
                    this.selectedHobbies.push(hobby);
                  } else {
                    const index = this.selectedHobbies.indexOf(hobby);
                    if (index > -1) {
                      this.selectedHobbies.splice(index, 1);
                    }
                  }
                })
              
              Text(hobby)
                .margin({ left: 8 })
            }
          }
        })
      }
      .columnsTemplate('1fr 1fr')
      .rowsGap(10)
      .columnsGap(10)
      .margin({ bottom: 20 })

      // 操作按钮
      Row() {
        Button('取消')
          .onClick(() => {
            // 关闭弹窗
          })
        
        Button('确定')
          .onClick(() => {
            this.onConfirm?.(this.selectedHobbies);
            // 关闭弹窗
          })
      }
      .justifyContent(FlexAlign.SpaceEvenly)
      .width('100%')
    }
    .padding(20)
    .backgroundColor(Color.White)
    .borderRadius(12)
  }
}
```

## 开发步骤详解

### 步骤1：项目初始化
1. 创建鸿蒙应用项目
2. 配置项目结构
3. 添加必要的依赖

### 步骤2：工具类封装
```typescript
// CommonUtils.ets
export class CommonUtils {
  /**
   * 显示Toast提示
   */
  static showToast(context: UIContext, message: string) {
    try {
      context.getPromptAction().showToast({
        message: message,
        duration: 2000
      });
    } catch (error) {
      Logger.error('CommonUtils', `showToast failed: ${error.message}`);
    }
  }

  /**
   * 显示警告弹窗
   */
  static showAlertDialog(
    title: string, 
    message: string, 
    onConfirm?: () => void,
    onCancel?: () => void
  ) {
    AlertDialog.show({
      title: title,
      message: message,
      primaryButton: {
        value: '取消',
        action: () => {
          onCancel?.();
        }
      },
      secondaryButton: {
        value: '确定',
        action: () => {
          onConfirm?.();
        }
      }
    });
  }
}
```

### 步骤3：页面状态管理
```typescript
@Entry
@Component
struct PersonalInformation {
  @State name: string = '';
  @State gender: string = '';
  @State birthDate: string = '';
  @State hobbies: string[] = [];
  @State hasModified: boolean = false;
  @State showPopup: boolean = false;

  // 监听数据变化
  private onDataChange() {
    this.hasModified = true;
  }

  // 保存数据
  private saveData() {
    // 保存逻辑
    this.hasModified = false;
    CommonUtils.showToast(this.getUIContext(), '保存成功');
  }

  // 页面返回拦截
  onBackPress(): boolean | void {
    if (this.hasModified) {
      CommonUtils.showAlertDialog(
        '提示',
        '您有未保存的修改，确定要退出吗？',
        () => {
          // 确认退出
          return false;
        },
        () => {
          // 取消退出
          return true;
        }
      );
      return true;
    }
    return false;
  }
}
```

### 步骤4：自定义弹窗实现
```typescript
// 创建自定义弹窗内容
@Builder
function CustomDialogBuilder(params: CustomDialogParams) {
  CustomDialogComponent({
    selectedHobbies: params.selectedHobbies,
    onConfirm: params.onConfirm
  })
}

// 显示自定义弹窗
showCustomDialog() {
  const uiContext = this.getUIContext();
  const promptAction = new PromptActionClass();
  
  promptAction.setContext(uiContext);
  
  const contentNode = new ComponentContent(uiContext, wrapBuilder(CustomDialogBuilder), {
    selectedHobbies: this.hobbies,
    onConfirm: (hobbies: string[]) => {
      this.hobbies = hobbies;
      this.onDataChange();
    }
  });
  
  promptAction.setContentNode(contentNode);
  promptAction.setOptions({
    alignment: DialogAlignment.Center,
    offset: { dx: 0, dy: 0 },
    maskColor: 0x33000000
  });
  
  promptAction.openDialog();
}
```

## 高级功能实现

### 1. 弹窗动画效果
```typescript
// 自定义弹窗动画
const dialogOptions: promptAction.BaseDialogOptions = {
  alignment: DialogAlignment.Center,
  offset: { dx: 0, dy: 0 },
  maskColor: 0x33000000,
  transition: TransitionEffect.asymmetric(
    TransitionEffect.SLIDE.bottom().duration(300),
    TransitionEffect.SLIDE.top().duration(200)
  )
};
```

### 2. 弹窗链式调用
```typescript
class DialogChain {
  private dialogs: (() => Promise<void>)[] = [];

  add(dialogFunc: () => Promise<void>) {
    this.dialogs.push(dialogFunc);
    return this;
  }

  async execute() {
    for (const dialog of this.dialogs) {
      await dialog();
    }
  }
}

// 使用示例
const chain = new DialogChain()
  .add(() => this.showWelcomeDialog())
  .add(() => this.showPermissionDialog())
  .add(() => this.showTutorialDialog());

chain.execute();
```

### 3. 弹窗状态管理
```typescript
class DialogManager {
  private static instance: DialogManager;
  private activeDialogs: Set<string> = new Set();

  static getInstance(): DialogManager {
    if (!DialogManager.instance) {
      DialogManager.instance = new DialogManager();
    }
    return DialogManager.instance;
  }

  isDialogActive(dialogId: string): boolean {
    return this.activeDialogs.has(dialogId);
  }

  addDialog(dialogId: string) {
    this.activeDialogs.add(dialogId);
  }

  removeDialog(dialogId: string) {
    this.activeDialogs.delete(dialogId);
  }

  closeAllDialogs() {
    this.activeDialogs.clear();
  }
}
```

## 性能优化建议

### 1. 弹窗复用
```typescript
class DialogPool {
  private pool: Map<string, ComponentContent<Object>> = new Map();

  getDialog(type: string, builder: WrappedBuilder<Object[]>): ComponentContent<Object> {
    if (!this.pool.has(type)) {
      const uiContext = getContext() as UIContext;
      this.pool.set(type, new ComponentContent(uiContext, builder));
    }
    return this.pool.get(type)!;
  }

  releaseDialog(type: string) {
    this.pool.delete(type);
  }
}
```

### 2. 内存管理
```typescript
// 弹窗关闭时清理资源
onDialogClose() {
  // 清理事件监听
  this.removeEventListeners();
  
  // 清理定时器
  if (this.timer) {
    clearTimeout(this.timer);
    this.timer = null;
  }
  
  // 清理引用
  this.callback = null;
}
```

## 测试验证

### 功能测试用例
1. **弹窗显示测试**：验证各类弹窗正常显示
2. **交互测试**：验证按钮点击、选择操作
3. **数据传递测试**：验证弹窗与页面间数据传递
4. **生命周期测试**：验证弹窗的打开和关闭

### 性能测试
1. **内存使用测试**：监控弹窗创建和销毁的内存变化
2. **响应速度测试**：测试弹窗显示的响应时间
3. **并发测试**：测试多个弹窗同时显示的情况

## 常见问题与解决方案

### 问题1：弹窗重复显示
**原因**：未正确管理弹窗状态
**解决**：使用弹窗管理器控制显示状态

### 问题2：自定义弹窗样式异常
**原因**：样式设置不当或布局冲突
**解决**：检查CSS样式和布局约束

### 问题3：弹窗数据不同步
**原因**：数据绑定问题或状态管理错误
**解决**：使用正确的状态管理装饰器

## 最佳实践

### 1. 用户体验设计
- 弹窗内容简洁明了
- 提供明确的操作指引
- 合理的动画效果
- 适当的遮罩透明度

### 2. 代码组织
- 弹窗组件模块化
- 统一的弹窗管理
- 可复用的工具方法
- 清晰的接口设计

### 3. 错误处理
- 完善的异常捕获
- 用户友好的错误提示
- 降级处理方案
- 日志记录机制

## 总结

本项目全面展示了鸿蒙系统中各种弹窗的实现方法，通过学习本教程，开发者可以掌握：

1. **多种弹窗类型的使用**：警告弹窗、选择器弹窗、气泡弹窗、自定义弹窗
2. **弹窗管理最佳实践**：状态管理、生命周期控制、性能优化
3. **用户交互设计原则**：信息展示、操作确认、数据收集
4. **高级功能实现**：动画效果、链式调用、状态管理

这些技能为开发具有丰富交互体验的鸿蒙应用提供了重要基础，适用于各种需要用户交互和信息展示的应用场景。