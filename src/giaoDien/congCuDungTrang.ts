import { BangMauTheme, DuLieuCuaHang, SanPham, TuyChonVeTrang } from '../kieuDuLieu';
import {
  chuanHoaLinkMangXaHoi,
  chuanHoaSoDienThoai,
  dinhDangGiaTien,
  dinhDangSoDienThoaiHienThi,
  lamSachHtml,
  taoLinkBanDo,
  taoLinkZalo,
} from '../tienIch/xuLyDuLieu';

// Giải quyết đường dẫn ảnh: xem trước/HTML đơn dùng chuỗi base64, xuất ZIP dùng đường dẫn thư mục anh/
export function layNguonAnh(
  nguonGoc: string | null | undefined,
  khoaAnh: string,
  tuyChon: TuyChonVeTrang
): string | null {
  if (!nguonGoc) return null;
  if (tuyChon.cheDoXuat === 'zip' && tuyChon.banDoDuongDanAnh && tuyChon.banDoDuongDanAnh[khoaAnh]) {
    return tuyChon.banDoDuongDanAnh[khoaAnh];
  }
  return nguonGoc;
}

// Tạo chuỗi hiển thị giá niêm yết hoặc lời nhắn tư vấn
export function taoNhanGiaSanPham(sp: SanPham): {
  chuGia: string;
  laGiaCuThe: boolean;
} {
  if (sp.kieuGia === 'anGia') {
    return { chuGia: 'Nhắn Zalo xem giá', laGiaCuThe: false };
  }
  if (sp.kieuGia === 'lienHeDeBiet' || sp.gia === null || sp.gia === undefined) {
    return { chuGia: 'Liên hệ để được tư vấn', laGiaCuThe: false };
  }
  const giaFormatted = dinhDangGiaTien(sp.gia);
  if (!giaFormatted) {
    return { chuGia: 'Liên hệ để được tư vấn', laGiaCuThe: false };
  }
  const donVi = sp.donVi.trim();
  return {
    chuGia: donVi ? `${giaFormatted} / ${lamSachHtml(donVi)}` : giaFormatted,
    laGiaCuThe: true,
  };
}

// Sinh link Google Fonts cho trang xuất ra (kèm font hệ thống dự phòng khi không có mạng)
export function taoLinkGoogleFont(tieuDe: string, noiDung: string): string {
  const tapFont = Array.from(new Set([tieuDe, noiDung])).filter(Boolean);
  const thamSo = tapFont
    .map((ten) => `family=${encodeURIComponent(ten).replace(/%20/g, '+')}:wght@400;500;600;700`)
    .join('&');
  if (!thamSo) return '';
  return `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?${thamSo}&display=swap" rel="stylesheet">`;
}

// Họa tiết nền truyền thống Việt Nam dạng SVG Data URL nhẹ
export function taoHoaTietNenCss(loai: string, mau: string): string {
  const mauHex = mau.replace('#', '%23');
  if (loai === 'laCay') {
    return `url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 44C16 28 28 18 44 18C44 34 32 44 16 44Z' fill='none' stroke='${mauHex}' stroke-opacity='0.08' stroke-width='1.5'/%3E%3Cpath d='M16 44L44 18' stroke='${mauHex}' stroke-opacity='0.07' stroke-width='1.2'/%3E%3C/svg%3E")`;
  }
  if (loai === 'hoaVanCoTruyen') {
    return `url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='6' y='6' width='36' height='36' fill='none' stroke='${mauHex}' stroke-opacity='0.08' stroke-width='1.2'/%3E%3Cpath d='M24 6L42 24L24 42L6 24Z' fill='none' stroke='${mauHex}' stroke-opacity='0.08' stroke-width='1.2'/%3E%3Ccircle cx='24' cy='24' r='4' fill='none' stroke='${mauHex}' stroke-opacity='0.09' stroke-width='1.2'/%3E%3C/svg%3E")`;
  }
  if (loai === 'gachBong') {
    return `url("data:image/svg+xml,%3Csvg width='56' height='56' viewBox='0 0 56 56' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='28' cy='28' r='20' fill='none' stroke='${mauHex}' stroke-opacity='0.07' stroke-width='1.2'/%3E%3Cpath d='M28 8V48M8 28H48' stroke='${mauHex}' stroke-opacity='0.06' stroke-width='1'/%3E%3C/svg%3E")`;
  }
  if (loai === 'luoiBento') {
    return `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 0H0V32' fill='none' stroke='${mauHex}' stroke-opacity='0.06' stroke-width='1'/%3E%3C/svg%3E")`;
  }
  return 'none';
}

// Tạo link hành động nhanh Zalo và Gọi điện
export function layThongTinLienHe(duLieu: DuLieuCuaHang) {
  const soZaloSach = chuanHoaSoDienThoai(duLieu.soZalo);
  const soGoiSach = chuanHoaSoDienThoai(duLieu.soDienThoai) || soZaloSach;
  const linkZalo = taoLinkZalo(soZaloSach);
  const linkGoi = soGoiSach ? `tel:${soGoiSach}` : '#';
  const linkBanDo = taoLinkBanDo(duLieu.diaChi, duLieu.linkBanDo);
  const fb = chuanHoaLinkMangXaHoi('facebook', duLieu.mangXaHoi.facebook);
  const tt = chuanHoaLinkMangXaHoi('tiktok', duLieu.mangXaHoi.tiktok);
  const ig = chuanHoaLinkMangXaHoi('instagram', duLieu.mangXaHoi.instagram);
  return {
    soZaloSach,
    soGoiSach,
    soZaloHienThi: dinhDangSoDienThoaiHienThi(soZaloSach),
    soGoiHienThi: dinhDangSoDienThoaiHienThi(soGoiSach),
    linkZalo,
    linkGoi,
    linkBanDo,
    fb,
    tt,
    ig,
  };
}

// Thanh liên kết điều hướng nhanh trên máy tính giúp trang đầy đặn và đồng nhất phong cách Webflow
export function veDieuHuongNhanh(duLieu: DuLieuCuaHang): string {
  const khoiBat = duLieu.giaoDien.cacKhoiHienThi;
  const muc: Array<{ id: string; nhan: string; hien: boolean }> = [
    { id: '#san-pham', nhan: 'Bảng giá', hien: khoiBat.includes('sanPham') && duLieu.danhSachSanPham.length > 0 },
    { id: '#gioi-thieu', nhan: 'Giới thiệu', hien: khoiBat.includes('gioiThieu') && (Boolean(duLieu.gioiThieu.doanVan.trim()) || duLieu.gioiThieu.diemNoiBat.some((d) => d.trim())) },
    { id: '#dia-chi', nhan: 'Địa chỉ', hien: khoiBat.includes('diaChi') && Boolean(duLieu.diaChi.trim()) },
    { id: '#lien-he', nhan: 'Liên hệ', hien: khoiBat.includes('lienHe') },
  ];
  const hopLe = muc.filter((m) => m.hien);
  if (!hopLe.length) return '';
  return `<nav class="dieu-huong-nhanh" aria-label="Điều hướng trang">${hopLe
    .map((m) => `<a href="${m.id}">${m.nhan}</a>`)
    .join('')}</nav>`;
}

// Vẽ khối thông tin Hộ kinh doanh & Khu vực phục vụ — thu gọn 2 cột cân đối, đầy đủ thông tin minh bạch
export function veKhoiHoKinhDoanhChung(duLieu: DuLieuCuaHang): string {
  const hkd = duLieu.hoKinhDoanh;
  const coNoiDung =
    hkd.tenChuHo.trim() ||
    hkd.maSoHoKinhDoanh.trim() ||
    hkd.khuVucPhucVu.trim() ||
    hkd.chinhSachGiaoHang.trim() ||
    hkd.hinhThucBanHang.trim() ||
    hkd.thongTinMoRong.some((m) => m.nhan.trim() && m.giaTri.trim());

  if (!hkd.hienThongTinPhapLy && !coNoiDung) return '';

  const danhSachDong: Array<{ nhan: string; giaTri: string }> = [];
  if (hkd.tenChuHo.trim()) {
    danhSachDong.push({ nhan: 'Người bán / Chủ hộ', giaTri: hkd.tenChuHo.trim() });
  }
  if (hkd.maSoHoKinhDoanh.trim()) {
    danhSachDong.push({ nhan: 'Mã số HKD', giaTri: hkd.maSoHoKinhDoanh.trim() });
  }
  if (hkd.khuVucPhucVu.trim()) {
    danhSachDong.push({ nhan: 'Khu vực phục vụ', giaTri: hkd.khuVucPhucVu.trim() });
  }
  if (hkd.chinhSachGiaoHang.trim()) {
    danhSachDong.push({ nhan: 'Giao nhận', giaTri: hkd.chinhSachGiaoHang.trim() });
  }
  hkd.thongTinMoRong.forEach((muc) => {
    if (muc.nhan.trim() && muc.giaTri.trim()) {
      danhSachDong.push({ nhan: muc.nhan.trim(), giaTri: muc.giaTri.trim() });
    }
  });

  if (!danhSachDong.length && !hkd.hinhThucBanHang.trim()) return '';

  return `
    <section class="khoi-chung khoi-hkd" id="thong-tin-nguoi-ban">
      <div class="khung-noi-dung">
        <div class="hkd-the">
          <div class="hkd-dau">
            <h2 class="tieu-de-nho">Thông tin người bán &amp; Khu vực phục vụ</h2>
            ${
              hkd.hinhThucBanHang.trim()
                ? `<p class="hkd-luu-y">${lamSachHtml(hkd.hinhThucBanHang)}</p>`
                : ''
            }
          </div>
          ${
            danhSachDong.length > 0
              ? `<dl class="hkd-bang">
                  ${danhSachDong
                    .map(
                      (d) => `
                    <div class="hkd-dong">
                      <dt>${lamSachHtml(d.nhan)}</dt>
                      <dd>${lamSachHtml(d.giaTri)}</dd>
                    </div>`
                    )
                    .join('')}
                </dl>`
              : ''
          }
        </div>
      </div>
    </section>
  `;
}

// Vẽ khối địa chỉ, giờ mở cửa và ảnh cửa hàng
export function veKhoiDiaChiChung(duLieu: DuLieuCuaHang, tuyChon: TuyChonVeTrang): string {
  const lh = layThongTinLienHe(duLieu);
  const anhCuaHang = layNguonAnh(duLieu.anhCuaHang, 'anhCuaHang', tuyChon);
  if (!duLieu.diaChi.trim() && !duLieu.gioMoCua.trim() && !anhCuaHang) return '';

  return `
    <section class="khoi-chung khoi-dia-chi" id="dia-chi">
      <div class="khung-noi-dung">
        <h2 class="tieu-de-khoi">Địa chỉ &amp; Giờ phục vụ</h2>
        <div class="dia-chi-luoi ${anhCuaHang ? 'co-anh' : ''}">
          <div class="dia-chi-chi-tiet">
            ${
              duLieu.diaChi.trim()
                ? `<div class="muc-thong-tin">
                    <span class="nhan-nho">Địa chỉ cửa hàng</span>
                    <p class="gia-tri-lon">${lamSachHtml(duLieu.diaChi)}</p>
                  </div>`
                : ''
            }
            <div class="dia-chi-phu-hang">
              ${
                duLieu.hoKinhDoanh.khuVucPhucVu.trim()
                  ? `<div class="muc-thong-tin">
                      <span class="nhan-nho">Phạm vi phục vụ</span>
                      <p class="gia-tri-thuong">${lamSachHtml(duLieu.hoKinhDoanh.khuVucPhucVu)}</p>
                    </div>`
                  : ''
              }
              ${
                duLieu.gioMoCua.trim()
                  ? `<div class="muc-thong-tin">
                      <span class="nhan-nho">Giờ mở cửa</span>
                      <p class="gia-tri-thuong">${lamSachHtml(duLieu.gioMoCua)}</p>
                    </div>`
                  : ''
              }
            </div>
            ${
              lh.linkBanDo !== '#'
                ? `<div class="nhom-nut-ban-do">
                    <a class="nut-phu" href="${lamSachHtml(lh.linkBanDo)}" target="_blank" rel="noopener noreferrer">
                      Xem đường đi Google Maps
                    </a>
                  </div>`
                : ''
            }
          </div>
          ${
            anhCuaHang
              ? `<div class="dia-chi-khung-anh">
                  <img src="${lamSachHtml(anhCuaHang)}" alt="Hình ảnh ${lamSachHtml(duLieu.tenCuaHang)}" />
                </div>`
              : ''
          }
        </div>
      </div>
    </section>
  `;
}

// Vẽ khối liên hệ Zalo (kèm QR) + Gọi điện + Mạng xã hội
export function veKhoiLienHeChung(duLieu: DuLieuCuaHang, tuyChon: TuyChonVeTrang): string {
  const lh = layThongTinLienHe(duLieu);
  const coMxh = lh.fb || lh.tt || lh.ig;
  const hienQr = duLieu.giaoDien.hienMaQrZalo && Boolean(tuyChon.maQrSvg);

  return `
    <section class="khoi-chung khoi-lien-he" id="lien-he">
      <div class="khung-noi-dung">
        <div class="the-lien-he ${hienQr ? 'co-qr' : ''}">
          <div class="lien-he-noi-dung">
            <h2 class="tieu-de-khoi">Liên hệ đặt hàng &amp; Tư vấn</h2>
            <p class="mo-ta-lien-he">
              Nhắn Zalo hoặc gọi trực tiếp cho <strong>${lamSachHtml(duLieu.tenCuaHang || 'cửa hàng')}</strong> để kiểm tra hàng còn trong ngày và hẹn giờ giao nhận.
            </p>
            <div class="nhom-nut-lien-he">
              ${
                lh.soZaloSach
                  ? `<a class="nut-chinh nut-zalo" href="${lamSachHtml(lh.linkZalo)}" target="_blank" rel="noopener noreferrer">
                      Nhắn Zalo: ${lamSachHtml(lh.soZaloHienThi)}
                    </a>`
                  : ''
              }
              ${
                lh.soGoiSach
                  ? `<a class="nut-goi" href="${lamSachHtml(lh.linkGoi)}">
                      Gọi điện: ${lamSachHtml(lh.soGoiHienThi)}
                    </a>`
                  : ''
              }
            </div>
            ${
              coMxh
                ? `<div class="mang-xa-hoi">
                    <span class="nhan-nho" style="margin:0;">Kênh khác:</span>
                    ${lh.fb ? `<a href="${lamSachHtml(lh.fb)}" target="_blank" rel="noopener noreferrer">Facebook</a>` : ''}
                    ${lh.tt ? `<a href="${lamSachHtml(lh.tt)}" target="_blank" rel="noopener noreferrer">TikTok</a>` : ''}
                    ${lh.ig ? `<a href="${lamSachHtml(lh.ig)}" target="_blank" rel="noopener noreferrer">Instagram</a>` : ''}
                  </div>`
                : ''
            }
          </div>
          ${
            hienQr
              ? `<div class="khung-qr-zalo">
                  <div class="qr-hop">${tuyChon.maQrSvg}</div>
                  <p class="qr-chu-thich">Quét mã bằng Zalo</p>
                </div>`
              : ''
          }
        </div>
      </div>
    </section>
  `;
}

// Vẽ khối lời cảm ơn
export function veKhoiCauCamOnChung(duLieu: DuLieuCuaHang): string {
  if (!duLieu.cauCamOn.trim()) return '';
  return `
    <footer class="khoi-cam-on">
      <div class="khung-noi-dung">
        <p class="cau-cam-on">${lamSachHtml(duLieu.cauCamOn)}</p>
        <p class="chan-trang-ten">${lamSachHtml(duLieu.tenCuaHang)}${duLieu.diaChi ? ` · ${lamSachHtml(duLieu.diaChi)}` : ''}</p>
      </div>
    </footer>
  `;
}

// Thanh gọi/Zalo cố định dưới màn hình điện thoại (chiếm < 60px, ẩn trên máy tính)
export function veThanhLienHeCoDinhMobile(duLieu: DuLieuCuaHang): string {
  const lh = layThongTinLienHe(duLieu);
  if (!lh.soZaloSach && !lh.soGoiSach) return '';
  return `
    <div class="thanh-lien-he-co-dinh" role="region" aria-label="Liên hệ nhanh">
      ${
        lh.soGoiSach
          ? `<a class="co-dinh-goi" href="${lamSachHtml(lh.linkGoi)}">Gọi ${lamSachHtml(lh.soGoiHienThi)}</a>`
          : ''
      }
      ${
        lh.soZaloSach
          ? `<a class="co-dinh-zalo" href="${lamSachHtml(lh.linkZalo)}" target="_blank" rel="noopener noreferrer">Nhắn Zalo</a>`
          : ''
      }
    </div>
  `;
}

// CSS dùng chung chuẩn hóa cho mọi theme: nhất quán nhịp điệu khoảng cách, thu gọn trên điện thoại 360px, cân đối trên máy tính 1280px
export function layCssNenChung(bangMau: BangMauTheme, fontTieuDe: string, fontNoiDung: string): string {
  return `
    :root {
      --mau-nen: ${bangMau.nen};
      --mau-be-mat: ${bangMau.beMat};
      --mau-chinh: ${bangMau.chinh};
      --mau-nhan: ${bangMau.nhan};
      --mau-chu: ${bangMau.chu};
      --mau-chu-phu: ${bangMau.chuPhu};
      --mau-vien: ${bangMau.vien};
      --font-tieu-de: '${fontTieuDe}', 'Be Vietnam Pro', Georgia, serif;
      --font-noi-dung: '${fontNoiDung}', 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      --bo-goc-the: 14px;
    }
    *, *::before, *::after { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      padding: 0 0 68px 0;
      background-color: var(--mau-nen);
      color: var(--mau-chu);
      font-family: var(--font-noi-dung);
      font-size: 15px;
      line-height: 1.58;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    img { max-width: 100%; display: block; }
    a { color: inherit; }
    .khung-noi-dung {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;
      padding: 0 16px;
    }
    .khoi-chung {
      padding: 24px 0;
    }
    .tieu-de-khoi {
      font-family: var(--font-tieu-de);
      font-size: clamp(1.3rem, 2.8vw, 1.9rem);
      line-height: 1.25;
      margin: 0 0 16px 0;
      color: var(--mau-chu);
      text-wrap: balance;
    }
    .tieu-de-nho {
      font-family: var(--font-tieu-de);
      font-size: clamp(1.1rem, 2.2vw, 1.35rem);
      line-height: 1.3;
      margin: 0 0 6px 0;
      color: var(--mau-chu);
    }
    /* Thanh điều hướng nhanh trên desktop */
    .dieu-huong-nhanh {
      display: none;
      align-items: center;
      gap: 20px;
      font-size: 0.9rem;
      font-weight: 600;
    }
    .dieu-huong-nhanh a {
      text-decoration: none;
      white-space: nowrap;
      opacity: 0.85;
      transition: opacity 0.15s ease;
    }
    .dieu-huong-nhanh a:hover {
      opacity: 1;
      text-decoration: underline;
      text-underline-offset: 4px;
    }
    /* Hệ thống nút đồng nhất >= 44px */
    .nut-chinh, .nut-goi, .nut-phu, .nut-zalo-sp {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 44px;
      padding: 10px 18px;
      border-radius: 10px;
      font-weight: 600;
      font-size: 0.92rem;
      text-decoration: none;
      transition: transform 0.15s ease, opacity 0.15s ease, background-color 0.15s ease;
      cursor: pointer;
      text-align: center;
      white-space: nowrap;
    }
    .nut-chinh:active, .nut-goi:active { transform: scale(0.98); }
    .nut-chinh {
      background-color: var(--mau-chinh);
      color: #FFFFFF;
      border: 1px solid var(--mau-chinh);
    }
    .nut-goi {
      background-color: var(--mau-nhan);
      color: #FFFFFF;
      border: 1px solid var(--mau-nhan);
    }
    .nut-phu {
      background-color: var(--mau-be-mat);
      color: var(--mau-chu);
      border: 1px solid var(--mau-vien);
    }
    .nut-zalo-sp {
      width: 100%;
      margin-top: 10px;
      background-color: transparent;
      color: var(--mau-chinh);
      border: 1.5px solid var(--mau-chinh);
      min-height: 40px;
      padding: 8px 14px;
      font-size: 0.88rem;
    }
    .nut-zalo-sp:hover {
      background-color: var(--mau-chinh);
      color: #FFFFFF;
    }
    .gia-san-pham {
      font-variant-numeric: tabular-nums;
      font-weight: 700;
      color: var(--mau-nhan);
      font-size: 1.02rem;
    }
    .gia-tu-van {
      font-weight: 600;
      color: var(--mau-chinh);
      font-size: 0.9rem;
    }
    .nhan-noi-bat {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--mau-nhan);
      margin-bottom: 4px;
      letter-spacing: 0.01em;
    }
    /* Khối Hộ kinh doanh thu gọn thông minh */
    .hkd-the {
      background-color: var(--mau-be-mat);
      border: 1px solid var(--mau-vien);
      border-radius: var(--bo-goc-the);
      padding: 16px;
    }
    .hkd-luu-y {
      margin: 0 0 12px 0;
      color: var(--mau-chu-phu);
      font-size: 0.88rem;
      line-height: 1.5;
    }
    .hkd-bang {
      margin: 0;
      display: grid;
      grid-template-columns: 1fr;
      gap: 8px;
    }
    .hkd-dong {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding-top: 8px;
      border-top: 1px solid var(--mau-vien);
    }
    .hkd-dong dt {
      font-size: 0.78rem;
      color: var(--mau-chu-phu);
      font-weight: 600;
    }
    .hkd-dong dd {
      margin: 0;
      font-size: 0.92rem;
      color: var(--mau-chu);
      font-weight: 500;
      overflow-wrap: anywhere;
    }
    /* Khối Địa chỉ gọn gàng */
    .dia-chi-luoi {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
      background-color: var(--mau-be-mat);
      border: 1px solid var(--mau-vien);
      border-radius: var(--bo-goc-the);
      padding: 16px;
    }
    .dia-chi-phu-hang {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
    }
    .muc-thong-tin { margin-bottom: 10px; }
    .nhan-nho {
      display: block;
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--mau-chu-phu);
      margin-bottom: 2px;
    }
    .gia-tri-lon {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      overflow-wrap: anywhere;
    }
    .gia-tri-thuong {
      margin: 0;
      font-size: 0.92rem;
      overflow-wrap: anywhere;
    }
    .dia-chi-khung-anh img {
      width: 100%;
      height: 190px;
      object-fit: cover;
      border-radius: 10px;
    }
    /* Khối Liên hệ & QR */
    .the-lien-he {
      background-color: var(--mau-be-mat);
      border: 1px solid var(--mau-vien);
      border-radius: var(--bo-goc-the);
      padding: 18px;
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
      align-items: center;
    }
    .mo-ta-lien-he {
      margin: 0 0 14px 0;
      color: var(--mau-chu-phu);
      font-size: 0.92rem;
    }
    .nhom-nut-lien-he {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .nhom-nut-lien-he a {
      flex: 1 1 180px;
    }
    .mang-xa-hoi {
      margin-top: 14px;
      padding-top: 12px;
      border-top: 1px solid var(--mau-vien);
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
      font-size: 0.88rem;
    }
    .mang-xa-hoi a {
      font-weight: 600;
      color: var(--mau-chinh);
      text-decoration: underline;
      text-underline-offset: 3px;
    }
    .khung-qr-zalo {
      text-align: center;
      background-color: #FFFFFF;
      border: 1px solid #E5E7EB;
      border-radius: 12px;
      padding: 12px;
      justify-self: center;
      width: 168px;
    }
    .qr-hop svg {
      width: 132px;
      height: 132px;
      margin: 0 auto;
      display: block;
    }
    .qr-chu-thich {
      margin: 6px 0 0 0;
      font-size: 0.78rem;
      color: #374151;
      font-weight: 600;
    }
    /* Lời cảm ơn */
    .khoi-cam-on {
      padding: 24px 0 32px 0;
      text-align: center;
      border-top: 1px solid var(--mau-vien);
    }
    .cau-cam-on {
      margin: 0 0 4px 0;
      font-family: var(--font-tieu-de);
      font-size: 1.15rem;
      color: var(--mau-chinh);
    }
    .chan-trang-ten {
      margin: 0;
      font-size: 0.84rem;
      color: var(--mau-chu-phu);
      overflow-wrap: anywhere;
    }
    /* Thanh cố định dưới màn hình điện thoại (< 60px chiều cao) */
    .thanh-lien-he-co-dinh {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 50;
      display: flex;
      gap: 8px;
      padding: 8px 12px;
      background-color: var(--mau-be-mat);
      border-top: 1px solid var(--mau-vien);
      box-shadow: 0 -4px 14px rgba(0, 0, 0, 0.08);
    }
    .thanh-lien-he-co-dinh a {
      flex: 1;
      min-height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 9px;
      font-weight: 700;
      font-size: 0.88rem;
      text-decoration: none;
    }
    .co-dinh-goi {
      background-color: var(--mau-nhan);
      color: #FFFFFF;
    }
    .co-dinh-zalo {
      background-color: var(--mau-chinh);
      color: #FFFFFF;
    }
    @media (min-width: 768px) {
      body { padding-bottom: 0; font-size: 16px; }
      .thanh-lien-he-co-dinh { display: none; }
      .dieu-huong-nhanh { display: flex; }
      .khung-noi-dung { padding: 0 28px; }
      .khoi-chung { padding: 40px 0; }
      .hkd-the { padding: 22px 24px; }
      .hkd-bang { grid-template-columns: repeat(2, 1fr); gap: 12px 28px; }
      .dia-chi-luoi { padding: 24px; }
      .dia-chi-luoi.co-anh { grid-template-columns: 1.2fr 0.8fr; align-items: center; gap: 24px; }
      .dia-chi-phu-hang { grid-template-columns: repeat(2, 1fr); gap: 16px; }
      .dia-chi-khung-anh img { height: 220px; }
      .the-lien-he { padding: 24px 28px; }
      .the-lien-he.co-qr { grid-template-columns: 1fr 188px; gap: 28px; }
      .khung-qr-zalo { width: 188px; }
      .qr-hop svg { width: 152px; height: 152px; }
      .nhom-nut-lien-he a { flex: 0 1 auto; }
    }
  `;
}

// Bọc toàn bộ nội dung HTML thành một tài liệu HTML hoàn chỉnh, chuẩn SEO tiếng Việt
export function bocKhungTaiLieuHtml(thamSo: {
  duLieu: DuLieuCuaHang;
  fontTieuDe: string;
  fontNoiDung: string;
  cssTongHop: string;
  noiDungBody: string;
}): string {
  const { duLieu, fontTieuDe, fontNoiDung, cssTongHop, noiDungBody } = thamSo;
  const tieuDeTrang = duLieu.tenCuaHang.trim() || 'Trang giới thiệu cửa hàng';
  const moTaSeo =
    duLieu.khauHieu.trim() ||
    duLieu.gioiThieu.doanVan.trim().slice(0, 155) ||
    `${tieuDeTrang} - Niêm yết giá và liên hệ trực tiếp qua Zalo.`;

  return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${lamSachHtml(tieuDeTrang)}</title>
  <meta name="description" content="${lamSachHtml(moTaSeo)}" />
  <meta property="og:title" content="${lamSachHtml(tieuDeTrang)}" />
  <meta property="og:description" content="${lamSachHtml(moTaSeo)}" />
  <meta property="og:type" content="website" />
  ${taoLinkGoogleFont(fontTieuDe, fontNoiDung)}
  <style>${cssTongHop}</style>
</head>
<body>
${noiDungBody}
</body>
</html>`;
}
