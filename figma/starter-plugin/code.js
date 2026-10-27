// @ts-check
// 메모 앱 시작 시안 생성 플러그인
// 현재 Figma 파일에 변수, 텍스트 스타일, 컴포넌트, 완성 예시 화면, 규칙 위반 연습 프레임,
// 구현 비교용 홈(겉모습은 완성 예시와 같고 구조만 다른 선택 실습 시안)을 만든다.
// 디자인 토큰 값은 체크포인트 코드의 src/app/globals.css와 같다.

const FONT = "Noto Sans KR";

/** @type {Record<string, string>} */
const COLORS = {
  "color/primary": "#3B62F6",
  "surface/page": "#F7F8FA",
  "surface/card": "#FFFFFF",
  "text/primary": "#111827",
  "text/body": "#374151",
  "text/secondary": "#6B7280",
  "text/muted": "#9CA3AF",
  "text/on-primary": "#FFFFFF",
  "border/default": "#E5E7EB",
};

/** @type {Record<string, number>} */
const SPACE = {
  "space/4": 4,
  "space/6": 6,
  "space/12": 12,
  "space/16": 16,
  "space/20": 20,
  "space/24": 24,
  "space/34": 34,
  "space/64": 64,
  "radius/md": 12,
};

/** @type {Record<string, { style: string, size: number, line: number }>} */
const TEXT = {
  "heading/xl": { style: "Bold", size: 28, line: 36 },
  "title/md": { style: "Bold", size: 17, line: 24 },
  "body/md": { style: "Regular", size: 16, line: 26 },
  "body/sm": { style: "Regular", size: 14, line: 20 },
  "caption/sm": { style: "Medium", size: 12, line: 16 },
  "button/md": { style: "Bold", size: 16, line: 20 },
};

const MEMOS = [
  { title: "장보기 목록", preview: "우유, 계란, 사과, 커피 원두. 주말 전에 꼭 사 두기", date: "10월 30일" },
  { title: "회의 메모", preview: "시안 검수 기준을 팀 규칙으로 정리하기\n다음 주 회의에서 공유하기로 함", date: "10월 29일" },
  { title: "읽을 책", preview: "디자인 시스템 관련 책 두 권, 출퇴근길에 한 챕터씩 읽기", date: "10월 28일" },
];

/** @param {string} h */
function rgb(h) {
  return {
    r: parseInt(h.slice(1, 3), 16) / 255,
    g: parseInt(h.slice(3, 5), 16) / 255,
    b: parseInt(h.slice(5, 7), 16) / 255,
  };
}

async function buildStarter() {
  for (const style of ["Regular", "Medium", "Bold"]) {
    await figma.loadFontAsync({ family: FONT, style });
  }

  // ---------------------------------------------------------------- 변수
  const colorCol = figma.variables.createVariableCollection("Colors");
  const colorMode = colorCol.modes[0].modeId;
  colorCol.renameMode(colorMode, "Light");
  /** @type {Record<string, Variable>} */
  const V = {};
  for (const [name, hex] of Object.entries(COLORS)) {
    const v = figma.variables.createVariable(name, colorCol, "COLOR");
    v.setValueForMode(colorMode, { ...rgb(hex), a: 1 });
    v.scopes = name.startsWith("text/") ? ["TEXT_FILL"] : name.startsWith("border/") ? ["STROKE_COLOR"] : ["ALL_FILLS", "STROKE_COLOR"];
    // 코드 이름은 체크포인트 globals.css의 CSS 변수와 같다("/"를 "-"로)
    v.setVariableCodeSyntax("WEB", `var(--${name.replace("/", "-")})`);
    V[name] = v;
  }
  const spaceCol = figma.variables.createVariableCollection("Spacing");
  const spaceMode = spaceCol.modes[0].modeId;
  spaceCol.renameMode(spaceMode, "Value");
  for (const [name, value] of Object.entries(SPACE)) {
    const v = figma.variables.createVariable(name, spaceCol, "FLOAT");
    v.setValueForMode(spaceMode, value);
    v.scopes = name.startsWith("radius/") ? ["CORNER_RADIUS"] : ["GAP"];
    v.setVariableCodeSyntax("WEB", `var(--${name.replace("/", "-")})`);
    V[name] = v;
  }

  /** @param {string} name */
  const fill = (name) => figma.variables.setBoundVariableForPaint({ type: "SOLID", color: rgb(COLORS[name]) }, "color", V[name]);

  /**
   * @param {FrameNode | ComponentNode} node
   * @param {{ top?: string, right?: string, bottom?: string, left?: string, gap?: string, radius?: string }} s
   */
  const bindSpace = (node, s) => {
    if (s.top) node.setBoundVariable("paddingTop", V[s.top]);
    if (s.right) node.setBoundVariable("paddingRight", V[s.right]);
    if (s.bottom) node.setBoundVariable("paddingBottom", V[s.bottom]);
    if (s.left) node.setBoundVariable("paddingLeft", V[s.left]);
    if (s.gap) node.setBoundVariable("itemSpacing", V[s.gap]);
    if (s.radius) {
      for (const k of /** @type {const} */ (["topLeftRadius", "topRightRadius", "bottomLeftRadius", "bottomRightRadius"])) {
        node.setBoundVariable(k, V[s.radius]);
      }
    }
  };

  // ---------------------------------------------------------------- 텍스트 스타일
  /** @type {Record<string, TextStyle>} */
  const T = {};
  for (const [name, t] of Object.entries(TEXT)) {
    const st = figma.createTextStyle();
    st.name = name;
    st.fontName = { family: FONT, style: t.style };
    st.fontSize = t.size;
    st.lineHeight = { unit: "PIXELS", value: t.line };
    T[name] = st;
  }

  /**
   * @param {string} name
   * @param {string} chars
   * @param {string} style
   * @param {string} color
   */
  const text = async (name, chars, style, color) => {
    const n = figma.createText();
    n.name = name;
    n.fontName = { family: FONT, style: TEXT[style].style };
    n.characters = chars;
    await n.setTextStyleIdAsync(T[style].id);
    n.fills = [fill(color)];
    return n;
  };

  // 줄바꿈되는 글은 HEIGHT로 바꾼 뒤 부모 폭을 채운다(기본값 WIDTH_AND_HEIGHT면 폭이 무너진다)
  /** @param {TextNode} n */
  const wrapFill = (n) => {
    n.textAutoResize = "HEIGHT";
    n.layoutSizingHorizontal = "FILL";
  };

  /**
   * @param {FrameNode | ComponentNode} node
   * @param {"VERTICAL" | "HORIZONTAL"} dir
   */
  const autoLayout = (node, dir) => {
    node.layoutMode = dir;
    node.primaryAxisSizingMode = "AUTO";
    node.counterAxisSizingMode = "AUTO";
    node.fills = [];
  };

  const page = figma.currentPage;
  page.name = "시작 시안";

  // ---------------------------------------------------------------- 컴포넌트
  const button = figma.createComponent();
  button.name = "Button/Primary";
  button.description = "기본 버튼. label 속성으로 문구를 바꾼다.";
  autoLayout(button, "HORIZONTAL");
  button.primaryAxisAlignItems = "CENTER";
  button.counterAxisAlignItems = "CENTER";
  button.fills = [fill("color/primary")];
  bindSpace(button, { top: "space/12", bottom: "space/12", left: "space/24", right: "space/24", radius: "radius/md" });
  const buttonLabel = await text("Label", "새 메모", "button/md", "text/on-primary");
  button.appendChild(buttonLabel);
  const labelKey = button.addComponentProperty("label", "TEXT", "새 메모");
  buttonLabel.componentPropertyReferences = { characters: labelKey };

  const card = figma.createComponent();
  card.name = "Card/Memo";
  card.description = "메모 카드. 미리보기는 2줄까지 보이고 넘치면 말줄임.";
  autoLayout(card, "VERTICAL");
  card.counterAxisSizingMode = "FIXED";
  card.resize(350, card.height);
  card.fills = [fill("surface/card")];
  card.strokes = [fill("border/default")];
  card.strokeWeight = 1;
  card.strokesIncludedInLayout = false;
  bindSpace(card, { top: "space/16", bottom: "space/16", left: "space/16", right: "space/16", gap: "space/6", radius: "radius/md" });
  const cTitle = await text("Title", MEMOS[0].title, "title/md", "text/primary");
  const cPreview = await text("Preview", MEMOS[0].preview, "body/sm", "text/body");
  const cDate = await text("Date", MEMOS[0].date, "caption/sm", "text/muted");
  for (const n of [cTitle, cPreview, cDate]) {
    card.appendChild(n);
    wrapFill(n);
  }
  cPreview.textTruncation = "ENDING";
  cPreview.maxLines = 2;
  const titleKey = card.addComponentProperty("title", "TEXT", MEMOS[0].title);
  const previewKey = card.addComponentProperty("preview", "TEXT", MEMOS[0].preview);
  const dateKey = card.addComponentProperty("date", "TEXT", MEMOS[0].date);
  cTitle.componentPropertyReferences = { characters: titleKey };
  cPreview.componentPropertyReferences = { characters: previewKey };
  cDate.componentPropertyReferences = { characters: dateKey };

  // ---------------------------------------------------------------- 화면 공통
  /** @param {string} name @param {number} x */
  const screen = (name, x) => {
    const f = figma.createFrame();
    f.name = name;
    f.resize(390, 844);
    f.x = x;
    f.y = 0;
    f.layoutMode = "VERTICAL";
    f.primaryAxisSizingMode = "FIXED";
    f.counterAxisSizingMode = "FIXED";
    f.fills = [fill("surface/page")];
    bindSpace(f, { top: "space/64", bottom: "space/34", left: "space/20", right: "space/20", gap: "space/16" });
    page.appendChild(f);
    return f;
  };
  /** @param {string} name @param {string} gap */
  const group = (name, gap) => {
    const g = figma.createFrame();
    g.name = name;
    autoLayout(g, "VERTICAL");
    bindSpace(g, { gap });
    return g;
  };

  // ---------------------------------------------------------------- 홈 완성 예시
  const home = screen("완성 예시/Home", 0);
  const header = group("Header", "space/4");
  header.appendChild(await text("Title", "내 메모", "heading/xl", "text/primary"));
  header.appendChild(await text("Subtitle", "오늘 기록한 생각들", "body/sm", "text/secondary"));
  home.appendChild(header);
  header.layoutSizingHorizontal = "FILL";
  const list = group("Content/MemoList", "space/12");
  home.appendChild(list);
  list.layoutSizingHorizontal = "FILL";
  list.layoutSizingVertical = "FILL";
  MEMOS.forEach((m, i) => {
    const inst = card.createInstance();
    inst.name = `MemoCard/${i + 1}`;
    inst.setProperties({ [titleKey]: m.title, [previewKey]: m.preview, [dateKey]: m.date });
    list.appendChild(inst);
    inst.layoutSizingHorizontal = "FILL";
  });
  const newBtn = button.createInstance();
  newBtn.name = "Button/NewMemo";
  home.appendChild(newBtn);
  newBtn.layoutSizingHorizontal = "FILL";

  // ---------------------------------------------------------------- 상세 완성 예시
  const detail = screen("완성 예시/Detail", 440);
  const nav = group("NavBar", "space/4");
  nav.appendChild(await text("BackLink", "‹ 목록", "body/md", "text/primary"));
  detail.appendChild(nav);
  nav.layoutSizingHorizontal = "FILL";
  const dHeader = group("Header", "space/4");
  dHeader.appendChild(await text("Title", MEMOS[1].title, "heading/xl", "text/primary"));
  dHeader.appendChild(await text("Date", "10월 29일 오후 3:20", "caption/sm", "text/muted"));
  detail.appendChild(dHeader);
  dHeader.layoutSizingHorizontal = "FILL";
  const divider = figma.createRectangle();
  divider.name = "Divider";
  divider.resize(350, 1);
  divider.fills = [fill("border/default")];
  detail.appendChild(divider);
  divider.layoutSizingHorizontal = "FILL";
  const bodyWrap = group("Content/Body", "space/12");
  detail.appendChild(bodyWrap);
  bodyWrap.layoutSizingHorizontal = "FILL";
  bodyWrap.layoutSizingVertical = "FILL";
  const body = await text("Body", MEMOS[1].preview + "\n\n각자 맡은 화면은 검수 스킬로 채점해 오기", "body/md", "text/body");
  bodyWrap.appendChild(body);
  wrapFill(body);
  const editBtn = button.createInstance();
  editBtn.name = "Button/Edit";
  editBtn.setProperties({ [labelKey]: "수정하기" });
  detail.appendChild(editBtn);
  editBtn.layoutSizingHorizontal = "FILL";

  // ---------------------------------------------------------------- 규칙 위반 연습 프레임
  // 일부러 규칙을 어긴다: 오토레이아웃 없음, 간격용 빈 상자, 값으로 넣은 색, 따로 그린 버튼, 자동 이름.
  const bad = figma.createFrame();
  bad.name = "연습/규칙 위반";
  bad.resize(390, 844);
  bad.x = 880;
  bad.y = 0;
  bad.fills = [{ type: "SOLID", color: rgb("#F7F8FA") }];
  page.appendChild(bad);
  /** @param {string} name @param {string} chars @param {number} size @param {string} hex @param {number} x @param {number} y */
  const rawText = (name, chars, size, hex, x, y) => {
    const n = figma.createText();
    n.name = name;
    n.fontName = { family: FONT, style: "Bold" };
    n.characters = chars;
    n.fontSize = size;
    n.fills = [{ type: "SOLID", color: rgb(hex) }];
    n.x = x;
    n.y = y;
    bad.appendChild(n);
    return n;
  };
  rawText("Frame 12", "내 메모", 28, "#121212", 20, 64);
  const spacer = figma.createRectangle();
  spacer.name = "Rectangle 3";
  spacer.resize(350, 24);
  spacer.x = 20;
  spacer.y = 104;
  spacer.fills = [];
  bad.appendChild(spacer);
  const badCard = figma.createFrame();
  badCard.name = "Frame 21";
  badCard.resize(350, 96);
  badCard.x = 20;
  badCard.y = 128;
  badCard.cornerRadius = 10;
  badCard.fills = [{ type: "SOLID", color: rgb("#FFFFFF") }];
  bad.appendChild(badCard);
  rawText("Text", "장보기 목록", 17, "#1F2937", 36, 144);
  const fakeBtn = figma.createFrame();
  fakeBtn.name = "Group 7";
  fakeBtn.resize(350, 48);
  fakeBtn.x = 20;
  fakeBtn.y = 762;
  fakeBtn.cornerRadius = 12;
  fakeBtn.fills = [{ type: "SOLID", color: rgb("#3B5BF0") }];
  bad.appendChild(fakeBtn);
  rawText("Text", "새 메모", 16, "#FFFFFF", 165, 776);

  // ---------------------------------------------------------------- 구현 비교용 홈 (선택 실습 P5-2)
  // 완성 예시/Home과 픽셀이 같지만 구조는 일부러 나쁘다: 좌표 배치, 사각형+글자 그룹, 값으로 넣은 색,
  // 텍스트 스타일 없음, 간격용 빈 상자, 글자 길이에 맞춘 글상자, 자동 이름.
  const note = figma.createText();
  note.fontName = { family: FONT, style: "Bold" };
  note.characters = "선택 실습 (P5-2): 완성 예시/Home과 겉모습은 같고 구조만 다른 시안";
  note.fontSize = 14;
  note.fills = [{ type: "SOLID", color: rgb("#6B7280") }];
  page.appendChild(note);
  note.x = 1760;
  note.y = -80;
  note.name = "안내/선택 실습";
  const compare = figma.createFrame();
  compare.name = "홈_최종_v2";
  compare.resize(390, 844);
  compare.x = 1760;
  compare.y = 0;
  compare.fills = [{ type: "SOLID", color: rgb("#F7F8FA") }];
  page.appendChild(compare);
  /** @param {string} chars @param {string} style @param {number} size @param {number} line @param {string} hex @param {number} x @param {number} y */
  const plain = (chars, style, size, line, hex, x, y) => {
    const n = figma.createText();
    n.fontName = { family: FONT, style };
    n.characters = chars;
    n.fontSize = size;
    n.lineHeight = { unit: "PIXELS", value: line };
    n.fills = [{ type: "SOLID", color: rgb(hex) }];
    compare.appendChild(n);
    n.x = x;
    n.y = y;
    return n;
  };
  /** @param {string} name @param {number} x @param {number} y @param {number} w @param {number} h @param {string | null} fill @param {string | null} stroke */
  const box = (name, x, y, w, h, fill, stroke) => {
    const r = figma.createRectangle();
    r.name = name;
    r.resize(w, h);
    r.x = x;
    r.y = y;
    r.cornerRadius = fill ? 12 : 0;
    r.fills = fill ? [{ type: "SOLID", color: rgb(fill) }] : [];
    if (stroke) {
      r.strokes = [{ type: "SOLID", color: rgb(stroke) }];
      r.strokeWeight = 1;
      r.strokeAlign = "INSIDE";
    }
    compare.appendChild(r);
    return r;
  };
  plain("내 메모", "Bold", 28, 36, "#111827", 20, 64);
  plain("오늘 기록한 생각들", "Regular", 14, 20, "#6B7280", 20, 104);
  box("Rectangle 3", 20, 124, 350, 16, null, null);
  let cardY = 140;
  MEMOS.forEach((m, i) => {
    const previewLines = m.preview.split("\n").length;
    const h = previewLines > 1 ? 124 : 104;
    const parts = [
      box(`Rectangle ${12 + i}`, 20, cardY, 350, h, "#FFFFFF", "#E5E7EB"),
      plain(m.title, "Bold", 17, 24, "#111827", 36, cardY + 16),
      plain(m.preview, "Regular", 14, 20, "#374151", 36, cardY + 46),
      plain(m.date, "Medium", 12, 16, "#9CA3AF", 36, cardY + 46 + 20 * previewLines + 6),
    ];
    figma.group(parts, compare).name = `Group ${5 + i}`;
    cardY += h + 12;
  });
  figma.group([box("Rectangle 21", 20, 766, 350, 44, "#3B62F6", null), plain("새 메모", "Bold", 16, 20, "#FFFFFF", 171, 778)], compare).name = "Group 7";

  // ---------------------------------------------------------------- 컴포넌트 배치
  button.x = 1320;
  button.y = 0;
  card.x = 1320;
  card.y = 120;
  page.appendChild(button);
  page.appendChild(card);

  figma.viewport.scrollAndZoomIntoView([home, detail, bad, button, card, compare]);
  return {
    variables: Object.keys(V).length,
    textStyles: Object.keys(T).length,
    frames: [home.name, detail.name, bad.name, compare.name],
    components: [button.name, card.name],
  };
}

buildStarter()
  .then((r) => figma.closePlugin(`시작 시안 생성 완료: 변수 ${r.variables}개, 텍스트 스타일 ${r.textStyles}개`))
  .catch((e) => figma.closePlugin(`오류: ${e && e.message ? e.message : e}`));
