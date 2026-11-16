# Simulation summary

Generated automatically when the configuration is read. Do not edit.

- Last run: 2026-11-09 19:33:44
- Configuration file: `config.toml`
- Number-density ratio n/n₀ (ISA, from altitude): 1.0000

## [run]

| Parameter | Value | Units | Source |
|---|---|---|---|
| `altitude_m` | `0.0` | m | config |
| `device` | `'cuda'` | — | config |

## [inputs]

| Parameter | Value | Units | Source |
|---|---|---|---|
| `mesh_scale_factor` | `1.0` | — | config |
| `velocity_scale_factor` | `203.2` | — | config |
| `flow_conditions` | `['A_neg1', 'B_0', 'C_pos1', 'D_pos3', 'E_pos7']` | — | config |
| `flow_condition_weights` | `[]` | — | config |

## [initial_attachment]

| Parameter | Value | Units | Source |
|---|---|---|---|
| `inception_method` | `'continuous'` | — | config |
| `orientation_count` | `12000` | — | config |
| `orientation_batch_size` | `None` | — | default |
| `integration_radius_m` | `0.4` | m | config |
| `bisection_minimum_field_v_per_m` | `1000.0` | V/m | config |
| `bisection_maximum_field_v_per_m` | `10000000.0` | V/m | config |
| `bisection_relative_tolerance` | `1e-06` | — | config |
| `bisection_maximum_iterations` | `60` | — | config |
| `maximum_aircraft_potential_v` | `100000000.0` | V | config |

## [swept_stroke]

| Parameter | Value | Units | Source |
|---|---|---|---|
| `arc_radius_sea_level_m` | `0.1` | m | config |
| `arc_point_count` | `500` | — | config |
| `arc_point_spacing_exponent` | `1.5` | — | config |
| `initial_arc_length_m` | `50.0` | m | config |
| `initial_arc_correlation_length_m` | `3.0` | m | config |
| `initial_arc_perturbation_amplitude` | `0.2` | — | config |
| `time_step_s` | `0.0005` | s | config |
| `time_step_count` | `600` | — | config |
| `large_gap_threshold_multiplier` | `20.0` | — | config |
| `record_arc_paths` | `True` | — | config |
| `arc_batch_size` | `8192` | — | config |

## [zoning]

| Parameter | Value | Units | Source |
|---|---|---|---|
| `attachment_probability_threshold_per_m` | `0.003` | m⁻¹ | config |
| `sweep_speed_threshold_m_per_s` | `50.0` | m/s | config |
| `target_zone3_probability` | `0.02` | — | config |
| `mirroring` | `True` | — | config |
| `calibrate_threshold` | `True` | — | config |

## [advanced]

| Parameter | Value | Units | Source |
|---|---|---|---|
| `zone_1a_window_s` | `0.01` | s | config |
| `zone_1c_window_s` | `0.02` | s | config |

## CFD freestream

Velocity at the minimum-x CFD point; exact ties use the lowest point index.

| Flowfield | Speed (m/s) | Vx (m/s) | Vy (m/s) | Vz (m/s) |
|---|---|---|---|---|
| A_neg1 | 203.19582169604067 | 203.16477928161621 | -0.0051797577267279843 | -3.5516738802194592 |
| B_0 | 203.19567626782319 | 203.19567613601683 | -0.0050009672733722253 | -0.0053437153837876394 |
| C_pos1 | 203.19584735101492 | 203.16498517990112 | -0.0046545100398361679 | 3.5413494437932966 |
| D_pos3 | 203.19611181127129 | 202.91785879135131 | -0.0041212479118257761 | 10.630259722471237 |
| E_pos7 | 203.19643413743796 | 201.68223896026609 | -0.0034595392382470889 | 24.760155940055846 |

## Initial-attachment execution

ES surface longest bounding-box side: 41.311977386474609 m

Initial-attachment orientation batch size: 4414 (automatic); estimated peak additional 12795015868 bytes, budget 12796192358 bytes, resident search data 584195896 bytes; CUDA free memory after persistent uploads (resident data already excluded); 20% safety margin

## Workflow timing

| Scope | Status | Wall time (seconds) |
|---|---|---|
| initial-attachment | completed | 896.769908 s |
| swept-stroke | completed | 400.234695 s |
| swept-stroke / A_neg1 | completed | 82.011518 s |
| swept-stroke / B_0 | completed | 79.794789 s |
| swept-stroke / C_pos1 | completed | 80.012405 s |
| swept-stroke / D_pos3 | completed | 77.932646 s |
| swept-stroke / E_pos7 | completed | 77.708483 s |
| zoning-mapping | completed | 4.137622 s |
| Total execution time | completed | 1301.142225 s |
