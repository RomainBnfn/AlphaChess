export interface Opponent {
  pseudo: string;
  firebaseUID: string;
  opponent: Opponent | null;
}

const areEqualOpponents = (
  opponentA: Opponent,
  opponentB: Opponent
): boolean => {
  return opponentA.firebaseUID == opponentB.firebaseUID;
};
export { areEqualOpponents };
