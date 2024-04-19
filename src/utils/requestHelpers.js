const standard200 = (body) => {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
};

const standard401 = (resource, requestor, reason) => {
  return new Response(
    `Unauthorized: the resource "${resource}" is not allowed for requestor ${requestor}. Reason: ${reason}`,
    {
      status: 401,
      headers: {
        "content-type": "text/plain",
      },
    }
  );
};

const standard404 = (resource) => {
  return new Response(`Not found: the resource "${resource}" is not found.`, {
    status: 404,
    headers: {
      "content-type": "text/plain",
    },
  });
};

/**
 * Returns the authId from the request headers
 * @param {APIContext} context the astro endpoint context
 * @returns {string | undefined} the authId or undefined
 */
const getAuthId = (context) => {
  const authIdHeader = context.request.headers.get("requestorauthid");
  const authId = authIdHeader == "undefined" ? undefined : authIdHeader;
  return authId;
};

export { standard200, standard401, standard404, getAuthId };
