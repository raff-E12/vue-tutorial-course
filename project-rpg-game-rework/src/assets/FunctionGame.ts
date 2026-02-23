import type { Ref } from "vue";

export interface Logs {
  actionBy: string;
  actionType: string;
  actionValue: string | number;
}

function getRandom(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addLog(
  actionBy: string,
  actionType: string,
  actionValue: string | number,
  logsMessage: Ref<Logs[]>
): void {
  logsMessage.value.unshift({ actionBy, actionType, actionValue });
}

function enemyTurn(
  min: number,
  max: number,
  healthPlayer: Ref<number>,
  logsMessage: Ref<Logs[]>
): void {
  const damage = getRandom(min, max);
  healthPlayer.value = Math.max(0, healthPlayer.value - damage);
  addLog("enemy", "attack", damage, logsMessage);
}

export function checkWinner(
  healthPlayer: Ref<number>,
  healthEnemy: Ref<number>,
  winner: Ref<string | null>
): void {
  if (healthPlayer.value <= 0 && healthEnemy.value <= 0) {
    winner.value = "draw";
  } else if (healthPlayer.value <= 0) {
    winner.value = "enemy";
  } else if (healthEnemy.value <= 0) {
    winner.value = "player";
  }
}

export function handleAttack(
  rounds: Ref<number>,
  min: number,
  max: number,
  healthEnemy: Ref<number>,
  healthPlayer: Ref<number>,
  winner: Ref<string | null>,
  logsMessage: Ref<Logs[]>,
  enemyMin: number,
  enemyMax: number
): void {
  rounds.value++;
  const damage = getRandom(min, max);
  healthEnemy.value = Math.max(0, healthEnemy.value - damage);
  addLog("player", "attack", damage, logsMessage);
  checkWinner(healthPlayer, healthEnemy, winner);
  if (!winner.value) {
    enemyTurn(enemyMin, enemyMax, healthPlayer, logsMessage);
    checkWinner(healthPlayer, healthEnemy, winner);
  }
}

export function handleAttackSpecial(
  rounds: Ref<number>,
  min: number,
  max: number,
  healthEnemy: Ref<number>,
  healthPlayer: Ref<number>,
  winner: Ref<string | null>,
  logsMessage: Ref<Logs[]>,
  attackSpecialDisabled: Ref<boolean>,
  enemyMin: number,
  enemyMax: number
): void {
  if (attackSpecialDisabled.value) return;
  rounds.value++;
  const damage = getRandom(min, max);
  healthEnemy.value = Math.max(0, healthEnemy.value - damage);
  addLog("player", "special", damage, logsMessage);
  checkWinner(healthPlayer, healthEnemy, winner);
  if (!winner.value) {
    enemyTurn(enemyMin, enemyMax, healthPlayer, logsMessage);
    checkWinner(healthPlayer, healthEnemy, winner);
  }
}

export function handleMediKit(
  rounds: Ref<number>,
  medikitMin: number,
  medikitMax: number,
  maxHealth: number,
  healthPlayer: Ref<number>,
  healthEnemy: Ref<number>,
  winner: Ref<string | null>,
  logsMessage: Ref<Logs[]>,
  medikitDisabled: Ref<boolean>,
  enemyMin: number,
  enemyMax: number
): void {
  if (medikitDisabled.value) return;
  rounds.value++;
  const heal = getRandom(medikitMin, medikitMax);
  healthPlayer.value = Math.min(maxHealth, healthPlayer.value + heal);
  addLog("player", "medikit", heal, logsMessage);
  enemyTurn(enemyMin, enemyMax, healthPlayer, logsMessage);
  checkWinner(healthPlayer, healthEnemy, winner);
}

export function handleLeaveSession(winner: Ref<string | null>): void {
  winner.value = "leave";
}

export function handleNewGame(
  healthPlayer: Ref<number>,
  healthEnemy: Ref<number>,
  rounds: Ref<number>,
  winner: Ref<string | null>,
  logsMessage: Ref<Logs[]>,
  maxHealth: number,
  modalInstance?: Ref<boolean>
): void {
  healthPlayer.value = maxHealth;
  healthEnemy.value = maxHealth;
  rounds.value = 0;
  winner.value = null;
  logsMessage.value = [];
  if (modalInstance) modalInstance.value = false;
}