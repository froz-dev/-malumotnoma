const initialData = {
  fullName: "",
  fromDate: "",
  university: "",
  faculty: "",
  major: "",
  group: "",
  birthDate: "",
  nationality: "",
  birthPlace: "",
  educationLevel: "",
  graduatedInstitution: "",
  specialty: "",
  maritalStatus: "",
  party: "",
  languages: "",
  admissionScore: "",
  studyType: "",
  freeTime: "",
  interests: "",
  tutor: "",
  mainAddress: "",
  homeGeo: "",
  phone: "",
  passport: "",
  jshir: "",
  email: "",
  workHistory: [
    { period: "", place: "" },
    { period: "", place: "" },
    { period: "", place: "" },
    { period: "", place: "" }
  ],
  relatives: [
    { relation: "Otasi", name: "", birth: "", work: "", address: "", phone: "" },
    { relation: "Onasi", name: "", birth: "", work: "", address: "", phone: "" },
    { relation: "Ukasi", name: "", birth: "", work: "", address: "", phone: "" }
  ],
  tempResidence: "",
  tempAddress: "",
  rentalGeo: "",
  roommate1: "",
  roommate2: "",
  extra1: "",
  extra2: ""
};

const data = structuredClone(initialData);
const form = document.getElementById("studentForm");
const preview = document.getElementById("documentPreview");
const toast = document.getElementById("toast");

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);
}

function visible(value) {
  return value ? escapeHtml(value) : '<span class="empty-value">kiritilmagan</span>';
}

function getPath(object, path) {
  return path.split(".").reduce((value, key) => value?.[key], object);
}

function setPath(object, path, value) {
  const keys = path.split(".");
  const last = keys.pop();
  const target = keys.reduce((current, key) => current[key], object);
  target[last] = value;
}

function renderRepeatFields() {
  document.getElementById("workFields").innerHTML = data.workHistory.map((item, index) => `
    <section class="repeat-card">
      <h3>${index + 1}-faoliyat</h3>
      <div class="fields two-column">
        <label>Davri<input data-path="workHistory.${index}.period" value="${escapeHtml(item.period)}"></label>
        <label>O‘qish yoki ish joyi<textarea data-path="workHistory.${index}.place" rows="2">${escapeHtml(item.place)}</textarea></label>
      </div>
    </section>`).join("");

  document.getElementById("relativeFields").innerHTML = data.relatives.map((item, index) => `
    <section class="repeat-card">
      <h3>${index + 1}-qarindosh</h3>
      <div class="fields two-column">
        <label>Qarindoshligi<input data-path="relatives.${index}.relation" value="${escapeHtml(item.relation)}"></label>
        <label>F.I.Sh.<input data-path="relatives.${index}.name" value="${escapeHtml(item.name)}"></label>
        <label>Tug‘ilgan yili va joyi<textarea data-path="relatives.${index}.birth" rows="2">${escapeHtml(item.birth)}</textarea></label>
        <label>Ish joyi va lavozimi<textarea data-path="relatives.${index}.work" rows="2">${escapeHtml(item.work)}</textarea></label>
        <label>Turar joyi<textarea data-path="relatives.${index}.address" rows="2">${escapeHtml(item.address)}</textarea></label>
        <label>Telefon raqami<input data-path="relatives.${index}.phone" value="${escapeHtml(item.phone)}"></label>
      </div>
    </section>`).join("");
}

function bindInputs() {
  form.querySelectorAll("[data-path]").forEach(input => {
    const path = input.dataset.path;
    if (!input.value) input.value = getPath(data, path) ?? "";
    input.addEventListener("input", () => {
      setPath(data, path, input.value);
      renderPreview();
    });
  });
}

function renderPreview() {
  const d = data;
  preview.innerHTML = `
    <h3 class="doc-title">MA‘LUMOTNOMA</h3>
    <h4 class="doc-name">${visible(d.fullName)}</h4>
    <p class="doc-lead"><strong>${visible(d.fromDate)}</strong><br>${visible(d.university)} ${visible(d.faculty)} ${visible(d.major)} yo‘nalishining ${visible(d.group)} talabasi.</p>
    <div class="doc-grid">
      <div class="doc-cell"><strong>Tug‘ilgan sanasi:</strong> ${visible(d.birthDate)}<br><strong>Millati:</strong> ${visible(d.nationality)}</div>
      <div class="doc-cell"><strong>Tug‘ilgan joyi:</strong><br>${visible(d.birthPlace)}</div>
      <div class="doc-cell"><strong>Ma’lumoti:</strong> ${visible(d.educationLevel)}</div>
      <div class="doc-cell"><strong>Tugatgan ta’lim muassasasi, yili, seriyasi, raqami:</strong><br>${visible(d.graduatedInstitution)}</div>
      <div class="doc-cell"><strong>Ma’lumoti bo‘yicha mutaxassisligi:</strong> ${visible(d.specialty)}</div>
      <div class="doc-cell"><strong>Oilaviy ahvoli:</strong> ${visible(d.maritalStatus)}</div>
      <div class="doc-cell"><strong>Partiyaviyligi:</strong> ${visible(d.party)}</div>
      <div class="doc-cell"><strong>Qaysi chet tillarini biladi:</strong> ${visible(d.languages)}</div>
      <div class="doc-cell"><strong>Universitetga kirishda to‘plagan bali:</strong> ${visible(d.admissionScore)}</div>
      <div class="doc-cell"><strong>Ta’lim shakli:</strong> ${visible(d.studyType)}</div>
      <div class="doc-cell full"><strong>Darsdan bo‘sh vaqtda nima bilan mashg‘ul:</strong> ${visible(d.freeTime)}</div>
      <div class="doc-cell full"><strong>Qiziqishlari:</strong> ${visible(d.interests)}</div>
      <div class="doc-cell full"><strong>Guruh tyutorining ismi-sharifi va telefon raqami:</strong> ${visible(d.tutor)}</div>
      <div class="doc-cell full"><strong>Talabaning asosiy yashash manzili:</strong> ${visible(d.mainAddress)}</div>
      <div class="doc-cell full"><strong>Yashash joyi geolokatsiyasi:</strong> ${visible(d.homeGeo)}</div>
      <div class="doc-cell full"><strong>Talabaning uyali telefon raqami:</strong> ${visible(d.phone)}</div>
      <div class="doc-cell full"><strong>Pasport ma’lumotlari:</strong> ${visible(d.passport)}</div>
      <div class="doc-cell full"><strong>JSHIR:</strong> ${visible(d.jshir)}</div>
      <div class="doc-cell full"><strong>Email:</strong> ${visible(d.email)}</div>
    </div>
    <h4 class="doc-section-title">MEHNAT FAOLIYATI</h4>
    <table class="doc-table"><tbody>${d.workHistory.map(row => `<tr><td>${visible(row.period)}</td><td>${visible(row.place)}</td></tr>`).join("")}</tbody></table>
    <h4 class="doc-subtitle">${visible(d.fullName)}ning yaqin qarindoshlari to‘g‘risida<br>MA‘LUMOT</h4>
    <table class="doc-table doc-mini"><thead><tr><th>Qarindoshligi</th><th>F.I.Sh.</th><th>Tug‘ilgan yili va joyi</th><th>Ish joyi</th><th>Turar joyi</th><th>Telefon</th></tr></thead><tbody>${d.relatives.map(row => `<tr><td><strong>${visible(row.relation)}</strong></td><td>${visible(row.name)}</td><td>${visible(row.birth)}</td><td>${visible(row.work)}</td><td>${visible(row.address)}</td><td>${visible(row.phone)}</td></tr>`).join("")}</tbody></table>
    <p class="doc-copy"><strong>Talabaning vaqtincha yashash manzili:</strong> ${visible(d.tempResidence)}<br><strong>${visible(d.tempAddress)}</strong><br><strong>Ijara geolokatsiyasi:</strong> ${visible(d.rentalGeo)}</p>
    <div class="doc-page-break"></div>
    <p class="doc-copy"><strong>Talaba bilan birga turadiganlar:</strong><br>1) ${visible(d.roommate1)}<br>2) ${visible(d.roommate2)}</p>
    <p class="doc-copy"><strong><em>Qo‘shimcha ma’lumotlar:</em></strong></p>
    <p class="doc-copy">${visible(d.extra1)}</p><p class="doc-copy">${visible(d.extra2)}</p>`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

const W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
const XML_NS = "http://www.w3.org/XML/1998/namespace";

function elementText(element) {
  return Array.from(element.getElementsByTagName("w:t")).map(node => node.textContent).join("");
}

function directChildrenByName(element, localName) {
  return Array.from(element.childNodes).filter(node => node.nodeType === 1 && node.localName === localName);
}

function sourceRun(paragraph, preferNormal) {
  const runs = directChildrenByName(paragraph, "r");
  if (!preferNormal) return runs[0] || null;
  return runs.find(run => !run.getElementsByTagName("w:b").length) || runs[runs.length - 1] || null;
}

function makeRun(xml, text, source, bold) {
  const run = source ? source.cloneNode(true) : xml.createElementNS(W_NS, "w:r");
  Array.from(run.childNodes).forEach(child => {
    if (!(child.nodeType === 1 && child.localName === "rPr")) run.removeChild(child);
  });
  let props = directChildrenByName(run, "rPr")[0];
  if (!props && bold) {
    props = xml.createElementNS(W_NS, "w:rPr");
    run.appendChild(props);
  }
  if (props) {
    Array.from(props.childNodes).filter(child => child.nodeType === 1 && ["b", "bCs"].includes(child.localName)).forEach(child => props.removeChild(child));
    if (bold) {
      props.appendChild(xml.createElementNS(W_NS, "w:b"));
      props.appendChild(xml.createElementNS(W_NS, "w:bCs"));
    }
  }
  const textNode = xml.createElementNS(W_NS, "w:t");
  textNode.setAttributeNS(XML_NS, "xml:space", "preserve");
  textNode.textContent = text;
  run.appendChild(textNode);
  return run;
}

function replaceParagraph(xml, paragraph, label, value, options = {}) {
  if (!paragraph) return;
  const boldSource = sourceRun(paragraph, false);
  const normalSource = sourceRun(paragraph, true) || boldSource;
  directChildrenByName(paragraph, "r").forEach(run => paragraph.removeChild(run));
  directChildrenByName(paragraph, "hyperlink").forEach(link => paragraph.removeChild(link));
  if (label) paragraph.appendChild(makeRun(xml, label, boldSource, true));
  const clean = String(value ?? "").trim();
  if (clean || !label) paragraph.appendChild(makeRun(xml, label ? ` ${clean}` : clean, normalSource, Boolean(options.bold)));
}

function allParagraphs(xml, scope = xml) {
  return Array.from(scope.getElementsByTagName("w:p"));
}

function findParagraph(xml, startsWith, scope = xml) {
  return allParagraphs(xml, scope).find(paragraph => elementText(paragraph).trim().startsWith(startsWith));
}

function setLabeled(xml, label, value) {
  replaceParagraph(xml, findParagraph(xml, label), label, value);
}

function updateDocumentXml(xmlString) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlString, "application/xml");
  if (xml.getElementsByTagName("parsererror").length) throw new Error("Word shablonini o‘qib bo‘lmadi");

  allParagraphs(xml).filter(p => elementText(p).trim() === "TALABA F.I.SH.").forEach(p => replaceParagraph(xml, p, "", data.fullName, { bold: true }));
  const relativeTitle = allParagraphs(xml).find(p => elementText(p).includes("ning yaqin qarindoshlari to‘g‘risida"));
  replaceParagraph(xml, relativeTitle, "", `${data.fullName}ning yaqin qarindoshlari to‘g‘risida`, { bold: true });

  replaceParagraph(xml, findParagraph(xml, "O‘QISH BOSHLANGAN SANA"), "", data.fromDate, { bold: true });
  replaceParagraph(xml, findParagraph(xml, "UNIVERSITET FAKULTET YO‘NALISH GURUH"), "", `${data.university} ${data.faculty} ${data.major} yo‘nalishining ${data.group} talabasi.`);
  setLabeled(xml, "Tug‘ilgan sanasi:", data.birthDate);
  setLabeled(xml, "Millati:", data.nationality);
  const birthLabel = findParagraph(xml, "Tug‘ilgan joyi:");
  if (birthLabel) {
    const cell = birthLabel.parentNode;
    const cellParagraphs = allParagraphs(xml, cell);
    replaceParagraph(xml, birthLabel, "Tug‘ilgan joyi:", "");
    replaceParagraph(xml, cellParagraphs[1], "", data.birthPlace);
  }
  setLabeled(xml, "Ma’lumoti:", data.educationLevel);
  const graduatedLabel = findParagraph(xml, "Tugatgan ta’lim muassasasi");
  if (graduatedLabel) {
    const cellParagraphs = allParagraphs(xml, graduatedLabel.parentNode);
    replaceParagraph(xml, graduatedLabel, "Tugatgan ta’lim muassasasi, yili, seriyasi, raqami:", "");
    replaceParagraph(xml, cellParagraphs[1], "", data.graduatedInstitution);
  }
  setLabeled(xml, "Ma’lumoti bo‘yicha mutaxassisligi:", data.specialty);
  setLabeled(xml, "Oilaviy ahvoli:", data.maritalStatus);
  setLabeled(xml, "Partiyaviyligi:", data.party);
  setLabeled(xml, "Qaysi chet tillarini biladi:", data.languages);
  setLabeled(xml, "Universitetga kirishda to‘plagan bali:", data.admissionScore);
  setLabeled(xml, "Ta’lim shakli:", data.studyType);
  setLabeled(xml, "Darsdan bo‘sh vaqtda nima bilan mashg’ul:", data.freeTime);
  setLabeled(xml, "Qiziqishlari:", data.interests);
  setLabeled(xml, "Guruh tyutorining ismi-sharifi va telefon raqami:", data.tutor);
  setLabeled(xml, "Talabaning asosiy yashash manzili:", data.mainAddress);
  setLabeled(xml, "Yashash joyi geolokatsiyasi:", data.homeGeo);
  setLabeled(xml, "Talabaning uyali telefon raqami:", data.phone);
  setLabeled(xml, "Talabaning pasport seriyasi, raqami, qachon va kim tomonidan berilganligi:", data.passport);
  setLabeled(xml, "JSHIR:", data.jshir);
  setLabeled(xml, "Email:", data.email);

  const tables = Array.from(xml.getElementsByTagName("w:tbl"));
  const workTable = tables[1];
  if (workTable) {
    const rows = Array.from(workTable.getElementsByTagName("w:tr"));
    data.workHistory.forEach((item, index) => {
      const cells = Array.from(rows[index]?.getElementsByTagName("w:tc") || []);
      replaceParagraph(xml, allParagraphs(xml, cells[0])[0], "", item.period);
      replaceParagraph(xml, allParagraphs(xml, cells[1])[0], "", item.place);
    });
  }

  const familyTable = tables.find(table => elementText(table).includes("Qarindoshligi"));
  if (familyTable) {
    const rows = Array.from(familyTable.getElementsByTagName("w:tr"));
    data.relatives.forEach((item, index) => {
      const cells = Array.from(rows[index + 1]?.getElementsByTagName("w:tc") || []);
      [item.relation, item.name, item.birth, item.work, item.address, item.phone].forEach((value, cellIndex) => {
        replaceParagraph(xml, allParagraphs(xml, cells[cellIndex])[0], "", value, { bold: cellIndex === 0 });
      });
    });
  }

  setLabeled(xml, "Talabaning vaqtincha yashash manzili (talabalar turar joyi manzili):", data.tempResidence);
  replaceParagraph(xml, findParagraph(xml, "VAQTINCHA YASHASH MANZILI"), "", data.tempAddress, { bold: true });
  setLabeled(xml, "Ijara geolokatsiyasi:", data.rentalGeo);
  replaceParagraph(xml, findParagraph(xml, "BIRGA TURUVCHI 1"), "", data.roommate1);
  replaceParagraph(xml, findParagraph(xml, "BIRGA TURUVCHI 2"), "", data.roommate2);
  replaceParagraph(xml, findParagraph(xml, "QO‘SHIMCHA MA’LUMOT 1"), "", data.extra1);
  replaceParagraph(xml, findParagraph(xml, "QO‘SHIMCHA MA’LUMOT 2"), "", data.extra2);

  return new XMLSerializer().serializeToString(xml);
}

function findEndOfCentralDirectory(bytes) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 65557); i--) {
    if (view.getUint32(i, true) === 0x06054b50) return i;
  }
  throw new Error("Word fayl ZIP tuzilmasi topilmadi");
}

async function inflateRaw(bytes) {
  if (typeof DecompressionStream === "undefined") throw new Error("Brauzeringiz Word yaratishni qo‘llamaydi. Safari yoki Chrome’ni yangilang.");
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

async function readZip(arrayBuffer) {
  const bytes = new Uint8Array(arrayBuffer);
  const view = new DataView(arrayBuffer);
  const eocd = findEndOfCentralDirectory(bytes);
  const count = view.getUint16(eocd + 10, true);
  let offset = view.getUint32(eocd + 16, true);
  const entries = [];
  const decoder = new TextDecoder();
  for (let i = 0; i < count; i++) {
    if (view.getUint32(offset, true) !== 0x02014b50) throw new Error("Word fayl katalogi buzilgan");
    const method = view.getUint16(offset + 10, true);
    const compressedSize = view.getUint32(offset + 20, true);
    const nameLength = view.getUint16(offset + 28, true);
    const extraLength = view.getUint16(offset + 30, true);
    const commentLength = view.getUint16(offset + 32, true);
    const localOffset = view.getUint32(offset + 42, true);
    const name = decoder.decode(bytes.slice(offset + 46, offset + 46 + nameLength));
    const localNameLength = view.getUint16(localOffset + 26, true);
    const localExtraLength = view.getUint16(localOffset + 28, true);
    const start = localOffset + 30 + localNameLength + localExtraLength;
    const compressed = bytes.slice(start, start + compressedSize);
    let content;
    if (method === 0) content = compressed;
    else if (method === 8) content = await inflateRaw(compressed);
    else throw new Error(`Qo‘llanmaydigan ZIP siqish usuli: ${method}`);
    entries.push({ name, content });
    offset += 46 + nameLength + extraLength + commentLength;
  }
  return entries;
}

const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function concatBytes(parts) {
  const size = parts.reduce((total, part) => total + part.length, 0);
  const output = new Uint8Array(size);
  let offset = 0;
  for (const part of parts) { output.set(part, offset); offset += part.length; }
  return output;
}

function buildZip(entries) {
  const encoder = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let localOffset = 0;
  for (const entry of entries) {
    const name = encoder.encode(entry.name);
    const content = entry.content;
    const crc = crc32(content);
    const local = new Uint8Array(30 + name.length);
    const lv = new DataView(local.buffer);
    lv.setUint32(0, 0x04034b50, true); lv.setUint16(4, 20, true); lv.setUint16(6, 0x0800, true);
    lv.setUint16(8, 0, true); lv.setUint32(14, crc, true); lv.setUint32(18, content.length, true); lv.setUint32(22, content.length, true);
    lv.setUint16(26, name.length, true); local.set(name, 30);
    localParts.push(local, content);

    const central = new Uint8Array(46 + name.length);
    const cv = new DataView(central.buffer);
    cv.setUint32(0, 0x02014b50, true); cv.setUint16(4, 20, true); cv.setUint16(6, 20, true); cv.setUint16(8, 0x0800, true);
    cv.setUint16(10, 0, true); cv.setUint32(16, crc, true); cv.setUint32(20, content.length, true); cv.setUint32(24, content.length, true);
    cv.setUint16(28, name.length, true); cv.setUint32(42, localOffset, true); central.set(name, 46);
    centralParts.push(central);
    localOffset += local.length + content.length;
  }
  const central = concatBytes(centralParts);
  const end = new Uint8Array(22);
  const ev = new DataView(end.buffer);
  ev.setUint32(0, 0x06054b50, true); ev.setUint16(8, entries.length, true); ev.setUint16(10, entries.length, true);
  ev.setUint32(12, central.length, true); ev.setUint32(16, localOffset, true);
  return concatBytes([...localParts, central, end]);
}

async function createWordDocument() {
  const buttons = [document.getElementById("downloadTop"), document.getElementById("downloadBottom")];
  buttons.forEach(button => { button.disabled = true; button.lastChild.textContent = " Tayyorlanmoqda…"; });
  try {
    const response = await fetch("./template.docx");
    if (!response.ok) throw new Error("Word shabloni yuklanmadi");
    const entries = await readZip(await response.arrayBuffer());
    const documentEntry = entries.find(entry => entry.name === "word/document.xml");
    if (!documentEntry) throw new Error("Word hujjat matni topilmadi");
    const xml = new TextDecoder().decode(documentEntry.content);
    documentEntry.content = new TextEncoder().encode(updateDocumentXml(xml));
    const blob = new Blob([buildZip(entries)], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
    const link = document.createElement("a");
    const safeName = (data.fullName || "talaba").replace(/[\\/:*?"<>|]/g, "").trim().replace(/\s+/g, "_");
    link.href = URL.createObjectURL(blob);
    link.download = `Malumotnoma_${safeName}.docx`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    showToast("Word fayl tayyor. Yuklab olish boshlandi.");
    return { ok: true, filename: link.download };
  } catch (error) {
    console.error(error);
    showToast(error.message || "Word fayl yaratishda xatolik yuz berdi");
    throw error;
  } finally {
    buttons.forEach(button => { button.disabled = false; button.lastChild.textContent = " Word yuklab olish"; });
  }
}

renderRepeatFields();
bindInputs();
renderPreview();
document.getElementById("downloadTop").addEventListener("click", createWordDocument);
document.getElementById("downloadBottom").addEventListener("click", createWordDocument);

if (document.modelContext?.registerTool) {
  const lifecycle = new AbortController();
  Promise.resolve(document.modelContext.registerTool({
    name: "fill_student_information",
    title: "Talaba ma’lumotlarini to‘ldirish",
    description: "Ma’lumotnoma formasidagi berilgan maydonlarni yangilaydi va hujjat ko‘rinishini qayta chizadi.",
    inputSchema: {
      type: "object",
      properties: {
        fullName: { type: "string" }, birthDate: { type: "string" }, nationality: { type: "string" },
        birthPlace: { type: "string" }, phone: { type: "string" }, jshir: { type: "string" },
        email: { type: "string" }, mainAddress: { type: "string" }
      },
      additionalProperties: false
    },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute(input) {
      if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Ma’lumot obyekt ko‘rinishida bo‘lishi kerak");
      const allowed = ["fullName", "birthDate", "nationality", "birthPlace", "phone", "jshir", "email", "mainAddress"];
      for (const [key, value] of Object.entries(input)) {
        if (!allowed.includes(key) || typeof value !== "string") throw new Error(`Noto‘g‘ri maydon: ${key}`);
        data[key] = value;
        const control = form.querySelector(`[data-path="${key}"]`);
        if (control) control.value = value;
      }
      renderPreview();
      return { updated: Object.keys(input), fullName: data.fullName };
    }
  }, { signal: lifecycle.signal })).catch(() => {});
}
