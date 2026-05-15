export type CrowdCode = 'low' | 'medium' | 'high' | 'veryHigh';

export type SubwayStation = {
  id: string;
  name: string;
  lines: string[];
  district: string;
  crowdLevel: string;
  crowdCode: CrowdCode;
  passengers: number;
  exits: number;
  nearby: string[];
  x: number;
  y: number;
};

type LineDefinition = {
  line: string;
  color: string;
  defaultDistrict: string;
  stations: string[];
};

export const subwayLineColors: Record<string, string> = {
  '1호선': '#0052A4',
  '2호선': '#00A84D',
  '3호선': '#EF7C1C',
  '4호선': '#00A5DE',
  '5호선': '#996CAC',
  '6호선': '#CD7C2F',
  '7호선': '#747F00',
  '8호선': '#E6186C',
  '9호선': '#BDB092',
  신분당선: '#D4003B',
  공항철도: '#0090D2',
  경의중앙선: '#77C4A3',
  수인분당선: '#F5A200',
  우이신설선: '#B7C450',
  신림선: '#6789CA',
  경춘선: '#0C8E72',
};

const lineDefinitions: LineDefinition[] = [
  {
    line: '1호선',
    color: subwayLineColors['1호선'],
    defaultDistrict: '도심권',
    stations: [
      '소요산', '동두천', '보산', '동두천중앙', '지행', '덕정', '덕계', '양주', '녹양', '가능',
      '의정부', '회룡', '망월사', '도봉산', '도봉', '방학', '창동', '녹천', '월계', '광운대',
      '석계', '신이문', '외대앞', '회기', '청량리', '제기동', '신설동', '동묘앞', '동대문',
      '종로5가', '종로3가', '종각', '시청', '서울역', '남영', '용산', '노량진', '대방',
      '신길', '영등포', '신도림', '구로', '구일', '개봉', '오류동', '온수',
    ],
  },
  {
    line: '2호선',
    color: subwayLineColors['2호선'],
    defaultDistrict: '도심 순환',
    stations: [
      '시청', '을지로입구', '을지로3가', '을지로4가', '동대문역사문화공원', '신당', '상왕십리',
      '왕십리', '한양대', '뚝섬', '성수', '건대입구', '구의', '강변', '잠실나루', '잠실',
      '잠실새내', '종합운동장', '삼성', '선릉', '역삼', '강남', '교대', '서초', '방배',
      '사당', '낙성대', '서울대입구', '봉천', '신림', '신대방', '구로디지털단지', '대림',
      '신도림', '문래', '영등포구청', '당산', '합정', '홍대입구', '신촌', '이대', '아현',
      '충정로', '용답', '신답', '용두', '신설동', '도림천', '양천구청', '신정네거리', '까치산',
    ],
  },
  {
    line: '3호선',
    color: subwayLineColors['3호선'],
    defaultDistrict: '서북-강남축',
    stations: [
      '대화', '주엽', '정발산', '마두', '백석', '대곡', '화정', '원당', '원흥', '삼송',
      '지축', '구파발', '연신내', '불광', '녹번', '홍제', '무악재', '독립문', '경복궁',
      '안국', '종로3가', '을지로3가', '충무로', '동대입구', '약수', '금호', '옥수',
      '압구정', '신사', '잠원', '고속터미널', '교대', '남부터미널', '양재', '매봉',
      '도곡', '대치', '학여울', '대청', '일원', '수서', '가락시장', '경찰병원', '오금',
    ],
  },
  {
    line: '4호선',
    color: subwayLineColors['4호선'],
    defaultDistrict: '북동-도심-남부축',
    stations: [
      '진접', '오남', '별내별가람', '당고개', '상계', '노원', '창동', '쌍문', '수유',
      '미아', '미아사거리', '길음', '성신여대입구', '한성대입구', '혜화', '동대문',
      '동대문역사문화공원', '충무로', '명동', '회현', '서울역', '숙대입구', '삼각지',
      '신용산', '이촌', '동작', '총신대입구', '사당', '남태령',
    ],
  },
  {
    line: '5호선',
    color: subwayLineColors['5호선'],
    defaultDistrict: '동서축',
    stations: [
      '방화', '개화산', '김포공항', '송정', '마곡', '발산', '우장산', '화곡', '까치산',
      '신정', '목동', '오목교', '양평', '영등포구청', '영등포시장', '신길', '여의도',
      '여의나루', '마포', '공덕', '애오개', '충정로', '서대문', '광화문', '종로3가',
      '을지로4가', '동대문역사문화공원', '청구', '신금호', '행당', '왕십리', '마장',
      '답십리', '장한평', '군자', '아차산', '광나루', '천호', '강동', '길동',
      '굽은다리', '명일', '고덕', '상일동', '강일', '미사', '하남풍산', '하남시청',
      '하남검단산', '둔촌동', '올림픽공원', '방이', '오금', '개롱', '거여', '마천',
    ],
  },
  {
    line: '6호선',
    color: subwayLineColors['6호선'],
    defaultDistrict: '서북-동북축',
    stations: [
      '응암', '역촌', '불광', '독바위', '연신내', '구산', '새절', '증산', '디지털미디어시티',
      '월드컵경기장', '마포구청', '망원', '합정', '상수', '광흥창', '대흥', '공덕',
      '효창공원앞', '삼각지', '녹사평', '이태원', '한강진', '버티고개', '약수', '청구',
      '신당', '동묘앞', '창신', '보문', '안암', '고려대', '월곡', '상월곡', '돌곶이',
      '석계', '태릉입구', '화랑대', '봉화산', '신내',
    ],
  },
  {
    line: '7호선',
    color: subwayLineColors['7호선'],
    defaultDistrict: '북부-강남-서남축',
    stations: [
      '장암', '도봉산', '수락산', '마들', '노원', '중계', '하계', '공릉', '태릉입구',
      '먹골', '중화', '상봉', '면목', '사가정', '용마산', '중곡', '군자', '어린이대공원',
      '건대입구', '뚝섬유원지', '청담', '강남구청', '학동', '논현', '반포', '고속터미널',
      '내방', '이수', '남성', '숭실대입구', '상도', '장승배기', '신대방삼거리', '보라매',
      '신풍', '대림', '남구로', '가산디지털단지', '철산', '광명사거리', '천왕', '온수',
      '까치울', '부천종합운동장', '춘의', '신중동', '부천시청', '상동', '삼산체육관',
      '굴포천', '부평구청',
    ],
  },
  {
    line: '8호선',
    color: subwayLineColors['8호선'],
    defaultDistrict: '동남권',
    stations: [
      '암사', '천호', '강동구청', '몽촌토성', '잠실', '석촌', '송파', '가락시장',
      '문정', '장지', '복정', '산성', '남한산성입구', '단대오거리', '신흥', '수진', '모란',
    ],
  },
  {
    line: '9호선',
    color: subwayLineColors['9호선'],
    defaultDistrict: '한강 남부축',
    stations: [
      '개화', '김포공항', '공항시장', '신방화', '마곡나루', '양천향교', '가양', '증미',
      '등촌', '염창', '신목동', '선유도', '당산', '국회의사당', '여의도', '샛강',
      '노량진', '노들', '흑석', '동작', '구반포', '신반포', '고속터미널', '사평',
      '신논현', '언주', '선정릉', '삼성중앙', '봉은사', '종합운동장', '삼전', '석촌고분',
      '석촌', '송파나루', '한성백제', '올림픽공원', '둔촌오륜', '중앙보훈병원',
    ],
  },
  {
    line: '신분당선',
    color: subwayLineColors.신분당선,
    defaultDistrict: '강남-분당축',
    stations: ['신사', '논현', '신논현', '강남', '양재', '양재시민의숲', '청계산입구', '판교', '정자', '미금', '동천', '수지구청', '성복', '상현', '광교중앙', '광교'],
  },
  {
    line: '공항철도',
    color: subwayLineColors.공항철도,
    defaultDistrict: '공항 연결축',
    stations: ['서울역', '공덕', '홍대입구', '디지털미디어시티', '마곡나루', '김포공항', '계양', '검암', '청라국제도시', '영종', '운서', '공항화물청사', '인천공항1터미널', '인천공항2터미널'],
  },
  {
    line: '경의중앙선',
    color: subwayLineColors.경의중앙선,
    defaultDistrict: '서북-동부 연결축',
    stations: ['문산', '파주', '월롱', '금촌', '금릉', '운정', '야당', '탄현', '일산', '풍산', '백마', '곡산', '대곡', '능곡', '행신', '강매', '디지털미디어시티', '수색', '가좌', '홍대입구', '서강대', '공덕', '효창공원앞', '용산', '이촌', '서빙고', '한남', '옥수', '응봉', '왕십리', '청량리', '회기', '중랑', '상봉', '망우', '양원', '구리', '도농', '양정', '덕소', '도심', '팔당', '운길산', '양수', '신원', '국수', '아신', '오빈', '양평', '원덕', '용문'],
  },
  {
    line: '수인분당선',
    color: subwayLineColors.수인분당선,
    defaultDistrict: '강남-수원 연결축',
    stations: ['청량리', '왕십리', '서울숲', '압구정로데오', '강남구청', '선정릉', '선릉', '한티', '도곡', '구룡', '개포동', '대모산입구', '수서', '복정', '가천대', '태평', '모란', '야탑', '이매', '서현', '수내', '정자', '미금', '오리', '죽전', '보정', '구성', '신갈', '기흥', '상갈', '청명', '영통', '망포', '매탄권선', '수원시청', '매교', '수원', '고색', '오목천', '어천', '야목', '사리', '한대앞', '중앙', '고잔', '초지', '안산', '신길온천', '정왕', '오이도', '달월', '월곶', '소래포구', '인천논현', '호구포', '남동인더스파크', '원인재', '연수', '송도', '인하대', '숭의', '신포', '인천'],
  },
  {
    line: '우이신설선',
    color: subwayLineColors.우이신설선,
    defaultDistrict: '강북권',
    stations: ['북한산우이', '솔밭공원', '4.19민주묘지', '가오리', '화계', '삼양', '삼양사거리', '솔샘', '북한산보국문', '정릉', '성신여대입구', '보문', '신설동'],
  },
  {
    line: '신림선',
    color: subwayLineColors.신림선,
    defaultDistrict: '관악권',
    stations: ['샛강', '대방', '서울지방병무청', '보라매', '보라매공원', '보라매병원', '당곡', '신림', '서원', '서울대벤처타운', '관악산'],
  },
  {
    line: '경춘선',
    color: subwayLineColors.경춘선,
    defaultDistrict: '동북 연결축',
    stations: ['청량리', '회기', '중랑', '상봉', '망우', '신내', '갈매', '별내', '퇴계원', '사릉', '금곡', '평내호평', '천마산', '마석', '대성리', '청평', '상천', '가평', '굴봉산', '백양리', '강촌', '김유정', '남춘천', '춘천'],
  },
];

const districtByStation: Record<string, string> = {
  서울역: '중구',
  시청: '중구',
  종각: '종로구',
  종로3가: '종로구',
  광화문: '종로구',
  경복궁: '종로구',
  안국: '종로구',
  동대문: '종로구',
  홍대입구: '마포구',
  합정: '마포구',
  망원: '마포구',
  공덕: '마포구',
  여의도: '영등포구',
  당산: '영등포구',
  영등포구청: '영등포구',
  신도림: '구로구',
  구로디지털단지: '구로구',
  강남: '강남구',
  역삼: '강남구',
  선릉: '강남구',
  삼성: '강남구',
  압구정: '강남구',
  신사: '강남구',
  논현: '강남구',
  신논현: '강남구',
  고속터미널: '서초구',
  교대: '서초구',
  양재: '서초구',
  사당: '동작구',
  노량진: '동작구',
  신림: '관악구',
  서울대입구: '관악구',
  잠실: '송파구',
  석촌: '송파구',
  가락시장: '송파구',
  오금: '송파구',
  천호: '강동구',
  건대입구: '광진구',
  성수: '성동구',
  왕십리: '성동구',
  청량리: '동대문구',
  회기: '동대문구',
  상봉: '중랑구',
  노원: '노원구',
  창동: '도봉구',
  수유: '강북구',
  연신내: '은평구',
  불광: '은평구',
  디지털미디어시티: '은평구',
  김포공항: '강서구',
  마곡나루: '강서구',
  목동: '양천구',
};

const landmarkByStation: Record<string, string[]> = {
  홍대입구: ['연남동', '경의선숲길', '상권'],
  강남: ['강남대로', '오피스', '맛집'],
  잠실: ['롯데월드', '석촌호수', '야구장'],
  서울역: ['KTX', '남대문', '환승센터'],
  고속터미널: ['터미널', '지하상가', '쇼핑'],
  여의도: ['한강공원', 'IFC', '더현대'],
  광화문: ['광화문광장', '경복궁', '청계천'],
  성수: ['카페거리', '서울숲', '팝업스토어'],
  신림: ['상권', '관악산', '대학가'],
  건대입구: ['건대 맛의거리', '커먼그라운드', '상권'],
};

const highCrowdStations = new Set([
  '홍대입구', '강남', '잠실', '서울역', '고속터미널', '신도림', '사당', '건대입구', '여의도', '신림',
  '종로3가', '김포공항', '선릉', '삼성', '합정', '성수', '왕십리',
]);

const mediumCrowdStations = new Set([
  '광화문', '시청', '을지로입구', '노량진', '공덕', '교대', '가산디지털단지', '연신내', '노원',
  '천호', '청량리', '가락시장', '충무로', '동대문역사문화공원',
]);

function getCrowd(name: string, index: number): { crowdCode: CrowdCode; crowdLevel: string } {
  if (highCrowdStations.has(name)) {
    return { crowdCode: index % 3 === 0 ? 'veryHigh' : 'high', crowdLevel: index % 3 === 0 ? '매우 혼잡' : '혼잡' };
  }
  if (mediumCrowdStations.has(name)) {
    return { crowdCode: 'medium', crowdLevel: '보통' };
  }
  return index % 7 === 0
    ? { crowdCode: 'medium', crowdLevel: '보통' }
    : { crowdCode: 'low', crowdLevel: '여유' };
}

function passengerSeed(name: string, lineIndex: number, stationIndex: number, crowdCode: CrowdCode) {
  const base = Array.from(name).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const crowdBoost = crowdCode === 'veryHigh' ? 74000 : crowdCode === 'high' ? 52000 : crowdCode === 'medium' ? 31000 : 14000;
  return crowdBoost + ((base + lineIndex * 173 + stationIndex * 97) % 18000);
}

function mapPoint(lineIndex: number, stationIndex: number, count: number) {
  const progress = count <= 1 ? 0.5 : stationIndex / (count - 1);
  const wave = Math.sin(progress * Math.PI * 2 + lineIndex * 0.7) * 18;
  const x = 7 + progress * 86;
  const y = 13 + lineIndex * 4.8 + wave;
  return {
    x: Math.max(5, Math.min(95, Math.round(x))),
    y: Math.max(8, Math.min(82, Math.round(y))),
  };
}

function buildStations() {
  const merged = new Map<string, SubwayStation>();

  lineDefinitions.forEach((definition, lineIndex) => {
    definition.stations.forEach((name, stationIndex) => {
      const current = merged.get(name);
      const { crowdCode, crowdLevel } = getCrowd(name, stationIndex + lineIndex);
      const point = mapPoint(lineIndex, stationIndex, definition.stations.length);

      if (current) {
        if (!current.lines.includes(definition.line)) current.lines.push(definition.line);
        current.passengers += Math.round(passengerSeed(name, lineIndex, stationIndex, crowdCode) * 0.22);
        current.exits = Math.max(current.exits, 4 + ((stationIndex + lineIndex) % 9));
        if (crowdCode === 'veryHigh' || (crowdCode === 'high' && current.crowdCode !== 'veryHigh')) {
          current.crowdCode = crowdCode;
          current.crowdLevel = crowdLevel;
        }
        return;
      }

      merged.set(name, {
        id: `${definition.line}-${stationIndex}-${name}`,
        name,
        lines: [definition.line],
        district: districtByStation[name] ?? definition.defaultDistrict,
        crowdLevel,
        crowdCode,
        passengers: passengerSeed(name, lineIndex, stationIndex, crowdCode),
        exits: 2 + ((stationIndex + lineIndex) % 10),
        nearby: landmarkByStation[name] ?? [`${name} 상권`, `${name} 환승권`, `${definition.defaultDistrict}`],
        x: point.x,
        y: point.y,
      });
    });
  });

  return Array.from(merged.values()).sort((a, b) => a.name.localeCompare(b.name, 'ko'));
}

export const seoulSubwayStations = buildStations();

export const crowdedStationRanking = [...seoulSubwayStations]
  .sort((a, b) => b.passengers - a.passengers)
  .slice(0, 10);
