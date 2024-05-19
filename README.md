# badword-filter-ko

욕 필터 기능과 욕 리스트를 제공합니다
아직 테스트 중 입니다. 사용 할 수 없습니닷!
욕 리스트는 언제든 복사하여 사용할 수 있습니다

```shell
$ npm i badword-filter-ko
```

```shell
$ yarn add badword-filter-ko
```

how use

```js
import Filter from "badword-filter-ko";

const filter = new Filter();

//filter
console.log(filter.clean("안녕하세요 시불아"));
//안녕하세요 **아

//add word
filter.addWords("하이");

//remove word
filter.removeWords("하이");
```

referred to https://github.com/web-mech/badwords
