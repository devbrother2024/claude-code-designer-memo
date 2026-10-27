import { createClient } from "@supabase/supabase-js";

/** 데이터를 읽는 순간에 만든다. 키가 비어 있어도 앱 빌드와 다른 화면은 깨지지 않는다. */
export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error(
      ".env.local에 NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY를 채운 뒤 개발 서버를 다시 시작하세요.",
    );
  }
  return createClient(url, key);
}
