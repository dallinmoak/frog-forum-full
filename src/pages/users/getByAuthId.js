import { db } from "../../utils/db";
import {
  getAuthId,
  standard200,
  standard401,
  standard404,
} from "../../utils/requestHelpers";

export const GET = async (context) => {
  const requestorAuthId = getAuthId(context);
  const targetAuthId = new URL(context.request.url).searchParams.get("authId");
  const requestIsAllowed = !!requestorAuthId;
  const url = new URL(context.request.url);
  const path = url.pathname + url.search;
  if (requestIsAllowed) {
    const queryRes = await db.query(
      'SELECT * FROM "test-frog".users WHERE auth_id = $1',
      [targetAuthId]
    );
    if (queryRes.rowCount === 0) {
      return standard404(path);
    }
    const user = queryRes.rows[0];
    return standard200(user);
  } else {
    return standard401(path, requestorAuthId, "not authenticated");
  }
};
