export default class ApiFeatures {
  constructor(mongooseQuery, searchQuery) {
    this.mongooseQuery = mongooseQuery;
    this.searchQuery = searchQuery;
  }
  pagination() {
    //====================pagination========================
    if (this.searchQuery.page <= 0) this.searchQuery.page = 1; // to prevent negative values
    let pageNumber = this.searchQuery.page * 1 || 1; // * 1 to prevent string values
    let pageLimit = 25; // the limit of product in the page
    let skip = (pageNumber - 1) * pageLimit;
    this.pageNumber = pageNumber
    this.mongooseQuery.skip(skip).limit(pageLimit);
    return this;
  }

  filtration() {
    //====================Filtration========================
    let filterObj = { ...this.searchQuery };
    let excludedFields = ["page", "sort", "limit", "fields", "keyword"];
    excludedFields.forEach((val) => {
      delete filterObj[val];
    });
    filterObj = JSON.stringify(filterObj);
    filterObj = filterObj.replace(/(gt|gte|lt|lte)/g, (match) => "$" + match);
    filterObj = JSON.parse(filterObj);
    this.mongooseQuery.find(filterObj);
    return this;
  }

  sort() {
    //====================sort========================

    if (this.searchQuery.sort) {
      let sortedBy = this.searchQuery.sort.split(",").join(" ");
      this.mongooseQuery.sort(sortedBy);
    }
    return this;
  }
  fields() {
    //====================select========================

    if (this.searchQuery.fields) {
      let fields = this.searchQuery.fields.split(",").join(" ");
      this.mongooseQuery.select(fields);
    }
    return this;
  }

  search() {
    //====================search========================
    if (this.searchQuery.keyword) {
      this.mongooseQuery.find({
        $or: [
          { title: { $regex: this.searchQuery.keyword } },
          { description: { $regex: this.searchQuery.keyword } },
        ],
      });
    }
    return this;
  }
  
}
