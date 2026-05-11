# TICKET-005: Audit and Fix World Cup 2026 Group and Selection Structure

## Description
The current group and selection structure in the simulator (as defined in `TICKET-003` and potentially implemented in the codebase) needs to be audited and corrected to match the official FIFA World Cup 2026 structure.

The 2026 World Cup features 48 teams divided into 12 groups (A-L) of 4 teams each. We must ensure our internal data representation accurately reflects the final official allocation.

## Tasks
- [ ] **Data Audit:** Compare current `groups` data in the project against the official FIFA 2026 Group Stage structure.
- [ ] **Correction:** Update team allocations in data files if any discrepancies are found.
- [ ] **Validation:** Ensure the simulator logic (group stage selections) still works correctly with the updated data.

## References
- [Official FIFA World Cup 2026 Regulations](https://www.fifa.com/pt/tournaments/mens/worldcup/canadamexicousa2026/articles/copa-mundo-grupos-regulamento-classificacao-desempate)

## Acceptance Criteria
- [ ] Data structure for groups A-L is confirmed to match official FIFA allocations.
- [ ] Simulator functional integrity maintained after data updates.
- [ ] No hardcoded discrepancies remaining in configuration.
