// Định nghĩa kiểu dữ liệu và hằng số chuẩn cho toàn bộ ứng dụng Tạo Trang Cửa Hàng Việt

export const PHIEN_BAN_DU_LIEU = 1;
export const SO_SAN_PHAM_TOI_DA = 12;
export const SO_DIEM_NOI_BAT_TOI_DA = 6;
export const SO_THONG_TIN_MO_RONG_TOI_DA = 8;
export const KICH_THUOC_ANH_TOI_DA = 1600;
export const CHAT_LUONG_NEN_ANH = 0.8;

export type MaNganh =
  | 'amThuc'
  | 'nongSan'
  | 'thoiTrang'
  | 'myPham'
  | 'dichVu'
  | 'thuCong'
  | 'khac';

export type KieuGiaSanPham = 'coGia' | 'lienHeDeBiet' | 'anGia';

export type MaKhoiHienThi =
  | 'dauTrang'
  | 'banner'
  | 'sanPham'
  | 'gioiThieu'
  | 'hoKinhDoanh'
  | 'diaChi'
  | 'lienHe'
  | 'cauCamOn';

export interface SanPham {
  id: string;
  ten: string;
  gia: number | null;
  donVi: string;
  kieuGia: KieuGiaSanPham;
  moTa: string;
  anh: string | null;
  noiBat: boolean;
}

export interface ThongTinMoRongItem {
  id: string;
  nhan: string;
  giaTri: string;
}

export interface ThongTinHoKinhDoanh {
  hienThongTinPhapLy: boolean;
  tenChuHo: string;
  maSoHoKinhDoanh: string;
  khuVucPhucVu: string;
  hinhThucBanHang: string;
  chinhSachGiaoHang: string;
  thongTinMoRong: ThongTinMoRongItem[];
}

export interface DuLieuCuaHang {
  phienBan: number;
  nganh: MaNganh;
  tenCuaHang: string;
  khauHieu: string;
  logo?: string | null;
  soZalo: string;
  soDienThoai: string;
  diaChi: string;
  linkBanDo: string;
  gioMoCua: string;
  mangXaHoi: {
    facebook: string;
    tiktok: string;
    instagram: string;
  };
  danhSachSanPham: SanPham[];
  gioiThieu: {
    doanVan: string;
    diemNoiBat: string[];
  };
  hoKinhDoanh: ThongTinHoKinhDoanh;
  cauCamOn: string;
  anhBanner: string | null;
  anhCuaHang: string | null;
  giaoDien: {
    maTheme: string;
    mauChinh: string | null;
    cacKhoiHienThi: MaKhoiHienThi[];
    hienMaQrZalo: boolean;
  };
}

export interface TuyChonVeTrang {
  maQrSvg: string;
  mauChinhTuyChon?: string | null;
  cheDoXuat?: 'xemTruoc' | 'htmlDon' | 'zip';
  banDoDuongDanAnh?: Record<string, string>;
}

export interface BangMauTheme {
  nen: string;
  beMat: string;
  chinh: string;
  nhan: string;
  chu: string;
  chuPhu: string;
  vien: string;
}

export interface ThemeGiaoDien {
  ma: string;
  ten: string;
  moTaNgan: string;
  phongCach: string;
  nganhPhuHop: MaNganh[];
  bangMau: BangMauTheme;
  mauGoiY: string[];
  fontChu: {
    tieuDe: string;
    noiDung: string;
  };
  kieuDauTrang: 'bannerAnhLon' | 'chuGiuaNenMau' | 'chiaDoiTraiPhai';
  kieuSanPham: 'luoiThe' | 'danhSachCoGia' | 'menuDoc' | 'anhLonXenKe';
  hoaTiet: string;
  veTrang: (duLieu: DuLieuCuaHang, tuyChon: TuyChonVeTrang) => string;
}

export interface LoiKiemTraForm {
  tenCuaHang?: string;
  soZalo?: string;
  soDienThoai?: string;
  diaChi?: string;
  danhSachSanPham?: string;
  chiTietSanPham?: Record<string, string>;
}

export const TEN_KHOI_HIEN_THI: Record<MaKhoiHienThi, { ten: string; moTa: string }> = {
  dauTrang: { ten: 'Đầu trang & Tên tiệm', moTa: 'Tên cửa hàng quen gọi và liên kết nhanh' },
  banner: { ten: 'Ảnh bìa nổi bật', moTa: 'Hình ảnh cửa hàng hoặc nền họa tiết' },
  sanPham: { ten: 'Bảng niêm yết giá', moTa: 'Danh sách sản phẩm / dịch vụ kèm nút hỏi mua Zalo' },
  gioiThieu: { ten: 'Câu chuyện & Điểm nổi bật', moTa: 'Đoạn giới thiệu và cam kết chất lượng' },
  hoKinhDoanh: { ten: 'Thông tin Hộ kinh doanh', moTa: 'Người bán, khu vực phục vụ và lưu ý niêm yết giá' },
  diaChi: { ten: 'Địa chỉ & Khu vực phục vụ', moTa: 'Giờ mở cửa, bản đồ và ảnh mặt tiền' },
  lienHe: { ten: 'Liên hệ Zalo & Gọi điện', moTa: 'Mã QR Zalo, số điện thoại và mạng xã hội' },
  cauCamOn: { ten: 'Lời cảm ơn cuối trang', moTa: 'Thông điệp tri ân khách hàng địa phương' },
};
