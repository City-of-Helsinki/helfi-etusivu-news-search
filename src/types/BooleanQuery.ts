export type TermQuery = {
  term?: {
    [key: string]: string;
  };
  bool?: QueryArray;
};

export type QueryArray = {
  must?: TermQuery[];
  should?: TermQuery[];
  filter?: TermQuery[];
  minimum_should_match?: number;
};

export type BooleanQuery = {
  bool: QueryArray;
};

export default BooleanQuery;
