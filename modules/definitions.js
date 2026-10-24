window.MakerDefinitions = { contentDefinitions: {
  title: {
    label: '제목 + 내용',
    html: `<div class="editable field-title" contenteditable="true">Q. 새로운 질문</div><div class="editable text-body" contenteditable="true" data-placeholder="내용을 입력하세요."></div>`
  },
  select: {
    label: '드롭 선택',
    html: `<div class="editable field-title" contenteditable="true">Q. 선택 항목</div><select><option>선택 항목 1</option><option>선택 항목 2</option><option>선택 항목 3</option></select>`
  },
  choice: {
    label: '체크 선택',
    html: `<div class="editable field-title" contenteditable="true">Q. 선호 컨텐츠</div><div class="chip-list"><button class="choice-chip selected" type="button">스토리 <span class="chip-delete">×</span></button><button class="choice-chip" type="button">파밍/엔드컨텐츠 <span class="chip-delete">×</span></button><button class="choice-chip selected" type="button">스크린샷/룩덕 <span class="chip-delete">×</span></button><button class="choice-chip" type="button">OST/분위기 <span class="chip-delete">×</span></button><button class="chip-add" type="button">＋ 옵션 추가</button></div>`
  },
  check: {
    label: '체크리스트',
    html: `<div class="editable field-title" contenteditable="true">Q. 체크리스트</div><div class="choice-list"><label><input type="checkbox" checked> 옵션 1</label><label><input type="checkbox"> 옵션 2</label><label><input type="checkbox"> 옵션 3</label></div>`
  },
  list: {
    label: '목록형',
    html: `<div class="editable field-title" contenteditable="true">Q. 목록</div><div class="choice-list"><div class="list-row"><b>1.</b><input value="첫 번째 항목"></div><div class="list-row"><b>2.</b><input value="두 번째 항목"></div><div class="list-row"><b>3.</b><input value="세 번째 항목"></div></div>`
  },
  text: {
    label: '내용만',
    html: `<div class="editable text-body" contenteditable="true" data-placeholder="자유롭게 내용을 입력하세요."></div>`
  }
} };
