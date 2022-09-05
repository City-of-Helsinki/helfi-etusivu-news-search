export type TermQuery = {
  term: {
    [key: string]: string;
  };
};

export type BooleanQuery = {
  bool: {
    must?: TermQuery[];
    should: TermQuery[];
    filter?: TermQuery[];
    minimum_should_match?: number;
  };
};

export default BooleanQuery;
