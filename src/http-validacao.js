function extraiLinks(arrLinks) {
  return arrLinks.map((item) => Object.values(item).join());
}

async function checaStatus(arrURLs) {
  const arrStatus = await Promise.all(
    arrURLs.map(async (url) => {
      const res = await fetch(url);
      return res.status;
    })
  );

  return arrStatus;
}

export default async function listaValidada(listaDeLinks) {
  const links = extraiLinks(listaDeLinks);
  const status = await checaStatus(links);

  return listaDeLinks.map((objeto, index) => ({
    ...objeto,
    status: status[index],
  }));
}
