import { router } from "@kit.ArkUI"

/**
 * BasicComponentsPage.ets.ets
 ★简要描述：
 *作者：fly
 *日期：10/9/2025
 */
interface ComponentItem {
  title: string
  description: string
  icon?: string
  route: string
}
@Preview
@Component
export struct BasicComponentsPage {
  private componentList: ComponentItem[] = [
    {
      title: 'MainPage',
      description: 'ArkTS 语言特性',
      // icon: '📝',
      route: 'pages/MainPage'
    },
    {
      title: 'StudentCard',
      description: '响应式状态管理',
      // icon: '📝',
      route: 'pages/StudentCardPage'
    },
    {
      title: 'CourseCard',
      description: '声明式 UI 模型的核心理念',
      // icon: '📝',
      route: 'pages/CourseCardPage'
    },
    {
      title: 'CountPage',
      description: '理解 HarmonyOS 应用的基本结构和开发流程',
      // icon: '📝',
      route: 'pages/CountPage'
    },
    {
      title: 'StudentPage',
      description: '增强版 Hello Harmony 应用',
      // icon: '📝',
      route: 'pages/StudentPage'
    },

  ]

  build() {
    Column() {
      Text('基础学习')
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .width('100%')
        .textAlign(TextAlign.Center)
        .padding({ top: 20, bottom: 20 })

      List({ space: 15 }) {
        ForEach(this.componentList, (item: ComponentItem, index: number) => {
          ListItem() {
            Row({ space: item.icon ? 15 : 0 }) {  // 动态调整间距
              // 条件渲染图标（有图标时才渲染）
              if (item.icon) {
                Text(item.icon)
                  .fontSize(24)
                  .width(40)
                  .textAlign(TextAlign.Center)
              }

              Column({ space: 5 }) {
                Text(item.title)
                  .fontSize(16)
                  .fontWeight(FontWeight.Medium)
                  .alignSelf(ItemAlign.Start)

                Text(item.description)
                  .fontSize(14)
                  .fontColor('#666666')
                  .alignSelf(ItemAlign.Start)
              }
              .alignItems(HorizontalAlign.Start)
              .layoutWeight(1)

              Text('>')
                .fontSize(18)
                .fontColor('#999999')
            }
            .width('100%')
            .padding({
              left: 20,
              right: 20,
              top: 20,
              bottom: 20
            })
            .backgroundColor('#FFFFFF')
            .borderRadius(12)
            .shadow({
              radius: 4,
              color: '#00000010',
              offsetX: 0,
              offsetY: 2
            })
          }
          .onClick(() => {
            router.pushUrl({
              url: item.route
            }).catch((err: Error) => {
              console.error('路由跳转失败:', err.message)
            })
          })
        })
      }
      .layoutWeight(1)
      .padding({ left: 20, right: 20, bottom: 20 })
    }
    .height('100%')
    .backgroundColor('#F2F2F7')
  }
}