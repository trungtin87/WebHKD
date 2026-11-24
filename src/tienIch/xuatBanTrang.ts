import JSZip from 'jszip';
import { chuanHoaDuLieuNhap } from '../duLieu/boDuLieuThu';
import { DuLieuCuaHang, ThemeGiaoDien } from '../kieuDuLieu';
import { taoMaQrSvg } from './xuLyAnh';
import { taoLinkZalo, taoTenFileAnToan } from './xuLyDuLieu';

function kichHoatTaiXuong(blob: Blob, tenFile: string): void {
  const url = URL.createObjectURL(blob);
  const theA = document.createElement('a');
  theA.href = url;
  theA.download = tenFile;
  document.body.appendChild(theA);
  theA.click();
  document.body.removeChild(theA);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Chuyển chuỗi Data URL (base64 hoặc utf8 svg) sang dữ liệu nhị phân và đuôi mở rộng để đóng gói ZIP
function giaiMaDataUrl(dataUrl: string): { duoi: string; duLieu: Uint8Array | string; laBase64: boolean } {
  if (dataUrl.startsWith('data:image/svg+xml;charset=utf-8,')) {
    const noiDung = decodeURIComponent(dataUrl.replace('data:image/svg+xml;charset=utf-8,', ''));
    return { duoi: 'svg', duLieu: noiDung, laBase64: false };
  }
  const match = dataUrl.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
  if (match) {
    const kieu = match[1].toLowerCase();
    const duoi = kieu === 'jpeg' ? 'jpg' : kieu.replace('+xml', '');
    const binary = atob(match[2]);
    const mangByte = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      mangByte[i] = binary.charCodeAt(i);
    }
    return { duoi, duLieu: mangByte, laBase64: true };
  }
  return { duoi: 'png', duLieu: dataUrl, laBase64: false };
}

// 1. Xuất file HTML đơn hoàn chỉnh (tự chứa ảnh, CSS, mã QR Zalo SVG dùng được cả khi ngoại tuyến)
export async function xuatFileHtmlDon(duLieu: DuLieuCuaHang, theme: ThemeGiaoDien): Promise<string> {
  const mauChinh = duLieu.giaoDien.mauChinh || theme.bangMau.chinh;
  const maQrSvg = duLieu.giaoDien.hienMaQrZalo
    ? await taoMaQrSvg(taoLinkZalo(duLieu.soZalo), mauChinh)
    : '';
  const html = theme.veTrang(duLieu, {
    maQrSvg,
    mauChinhTuyChon: mauChinh,
    cheDoXuat: 'htmlDon',
  });
  const tenFile = `${taoTenFileAnToan(duLieu.tenCuaHang)}.html`;
  kichHoatTaiXuong(new Blob([html], { type: 'text/html;charset=utf-8' }), tenFile);
  return html;
}

// 2. Xuất gói ZIP gồm index.html + thư mục anh/ riêng cho người tự đưa lên hosting
export async function xuatFileZip(duLieu: DuLieuCuaHang, theme: ThemeGiaoDien): Promise<void> {
  const zip = new JSZip();
  const thuMucAnh = zip.folder('anh');
  const banDoDuongDanAnh: Record<string, string> = {};

  const ganAnhVaoZip = (khoa: string, tenCoBan: string, nguon: string | null | undefined) => {
    if (!nguon || !thuMucAnh) return;
    if (nguon.startsWith('data:')) {
      const daGiaiMa = giaiMaDataUrl(nguon);
      const tenFileAnh = `${tenCoBan}.${daGiaiMa.duoi}`;
      thuMucAnh.file(tenFileAnh, daGiaiMa.duLieu);
      banDoDuongDanAnh[khoa] = `./anh/${tenFileAnh}`;
    } else {
      banDoDuongDanAnh[khoa] = nguon;
    }
  };

  ganAnhVaoZip('anhBanner', 'banner', duLieu.anhBanner);
  ganAnhVaoZip('anhCuaHang', 'cua-hang', duLieu.anhCuaHang);
  duLieu.danhSachSanPham.forEach((sp, idx) => {
    ganAnhVaoZip(`sp_${idx}`, `san-pham-${idx + 1}`, sp.anh);
  });

  const mauChinh = duLieu.giaoDien.mauChinh || theme.bangMau.chinh;
  const maQrSvg = duLieu.giaoDien.hienMaQrZalo
    ? await taoMaQrSvg(taoLinkZalo(duLieu.soZalo), mauChinh)
    : '';

  const html = theme.veTrang(duLieu, {
    maQrSvg,
    mauChinhTuyChon: mauChinh,
    cheDoXuat: 'zip',
    banDoDuongDanAnh,
  });

  zip.file('index.html', html);
  zip.file(
    'huong-dan-dang-web.txt',
    `HƯỚNG DẪN ĐƯA TRANG WEB CỬA HÀNG LÊN MẠNG\n\n` +
      `1. Giải nén toàn bộ thư mục này (giữ nguyên file index.html nằm cạnh thư mục anh/).\n` +
      `2. Tải toàn bộ lên hosting, Netlify Drop (app.netlify.com/drop), hoặc GitHub Pages.\n` +
      `3. Mở file index.html bằng trình duyệt bất kỳ để kiểm tra lại trước khi gửi link cho khách.\n`
  );

  const blobZip = await zip.generateAsync({ type: 'blob' });
  const tenFile = `${taoTenFileAnToan(duLieu.tenCuaHang)}-web.zip`;
  kichHoatTaiXuong(blobZip, tenFile);
}

// 3. Lưu dự án ra file .json để mở lại chỉnh sửa sau hoặc sao lưu
export function luuDuAnJson(duLieu: DuLieuCuaHang): void {
  const chuoiJson = JSON.stringify(duLieu, null, 2);
  const tenFile = `${taoTenFileAnToan(duLieu.tenCuaHang)}-du-an.json`;
  kichHoatTaiXuong(new Blob([chuoiJson], { type: 'application/json;charset=utf-8' }), tenFile);
}

// Đọc lại dự án từ file .json
export function docDuAnJson(file: File): Promise<DuLieuCuaHang> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Không đọc được file dự án.'));
    reader.onload = () => {
      try {
        const obj = JSON.parse(String(reader.result || '{}'));
        resolve(chuanHoaDuLieuNhap(obj));
      } catch {
        reject(new Error('File .json không đúng định dạng dự án cửa hàng.'));
      }
    };
    reader.readAsText(file, 'utf-8');
  });
}

// 4. Đẩy trang HTML lên GitHub Pages trực tiếp từ trình duyệt qua GitHub REST API
export async function dayLenGitHubPages(thamSo: {
  token: string;
  tenKho: string;
  duLieu: DuLieuCuaHang;
  theme: ThemeGiaoDien;
}): Promise<{ urlTrang: string; urlKho: string }> {
  const tokenSach = thamSo.token.trim();
  const tenKhoSach = taoTenFileAnToan(thamSo.tenKho.trim() || thamSo.duLieu.tenCuaHang);
  if (!tokenSach) {
    throw new Error('Vui lòng nhập GitHub Personal Access Token.');
  }

  const headers = {
    Authorization: `Bearer ${tokenSach}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
  };

  // Lấy thông tin tài khoản GitHub hiện tại
  const resUser = await fetch('https://api.github.com/user', { headers });
  if (!resUser.ok) {
    throw new Error('Token GitHub không hợp lệ hoặc đã hết hạn.');
  }
  const nguoiDung = (await resUser.json()) as { login: string };
  const chuSoHuu = nguoiDung.login;

  // Tạo kho mới (hoặc bỏ qua nếu đã tồn tại)
  const resTaoKho = await fetch('https://api.github.com/user/repos', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name: tenKhoSach,
      description: `Trang giới thiệu ${thamSo.duLieu.tenCuaHang}`,
      auto_init: false,
      private: false,
    }),
  });

  if (!resTaoKho.ok && resTaoKho.status !== 422) {
    const err = await resTaoKho.json().catch(() => ({}));
    throw new Error(err.message || 'Không tạo được kho lưu trữ trên GitHub.');
  }

  // Tạo HTML hoàn chỉnh
  const mauChinh = thamSo.duLieu.giaoDien.mauChinh || thamSo.theme.bangMau.chinh;
  const maQrSvg = thamSo.duLieu.giaoDien.hienMaQrZalo
    ? await taoMaQrSvg(taoLinkZalo(thamSo.duLieu.soZalo), mauChinh)
    : '';
  const html = thamSo.theme.veTrang(thamSo.duLieu, {
    maQrSvg,
    mauChinhTuyChon: mauChinh,
    cheDoXuat: 'htmlDon',
  });

  // Kiểm tra file index.html đã có sẵn chưa để lấy sha
  let shaHienTai: string | undefined;
  const resKiemTraFile = await fetch(
    `https://api.github.com/repos/${chuSoHuu}/${tenKhoSach}/contents/index.html`,
    { headers }
  );
  if (resKiemTraFile.ok) {
    const thongTinFile = (await resKiemTraFile.json()) as { sha?: string };
    shaHienTai = thongTinFile.sha;
  }

  // Mã hóa UTF-8 sang Base64 an toàn cho tiếng Việt
  const bytes = new TextEncoder().encode(html);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const noiDungBase64 = btoa(binary);

  // Đẩy file index.html lên nhánh main
  const resDayFile = await fetch(
    `https://api.github.com/repos/${chuSoHuu}/${tenKhoSach}/contents/index.html`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: 'Cập nhật trang giới thiệu cửa hàng',
        content: noiDungBase64,
        branch: 'main',
        ...(shaHienTai ? { sha: shaHienTai } : {}),
      }),
    }
  );
  if (!resDayFile.ok) {
    const err = await resDayFile.json().catch(() => ({}));
    throw new Error(err.message || 'Không tải được file index.html lên GitHub.');
  }

  // Bật GitHub Pages trên nhánh main
  await fetch(`https://api.github.com/repos/${chuSoHuu}/${tenKhoSach}/pages`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      source: { branch: 'main', path: '/' },
    }),
  });

  return {
    urlTrang: `https://${chuSoHuu}.github.io/${tenKhoSach}/`,
    urlKho: `https://github.com/${chuSoHuu}/${tenKhoSach}`,
  };
}
