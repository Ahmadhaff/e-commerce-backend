class APIFeatures {
    query: any;
    queryString: any;
    constructor(query: any, queryString: any) {
      this.query = query;
      this.queryString = queryString;
    }
  
    
    filter() {
      const queryObj = { ...this.queryString };
      const excludedFields = ['page', 'sort', 'limit', 'fields', 'deleted', 'perPage'];
      excludedFields.forEach(el => delete queryObj[el]);
    
      const queryStr = JSON.stringify(queryObj);
    
      const parsedQuery = JSON.parse(queryStr, (key, value) => {
        if (typeof value === 'string' && (value.startsWith('gte:') || value.startsWith('gt:') || value.startsWith('lte:') || value.startsWith('lt:'))) {
          const [operator, val] = value.split(':');
          return { [`$${operator}`]: parseFloat(val) };
        }
        return value;
      });
    
      this.query = this.query.find(parsedQuery);
    
      return this;
    }
    
  
    sort() {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort('-createdAt');
      }
  
      return this;
    }
  
    limitFields() {
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      } else {
        this.query = this.query.select('-__v');
      }
  
      return this;
    }
  
    paginate() {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 100;
      const skip = (page - 1) * limit;
  
      this.query = this.query.skip(skip).limit(limit);
  
      return this;
    }
  
    search(searchFields: any) {
      if (this.queryString?.search) {
        const queryOption = searchFields.map((field: any) => ({
          [field]: { $regex: this.queryString.search, $options: 'i' },
        }));
      
        this.query = this.query.find({ $or: queryOption });
      }
      return this;
    }
  }
  export default APIFeatures;