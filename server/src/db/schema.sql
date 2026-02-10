CREATE TABLE IF NOT EXISTS incidents (
  id SERIAL PRIMARY KEY,
  service_name VARCHAR(100),
  container_name VARCHAR(100),
  event_type VARCHAR(50),
  rule_name VARCHAR(100),
  action_taken VARCHAR(100),
  status VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
