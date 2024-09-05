import {createSafeActionClient} from "next-safe-action"

// Note :- next-safe-action ensures that actions intended to run only on the server are correctly handled there,
// reducing the risk of exposing sensitive logic or data to the client.

export const actionClient = createSafeActionClient()