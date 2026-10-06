// Supabase 키가 없을 때 보여 주는 안내
export function SetupNotice() {
  return (
    <div className="flex flex-col gap-s6 rounded-md border border-border-default bg-surface-card p-s16">
      <span className="text-title-md text-text-primary">Supabase 연결이 필요합니다</span>
      <span className="text-body-sm text-text-body">
        .env.local에 NEXT_PUBLIC_SUPABASE_URL과 공개 키를 넣고 개발 서버를 다시 시작해 주세요.
      </span>
    </div>
  );
}
