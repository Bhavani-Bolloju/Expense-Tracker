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
          item.category.includes(this.searchKeyword) ||
          item.description.includes(this.searchKeyword) ||
          item.payment.includes(this.searchKeyword)
      );
    }

    // console.log(this.items, "search");

    //category
    if (this.categoryType !== "all") {
      this.items = this.items.filter(
        (item) => item.category === this.categoryType
      );
    }

    // console.log(this.items, "ctg");

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

    // console.log(this.items, "amt sort");

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

    // console.log(this.items, "date srt");

    return this.items;
  }

  setDateSort(active, order) {
    this.isDateSort = active;
    this.dateSortOrder = order;
  }

  setAmountSort(active, order) {
    this.isAmountSort = active;
    this.amountSortOrder = order;
  }

  setFilterCategory(value, items) {
    this.categoryType = value;
    this.items = items;
  }

  setSearchKeyword(value, items) {
    this.searchKeyword = value;
    this.items = items;
  }
}

export const expensesItems = new ExpensesItems();

