import { spawn } from "child_process";

export function registerTerminalNamespace(io) {
  const terminalNamespace = io.of("/terminal");

  terminalNamespace.on("connection", (socket) => {
    console.log("[Terminal] Connected:", socket.id);

    const dockerProcess = spawn("docker", [
      "run",
      "--rm",
      "-i",
      "cloud-ide-runner",
      "bash"
    ], {
      stdio: 'pipe'
    });


    dockerProcess.stdout.on("data", (data) => {
      console.log(data.toString())
      socket.emit("output", data.toString());
    });

    dockerProcess.stderr.on("data", (data) => {
      socket.emit("output", data.toString());
    });

    dockerProcess.on("close", (code) => {
      socket.emit("output", `\n[Process exited with code ${code}]`);
    });

    socket.on("code", ({ code, language }) => {
      if (typeof code !== "string") {
        console.error("Expected code to be a string, got:", typeof code);
        return;
      }
      const sanitized = code.replace(/"/g, '\\"'); //escape double quote

      if (language === "cpp") {
        dockerProcess.stdin.write(`echo "${sanitized}" > main.cpp\n`);
        dockerProcess.stdin.write(`g++ main.cpp -o main.out && ./main.out\n`);
      } else if (language === "python") {
        dockerProcess.stdin.write(`echo "${sanitized}" > main.py\n`);
        dockerProcess.stdin.write(`python3 main.py\n`);
      } else if (language === "java") {
        dockerProcess.stdin.write(`echo "${sanitized}" > Main.java\n`);
        dockerProcess.stdin.write(`javac Main.java && java Main\n`);
      } else {
        socket.emit("output", "Unsupported language\n");
      }

    });

    socket.on("input", (input) => {
      dockerProcess.stdin.write(input);
    });

    socket.on("disconnect", () => {
      dockerProcess.kill("SIGKILL");
    });
  });
}
