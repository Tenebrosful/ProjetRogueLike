export enum Direction {
  NORTH,
  WEST,
  EST,
  SOUTH
}

export function InvertDirection(direction: Direction) {
  switch(direction) {
    case Direction.NORTH:
      return Direction.SOUTH;
    case Direction.SOUTH:
      return Direction.NORTH;
    case Direction.WEST:
      return Direction.EST;
    case Direction.EST:
      return Direction.WEST;
  }
}