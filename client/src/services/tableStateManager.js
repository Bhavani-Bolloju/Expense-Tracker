class TableStateManager {
  constructor() {
    this.dateSort = "none";
    this.amountSort = "none";
    this.categoryFilter = "all";
    this.searchKeyword = "";
    this.selectCount = 0;
  }

  setSelectCount(count) {
    this.selectCount = count;
  }

  setDateSort(direction) {
    this.dateSort = direction;
    this.amountSort = "none";
  }
  setAmountSort(direction) {  
    this.amountSort = direction;
    this.dateSort = "none";
  }

  setCategoryFilter(value) {
    this.categoryFilter = value;
  }

  setSearchKeyword(value) {
    this.searchKeyword = value;
  }

  clearFilters() {
    this.dateSort = "none";
    this.amountSort = "none";
    this.categoryFilter = "all";
    this.searchKeyword = "";
  }

  getProcessedItems(expenses) {
    let items = [...expenses];

    items = items.filter(
      (item) =>
        item.category.toLowerCase().includes(this.searchKeyword) ||
        item.payment.toLowerCase().includes(this.searchKeyword) ||
        item.description.toLowerCase().includes(this.searchKeyword)
    );

    if (this.categoryFilter !== "all") {
      items = items.filter((item) => item.category === this.categoryFilter);
    }

    //apply active sorting

    if (this.amountSort !== "none") {
      items = items.sort((a, b) =>
        this.amountSort === "asc"
          ? +a.amount - +b.amount
          : +b.amount - +a.amount
      );
    } else if (this.dateSort !== "none") {
      items = items.sort((a, b) =>
        this.dateSort === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    return items;
  }
}

export const tableStateManager = new TableStateManager();

