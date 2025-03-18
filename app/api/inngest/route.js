import {inngest, syncUserCreation, syncUserDeletion, syncUserUpdation} from "@/config/inngest";
import { serve } from "inngest/next";

// Create a client to send and receive events

// Create an API that serves zero functions
export const {GET,POST,PUT}= serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion

  ],
});
