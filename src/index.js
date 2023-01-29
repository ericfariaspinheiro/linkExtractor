import fs from "node:fs";
import chalk from "chalk";

function extraiLinks(texto) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas = [...texto.matchAll(regex)];
  const resultados = capturas.map((item) => ({ [item[1]]: item[2] }));
  return resultados.length !== 0 ? resultados : "Não há links";
}

function trataErro(erro) {
  throw new Error(chalk.red(erro.code, "Não vai rolar"));
}

async function pegaArquivo(caminho) {
  try {
    const encoding = "utf-8";
    const texto = await fs.promises.readFile(caminho, encoding);
    return extraiLinks(texto);
  } catch (erro) {
    trataErro(erro);
  } finally {
    console.log(chalk.green("Operação concluída."));
  }
}

export default pegaArquivo;
