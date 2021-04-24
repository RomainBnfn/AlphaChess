export default interface Position {
  x: number;
  y: number;
}
const areEqualPositions = (posA: Position, posB: Position): boolean => {
  return posA.x == posB.x && posA.y == posB.y;
};
export { areEqualPositions };
