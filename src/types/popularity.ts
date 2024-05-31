type BuildArray<
  Length extends number,
  Arr extends unknown[] = []
> = Arr["length"] extends Length ? Arr : BuildArray<Length, [...Arr, unknown]>;

type RangeFrom0To<
  N extends number,
  Acc extends number[] = []
> = Acc["length"] extends N
  ? Acc[number]
  : RangeFrom0To<N, [...Acc, Acc["length"]]>;

type Popularity = RangeFrom0To<101>; // Creates a type with values from 0 to 100
