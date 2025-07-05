import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';

const twCardTypes = [
  { description: "莊家相關" },
  { name: "莊家", number: 1, description: "莊家1台" },
  { name: "連莊", number: 0, description: "莊家胡牌或流局即為連莊，連莊N次有N台" },
  { name: "拉莊", number: 0, description: "同連莊，連莊N次有N台" },
  { description: "特殊" },
  { name: "獨聽", number: 1, description: "聽單吊、邊張、中洞" },
  { name: "平胡", number: 1, description: "手牌全為順子與一將、兩面聽、胡別人、無字無花、不可釣將" },
  { name: "自摸", number: 1, description: "胡牌的牌由自己摸進" },
  { name: "門清", number: 1, description: "胡牌時，沒有吃、碰、明槓" },
  { description: "求人台" },
  { name: "不求", number: 1, description: "無吃、碰、明槓，且自摸" },
  { name: "半求", number: 1, description: "手牌剩下一張單吊自摸" },
  { name: "全求", number: 2, description: "手牌剩下一張單吊，且胡他人牌" },
  { description: "風台" },
  { name: "場風", number: 1, description: "拿到與圈風對應的風牌刻子" },
  { name: "自風", number: 1, description: "拿到與自己位置對應的風牌刻子" },
  { name: "小四喜", number: 8, description: "拿到東南西北，其中三組是刻子，剩下一組為將" },
  { name: "大四喜", number: 16, description: "拿到東南西四組刻子" },
  { description: "三元台" },
  { name: "三元牌", number: 1, description: "拿到白發中其中一種刻子" },
  { name: "小三元", number: 4, description: "拿到白發中，其中兩組是刻子，剩下一組為將" },
  { name: "大三元", number: 8, description: "拿到白發中三組刻子" },
  { description: "花台" },
  { name: "花牌", number: 1, description: "東南西北位置分別對應一到四花" },
  { name: "花槓", number: 2, description: "湊齊春夏秋冬一組或梅蘭竹菊一組" },
  { name: "七搶一", number: 8, description: "自己摸到7張花，並補完牌，且有任一人摸到剩下那一張花，若補完牌後自摸可加計，視同被搶者放槍", special: true },
  { name: "八仙過海", number: 8, description: "自己摸到8張花，並補完牌，若補完牌後自摸可加計" },
  { description: "槓台" },
  { name: "搶槓", number: 1, description: "胡別人補槓的牌" },
  { name: "槓上開花", number: 1, description: "槓或補花後自摸" },
  { description: "最後一張" },
  { name: "河底撈魚", number: 1, description: "剩餘最後一張時(流局前)胡牌" },
  { name: "海底撈月", number: 1, description: "剩餘最後一張時(流局前)自摸" },
  { description: "一色台" },
  { name: "混一色", number: 4, description: "手牌僅有一種數牌(萬筒條)與任意字牌" },
  { name: "清一色", number: 8, description: "手牌僅有一種數牌(萬筒條)" },
  { name: "字一色", number: 8, description: "手牌僅有字牌" },
  { description: "刻台" },
  { name: "碰碰胡", number: 4, description: "手牌為一將五刻" },
  { name: "哩咕哩咕", number: 8, description: "手牌為八對，其中一對再多一張", special: true },
  { name: "三暗刻", number: 2, description: "手牌有三組暗刻(包含暗槓)" },
  { name: "四暗刻", number: 5, description: "手牌有四組暗刻(包含暗槓)" },
  { name: "五暗刻", number: 8, description: "手牌有五組暗刻(包含暗槓)" },
  { description: "聽、胡牌" },
  { name: "地聽", number: 4, description: "無任何人吃碰明槓情況下，第一巡閒家打出第一張後聽牌，不計門清、不求，可計自摸" },
  { name: "天聽", number: 8, description: "無任何人吃碰明槓情況下，第一巡莊家打出第一張後聽牌，不計門清、不求，可計自摸" },
  { name: "地胡", number: 16, description: "閒家開門後自摸、不計門清、不求、自摸、天地聽" },
  { name: "天胡", number: 16, description: "莊家開門後自摸、不計門清、不求、自摸、天地聽" },
  { name: "人胡", number: 16, description: "無任何人吃碰明槓情況下，第一巡胡別人牌，不計門清、天地聽，可計自摸" }
]
const properNoun = [
  { name: "刻子", description: "三張一樣的牌" },
  { name: "順子", description: "三張有順序的數牌" },
  { name: "胡牌型", description: "五組刻子或順子 + 一將(兩張一樣的牌)" },
  { name: "邊張", description: "靠邊順子缺一，123 缺 3 與 789 缺 7" },
  { name: "中洞", description: "順子缺中間，例如 567 缺 6" },
  { name: "門清一摸三", description: "門清自摸，有門清、不求、自摸三台" },
  { name: "賭注", description: "底/台 形式，例如 5/2 ，表示自摸或胡牌後最少能獲得 5 元，每多一台能獲得 2 元" },
  { name: "莊家", description: "該局開始的玩家" },
  { name: "閒家", description: "除了莊家以外的玩家" },
  { name: "莊家台數", description: "莊家+連莊+拉莊，若連莊 N 次，收付台數皆須加計 1+2N 台" }
]
function App() {

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 py-5'>
          <h2 className='text-center my-3'>麻將牌型</h2>
          <Table className='table table-hover'>
            <thead className='table-light'>
              <tr>
                <th className='col-name text-center'>牌型</th>
                <th className='col-number text-center'>台數</th>
                <th className='col-description text-center'>說明</th>
              </tr>
            </thead>
            <tbody>
              {twCardTypes.map(
                (card, index) => {
                  if (card.name) {
                    return (
                      <tr key={index} className={`${card.special ? 'special-type' : ''}`}>
                        <td className='col-name text-center'>{card.name}</td>
                        <td className='col-number text-center'>{card.number !== 0 ? card.number : "N"}</td>
                        <td className='col-description'>{card.description}</td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr className="category-row">
                        <td colSpan={3}>{card.description}</td>
                      </tr>
                    );
                  }
                }
              )}
            </tbody>
          </Table>
        </div>
        <div className='col-md-6 py-5'>
          <h2 className='text-center my-3'>術語介紹</h2>
          <Table className='table table-hover'>
            <tbody>{properNoun.map(
              (card, index) => {
                return (
                  <tr key={index}>
                    <td className='col-name text-center'>{card.name}</td>
                    <td className='col-description'>{card.description}</td>
                  </tr>
                );
              }
            )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default App
