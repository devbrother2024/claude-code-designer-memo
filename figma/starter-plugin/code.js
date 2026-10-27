// @ts-check
// 메모 앱 시작 시안 생성 플러그인 (큰 글자·둥근 카드)
// 현재 Figma 파일에 변수(라이트·다크), 텍스트 스타일, 아이콘·컴포넌트, 완성 예시 화면 세 장(홈·상세·작성),
// 규칙 위반 연습 프레임, 구현 비교용 홈(겉모습은 완성 예시/Home과 같고 구조만 다른 선택 실습 시안)을 만든다.

const FONT = "Noto Sans KR";

/** @type {Record<string, [string, string]>} 이름: [Light, Dark] */
const COLORS = {
  "color/primary": ["#3182F6", "#4D94FF"],
  "surface/page": ["#F2F4F6", "#101014"],
  "surface/card": ["#FFFFFF", "#1C1C22"],
  "text/primary": ["#191F28", "#F1F3F5"],
  "text/secondary": ["#4E5968", "#B3BAC2"],
  "text/muted": ["#8B95A1", "#6E7783"],
  "text/on-primary": ["#FFFFFF", "#FFFFFF"],
  "border/default": ["#E5E8EB", "#2A2A33"],
  "label/blue": ["#3182F6", "#6AA6FF"],
  "label/blue-soft": ["#E8F3FF", "#1D2A40"],
  "label/green": ["#12A150", "#3CCB7F"],
  "label/green-soft": ["#E3F8EC", "#17302A"],
  "label/orange": ["#F76808", "#FF9446"],
  "label/orange-soft": ["#FFF1E5", "#3A2817"],
  "label/pink": ["#E5397A", "#FF6FA2"],
  "label/pink-soft": ["#FFEAF1", "#3B1D2A"],
};

/** @type {Record<string, number>} */
const SPACE = {
  "space/4": 4,
  "space/8": 8,
  "space/12": 12,
  "space/16": 16,
  "space/20": 20,
  "space/24": 24,
  "space/34": 34,
  "space/48": 48,
  "space/64": 64,
  "radius/sm": 12,
  "radius/md": 16,
  "radius/lg": 20,
  "radius/xl": 24,
  "radius/full": 999,
};

/** @type {Record<string, { style: string, size: number, line: number, ls: number }>} */
const TEXT = {
  "heading/xl": { style: "Bold", size: 28, line: 38, ls: -0.8 },
  "heading/lg": { style: "Bold", size: 26, line: 36, ls: -0.8 },
  "title/md": { style: "Bold", size: 17, line: 24, ls: -0.3 },
  "body/md": { style: "Regular", size: 16, line: 28, ls: -0.2 },
  "body/sm": { style: "Regular", size: 14, line: 20, ls: -0.1 },
  "caption/md": { style: "Medium", size: 15, line: 22, ls: -0.2 },
  "caption/sm": { style: "Medium", size: 13, line: 18, ls: 0 },
  "button/md": { style: "Bold", size: 17, line: 24, ls: -0.2 },
};

const MEMOS = [
  { title: "장보기 목록", preview: "우유, 계란, 사과, 커피 원두", date: "10월 30일" },
  { title: "회의 메모", preview: "시안 검수 기준 정리하기", date: "10월 29일" },
  { title: "읽을 책", preview: "디자인 시스템 책 두 권", date: "10월 28일" },
];
const TODAY = "10월 30일 금요일";
const DETAIL = {
  title: "회의 메모",
  date: "10월 29일 오후 3:20",
  body: ["시안 검수 기준을 팀 규칙으로 정리하기. 다음 주 회의에서 공유하기로 함.", "각자 맡은 화면은 검수 스킬로 채점해 오기."],
};

/** 24px 선 아이콘 (선 굵기 2) */
const ICONS = {
  "Icon/Plus": '<path d="M12 5v14M5 12h14"/>',
  "Icon/ChevronLeft": '<path d="M15 18l-6-6 6-6"/>',
  "Icon/More": '<circle cx="5.5" cy="12" r="1.6" fill="#000" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="#000" stroke="none"/><circle cx="18.5" cy="12" r="1.6" fill="#000" stroke="none"/>',
  "Icon/Note": '<path d="M7 4h7l4 4v12H7z"/><path d="M14 4v4h4M10 12h5M10 16h5"/>',
};

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
  const page = figma.currentPage;
  page.name = "시작 시안";

  // ---------------------------------------------------------------- 변수
  const colorCol = figma.variables.createVariableCollection("Colors");
  const light = colorCol.modes[0].modeId;
  colorCol.renameMode(light, "Light");
  const dark = colorCol.addMode("Dark");
  /** @type {Record<string, Variable>} */
  const V = {};
  for (const [name, [l, d]] of Object.entries(COLORS)) {
    const v = figma.variables.createVariable(name, colorCol, "COLOR");
    v.setValueForMode(light, { ...rgb(l), a: 1 });
    v.setValueForMode(dark, { ...rgb(d), a: 1 });
    v.scopes = name.startsWith("text/") ? ["TEXT_FILL"] : name.startsWith("border/") ? ["STROKE_COLOR", "SHAPE_FILL"] : ["ALL_FILLS", "STROKE_COLOR"];
    // 코드 이름은 CSS 변수와 같다("/"를 "-"로)
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
  const fill = (name) => figma.variables.setBoundVariableForPaint({ type: "SOLID", color: rgb(COLORS[name][0]) }, "color", V[name]);
  /**
   * @param {FrameNode | ComponentNode} node
   * @param {{ top?: string, right?: string, bottom?: string, left?: string, gap?: string, radius?: string }} s
   */
  const bind = (node, s) => {
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
    st.letterSpacing = { unit: "PIXELS", value: t.ls };
    T[name] = st;
  }

  /** @param {string} name @param {string} chars @param {string} style @param {string} color */
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
  /** @param {string} name @param {"VERTICAL" | "HORIZONTAL"} dir */
  const box = (name, dir) => {
    const f = figma.createFrame();
    f.name = name;
    f.layoutMode = dir;
    f.primaryAxisSizingMode = "AUTO";
    f.counterAxisSizingMode = "AUTO";
    f.fills = [];
    f.clipsContent = false;
    return f;
  };

  // ---------------------------------------------------------------- 아이콘
  /** @type {Record<string, ComponentNode>} */
  const IC = {};
  for (const [name, body] of Object.entries(ICONS)) {
    const svg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
    const src = figma.createNodeFromSvg(svg);
    const comp = figma.createComponent();
    comp.name = name;
    comp.resize(24, 24);
    comp.fills = [];
    comp.clipsContent = false;
    for (const child of [...src.children]) {
      comp.appendChild(child);
      child.name = "Shape";
      if ("strokes" in child && child.strokes.length) child.strokes = [fill("text/primary")];
      if ("fills" in child && Array.isArray(child.fills) && child.fills.length) child.fills = [fill("text/primary")];
      if ("constraints" in child) child.constraints = { horizontal: "SCALE", vertical: "SCALE" };
    }
    src.remove();
    comp.description = "선 아이콘(원본 24px). 쓰는 곳에 맞춰 크기를 줄이고, 색은 글자색 변수로 바꾼다.";
    page.appendChild(comp);
    IC[name] = comp;
  }
  /** 인스턴스를 만들어 크기·색을 맞춘다. color가 #로 시작하면 값 그대로 칠한다(비교용 시안). */
  /** @param {string} name @param {number} size @param {string} color */
  const icon = (name, size, color) => {
    const i = IC[name].createInstance();
    i.name = name;
    if (size !== 24) i.rescale(size / 24);
    const paint = () => (color.startsWith("#") ? { type: /** @type {const} */ ("SOLID"), color: rgb(color) } : fill(color));
    for (const s of i.findAll((n) => n.name === "Shape")) {
      if ("strokes" in s && s.strokes.length) s.strokes = [paint()];
      if ("fills" in s && Array.isArray(s.fills) && s.fills.length) s.fills = [paint()];
    }
    return i;
  };

  // ---------------------------------------------------------------- 컴포넌트
  const button = figma.createComponent();
  button.name = "Button/Primary";
  button.description = "화면의 주 버튼. 화면마다 하나만 두고 아래쪽에 가로로 꽉 차게 둔다. label로 문구를 바꾸고, icon을 켜면 앞에 + 아이콘이 붙는다.";
  button.layoutMode = "HORIZONTAL";
  button.primaryAxisSizingMode = "AUTO";
  button.counterAxisSizingMode = "FIXED";
  button.resize(160, 56);
  button.primaryAxisAlignItems = "CENTER";
  button.counterAxisAlignItems = "CENTER";
  button.fills = [fill("color/primary")];
  bind(button, { left: "space/24", right: "space/24", gap: "space/8", radius: "radius/md" });
  const plus = icon("Icon/Plus", 20, "text/on-primary");
  button.appendChild(plus);
  const bLabel = await text("Label", "새 메모 쓰기", "button/md", "text/on-primary");
  button.appendChild(bLabel);
  const labelKey = button.addComponentProperty("label", "TEXT", "새 메모 쓰기");
  bLabel.componentPropertyReferences = { characters: labelKey };
  const iconKey = button.addComponentProperty("icon", "BOOLEAN", false);
  plus.componentPropertyReferences = { visible: iconKey };

  const iconButton = figma.createComponent();
  iconButton.name = "Button/Icon";
  iconButton.description = "아이콘 버튼. 40×40 누르는 영역 가운데에 아이콘을 둔다. icon 속성으로 아이콘을 바꾼다. 뒤로가기는 이전 화면으로 돌아간다.";
  iconButton.layoutMode = "HORIZONTAL";
  iconButton.primaryAxisSizingMode = "FIXED";
  iconButton.counterAxisSizingMode = "FIXED";
  iconButton.resize(40, 40);
  iconButton.primaryAxisAlignItems = "CENTER";
  iconButton.counterAxisAlignItems = "CENTER";
  iconButton.fills = [];
  bind(iconButton, { radius: "radius/sm" });
  const ibIcon = icon("Icon/ChevronLeft", 24, "text/primary");
  iconButton.appendChild(ibIcon);
  const swapKey = iconButton.addComponentProperty("icon", "INSTANCE_SWAP", IC["Icon/ChevronLeft"].id);
  ibIcon.componentPropertyReferences = { mainComponent: swapKey };

  const item = figma.createComponent();
  item.name = "Memo/Item";
  item.description = "메모 목록의 한 줄. 미리보기는 1줄까지 보이고 넘치면 말줄임. 누르면 메모 상세로 이동한다.";
  item.layoutMode = "HORIZONTAL";
  item.primaryAxisSizingMode = "FIXED";
  item.counterAxisSizingMode = "AUTO";
  item.resize(358, 72);
  item.counterAxisAlignItems = "CENTER";
  item.fills = [];
  bind(item, { top: "space/12", bottom: "space/12", left: "space/20", right: "space/20", gap: "space/16" });
  const tile = box("Tile", "HORIZONTAL");
  tile.primaryAxisSizingMode = "FIXED";
  tile.counterAxisSizingMode = "FIXED";
  tile.resize(44, 44);
  tile.primaryAxisAlignItems = "CENTER";
  tile.counterAxisAlignItems = "CENTER";
  tile.fills = [fill("label/blue-soft")];
  bind(tile, { radius: "radius/sm" });
  tile.appendChild(icon("Icon/Note", 22, "label/blue"));
  item.appendChild(tile);
  const content = box("Content", "VERTICAL");
  bind(content, { gap: "space/4" });
  item.appendChild(content);
  content.layoutSizingHorizontal = "FILL";
  const iTitle = await text("Title", MEMOS[0].title, "title/md", "text/primary");
  const iPreview = await text("Preview", MEMOS[0].preview, "body/sm", "text/secondary");
  for (const n of [iTitle, iPreview]) {
    content.appendChild(n);
    wrapFill(n);
  }
  iPreview.textTruncation = "ENDING";
  iPreview.maxLines = 1;
  const iDate = await text("Date", MEMOS[0].date, "caption/sm", "text/muted");
  item.appendChild(iDate);
  const tKey = item.addComponentProperty("title", "TEXT", MEMOS[0].title);
  const pKey = item.addComponentProperty("preview", "TEXT", MEMOS[0].preview);
  const dKey = item.addComponentProperty("date", "TEXT", MEMOS[0].date);
  iTitle.componentPropertyReferences = { characters: tKey };
  iPreview.componentPropertyReferences = { characters: pKey };
  iDate.componentPropertyReferences = { characters: dKey };

  // 입력 칸: Type=Title(제목 한 줄) | Body(여러 줄 내용), State=Default | Focused(입력 중)
  /** @param {"Title" | "Body"} type @param {"Default" | "Focused"} state */
  const field = async (type, state) => {
    const c = figma.createComponent();
    c.name = `Type=${type}, State=${state}`;
    c.layoutMode = "VERTICAL";
    c.primaryAxisSizingMode = type === "Body" ? "FIXED" : "AUTO";
    c.counterAxisSizingMode = "FIXED";
    c.resize(358, type === "Body" ? 156 : 80);
    c.fills = [fill("surface/card")];
    bind(c, { top: "space/16", bottom: "space/16", left: "space/20", right: "space/20", gap: "space/4", radius: "radius/lg" });
    if (state === "Focused") {
      c.strokes = [fill("color/primary")];
      c.strokeWeight = 2;
      c.strokeAlign = "INSIDE";
    }
    const lab = await text("Label", type === "Title" ? "제목" : "내용", "caption/sm", "text/muted");
    const val = type === "Title"
      ? await text("Value", "주말 등산", "title/md", "text/primary")
      : await text("Placeholder", "토요일 오전 7시 출발, 물 두 병과 간식 챙기기", "body/md", "text/muted");
    for (const n of [lab, val]) {
      c.appendChild(n);
      wrapFill(n);
    }
    return c;
  };
  const variants = [await field("Title", "Default"), await field("Title", "Focused"), await field("Body", "Default"), await field("Body", "Focused")];
  const fieldSet = figma.combineAsVariants(variants, page);
  fieldSet.name = "Input/Field";
  fieldSet.description = "입력 칸. Type=Title은 제목 한 줄, Type=Body는 여러 줄 내용(최소 높이 156). 입력 중에는 State=Focused처럼 파란 테두리를 보인다. 비어 있으면 회색 안내 문구를 보인다.";
  fieldSet.layoutMode = "VERTICAL";
  fieldSet.primaryAxisSizingMode = "AUTO";
  fieldSet.counterAxisSizingMode = "AUTO";
  fieldSet.itemSpacing = 16;
  fieldSet.paddingTop = fieldSet.paddingBottom = fieldSet.paddingLeft = fieldSet.paddingRight = 16;
  fieldSet.fills = [];
  /** @param {"Title" | "Body"} type @param {"Default" | "Focused"} state */
  const variant = (type, state) => /** @type {ComponentNode} */ (fieldSet.children.find((n) => n.name === `Type=${type}, State=${state}`));

  // ---------------------------------------------------------------- 화면 공통
  /** @param {string} name @param {number} x @param {string} top */
  const screen = (name, x, top) => {
    const f = figma.createFrame();
    f.name = name;
    f.resize(390, 844);
    f.x = x;
    f.y = 0;
    f.layoutMode = "VERTICAL";
    f.primaryAxisSizingMode = "FIXED";
    f.counterAxisSizingMode = "FIXED";
    f.fills = [fill("surface/page")];
    bind(f, { top, bottom: "space/34", left: "space/16", right: "space/16", gap: "space/16" });
    page.appendChild(f);
    return f;
  };
  // 남는 높이를 채우는 본문 묶음. 주 버튼이 화면 아래에 붙는다.
  /** @param {FrameNode} parent @param {string | null} gap */
  const main = (parent, gap) => {
    const m = box("Main", "VERTICAL");
    if (gap) bind(m, { gap });
    parent.appendChild(m);
    m.layoutSizingHorizontal = "FILL";
    m.layoutSizingVertical = "FILL";
    return m;
  };
  /** @param {FrameNode} parent @param {boolean} more */
  const navBar = (parent, more) => {
    const nav = box("NavBar", "HORIZONTAL");
    nav.primaryAxisAlignItems = "SPACE_BETWEEN";
    nav.counterAxisAlignItems = "CENTER";
    parent.appendChild(nav);
    nav.layoutSizingHorizontal = "FILL";
    for (const [nm, ic] of [["Back", "Icon/ChevronLeft"], ["More", "Icon/More"]]) {
      if (nm === "More" && !more) continue;
      const b = iconButton.createInstance();
      b.name = nm;
      if (ic !== "Icon/ChevronLeft") {
        b.setProperties({ [swapKey]: IC[ic].id });
        b.children[0].name = ic;
      }
      nav.appendChild(b);
    }
    return nav;
  };

  // ---------------------------------------------------------------- 홈 완성 예시
  const home = screen("완성 예시/Home", 0, "space/64");
  const hMain = main(home, "space/24");
  const header = box("Header", "VERTICAL");
  bind(header, { gap: "space/8", left: "space/8", right: "space/8" });
  hMain.appendChild(header);
  header.layoutSizingHorizontal = "FILL";
  const hDate = await text("Date", TODAY, "caption/md", "text/muted");
  const hTitle = await text("Title", "오늘까지 메모를\n3개 남겼어요", "heading/xl", "text/primary");
  for (const n of [hDate, hTitle]) {
    header.appendChild(n);
    wrapFill(n);
  }
  const count = hTitle.characters.indexOf("3개");
  hTitle.setRangeFills(count, count + 2, [fill("color/primary")]);
  const list = box("Content/MemoList", "VERTICAL");
  list.fills = [fill("surface/card")];
  bind(list, { top: "space/8", bottom: "space/8", radius: "radius/xl" });
  hMain.appendChild(list);
  list.layoutSizingHorizontal = "FILL";
  MEMOS.forEach((m, i) => {
    const inst = item.createInstance();
    inst.name = `MemoItem/${i + 1}`;
    inst.setProperties({ [tKey]: m.title, [pKey]: m.preview, [dKey]: m.date });
    list.appendChild(inst);
    inst.layoutSizingHorizontal = "FILL";
  });
  const newBtn = button.createInstance();
  newBtn.name = "Button/NewMemo";
  newBtn.setProperties({ [iconKey]: true });
  home.appendChild(newBtn);
  newBtn.layoutSizingHorizontal = "FILL";

  // ---------------------------------------------------------------- 상세 완성 예시
  const detail = screen("완성 예시/Detail", 440, "space/48");
  navBar(detail, true);
  const dMain = main(detail, null);
  const read = box("Content/Memo", "VERTICAL");
  read.fills = [fill("surface/card")];
  bind(read, { top: "space/24", bottom: "space/24", left: "space/20", right: "space/20", gap: "space/8", radius: "radius/xl" });
  dMain.appendChild(read);
  read.layoutSizingHorizontal = "FILL";
  const dTitle = await text("Title", DETAIL.title, "heading/lg", "text/primary");
  const dDate = await text("Date", DETAIL.date, "body/sm", "text/muted");
  for (const n of [dTitle, dDate]) {
    read.appendChild(n);
    wrapFill(n);
  }
  const divider = figma.createRectangle();
  divider.name = "Divider";
  divider.resize(318, 1);
  divider.fills = [fill("border/default")];
  read.appendChild(divider);
  divider.layoutSizingHorizontal = "FILL";
  // 문단은 글상자를 나눈다(글상자 속 Enter는 코드에서 공백이 된다)
  const body = box("Body", "VERTICAL");
  bind(body, { top: "space/8", gap: "space/12" });
  read.appendChild(body);
  body.layoutSizingHorizontal = "FILL";
  for (const para of DETAIL.body) {
    const p = await text("Paragraph", para, "body/md", "text/secondary");
    body.appendChild(p);
    wrapFill(p);
  }
  const editBtn = button.createInstance();
  editBtn.name = "Button/Edit";
  editBtn.setProperties({ [labelKey]: "수정하기" });
  detail.appendChild(editBtn);
  editBtn.layoutSizingHorizontal = "FILL";

  // ---------------------------------------------------------------- 작성 완성 예시
  const write = screen("완성 예시/Write", 880, "space/48");
  navBar(write, false);
  const wMain = main(write, "space/24");
  const ask = box("Header", "VERTICAL");
  bind(ask, { left: "space/8", right: "space/8" });
  wMain.appendChild(ask);
  ask.layoutSizingHorizontal = "FILL";
  const askTitle = await text("Title", "어떤 메모를\n남길까요?", "heading/lg", "text/primary");
  ask.appendChild(askTitle);
  wrapFill(askTitle);
  const form = box("Form", "VERTICAL");
  bind(form, { gap: "space/12" });
  wMain.appendChild(form);
  form.layoutSizingHorizontal = "FILL";
  const titleField = variant("Title", "Focused").createInstance();
  titleField.name = "Field/Title";
  const bodyField = variant("Body", "Default").createInstance();
  bodyField.name = "Field/Body";
  for (const f of [titleField, bodyField]) {
    form.appendChild(f);
    f.layoutSizingHorizontal = "FILL";
  }
  const saveBtn = button.createInstance();
  saveBtn.name = "Button/Save";
  saveBtn.setProperties({ [labelKey]: "저장하기" });
  write.appendChild(saveBtn);
  saveBtn.layoutSizingHorizontal = "FILL";

  // ---------------------------------------------------------------- 규칙 위반 연습 프레임
  // 일부러 규칙을 어긴다: 오토레이아웃 없음, 간격용 빈 상자, 카드 위에 올려 둔 글자, 값으로 넣은 색,
  // 줄 높이 Auto, 따로 그린 버튼, 자동 이름.
  const bad = figma.createFrame();
  bad.name = "연습/규칙 위반";
  bad.resize(390, 844);
  bad.x = 1320;
  bad.y = 0;
  bad.fills = [{ type: "SOLID", color: rgb("#F2F4F6") }];
  page.appendChild(bad);
  /**
   * 값으로 넣은 글자. line이 null이면 줄 높이 Auto.
   * @param {FrameNode} into @param {string} name @param {string} chars @param {string} style @param {number} size
   * @param {number | null} line @param {number} ls @param {string} hex @param {number} x @param {number} y
   */
  const raw = (into, name, chars, style, size, line, ls, hex, x, y) => {
    const n = figma.createText();
    n.name = name;
    n.fontName = { family: FONT, style };
    n.characters = chars;
    n.fontSize = size;
    if (line !== null) n.lineHeight = { unit: "PIXELS", value: line };
    if (ls) n.letterSpacing = { unit: "PIXELS", value: ls };
    n.fills = [{ type: "SOLID", color: rgb(hex) }];
    into.appendChild(n);
    n.x = x;
    n.y = y;
    return n;
  };
  /** @param {FrameNode} into @param {string} name @param {number} x @param {number} y @param {number} w @param {number} h @param {string | null} hex @param {number} r */
  const rect = (into, name, x, y, w, h, hex, r) => {
    const n = figma.createRectangle();
    n.name = name;
    n.resize(w, h);
    n.x = x;
    n.y = y;
    n.cornerRadius = r;
    n.fills = hex ? [{ type: "SOLID", color: rgb(hex) }] : [];
    into.appendChild(n);
    return n;
  };
  raw(bad, "Frame 12", "오늘까지 메모를\n3개 남겼어요", "Bold", 28, null, 0, "#121212", 24, 64);
  rect(bad, "Rectangle 3", 16, 146, 358, 24, null, 0);
  const badCard = figma.createFrame();
  badCard.name = "Frame 21";
  badCard.resize(358, 88);
  badCard.x = 16;
  badCard.y = 170;
  badCard.cornerRadius = 20;
  badCard.fills = [{ type: "SOLID", color: rgb("#FFFFFF") }];
  bad.appendChild(badCard);
  rect(bad, "Rectangle 8", 36, 192, 44, 44, "#E8F3FF", 12);
  raw(bad, "Text", "장보기 목록", "Bold", 17, null, 0, "#1F2937", 96, 190);
  raw(bad, "우유, 계란, 사과, 커피 원두", "우유, 계란, 사과, 커피 원두", "Regular", 14, null, 0, "#4E5968", 96, 216);
  const fake = figma.createFrame();
  fake.name = "Group 7";
  fake.resize(358, 52);
  fake.x = 16;
  fake.y = 758;
  fake.cornerRadius = 14;
  fake.fills = [{ type: "SOLID", color: rgb("#3B7BF6") }];
  bad.appendChild(fake);
  raw(bad, "Text", "새 메모 쓰기", "Bold", 17, null, 0, "#FFFFFF", 147, 771);

  // ---------------------------------------------------------------- 구현 비교용 홈 (선택 실습 P5-2)
  // 완성 예시/Home과 픽셀이 같지만 구조는 일부러 나쁘다: 좌표 배치, 사각형+글자 그룹, 값으로 넣은 색,
  // 텍스트 스타일 없음, 간격용 빈 상자, 글자 길이에 맞춘 글상자, 자동 이름.
  const cmpX = 2240;
  const note = figma.createText();
  note.fontName = { family: FONT, style: "Bold" };
  note.characters = "선택 실습 (P5-2): 완성 예시/Home과 겉모습은 같고 구조만 다른 시안";
  note.fontSize = 14;
  note.fills = [{ type: "SOLID", color: rgb("#6B7280") }];
  page.appendChild(note);
  note.x = cmpX;
  note.y = -80;
  note.name = "안내/선택 실습";
  const cmp = figma.createFrame();
  cmp.name = "홈_최종_v2";
  cmp.resize(390, 844);
  cmp.x = cmpX;
  cmp.y = 0;
  cmp.fills = [{ type: "SOLID", color: rgb(COLORS["surface/page"][0]) }];
  page.appendChild(cmp);
  /** 완성 예시/Home 안에서의 위치 @param {SceneNode} n */
  const at = (n) => {
    const b = n.absoluteBoundingBox;
    const h0 = home.absoluteBoundingBox;
    if (!b || !h0) throw new Error(`위치를 못 읽음: ${n.name}`);
    return { x: b.x - h0.x, y: b.y - h0.y, w: b.width, h: b.height };
  };
  /** @param {SceneNode} root @param {string} name */
  const part = (root, name) => {
    const n = "findOne" in root ? root.findOne((c) => c.name === name) : null;
    if (!n) throw new Error(`없는 레이어: ${name}`);
    return n;
  };
  const C = (/** @type {string} */ k) => COLORS[k][0];
  const hd = at(hDate);
  raw(cmp, TODAY, TODAY, "Medium", 15, 22, -0.2, C("text/muted"), hd.x, hd.y);
  const ht = at(hTitle);
  const bigTitle = raw(cmp, "오늘까지 메모를 3개 남겼어요", "오늘까지 메모를\n3개 남겼어요", "Bold", 28, 38, -0.8, C("text/primary"), ht.x, ht.y);
  bigTitle.setRangeFills(count, count + 2, [{ type: "SOLID", color: rgb(C("color/primary")) }]);
  const hb = at(header);
  const lb = at(list);
  rect(cmp, "Rectangle 3", lb.x, hb.y + hb.h, lb.w, lb.y - (hb.y + hb.h), null, 0);
  rect(cmp, "Rectangle 12", lb.x, lb.y, lb.w, lb.h, C("surface/card"), 24);
  list.children.forEach((child, i) => {
    const parts = [];
    const tl = at(part(child, "Tile"));
    parts.push(rect(cmp, `Rectangle ${13 + i}`, tl.x, tl.y, tl.w, tl.h, C("label/blue-soft"), 12));
    const ib = at(part(child, "Icon/Note"));
    const ic = icon("Icon/Note", 22, C("label/blue"));
    cmp.appendChild(ic);
    const icf = ic.detachInstance();
    icf.name = `Frame ${31 + i}`;
    icf.x = ib.x;
    icf.y = ib.y;
    parts.push(icf);
    const tt = at(part(child, "Title"));
    parts.push(raw(cmp, MEMOS[i].title, MEMOS[i].title, "Bold", 17, 24, -0.3, C("text/primary"), tt.x, tt.y));
    const pv = at(part(child, "Preview"));
    parts.push(raw(cmp, MEMOS[i].preview, MEMOS[i].preview, "Regular", 14, 20, -0.1, C("text/secondary"), pv.x, pv.y));
    const dt = at(part(child, "Date"));
    parts.push(raw(cmp, MEMOS[i].date, MEMOS[i].date, "Medium", 13, 18, 0, C("text/muted"), dt.x, dt.y));
    figma.group(parts, cmp).name = `Group ${5 + i}`;
  });
  const nb = at(newBtn);
  const bParts = [rect(cmp, "Rectangle 21", nb.x, nb.y, nb.w, nb.h, C("color/primary"), 16)];
  const pb = at(part(newBtn, "Icon/Plus"));
  const pIcon = icon("Icon/Plus", 20, "#FFFFFF");
  cmp.appendChild(pIcon);
  const pFrame = pIcon.detachInstance();
  pFrame.name = "Vector";
  pFrame.x = pb.x;
  pFrame.y = pb.y;
  bParts.push(pFrame);
  const bl = at(part(newBtn, "Label"));
  bParts.push(raw(cmp, "새 메모 쓰기", "새 메모 쓰기", "Bold", 17, 24, -0.2, "#FFFFFF", bl.x, bl.y));
  figma.group(bParts, cmp).name = "Group 7";

  // ---------------------------------------------------------------- 컴포넌트 배치
  button.x = 1760;
  button.y = 0;
  iconButton.x = 1960;
  iconButton.y = 8;
  item.x = 1760;
  item.y = 96;
  fieldSet.x = 1744;
  fieldSet.y = 208;
  let ix = 1760;
  for (const comp of Object.values(IC)) {
    comp.x = ix;
    comp.y = 780;
    ix += 48;
  }

  return {
    variables: Object.keys(V).length,
    textStyles: Object.keys(T).length,
    frames: { home: home.id, detail: detail.id, write: write.id, bad: bad.id, compare: cmp.id },
    components: { button: button.id, iconButton: iconButton.id, item: item.id, field: fieldSet.id, icons: Object.fromEntries(Object.entries(IC).map(([k, c]) => [k, c.id])) },
  };
}

buildStarter()
  .then((r) => figma.closePlugin(`시작 시안 생성 완료: 변수 ${r.variables}개, 텍스트 스타일 ${r.textStyles}개`))
  .catch((e) => figma.closePlugin(`오류: ${e && e.message ? e.message : e}`));
