import docker from "../config/docker.js";
import { restartContainer } from "../services/dockerService.js";
import { matchRule } from "../services/ruleService.js";
import { logIncident } from "../services/incidentService.js";

export function startDockerMonitor() {
  docker.getEvents({}, (err, stream) => {
    if (err) {
      console.error("Docker event error:", err);
      return;
    }

    console.log("🚀 Docker monitor started...");

    stream.on("data", async (chunk) => {
      try {
        const event = JSON.parse(chunk.toString());

        // We only care about container crash events
        if (event.status === "die") {

          const containerName = event.Actor?.Attributes?.name;

          console.log(`🔥 Container crashed: ${containerName}`);

          // Match auto-healing rule
          const rule = await matchRule(event);

          if (!rule) {
            console.log("⚠️ No matching rule found.");
            return;
          }

          try {
            // Attempt restart
            await restartContainer(containerName);

            console.log(`✅ Restarted container: ${containerName}`);

            // Log success
            await logIncident({
              service: containerName,
              container: containerName,
              event: "CONTAINER_DIE",
              rule: rule.name,
              action: "RESTART_CONTAINER",
              status: "SUCCESS"
            });

          } catch (restartError) {

            console.error("❌ Restart failed:", restartError.message);

            // Log failure
            await logIncident({
              service: containerName,
              container: containerName,
              event: "CONTAINER_DIE",
              rule: rule.name,
              action: "RESTART_CONTAINER",
              status: "FAILED"
            });
          }
        }

      } catch (parseError) {
        console.error("Event parsing error:", parseError.message);
      }
    });

    stream.on("error", (streamError) => {
      console.error("Docker stream error:", streamError);
    });
  });
}
