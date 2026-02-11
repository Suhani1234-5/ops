import pool from "../config/db.js";

export async function logIncident({
  service,
  container,
  event,
  rule,
  action,
  status
}) {
  await pool.query(
    `INSERT INTO incidents 
     (service_name, container_name, event_type, rule_name, action_taken, status)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [service, container, event, rule, action, status]
  );
}
