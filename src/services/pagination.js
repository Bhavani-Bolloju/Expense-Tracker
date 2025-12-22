export class Pagination {
  constructor(itemsPerPage = 10) {
    this.currentPage = 1;
    this.itemsPerPage = itemsPerPage;
    this._totalItems = 0;
  }

  setTotalItems(totalCount) {
    this._totalItems = totalCount;
  }

  getPageItems(items) {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return items.slice(start, end);
  }

  get totalPageCount() {
    return Math.ceil(this._totalItems / this.itemsPerPage);
  }

  get currentPageNum() {
    this.currentPage =
      this.currentPage > this.totalPageCount
        ? this.totalPageCount
        : this.currentPage;
    return this.currentPage;
  }

  nextPage() {
    if (this.currentPage < this.totalPageCount) {
      this.currentPage += 1;
    }
    return this.currentPage;
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
    }
    return this.currentPage;
  }
}

export const pagination = new Pagination();

