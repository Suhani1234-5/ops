import docker from "../config/docker.js";

export function startDockerMonitor() {
  docker.getEvents({}, (err, stream) => {
    if (err) {
      console.error("Docker event error", err);
      return;
    }

    stream.on("data", chunk => {
      const event = JSON.parse(chunk.toString());

      if (event.status === "die") {
        console.log("🔥 Container crashed:", event.Actor.Attributes.name);
      }
    });
  });
}
