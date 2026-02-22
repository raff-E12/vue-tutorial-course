const { createApp, ref, computed, watch, onMounted } = Vue;

createApp({
  setup() {
    // --- Costanti ---
    const MAX_HEALTH = 100;
    const ATTACK_MIN = 5;
    const ATTACK_MAX = 15;
    const SPECIAL_MIN = 10;
    const SPECIAL_MAX = 25;
    const MEDIKIT_MIN = 10;
    const MEDIKIT_MAX = 20;
    const SPECIAL_ROUND_UNLOCK = 3; // ogni quanti round si sblocca lo speciale

    // --- State ---
    const HealthPlayer = ref(MAX_HEALTH);
    const HealthEnemy = ref(MAX_HEALTH);
    const rounds = ref(0);
    const winner = ref(null); // null | 'player' | 'enemy' | 'draw' | 'leave'
    const LogsMessage = ref([]);

    // Ref al modal Bootstrap
    const ModalRef = ref(null);
    let modalInstance = null;

    // --- Computed ---
    const WidthBarPlayer = computed(() => ({
      width: Math.max(0, HealthPlayer.value) + '%'
    }));

    const WidthBarEnemy = computed(() => ({
      width: Math.max(0, HealthEnemy.value) + '%'
    }));

    const DisabledMedikit = computed(() => HealthPlayer.value >= MAX_HEALTH);

    const AttackEnemyDisabled = computed(() => rounds.value % SPECIAL_ROUND_UNLOCK !== 0 || rounds.value === 0);

    // --- Utility ---
    function getRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function addLog(actionBy, actionType, actionValue) {
      LogsMessage.value.unshift({ actionBy, actionType, actionValue });
    }

    function enemyTurn() {
      const damage = getRandom(ATTACK_MIN, ATTACK_MAX);
      HealthPlayer.value = Math.max(0, HealthPlayer.value - damage);
      addLog('enemy', 'attack', damage);
    }

    function checkWinner() {
      if (HealthPlayer.value <= 0 && HealthEnemy.value <= 0) {
        winner.value = 'draw';
      } else if (HealthPlayer.value <= 0) {
        winner.value = 'enemy';
      } else if (HealthEnemy.value <= 0) {
        winner.value = 'player';
      }
    }

    // --- Handlers ---
    function HandleAttack() {
      rounds.value++;
      const damage = getRandom(ATTACK_MIN, ATTACK_MAX);
      HealthEnemy.value = Math.max(0, HealthEnemy.value - damage);
      addLog('player', 'attack', damage);
      checkWinner();
      if (!winner.value) {
        enemyTurn();
        checkWinner();
      }
    }

    function HandleAttackSpecial() {
      if (AttackEnemyDisabled.value) return;
      rounds.value++;
      const damage = getRandom(SPECIAL_MIN, SPECIAL_MAX);
      HealthEnemy.value = Math.max(0, HealthEnemy.value - damage);
      addLog('player', 'attack', damage);
      checkWinner();
      if (!winner.value) {
        enemyTurn();
        checkWinner();
      }
    }

    function HandleMediKit() {
      if (DisabledMedikit.value) return;
      rounds.value++;
      const heal = getRandom(MEDIKIT_MIN, MEDIKIT_MAX);
      HealthPlayer.value = Math.min(MAX_HEALTH, HealthPlayer.value + heal);
      addLog('player', 'medikit', heal);
      enemyTurn();
      checkWinner();
    }

    function HandleLeaveSession() {
      winner.value = 'leave';
    }

    function HandleNewGame() {
      HealthPlayer.value = MAX_HEALTH;
      HealthEnemy.value = MAX_HEALTH;
      rounds.value = 0;
      winner.value = null;
      LogsMessage.value = [];
      if (modalInstance) modalInstance.hide();
    }

    // --- Watcher: apre il modal quando c'è un vincitore ---
    watch(winner, (val) => {
      if (val && modalInstance) {
        modalInstance.show();
      }
    });

    // --- Lifecycle ---
    onMounted(() => {
      if (ModalRef.value) {
        modalInstance = new bootstrap.Modal(ModalRef.value);
      }
    });

    return {
      // State
      HealthPlayer,
      HealthEnemy,
      rounds,
      winner,
      LogsMessage,
      ModalRef,
      // Computed
      WidthBarPlayer,
      WidthBarEnemy,
      DisabledMedikit,
      AttackEnemyDisabled,
      // Handlers
      HandleAttack,
      HandleAttackSpecial,
      HandleMediKit,
      HandleLeaveSession,
      HandleNewGame,
    };
  }
}).mount('#app');
