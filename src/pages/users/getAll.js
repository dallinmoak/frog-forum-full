import { db } from "../../utils/db";
import {
  getAuthId,
  standard200,
  standard401,
} from "../../utils/requestHelpers";

export const GET = async (context) => {
  const requestorAuthId = getAuthId(context);
  if (!!requestorAuthId) {
    const queryRes = await db.query('SELECT * FROM "test-frog".users');
    const users = queryRes.rows;
    return standard200(users);
  } else {
    const path = new URL(context.request.url).pathname;
    return standard401(path, requestorAuthId, "not authenticated");
  }
};
