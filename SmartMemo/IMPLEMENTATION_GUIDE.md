# SmartMemo 应用实现文档

## 1. 项目概述

SmartMemo是一款简洁高效的备忘录应用，专为移动设备设计，基于鸿蒙HarmonyOS生态系统开发。应用采用ArkTS语言和ArkUI框架实现，具有现代化的UI设计和流畅的用户体验。

![应用架构图](https://placeholder-for-architecture-diagram.com)

### 1.1 核心功能

- 备忘录的创建、编辑、删除和查看
- 备忘录列表的排序和筛选
- 备忘录标星和完成状态管理
- 左滑操作菜单（标记完成、加星标、删除）
- 搜索功能
- 主题切换（浅色/深色/跟随系统）
- 字体大小调整
- 数据导入导出
- 闪屏页面和加载动画

### 1.2 技术栈

- **开发语言**：ArkTS
- **UI框架**：ArkUI
- **状态管理**：@Observed/@Track装饰器
- **数据持久化**：Preferences API
- **路由导航**：Router API

## 2. 应用架构

SmartMemo采用MVVM（Model-View-ViewModel）架构模式，清晰地分离了数据模型、视图和业务逻辑。

![MVVM架构图](https://placeholder-for-mvvm-diagram.com)

### 2.1 项目结构

```
entry/src/main/ets/
├── components/            # 可复用UI组件
│   ├── common/            # 通用组件
│   ├── memo/              # 备忘录相关组件
│   └── settings/          # 设置相关组件
├── constants/             # 常量定义
├── entryability/          # 应用入口能力
├── entrybackupability/    # 备份能力
├── model/                 # 数据模型
├── pages/                 # 页面组件
├── service/               # 服务层
├── utils/                 # 工具类
└── viewmodel/             # 视图模型
```

### 2.2 核心模块

- **Model层**：定义数据结构和业务实体
- **View层**：负责UI渲染和用户交互
- **ViewModel层**：连接Model和View，处理业务逻辑
- **Service层**：提供数据持久化和外部服务交互
- **Utils**：提供通用工具函数和辅助类

## 3. 数据模型设计

### 3.1 MemoItem 类

备忘录是应用的核心数据模型，使用`@Observed`装饰器实现响应式数据绑定。

```typescript
@Observed
export class MemoItem {
  @Track id: string;
  @Track title: string;
  @Track content: string;
  @Track createTime: number;
  @Track updateTime: number;
  @Track reminderTime?: number;
  @Track isCompleted: boolean;
  @Track isStarred: boolean;
  
  // 方法：生成ID、更新时间戳、切换状态等
}
```

### 3.2 Category 接口

虽然当前版本未实现分类功能，但保留了相关数据结构以便未来扩展。

```typescript
export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
  createTime: number;
}
```

## 4. 存储服务实现

### 4.1 StorageService 类

采用单例模式实现，负责数据的持久化存储和读取。

```typescript
export class StorageService {
  private static instance: StorageService;
  private preferences: preferences.Preferences | null = null;
  
  // 单例获取方法
  static getInstance(): StorageService
  
  // 初始化方法
  async init(context: Context): Promise<void>
  
  // 备忘录相关操作
  async saveMemos(memos: MemoItem[]): Promise<void>
  async loadMemos(): Promise<MemoItem[]>
  async saveMemo(memo: MemoItem): Promise<void>
  async deleteMemo(memoId: string): Promise<void>
  
  // 分类相关操作
  async saveCategories(categories: Category[]): Promise<void>
  async loadCategories(): Promise<Category[]>
  
  // 设置相关操作
  async saveSetting(key: string, value: Object): Promise<void>
  async loadSetting(key: string, defaultValue: Object): Promise<Object>
  
  // 数据管理
  async clearAllData(): Promise<void>
  async exportData(): Promise<string>
  async importData(dataStr: string): Promise<void>
  async getStorageStats(): Promise<StorageStats>
}
```

### 4.2 数据持久化

使用HarmonyOS的Preferences API实现数据持久化，支持以下功能：

- 备忘录数据的存储和读取
- 应用设置的保存和加载
- 数据的导入导出
- 数据统计信息获取

## 5. 视图模型实现

### 5.1 MemoListViewModel 类

负责备忘录列表的业务逻辑处理，包括数据加载、过滤、排序和状态管理。

```typescript
@Observed
export class MemoListViewModel {
  @Track memoList: MemoItem[] = [];
  @Track filteredMemoList: MemoItem[] = [];
  @Track isLoading: boolean = false;
  @Track searchKeyword: string = '';
  @Track currentFilter: FilterType = FilterType.ALL;
  @Track currentSort: SortType = SortType.UPDATE_TIME;
  @Track selectedMemos: Set<string> = new Set();
  @Track isSelectionMode: boolean = false;
  
  // 初始化和数据加载
  async initialize(): Promise<void>
  async loadMemos(): Promise<void>
  
  // 备忘录操作
  async addMemo(memo: MemoItem): Promise<void>
  async updateMemo(memo: MemoItem): Promise<void>
  async deleteMemo(memoId: string): Promise<void>
  async deleteBatchMemos(memoIds: string[]): Promise<void>
  async toggleMemoCompleted(memoId: string): Promise<void>
  async toggleMemoStarred(memoId: string): Promise<void>
  
  // 搜索和过滤
  searchMemos(keyword: string): void
  setFilter(filter: FilterType): void
  setSort(sort: SortType): void
  private applyFilterAndSort(): void
  
  // 选择模式
  enterSelectionMode(): void
  exitSelectionMode(): void
  toggleMemoSelection(memoId: string): void
  toggleSelectAll(): void
  clearSelection(): void
  getSelectedMemos(): MemoItem[]
  
  // 统计信息
  getFilteredStats(): FilteredStats
  
  // 刷新
  async refresh(): Promise<void>
}
```

### 5.2 ThemeManager 类

负责主题管理，包括主题切换、字体大小调整和颜色获取。

```typescript
@Observed
export class ThemeManager {
  private static instance: ThemeManager;
  @Track currentTheme: ThemeMode = ThemeMode.AUTO;
  @Track isDarkMode: boolean = false;
  @Track fontSize: number = AppConstants.FONT_SIZE.MEDIUM;
  @Track readonly lightTheme: ThemeColors;
  @Track readonly darkTheme: ThemeColors;
  
  // 主题设置
  async setThemeMode(mode: ThemeMode): Promise<void>
  async setFontSize(size: number): Promise<void>
  
  // 颜色获取
  getErrorColor(): string
  getSuccessColor(): string
  getBackgroundColor(): string
  getSurfaceColor(): string
  getPrimaryTextColor(): string
  getSecondaryTextColor(): string
  getPrimaryColor(): string
  getDividerColor(): string
  
  // 字体大小
  getFontSizeScale(): number
  getScaledFontSize(baseSize: number): number
  
  // 主题切换
  async toggleTheme(): Promise<void>
  getThemeModeDisplayName(mode?: ThemeMode): string
}
```

## 6. 页面实现

### 6.1 闪屏页 (SplashPage)

闪屏页是应用启动时的第一个页面，负责初始化应用数据和展示品牌标识。



#### 6.1.1 动画实现

闪屏页包含一系列精心设计的动画效果：

```typescript
private startSplashAnimation(): void {
  // 整体渐入
  setTimeout(() => {
    this.splashOpacity = 1;
  }, 100);

  // Logo缩放
  setTimeout(() => {
    this.logoScale = 1.0;
  }, 300);

  // 标题渐入
  setTimeout(() => {
    this.titleOpacity = 1;
  }, 600);

  // 副标题渐入
  setTimeout(() => {
    this.subtitleOpacity = 1;
  }, 800);

  // 进度条渐入
  setTimeout(() => {
    this.progressOpacity = 1;
  }, 1000);
}
```

#### 6.1.2 初始化流程

闪屏页负责应用的初始化工作，包括：

1. 检查权限
2. 初始化数据
3. 加载配置
4. 准备UI
5. 导航到主页面

```typescript
private async initializeApp(): Promise<void> {
  try {
    // 模拟初始化步骤
    await this.updateProgress(20, '检查权限...');
    await this.checkPermissions();

    await this.updateProgress(40, '初始化数据...');
    await this.initializeData();

    await this.updateProgress(60, '加载配置...');
    await this.loadConfiguration();

    await this.updateProgress(80, '准备界面...');
    await this.prepareUI();

    await this.updateProgress(100, '完成');

    // 延迟跳转，让用户看到完成状态
    setTimeout(() => {
      this.navigateToMainPage();
    }, 500);
  } catch (error) {
    // 错误处理...
  }
}
```

### 6.2 主页面 (MainPage)

主页面采用TabBar导航结构，包含备忘录列表、分类和设置三个标签页。

![主页面截图](https://placeholder-for-main-screenshot.com)

#### 6.2.1 TabBar实现

```typescript
Tabs({
  barPosition: BarPosition.End,
  index: this.currentTabIndex
}) {
  // 备忘录页面
  TabContent() {
    MemoListPage({ refreshTrigger: this.refreshTrigger })
  }
  .tabBar(this.buildTabBarItem(0))

  // 分类页面
  TabContent() {
    this.buildCategoryPage()
  }
  .tabBar(this.buildTabBarItem(1))

  // 设置页面
  TabContent() {
    SettingsPage()
  }
  .tabBar(this.buildTabBarItem(2))
}
```

#### 6.2.2 悬浮按钮

主页面包含一个悬浮添加按钮，用于创建新的备忘录：

```typescript
Button() {
  Text('+')
    .fontSize(28)
    .fontColor(Color.White)
    .fontWeight(FontWeight.Bold)
}
.width(56)
.height(56)
.borderRadius(28)
.backgroundColor($r('app.color.primary_color'))
.shadow({
  radius: 16,
  color: 'rgba(0, 125, 255, 0.4)',
  offsetY: 4
})
.onClick(() => {
  this.onAddButtonClick();
})
```

### 6.3 备忘录列表页 (MemoListPage)

备忘录列表页展示所有备忘录，支持搜索、排序和筛选功能。

![备忘录列表页截图](https://placeholder-for-list-screenshot.com)

#### 6.3.1 列表实现

使用ArkUI的List组件实现备忘录列表，支持滑动操作：

```typescript
List() {
  ForEach(this.viewModel.filteredMemoList, (memo: MemoItem, index: number) => {
    ListItem() {
      this.buildMemoCard(memo, index)
    }
    .swipeAction({
      end: this.buildSwipeActions(memo)
    })
    .onClick(() => {
      if (this.viewModel.isSelectionMode) {
        this.viewModel.toggleMemoSelection(memo.id);
      } else {
        this.navigateToMemoDetail(memo);
      }
    })
  }, (memo: MemoItem) => memo.id)
}
```

#### 6.3.2 左滑操作菜单

列表项支持左滑操作，显示标记完成、加星标和删除按钮：

```typescript
@Builder
buildSwipeActions(memo: MemoItem) {
  Row() {
    // 星标按钮
    Column() {
      Text(memo.isStarred ? '已星标' : '加星标')
        .fontSize(14)
        .fontColor(Color.White)
        .margin({ top: 2 })
    }
    .width(72)
    .height('60%')
    .justifyContent(FlexAlign.Center)
    .backgroundColor(memo.isStarred ? '#FF9500' : '#FFD700')
    .onClick(async () => {
      await this.viewModel.toggleMemoStarred(memo.id);
    })

    // 完成按钮
    Column() {
      Text(memo.isCompleted ? '取消完成' : '标记完成')
        .fontSize(14)
        .fontColor(Color.White)
        .margin({ top: 2 })
    }
    .width(72)
    .height('60%')
    .justifyContent(FlexAlign.Center)
    .backgroundColor(memo.isCompleted ? '#34C759' : '#30D158')
    .onClick(async () => {
      await this.viewModel.toggleMemoCompleted(memo.id);
    })

    // 删除按钮
    Column() {
      Text('删除')
        .fontSize(14)
        .fontColor(Color.White)
        .margin({ top: 2 })
    }
    .width(72)
    .height('60%')
    .justifyContent(FlexAlign.Center)
    .backgroundColor('#FF3B30')
    .onClick(() => {
      this.showDeleteConfirmDialog(memo);
    })
  }
}
```

#### 6.3.3 时间显示处理

备忘录列表中的时间显示采用相对时间格式，如"刚刚"、"5分钟前"、"2小时前"等：

```typescript
private formatTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) {
    return '刚刚';
  } else if (diff < hour) {
    return `${Math.floor(diff / minute)}分钟前`;
  } else if (diff < day) {
    return `${Math.floor(diff / hour)}小时前`;
  } else if (diff < 7 * day) {
    return `${Math.floor(diff / day)}天前`;
  } else {
    const date = new Date(timestamp);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }
}
```

### 6.4 备忘录详情页 (MemoDetailPage)

备忘录详情页用于创建和编辑备忘录，包含标题、内容和提醒时间设置。

![备忘录详情页截图](https://placeholder-for-detail-screenshot.com)

#### 6.4.1 表单实现

```typescript
Column() {
  // 顶部工具栏
  this.buildToolbar()

  // 主要内容区域
  Scroll() {
    Column() {
      // 标题输入
      this.buildTitleInput()

      // 内容输入
      this.buildContentInput()

      // 提醒设置
      this.buildReminderSection()
    }
    .padding(AppConstants.SPACING.MEDIUM)
  }
  .layoutWeight(1)

  // 底部操作栏
  this.buildBottomActions()
}
```

#### 6.4.2 未保存更改检测

当用户尝试退出编辑页面时，如果有未保存的更改，会显示确认对话框：

```typescript
private onBackPressed(): void {
  if (this.hasUnsavedChanges()) {
    AlertDialog.show({
      title: '确认退出',
      message: '有未保存的更改，确定要退出吗？',
      primaryButton: {
        value: '取消',
        action: () => {}
      },
      secondaryButton: {
        value: '退出',
        fontColor: this.themeManager.getErrorColor(),
        action: () => {
          router.back();
        }
      }
    });
  } else {
    router.back();
  }
}

private hasUnsavedChanges(): boolean {
  return this.title !== this.memo.title ||
         this.content !== this.memo.content;
}
```

### 6.5 设置页面 (SettingsPage)

设置页面提供主题切换、字体大小调整、数据管理等功能。

![设置页面截图](https://placeholder-for-settings-screenshot.com)

#### 6.5.1 设置项组件

使用自定义的SettingItem组件实现统一的设置项样式：

```typescript
@Component
export struct SettingItem {
  @State private themeManager: ThemeManager = ThemeManager.getInstance();
  @Prop title: string = '';
  @Prop subtitle: string = '';
  onItemClick?: () => void;
  @Prop iconResource: Resource;
  @Prop titleColor: string;

  build() {
    Button() {
      Row() {
        // 左侧图标
        Image(this.iconResource)
          .width(24)
          .height(24)
          .fillColor(this.themeManager.getPrimaryTextColor())
          .margin({ right: AppConstants.SPACING.MEDIUM })

        // 主要内容区域
        Column() {
          Text(this.title)
            .fontSize(this.themeManager.getScaledFontSize(AppConstants.FONT_SIZE.MEDIUM))
            .fontColor(this.titleColor || this.themeManager.getPrimaryTextColor())
            .fontWeight(FontWeight.Medium)
            .alignSelf(ItemAlign.Start)

          Text(this.subtitle)
            .fontSize(this.themeManager.getScaledFontSize(AppConstants.FONT_SIZE.SMALL))
            .fontColor(this.themeManager.getSecondaryTextColor())
            .alignSelf(ItemAlign.Start)
            .margin({ top: 2 })
        }
        .layoutWeight(1)
        .alignItems(HorizontalAlign.Start)

        // 右侧箭头
        Image($r('app.media.arrow_right'))
          .width(16)
          .height(16)
          .fillColor(this.themeManager.getSecondaryTextColor())
      }
    }
    .onClick(() => {
      this.onItemClick?.();
    })
  }
}
```

#### 6.5.2 主题切换

设置页面提供主题模式切换功能，支持浅色、深色和跟随系统三种模式：

```typescript
private showThemeSelectionDialog(): void {
  const currentThemeText = this.currentTheme === ThemeMode.AUTO ? '跟随系统' :
                          this.currentTheme === ThemeMode.LIGHT ? '浅色模式' : '深色模式';

  AlertDialog.show({
    title: '选择主题',
    message: `当前主题：${currentThemeText}\n\n请选择要使用的主题模式：`,
    buttons: [
      {
        value: '跟随系统',
        action: () => {
          this.selectTheme(ThemeMode.AUTO);
        }
      },
      {
        value: '浅色模式',
        action: () => {
          this.selectTheme(ThemeMode.LIGHT);
        }
      },
      {
        value: '深色模式',
        action: () => {
          this.selectTheme(ThemeMode.DARK);
        }
      },
      {
        value: '取消',
        action: () => {}
      }
    ]
  });
}
```

## 7. 常量管理

应用使用AppConstants类集中管理所有常量，包括存储键名、UI尺寸、动画参数、字体大小等。

```typescript
export class AppConstants {
  // 存储键名
  static readonly STORAGE_KEYS: StorageKeys = {
    MEMOS: 'smart_memo_memos',
    CATEGORIES: 'smart_memo_categories',
    SETTINGS: 'smart_memo_settings',
    THEME: 'smart_memo_theme',
    FONT_SIZE: 'smart_memo_font_size',
    LAST_BACKUP: 'smart_memo_last_backup'
  };
  
  // 动画参数
  static readonly ANIMATION: AnimationConfig = {
    DURATION_SHORT: 200,
    DURATION_NORMAL: 300,
    DURATION_LONG: 500,
    SPRING_RESPONSE: 0.55,
    SPRING_DAMPING_FRACTION: 0.825
  };
  
  // UI尺寸
  static readonly UI: UIConfig = {
    BORDER_RADIUS_SMALL: 8,
    BORDER_RADIUS_MEDIUM: 12,
    BORDER_RADIUS_LARGE: 16,
    CARD_ELEVATION: 2,
    BUTTON_HEIGHT: 44,
    INPUT_HEIGHT: 48,
    TAB_BAR_HEIGHT: 56,
    HEADER_HEIGHT: 56,
    FLOATING_BUTTON_SIZE: 56
  };
  
  // 间距
  static readonly SPACING: SpacingConfig = {
    EXTRA_SMALL: 4,
    SMALL: 8,
    MEDIUM: 16,
    LARGE: 24,
    EXTRA_LARGE: 32
  };
  
  // 字体大小
  static readonly FONT_SIZE: FontSizeConfig = {
    EXTRA_SMALL: 10,
    SMALL: 12,
    MEDIUM: 14,
    LARGE: 16,
    EXTRA_LARGE: 18,
    HEADLINE: 20,
    TITLE: 24,
    DISPLAY: 32
  };
  
  // 其他常量...
}
```

## 8. 应用入口

### 8.1 EntryAbility

EntryAbility是应用的入口能力，负责初始化应用环境和加载首页。

```typescript
export default class EntryAbility extends UIAbility {
  private mainWindow: window.Window | null = null;

  async onWindowStageCreate(windowStage: window.WindowStage): Promise<void> {
    // 初始化窗口
    this.mainWindow = windowStage.getMainWindowSync();
    
    // 初始化存储服务
    const storageService = StorageService.getInstance();
    await storageService.init(this.context);
    
    // 初始化主题管理器
    const themeManager = ThemeManager.getInstance();
    
    // 应用当前主题
    this.applyThemeStyle(this.context.config?.colorMode);
    
    // 加载首页
    windowStage.loadContent('pages/SplashPage', () => {});
  }
  
  // 配置更新处理
  onConfigurationUpdated(config: Configuration): void {
    this.applyThemeStyle(config?.colorMode);
  }
  
  // 应用主题样式
  private async applyThemeStyle(colorMode: number | undefined): Promise<void> {
    // 根据当前主题模式设置状态栏和导航栏样式
  }
}
```

### 8.2 EntryBackupAbility

EntryBackupAbility是应用的备份能力，负责数据的备份和恢复。

```typescript
export default class EntryBackupAbility extends BackupExtensionAbility {
  async onBackup() {
    // 备份数据
    await Promise.resolve();
  }

  async onRestore(bundleVersion: BundleVersion) {
    // 恢复数据
    await Promise.resolve();
  }
}
```

## 9. 实现细节与优化

### 9.1 响应式数据绑定

应用使用ArkTS的`@Observed`和`@Track`装饰器实现响应式数据绑定，确保UI与数据的同步更新。

```typescript
@Observed
export class MemoItem {
  @Track id: string = '';
  @Track title: string = '';
  @Track content: string = '';
  // 其他属性...
}
```

### 9.2 单例模式

服务类（如StorageService和ThemeManager）采用单例模式实现，确保全局唯一实例。

```typescript
export class StorageService {
  private static instance: StorageService;
  
  private constructor() {
  }
  
  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }
  
  // 其他方法...
}
```

### 9.3 主题适配

应用支持浅色、深色和跟随系统三种主题模式，并提供统一的颜色获取接口。

```typescript
getBackgroundColor(): string {
  return this.isDarkMode ? this.darkTheme.background : this.lightTheme.background;
}

getSurfaceColor(): string {
  return this.isDarkMode ? this.darkTheme.surface : this.lightTheme.surface;
}

getPrimaryTextColor(): string {
  return this.isDarkMode ? this.darkTheme.textPrimary : this.lightTheme.textPrimary;
}
```

### 9.4 字体大小缩放

应用支持字体大小调整，并提供统一的字体大小缩放接口。

```typescript
getFontSizeScale(): number {
  return this.fontSize / AppConstants.FONT_SIZE.MEDIUM;
}

getScaledFontSize(baseSize: number): number {
  return baseSize * this.getFontSizeScale();
}
```

## 10. 未来扩展

### 10.1 分类功能

虽然当前版本未实现分类功能，但已保留了相关数据结构和UI占位，为未来扩展做好准备。

### 10.2 提醒功能

当前版本已实现提醒时间的设置和显示，但未实现实际的提醒通知功能，这将在未来版本中添加。

### 10.3 数据同步

未来可以添加云同步功能，实现多设备数据同步。

### 10.4 更多自定义选项

未来可以添加更多自定义选项，如备忘录颜色、字体样式等。

## 11. 总结

SmartMemo应用采用现代化的架构设计和技术栈，实现了一个简洁高效的备忘录应用。通过MVVM架构模式，清晰地分离了数据模型、视图和业务逻辑，使代码结构清晰、易于维护。应用提供了丰富的功能和良好的用户体验，同时为未来扩展预留了空间。

---

*文档版本：1.0.0*  
*更新日期：2025年9月30日*