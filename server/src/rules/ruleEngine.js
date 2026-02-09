import fs from "fs";
import yaml from "js-yaml";

const rules = yaml.load(
  fs.readFileSync("config/rules.yaml", "utf8")
);

export function matchRule(event) {
  return rules.rules.find(
    rule => rule.match.event === event.status
  );
}
