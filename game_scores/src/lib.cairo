// ═══════════════════════════════════════════════════════
// GameScores — On-Chain Highest Score Storage
// Deployed on Starknet. Gasless via Cartridge paymaster.
// ═══════════════════════════════════════════════════════

use starknet::ContractAddress;

// ── EVENTS ──────────────────────────────────────────────
#[derive(Drop, starknet::Event)]
struct NewHighScore {
    #[key]
    player: ContractAddress,
    score: u64,
    level: u8,
    timestamp: u64,
}

#[derive(Drop, starknet::Event)]
struct GlobalRecordBroken {
    player: ContractAddress,
    score: u64,
    previous_record: u64,
}

// ── STORAGE STRUCTS ──────────────────────────────────────
#[derive(Drop, Serde, starknet::Store, Clone)]
struct ScoreEntry {
    score: u64,
    level: u8,           // which level they reached
    deaths: u32,         // total deaths in that run
    coins: u32,          // coins collected
    timestamp: u64,      // block timestamp
}

// ── INTERFACE ────────────────────────────────────────────
#[starknet::interface]
trait IGameScores<TContractState> {
    // Write functions (require wallet, gasless via paymaster)
    fn submit_score(
        ref self: TContractState,
        score: u64,
        level: u8,
        deaths: u32,
        coins: u32,
    );

    // Read functions (free, no wallet needed)
    fn get_player_best(self: @TContractState, player: ContractAddress) -> ScoreEntry;
    fn get_global_record(self: @TContractState) -> ScoreEntry;
    fn get_global_record_holder(self: @TContractState) -> ContractAddress;
    fn get_total_players(self: @TContractState) -> u64;
    fn has_played(self: @TContractState, player: ContractAddress) -> bool;
}

// ── CONTRACT ─────────────────────────────────────────────
#[starknet::contract]
mod GameScores {
    use super::{ContractAddress, IGameScores, ScoreEntry, NewHighScore, GlobalRecordBroken};
    use starknet::{get_caller_address, get_block_timestamp};
    use starknet::storage::{
        StoragePointerReadAccess, StoragePointerWriteAccess,
        Map, StorageMapReadAccess, StorageMapWriteAccess,
    };

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        NewHighScore: NewHighScore,
        GlobalRecordBroken: GlobalRecordBroken,
    }

    #[storage]
    struct Storage {
        // Per-player best score
        player_best: Map<ContractAddress, ScoreEntry>,
        // Whether a player has submitted at least once
        player_exists: Map<ContractAddress, bool>,
        // Global all-time high score entry
        global_record: ScoreEntry,
        // Who holds the global record
        global_record_holder: ContractAddress,
        // Total unique players
        total_players: u64,
    }

    #[constructor]
    fn constructor(ref self: ContractState) {
        // Initialize with zeroed global record
        self.global_record.write(ScoreEntry {
            score: 0,
            level: 0,
            deaths: 0,
            coins: 0,
            timestamp: 0,
        });
    }

    #[abi(embed_v0)]
    impl GameScoresImpl of IGameScores<ContractState> {

        // ── SUBMIT SCORE ───────────────────────────────
        // Called by the game client after completing a run.
        // Only updates if the new score is higher than the
        // player's current personal best.
        // Gasless when using Cartridge or AVNU paymaster.
        fn submit_score(
            ref self: ContractState,
            score: u64,
            level: u8,
            deaths: u32,
            coins: u32,
        ) {
            let caller = get_caller_address();
            let now = get_block_timestamp();

            let new_entry = ScoreEntry { score, level, deaths, coins, timestamp: now };

            // Track new players
            if !self.player_exists.read(caller) {
                self.player_exists.write(caller, true);
                self.total_players.write(self.total_players.read() + 1);
            }

            // Only update personal best if score improved
            let current_best = self.player_best.read(caller);
            if score > current_best.score {
                self.player_best.write(caller, new_entry.clone());

                // Emit personal best event
                self.emit(Event::NewHighScore(NewHighScore {
                    player: caller,
                    score,
                    level,
                    timestamp: now,
                }));

                // Check if global record is broken
                let global = self.global_record.read();
                if score > global.score {
                    let old_record = global.score;
                    self.global_record.write(new_entry);
                    self.global_record_holder.write(caller);

                    self.emit(Event::GlobalRecordBroken(GlobalRecordBroken {
                        player: caller,
                        score,
                        previous_record: old_record,
                    }));
                }
            }
        }

        // ── READ FUNCTIONS ─────────────────────────────
        fn get_player_best(self: @ContractState, player: ContractAddress) -> ScoreEntry {
            self.player_best.read(player)
        }

        fn get_global_record(self: @ContractState) -> ScoreEntry {
            self.global_record.read()
        }

        fn get_global_record_holder(self: @ContractState) -> ContractAddress {
            self.global_record_holder.read()
        }

        fn get_total_players(self: @ContractState) -> u64 {
            self.total_players.read()
        }

        fn has_played(self: @ContractState, player: ContractAddress) -> bool {
            self.player_exists.read(player)
        }
    }
}
