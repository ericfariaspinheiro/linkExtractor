import chalk from "chalk";

function extraiLinks(arrLinks) {
  return arrLinks.map((item) => Object.values(item).join());
}

async function checaStatus(arrURLs) {
  const arrStatus = await Promise.all(
    arrURLs.map(async (url) => {
      try {
        const res = await fetch(url);
        return res.status;
      } catch (erro) {
        return manejaErro(erro);
      }
    })
  );

  return arrStatus;
}

function manejaErro(erro) {
  if (erro.cause.code === "ENOTFOUND") {
    return "Link não encontrado";
  } else {
    return "Ocorreu algum erro";
  }
}

export default async function listaValidada(listaDeLinks) {
  const links = extraiLinks(listaDeLinks);
  const status = await checaStatus(links);

  return listaDeLinks.map((objeto, index) => ({
    ...objeto,
    status: status[index],
  }));
}
