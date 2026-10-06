import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Supabase 대시보드의 공개 키. 새 이름(publishable)과 예전 이름(anon) 둘 다 받는다.
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 키가 아직 없으면 null. 화면에서 .env.local 설정 안내를 보여 준다.
export const supabase = url && key ? createClient(url, key) : null;
