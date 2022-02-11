export enum Direction {
  NORTH,
  WEST,
  EST,
  SOUTH,
  NORTH_WEST,
  NORTH_EST,
  SOUTH_WEST,
  SOUTH_EST,
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
    case Direction.NORTH_WEST:
      return Direction.SOUTH_EST;
    case Direction.NORTH_EST:
      return Direction.SOUTH_WEST;
    case Direction.SOUTH_WEST:
      return Direction.NORTH_EST;
    case Direction.SOUTH_EST:
      return Direction.NORTH_WEST;
  }
}