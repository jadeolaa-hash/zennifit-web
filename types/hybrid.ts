// types/hybrid.ts
// -----------------------------------------------------------------------------
// ZenniFit — Hybrid Athlete Operating System Domain Model
// -----------------------------------------------------------------------------

export type HyroxDivision = 
  | 'open_men' 
  | 'open_women' 
  | 'pro_men' 
  | 'pro_women' 
  | 'doubles_men' 
  | 'doubles_women' 
  | 'doubles_mixed';

export type HyroxStationType =
  | 'skierg_1000m'
  | 'sled_push_50m'
  | 'sled_pull_50m'
  | 'burpee_broad_jump_80m'
  | 'rowing_1000m'
  | 'farmers_carry_200m'
  | 'sandbag_lunges_100m'
  | 'wall_balls_100';

export type FunctionalStationCategory =
  | 'ergometer'
  | 'heavy_sled'
  | 'bodyweight_power'
  | 'loaded_carry'
  | 'quad_dominant'
  | 'posterior_chain';

export type HybridSessionType =
  | 'compromised_running'    // Running intervals immediately preceded by functional stations
  | 'dual_progression_lift'   // Heavy strength/VBT + aerobic base flush
  | 'full_race_simulation'    // Full 8-station + 8x1km race rehearsal
  | 'half_race_simulation'    // 4-station rehearsal
  | 'aerobic_base_engine'     // Pure Zone 2 volume without station interference
  | 'lactate_tolerance_intervals'; // High-intensity station clusters + threshold surges

// -----------------------------------------------------------------------------
// 1. Station Metric (Functional Stations & Exercise Telemetry)
// -----------------------------------------------------------------------------
export interface StationMetric {
  id: string;
  sessionId: string;
  stationIndex: number; // Order in the workout (1 to 8 in Hyrox)
  stationType: HyroxStationType | string;
  category: FunctionalStationCategory;
  
  // Execution Prescriptions & Actuals
  targetPaceOrDurationSec?: number;
  actualDurationSec: number;
  resistanceWeightKg?: number;
  distanceMeters?: number;
  repsCompleted?: number;
  targetReps?: number;
  
  // Biomechanical & Physiological Telemetry
  avgHeartRateBpm?: number;
  peakHeartRateBpm?: number;
  avgPowerWatts?: number;
  strokeRateSpm?: number; // for SkiErg / Row
  cadenceRpm?: number;
  rpe: number; // 1 to 10
  
  // Transition / Roxzone Telemetry
  inboundTransitionSec?: number; // Time from previous run to station start
  outboundTransitionSec?: number; // Time from station finish to next run start
  
  notes?: string;
}

// -----------------------------------------------------------------------------
// 2. Compromised Run Split (Running under Functional Fatigue)
// -----------------------------------------------------------------------------
export interface CompromisedRunSplit {
  id: string;
  sessionId: string;
  splitIndex: number; // 1 to 8 in standard simulation
  precedingStationType: HyroxStationType | 'fresh_baseline' | string;
  
  distanceMeters: number; // typically 1,000m
  actualDurationSec: number;
  paceSecPerKm: number; // calculated: (actualDurationSec / distanceMeters) * 1000
  freshBaselinePaceSecPerKm: number; // athlete's uncompromised 1km threshold pace
  
  // Compromised Running Metrics
  paceDegradationSecPerKm: number; // paceSecPerKm - freshBaselinePaceSecPerKm
  paceDegradationPct: number; // (paceDegradationSecPerKm / freshBaselinePaceSecPerKm) * 100
  
  // Dynamics & Physiological Response
  avgHeartRateBpm: number;
  maxHeartRateBpm: number;
  initial100mPaceSecPerKm?: number; // Detects "heavy leg" shock coming off station
  terminal200mPaceSecPerKm?: number; // Clearance capacity before next station
  avgCadenceSpm?: number;
  groundContactTimeMs?: number;
  
  // Clearance efficiency (ability to drop HR while holding pace)
  lactateClearanceRating: 'superior' | 'stable' | 'degrading' | 'critical';
}

// -----------------------------------------------------------------------------
// 3. Hybrid Session (Unified Workout Container)
// -----------------------------------------------------------------------------
export interface StrengthSet {
  setNumber: number;
  reps: number;
  weightKg: number;
  meanVelocityMs?: number; // Velocity-Based Training (VBT)
  rpe: number;
}

export interface StrengthBlock {
  exerciseName: string;
  target1RmPct: number;
  sets: StrengthSet[];
}

export interface HybridSession {
  id: string;
  userId: string;
  title: string;
  sessionType: HybridSessionType;
  scheduledDate: string; // ISO date string
  startedAt?: string;
  completedAt?: string;
  isCompleted: boolean;
  
  // Microcycle & Periodization Context
  mesocyclePhase: 'aerobic_base' | 'strength_power' | 'specific_compromised' | 'taper' | 'race_week';
  plannedVolumeMinutes: number;
  actualDurationMinutes?: number;
  targetRpe: number;
  actualRpe?: number;
  
  // Hybrid Components
  stations: StationMetric[];
  compromisedSplits: CompromisedRunSplit[];
  strengthBlocks?: StrengthBlock[];
  
  // Aggregated Performance Analytics
  totalRunningDistanceKm?: number;
  avgCompromisedPaceSecPerKm?: number;
  totalStationTimeSec?: number;
  totalTransitionTimeSec?: number;
  compromisedRunningIndex: number; // 0 to 100 efficiency score
  
  coachNotes?: string;
  athleteFeedback?: string;
}

// -----------------------------------------------------------------------------
// 4. Race Simulation (Hyrox & Event Benchmarking Engine)
// -----------------------------------------------------------------------------
export interface RaceSimulation {
  id: string;
  userId: string;
  eventName: string; // e.g., "Hyrox London Pro Simulation"
  division: HyroxDivision;
  simDate: string;
  isOfficialRace: boolean;
  
  // Total Benchmark Times
  totalTimeSec: number; // Full race time
  targetTimeSec: number;
  totalRunningTimeSec: number;
  totalStationTimeSec: number;
  totalRoxzoneTimeSec: number;
  
  // Station Breakdown (Fixed 8 Stations)
  stations: StationMetric[];
  
  // Run Splits (Fixed 8 x 1,000m)
  runSplits: CompromisedRunSplit[];
  
  // Pacing & Energy Efficiency Analytics
  pacingVarianceSec: number; // Standard deviation of run splits (consistency score)
  hardestStationById: HyroxStationType;
  greatestPaceDropPrecedingStation: HyroxStationType;
  estimatedFullRacePaceSecPerKm: number;
  readinessScoreAtStart?: number;
  
  sub60FeasibilityIndex: number; // Probability (0-100%) of achieving sub-60 / sub-65 target
}

// -----------------------------------------------------------------------------
// 5. Hyrox Station Standards Configuration
// -----------------------------------------------------------------------------
export interface StationStandard {
  type: HyroxStationType;
  name: string;
  category: FunctionalStationCategory;
  distanceOrReps: string;
  weights: Record<HyroxDivision, string>;
  targetElitePaceSec: number;
  targetProPaceSec: number;
  targetOpenPaceSec: number;
  iconName: string;
}
