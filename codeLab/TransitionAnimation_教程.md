# 页面与组件转场动画功能 - 完整编辑教程

## 项目概述

本项目全面展示了HarmonyOS中各种类型的转场动效实现，包括页面间转场、组件内转场、模态转场、共享元素转场以及卡片一镜到底动效。

### 项目特点
- 多种转场动画类型演示
- Navigation组件导航系统
- 自定义转场动画实现
- 共享元素转场效果
- 模态转场交互

## 项目结构分析

```
TransitionAnimation-master/
├── entry/src/main/ets/
│   ├── constants/
│   │   └── CommonConstants.ets        # 公共常量和路由配置
│   ├── utils/
│   │   └── CustomNavigationUtil.ets   # 自定义转场动画工具类
│   ├── entryability/
│   │   └── EntryAbility.ets           # 应用入口
│   ├── pages/
│   │   ├── Index.ets                  # 应用首页(导航入口)
│   │   ├── NavigationTransition.ets   # 默认页面转场
│   │   ├── CustomNavigationTransition.ets # 自定义页面转场
│   │   ├── ComponentTransition.ets    # 组件转场动画
│   │   ├── ModalTransition.ets        # 模态转场
│   │   ├── geometrytransition/        # 共享元素转场
│   │   │   ├── GeometryTransition.ets
│   │   │   └── GeometryTransitionDetail.ets
│   │   └── longtaketransition/        # 卡片一镜到底
│   │       ├── LongTakeTransition.ets
│   │       └── LongTakeDetail.ets
│   └── views/
│       └── TitleBar.ets               # 自定义标题栏组件
└── screenshots/                       # 项目截图
```

## 核心代码实现详解

### 1. 应用主入口 (Index.ets:28-112)

```typescript
@Entry
@Component
struct Index {
  @Provide navPageInfos: NavPathStack = new NavPathStack();

  // 页面导航方法
  go(route: Route) {
    if (!route.to) {
      return;
    }
    this.navPageInfos.pushPath({
      name: route.to,
      param: route.title
    });
  }

  // 页面映射构建器
  @Builder
  navPageMap(name: string) {
    if (name === 'NavigationTransition') {
      NavigationTransition();
    } else if (name === 'CustomNavigationTransition') {
      CustomNavigationTransition();
    } else if (name === 'ComponentTransition') {
      ComponentTransition();
    } else if (name === 'GeometryTransition') {
      GeometryTransition();
    } else if (name === 'GeometryTransitionDetail') {
      GeometryTransitionDetail();
    } else if (name === 'LongTakeTransition') {
      LongTakeTransition();
    } else if (name === 'ModalTransition') {
      ModalTransition()
    }
  }

  build() {
    Navigation(this.navPageInfos) {
      Column() {
        Text($r('app.string.main_page_title'))
          .fontSize(30)
          .lineHeight(40)
          .fontWeight(700)
        
        Blank()
        
        // 功能入口按钮列表
        ForEach(ROUTES, (route: Route) => {
          Button(route.title)
            .width('100%')
            .margin({ top: 12 })
            .onClick(() => {
              this.go(route)
            })
        }, (route: Route) => route.to)
      }
      .height('100%')
      .alignItems(HorizontalAlign.Start)
      .padding({ top: 56, bottom: 16, left: 16, right: 16 })
    }
    .hideToolBar(true)
    .mode(NavigationMode.Stack)
    .navDestination(this.navPageMap)
    .backgroundColor('#F1F3F5')
    // 自定义转场动画配置
    .customNavContentTransition((from: NavContentInfo, to: NavContentInfo, operation: NavigationOperation) => {
      const fromParam: AnimateCallback = CustomTransition.getInstance().getAnimateParam(from.navDestinationId || '');
      const toParam: AnimateCallback = CustomTransition.getInstance().getAnimateParam(to.navDestinationId || '');
      CustomTransition.getInstance().operation = operation;
      
      if (!fromParam.animation && !toParam.animation) {
        return undefined;
      }
      
      const customAnimation: NavigationAnimatedTransition = {
        timeout: 1000,
        transition: (transitionProxy: NavigationTransitionProxy) => {
          fromParam.animation && fromParam.animation(transitionProxy);
          toParam.animation && toParam.animation(transitionProxy);
        }
      };
      return customAnimation;
    })
  }
}
```

**关键实现要点：**
- 使用`Navigation`组件构建导航系统
- `@Provide`和`NavPathStack`管理页面栈
- `customNavContentTransition`实现自定义转场动画
- 通过`@Builder`构建页面映射关系

### 2. 组件转场动画 (ComponentTransition.ets:18-48)

```typescript
@Component
export struct ComponentTransition {
  @State isShow: boolean = false;
  
  // 定义出现和消失的转场效果
  appearEffect = TransitionEffect.scale({ x: 0, y: 0 }).combine(TransitionEffect.OPACITY);
  disappearEffect = TransitionEffect.rotate({ x: 0, y: 1, z: 0, angle: 360 }).combine(TransitionEffect.OPACITY);

  build() {
    NavDestination() {
      Column() {
        // 条件渲染的图片组件，带转场动画
        if (this.isShow) {
          Image($r('app.media.bg_element'))
            .TransitionEleStyles()
            .transition(TransitionEffect.asymmetric(this.appearEffect, this.disappearEffect))
        }
        
        // 静态图片组件
        Image($r('app.media.bg_element'))
          .TransitionEleStyles()
        
        Blank()
        
        // 切换按钮
        Button($r('app.string.Component_transition_toggle'))
          .width('100%')
          .onClick(() => {
            this.getUIContext().animateTo({ duration: 600 }, () => {
              this.isShow = !this.isShow;
            });
          })
      }
      .padding(16)
      .height('100%')
      .width('100%')
    }
    .title(getResourceString($r('app.string.title_component_transition'), this.getUIContext().getHostContext()!))
  }
}

// 扩展函数定义图片样式
@Extend(Image) function TransitionEleStyles() {
  .objectFit(ImageFit.Fill)
  .borderRadius(20)
  .margin({ bottom: 20 })
  .height(120)
  .width('100%')
}
```

**关键实现要点：**
- 使用`TransitionEffect`定义转场效果
- `asymmetric`实现不对称转场（出现和消失效果不同）
- `combine`组合多种转场效果
- `animateTo`触发动画执行

### 3. 共享元素转场 (GeometryTransition.ets:20-62)

```typescript
@Component
export struct GeometryTransition {
  @Consume navPageInfos: NavPathStack;

  @Builder
  previewArea() {
    Column() {
      Image($r('app.media.bg_transition'))
        .width('100%')
        .height(147)
        .borderRadius(8)
        .margin({ bottom: 12 })
        .geometryTransition(GEOMETRY_TRANSITION_ID) // 关键：设置共享元素ID
        .onClick(() => {
          this.getUIContext().animateTo({ duration: 600 }, () => {
            this.navPageInfos.pushPath({ name: 'GeometryTransitionDetail' }, false);
          });
        })
      
      Text($r('app.string.Share_Item_hint'))
        .width('100%')
        .textAlign(TextAlign.Start)
        .fontSize(16)
        .fontWeight(FontWeight.Medium)
        .fontColor($r('sys.color.font_primary'))
    }
    .borderRadius(12)
    .backgroundColor(Color.White)
    .width('100%')
    .padding(12)
  }

  build() {
    NavDestination() {
      Column() {
        this.previewArea()
      }
      .width('100%')
      .height('100%')
      .padding(16)
    }
    .transition(TransitionEffect.OPACITY)
    .backgroundColor('#F1F3F5')
    .title(getResourceString($r('app.string.title_share_item'), this.getUIContext().getHostContext()!))
  }
}
```

**关键实现要点：**
- `geometryTransition`设置共享元素标识
- 相同ID的元素在页面间会产生连续动画效果
- 结合`animateTo`实现流畅的页面转场

## 编辑实战指南

### 1. 创建自定义转场动画

**步骤1：定义转场效果类**
```typescript
// utils/CustomTransitionEffects.ets
export class CustomTransitionEffects {
  // 滑入效果
  static slideIn(): TransitionEffect {
    return TransitionEffect.translate({ x: 300, y: 0 })
      .combine(TransitionEffect.opacity(0))
      .animation({ duration: 500, curve: Curve.EaseOut });
  }

  // 缩放旋转效果
  static scaleRotate(): TransitionEffect {
    return TransitionEffect.scale({ x: 0.5, y: 0.5 })
      .combine(TransitionEffect.rotate({ angle: 180 }))
      .combine(TransitionEffect.opacity(0.5))
      .animation({ duration: 800, curve: Curve.Bezier(0.25, 0.1, 0.25, 1) });
  }

  // 弹性效果
  static bounce(): TransitionEffect {
    return TransitionEffect.scale({ x: 1.2, y: 1.2 })
      .combine(TransitionEffect.opacity(0))
      .animation({ 
        duration: 600, 
        curve: Curve.SpringMotion(0.6, 0.8),
        playMode: PlayMode.Normal 
      });
  }
}
```

**步骤2：应用自定义转场**
```typescript
@Component
export struct CustomTransitionPage {
  @State showContent: boolean = false;
  @State transitionType: string = 'slideIn';

  getTransitionEffect(): TransitionEffect {
    switch (this.transitionType) {
      case 'slideIn':
        return CustomTransitionEffects.slideIn();
      case 'scaleRotate':
        return CustomTransitionEffects.scaleRotate();
      case 'bounce':
        return CustomTransitionEffects.bounce();
      default:
        return TransitionEffect.OPACITY;
    }
  }

  build() {
    Column() {
      // 转场效果选择器
      Row() {
        Button('滑入').onClick(() => this.transitionType = 'slideIn')
        Button('缩放旋转').onClick(() => this.transitionType = 'scaleRotate')
        Button('弹性').onClick(() => this.transitionType = 'bounce')
      }
      .width('100%')
      .justifyContent(FlexAlign.SpaceAround)

      Blank()

      // 应用转场效果的内容
      if (this.showContent) {
        Column() {
          Text('自定义转场内容')
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
          Image($r('app.media.sample_image'))
            .width(200)
            .height(200)
        }
        .transition(this.getTransitionEffect())
      }

      Blank()

      Button('切换显示')
        .onClick(() => {
          animateTo({ duration: 600 }, () => {
            this.showContent = !this.showContent;
          });
        })
    }
    .padding(20)
  }
}
```

### 2. 实现模态转场效果

**创建模态转场组件:**
```typescript
@Component
export struct ModalTransitionDemo {
  @State showModal: boolean = false;
  @State modalContent: string = '';

  @Builder
  modalBuilder() {
    Column() {
      Text('模态窗口')
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .margin({ bottom: 20 })

      Text(this.modalContent)
        .fontSize(16)
        .margin({ bottom: 30 })

      Button('关闭')
        .onClick(() => {
          this.showModal = false;
        })
    }
    .width('80%')
    .padding(20)
    .backgroundColor(Color.White)
    .borderRadius(12)
    .shadow({ radius: 10, color: Color.Gray, offsetX: 0, offsetY: 2 })
  }

  build() {
    Column() {
      Button('显示底部弹窗')
        .margin({ bottom: 20 })
        .onClick(() => {
          this.modalContent = '这是从底部弹出的模态窗口';
          this.showModal = true;
        })

      Button('显示中心弹窗')
        .onClick(() => {
          this.modalContent = '这是居中显示的模态窗口';
          this.showModal = true;
        })
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
    .bindSheet(this.showModal, this.modalBuilder(), {
      height: 300,
      dragBar: true,
      backgroundColor: Color.Transparent,
      onAppear: () => {
        console.log('Modal appeared');
      },
      onDisappear: () => {
        console.log('Modal disappeared');
      }
    })
  }
}
```

### 3. 实现卡片一镜到底效果

**列表页面组件:**
```typescript
@Component
export struct CardListPage {
  @Consume navPageInfos: NavPathStack;
  @State cardList: CardData[] = [
    { id: '1', title: '卡片1', image: $r('app.media.card1'), description: '卡片描述1' },
    { id: '2', title: '卡片2', image: $r('app.media.card2'), description: '卡片描述2' },
    { id: '3', title: '卡片3', image: $r('app.media.card3'), description: '卡片描述3' }
  ];

  @Builder
  cardBuilder(item: CardData) {
    Column() {
      Image(item.image)
        .width('100%')
        .height(200)
        .borderRadius({ topLeft: 12, topRight: 12 })
        .geometryTransition(`card_${item.id}`) // 设置共享元素ID
        .objectFit(ImageFit.Cover)

      Column() {
        Text(item.title)
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .margin({ bottom: 8 })

        Text(item.description)
          .fontSize(14)
          .fontColor(Color.Gray)
      }
      .padding(16)
      .alignItems(HorizontalAlign.Start)
    }
    .width('100%')
    .backgroundColor(Color.White)
    .borderRadius(12)
    .shadow({ radius: 8, color: Color.Gray, offsetX: 0, offsetY: 2 })
    .onClick(() => {
      this.getUIContext().animateTo({ duration: 500 }, () => {
        this.navPageInfos.pushPath({ 
          name: 'CardDetailPage', 
          param: item 
        });
      });
    })
  }

  build() {
    NavDestination() {
      List({ space: 16 }) {
        ForEach(this.cardList, (item: CardData) => {
          ListItem() {
            this.cardBuilder(item)
          }
        })
      }
      .padding(16)
    }
    .title('卡片列表')
  }
}
```

**详情页面组件:**
```typescript
@Component
export struct CardDetailPage {
  @Consume navPageInfos: NavPathStack;
  private cardData: CardData = this.navPageInfos.getParamByName('CardDetailPage')[0] as CardData;

  build() {
    NavDestination() {
      Column() {
        Image(this.cardData.image)
          .width('100%')
          .height(300)
          .geometryTransition(`card_${this.cardData.id}`) // 相同的共享元素ID
          .objectFit(ImageFit.Cover)

        Column() {
          Text(this.cardData.title)
            .fontSize(28)
            .fontWeight(FontWeight.Bold)
            .margin({ bottom: 16 })

          Text(this.cardData.description)
            .fontSize(16)
            .lineHeight(24)

          Blank()

          Button('返回列表')
            .width('100%')
            .onClick(() => {
              this.navPageInfos.pop();
            })
        }
        .padding(20)
        .layoutWeight(1)
      }
    }
    .title(this.cardData.title)
  }
}
```

### 4. 页面间自定义转场动画

**实现自定义页面转场:**
```typescript
// utils/PageTransitionUtil.ets
export class PageTransitionUtil {
  // 左滑进入效果
  static slideFromRight(proxy: NavigationTransitionProxy): void {
    proxy.to?.translate({ x: proxy.to.getWidth() })
      .opacity(0)
      .animateTo({
        duration: 300,
        curve: Curve.EaseOut
      }, () => {
        proxy.to?.translate({ x: 0 }).opacity(1);
      });

    proxy.from?.animateTo({
      duration: 300,
      curve: Curve.EaseOut
    }, () => {
      proxy.from?.translate({ x: -proxy.from.getWidth() / 3 });
    });
  }

  // 淡入淡出效果
  static fadeInOut(proxy: NavigationTransitionProxy): void {
    proxy.to?.opacity(0)
      .animateTo({
        duration: 400,
        curve: Curve.EaseInOut
      }, () => {
        proxy.to?.opacity(1);
      });

    proxy.from?.animateTo({
      duration: 400,
      curve: Curve.EaseInOut
    }, () => {
      proxy.from?.opacity(0);
    });
  }

  // 缩放效果
  static scaleTransition(proxy: NavigationTransitionProxy): void {
    proxy.to?.scale({ x: 0.8, y: 0.8 })
      .opacity(0)
      .animateTo({
        duration: 350,
        curve: Curve.SpringMotion()
      }, () => {
        proxy.to?.scale({ x: 1, y: 1 }).opacity(1);
      });

    proxy.from?.animateTo({
      duration: 350,
      curve: Curve.EaseOut
    }, () => {
      proxy.from?.scale({ x: 1.1, y: 1.1 }).opacity(0.5);
    });
  }
}
```

## 性能优化策略

### 1. 动画性能优化
```typescript
// 使用硬件加速
.renderGroup(true)

// 优化动画曲线
.animation({
  duration: 300,
  curve: Curve.FastOutSlowIn, // 使用预定义曲线
  iterations: 1,
  playMode: PlayMode.Normal
})

// 避免频繁的布局计算
.transform({ translateX: 100 }) // 使用transform而非margin/padding
```

### 2. 内存管理优化
```typescript
@Component
export struct OptimizedTransition {
  private animationController?: AnimationController;

  aboutToAppear() {
    // 初始化动画控制器
    this.animationController = new AnimationController();
  }

  aboutToDisappear() {
    // 清理动画资源
    this.animationController?.cancel();
    this.animationController = undefined;
  }

  build() {
    // 组件内容
  }
}
```

### 3. 转场动画最佳实践
```typescript
// 1. 合理设置动画时长
const ANIMATION_DURATION = {
  FAST: 200,    // 快速交互
  NORMAL: 300,  // 标准转场
  SLOW: 500     // 复杂动画
};

// 2. 使用合适的缓动曲线
const ANIMATION_CURVES = {
  ENTER: Curve.EaseOut,     // 进入动画
  EXIT: Curve.EaseIn,       // 退出动画
  BOUNCE: Curve.SpringMotion(0.6, 0.8) // 弹性动画
};

// 3. 避免同时执行过多动画
class AnimationQueue {
  private queue: (() => void)[] = [];
  private isRunning: boolean = false;

  add(animation: () => void) {
    this.queue.push(animation);
    this.process();
  }

  private process() {
    if (this.isRunning || this.queue.length === 0) {
      return;
    }
    
    this.isRunning = true;
    const animation = this.queue.shift()!;
    animation();
    
    setTimeout(() => {
      this.isRunning = false;
      this.process();
    }, 300);
  }
}
```

## 常见问题解决

### 1. 转场动画卡顿
**原因分析：**
- 动画过于复杂
- 同时执行多个动画
- 图片资源过大

**解决方案：**
```typescript
// 简化动画效果
.transition(TransitionEffect.OPACITY) // 使用简单的透明度变化

// 预加载图片资源
Image(this.imageUrl)
  .syncLoad(true) // 同步加载小图片
  .objectFit(ImageFit.Cover)

// 使用动画队列控制
this.animationQueue.add(() => {
  animateTo({ duration: 300 }, () => {
    // 动画逻辑
  });
});
```

### 2. 共享元素转场失效
**解决方案：**
```typescript
// 确保ID唯一且一致
.geometryTransition('unique_element_id')

// 检查元素是否在可见区域
.visibility(Visibility.Visible)

// 确保动画时机正确
this.getUIContext().animateTo({ duration: 500 }, () => {
  this.navPageInfos.pushPath({ name: 'DetailPage' });
});
```

### 3. 模态转场异常
**解决方案：**
```typescript
// 正确管理模态状态
@State private showModal: boolean = false;

// 添加状态检查
.bindSheet(this.showModal, this.modalBuilder(), {
  onAppear: () => {
    console.log('Modal opened');
  },
  onDisappear: () => {
    console.log('Modal closed');
    this.showModal = false; // 确保状态同步
  }
})
```

## 扩展功能建议

1. **手势驱动转场**：实现手势控制的页面转场
2. **物理动画**：添加重力、摩擦等物理效果
3. **路径动画**：实现沿路径运动的转场效果
4. **粒子效果**：添加粒子系统增强视觉效果
5. **声音反馈**：结合音效提升用户体验

## 总结

本项目全面展示了HarmonyOS转场动画系统的强大功能，通过系统性的学习和实践，可以创建出流畅、自然的用户界面转场效果。

核心技术要点：
- Navigation导航系统的使用
- TransitionEffect转场效果配置
- 共享元素转场实现
- 自定义转场动画开发
- 性能优化策略
- 用户体验设计原则

掌握这些技术，能够为应用带来更加生动和专业的用户体验。