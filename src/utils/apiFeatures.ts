import { Document, Model, Query } from 'mongoose';

class APIFeatures<T extends any> {
  private query: any;
  private queryString: any;

  constructor(query: Query<Array<T>, T>, queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // Remove Excluded Fields
    const filteredQuery = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((field: string) => delete filteredQuery[field]);

    // Advanced Filtering
    let queryStr = JSON.stringify(filteredQuery);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    const parsedQuery = JSON.parse(queryStr);

    // preparing for future changing
    this.query = this.query.find(parsedQuery);

    return this;
  }

  sort() {
    // Sorting implementation
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  projection() {
    // Field Limiting
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
      // this.query = this.query.select('-_id');
    }
    return this;
  }

  paginate() {
    // implement pagination
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skipped = (page - 1) * limit;

    this.query = this.query.skip(skipped).limit(limit);
    return this;
  }

  exec(): Promise<T[]> {
    return this.query.exec();
  }
}

export default APIFeatures;
