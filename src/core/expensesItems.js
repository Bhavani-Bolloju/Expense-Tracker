class ExpensesItems {
  constructor() {
    this.isDateSort = false;
    this.isAmountSort = false;
    this.dateSortOrder = "asc";
    this.amountSortOrder = "asc";
    this.searchKeyword = "";
    this.categoryType = "all";
    this.items = [];
  }

  updateItems(items) {
    this.items = items;
  }

  getArrangedItems() {
    //search
    if (this.searchKeyword !== "") {
      this.items = this.items.filter(
        (item) =>
          item.category.includes(keyword) ||
          item.description.includes(keyword) ||
          item.payment.includes(keyword)
      );
    }

    //category
    if (this.categoryType !== "all") {
      this.items = this.items.filter(
        (item) => item.category === this.categoryType
      );
    }

    //sort only for the one that is active
    if (this.isAmountSort) {
      if (this.amountSortOrder === "asc") {
        this.items = this.items.sort((a, b) => +a.amount - +b.amount);
        this.amountSortOrder = "dsc";
      } else {
        this.items = this.items.sort((a, b) => +b.amount - +a.amount);
        this.amountSortOrder = "asc";
      }
    }

    if (this.isDateSort) {
      if (this.dateSortOrder === "asc") {
        this.items = this.items.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        this.dateSortOrder = "dsc";
      } else {
        this.items = this.items.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        this.dateSortOrder = "asc";
      }
    }

    return this.items;
  }

  setDateSort(active, order) {
    this.isDateSort = active;
    this.dateSortOrder = order;
  }

  setAmountSort(active, order) {
    console.log(active, order, "set amount");
    this.isAmountSort = active;
    this.amountSortOrder = order;
  }

  setFilterCategory(value) {
    this.filterCategory = value;
  }

  setSearchKeyword(value) {
    this.searchKeyword = value;
  }
}

export const expensesItems = new ExpensesItems();

