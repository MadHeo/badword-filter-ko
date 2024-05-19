# badword-filter-ko

욕 필터 기능과 한국 욕 리스트를 제공합니다.

욕이 포함된 단어 덩어리 모두 "\*" 표시되는 버그가 수정되었습니다.

```shell
npm i badword-filter-ko
```

```shell
yarn add badword-filter-ko
```

how to use

```js
import Filter from "badword-filter-ko";

const filter = new Filter();

//filter
console.log(filter.clean("안녕하세요 저는 시불입니다."));
//안녕하세요 저는 **입니다.

//add word
filter.addWords("하이");

//add words
const badWords = ["하이", "바이", "안녕"];
filter.addWords(...badWords);

//remove word
filter.removeWords("하이");

//remove words
const badWords = ["하이", "바이", "안녕"];
filter.removeWords(...badWords);
```

referred to https://github.com/web-mech/badwords
