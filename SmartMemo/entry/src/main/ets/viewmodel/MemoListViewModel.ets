/**
 * 备忘录列表视图模型
 */

import { MemoItem } from '../model/MemoItem';
import { StorageService } from '../service/StorageService';
import { SortType, FilterType } from '../constants/AppConstants';

interface FilteredStats {
  total: number;
  completed: number;
  pending: number;
  starred: number;
}

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
  private storageService: StorageService;

  constructor() {
    this.storageService = StorageService.getInstance();
  }

  /**
   * 初始化数据
   */
  async initialize(): Promise<void> {
    this.isLoading = true;
    try {
      await this.loadMemos();
    } catch (error) {
      console.error('Initialize failed:', error);
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * 加载备忘录列表
   */
  async loadMemos(): Promise<void> {
    try {
      this.memoList = await this.storageService.loadMemos();
      this.applyFilterAndSort();
    } catch (error) {
      console.error('Load memos failed:', error);
    }
  }

  /**
   * 添加备忘录
   */
  async addMemo(memo: MemoItem): Promise<void> {
    try {
      await this.storageService.saveMemo(memo);
      this.memoList.unshift(memo);
      this.applyFilterAndSort();
    } catch (error) {
      console.error('Add memo failed:', error);
      throw new Error(String(error));
    }
  }

  /**
   * 更新备忘录
   */
  async updateMemo(memo: MemoItem): Promise<void> {
    try {
      memo.updateTimeStamp();
      await this.storageService.saveMemo(memo);

      const index = this.memoList.findIndex(m => m.id === memo.id);
      if (index >= 0) {
        this.memoList[index] = memo;
        this.applyFilterAndSort();
      }
    } catch (error) {
      console.error('Update memo failed:', error);
      throw new Error(String(error));
    }
  }

  /**
   * 删除备忘录
   */
  async deleteMemo(memoId: string): Promise<void> {
    try {
      await this.storageService.deleteMemo(memoId);
      this.memoList = this.memoList.filter(memo => memo.id !== memoId);
      this.applyFilterAndSort();
      this.selectedMemos.delete(memoId);
    } catch (error) {
      console.error('Delete memo failed:', error);
      throw new Error(String(error));
    }
  }

  /**
   * 批量删除备忘录
   */
  async deleteBatchMemos(memoIds: string[]): Promise<void> {
    try {
      for (const memoId of memoIds) {
        await this.storageService.deleteMemo(memoId);
      }
      this.memoList = this.memoList.filter(memo => !memoIds.includes(memo.id));
      this.applyFilterAndSort();
      this.clearSelection();
    } catch (error) {
      console.error('Delete batch memos failed:', error);
      throw new Error(String(error));
    }
  }

  /**
   * 切换备忘录完成状态
   */
  async toggleMemoCompleted(memoId: string): Promise<void> {
    const memo = this.memoList.find(m => m.id === memoId);
    if (memo) {
      const originalState = memo.isCompleted;
      memo.toggleCompleted();
      // 强制更新数组引用以触发UI更新
      this.memoList = [...this.memoList];
      this.applyFilterAndSort();
      // 异步保存到存储
      try {
        await this.storageService.saveMemo(memo);
        console.log(`完成状态切换成功: memoId=${memoId}, isCompleted=${memo.isCompleted}`);
      } catch (error) {
        console.error('Save memo failed:', error);
        // 保存失败时回滚状态
        memo.isCompleted = originalState;
        memo.updateTimeStamp();
        this.memoList = [...this.memoList];
        this.applyFilterAndSort();

      }
    } else {
      console.error(`未找到备忘录: memoId=${memoId}`);
    }
  }

  /**
   * 切换备忘录星标状态
   */
  async toggleMemoStarred(memoId: string): Promise<void> {
    const memo = this.memoList.find(m => m.id === memoId);
    if (memo) {
      const originalState = memo.isStarred;
      memo.toggleStarred();
      // 强制更新数组引用以触发UI更新
      this.memoList = [...this.memoList];
      this.applyFilterAndSort();
      // 异步保存到存储
      try {
        await this.storageService.saveMemo(memo);
        console.log(`星标状态切换成功: memoId=${memoId}, isStarred=${memo.isStarred}`);
      } catch (error) {
        console.error('Save memo failed:', error);
        // 保存失败时回滚状态
        memo.isStarred = originalState;
        memo.updateTimeStamp();
        this.memoList = [...this.memoList];
        this.applyFilterAndSort();

      }
    } else {
      console.error(`未找到备忘录: memoId=${memoId}`);
    }
  }

  /**
   * 搜索备忘录
   */
  searchMemos(keyword: string): void {
    this.searchKeyword = keyword;
    this.applyFilterAndSort();
  }

  /**
   * 设置过滤条件
   */
  setFilter(filter: FilterType): void {
    this.currentFilter = filter;
    this.applyFilterAndSort();
  }

  /**
   * 设置排序方式
   */
  setSort(sort: SortType): void {
    this.currentSort = sort;
    this.applyFilterAndSort();
  }

  /**
   * 应用过滤和排序
   * 根据当前的搜索关键词、过滤条件和排序方式对备忘录列表进行处理
   */
  private applyFilterAndSort(): void {
    let filtered = [...this.memoList];

    // 应用搜索 - 在标题和内容中搜索关键词
    if (this.searchKeyword.trim()) {
      const keyword = this.searchKeyword.toLowerCase();
      filtered = filtered.filter(memo =>
      memo.title.toLowerCase().includes(keyword) ||
      memo.content.toLowerCase().includes(keyword)
      );
    }

    // 应用过滤条件
    switch (this.currentFilter) {
      case FilterType.COMPLETED:
        filtered = filtered.filter(memo => memo.isCompleted);
        break;
      case FilterType.PENDING:
        filtered = filtered.filter(memo => !memo.isCompleted);
        break;
      case FilterType.STARRED:
        filtered = filtered.filter(memo => memo.isStarred);
        break;
      case FilterType.WITH_REMINDER:
        filtered = filtered.filter(memo => memo.reminderTime);
        break;
    }

    // 应用排序规则（置顶项优先显示）
    filtered.sort((a, b) => {
      // 首先按置顶状态排序 - 置顶项始终在前
      if (a.isTop && !b.isTop) return -1;
      if (!a.isTop && b.isTop) return 1;
      
      // 置顶状态相同时，按原有排序规则
      switch (this.currentSort) {
        case SortType.CREATE_TIME:
          return b.createTime - a.createTime;
        case SortType.UPDATE_TIME:
          // 对于置顶项，使用创建时间排序以保持稳定性
          if (a.isTop && b.isTop) {
            return b.createTime - a.createTime;
          }
          return b.updateTime - a.updateTime;
        case SortType.TITLE:
          return a.title.localeCompare(b.title);
        case SortType.REMINDER_TIME:
          // 提醒时间排序：有提醒的在前，按时间早晚排序
          if (!a.reminderTime && !b.reminderTime) {
            return b.updateTime - a.updateTime; // 都没有提醒时按更新时间排序
          }
          if (!a.reminderTime) {
            return 1;
          }
          if (!b.reminderTime) {
            return -1;
          }
          return a.reminderTime - b.reminderTime;
        default:
          // 对于置顶项，使用创建时间排序以保持稳定性
          if (a.isTop && b.isTop) {
            return b.createTime - a.createTime;
          }
          return b.updateTime - a.updateTime;
      }
    });

    this.filteredMemoList = filtered;
  }

  /**
   * 进入选择模式
   */
  enterSelectionMode(): void {
    this.isSelectionMode = true;
    this.selectedMemos.clear();
  }

  /**
   * 退出选择模式
   */
  exitSelectionMode(): void {
    this.isSelectionMode = false;
    this.selectedMemos.clear();
  }

  /**
   * 切换备忘录选择状态
   */
  toggleMemoSelection(memoId: string): void {
    if (this.selectedMemos.has(memoId)) {
      this.selectedMemos.delete(memoId);
    } else {
      this.selectedMemos.add(memoId);
    }
  }

  /**
   * 全选/取消全选
   */
  toggleSelectAll(): void {
    if (this.selectedMemos.size === this.filteredMemoList.length) {
      this.selectedMemos.clear();
    } else {
      this.selectedMemos.clear();
      this.filteredMemoList.forEach(memo => {
        this.selectedMemos.add(memo.id);
      });
    }
  }

  /**
   * 清除选择
   */
  clearSelection(): void {
    this.selectedMemos.clear();
    this.isSelectionMode = false;
  }

  /**
   * 获取选中的备忘录
   */
  getSelectedMemos(): MemoItem[] {
    return this.filteredMemoList.filter(memo => this.selectedMemos.has(memo.id));
  }

  /**
   * 获取过滤后的备忘录统计
   */
  getFilteredStats(): FilteredStats {
    const total = this.filteredMemoList.length;
    const completed = this.filteredMemoList.filter(memo => memo.isCompleted).length;
    const pending = total - completed;
    const starred = this.filteredMemoList.filter(memo => memo.isStarred).length;

    return {
      total,
      completed,
      pending,
      starred
    };
  }

  /**
   * 刷新数据
   */
  async refresh(): Promise<void> {
    this.isLoading = true;
    try {
      await this.loadMemos();
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      this.isLoading = false;
    }
  }


  /**
   * 切换备忘录置顶状态
   */
  async toggleMemoPinned(memoId: string): Promise<void> {
    const memo = this.memoList.find(m => m.id === memoId);
    if (memo) {
      const originalTopState = memo.isTop;
      const originalUpdateTime = memo.updateTime;
      memo.updateTimeStamp();
      // 切换置顶状态，但不更新时间戳（避免影响排序）
      memo.isTop = !memo.isTop;
      
      // 强制更新数组引用以触发UI更新
      this.memoList = [...this.memoList];
      this.applyFilterAndSort();
      
      // 异步保存到存储
      try {
        await this.storageService.saveMemo(memo);
        console.log(`置顶状态切换成功: memoId=${memoId}, isTop=${memo.isTop}`);
      } catch (error) {
        console.error('Save memo failed:', error);
        // 保存失败时回滚状态
        memo.isTop = originalTopState;
        memo.updateTime = originalUpdateTime;
        this.memoList = [...this.memoList];
        this.applyFilterAndSort();

      }
    } else {
      console.error(`未找到备忘录: memoId=${memoId}`);
    }
  }

}