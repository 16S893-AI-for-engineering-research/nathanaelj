# Zoning summary

## Thresholds

- P′_T used: 0.000519123 1/m
- Configured P′_T: 0.003 1/m
- V_T used: 50 m/s
- sweepspeed_ratio = V/V_T (dimensionless; 1 marks the threshold)
- long_hang_on = 1 where V < V_T (the same threshold as the B sub-zones)

## Calibration

- Calibrated P′_T: 0.000519123 1/m
- P_Z3 at the calibrated P′_T: 0.02
- Target P_Z3: 0.02
- P_Z3 evaluations: 18

## Settings

- Aircraft capacitance: 1.4457908962056529e-09 F
- Mirroring: on
- Conditions: A_neg1, B_0, C_pos1, D_pos3, E_pos7
- zoning.vtu format version: 3

## Zone cell counts

- Zone legend: 0=1B;1=2B;2=1A;3=1C;4=2A;5=3

| Zone | Cell count |
| --- | --- |
| 1B | 476 |
| 2B | 2940 |
| 1A | 1132 |
| 1C | 1532 |
| 2A | 49518 |
| 3 | 16866 |

## Caveats

- A single global P′_T threshold is used for the whole aircraft (Q-C4); one threshold cannot match reference zoning in every region (for example shadowed engine nacelles).
- Zone 1 (1A, 1C) uses an any occurrence rule: one early attachment in the whole ensemble makes a cell zone 1, which is over-conservative and can give artificially large zone-1 regions (D3.4).
- The zoning is strongly sensitive to the threshold choice (P′_T, V_T); no quantitative industry standard exists, so the thresholds are engineering judgement informed, not determined, by the risk calibration.
- The zoning (especially at the horizontal tail) is highly sensitive to the simulated pitch-angle / AoA range; the flight conditions must span the full design envelope.
- The swept-stroke results and the zoning depend heavily on the accuracy and width of the initial-attachment (zone-1) region; errors there propagate directly into zone 2.
- The ensemble size matters: the attachment-probability field needs about 2000 or more arcs per condition to converge; production runs use substantially more.
- The long hang-on diagnostic flags V < V_T, the same sweep-speed threshold as the B sub-zones, so it inherits the uncertainty of V_T; the sweepspeed_ratio array is V/V_T, normalized by the same absolute threshold in m/s, not by freestream or local CFD speed.
