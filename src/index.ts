import cli from "yargs";
import commands from "./providers/command-mediator";

cli.version("1.0.0");

cli.command(
  "swap",
  "Troca o perfil no diretório atual",
  {
    profile: {
      type: "string",
      demandOption: true,
      describe: "Chave do perfil",
    },
  },
  ({ profile }) => {
    commands.execute("swap", { profile });
  }
);

cli.demandCommand();
cli.strict();
cli.parse();
