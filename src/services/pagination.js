import { storage } from "./storage";

class Pagination {
  constructor(itemsPerPage = 10) {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.allExpenses = storage.loadExpenses();
  }

  getPageItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const currentPageExpenses = this.allExpenses.slice(start, end);
    return currentPageExpenses;
  }

  get totalPageCount() {
    return Math.ceil(this.allExpenses.length / this.itemsPerPage);
  }

  get currentPageNum() {
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

