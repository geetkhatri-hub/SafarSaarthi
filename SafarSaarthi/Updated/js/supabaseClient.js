import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://guqnuulxhneraxjoqrtq.supabase.co";

const SUPABASE_KEY = "sb_publishable_XanNVS3Gc0lO0wEGJexBsw_xdIppcNo";

export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);