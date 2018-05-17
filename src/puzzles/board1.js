export const board = [
  //x 0,  1 ,  2 ,  3 ,  4 ,  5 ,  6 ,  7 ,  8 ,  9 , 10 , 11 , 12 , 13 , 14 , 15    // y
  'NW  ,N   ,NE  ,N   ,N   ,N   ,N   ,N   ,N   ,N   ,N   ,NE  ,N   ,N   ,N   ,NE  ', // 0
  'W   ,_   ,_   ,_   ,NER ,_   ,_   ,_   ,_   ,SE  ,_   ,_   ,_   ,_   ,_   ,E   ', // 1
  'W   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,SE  ', // 2
  'W   ,SWB ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,SW  ,_   ,_   ,_   ,E   ', // 3
  'W   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,E   ', // 4
  'SW  ,_   ,_   ,_   ,_   ,NW  ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,NW  ,E   ', // 5
  'W   ,_   ,_   ,SE  ,_   ,_   ,_   ,_   ,_   ,_   ,NEGg,_   ,_   ,_   ,_   ,E   ', // 6
  'W   ,_   ,_   ,_   ,_   ,_   ,_   ,NW  ,NE  ,_   ,_   ,_   ,_   ,_   ,_   ,E   ', // 7
  'W   ,_   ,_   ,_   ,_   ,_   ,_   ,SW  ,SE  ,_   ,_   ,_   ,_   ,SWG ,_   ,E   ', // 8
  'W   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,E   ', // 9
  'W   ,NE  ,_   ,_   ,SW  ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,SE  ,E   ', // 10
  'SW  ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,SE  ,_   ,_   ,NW  ,_   ,_   ,E   ', // 11
  'W   ,_   ,_   ,_   ,NEY ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,SE  ', // 12
  'W   ,_   ,_   ,_   ,_   ,_   ,NW  ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,E   ', // 13
  'W   ,_   ,SE  ,_   ,_   ,_   ,_   ,_   ,_   ,_   ,NW  ,_   ,_   ,_   ,_   ,E   ', // 14
  'SW  ,S   ,S   ,SE  ,S   ,S   ,S   ,S   ,S   ,S   ,S   ,S   ,SW  ,S   ,S   ,SE  ', // 15
];

export const minimumNumberOfMoves = 8;
// Solution
// B right, B down, B left, G right, G down, G left, G up, G right
