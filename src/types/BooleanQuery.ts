export type TermQuery = {
  term: {
    [key: string]: string;
  };
};

export type BooleanQuery = {
  bool: {
    must: TermQuery[];
    should?: TermQuery[];
    filter?: TermQuery[];
  };
};

export default BooleanQuery;
