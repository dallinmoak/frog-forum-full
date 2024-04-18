import { getSession } from "auth-astro/server";

/**
 * returns a promise that resolves to the data from the fetch request
 *
 * @param {string} resourcePath the path to the resource (in the pages dir)
 * @param { Readonly<AstroGlobal<Record<string, any>, AstroComponentFactory, Record<string, string | undefined>>>} astroGlobal astro object so you can get the current request and url
 */
const fetchData = async (resourcePath, astroGlobal) => {
  const session = await getSession(astroGlobal.request);
  const options = {
    headers: {
      requesterAuthId: session?.user?.id,
    },
  };
  const res = await fetch(`${astroGlobal.url}/${resourcePath}`, options);
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    const error = await res.text();
    console.error(`Error fetching data from ${resourcePath}: ${error}`);
    return { error };
  }
};

export default fetchData;
