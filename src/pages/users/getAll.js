export const GET = async (context) => {
  const authIdHeader = context.request.headers.get("requesterauthid");
  const requesterAuthId =
    authIdHeader == "undefined" ? undefined : authIdHeader;
  if (!!requesterAuthId) {
    const usersPromise = new Promise((resolve, reject) => {
      resolve([
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          email: "johndoe@test.test",
        },
        {
          id: 2,
          firstName: "Jane",
          lastName: "Doe",
          email: "janedoe@test.test",
        },
      ]);
    });
    const users = await usersPromise;
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  } else {
    return new Response(
      `Unauthorized: the resource "${
        new URL(context.request.url).pathname
      }" is not allowed for requestor: ${requesterAuthId}`,
      {
        status: 401,
        headers: {
          "content-type": "text/plain",
        },
      }
    );
  }
};
