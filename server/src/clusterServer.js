import os from "os";
import cluster from "cluster";

const runPrimaryProcess = () => {
	const processesCount = os.cpus().length;
	console.log(`Primary ${process.pid} is running`);
	console.log(`Forking server with ${processesCount} processes \n`);

	for (let i = 0; i < processesCount; i++) {
		cluster.fork();
	}

	// Criação de novos workers caso algum tenha sido encerrado por erro;
	cluster.on("exit", (worker, code, signal) => {
		// valida se não foi um comando;
		// E não foi um disconnect natural;
		if (code !== 0 && !worker.exitedAfterDisconnect) {
			console.log(`Worker ${worker.process.pid} died... scheduling another one!`);
			cluster.fork();
		}
	});
};

const runWorkerProcess = async () => {
	await import("./index.js");
};

cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess();
