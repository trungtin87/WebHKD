import { MaNganh, ThemeGiaoDien } from '../kieuDuLieu';
import { bentoHienDai } from './bentoHienDai';
import { dichVuXanhDuong } from './dichVuXanhDuong';
import { nongSanXanhLa } from './nongSanXanhLa';
import { phoCoVangAm } from './phoCoVangAm';
import { saiGonRetro } from './saiGonRetro';
import { sangTrongToi } from './sangTrongToi';
import { spaThaoMoc } from './spaThaoMoc';
import { tapChiBienTap } from './tapChiBienTap';
import { thuCongMauDat } from './thuCongMauDat';
import { toiGianSang } from './toiGianSang';

// Kho đăng ký tập trung 10 mẫu giao diện (5 mẫu thuần Việt + 5 mẫu cảm hứng Webflow)
export const DANH_SACH_GIAO_DIEN: ThemeGiaoDien[] = [
  nongSanXanhLa,
  toiGianSang,
  dichVuXanhDuong,
  thuCongMauDat,
  phoCoVangAm,
  bentoHienDai,
  tapChiBienTap,
  saiGonRetro,
  spaThaoMoc,
  sangTrongToi,
];

export function layThemeTheoMa(maTheme: string): ThemeGiaoDien {
  return DANH_SACH_GIAO_DIEN.find((t) => t.ma === maTheme) || DANH_SACH_GIAO_DIEN[0];
}

// Sắp xếp theme hợp với ngành đang chọn lên đầu danh sách
export function sapXepThemeTheoNganh(nganh: MaNganh): ThemeGiaoDien[] {
  return [...DANH_SACH_GIAO_DIEN].sort((a, b) => {
    const aHop = a.nganhPhuHop.includes(nganh) ? 0 : 1;
    const bHop = b.nganhPhuHop.includes(nganh) ? 0 : 1;
    return aHop - bHop;
  });
}
