import docker from "../config/docker.js";

export async function restartContainer(containerName) {
  const container = docker.getContainer(containerName);
  await container.restart();
  console.log(`♻️ Restarted container: ${containerName}`);
}
