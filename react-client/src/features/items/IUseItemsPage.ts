export interface IUseItemsPage {
  toggleTag: (tagId: string) => Promise<void>
  changePage: (pageId: number) => Promise<void>
}
