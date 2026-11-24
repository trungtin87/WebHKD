import { DuLieuCuaHang, LoiKiemTraForm } from '../kieuDuLieu';

// Chuẩn hóa số điện thoại Việt Nam: bỏ khoảng trắng, dấu chấm, dấu gạch, đổi +84 thành 0
export function chuanHoaSoDienThoai(chuoi: string): string {
  if (!chuoi) return '';
  let ketQua = chuoi.replace(/[\s.\-()]/g, '');
  if (ketQua.startsWith('+84')) {
    ketQua = '0' + ketQua.slice(3);
  } else if (ketQua.startsWith('84') && ketQua.length >= 11) {
    ketQua = '0' + ketQua.slice(2);
  }
  return ketQua.replace(/\D/g, '');
}

// Kiểm tra số điện thoại Việt Nam (10 số, bắt đầu bằng 0)
export function kiemTraSoDienThoaiVN(
  chuoi: string,
  nhan: string = 'Số điện thoại',
  batBuoc: boolean = false
): string | null {
  const soSach = chuanHoaSoDienThoai(chuoi);
  if (!soSach) {
    return batBuoc ? `Bạn vui lòng nhập ${nhan.toLowerCase()} để khách liên hệ nhé.` : null;
  }
  if (!soSach.startsWith('0') || soSach.length !== 10) {
    return `${nhan} cần đủ 10 số và bắt đầu bằng số 0, bạn kiểm tra lại giúp mình nhé.`;
  }
  return null;
}

// Định dạng hiển thị số điện thoại cho dễ đọc (0909 123 456)
export function dinhDangSoDienThoaiHienThi(so: string): string {
  const soSach = chuanHoaSoDienThoai(so);
  if (soSach.length === 10) {
    return `${soSach.slice(0, 4)} ${soSach.slice(4, 7)} ${soSach.slice(7)}`;
  }
  return so;
}

// Định dạng giá tiền VND (ví dụ: 17000 -> "17.000đ")
export function dinhDangGiaTien(gia: number | null | undefined): string {
  if (gia === null || gia === undefined || Number.isNaN(gia) || gia < 0) {
    return '';
  }
  return `${Math.round(gia).toLocaleString('vi-VN')}đ`;
}

// Tạo đường dẫn Zalo chuẩn từ số điện thoại
export function taoLinkZalo(soZalo: string): string {
  const soSach = chuanHoaSoDienThoai(soZalo);
  return soSach ? `https://zalo.me/${soSach}` : '#';
}

// Tạo link bản đồ Google Maps (tự tạo từ địa chỉ nếu người dùng để trống)
export function taoLinkBanDo(diaChi: string, linkBanDo?: string): string {
  const linkSach = (linkBanDo || '').trim();
  if (linkSach && /^https?:\/\//i.test(linkSach)) {
    return linkSach;
  }
  if (!diaChi.trim()) return '#';
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(diaChi.trim())}`;
}

// Chuẩn hóa đường dẫn mạng xã hội khi người dùng chỉ gõ tên tài khoản
export function chuanHoaLinkMangXaHoi(
  nenTang: 'facebook' | 'tiktok' | 'instagram',
  giaTri: string
): string {
  const sach = giaTri.trim();
  if (!sach) return '';
  if (/^https?:\/\//i.test(sach)) {
    return sach;
  }
  const taiKhoan = sach.replace(/^@+/, '').replace(/^\/+/, '');
  if (!taiKhoan) return '';
  switch (nenTang) {
    case 'facebook':
      return `https://facebook.com/${taiKhoan}`;
    case 'tiktok':
      return `https://www.tiktok.com/@${taiKhoan}`;
    case 'instagram':
      return `https://instagram.com/${taiKhoan}`;
  }
}

// Làm sạch ký tự đặc biệt trước khi nhúng vào HTML để tránh lỗi hiển thị và XSS
export function lamSachHtml(chuoi: string | number | null | undefined): string {
  if (chuoi === null || chuoi === undefined) return '';
  return String(chuoi)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Lấy chữ cái đầu làm logo thay thế nếu cửa hàng chưa có ảnh logo
export function layChuCaiDau(tenCuaHang: string): string {
  const sach = tenCuaHang.trim();
  if (!sach) return 'CH';
  const cacTu = sach.split(/\s+/).filter(Boolean);
  if (cacTu.length === 1) {
    return cacTu[0].slice(0, 2).toUpperCase();
  }
  return `${cacTu[0][0]}${cacTu[cacTu.length - 1][0]}`.toUpperCase();
}

// Tạo tên file an toàn từ tên cửa hàng (tiếng Việt không dấu)
export function taoTenFileAnToan(tenCuaHang: string): string {
  return (
    tenCuaHang
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'cua-hang-viet'
  );
}

// Kiểm tra hợp lệ toàn bộ form trước khi cho sang Bước 3 (Xem trước theme)
export function kiemTraFormBuoc2(duLieu: DuLieuCuaHang): {
  hopLe: boolean;
  cacLoi: LoiKiemTraForm;
  phanTramHoanThien: number;
} {
  const cacLoi: LoiKiemTraForm = {};
  const chiTietSanPham: Record<string, string> = {};

  const tenSach = duLieu.tenCuaHang.trim();
  if (tenSach.length < 2 || tenSach.length > 60) {
    cacLoi.tenCuaHang = 'Tên cửa hàng cần từ 2 đến 60 ký tự để hiển thị đẹp trên trang.';
  }

  const loiZalo = kiemTraSoDienThoaiVN(duLieu.soZalo, 'Số Zalo', true);
  if (loiZalo) {
    cacLoi.soZalo = loiZalo;
  }

  if (duLieu.soDienThoai.trim()) {
    const loiSdt = kiemTraSoDienThoaiVN(duLieu.soDienThoai, 'Số điện thoại gọi', false);
    if (loiSdt) cacLoi.soDienThoai = loiSdt;
  }

  if (!duLieu.diaChi.trim()) {
    cacLoi.diaChi = 'Bạn vui lòng nhập địa chỉ cửa hàng hoặc khu vực bán hàng nhé.';
  } else if (duLieu.diaChi.trim().length > 150) {
    cacLoi.diaChi = 'Địa chỉ tối đa 150 ký tự để khách hàng dễ đọc trên điện thoại.';
  }

  if (!duLieu.danhSachSanPham.length) {
    cacLoi.danhSachSanPham = 'Cửa hàng cần ít nhất 1 sản phẩm hoặc dịch vụ để giới thiệu.';
  } else {
    duLieu.danhSachSanPham.forEach((sp) => {
      if (!sp.ten.trim()) {
        chiTietSanPham[sp.id] = 'Vui lòng nhập tên sản phẩm/dịch vụ.';
      } else if (sp.ten.trim().length > 50) {
        chiTietSanPham[sp.id] = 'Tên sản phẩm tối đa 50 ký tự.';
      }
    });
    if (Object.keys(chiTietSanPham).length > 0) {
      cacLoi.chiTietSanPham = chiTietSanPham;
      cacLoi.danhSachSanPham = 'Một số sản phẩm chưa có tên hoặc vượt quá 50 ký tự.';
    }
  }

  // Tính % mức độ hoàn thiện nội dung (khuyến khích điền đầy đủ nhưng không chặn các mục phụ)
  const cacMoc = [
    tenSach.length >= 2,
    !loiZalo,
    duLieu.diaChi.trim().length > 0,
    duLieu.danhSachSanPham.length > 0 && Object.keys(chiTietSanPham).length === 0,
    duLieu.khauHieu.trim().length > 0,
    duLieu.gioiThieu.doanVan.trim().length > 0,
    duLieu.hoKinhDoanh.khuVucPhucVu.trim().length > 0 || duLieu.hoKinhDoanh.tenChuHo.trim().length > 0,
    Boolean(duLieu.anhBanner || duLieu.anhCuaHang || duLieu.danhSachSanPham.some((s) => s.anh)),
  ];
  const phanTramHoanThien = Math.round(
    (cacMoc.filter(Boolean).length / cacMoc.length) * 100
  );

  const hopLe =
    !cacLoi.tenCuaHang && !cacLoi.soZalo && !cacLoi.soDienThoai && !cacLoi.diaChi && !cacLoi.danhSachSanPham;

  return { hopLe, cacLoi, phanTramHoanThien };
}
