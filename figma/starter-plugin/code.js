// @ts-check
// 메모 앱 시작 시안 생성 플러그인 (큰 글자·둥근 카드)
// 현재 Figma 파일에 변수(라이트·다크), 텍스트 스타일, 아이콘·컴포넌트, 완성 예시 네 장(홈·전체 메모·상세·작성),
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
  "space/4": 4, "space/8": 8, "space/12": 12, "space/16": 16, "space/20": 20, "space/24": 24,
  "space/34": 34, "space/48": 48, "space/64": 64,
  "radius/sm": 12, "radius/md": 16, "radius/lg": 20, "radius/xl": 24, "radius/full": 999,
};

/** @type {Record<string, { style: string, size: number, line: number, ls: number }>} */
const TEXT = {
  "heading/xl": { style: "Bold", size: 28, line: 38, ls: -0.8 },
  "heading/lg": { style: "Bold", size: 26, line: 36, ls: -0.8 },
  "title/lg": { style: "Bold", size: 20, line: 28, ls: -0.4 },
  "title/md": { style: "Bold", size: 17, line: 24, ls: -0.3 },
  "label/md": { style: "Bold", size: 15, line: 22, ls: -0.2 },
  "body/md": { style: "Regular", size: 16, line: 28, ls: -0.2 },
  "body/sm": { style: "Regular", size: 14, line: 20, ls: -0.1 },
  "caption/md": { style: "Medium", size: 15, line: 22, ls: -0.2 },
  "caption/sm": { style: "Medium", size: 13, line: 18, ls: 0 },
  "button/md": { style: "Bold", size: 17, line: 24, ls: -0.2 },
};

/** 색 라벨: 변수 이름의 색 */
const LABELS = { Blue: "blue", Green: "green", Orange: "orange", Pink: "pink" };

const MEMO = {
  review: { title: "디자인 리뷰 회의록", preview: "검수 기준과 다음 할 일 정리", date: "오늘", label: "Blue" },
  hike: { title: "주말 등산 준비", preview: "물 두 병, 간식, 바람막이 챙기기", date: "어제", label: "Green" },
  shop: { title: "장보기 목록", preview: "우유, 계란, 사과, 커피 원두", date: "오늘", label: "Pink" },
  icon: { title: "앱 아이콘 아이디어", preview: "메모지 모서리가 접힌 모양", date: "오늘", label: "Orange" },
  book: { title: "읽을 책", preview: "디자인 시스템 책 두 권", date: "어제", label: "Green" },
  onboard: { title: "온보딩 화면 개선", preview: "첫 화면 문구는 짧게, 버튼은 하나만", date: "10월 28일", label: "Blue" },
  brand: { title: "브랜드 색 후보", preview: "파랑, 초록, 주황 세 가지 비교", date: "10월 27일", label: "Orange" },
};
const TODAY = "10월 30일 금요일";
const CATS = ["전체", "업무", "개인", "아이디어"];

/** 24px 선 아이콘 (선 굵기 2) */
const ICONS = {
  "Icon/Plus": '<path d="M12 5v14M5 12h14"/>',
  "Icon/ChevronLeft": '<path d="M15 18l-6-6 6-6"/>',
  "Icon/ChevronRight": '<path d="M9 6l6 6-6 6"/>',
  "Icon/ChevronDown": '<path d="M6 9l6 6 6-6"/>',
  "Icon/More": '<circle cx="5.5" cy="12" r="1.6" fill="#000" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="#000" stroke="none"/><circle cx="18.5" cy="12" r="1.6" fill="#000" stroke="none"/>',
  "Icon/Note": '<path d="M7 4h7l4 4v12H7z"/><path d="M14 4v4h4M10 12h5M10 16h5"/>',
  "Icon/Search": '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/>',
  "Icon/Pin": '<path d="M9 3.5h6l-.9 5.2L17 12H7l2.9-3.3z"/><path d="M12 12v8"/>',
  "Icon/Share": '<path d="M12 4v11M8 8l4-4 4 4M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"/>',
};

/** @param {string} h */
function rgb(h) {
  return { r: parseInt(h.slice(1, 3), 16) / 255, g: parseInt(h.slice(3, 5), 16) / 255, b: parseInt(h.slice(5, 7), 16) / 255 };
}

async function buildStarter() {
  for (const style of ["Regular", "Medium", "Bold"]) await figma.loadFontAsync({ family: FONT, style });
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
   * @param {{ top?: string, right?: string, bottom?: string, left?: string, x?: string, y?: string, gap?: string, radius?: string }} s
   */
  const bind = (node, s) => {
    const pad = { paddingTop: s.top || s.y, paddingBottom: s.bottom || s.y, paddingLeft: s.left || s.x, paddingRight: s.right || s.x, itemSpacing: s.gap };
    for (const [k, v] of Object.entries(pad)) if (v) node.setBoundVariable(/** @type {any} */ (k), V[v]);
    if (s.radius) for (const k of /** @type {const} */ (["topLeftRadius", "topRightRadius", "bottomLeftRadius", "bottomRightRadius"])) node.setBoundVariable(k, V[s.radius]);
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
  /** 문장 안 일부를 굵게(글자색은 진하게) @param {TextNode} n @param {string} part */
  const bold = (n, part) => {
    const i = n.characters.indexOf(part);
    n.setRangeFontName(i, i + part.length, { family: FONT, style: "Bold" });
    n.setRangeFills(i, i + part.length, [fill("text/primary")]);
  };
  // 줄바꿈되는 글은 HEIGHT로 바꾼 뒤 부모 폭을 채운다(기본값 WIDTH_AND_HEIGHT면 폭이 무너진다)
  /** @param {TextNode} n */
  const wrapFill = (n) => { n.textAutoResize = "HEIGHT"; n.layoutSizingHorizontal = "FILL"; };
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
  /** @param {FrameNode | ComponentNode} parent @param {SceneNode} child @param {boolean} [fillW] */
  const add = (parent, child, fillW) => { parent.appendChild(child); if (fillW) /** @type {any} */ (child).layoutSizingHorizontal = "FILL"; return child; };
  /** @param {string} name @param {number} w @param {number} h */
  const fixed = (name, w, h, dir = /** @type {"VERTICAL" | "HORIZONTAL"} */ ("HORIZONTAL")) => {
    const f = box(name, dir);
    f.primaryAxisSizingMode = "FIXED";
    f.counterAxisSizingMode = "FIXED";
    f.resize(w, h);
    f.primaryAxisAlignItems = "CENTER";
    f.counterAxisAlignItems = "CENTER";
    return f;
  };
  /** @param {string} name @param {"HORIZONTAL" | "VERTICAL"} dir */
  const comp = (name, dir, desc) => {
    const c = figma.createComponent();
    c.name = name;
    c.layoutMode = dir;
    c.primaryAxisSizingMode = "AUTO";
    c.counterAxisSizingMode = "AUTO";
    c.fills = [];
    c.clipsContent = false;
    if (desc) c.description = desc;
    return c;
  };

  // ---------------------------------------------------------------- 아이콘
  /** @type {Record<string, ComponentNode>} */
  const IC = {};
  for (const [name, body] of Object.entries(ICONS)) {
    const src = figma.createNodeFromSvg(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`);
    const c = figma.createComponent();
    c.name = name;
    c.resize(24, 24);
    c.fills = [];
    c.clipsContent = false;
    for (const child of [...src.children]) {
      c.appendChild(child);
      child.name = "Shape";
      if ("strokes" in child && child.strokes.length) child.strokes = [fill("text/primary")];
      if ("fills" in child && Array.isArray(child.fills) && child.fills.length) child.fills = [fill("text/primary")];
      if ("constraints" in child) child.constraints = { horizontal: "SCALE", vertical: "SCALE" };
    }
    src.remove();
    c.description = "선 아이콘(원본 24px). 쓰는 곳에 맞춰 크기를 줄이고, 색은 글자색 변수로 바꾼다.";
    page.appendChild(c);
    IC[name] = c;
  }
  /** 인스턴스를 만들어 크기·색을 맞춘다. color가 #로 시작하면 값 그대로 칠한다(비교용 시안). */
  /** @param {string} name @param {number} size @param {string} color */
  const icon = (name, size, color) => {
    const i = IC[name].createInstance();
    i.name = name;
    if (size !== 24) i.rescale(size / 24);
    paintIcon(i, color);
    return i;
  };
  /** @param {SceneNode} i @param {string} color */
  const paintIcon = (i, color) => {
    const paint = () => (color.startsWith("#") ? { type: /** @type {const} */ ("SOLID"), color: rgb(color) } : fill(color));
    for (const s of /** @type {any} */ (i).findAll((/** @type {SceneNode} */ n) => n.name === "Shape")) {
      if ("strokes" in s && s.strokes.length) s.strokes = [paint()];
      if ("fills" in s && Array.isArray(s.fills) && s.fills.length) s.fills = [paint()];
    }
  };
  /** @param {ComponentNode} c @param {string} name @param {"TEXT" | "BOOLEAN"} type @param {any} def @param {SceneNode} node @param {"characters" | "visible"} field */
  const prop = (c, name, type, def, node, field) => {
    const k = c.addComponentProperty(name, type, def);
    node.componentPropertyReferences = { ...(node.componentPropertyReferences || {}), [field]: k };
    return k;
  };

  // ---------------------------------------------------------------- 버튼
  const button = comp("Button/Primary", "HORIZONTAL", "화면의 주 버튼. 화면마다 하나만 두고 아래쪽에 가로로 꽉 차게 둔다. 내용이 길어 스크롤돼도 화면 아래에 붙어 있다. label로 문구를 바꾸고, icon을 켜면 앞에 + 아이콘이 붙는다.");
  button.counterAxisSizingMode = "FIXED";
  button.resize(160, 56);
  button.primaryAxisSizingMode = "AUTO"; // resize가 주축을 고정으로 바꾸므로 다시 글자에 맞춤
  button.primaryAxisAlignItems = "CENTER";
  button.counterAxisAlignItems = "CENTER";
  button.fills = [fill("color/primary")];
  bind(button, { x: "space/24", gap: "space/8", radius: "radius/md" });
  const plus = add(button, icon("Icon/Plus", 20, "text/on-primary"));
  const bLabel = add(button, await text("Label", "새 메모 쓰기", "button/md", "text/on-primary"));
  const labelKey = prop(button, "label", "TEXT", "새 메모 쓰기", bLabel, "characters");
  const iconKey = prop(button, "icon", "BOOLEAN", false, plus, "visible");

  const secondary = comp("Button/Secondary", "HORIZONTAL", "보조 버튼. 목록 끝의 더 보기처럼 주 버튼보다 약한 동작에 쓴다. 더 보기는 메모를 20개씩 더 불러온다.");
  secondary.counterAxisSizingMode = "FIXED";
  secondary.resize(160, 52);
  secondary.primaryAxisSizingMode = "AUTO";
  secondary.primaryAxisAlignItems = "CENTER";
  secondary.counterAxisAlignItems = "CENTER";
  secondary.fills = [fill("surface/card")];
  bind(secondary, { x: "space/24", radius: "radius/md" });
  const sLabel = add(secondary, await text("Label", "메모 20개 더 보기", "label/md", "color/primary"));
  const sLabelKey = prop(secondary, "label", "TEXT", "메모 20개 더 보기", sLabel, "characters");

  const iconButton = comp("Button/Icon", "HORIZONTAL", "아이콘 버튼. 40×40 누르는 영역 가운데에 아이콘을 둔다. icon 속성으로 아이콘을 바꾼다. 뒤로가기는 이전 화면으로, 더보기는 수정·고정·삭제 메뉴를 연다.");
  iconButton.primaryAxisSizingMode = "FIXED";
  iconButton.counterAxisSizingMode = "FIXED";
  iconButton.resize(40, 40);
  iconButton.primaryAxisAlignItems = "CENTER";
  iconButton.counterAxisAlignItems = "CENTER";
  bind(iconButton, { radius: "radius/sm" });
  const ibIcon = add(iconButton, icon("Icon/ChevronLeft", 24, "text/primary"));
  const swapKey = iconButton.addComponentProperty("icon", "INSTANCE_SWAP", IC["Icon/ChevronLeft"].id);
  ibIcon.componentPropertyReferences = { mainComponent: swapKey };

  const textButton = comp("Button/Text", "HORIZONTAL", "글자 버튼. 전체 보기처럼 다른 화면으로 가거나, 정렬처럼 고르는 메뉴를 연다.");
  textButton.counterAxisAlignItems = "CENTER";
  bind(textButton, { gap: "space/4" });
  const tLabel = add(textButton, await text("Label", "전체 보기", "caption/md", "text/muted"));
  const tbIcon = add(textButton, icon("Icon/ChevronRight", 16, "text/muted"));
  const tLabelKey = prop(textButton, "label", "TEXT", "전체 보기", tLabel, "characters");
  const tSwapKey = textButton.addComponentProperty("icon", "INSTANCE_SWAP", IC["Icon/ChevronRight"].id);
  tbIcon.componentPropertyReferences = { mainComponent: tSwapKey };

  // ---------------------------------------------------------------- 칩·배지·색 점 (variant)
  /** @param {string} name @param {string[]} values @param {(v: string) => Promise<ComponentNode>} make @param {string} desc */
  const set = async (name, values, make, desc) => {
    const cs = figma.combineAsVariants(await Promise.all(values.map(make)), page);
    cs.name = name;
    cs.description = desc;
    cs.layoutMode = "HORIZONTAL";
    cs.primaryAxisSizingMode = "AUTO";
    cs.counterAxisSizingMode = "AUTO";
    cs.itemSpacing = 12;
    cs.paddingTop = cs.paddingBottom = cs.paddingLeft = cs.paddingRight = 12;
    cs.fills = [];
    return cs;
  };
  /** @param {ComponentSetNode} cs @param {string} name @param {string} def @param {string} layer */
  const setText = (cs, name, def, layer) => {
    const k = cs.addComponentProperty(name, "TEXT", def);
    for (const v of cs.children) /** @type {TextNode} */ (/** @type {ComponentNode} */ (v).findOne((n) => n.name === layer)).componentPropertyReferences = { characters: k };
    return k;
  };
  /** @param {ComponentSetNode} cs @param {string} variantName */
  const variantOf = (cs, variantName) => /** @type {ComponentNode} */ (cs.children.find((n) => n.name === variantName));

  const chipSet = await set("Chip", ["Default", "Selected"], async (st) => {
    const c = comp(`State=${st}`, "HORIZONTAL", "");
    c.counterAxisSizingMode = "FIXED";
    c.resize(64, 36);
    c.primaryAxisSizingMode = "AUTO";
    c.counterAxisAlignItems = "CENTER";
    c.fills = [fill(st === "Selected" ? "color/primary" : "surface/card")];
    bind(c, { x: "space/16", radius: "radius/full" });
    add(c, await text("Label", "업무", "label/md", st === "Selected" ? "text/on-primary" : "text/secondary"));
    return c;
  }, "분류 칩. 누르면 그 분류의 메모만 보인다. 고른 칩은 State=Selected.");
  const chipKey = setText(chipSet, "label", "업무", "Label");

  const badgeSet = await set("Badge", Object.keys(LABELS), async (lb) => {
    const c = comp(`Label=${lb}`, "HORIZONTAL", "");
    c.counterAxisSizingMode = "FIXED";
    c.resize(40, 26);
    c.primaryAxisSizingMode = "AUTO";
    c.counterAxisAlignItems = "CENTER";
    c.fills = [fill(`label/${LABELS[lb]}-soft`)];
    bind(c, { x: "space/8", radius: "radius/full" });
    add(c, await text("Label", "업무", "caption/sm", `label/${LABELS[lb]}`));
    return c;
  }, "메모의 분류 배지. 색은 메모의 색 라벨을 따른다.");
  const badgeKey = setText(badgeSet, "label", "업무", "Label");

  const dotSet = await set("Label/Dot", Object.keys(LABELS), async (lb) => {
    const c = comp(`Label=${lb}`, "HORIZONTAL", "");
    c.primaryAxisSizingMode = "FIXED";
    c.counterAxisSizingMode = "FIXED";
    c.resize(32, 32);
    c.primaryAxisAlignItems = "CENTER";
    c.counterAxisAlignItems = "CENTER";
    c.strokes = [fill("color/primary")];
    c.strokeWeight = 0;
    bind(c, { radius: "radius/full" });
    const dot = fixed("Dot", 22, 22);
    dot.fills = [fill(`label/${LABELS[lb]}`)];
    bind(dot, { radius: "radius/full" });
    add(c, dot);
    return c;
  }, "색 라벨 고르기. 고른 색은 바깥에 파란 테두리(2px)가 생기고, 메모 목록의 아이콘 칸 색이 이 색을 따른다.");

  const formatSet = await set("Button/Format", ["Default", "Active"], async (st) => {
    const c = comp(`State=${st}`, "HORIZONTAL", "");
    c.counterAxisSizingMode = "FIXED";
    c.resize(44, 36);
    c.primaryAxisSizingMode = "AUTO";
    c.primaryAxisAlignItems = "CENTER";
    c.counterAxisAlignItems = "CENTER";
    c.fills = st === "Active" ? [fill("label/blue-soft")] : [];
    bind(c, { x: "space/12", radius: "radius/sm" });
    add(c, await text("Label", "제목", "label/md", st === "Active" ? "color/primary" : "text/secondary"));
    return c;
  }, "서식 버튼. 글자를 고르고 누르면 굵게·제목·소제목·목록이 된다. 커서가 있는 글자의 서식은 State=Active로 보인다.");
  const formatKey = setText(formatSet, "label", "제목", "Label");

  // ---------------------------------------------------------------- 메모 줄 (색 라벨 variant)
  const itemSet = await set("Memo/Item", Object.keys(LABELS), async (lb) => {
    const c = comp(`Label=${lb}`, "HORIZONTAL", "");
    c.primaryAxisSizingMode = "FIXED";
    c.resize(358, 72);
    c.counterAxisAlignItems = "CENTER";
    bind(c, { y: "space/12", x: "space/20", gap: "space/16" });
    const tile = fixed("Tile", 44, 44);
    tile.fills = [fill(`label/${LABELS[lb]}-soft`)];
    bind(tile, { radius: "radius/sm" });
    tile.appendChild(icon("Icon/Note", 22, `label/${LABELS[lb]}`));
    add(c, tile);
    const content = add(c, box("Content", "VERTICAL"), true);
    bind(/** @type {FrameNode} */ (content), { gap: "space/4" });
    const t = add(/** @type {FrameNode} */ (content), await text("Title", "장보기 목록", "title/md", "text/primary"));
    const p = add(/** @type {FrameNode} */ (content), await text("Preview", "우유, 계란, 사과, 커피 원두", "body/sm", "text/secondary"));
    wrapFill(/** @type {TextNode} */ (t));
    wrapFill(/** @type {TextNode} */ (p));
    /** @type {TextNode} */ (p).textTruncation = "ENDING";
    /** @type {TextNode} */ (p).maxLines = 1;
    add(c, await text("Date", "오늘", "caption/sm", "text/muted"));
    return c;
  }, "메모 목록의 한 줄. 미리보기는 1줄까지 보이고 넘치면 말줄임. 왼쪽 칸 색은 메모의 색 라벨이다. 누르면 메모 상세로 이동한다.");
  const titleKey = setText(itemSet, "title", "장보기 목록", "Title");
  const previewKey = setText(itemSet, "preview", "우유, 계란, 사과, 커피 원두", "Preview");
  const dateKey = setText(itemSet, "date", "오늘", "Date");

  // ---------------------------------------------------------------- 카드 머리글, 날짜 묶음 머리글, 검색, 제목 칸, 서식 막대, 목록 줄
  const cardHeader = comp("Card/Header", "HORIZONTAL", "카드 머리글. pin을 켜면 고정한 메모 표시가 붙고, action을 켜면 오른쪽에 전체 보기가 붙는다.");
  cardHeader.primaryAxisSizingMode = "FIXED";
  cardHeader.resize(358, 40);
  cardHeader.counterAxisAlignItems = "CENTER";
  bind(cardHeader, { top: "space/12", bottom: "space/4", left: "space/20", right: "space/16", gap: "space/4" });
  const chPin = add(cardHeader, icon("Icon/Pin", 16, "color/primary"));
  const chTitle = add(cardHeader, await text("Title", "고정한 메모", "label/md", "text/primary"));
  wrapFill(/** @type {TextNode} */ (chTitle));
  const chAction = add(cardHeader, textButton.createInstance());
  chAction.name = "Action";
  const chTitleKey = prop(cardHeader, "title", "TEXT", "고정한 메모", chTitle, "characters");
  const chPinKey = prop(cardHeader, "pin", "BOOLEAN", true, chPin, "visible");
  const chActionKey = prop(cardHeader, "action", "BOOLEAN", false, chAction, "visible");

  const sectionLabel = comp("Section/Label", "HORIZONTAL", "날짜 묶음 머리글. 목록을 스크롤해도 화면 위쪽에 붙어 있다.");
  sectionLabel.primaryAxisSizingMode = "FIXED";
  sectionLabel.resize(358, 22);
  bind(sectionLabel, { x: "space/8" });
  const slLabel = add(sectionLabel, await text("Label", "오늘", "caption/md", "text/muted"));
  const slKey = prop(sectionLabel, "label", "TEXT", "오늘", slLabel, "characters");

  const search = comp("Input/Search", "HORIZONTAL", "검색 칸. 입력하는 즉시 제목과 본문에서 찾아 목록을 거른다. 결과가 없으면 '찾는 메모가 없어요'를 보인다.");
  search.primaryAxisSizingMode = "FIXED";
  search.counterAxisSizingMode = "FIXED";
  search.resize(358, 48);
  search.counterAxisAlignItems = "CENTER";
  search.fills = [fill("surface/card")];
  bind(search, { x: "space/16", gap: "space/8", radius: "radius/md" });
  add(search, icon("Icon/Search", 20, "text/muted"));
  const sPh = add(search, await text("Placeholder", "제목이나 내용으로 찾기", "body/md", "text/muted"));
  prop(search, "placeholder", "TEXT", "제목이나 내용으로 찾기", sPh, "characters");

  const fieldSet = await set("Input/Field", ["Default", "Focused"], async (st) => {
    const c = comp(`State=${st}`, "VERTICAL", "");
    c.counterAxisSizingMode = "FIXED";
    c.resize(358, 80);
    c.primaryAxisSizingMode = "AUTO";
    c.fills = [fill("surface/card")];
    bind(c, { y: "space/16", x: "space/20", gap: "space/4", radius: "radius/lg" });
    if (st === "Focused") { c.strokes = [fill("color/primary")]; c.strokeWeight = 2; c.strokeAlign = "INSIDE"; }
    wrapFill(/** @type {TextNode} */ (add(c, await text("Label", "제목", "caption/sm", "text/muted"))));
    wrapFill(/** @type {TextNode} */ (add(c, await text("Value", "주말 등산 준비", "title/md", "text/primary"))));
    return c;
  }, "제목 입력 칸. 입력 중에는 State=Focused처럼 파란 테두리를 보인다. 비어 있으면 회색 안내 문구를 보인다.");
  const fieldLabelKey = setText(fieldSet, "label", "제목", "Label");
  const fieldValueKey = setText(fieldSet, "value", "주말 등산 준비", "Value");
  fieldSet.layoutMode = "VERTICAL";

  const toolbar = comp("Editor/Toolbar", "HORIZONTAL", "본문 서식 막대. 굵게(B), 제목(대제목), 소제목, 목록. 저장하면 서식도 함께 저장되고 상세 화면에 그대로 보인다.");
  toolbar.primaryAxisSizingMode = "FIXED";
  toolbar.resize(358, 52);
  toolbar.counterAxisAlignItems = "CENTER";
  bind(toolbar, { x: "space/12", gap: "space/4" });
  for (const [lbl, st] of [["B", "Active"], ["제목", "Default"], ["소제목", "Default"], ["목록", "Default"]]) {
    const b = variantOf(formatSet, `State=${st}`).createInstance();
    b.name = `Format/${lbl === "B" ? "Bold" : lbl === "제목" ? "Heading" : lbl === "소제목" ? "Subheading" : "List"}`;
    b.setProperties({ [formatKey]: lbl });
    add(toolbar, b);
  }

  const listItem = comp("Memo/ListItem", "HORIZONTAL", "본문의 목록 한 줄. 앞에 점이 붙고 글이 길면 다음 줄로 이어진다.");
  listItem.primaryAxisSizingMode = "FIXED";
  listItem.resize(318, 28);
  bind(listItem, { gap: "space/8" });
  add(listItem, await text("Bullet", "•", "body/md", "text/secondary"));
  const liText = add(listItem, await text("Text", "묶음은 오토레이아웃으로", "body/md", "text/secondary"));
  wrapFill(/** @type {TextNode} */ (liText));
  const liKey = prop(listItem, "text", "TEXT", "묶음은 오토레이아웃으로", liText, "characters");

  // ---------------------------------------------------------------- 화면 공통
  /** @param {string} name @param {number} x @param {string} top @param {boolean} hug */
  const screen = (name, x, top, hug = false) => {
    const f = figma.createFrame();
    f.name = name;
    f.resize(390, 844);
    f.x = x;
    f.y = 0;
    f.layoutMode = "VERTICAL";
    f.primaryAxisSizingMode = hug ? "AUTO" : "FIXED";
    f.counterAxisSizingMode = "FIXED";
    if (hug) f.minHeight = 844;
    f.fills = [fill("surface/page")];
    bind(f, { top, bottom: "space/34", x: "space/16", gap: "space/16" });
    page.appendChild(f);
    return f;
  };
  /** @param {FrameNode} parent @param {string | null} gap */
  const main = (parent, gap) => {
    const m = box("Main", "VERTICAL");
    if (gap) bind(m, { gap });
    add(parent, m, true);
    if (parent.primaryAxisSizingMode === "FIXED") m.layoutSizingVertical = "FILL";
    return m;
  };
  /** @param {FrameNode} parent */
  const card = (parent, name) => {
    const c = box(name, "VERTICAL");
    c.fills = [fill("surface/card")];
    bind(c, { y: "space/8", radius: "radius/xl" });
    add(parent, c, true);
    return c;
  };
  /** @type {Map<string, string>} 메모 줄 인스턴스 → 색 라벨 */
  const labelOf = new Map();
  /** @param {FrameNode} parent @param {keyof typeof MEMO} key @param {string} name */
  const memoItem = (parent, key, name) => {
    const m = MEMO[key];
    const inst = variantOf(itemSet, `Label=${m.label}`).createInstance();
    labelOf.set(inst.id, m.label);
    inst.name = name;
    inst.setProperties({ [titleKey]: m.title, [previewKey]: m.preview, [dateKey]: m.date });
    add(parent, inst, true);
    return inst;
  };
  /** @param {FrameNode} parent @param {string} title @param {boolean} pin @param {boolean} action */
  const header = (parent, title, pin, action) => {
    const h = cardHeader.createInstance();
    h.name = "Header";
    h.setProperties({ [chTitleKey]: title, [chPinKey]: pin, [chActionKey]: action });
    add(parent, h, true);
    return h;
  };
  /** @param {FrameNode} parent @param {string} selected */
  const chips = (parent, selected) => {
    const row = box("Filter", "HORIZONTAL");
    bind(row, { gap: "space/8", x: "space/4" });
    for (const c of CATS) {
      const inst = variantOf(chipSet, `State=${c === selected ? "Selected" : "Default"}`).createInstance();
      inst.name = `Chip/${c}`;
      inst.setProperties({ [chipKey]: c });
      add(row, inst);
    }
    add(parent, row, true);
    return row;
  };
  /** @param {string} iconName */
  const iconBtn = (name, iconName) => {
    const b = iconButton.createInstance();
    b.name = name;
    if (iconName !== "Icon/ChevronLeft") {
      b.setProperties({ [swapKey]: IC[iconName].id });
      b.children[0].name = iconName;
    }
    return b;
  };
  /** @param {FrameNode} parent */
  const navBar = (parent) => {
    const nav = box("NavBar", "HORIZONTAL");
    nav.counterAxisAlignItems = "CENTER";
    add(parent, nav, true);
    add(nav, iconBtn("Back", "Icon/ChevronLeft"));
    return nav;
  };
  /** @param {FrameNode} parent @param {string} label @param {string} name */
  const primary = (parent, label, name, withIcon = false) => {
    const b = button.createInstance();
    b.name = name;
    b.setProperties({ [labelKey]: label, [iconKey]: withIcon });
    add(parent, b, true);
    return b;
  };

  // ---------------------------------------------------------------- 홈
  const home = screen("완성 예시/Home", 0, "space/64");
  const hMain = main(home, "space/16");
  const hHead = box("Header", "VERTICAL");
  bind(hHead, { gap: "space/8", x: "space/8" });
  add(hMain, hHead, true);
  const hDate = await text("Date", TODAY, "caption/md", "text/muted");
  const hTitle = await text("Title", "오늘까지 메모를\n128개 남겼어요", "heading/xl", "text/primary");
  for (const n of [hDate, hTitle]) { add(hHead, n); wrapFill(n); }
  const count = hTitle.characters.indexOf("128개");
  hTitle.setRangeFills(count, count + 4, [fill("color/primary")]);
  const hChips = chips(hMain, "전체");
  const pinned = card(hMain, "Content/Pinned");
  header(pinned, "고정한 메모", true, false);
  memoItem(pinned, "review", "MemoItem/1");
  memoItem(pinned, "hike", "MemoItem/2");
  const recent = card(hMain, "Content/Recent");
  header(recent, "최근 메모", false, true);
  memoItem(recent, "shop", "MemoItem/3");
  memoItem(recent, "icon", "MemoItem/4");
  memoItem(recent, "book", "MemoItem/5");
  const newBtn = primary(home, "새 메모 쓰기", "Button/NewMemo", true);

  // ---------------------------------------------------------------- 전체 메모 (메모가 많을 때)
  const all = screen("완성 예시/All", 440, "space/48", true);
  const aNav = navBar(all);
  const aTitle = box("Title", "HORIZONTAL");
  aTitle.counterAxisAlignItems = "BASELINE";
  bind(aTitle, { gap: "space/8", x: "space/4" });
  add(aNav, aTitle, true);
  add(aTitle, await text("Title", "전체 메모", "title/lg", "text/primary"));
  add(aTitle, await text("Count", "128", "caption/md", "text/muted"));
  const sort = textButton.createInstance();
  sort.name = "Sort";
  sort.setProperties({ [tLabelKey]: "최신순", [tSwapKey]: IC["Icon/ChevronDown"].id });
  sort.children[1].name = "Icon/ChevronDown";
  add(aNav, sort);
  const aSearch = search.createInstance();
  aSearch.name = "Search";
  add(all, aSearch, true);
  chips(all, "전체");
  const aList = box("Content/MemoList", "VERTICAL");
  bind(aList, { gap: "space/20" });
  add(all, aList, true);
  for (const [label, keys] of /** @type {const} */ ([["오늘", ["review", "shop", "icon"]], ["어제", ["hike", "book"]], ["이번 주", ["onboard", "brand"]]])) {
    const sec = box(`Section/${label}`, "VERTICAL");
    bind(sec, { gap: "space/8" });
    add(aList, sec, true);
    const sl = sectionLabel.createInstance();
    sl.name = "Label";
    sl.setProperties({ [slKey]: label });
    add(sec, sl, true);
    const c = card(sec, "Card");
    keys.forEach((k, i) => memoItem(c, k, `MemoItem/${i + 1}`));
  }
  const more = secondary.createInstance();
  more.name = "Button/More";
  add(all, more, true);

  // ---------------------------------------------------------------- 상세 (서식이 들어간 긴 메모)
  const detail = screen("완성 예시/Detail", 880, "space/48", true);
  const dNav = navBar(detail);
  dNav.primaryAxisAlignItems = "SPACE_BETWEEN";
  const dActions = box("Actions", "HORIZONTAL");
  add(dNav, dActions);
  const pinBtn = add(dActions, iconBtn("Pin", "Icon/Pin"));
  paintIcon(pinBtn, "color/primary");
  add(dActions, iconBtn("Share", "Icon/Share"));
  add(dActions, iconBtn("More", "Icon/More"));
  const dMain = main(detail, null);
  const read = box("Content/Memo", "VERTICAL");
  read.fills = [fill("surface/card")];
  bind(read, { y: "space/24", x: "space/20", gap: "space/12", radius: "radius/xl" });
  add(dMain, read, true);
  const meta = box("Meta", "HORIZONTAL");
  meta.counterAxisAlignItems = "CENTER";
  bind(meta, { gap: "space/8" });
  add(read, meta, true);
  const badge = variantOf(badgeSet, "Label=Blue").createInstance();
  badge.name = "Badge";
  badge.setProperties({ [badgeKey]: "업무" });
  add(meta, badge);
  add(meta, await text("Date", "10월 30일 오전 9:12", "caption/sm", "text/muted"));
  wrapFill(/** @type {TextNode} */ (add(read, await text("Title", "디자인 리뷰 회의록", "heading/lg", "text/primary"))));
  const divider = figma.createRectangle();
  divider.name = "Divider";
  divider.resize(318, 1);
  divider.fills = [fill("border/default")];
  add(read, divider, true);
  const body = box("Body", "VERTICAL");
  bind(body, { gap: "space/12" });
  add(read, body, true);
  /** 본문 블록: [종류, 글, 굵게 할 부분] */
  /** @param {FrameNode} into @param {Array<[string, string | string[], string?]>} blocks */
  const richBody = async (into, blocks) => {
    for (const [kind, content, strong] of blocks) {
      if (kind === "h1" || kind === "h2") {
        wrapFill(/** @type {TextNode} */ (add(into, await text(kind === "h1" ? "Heading" : "Subheading", /** @type {string} */ (content), kind === "h1" ? "title/lg" : "title/md", "text/primary"))));
      } else if (kind === "p") {
        const p = /** @type {TextNode} */ (add(into, await text("Paragraph", /** @type {string} */ (content), "body/md", "text/secondary")));
        wrapFill(p);
        if (strong) bold(p, strong);
      } else {
        const list = box("List", "VERTICAL");
        bind(list, { gap: "space/4" });
        add(into, list, true);
        for (const t of /** @type {string[]} */ (content)) {
          const li = listItem.createInstance();
          li.name = "ListItem";
          li.setProperties({ [liKey]: t });
          add(list, li, true);
        }
      }
    }
  };
  await richBody(body, [
    ["h1", "회의 요약"],
    ["p", "시안 검수 기준을 팀 규칙으로 정리했다. 목표는 AI가 구현해도 깨지지 않는 시안이다.", "AI가 구현해도 깨지지 않는 시안"],
    ["h2", "결정한 것"],
    ["list", ["묶음은 오토레이아웃, 늘어날 것은 Fill", "색과 간격은 변수로 연결", "시안은 프레임 링크로 넘기기"]],
    ["h2", "다음 할 일"],
    ["p", "금요일까지 각자 맡은 화면을 채점해 온다. 점수보다 깎인 이유를 먼저 본다.", "금요일까지"],
    ["h2", "남은 질문"],
    ["p", "다크 모드 색은 누가 정할지, 아이콘은 직접 그릴지 다음 회의에서 정한다."],
  ]);
  add(read, await text("Footer", "212자 · 오늘 오전 9:12 수정", "caption/sm", "text/muted"));
  primary(detail, "수정하기", "Button/Edit");

  // ---------------------------------------------------------------- 작성 (서식 편집기)
  const write = screen("완성 예시/Write", 1320, "space/48");
  const wNav = navBar(write);
  wNav.primaryAxisAlignItems = "SPACE_BETWEEN";
  add(wNav, await text("Saved", "자동 저장됨", "caption/sm", "text/muted"));
  const wMain = main(write, "space/12");
  const tf = variantOf(fieldSet, "State=Default").createInstance();
  tf.name = "Field/Title";
  tf.setProperties({ [fieldValueKey]: "주말 등산 준비" });
  add(wMain, tf, true);
  const opts = box("Options", "VERTICAL");
  bind(opts, { y: "space/4", x: "space/8", gap: "space/12" });
  add(wMain, opts, true);
  const catRow = box("Category", "HORIZONTAL");
  catRow.counterAxisAlignItems = "CENTER";
  bind(catRow, { gap: "space/8" });
  add(opts, catRow, true);
  add(catRow, await text("Label", "분류", "caption/sm", "text/muted"));
  for (const c of CATS.slice(1)) {
    const inst = variantOf(chipSet, `State=${c === "개인" ? "Selected" : "Default"}`).createInstance();
    inst.name = `Chip/${c}`;
    inst.setProperties({ [chipKey]: c });
    add(catRow, inst);
  }
  const colorRow = box("Color", "HORIZONTAL");
  colorRow.counterAxisAlignItems = "CENTER";
  bind(colorRow, { gap: "space/8" });
  add(opts, colorRow, true);
  add(colorRow, await text("Label", "색", "caption/sm", "text/muted"));
  for (const lb of Object.keys(LABELS)) {
    const d = variantOf(dotSet, `Label=${lb}`).createInstance();
    d.name = `Dot/${lb}`;
    if (lb === "Green") d.strokeWeight = 2;
    add(colorRow, d);
  }
  const editor = box("Editor", "VERTICAL");
  editor.fills = [fill("surface/card")];
  editor.strokes = [fill("color/primary")];
  editor.strokeWeight = 2;
  editor.strokeAlign = "INSIDE";
  bind(editor, { radius: "radius/lg" });
  editor.clipsContent = true;
  add(wMain, editor, true);
  const tb = toolbar.createInstance();
  tb.name = "Toolbar";
  add(editor, tb, true);
  const tbLine = figma.createRectangle();
  tbLine.name = "Divider";
  tbLine.resize(358, 1);
  tbLine.fills = [fill("border/default")];
  add(editor, tbLine, true);
  const eBody = box("Body", "VERTICAL");
  bind(eBody, { y: "space/16", x: "space/20", gap: "space/8" });
  add(editor, eBody, true);
  await richBody(eBody, [
    ["h1", "준비물"],
    ["list", ["물 두 병", "간식과 바람막이", "보조 배터리"]],
    ["h2", "출발"],
    ["p", "토요일 오전 7시에 집 앞에서 출발한다.", "토요일 오전 7시"],
  ]);
  primary(write, "저장하기", "Button/Save");

  // ---------------------------------------------------------------- 규칙 위반 연습 프레임
  // 일부러 규칙을 어긴다: 오토레이아웃 없음, 간격용 빈 상자, 카드 위에 올려 둔 글자, 값으로 넣은 색,
  // 줄 높이 Auto, 따로 그린 버튼, 자동 이름.
  const bad = figma.createFrame();
  bad.name = "연습/규칙 위반";
  bad.resize(390, 844);
  bad.x = 1760;
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
  const cmpX = 2200;
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
    const b = n.absoluteBoundingBox, h0 = home.absoluteBoundingBox;
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
  let rectNo = 3, groupNo = 4, frameNo = 30;
  /** 완성 예시의 글자를 같은 자리에 값으로 다시 쓴다 @param {TextNode} n @param {string} styleKey @param {string} hex */
  const copyText = (n, styleKey, hex) => {
    const p = at(n), t = TEXT[styleKey];
    return raw(cmp, n.characters, n.characters, t.style, t.size, t.line, t.ls, hex, p.x, p.y);
  };
  /** 아이콘 인스턴스를 떼어 낸 도형으로 같은 자리에 둔다 @param {SceneNode} src @param {string} iconName @param {number} size @param {string} hex */
  const copyIcon = (src, iconName, size, hex) => {
    const p = at(src), i = icon(iconName, size, hex);
    cmp.appendChild(i);
    const f = i.detachInstance();
    f.name = `Frame ${frameNo++}`;
    f.x = p.x;
    f.y = p.y;
    return f;
  };
  /** @param {SceneNode} src @param {string | null} hex @param {number} r */
  const copyRect = (src, hex, r) => {
    const p = at(src);
    return rect(cmp, `Rectangle ${rectNo++}`, p.x, p.y, p.w, p.h, hex, r);
  };
  copyText(hDate, "caption/md", C("text/muted"));
  const bigTitle = copyText(hTitle, "heading/xl", C("text/primary"));
  bigTitle.setRangeFills(count, count + 4, [{ type: "SOLID", color: rgb(C("color/primary")) }]);
  const hb = at(hHead), cb = at(hChips);
  rect(cmp, `Rectangle ${rectNo++}`, cb.x, hb.y + hb.h, cb.w, cb.y - (hb.y + hb.h), null, 0);
  for (const ch of hChips.children) {
    const selected = ch.name === "Chip/전체";
    const parts = [copyRect(ch, C(selected ? "color/primary" : "surface/card"), 999), copyText(/** @type {TextNode} */ (part(ch, "Label")), "label/md", C(selected ? "text/on-primary" : "text/secondary"))];
    figma.group(parts, cmp).name = `Group ${groupNo++}`;
  }
  for (const c of [pinned, recent]) {
    copyRect(c, C("surface/card"), 24);
    const h = /** @type {InstanceNode} */ (c.children[0]);
    const hp = [copyText(/** @type {TextNode} */ (part(h, "Title")), "label/md", C("text/primary"))];
    const pinIcon = h.findOne((n) => n.name === "Icon/Pin"); // 숨긴 레이어는 인스턴스 찾기에 안 나온다
    if (pinIcon && pinIcon.visible) hp.push(copyIcon(pinIcon, "Icon/Pin", 16, C("color/primary")));
    const act = /** @type {InstanceNode | null} */ (h.findOne((n) => n.name === "Action"));
    if (act && act.visible) hp.push(copyText(/** @type {TextNode} */ (part(act, "Label")), "caption/md", C("text/muted")), copyIcon(part(act, "Icon/ChevronRight"), "Icon/ChevronRight", 16, C("text/muted")));
    figma.group(hp, cmp).name = `Group ${groupNo++}`;
    for (const it of c.children.slice(1)) {
      const lb = LABELS[/** @type {keyof typeof LABELS} */ (labelOf.get(it.id))];
      const parts = [
        copyRect(part(it, "Tile"), C(`label/${lb}-soft`), 12),
        copyIcon(part(it, "Icon/Note"), "Icon/Note", 22, C(`label/${lb}`)),
        copyText(/** @type {TextNode} */ (part(it, "Title")), "title/md", C("text/primary")),
        copyText(/** @type {TextNode} */ (part(it, "Preview")), "body/sm", C("text/secondary")),
        copyText(/** @type {TextNode} */ (part(it, "Date")), "caption/sm", C("text/muted")),
      ];
      figma.group(parts, cmp).name = `Group ${groupNo++}`;
    }
  }
  const bParts = [copyRect(newBtn, C("color/primary"), 16), copyIcon(part(newBtn, "Icon/Plus"), "Icon/Plus", 20, "#FFFFFF"), copyText(/** @type {TextNode} */ (part(newBtn, "Label")), "button/md", "#FFFFFF")];
  bParts[1].name = "Vector";
  figma.group(bParts, cmp).name = `Group ${groupNo++}`;

  // ---------------------------------------------------------------- 컴포넌트 배치 (오른쪽 열)
  const colX = 2680;
  let y = 0;
  for (const n of /** @type {SceneNode[]} */ ([button, secondary, textButton, iconButton, chipSet, badgeSet, dotSet, formatSet, toolbar, search, fieldSet, cardHeader, sectionLabel, listItem, itemSet])) {
    n.x = colX;
    n.y = y;
    y += n.height + 32;
  }
  let ix = colX;
  for (const c of Object.values(IC)) { c.x = ix; c.y = y; ix += 40; }

  return {
    variables: Object.keys(V).length,
    textStyles: Object.keys(T).length,
    frames: { home: home.id, all: all.id, detail: detail.id, write: write.id, bad: bad.id, compare: cmp.id },
    components: { button: button.id, itemSet: itemSet.id },
  };
}

buildStarter()
  .then((r) => figma.closePlugin(`시작 시안 생성 완료: 변수 ${r.variables}개, 텍스트 스타일 ${r.textStyles}개`))
  .catch((e) => figma.closePlugin(`오류: ${e && e.message ? e.message : e}`));
