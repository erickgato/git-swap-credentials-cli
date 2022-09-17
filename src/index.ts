import cli from "yargs";
import { Command } from "./constants/commands";
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
    commands.execute(Command.SWAP, { profile });
  }
);

cli.command("list", "Lista os perfis disponiveis", {}, () => {
  commands.execute(Command.LIST_PROFILES);
});

cli.command(
  "details",
  "Detalha um perfil especifico",
  {
    profile: {
      type: "string",
      demandOption: true,
      describe: "Chave do perfil",
    },
  },
  ({ profile }) => {
    commands.execute(Command.GET_PROFILE_TOKEN, {
      profile,
    });
  }
);

cli.demandCommand();
cli.strict();
cli.parse();
